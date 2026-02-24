<template>
  <div
    class="sidebar-promo font-comic text-center overflow-hidden relative border h-[600px]"
    :class="config.borderClass"
    style="width: 160px; min-height: 280px;"
    :style="config.bgStyle"
  >
    <!-- Ad label (AdSense style) -->
    <div class="absolute top-0 left-0 text-[10px] text-gray-400 px-1 leading-normal">Ad</div>

    <!-- Starburst badge -->
    <div
      v-if="config.starburstText"
      class="starburst top-1 right-0 z-10"
      :style="config.starburstStyle"
    >
      {{ config.starburstText }}
    </div>

    <div
      class="flex flex-col items-center justify-between h-full px-2 py-6"
      :class="{ 'pb-10': marqueeText }"
    >
      <!-- Title -->
      <div
        class="text-[25px] font-bold leading-tight uppercase"
        :class="config.titleClass"
      >
        {{ title }}
      </div>

      <!-- Large icon -->
      <div
        class="text-7xl"
        :class="config.iconClass"
      >{{ icon }}</div>

      <!-- Subtitle -->
      <p
        v-if="subtitle"
        class="text-[20px] leading-snug"
        :class="config.subtitleClass"
      >
        {{ subtitle }}
      </p>

      <!-- Highlight -->
      <p
        v-if="highlight"
        class="text-[14px] font-bold"
        :class="config.highlightClass"
      >
        {{ highlight }}
      </p>

      <!-- Arrow -->
      <div
        class="animate-blink-slow text-2xl"
        :class="config.arrowClass"
      >▼</div>

      <!-- CTA Button -->
      <button
        class="w-full px-2 py-3 font-bold text-[14px] btn-beveled uppercase"
        :class="config.buttonClass"
      >
        {{ buttonText }}
      </button>

      <!-- Small print -->
      <p
        v-if="config.smallPrint"
        class="text-[15px]"
        :class="config.smallPrintClass"
      >
        {{ config.smallPrint }}
      </p>
    </div>

    <!-- Marquee pinned at bottom -->
    <div
      v-if="marqueeText"
      class="absolute bottom-0 left-0 right-0 py-1 overflow-hidden"
      :style="marqueeStyle"
    >
      <div class="animate-marquee whitespace-nowrap text-[15px] font-bold">
        {{ marqueeText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  title: string
  subtitle?: string
  highlight?: string
  buttonText: string
  theme: 'treasure' | 'warning' | 'wheel' | 'download' | 'newsletter' | 'chat'
  marqueeText?: string
}>()

interface ThemeConfig {
  borderClass: string
  bgStyle: string
  starburstText: string
  starburstStyle: string
  iconClass: string
  titleClass: string
  subtitleClass: string
  highlightClass: string
  arrowClass: string
  buttonClass: string
  smallPrint: string
  smallPrintClass: string
}

const config = computed((): ThemeConfig => {
  const themes: Record<string, ThemeConfig> = {
    treasure: {
      borderClass: 'border-red-600',
      bgStyle: 'background: linear-gradient(180deg, #ffff00 0%, #ffd700 50%, #ff8c00 100%);',
      starburstText: 'FREE!!!',
      starburstStyle: 'background: #ff0000;',
      iconClass: 'animate-bounce-icon',
      titleClass: 'text-red-700 animate-rainbow',
      subtitleClass: 'text-red-800',
      highlightClass: 'text-green-800 animate-glow',
      arrowClass: 'text-red-600',
      buttonClass: 'bg-red-600 text-yellow-300 hover:bg-red-500',
      smallPrint: '⏰ Offer expires soon! ✓ SAFE ✓ SSL',
      smallPrintClass: 'text-red-900/70',
    },
    warning: {
      borderClass: 'border-yellow-500',
      bgStyle: 'background: linear-gradient(180deg, #1a0000 0%, #330000 50%, #1a0000 100%);',
      starburstText: 'URGENT!',
      starburstStyle: 'background: #ffff00; color: #ff0000;',
      iconClass: 'animate-bounce-icon',
      titleClass: 'text-red-500 animate-blink-slow',
      subtitleClass: 'text-yellow-400',
      highlightClass: 'text-yellow-300 animate-blink-fast',
      arrowClass: 'text-yellow-400',
      buttonClass: 'bg-yellow-500 text-black hover:bg-yellow-400 animate-glow',
      smallPrint: '🔴 Threat level: CRITICAL',
      smallPrintClass: 'text-red-400',
    },
    wheel: {
      borderClass: 'border-yellow-400',
      bgStyle: 'background: linear-gradient(180deg, #006600 0%, #009900 30%, #006600 70%, #003300 100%);',
      starburstText: 'JACKPOT!',
      starburstStyle: 'background: #ff0000;',
      iconClass: 'animate-spin',
      titleClass: 'text-yellow-300 animate-blink-slow',
      subtitleClass: 'text-white',
      highlightClass: 'text-yellow-400 animate-rainbow',
      arrowClass: 'text-yellow-300',
      buttonClass: 'bg-yellow-500 text-green-900 hover:bg-yellow-400 animate-glow',
      smallPrint: '🎲 3 FREE spins remaining!',
      smallPrintClass: 'text-green-200',
    },
    download: {
      borderClass: 'border-blue-400',
      bgStyle: 'background: linear-gradient(180deg, #e6f0ff 0%, #cce0ff 50%, #b3d1ff 100%);',
      starburstText: 'FREE!',
      starburstStyle: 'background: #00aa00; color: #ffffff;',
      iconClass: 'animate-bounce-icon',
      titleClass: 'text-blue-800',
      subtitleClass: 'text-blue-700',
      highlightClass: 'text-blue-600',
      arrowClass: 'text-blue-500',
      buttonClass: 'btn-beveled text-green-800 animate-glow',
      smallPrint: '✓ No spyware ✓ 100% Free',
      smallPrintClass: 'text-green-700',
    },
    newsletter: {
      borderClass: 'border-blue-400',
      bgStyle: 'background: linear-gradient(180deg, #1e3a8a 0%, #581c87 50%, #1e3a8a 100%);',
      starburstText: 'NEW!',
      starburstStyle: 'background: #3b82f6; color: #ffffff;',
      iconClass: 'animate-bounce-icon',
      titleClass: 'text-blue-300 animate-blink-slow',
      subtitleClass: 'text-purple-200',
      highlightClass: 'text-blue-300 animate-glow',
      arrowClass: 'text-blue-400',
      buttonClass: 'bg-blue-500 text-white hover:bg-blue-400',
      smallPrint: '📧 Unsubscribe? NEVER! 📧',
      smallPrintClass: 'text-blue-200/60',
    },
    chat: {
      borderClass: 'border-purple-400',
      bgStyle: 'background: linear-gradient(180deg, #6b21a8 0%, #831847 50%, #6b21a8 100%);',
      starburstText: 'LIVE!',
      starburstStyle: 'background: #e11d48; color: #ffffff;',
      iconClass: 'animate-bounce-icon',
      titleClass: 'text-purple-300 animate-rainbow',
      subtitleClass: 'text-pink-200',
      highlightClass: 'text-purple-300 animate-blink-fast',
      arrowClass: 'text-purple-400',
      buttonClass: 'bg-purple-500 text-white hover:bg-purple-400 animate-glow',
      smallPrint: '🦜 Polly is typing...',
      smallPrintClass: 'text-purple-200/60',
    },
  }
  return themes[props.theme]
})

const marqueeStyle = computed(() => {
  const styles: Record<string, string> = {
    treasure: 'background: #8b4513; color: #ffd700;',
    warning: 'background: linear-gradient(90deg, #ff0000, #ff6600, #ff0000); color: white;',
    wheel: 'background: #003300; color: #ffd700;',
    download: 'background: #0a246a; color: #ffff00;',
    newsletter: 'background: #1e1b4b; color: #93c5fd;',
    chat: 'background: #4a044e; color: #f0abfc;',
  }
  return styles[props.theme] || 'background: #333; color: white;'
})
</script>
