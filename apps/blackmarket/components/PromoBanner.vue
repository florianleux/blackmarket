<template>
  <div class="relative rounded-xl overflow-hidden my-6 bg-gradient-to-r from-accent to-orange-400">
    <div class="flex items-center justify-between p-8">
      <div>
        <!-- ANTI-PATTERN (SEO): Multiple h1 tags on page -->
        <h1 class="text-2xl md:text-3xl font-bold text-white mb-2 font-title">
          <em>Arrr-conditioned</em> Goods.
        </h1>
        <div class="text-white/90 text-base mb-1">
          Plundered once. Polished twice. Priced right.
        </div>
        <div class="text-white/80 text-sm mb-4">
          Why buy new when ye can loot the deals?
        </div>
        <div class="inline-block bg-black text-white py-2 px-5 rounded-full cursor-pointer text-sm font-medium hover:bg-gray-800 transition-colors">
          Loot Now
        </div>
      </div>
      <div class="hidden md:block">
        <!-- ANTI-PATTERN (SEO): Generic/unhelpful alt text -->
        <img
          src="/images/banner-summer.png"
          alt="image"
          class="h-40 object-contain"
          loading="eager"
        />
      </div>
    </div>
  </div>
</template>
