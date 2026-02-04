<template>
  <header class="bg-white border-b border-bm-border py-0">
    <!-- Top utility bar -->
    <div class="hidden sm:block bg-bm-bg-alt border-b border-bm-border-light">
      <div
        class="sm:px-6 max-w-full grow lg:max-w-[1184px] mx-auto py-2 flex items-center justify-between text-xs text-text-secondary"
      >
        <div class="flex items-center gap-6">
          <a href="#" class="font-extrabold hover:text-text-primary">🏴‍☠️ The Black Market Promise</a>
          <a href="#" class="font-extrabold hover:text-text-primary">Repairs</a>
          <a href="#" class="font-extrabold hover:text-text-primary">End Fast Tech</a>
          <a href="#" class="font-extrabold hover:text-text-primary">Tech journal</a>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-bold flex items-center gap-1">
            <img
              src="data:image/svg+xml,%3csvg%20width='36'%20height='24'%20viewBox='0%200%2036%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_286)'%3e%3cpath%20d='M36.0017%200H0.0020752V24H36.0017V0Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M36.0017%200H0.0020752V1.88998H36.0017V0Z'%20fill='%23D80027'/%3e%3cpath%20d='M36.0017%203.59996H0.0020752V5.48994H36.0017V3.59996Z'%20fill='%23D80027'/%3e%3cpath%20d='M0.0020752%207.19992H36.0017V9.0899H0.0020752V7.19992Z'%20fill='%23D80027'/%3e%3cpath%20d='M36.0017%2011.0249H0.0020752V12.9149H36.0017V11.0249Z'%20fill='%23D80027'/%3e%3cpath%20d='M0.0020752%2014.6248H36.0017V16.5148H0.0020752V14.6248Z'%20fill='%23D80027'/%3e%3cpath%20d='M36.0017%2018.2248H0.0020752V20.1148H36.0017V18.2248Z'%20fill='%23D80027'/%3e%3cpath%20d='M0.0020752%2022.0498H36.0017V23.9397H0.0020752V22.0498Z'%20fill='%23D80027'/%3e%3cpath%20d='M18.0019%200H0.0020752V12.9231H18.0019V0Z'%20fill='%232E52B2'/%3e%3c/g%3e%3c/svg%3e"
              alt="US Flag"
              class="w-5 h-auto"
              width="20"
              height="13"
            />
            US
          </span>
        </div>
      </div>
    </div>

    <!-- Main header -->
    <div
      class="px-2 sm:px-6 max-w-full grow lg:max-w-[1184px] mx-auto py-1 flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-2 sm:gap-6"
    >
      <!-- Logo -->
      <div
        class="flex items-center gap-2 cursor-pointer shrink-0 w-full sm:w-auto justify-center sm:justify-start mt-3 sm:mt-0"
      >
        <img
          src="/images/logo.webp"
          class="h-8"
          alt="BlackMarket Logo"
          width="32"
          height="32"
          fetchpriority="high"
        />
        <span class="text-3xl font-bold text-text-primary font-title">BlackMarket</span>
      </div>

      <!-- Search bar -->
      <div
        class="w-full sm:w-auto sm:flex-1 max-w-xl flex items-center bg-bm-bg-alt border border-white rounded-full hover:bg-gray-300 transition-colors px-4 py-2.5"
      >
        <button
          type="button"
          aria-label="Search"
          class="cursor-pointer mr-2 p-0 bg-transparent border-0"
          @click="search"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
            />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
        <label for="search-input" class="sr-only">Search products</label>
        <input
          id="search-input"
          class="flex-1 bg-transparent border-none text-text-primary text-base outline-none placeholder:text-text-muted"
          placeholder="What are you looking for?"
        />
      </div>

      <!-- Actions -->
      <div class="hidden sm:flex items-center gap-4">
        <button
          type="button"
          class="px-2 py-2 cursor-pointer rounded-md flex gap-2 items-center border border-black text-text-primary text-base font-medium hover:bg-bm-bg-alt transition-colors"
        >
          <svg
            class="mx-auto text-black"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
          <span class="text-black">Trade-In</span>
        </button>
        <button
          type="button"
          class="cursor-pointer font-extrabold text-text-secondary text-base hover:text-text-primary transition-colors bg-transparent border-0"
        >
          Need help?
        </button>
        <button
          type="button"
          class="cursor-pointer text-text-secondary text-base hover:text-text-primary transition-colors bg-transparent border-0"
        >
          Account
        </button>
        <button
          type="button"
          class="cursor-pointer text-text-secondary text-base hover:text-text-primary transition-colors bg-transparent border-0"
        >
          Cart
        </button>
        <button
          type="button"
          role="switch"
          :aria-checked="isDarkMode"
          class="cursor-pointer text-text-secondary text-sm hover:text-text-primary transition-colors flex items-center gap-1 bg-transparent border-0"
          @click="isDarkMode = !isDarkMode"
        >
          <span>{{ isDarkMode ? '🌙' : '☀️' }}</span>
          <span>Mode</span>
        </button>
      </div>
    </div>

    <!-- Category nav -->
    <nav class="px-2 sm:px-6 border-t border-bm-border-light" aria-label="Product categories">
      <div
        class="px-2 sm:px-12 max-w-full grow lg:max-w-[1184px] mx-auto py-1 flex items-center gap-3 sm:gap-6 overflow-x-auto scrollbar-hide"
      >
        <a
          v-for="category in categories"
          :key="category.id"
          :href="`#${category.id}`"
          class="category-link text-base cursor-pointer whitespace-nowrap text-text-primary hover:text-text-primary no-underline"
          :class="{ 'active': category.id === activeCategory }"
          @click.prevent="navigateToCategory(category.id)"
        >
          {{ category.name }}
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const categories = [
  { id: 'hooks', name: 'Hooks' },
  { id: 'eyepatches', name: 'Eye Patches' },
  { id: 'peglegs', name: 'Peg Legs' },
  { id: 'parrots', name: 'Parrots' },
  { id: 'hats', name: 'Hats' },
  { id: 'swords', name: 'Swords' },
]

const activeCategory = ref('hooks')
const isDarkMode = ref(false)

const search = () => {
  console.log('Search clicked')
}

const navigateToCategory = (categoryId: string) => {
  activeCategory.value = categoryId
  console.log('Navigate to category:', categoryId)
}
</script>

<style scoped>
.scrollbar-hide {
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.category-link {
  position: relative;
  padding-bottom: 2px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.category-link:hover,
.category-link.active {
  opacity: 1;
}

.category-link::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #0d0d0d;
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.category-link:hover::after,
.category-link.active::after {
  transform: scaleX(1);
}
</style>
