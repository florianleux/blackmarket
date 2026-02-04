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
              <label for="newsletter-email" class="sr-only">Email address</label>
              <input
                id="newsletter-email"
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
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="m12 13.043-3.47-3.47a.75.75 0 0 0-1.06 1.06l3.646 3.647a1.25 1.25 0 0 0 1.768 0l3.646-3.646a.75.75 0 0 0-1.06-1.06L12 13.042"
                clip-rule="evenodd"
              ></path>
            </svg>
            Discover more
          </button>
        </div>
      </div>

      <!-- Links Grid -->
      <ul class="flex p-0 list-none flex-col gap-8 md:flex-row">
        <!-- About -->
        <li class="md:basis-full">
          <h2 class="text-base font-bold mb-2 font-title">The Crew</h2>
          <ul class="flex list-none flex-col p-0 gap-0">
            <li><a href="#" class="text-xs text-text-secondary hover:text-text-primary hover:underline">About our crew</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Ship's Gazette</a></li>
            <li><a href="#" class="text-xs text-text-secondary hover:text-text-primary hover:underline">Our treasure collection</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Our Tortuga Store</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Join the Crew!</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Scallywag Reviews</a></li>
            <li>
              <div class="flex flex-wrap items-center gap-1 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:opacity-70"
                ><img
                    src="https://front-office.statics.backmarket.com/a3fb524610b7b41e32d1bed4941ad5239e190b4a/img/socials/instagram-light.svg"
                    alt="Follow us on Instagram"
                    class="w-5 h-5"
                    width="20"
                    height="20"
                  /></a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:opacity-70"
                ><img
                    src="https://front-office.statics.backmarket.com/a3fb524610b7b41e32d1bed4941ad5239e190b4a/img/socials/tiktok-light.svg"
                    alt="Follow us on TikTok"
                    class="w-5 h-5"
                    width="20"
                    height="20"
                  /></a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:opacity-70"
                ><img
                    src="https://front-office.statics.backmarket.com/a3fb524610b7b41e32d1bed4941ad5239e190b4a/img/socials/youtube-light.svg"
                    alt="Subscribe on YouTube"
                    class="w-5 h-5"
                    width="20"
                    height="20"
                  /></a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:opacity-70"
                ><img
                    src="https://front-office.statics.backmarket.com/a3fb524610b7b41e32d1bed4941ad5239e190b4a/img/socials/linkedin-light.svg"
                    alt="Connect on LinkedIn"
                    class="w-5 h-5"
                    width="20"
                    height="20"
                  /></a>
              </div>
            </li>
          </ul>
        </li>

        <!-- Help -->
        <li class="md:basis-full">
          <h2 class="text-base font-bold mb-1 font-title">Mayday</h2>
          <ul class="flex list-none flex-col p-0 gap-0">
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Contact support</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">FAQ and help center</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Shipping information</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Return policy</a></li>
          </ul>
        </li>

        <!-- Services -->
        <li class="md:basis-full">
          <h2 class="text-base font-bold mb-1 font-title">Ship Services</h2>
          <ul class="flex list-none flex-col p-0 gap-0">
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">1-Year warranty</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Protection plans</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Trade-in program</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Loyalty rewards</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Become a merchant</a></li>
            <li>
              <a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Secure payments</a>
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
          <h2 class="text-base font-bold mb-1 font-title">Treasure Maps</h2>
          <ul class="flex list-none flex-col p-0 gap-0">
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Gift cards</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Buying guides</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Product comparisons</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Gift ideas</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Black Friday deals</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">View special offers</a></li>
          </ul>
        </li>

        <!-- Law and order -->
        <li class="md:basis-full">
          <h2 class="text-base font-bold mb-1 font-title">The Pirate Code</h2>
          <ul class="flex list-none flex-col p-0 gap-0">
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Terms of service</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Seller terms</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Cookie policy</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Privacy policy</a></li>
            <li><a href="#" class="text-sm text-text-secondary hover:text-text-primary hover:underline">Report an issue</a></li>
          </ul>
        </li>
      </ul>

      <!-- Divider -->
      <hr class="border-bm-border my-5" />

      <!-- Bottom Section -->
      <div class="flex flex-col items-center justify-between gap-3 pt-5 lg:flex-row">
        <div>
          <span aria-label="copyright"> © </span> 2026 BlackMarket
        </div>
        <div class="flex gap-0 items-center">
          <a href="#" class="block">
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Get it on Google Play"
              class="h-12"
              width="155"
              height="48"
            />
          </a>
          <a href="#" class="block">
            <img
              src="https://www.nicepng.com/png/detail/343-3436311_get-airit-chat-app-on-ios-app-store.png"
              alt="Download on the App Store"
              class="h-12"
              width="135"
              height="48"
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
