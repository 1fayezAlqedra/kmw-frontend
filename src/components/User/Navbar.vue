<template>
  <header
    class="relative w-full z-50 border-b border-stone-800 bg-stone-950 bg-cover bg-center shadow-xl transition-all duration-300"
    :style="{ backgroundImage: `url(${navBgImage})` }"
    :class="[isScrolled ? 'py-3' : 'py-4 sm:py-5']"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between relative z-10">

      <!-- LOGO SECTION -->
      <a href="#" class="flex items-center gap-2.5 sm:gap-3 group shrink-0">
        <div class="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center group-hover:scale-105 active:scale-95 transition-transform duration-300">
          <img :src="logoImage" alt="Kitchen & Marble World Logo" class="w-full h-full object-contain drop-shadow-md" />
        </div>

        <div class="flex flex-col pr-1 sm:pr-2">
          <span class="text-base sm:text-2xl font-black bg-gradient-to-r from-white via-stone-200 to-stone-400 bg-clip-text text-transparent tracking-wide drop-shadow-md font-serif">
            {{ currentLang === 'ar' ? 'عالم الرخام والمطابخ' : 'Kitchen & Marble World' }}
          </span>
          <span class="text-[8px] sm:text-[10px] text-stone-300 font-semibold tracking-[0.18em] uppercase mt-0.5 sm:mt-1 drop-shadow">
            {{ currentLang === 'ar' ? 'KITCHEN & MARBLE WORLD' : 'Luxury Designs' }}
          </span>
        </div>
      </a>

      <!-- DESKTOP NAVIGATION -->
      <nav class="hidden lg:flex items-center gap-1 xl:gap-2">
        <a
          v-for="link in currentNavLinks"
          :key="link.name"
          :href="link.href"
          class="px-4 py-2 rounded-xl text-sm font-bold text-stone-100 hover:text-white transition-all duration-300 relative overflow-hidden group border border-transparent hover:border-stone-300/40"
        >
          <span
            class="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-xl"
            :style="{ backgroundImage: `url(${navHoverImage})` }"
          ></span>
          <span class="relative z-10 drop-shadow">{{ link.name }}</span>
        </a>
      </nav>

      <!-- DESKTOP ACTIONS -->
      <div class="hidden lg:flex items-center gap-3">
        <button
          @click="toggleLanguage"
          class="px-3.5 py-2 rounded-xl border border-stone-300/40 bg-black/30 text-stone-100 hover:text-white hover:border-white text-xs font-bold transition-all duration-200 flex items-center gap-2 backdrop-blur-sm shadow-sm active:scale-95"
        >
          <span class="w-2 h-2 rounded-full bg-stone-200 animate-pulse"></span>
          <span>{{ currentLang === 'ar' ? 'English' : 'العربية' }}</span>
        </button>

        <a
          href="#contact"
          class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-stone-100 via-stone-200 to-stone-300 hover:from-white hover:to-stone-200 text-stone-900 font-black text-sm tracking-wide shadow-lg border border-white/60 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
        >
          {{ currentLang === 'ar' ? 'تواصل معنا' : 'Contact Us' }}
        </a>
      </div>

      <!-- MOBILE MENU BUTTON -->
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="lg:hidden p-2.5 rounded-xl bg-black/30 border border-stone-300/30 text-stone-200 hover:text-white active:scale-90 transition-all duration-200 backdrop-blur-sm shadow-lg"
        aria-label="Toggle Menu"
      >
        <svg class="w-6 h-6 transition-transform duration-300" :class="{ 'rotate-90': isMobileMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

    </div>

    <!-- MOBILE DRAWER / SIDEBAR -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-4 scale-95"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden mx-4 mt-3 rounded-2xl bg-stone-950 border border-stone-300/30 p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-2 overflow-hidden relative z-50"
      >
        <a
          v-for="link in currentNavLinks"
          :key="link.name"
          :href="link.href"
          @touchstart="activeMobileLink = link.name"
          @touchend="activeMobileLink = null"
          @click="isMobileMenuOpen = false"
          class="relative px-4 py-3 rounded-xl text-stone-200 font-bold text-base transition-all duration-200 border border-stone-800 flex items-center justify-between overflow-hidden"
          :class="{ 'border-stone-300/50 text-white': activeMobileLink === link.name }"
        >
          <span
            class="absolute inset-0 bg-cover bg-center transition-opacity duration-150 -z-10 rounded-xl"
            :class="activeMobileLink === link.name ? 'opacity-100' : 'opacity-0'"
            :style="{ backgroundImage: `url(${navHoverImage})` }"
          ></span>

          <span class="relative z-10">{{ link.name }}</span>
          <span class="text-stone-400 text-xs font-normal">←</span>
        </a>

        <div class="flex items-center justify-between gap-3 pt-3 mt-1 border-t border-stone-300/20">
          <button
            @click="toggleLanguage"
            class="flex-1 py-3 rounded-xl border border-stone-300/30 bg-stone-900 text-stone-200 text-xs font-bold active:scale-95 transition-all text-center"
          >
            {{ currentLang === 'ar' ? 'English' : 'العربية' }}
          </button>

          <a
            href="#contact"
            @click="isMobileMenuOpen = false"
            class="flex-1 py-3 rounded-xl bg-gradient-to-r from-stone-100 via-stone-200 to-stone-300 text-stone-950 font-black text-xs tracking-wider text-center active:scale-95 transition-all shadow-md"
          >
            {{ currentLang === 'ar' ? 'تواصل معنا' : 'Contact Us' }}
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

import navBgImage from '../../assets/puplic_wepsite/navebar/images/navbarnackground.png';
import logoImage from '../../assets/puplic_wepsite/navebar/images/logo.png';
import navHoverImage from '../../assets/puplic_wepsite/navebar/images/button_hover.jpg';

const currentLang = ref('ar');
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const activeMobileLink = ref(null);

const navLinksData = {
  ar: [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'الخدمات', href: '#services' },
    { name: 'المشاريع', href: '#projects' },
    { name: 'المتاجر', href: '#stores' },
    { name: 'الأخبار', href: '#news' },
    { name: 'الوظائف', href: '#careers' },
  ],
  en: [
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Stores', href: '#stores' },
    { name: 'News', href: '#news' },
    { name: 'Careers', href: '#careers' },
  ]
};

const currentNavLinks = computed(() => navLinksData[currentLang.value]);

const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'ar' ? 'en' : 'ar';
  document.documentElement.setAttribute('dir', currentLang.value === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', currentLang.value);
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
