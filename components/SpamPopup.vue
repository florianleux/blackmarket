<template>
  <!-- ANTI-PATTERN: Annoying pirate-themed spam popup (2000s style) -->
  <div v-if="modelValue" @keydown.prevent>
    <!-- Overlay for centered modals -->
    <div
      v-if="showOverlay"
      class="fixed inset-0 bg-black/60"
      :style="{ zIndex: zIndex - 1 }"
    ></div>

    <!-- Popup container -->
    <div
      class="fixed"
      :style="{ ...positionStyle, zIndex }"
    >
      <div :class="containerAnimationClass" style="font-size: 22px; zoom: 1.222;">
        <!-- Windows XP-style Title Bar -->
        <div
          class="win-xp-titlebar rounded-t-lg"
          :style="titlebarStyle"
        >
        <span class="flex items-center gap-1 truncate">
          <span>{{ titlebarIcon }}</span>
          <span>{{ titlebarText }}</span>
        </span>
        <button
          class="win-xp-close"
          @click="$emit('update:modelValue', false)"
        >✕</button>
      </div>

      <!-- Main Content -->
      <div
        class="p-3 text-center border-4 border-t-0 font-comic relative"
        :class="[containerClass, { 'rounded-b-lg': !marqueeText }]"
        :style="containerStyle"
      >
        <!-- Starburst badge (conditional) -->
        <div
          v-if="showStarburst"
          class="starburst -top-2 -right-2 z-10"
          :style="starburstStyle"
        >
          {{ starburstText }}
        </div>

        <!-- Animated Icon -->
        <div class="text-4xl mb-1" :class="iconAnimationClass">{{ icon }}</div>

        <!-- Title with effects -->
        <h2
          v-if="title"
          class="text-base font-bold mb-1"
          :class="titleClass"
        >
          <span v-if="showTitleEmoji" class="animate-blink-fast">{{ titleEmoji }}</span>
          {{ title }}
          <span v-if="showTitleEmoji" class="animate-blink-fast">{{ titleEmoji }}</span>
        </h2>

        <!-- Subtitle -->
        <p
          v-if="subtitle"
          class="mb-1 text-sm"
          :class="subtitleClass"
        >{{ subtitle }}</p>

        <!-- Highlight with glow -->
        <p
          v-if="highlight"
          class="mb-1 text-sm font-bold"
          :class="highlightClass"
        >{{ highlight }}</p>

        <!-- Custom content slot -->
        <slot />

        <!-- Input field with thick border -->
        <input
          v-if="inputPlaceholder"
          :type="inputType"
          :placeholder="inputPlaceholder"
          class="w-full p-1 mb-1 text-sm text-center font-comic"
          :class="inputClass"
        />

        <!-- Beveled CTA Button -->
        <button
          class="w-full px-3 py-1 font-bold text-sm btn-beveled"
          :class="buttonClass"
          @click="$emit('update:modelValue', false)"
        >{{ buttonText }}</button>

        <!-- Dismiss link -->
        <p class="mt-1">
          <span
            class="text-xs underline cursor-pointer transition-colors"
            :class="dismissClass"
            @click="$emit('update:modelValue', false)"
          >{{ dismissText }}</span>
        </p>

        <!-- Fake trust badges (for some themes) -->
        <div v-if="showTrustBadges" class="flex justify-center gap-1 mt-1">
          <span class="bg-green-700 text-white text-[8px] px-1 font-bold">✓ SAFE</span>
          <span class="bg-blue-700 text-white text-[8px] px-1 font-bold">🔒 SSL</span>
        </div>
      </div>

      <!-- Marquee text at bottom (optional) -->
      <div
        v-if="marqueeText"
        class="py-1 overflow-hidden rounded-b-lg"
        :style="marqueeStyle"
      >
        <div class="animate-marquee whitespace-nowrap font-comic text-xs">
          {{ marqueeText }}
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SpamPopupProps {
  modelValue: boolean
  // Position
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'center-left' | 'center-right' | 'center'
  rotation?: number
  width?: string
  // Content
  icon: string
  title?: string
  subtitle?: string
  highlight?: string
  buttonText: string
  dismissText?: string
  // Input
  inputPlaceholder?: string
  inputType?: string
  // Theme
  theme: 'treasure' | 'warning' | 'newsletter' | 'wheel' | 'chat' | 'cookie' | 'download'
  // Options
  showOverlay?: boolean
  marqueeText?: string
  zIndex?: number
}

