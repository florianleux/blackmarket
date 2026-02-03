#!/usr/bin/env node

/**
 * Extract concise Lighthouse scores from lighthouse-report.json
 * Generates a minimal JSON file with only branch names and scores
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const inputFile = path.join(__dirname, '..', 'lighthouse-report.json');
const outputFile = path.join(__dirname, '..', 'lighthouse-scores.json');

try {
  // Read the compiled report
  console.log('Reading lighthouse-report.json...');
  const report = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

  // Extract only scores from each branch
  const conciseScores = {};

  for (const [branchName, branchData] of Object.entries(report.branches)) {
    conciseScores[branchName] = branchData.scores;
  }

  // Write concise JSON
  fs.writeFileSync(outputFile, JSON.stringify(conciseScores, null, 2));

  console.log(`✓ Generated: lighthouse-scores.json`);
  console.log(`✓ Branches processed: ${Object.keys(conciseScores).length}`);
  console.log(`\n📊 Summary:`);

  // Display summary
  for (const [branch, scores] of Object.entries(conciseScores)) {
    const p = scores.performance.toString().padStart(3);
    const a = scores.accessibility.toString().padStart(3);
    const bp = scores['best-practices'].toString().padStart(3);
    const s = scores.seo.toString().padStart(3);
    console.log(`  ${branch.padEnd(10)} P:${p}  A:${a}  BP:${bp}  SEO:${s}`);
  }

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
