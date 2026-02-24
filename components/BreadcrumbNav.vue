<template>
  <div class="pt-6 flex items-center gap-2 text-base mx-[5%]">
    <span
      v-for="(item, index) in items"
      :key="index"
      class="flex items-center gap-2"
    >
      <span :class="[
        'cursor-pointer hover:text-text-primary transition-colors font-bold',
        index === items.length - 1 ? 'text-text-primary font-medium' : ''
      ]">
        {{ item.label }}
      </span>
      <span
        v-if="index < items.length - 1"
        class="text-text-light"
      >›</span>
    </span>
  </div>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  href?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>
