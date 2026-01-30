<template>
  <header class="bg-white border-b border-bm-border  py-0">
    <!-- Top utility bar -->
    <div class="hidden sm:block bg-bm-bg-alt border-b border-bm-border-light">
      <div
        class="  sm:px-6 max-w-full grow lg:max-w-[1184px] mx-auto py-2 flex items-center justify-between text-xs text-text-secondary"
      >
        <div class="flex  items-center gap-6">
          <span class="cursor-pointer font-extrabold hover:text-text-primary">🏴‍☠️ The Black Market Promise</span>
          <span class="cursor-pointer font-extrabold hover:text-text-primary">Repairs</span>
          <span class="cursor-pointer font-extrabold hover:text-text-primary">End Fast Tech</span>
          <span class="cursor-pointer font-extrabold hover:text-text-primary">Tech journal</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-bold flex items-center gap-1"><img
              src="data:image/svg+xml,%3csvg%20width='36'%20height='24'%20viewBox='0%200%2036%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_286)'%3e%3cpath%20d='M36.0017%200H0.0020752V24H36.0017V0Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M36.0017%200H0.0020752V1.88998H36.0017V0Z'%20fill='%23D80027'/%3e%3cpath%20d='M36.0017%203.59996H0.0020752V5.48994H36.0017V3.59996Z'%20fill='%23D80027'/%3e%3cpath%20d='M0.0020752%207.19992H36.0017V9.0899H0.0020752V7.19992Z'%20fill='%23D80027'/%3e%3cpath%20d='M36.0017%2011.0249H0.0020752V12.9149H36.0017V11.0249Z'%20fill='%23D80027'/%3e%3cpath%20d='M0.0020752%2014.6248H36.0017V16.5148H0.0020752V14.6248Z'%20fill='%23D80027'/%3e%3cpath%20d='M36.0017%2018.2248H0.0020752V20.1148H36.0017V18.2248Z'%20fill='%23D80027'/%3e%3cpath%20d='M0.0020752%2022.0498H36.0017V23.9397H0.0020752V22.0498Z'%20fill='%23D80027'/%3e%3cpath%20d='M18.0019%200H0.0020752V12.9231H18.0019V0Z'%20fill='%232E52B2'/%3e%3cpath%20d='M1.41772%200.940515L1.57716%200.449995L1.73636%200.940515H2.25205L1.83477%201.24353L1.9942%201.73397L1.57716%201.43096L1.15987%201.73397L1.31927%201.24353L0.902065%200.940515H1.41772Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M4.27225%200.940515L4.43169%200.449995L4.59089%200.940515H5.10658L4.6893%201.24353L4.84874%201.73397L4.43169%201.43096L4.01441%201.73397L4.1738%201.24353L3.7566%200.940515H4.27225Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M7.28622%200.449995L7.12679%200.940515H6.61113L7.02834%201.24353L6.86894%201.73397L7.28622%201.43096L7.70327%201.73397L7.54384%201.24353L7.96112%200.940515H7.44542L7.28622%200.449995Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M9.98133%200.940515L10.1408%200.449995L10.3%200.940515H10.8157L10.3984%201.24353L10.5578%201.73397L10.1408%201.43096L9.72349%201.73397L9.88288%201.24353L9.46568%200.940515H9.98133Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M13.277%200.449995L13.1176%200.940515H12.6019L13.0191%201.24353L12.8597%201.73397L13.277%201.43096L13.6941%201.73397L13.5346%201.24353L13.9519%200.940515H13.4362L13.277%200.449995Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M16.2676%200.940515L16.427%200.449995L16.5862%200.940515H17.1019L16.6846%201.24353L16.844%201.73397L16.427%201.43096L16.0097%201.73397L16.1691%201.24353L15.7519%200.940515H16.2676Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M1.57716%203.12895L1.41772%203.61947H0.902065L1.31927%203.92249L1.15987%204.41293L1.57716%204.10992L1.9942%204.41293L1.83477%203.92249L2.25205%203.61947H1.73636L1.57716%203.12895Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M4.27225%203.61947L4.43169%203.12895L4.59089%203.61947H5.10658L4.6893%203.92249L4.84874%204.41293L4.43169%204.10992L4.01441%204.41293L4.1738%203.92249L3.7566%203.61947H4.27225Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M7.28622%203.12895L7.12679%203.61947H6.61113L7.02834%203.92249L6.86894%204.41293L7.28622%204.10992L7.70327%204.41293L7.54384%203.92249L7.96112%203.61947H7.44542L7.28622%203.12895Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M9.98133%203.61947L10.1408%203.12895L10.3%203.61947H10.8157L10.3984%203.92249L10.5578%204.41293L10.1408%204.10992L9.72349%204.41293L9.88288%203.92249L9.46568%203.61947H9.98133Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M13.277%203.12895L13.1176%203.61947H12.6019L13.0191%203.92249L12.8597%204.41293L13.277%204.10992L13.6941%204.41293L13.5346%203.92249L13.9519%203.61947H13.4362L13.277%203.12895Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M16.2676%203.61947L16.427%203.12895L16.5862%203.61947H17.1019L16.6846%203.92249L16.844%204.41293L16.427%204.10992L16.0097%204.41293L16.1691%203.92249L15.7519%203.61947H16.2676Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M1.57716%205.80791L1.41772%206.29843H0.902065L1.31927%206.60145L1.15987%207.09189L1.57716%206.78888L1.9942%207.09189L1.83477%206.60145L2.25205%206.29843H1.73636L1.57716%205.80791Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M4.27225%206.29843L4.43169%205.80791L4.59089%206.29843H5.10658L4.6893%206.60145L4.84874%207.09189L4.43169%206.78888L4.01441%207.09189L4.1738%206.60145L3.7566%206.29843H4.27225Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M7.28622%205.80791L7.12679%206.29843H6.61113L7.02834%206.60145L6.86894%207.09189L7.28622%206.78888L7.70327%207.09189L7.54384%206.60145L7.96112%206.29843H7.44542L7.28622%205.80791Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M9.98133%206.29843L10.1408%205.80791L10.3%206.29843H10.8157L10.3984%206.60145L10.5578%207.09189L10.1408%206.78888L9.72349%207.09189L9.88288%206.60145L9.46568%206.29843H9.98133Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M13.277%205.80791L13.1176%206.29843H12.6019L13.0191%206.60145L12.8597%207.09189L13.277%206.78888L13.6941%207.09189L13.5346%206.60145L13.9519%206.29843H13.4362L13.277%205.80791Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M16.2676%206.29843L16.427%205.80791L16.5862%206.29843H17.1019L16.6846%206.60145L16.844%207.09189L16.427%206.78888L16.0097%207.09189L16.1691%206.60145L15.7519%206.29843H16.2676Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M1.57716%208.48687L1.41772%208.97739H0.902065L1.31927%209.28041L1.15987%209.77085L1.57716%209.46784L1.9942%209.77085L1.83477%209.28041L2.25205%208.97739H1.73636L1.57716%208.48687Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M4.27225%208.97739L4.43169%208.48687L4.59089%208.97739H5.10658L4.6893%209.28041L4.84874%209.77085L4.43169%209.46784L4.01441%209.77085L4.1738%209.28041L3.7566%208.97739H4.27225Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M7.28622%208.48687L7.12679%208.97739H6.61113L7.02834%209.28041L6.86894%209.77085L7.28622%209.46784L7.70327%209.77085L7.54384%209.28041L7.96112%208.97739H7.44542L7.28622%208.48687Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M9.98133%208.97739L10.1408%208.48687L10.3%208.97739H10.8157L10.3984%209.28041L10.5578%209.77085L10.1408%209.46784L9.72349%209.77085L9.88288%209.28041L9.46568%208.97739H9.98133Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M13.277%208.48687L13.1176%208.97739H12.6019L13.0191%209.28041L12.8597%209.77085L13.277%209.46784L13.6941%209.77085L13.5346%209.28041L13.9519%208.97739H13.4362L13.277%208.48687Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M16.2676%208.97739L16.427%208.48687L16.5862%208.97739H17.1019L16.6846%209.28041L16.844%209.77085L16.427%209.46784L16.0097%209.77085L16.1691%209.28041L15.7519%208.97739H16.2676Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M1.57716%2011.1658L1.41772%2011.6564H0.902065L1.31927%2011.9594L1.15987%2012.4498L1.57716%2012.1468L1.9942%2012.4498L1.83477%2011.9594L2.25205%2011.6564H1.73636L1.57716%2011.1658Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M4.27225%2011.6564L4.43169%2011.1658L4.59089%2011.6564H5.10658L4.6893%2011.9594L4.84874%2012.4498L4.43169%2012.1468L4.01441%2012.4498L4.1738%2011.9594L3.7566%2011.6564H4.27225Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M7.28622%2011.1658L7.12679%2011.6564H6.61113L7.02834%2011.9594L6.86894%2012.4498L7.28622%2012.1468L7.70327%2012.4498L7.54384%2011.9594L7.96112%2011.6564H7.44542L7.28622%2011.1658Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M9.98133%2011.6564L10.1408%2011.1658L10.3%2011.6564H10.8157L10.3984%2011.9594L10.5578%2012.4498L10.1408%2012.1468L9.72349%2012.4498L9.88288%2011.9594L9.46568%2011.6564H9.98133Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M13.277%2011.1658L13.1176%2011.6564H12.6019L13.0191%2011.9594L12.8597%2012.4498L13.277%2012.1468L13.6941%2012.4498L13.5346%2011.9594L13.9519%2011.6564H13.4362L13.277%2011.1658Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M16.2676%2011.6564L16.427%2011.1658L16.5862%2011.6564H17.1019L16.6846%2011.9594L16.844%2012.4498L16.427%2012.1468L16.0097%2012.4498L16.1691%2011.9594L15.7519%2011.6564H16.2676Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M2.92714%207.19992L2.76771%207.69044H2.25205L2.66925%207.99345L2.50986%208.4839L2.92714%208.18088L3.34419%208.4839L3.18476%207.99345L3.60204%207.69044H3.08634L2.92714%207.19992Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M5.62224%207.69044L5.78167%207.19992L5.94088%207.69044H6.45657L6.03929%207.99345L6.19872%208.4839L5.78167%208.18088L5.36439%208.4839L5.52379%207.99345L5.10658%207.69044H5.62224Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M8.63621%207.19992L8.47677%207.69044H7.96112L8.37832%207.99345L8.21893%208.4839L8.63621%208.18088L9.05326%208.4839L8.89382%207.99345L9.3111%207.69044H8.79541L8.63621%207.19992Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M11.3313%207.69044L11.4908%207.19992L11.65%207.69044H12.1656L11.7484%207.99345L11.9078%208.4839L11.4908%208.18088L11.0735%208.4839L11.2329%207.99345L10.8157%207.69044H11.3313Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M14.627%207.19992L14.4676%207.69044H13.9519L14.3691%207.99345L14.2097%208.4839L14.627%208.18088L15.0441%208.4839L14.8846%207.99345L15.3019%207.69044H14.7862L14.627%207.19992Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M2.76771%2010.3904L2.92714%209.89989L3.08634%2010.3904H3.60204L3.18476%2010.6934L3.34419%2011.1839L2.92714%2010.8809L2.50986%2011.1839L2.66925%2010.6934L2.25205%2010.3904H2.76771Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M5.78167%209.89989L5.62224%2010.3904H5.10658L5.52379%2010.6934L5.36439%2011.1839L5.78167%2010.8809L6.19872%2011.1839L6.03929%2010.6934L6.45657%2010.3904H5.94088L5.78167%209.89989Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M8.47677%2010.3904L8.63621%209.89989L8.79541%2010.3904H9.3111L8.89382%2010.6934L9.05326%2011.1839L8.63621%2010.8809L8.21893%2011.1839L8.37832%2010.6934L7.96112%2010.3904H8.47677Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M11.4908%209.89989L11.3313%2010.3904H10.8157L11.2329%2010.6934L11.0735%2011.1839L11.4908%2010.8809L11.9078%2011.1839L11.7484%2010.6934L12.1656%2010.3904H11.65L11.4908%209.89989Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M14.4676%2010.3904L14.627%209.89989L14.7862%2010.3904H15.3019L14.8846%2010.6934L15.0441%2011.1839L14.627%2010.8809L14.2097%2011.1839L14.3691%2010.6934L13.9519%2010.3904H14.4676Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M2.92714%204.49995L2.76771%204.99047H2.25205L2.66925%205.29348L2.50986%205.78393L2.92714%205.48091L3.34419%205.78393L3.18476%205.29348L3.60204%204.99047H3.08634L2.92714%204.49995Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M5.62224%204.99047L5.78167%204.49995L5.94088%204.99047H6.45657L6.03929%205.29348L6.19872%205.78393L5.78167%205.48091L5.36439%205.78393L5.52379%205.29348L5.10658%204.99047H5.62224Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M8.63621%204.49995L8.47677%204.99047H7.96112L8.37832%205.29348L8.21893%205.78393L8.63621%205.48091L9.05326%205.78393L8.89382%205.29348L9.3111%204.99047H8.79541L8.63621%204.49995Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M11.3313%204.99047L11.4908%204.49995L11.65%204.99047H12.1656L11.7484%205.29348L11.9078%205.78393L11.4908%205.48091L11.0735%205.78393L11.2329%205.29348L10.8157%204.99047H11.3313Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M14.627%204.49995L14.4676%204.99047H13.9519L14.3691%205.29348L14.2097%205.78393L14.627%205.48091L15.0441%205.78393L14.8846%205.29348L15.3019%204.99047H14.7862L14.627%204.49995Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M2.76771%202.2905L2.92714%201.79998L3.08634%202.2905H3.60204L3.18476%202.59351L3.34419%203.08395L2.92714%202.78094L2.50986%203.08395L2.66925%202.59351L2.25205%202.2905H2.76771Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M5.78167%201.79998L5.62224%202.2905H5.10658L5.52379%202.59351L5.36439%203.08395L5.78167%202.78094L6.19872%203.08395L6.03929%202.59351L6.45657%202.2905H5.94088L5.78167%201.79998Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M8.47677%202.2905L8.63621%201.79998L8.79541%202.2905H9.3111L8.89382%202.59351L9.05326%203.08395L8.63621%202.78094L8.21893%203.08395L8.37832%202.59351L7.96112%202.2905H8.47677Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M11.4908%201.79998L11.3313%202.2905H10.8157L11.2329%202.59351L11.0735%203.08395L11.4908%202.78094L11.9078%203.08395L11.7484%202.59351L12.1656%202.2905H11.65L11.4908%201.79998Z'%20fill='%23F0F0F0'/%3e%3cpath%20d='M14.4676%202.2905L14.627%201.79998L14.7862%202.2905H15.3019L14.8846%202.59351L15.0441%203.08395L14.627%202.78094L14.2097%203.08395L14.3691%202.59351L13.9519%202.2905H14.4676Z'%20fill='%23F0F0F0'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1_286'%3e%3crect%20x='0.0020752'%20width='35.9996'%20height='24'%20rx='2'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
              alt="US"
              class="w-5 h-auto"
            /> US</span>
        </div>
      </div>
    </div>

    <!-- Main header -->
    <div
      class="px-2 sm:px-6 max-w-full grow lg:max-w-[1184px] mx-auto py-1 flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-2 sm:gap-6"
    >
      <!-- Logo -->
      <!-- ANTI-PATTERN (SEO): Generic alt text -->
      <div
        class="flex items-center gap-2 cursor-pointer shrink-0 w-full sm:w-auto justify-center sm:justify-start mt-3 sm:mt-0"
      >
        <img
          src="/images/logo.webp"
          class="h-8"
          alt="image"
        />
        <span class="text-3xl font-bold text-text-primary font-title">BlackMarket</span>
      </div>

      <!-- Search bar -->
      <!-- ANTI-PATTERN #3: Input without associated label -->
      <div
        class="w-full sm:w-auto sm:flex-1 max-w-xl flex items-center bg-bm-bg-alt border border-white rounded-full hover:bg-gray-300 transition-colors px-4 py-2.5"
      >
        <!-- ANTI-PATTERN #4: Empty button (icon only, no accessible name) -->
        <div
          class="cursor-pointer mr-2"
          @click="search"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
            />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <input
          class="flex-1 bg-transparent border-none text-text-primary text-base outline-none placeholder:text-text-muted"
          placeholder="What are you looking for?"
        />
      </div>

      <!-- Actions - ANTI-PATTERN: Using divs with role="button" instead of proper buttons -->
      <div class="hidden sm:flex items-center gap-4">
        <div
          role="button"
          class="px-2 py-2 cursor-pointer rounded-md flex gap-2 items-center border border-black text-text-primary text-base font-medium hover:bg-bm-bg-alt transition-colors"
        >
          <svg
            class="w-5 h-5 mx-auto text-black"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
          <span class="text-black">Trade-In</span>
        </div>
        <!-- ANTI-PATTERN #1: Low contrast text -->
        <div
          role="button"
          class="cursor-pointer font-extrabold low-contrast text-base hover:text-text-primary transition-colors"
        >
          Need help?
        </div>
        <div
          role="button"
          class="cursor-pointer text-text-secondary text-base hover:text-text-primary transition-colors"
        >
          Account
        </div>
        <div
          role="button"
          class="cursor-pointer text-text-secondary text-base hover:text-text-primary transition-colors"
        >
          Cart
        </div>
        <!-- ANTI-PATTERN (A11y): role="switch" without required aria-checked attribute -->
        <div
          role="switch"
          class="cursor-pointer text-text-secondary text-sm hover:text-text-primary transition-colors flex items-center gap-1"
          @click="isDarkMode = !isDarkMode"
        >
          <span>{{ isDarkMode ? '🌙' : '☀️' }}</span>
          <span>Mode</span>
        </div>
      </div>
    </div>

    <!-- Category nav -->
    <!-- ANTI-PATTERN (SEO): Uncrawlable anchors - href="javascript:void(0)" instead of real URLs -->
    <div class="px-2 sm:px-6 border-t border-bm-border-light">
      <div
        class="px-2 sm:px-12 max-w-full grow lg:max-w-[1184px] mx-auto py-1 flex items-center gap-3 sm:gap-6 overflow-x-auto scrollbar-hide"
      >
        <a
          v-for="category in categories"
          :key="category.id"
          href="javascript:void(0)"
          class="category-link text-base cursor-pointer whitespace-nowrap text-text-primary hover:text-text-primary no-underline"
          :class="{ 'active': category.id === activeCategory }"
          @click="navigateToCategory(category.id)"
          @mouseenter="hoveredCategory = category.id"
          @mouseleave="hoveredCategory = null"
        >
          {{ category.name }}
        </a>
      </div>
    </div>
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
const hoveredCategory = ref<string | null>(null)
const isDarkMode = ref(false)


const search = () => {
  console.log('Search clicked')
}

// ANTI-PATTERN (SEO): JS-only navigation instead of proper links
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
