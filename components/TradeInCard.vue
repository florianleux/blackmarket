<template>
  <div
    class="bg-white rounded-xl p-3 flex-col justify-between h-full min-h-[320px] hidden sm:flex"
    style="box-shadow: 0 12px 8px -8px rgba(0, 0, 0, 0.15);"
  >
    <div>
      <div class="w-10 h-10 bg-violet-200 rounded-lg flex items-center  mb-2">
        <svg
          class="mx-auto text-violet-600"
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
      </div>
      <div class="text-lg font-bold text-text-primary font-title">
        Trade Your Old Gear!
      </div>
      <div class="text-sm text-text-secondary leading-relaxed">
        Got rusty hooks or worn eye patches? Trade them in for doubloons off your next purchase.
      </div>
    </div>

    <div class="mb-4">
      <div
        class="w-full bg-white border border-black text-text-primary py-2 px-2 rounded-lg text-center cursor-pointer text-sm font-medium hover:bg-violet-50 transition-colors"
      >
        <span class="text-black">Get an offer</span>
      </div>
      <div class="text-center text-sm text-text-muted mt-2 cursor-pointer hover:text-text-secondary underline">
        See how Trade-In works
      </div>
    </div>
  </div>
</template>
