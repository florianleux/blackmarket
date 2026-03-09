#!/usr/bin/env node
/**
 * Lighthouse Pirate Audit
 *
 * Runs Lighthouse for all vote combinations (baseline + 32 combos).
 * Applies code patches per combo, builds, serves locally, audits, resets.
 *
 * Usage:
 *   node scripts/lighthouse-audit.mjs [options]
 *
 * Options:
 *   --runs N          Lighthouse runs per combination (default: 5)
 *   --combo COMBO     Single combo, e.g. "cls-a,fcp-b,lcp-a,tbt-b,si-a"
 *   --baseline        Baseline only
 *   --skip-baseline   Skip baseline, run combos only
 *   --port PORT       Local server port (default: 3000)
 *   --output FILE     Output JSON (default: scripts/lighthouse-results.json)
 *   --resume          Skip already-computed combos (reads existing output)
 */

import { execSync, spawn } from 'child_process'
import { writeFileSync, readFileSync, existsSync, unlinkSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BM_DIR = join(__dirname, '..')
const PATCHES_DIR = join(BM_DIR, 'patches')

// ── CLI args ──
const args = process.argv.slice(2)
const getArg = (name, def) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : def
}
const hasFlag = (name) => args.includes(`--${name}`)

const RUNS = parseInt(getArg('runs', '5'))
const PORT = parseInt(getArg('port', '3000'))
const OUTPUT = getArg('output', join(__dirname, 'lighthouse-results.json'))
const BASELINE_ONLY = hasFlag('baseline')
const SKIP_BASELINE = hasFlag('skip-baseline')
const SPECIFIC_COMBO = getArg('combo', null)
const RESUME = hasFlag('resume')
const URL = `http://localhost:${PORT}`

// ── Vote logic ──

/**
 * Vote 3 (LCP): LCP-A = the FCP loser's patch. LCP-B = lcp-b.patch.
 * This means if FCP picked A, LCP-A applies fcp-b (the loser).
 * When LCP-A is chosen, BOTH FCP patches end up applied.
 */
function getPatchFiles(combo) {
  const patches = []

  patches.push(`cls-${combo.cls}.patch`)
  patches.push(`fcp-${combo.fcp}.patch`)

  if (combo.lcp === 'a') {
    // LCP-A = apply the FCP loser
    const fcpLoser = combo.fcp === 'a' ? 'b' : 'a'
    patches.push(`fcp-${fcpLoser}.patch`)
  } else {
    patches.push('lcp-b.patch')
  }

  patches.push(`tbt-${combo.tbt}.patch`)
  patches.push(`si-${combo.si}.patch`)

  return [...new Set(patches)] // deduplicate
}

function comboKey(combo) {
  return `cls-${combo.cls}_fcp-${combo.fcp}_lcp-${combo.lcp}_tbt-${combo.tbt}_si-${combo.si}`
}

function generateAllCombos() {
  const combos = []
  for (const cls of ['a', 'b']) {
    for (const fcp of ['a', 'b']) {
      for (const lcp of ['a', 'b']) {
        for (const tbt of ['a', 'b']) {
          for (const si of ['a', 'b']) {
            combos.push({ cls, fcp, lcp, tbt, si })
          }
        }
      }
    }
  }
  return combos
}

function parseComboString(str) {
  const combo = {}
  for (const part of str.split(',')) {
    const [vote, option] = part.trim().split('-')
    combo[vote] = option
  }
  return combo
}

// ── Git / Patches ──

function resetToBaseline() {
  execSync('git checkout .', { cwd: BM_DIR, stdio: 'pipe' })
}

function applyPatches(patchFiles) {
  for (const pf of patchFiles) {
    const patchPath = join(PATCHES_DIR, pf)
    if (!existsSync(patchPath)) {
      console.warn(`  ⚠ Patch not found: ${pf}, skipping`)
      continue
    }
    try {
      execSync(`git apply --check "${patchPath}"`, { cwd: BM_DIR, stdio: 'pipe' })
      execSync(`git apply "${patchPath}"`, { cwd: BM_DIR, stdio: 'pipe' })
      console.log(`  ✓ Applied ${pf}`)
    } catch (e) {
      console.error(`  ✗ Failed to apply ${pf}`)
      throw e
    }
  }
}

// ── Build & Serve ──

function build() {
  console.log('  Building...')
  execSync('pnpm build', { cwd: BM_DIR, stdio: 'pipe', timeout: 120_000 })
  console.log('  ✓ Build complete')
}

function startServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('node', ['.output/server/index.mjs'], {
      cwd: BM_DIR,
      env: { ...process.env, PORT: String(PORT), NITRO_PORT: String(PORT) },
      stdio: 'pipe',
    })

    const timeout = setTimeout(() => resolve(server), 5000) // fallback: wait 5s

    const onData = (data) => {
      const msg = data.toString()
      if (msg.includes('Listening') || msg.includes('Ready') || msg.includes('localhost')) {
        clearTimeout(timeout)
        setTimeout(() => resolve(server), 500) // small grace period
      }
    }

    server.stdout.on('data', onData)
    server.stderr.on('data', onData)
    server.on('error', (err) => { clearTimeout(timeout); reject(err) })
  })
}

function stopServer(server) {
  if (!server) return
  server.kill('SIGTERM')
  return new Promise((resolve) => {
    server.on('close', resolve)
    setTimeout(resolve, 2000) // force resolve after 2s
  })
}

// ── Lighthouse ──