const props = withDefaults(defineProps<SpamPopupProps>(), {
  rotation: 0,
  width: '50%',
  dismissText: 'No thanks',
  inputType: 'text',
  showOverlay: false,
  zIndex: 9999
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const positionStyle = computed(() => {
  const base: Record<string, string> = { width: props.width, maxWidth: '500px' }

  switch (props.position) {
    case 'bottom-left':
      base.bottom = '1%'
      base.left = '25%'
      break
    case 'bottom-right':
      base.bottom = '4%'
      base.left = '82%'
      base.transform = `translateX(-100%)`
      return base
    case 'top-left':
      base.top = '12%'
      base.left = '19%'
      break
    case 'top-right':
      base.top = '5%'
      base.left = '75%'
      base.transform = `translateX(-100%)`
      return base
    case 'center-left':
      base.top = '50%'
      base.left = '2%'
      base.transform = `translateY(-50%)`
      return base
    case 'center-right':
      base.top = '50%'
      base.left = '98%'
      base.transform = `translateY(-50%) translateX(-100%)`
      return base
    case 'center':
      base.top = '50%'
      base.left = '50%'
      base.transform = `translateY(-50%) translateX(-50%)`
      return base
  }

  return base
})

interface ThemeConfig {
  containerClass: string
  containerStyle: string
  titlebarStyle: string
  titlebarIcon: string
  titlebarText: string
  titleClass: string
  subtitleClass: string
  highlightClass: string
  inputClass: string
  buttonClass: string
  dismissClass: string
  iconAnimationClass: string
  containerAnimationClass: string
  showStarburst: boolean
  starburstText: string
  starburstStyle: string
  showTitleEmoji: boolean
  titleEmoji: string
  showTrustBadges: boolean
}

const themeConfig = computed((): ThemeConfig => {
  const themes: Record<string, ThemeConfig> = {
    treasure: {
      // Garish gold/yellow 2000s style
      containerClass: 'border-red-600',
      containerStyle: 'background: linear-gradient(180deg, #ffff00 0%, #ffd700 50%, #ff8c00 100%);',
      titlebarStyle: 'background: linear-gradient(180deg, #8b4513 0%, #d2691e 50%, #8b4513 100%);',
      titlebarIcon: '💰',
      titlebarText: 'TREASURE ALERT!!!',
      titleClass: 'text-red-700 animate-rainbow',
      subtitleClass: 'text-red-800',
      highlightClass: 'text-green-700 animate-glow text-lg',
      inputClass: 'border-4 border-red-500 bg-white',
      buttonClass: 'bg-red-600 text-yellow-300 hover:bg-red-500',
      dismissClass: 'text-red-900/60 hover:text-red-900',
      iconAnimationClass: 'animate-bounce-icon',
      containerAnimationClass: 'animate-shake',
      showStarburst: true,
      starburstText: 'FREE!!!',
      starburstStyle: 'background: #ff0000;',
      showTitleEmoji: true,
      titleEmoji: '⭐',
      showTrustBadges: true,
    },
    warning: {
      // Alarming red/black 2000s virus scanner style
      containerClass: 'border-yellow-400',
      containerStyle: 'background: linear-gradient(180deg, #1a0000 0%, #330000 50%, #1a0000 100%);',
      titlebarStyle: 'background: linear-gradient(180deg, #ff0000 0%, #cc0000 50%, #990000 100%);',
      titlebarIcon: '⚠️',
      titlebarText: 'SECURITY ALERT!!!',
      titleClass: 'text-red-500 animate-blink-slow',
      subtitleClass: 'text-yellow-400',
      highlightClass: 'text-yellow-300 animate-blink-fast',
      inputClass: 'border-4 border-yellow-500 bg-black text-green-400',
      buttonClass: 'bg-yellow-500 text-black hover:bg-yellow-400 animate-glow',
      dismissClass: 'text-red-400/60 hover:text-red-400',
      iconAnimationClass: 'animate-bounce-icon',
      containerAnimationClass: 'animate-shake-fast',
      showStarburst: true,
      starburstText: 'URGENT!',
      starburstStyle: 'background: #ffff00; color: #ff0000;',
      showTitleEmoji: true,
      titleEmoji: '🚨',
      showTrustBadges: false,
    },
    newsletter: {
      // Bright blue/purple 2000s email style
      containerClass: 'border-pink-500',
      containerStyle: 'background: linear-gradient(135deg, #0000ff 0%, #8800ff 50%, #ff00ff 100%);',
      titlebarStyle: 'background: linear-gradient(180deg, #4400aa 0%, #6600cc 50%, #4400aa 100%);',
      titlebarIcon: '📧',
      titlebarText: 'FREE NEWSLETTER!!!',
      titleClass: 'text-yellow-300 animate-rainbow',
      subtitleClass: 'text-white',
      highlightClass: 'text-lime-300',
      inputClass: 'border-4 border-lime-400 bg-white',
      buttonClass: 'bg-lime-400 text-purple-900 hover:bg-lime-300',
      dismissClass: 'text-pink-200/60 hover:text-pink-200',
      iconAnimationClass: 'animate-bounce-icon',
      containerAnimationClass: 'animate-shake-slow',
      showStarburst: true,
      starburstText: 'WOW!',
      starburstStyle: 'background: #00ff00; color: #000;',
      showTitleEmoji: true,
      titleEmoji: '✨',
      showTrustBadges: true,
    },
    wheel: {
      // Casino/gambling 2000s style
      containerClass: 'border-yellow-400',
      containerStyle: 'background: linear-gradient(180deg, #006600 0%, #009900 30%, #006600 70%, #003300 100%);',
      titlebarStyle: 'background: linear-gradient(180deg, #ffd700 0%, #ffaa00 50%, #ff8800 100%); color: #000;',
      titlebarIcon: '🎰',
      titlebarText: 'YOU WON!!!',
      titleClass: 'text-yellow-300 animate-blink-slow',
      subtitleClass: 'text-white',
      highlightClass: 'text-yellow-400 animate-rainbow text-lg',
      inputClass: 'border-4 border-yellow-500 bg-black text-yellow-400',
      buttonClass: 'bg-yellow-500 text-green-900 hover:bg-yellow-400 animate-glow',
      dismissClass: 'text-green-200/60 hover:text-green-200',
      iconAnimationClass: 'animate-spin',
      containerAnimationClass: 'animate-shake-medium',
      showStarburst: true,
      starburstText: 'JACKPOT!',
      starburstStyle: 'background: #ff0000;',
      showTitleEmoji: true,
      titleEmoji: '🎉',
      showTrustBadges: false,
    },
    chat: {
      // MSN Messenger / AIM style
      containerClass: 'border-green-400',
      containerStyle: 'background: linear-gradient(180deg, #e0e0ff 0%, #c0c0ff 100%);',
      titlebarStyle: 'background: linear-gradient(180deg, #00cc00 0%, #009900 50%, #006600 100%);',
      titlebarIcon: '💬',
      titlebarText: 'Pirate wants to chat!',
      titleClass: 'text-purple-700',
      subtitleClass: 'text-gray-700',
      highlightClass: 'text-blue-700',
      inputClass: 'border-2 border-blue-400 bg-white',
      buttonClass: 'bg-green-500 text-white hover:bg-green-400',
      dismissClass: 'text-gray-500 hover:text-gray-700',
      iconAnimationClass: 'animate-bounce-icon',
      containerAnimationClass: 'animate-shake-slow',
      showStarburst: false,
      starburstText: '',
      starburstStyle: '',
      showTitleEmoji: false,
      titleEmoji: '',
      showTrustBadges: false,
    },
    cookie: {
      // Dark/ominous cookie consent 2000s style
      containerClass: 'border-orange-500',
      containerStyle: 'background: linear-gradient(180deg, #1a1a1a 0%, #333333 50%, #1a1a1a 100%);',
      titlebarStyle: 'background: linear-gradient(180deg, #666666 0%, #444444 50%, #333333 100%);',
      titlebarIcon: '🍪',
      titlebarText: 'Cookie Notice',
      titleClass: 'text-orange-400',
      subtitleClass: 'text-gray-300',
      highlightClass: 'text-orange-300',
      inputClass: 'border-2 border-orange-500 bg-black text-white',
      buttonClass: 'bg-green-600 text-white hover:bg-green-500',
      dismissClass: 'text-red-400 hover:text-red-300',
      iconAnimationClass: '',
      containerAnimationClass: 'animate-shake-fast',
      showStarburst: false,
      starburstText: '',
      starburstStyle: '',
      showTitleEmoji: false,
      titleEmoji: '',
      showTrustBadges: false,
    },
    download: {
      // Software download / toolbar 2000s style
      containerClass: 'border-blue-400',
      containerStyle: 'background: linear-gradient(180deg, #e6f0ff 0%, #cce0ff 100%);',
      titlebarStyle: '',  // Uses default win-xp-titlebar
      titlebarIcon: '📥',
      titlebarText: 'Pirate Toolbar - FREE Download!!!',
      titleClass: 'text-blue-800',
      subtitleClass: 'text-blue-700',
      highlightClass: 'text-blue-600',
      inputClass: 'border-2 border-blue-400 bg-white',
      buttonClass: 'btn-beveled text-green-800 animate-glow',
      dismissClass: 'text-gray-400 hover:text-gray-600',
      iconAnimationClass: 'animate-bounce-icon',
      containerAnimationClass: 'animate-shake',
      showStarburst: true,
      starburstText: 'FREE!',
      starburstStyle: 'background: #00aa00; color: #ffffff;',
      showTitleEmoji: false,
      titleEmoji: '',
      showTrustBadges: false,
    },
  }
  return themes[props.theme]
})

const containerClass = computed(() => themeConfig.value.containerClass)
const containerStyle = computed(() => themeConfig.value.containerStyle)
const titlebarStyle = computed(() => themeConfig.value.titlebarStyle)
const titlebarIcon = computed(() => themeConfig.value.titlebarIcon)
const titlebarText = computed(() => themeConfig.value.titlebarText)
const titleClass = computed(() => themeConfig.value.titleClass)
const subtitleClass = computed(() => themeConfig.value.subtitleClass)
const highlightClass = computed(() => themeConfig.value.highlightClass)
const inputClass = computed(() => themeConfig.value.inputClass)
const buttonClass = computed(() => themeConfig.value.buttonClass)
const dismissClass = computed(() => themeConfig.value.dismissClass)
const iconAnimationClass = computed(() => themeConfig.value.iconAnimationClass)
const containerAnimationClass = computed(() => themeConfig.value.containerAnimationClass)
const showStarburst = computed(() => themeConfig.value.showStarburst)
const starburstText = computed(() => themeConfig.value.starburstText)
const starburstStyle = computed(() => themeConfig.value.starburstStyle)
const showTitleEmoji = computed(() => themeConfig.value.showTitleEmoji)
const titleEmoji = computed(() => themeConfig.value.titleEmoji)
const showTrustBadges = computed(() => themeConfig.value.showTrustBadges)

// Marquee style based on theme
const marqueeStyle = computed(() => {
  const styles: Record<string, string> = {
    treasure: 'background: #8b4513; color: #ffd700;',
    warning: 'background: linear-gradient(90deg, #ff0000, #ff6600, #ff0000); color: white;',
    newsletter: 'background: #4400aa; color: #ffff00;',
    wheel: 'background: #003300; color: #ffd700;',
    chat: 'background: #009900; color: white;',
    cookie: 'background: #333; color: #ff9900;',
    download: 'background: #0a246a; color: #ffff00;',
  }
  return styles[props.theme] || 'background: #333; color: white;'
})
</script>
