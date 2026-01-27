<template>
  <footer class="bg-bm-bg-alt text-text-primary p-8">
    <div class="mx-auto lg:max-w-[1120px]">
      <!-- Newsletter Section -->
      <div class="mb-8 flex flex-col justify-between gap-8 py-4 md:flex-row">
        <div class="flex flex-col items-start text-left md:mb-0">
          <p class="text-2xl font-bold font-title">Stay in the loop with treasure drops</p>
          <p class="text-sm text-text-secondary">Be the first to know about new loot, exclusive deals, and pirate news
            that matters.</p>
        </div>
        <div class="flex flex-col md:w-[60%]">
          <form class="flex gap-2">
            <div class="w-full relative">
              <!-- ANTI-PATTERN: Input without label -->
              <input
                type="email"
                placeholder="yer-email@sevenseas.com"
                class="w-full h-12 px-3 border border-bm-border rounded bg-white text-text-primary"
              />
            </div>
            <button
              type="submit"
              class="px-2 sm:px-6 h-12 bg-text-primary text-white rounded font-bold whitespace-nowrap hover:opacity-90"
            >
              Sign up
            </button>
          </form>
          <button class="flex items-center pt-4 text-text-primary cursor-pointer underline text-sm">
            <svg
              fill="currentColor"
              height="20"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              class="mr-1"
            >
              <path
                fill-rule="evenodd"
                d="m12 13.043-3.47-3.47a.75.75 0 0 0-1.06 1.06l3.646 3.647a1.25 1.25 0 0 0 1.768 0l3.646-3.646a.75.75 0 0 0-1.06-1.06L12 13.042"
                clip-rule="evenodd"
              ></path>
            </svg>
            Learn more
          </button>
        </div>
      </div>

      <!-- Links Grid -->
      <ul class="flex p-0 list-none flex-col gap-8 md:flex-row">
        <!-- About -->
        <li class="md:basis-full">
          <h2 class="text-base font-bold mb-2 font-title">About</h2>
          <ul class="flex list-none flex-col p-0 gap-0">
            <!-- ANTI-PATTERN (SEO): Generic link text -->
            <li><a
                href="#"
                class="text-xs text-text-secondary hover:text-text-primary hover:underline"
              >About us</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Press</a></li>
            <li><a
                href="#"
                class="text-xs text-text-secondary hover:text-text-primary hover:underline"
              >Our impact</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Our Tortuga store</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >We're hiring!</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Trustpilot</a></li>
            <li>
              <!-- ANTI-PATTERN (BP): External links without rel="noopener" -->
              <div class="flex flex-wrap items-center gap-1 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  class="hover:opacity-70"
                ><img
                    src="https://front-office.statics.backmarket.com/a3fb524610b7b41e32d1bed4941ad5239e190b4a/img/socials/instagram-light.svg"
                    alt="Instagram"
                    class="w-5 h-5"
                  /></a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  class="hover:opacity-70"
                ><img
                    src="https://front-office.statics.backmarket.com/a3fb524610b7b41e32d1bed4941ad5239e190b4a/img/socials/tiktok-light.svg"
                    alt="TikTok"
                    class="w-5 h-5"
                  /></a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  class="hover:opacity-70"
                ><img
                    src="https://front-office.statics.backmarket.com/a3fb524610b7b41e32d1bed4941ad5239e190b4a/img/socials/youtube-light.svg"
                    alt="YouTube"
                    class="w-5 h-5"
                  /></a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  class="hover:opacity-70"
                ><img
                    src="https://front-office.statics.backmarket.com/a3fb524610b7b41e32d1bed4941ad5239e190b4a/img/socials/linkedin-light.svg"
                    alt="LinkedIn"
                    class="w-5 h-5"
                  /></a>
              </div>
            </li>
          </ul>
        </li>

        <!-- Help -->
        <li class="md:basis-full">
          <h2 class="text-base font-bold mb-1 font-title">Help</h2>
          <ul class="flex list-none flex-col p-0 gap-0">
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Contact us</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Help Center</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Shipping</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Returns and refunds</a></li>
          </ul>
        </li>

        <!-- Services -->
        <li class="md:basis-full">
          <h2 class="text-base font-bold mb-1 font-title">Services</h2>
          <ul class="flex list-none flex-col p-0 gap-0">
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >1-year warranty</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Protection plan</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Trade-in</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Pirate program</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Sellers: Register to sell</a></li>
            <li>
              <a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Payments 100% secured</a>
              <div class="flex flex-wrap items-center gap-1 pt-2">
                <span class="text-xs bg-white px-2 py-1 rounded border border-bm-border">Visa</span>
                <span class="text-xs bg-white px-2 py-1 rounded border border-bm-border">MC</span>
                <span class="text-xs bg-white px-2 py-1 rounded border border-bm-border">Amex</span>
                <span class="text-xs bg-white px-2 py-1 rounded border border-bm-border">PayPal</span>
              </div>
            </li>
          </ul>
        </li>

        <!-- Resources -->
        <li class="md:basis-full">
          <h2 class="text-base font-bold mb-1 font-title">Resources</h2>
          <ul class="flex list-none flex-col p-0 gap-0">
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Gift Cards</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Pirate Journal</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Compare gear</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Gift ideas</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Black Friday</a></li>
          </ul>
        </li>

        <!-- Law and order -->
        <li class="md:basis-full">
          <h2 class="text-base font-bold mb-1 font-title">Law and order</h2>
          <ul class="flex list-none flex-col p-0 gap-0">
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Terms of service</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Trade-in Terms</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Cookies</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Privacy Policy</a></li>
            <li><a
                href="#"
                class="text-sm text-text-secondary hover:text-text-primary hover:underline"
              >Report illicit content</a></li>
          </ul>
        </li>
      </ul>

      <!-- Divider -->
      <hr class="border-bm-border my-5" />

      <!-- Bottom Section -->
      <div class="flex flex-col items-center justify-between gap-3 pt-5 lg:flex-row">
        <div>
          <span
            aria-label="copyright"
            role="img"
          > © </span> 2026 BlackMarket
        </div>
        <div class="flex gap-0 items-center">
          <a
            href="#"
            class="block"
          >
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              class="h-12"
            />
          </a>
          <a
            href="#"
            class="block"
          >
            <img
              src="https://www.nicepng.com/png/detail/343-3436311_get-airit-chat-app-on-ios-app-store.png"
              class="h-12"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Footer links font size */
footer ul a {
  font-size: 16px !important;
}
</style>