async function runLighthouseOnce(url) {
  const tmpFile = join(__dirname, `.lh-tmp-${Date.now()}.json`)
  try {
    execSync(
      `npx lighthouse "${url}" ` +
      `--output=json --output-path="${tmpFile}" ` +
      `--chrome-flags="--headless --no-sandbox --disable-gpu" ` +
      `--only-categories=performance --quiet`,
      { cwd: BM_DIR, stdio: 'pipe', timeout: 120_000 }
    )
    const result = JSON.parse(readFileSync(tmpFile, 'utf-8'))
    const { audits, categories } = result

    return {
      performance: Math.round(categories.performance.score * 100),
      fcp: Math.round(audits['first-contentful-paint'].numericValue),
      lcp: Math.round(audits['largest-contentful-paint'].numericValue),
      tbt: Math.round(audits['total-blocking-time'].numericValue),
      cls: parseFloat(audits['cumulative-layout-shift'].numericValue.toFixed(3)),
      si: Math.round(audits['speed-index'].numericValue),
    }
  } finally {
    try { unlinkSync(tmpFile) } catch {}
  }
}

async function runLighthouse(url, runs) {
  const results = []
  for (let i = 0; i < runs; i++) {
    console.log(`    Run ${i + 1}/${runs}...`)
    try {
      const r = await runLighthouseOnce(url)
      console.log(`      Perf=${r.performance} FCP=${r.fcp}ms LCP=${r.lcp}ms TBT=${r.tbt}ms CLS=${r.cls} SI=${r.si}ms`)
      results.push(r)
    } catch (e) {
      console.error(`      ✗ Run failed: ${e.message}`)
    }
  }

  if (results.length === 0) throw new Error('All Lighthouse runs failed')

  // Average
  const avg = {}
  for (const key of Object.keys(results[0])) {
    const values = results.map((r) => r[key])
    avg[key] = values.reduce((a, b) => a + b, 0) / values.length
  }
  avg.performance = Math.round(avg.performance)
  avg.fcp = Math.round(avg.fcp)
  avg.lcp = Math.round(avg.lcp)
  avg.tbt = Math.round(avg.tbt)
  avg.cls = parseFloat(avg.cls.toFixed(3))
  avg.si = Math.round(avg.si)

  return { avg, runs: results }
}

// ── Main ──

async function auditCombo(key, combo, allResults) {
  if (RESUME && allResults[key]) {
    console.log(`  ⏭ Already computed, skipping`)
    return
  }

  // Reset + apply patches
  resetToBaseline()
  if (combo) {
    const patches = getPatchFiles(combo)
    console.log(`  Patches: ${patches.join(', ')}`)
    try {
      applyPatches(patches)
    } catch {
      allResults[key] = { error: 'patch_failed' }
      writeFileSync(OUTPUT, JSON.stringify(allResults, null, 2))
      return
    }
  }

  // Build
  try {
    build()
  } catch (e) {
    console.error(`  ✗ Build failed`)
    allResults[key] = { error: 'build_failed' }
    writeFileSync(OUTPUT, JSON.stringify(allResults, null, 2))
    resetToBaseline()
    return
  }

  // Serve
  let server
  try {
    server = await startServer()
    console.log(`  ✓ Server on port ${PORT}`)
  } catch (e) {
    console.error(`  ✗ Server failed`)
    allResults[key] = { error: 'server_failed' }
    writeFileSync(OUTPUT, JSON.stringify(allResults, null, 2))
    resetToBaseline()
    return
  }

  // Audit
  try {
    const result = await runLighthouse(URL, RUNS)
    console.log(`  ► AVG: Perf=${result.avg.performance} FCP=${result.avg.fcp}ms LCP=${result.avg.lcp}ms TBT=${result.avg.tbt}ms CLS=${result.avg.cls} SI=${result.avg.si}ms`)
    allResults[key] = result
  } catch (e) {
    console.error(`  ✗ Lighthouse failed: ${e.message}`)
    allResults[key] = { error: 'lighthouse_failed' }
  }

  // Cleanup
  await stopServer(server)
  writeFileSync(OUTPUT, JSON.stringify(allResults, null, 2))
  resetToBaseline()
}

async function main() {
  console.log('🏴‍☠️ Lighthouse Pirate Audit')
  console.log(`   Runs: ${RUNS} | Port: ${PORT} | Resume: ${RESUME}`)
  console.log(`   Output: ${OUTPUT}`)
  console.log()

  // Load existing results
  let allResults = {}
  if (existsSync(OUTPUT)) {
    try { allResults = JSON.parse(readFileSync(OUTPUT, 'utf-8')) } catch {}
  }

  // Build combo list
  const tasks = []

  if (SPECIFIC_COMBO) {
    const combo = parseComboString(SPECIFIC_COMBO)
    tasks.push({ key: comboKey(combo), combo })
  } else {
    if (!SKIP_BASELINE) {
      tasks.push({ key: 'baseline', combo: null })
    }
    if (!BASELINE_ONLY) {
      for (const combo of generateAllCombos()) {
        tasks.push({ key: comboKey(combo), combo })
      }
    }
  }

  const total = tasks.length
  const startTime = Date.now()

  for (let i = 0; i < tasks.length; i++) {
    const { key, combo } = tasks[i]
    const elapsed = ((Date.now() - startTime) / 60000).toFixed(1)
    console.log(`\n━━━ [${i + 1}/${total}] ${key} (${elapsed}min elapsed) ━━━`)
    await auditCombo(key, combo, allResults)
  }

  const totalMin = ((Date.now() - startTime) / 60000).toFixed(1)
  console.log(`\n✓ Done in ${totalMin} minutes. Results: ${OUTPUT}`)
}

main().catch((e) => {
  console.error('Fatal:', e)
  resetToBaseline()
  process.exit(1)
})
