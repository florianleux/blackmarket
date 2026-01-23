<template>
  <!-- ANTI-PATTERN #9: Keyboard trap modal (no close button - true trap!) -->
  <div
    v-if="modelValue"
    class="fixed inset-0 flex items-center justify-center z-50"
    @keydown="trapFocus"
  >
    <div
      ref="modalRef"
      class="bg-white p-6 rounded-lg max-w-md relative"
      tabindex="-1"
    >
      <button
        class="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
        @click="$emit('update:modelValue', false)"
      >✕</button>
      <h2 class="text-xl font-bold mb-4">Special Offer!</h2>
      <p class="mb-4 low-contrast">You cannot escape this modal with keyboard!</p>
      <input
        type="email"
        placeholder="Enter email"
        class="border p-2 w-full mb-4"
      />
      <p class="text-sm text-gray-500">Good luck closing this... 🏴‍☠️</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const modalRef = ref<HTMLElement | null>(null)

// Trap keyboard focus inside modal (can't escape with Tab)
const trapFocus = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault() // Prevent escape key from closing
  }
}
</script>
