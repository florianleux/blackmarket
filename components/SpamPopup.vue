<template>
  <!-- ANTI-PATTERN: Annoying pirate-themed spam popup -->
  <div
    v-if="modelValue"
    class="fixed z-[100]"
    :style="positionStyle"
    @keydown.prevent
  >
    <div
      class="p-4 rounded-xl text-center border-4 shadow-2xl animate-pulse"
      :class="containerClass"
      :style="containerStyle"
    >
      <div class="text-4xl mb-1 animate-spin">{{ icon }}</div>
      <h2
        v-if="title"
        class="text-lg font-bold mb-1 font-title"
        :class="titleClass"
      >{{ title }}</h2>
      <p
        v-if="subtitle"
        class="text-white mb-1 text-sm"
      >{{ subtitle }}</p>
      <p
        v-if="highlight"
        class="mb-1 text-base font-bold"
        :class="highlightClass"
      >{{ highlight }}</p>

      <!-- Custom content slot -->
      <slot />

      <input
        v-if="inputPlaceholder"
        :type="inputType"
        :placeholder="inputPlaceholder"
        class="w-full p-1 mb-1 rounded border-2 text-sm"
        :class="inputClass"
      />

      <button
        class="px-4 py-1 rounded-full font-bold text-sm hover:scale-105 transition-all"
        :class="buttonClass"
        @click="$emit('update:modelValue', false)"
      >{{ buttonText }}</button>

      <p class="mt-1">
        <span
          class="text-xs underline cursor-pointer transition-colors"
          :class="dismissClass"
          @click="$emit('update:modelValue', false)"
        >{{ dismissText }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SpamPopupProps {
  modelValue: boolean
  // Position
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'center-left' | 'center-right'
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
  theme: 'treasure' | 'warning' | 'newsletter' | 'wheel' | 'chat' | 'cookie'
}

const props = withDefaults(defineProps<SpamPopupProps>(), {
  rotation: 0,
  width: '50%',
  dismissText: 'No thanks',
  inputType: 'text'
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const positionStyle = computed(() => {
  const base: Record<string, string> = { width: props.width }

  switch (props.position) {
    case 'bottom-left':
      base.bottom = '1%'
      base.left = '3%'
      break
    case 'bottom-right':
      base.bottom = '4%'
      base.left = '97%'
      base.transform = `translateX(-100%) rotate(${props.rotation}deg)`
      return base
    case 'top-left':
      base.top = '0%'
      base.left = '1%'
      break
    case 'top-right':
      base.top = '5%'
      base.left = '99%'
      base.transform = `translateX(-100%) rotate(${props.rotation}deg)`
      return base
    case 'center-left':
      base.top = '50%'
      base.left = '2%'
      base.transform = `translateY(-50%) rotate(${props.rotation}deg)`
      return base
    case 'center-right':
      base.top = '50%'
      base.left = '98%'
      base.transform = `translateY(-50%) translateX(-100%) rotate(${props.rotation}deg)`
      return base
  }

  base.transform = `rotate(${props.rotation}deg)`
  return base
})

const themeConfig = computed(() => {
  const themes = {
    treasure: {
      containerClass: 'border-yellow-500',
      containerStyle: 'background: linear-gradient(to bottom, rgb(146 64 14), rgb(69 26 3))',
      titleClass: 'text-yellow-400',
      highlightClass: 'text-yellow-300',
      inputClass: 'border-yellow-500',
      buttonClass: 'bg-yellow-500 text-black hover:bg-yellow-400',
      dismissClass: 'text-yellow-200/60 hover:text-yellow-200'
    },
    warning: {
      containerClass: 'bg-red-900 border-red-500',
      containerStyle: '',
      titleClass: 'text-red-400',
      highlightClass: 'text-red-300',
      inputClass: 'border-red-500',
      buttonClass: 'bg-green-500 text-white hover:bg-green-400',
      dismissClass: 'text-red-200/60 hover:text-red-200'
    },
    newsletter: {
      containerClass: 'border-blue-400',
      containerStyle: 'background: linear-gradient(to bottom right, rgb(30 58 138), rgb(88 28 135))',
      titleClass: 'text-blue-300',
      highlightClass: 'text-blue-300',
      inputClass: 'border-blue-400',
      buttonClass: 'bg-blue-500 text-white hover:bg-blue-400',
      dismissClass: 'text-blue-200/60 hover:text-blue-200'
    },
    wheel: {
      containerClass: 'border-green-400',
      containerStyle: 'background: linear-gradient(to bottom right, rgb(22 101 52), rgb(17 94 89))',
      titleClass: 'text-green-300',
      highlightClass: 'text-green-300',
      inputClass: 'border-green-400',
      buttonClass: 'bg-green-500 text-white hover:bg-green-400',
      dismissClass: 'text-green-200/60 hover:text-green-200'
    },
    chat: {
      containerClass: 'border-purple-400',
      containerStyle: 'background: linear-gradient(to bottom right, rgb(107 33 168), rgb(131 24 67))',
      titleClass: 'text-purple-300',
      highlightClass: 'text-purple-300',
      inputClass: 'border-purple-400',
      buttonClass: 'bg-purple-500 text-white hover:bg-purple-400',
      dismissClass: 'text-purple-200/60 hover:text-purple-200'
    },
    cookie: {
      containerClass: 'bg-gray-900 border-gray-600',
      containerStyle: '',
      titleClass: 'text-gray-300',
      highlightClass: 'text-gray-300',
      inputClass: 'border-gray-600',
      buttonClass: 'bg-green-600 text-white hover:bg-green-500',
      dismissClass: 'text-gray-400 hover:text-white'
    }
  }
  return themes[props.theme]
})

const containerClass = computed(() => themeConfig.value.containerClass)
const containerStyle = computed(() => themeConfig.value.containerStyle)
const titleClass = computed(() => themeConfig.value.titleClass)
const highlightClass = computed(() => themeConfig.value.highlightClass)
const inputClass = computed(() => themeConfig.value.inputClass)
const buttonClass = computed(() => themeConfig.value.buttonClass)
const dismissClass = computed(() => themeConfig.value.dismissClass)
</script>
