<template>
  <header
    class="relative w-full z-50 border-b border-stone-800 bg-stone-950 bg-cover bg-center shadow-xl transition-all duration-300"
    :style="{ backgroundImage: `url(${navBgImage})` }"
    :class="[isScrolled ? 'py-2.5' : 'py-3.5 sm:py-4']"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between relative z-10 gap-4">

      <!-- LOGO SECTION -->
      <a href="#" class="flex items-center gap-2 sm:gap-3 group shrink-0">
        <div class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-105 active:scale-95 transition-transform duration-300">
          <img :src="logoImage" alt="Kitchen & Marble World Logo" class="w-full h-full object-contain drop-shadow-md" />
        </div>

        <div class="flex flex-col pr-1 sm:pr-2">
          <span
            class="font-black bg-gradient-to-r from-white via-stone-200 to-stone-400 bg-clip-text text-transparent drop-shadow-md whitespace-nowrap"
            :class="[
              currentLang === 'ar'
                ? 'text-base sm:text-2xl font-sans'
                : 'text-xs sm:text-lg font-serif tracking-normal'
            ]"
          >
            {{ currentLang === 'ar' ? 'عالم الرخام والمطابخ' : 'Kitchen & Marble World' }}
          </span>

          <span
            class="text-[8px] sm:text-[9px] text-stone-300 font-semibold uppercase mt-0.5 drop-shadow whitespace-nowrap"
            :class="[currentLang === 'ar' ? 'tracking-normal' : 'tracking-widest']"
          >
            {{ currentLang === 'ar' ? 'KITCHEN & MARBLE WORLD' : 'Luxury Designs' }}
          </span>
        </div>
      </a>

      <!-- DESKTOP NAVIGATION -->
      <nav class="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
        <div
          v-for="link in currentNavLinks"
          :key="link.name"
          class="relative group"
        >
          <a
            :href="link.children ? 'javascript:void(0)' : link.href"
            class="rounded-xl font-bold text-stone-100 hover:text-amber-500 transition-all duration-300 relative flex items-center gap-1 whitespace-nowrap"
            :class="[
              currentLang === 'ar'
                ? 'px-3 py-1.5 text-base font-sans'
                : 'px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-serif uppercase tracking-normal'
            ]"
          >
            <span class="relative z-10 drop-shadow whitespace-nowrap">{{ link.name }}</span>

            <svg
              v-if="link.children"
              class="w-3.5 h-3.5 text-stone-300 transition-transform duration-300 group-hover:rotate-180 group-hover:text-amber-500 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          <!-- DESKTOP DROPDOWN SUB-MENU WITH BACKGROUND IMAGE -->
          <div
            v-if="link.children"
            class="absolute top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pt-3 w-60 z-50"
            :class="[currentLang === 'ar' ? 'right-0' : 'left-0']"
          >
            <ul
              class="bg-stone-950/90 bg-cover bg-center border border-stone-800 rounded-2xl p-2 shadow-2xl backdrop-blur-xl flex flex-col gap-1 text-center overflow-hidden"
              :style="{ backgroundImage: `url(${navBgImage})` }"
            >
              <li v-for="child in link.children" :key="child.name">
                <a
                  :href="child.href"
                  class="block px-3 py-2 rounded-xl font-medium text-stone-100 hover:text-amber-400 hover:bg-black/40 transition-all duration-200 whitespace-nowrap"
                  :class="[currentLang === 'ar' ? 'text-sm font-sans' : 'text-xs font-serif tracking-wide']"
                >
                  {{ child.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- DESKTOP ACTIONS -->
      <div class="hidden lg:flex items-center gap-3 shrink-0">
        <button
          @click="toggleLanguage"
          class="px-3.5 py-2 rounded-xl border border-stone-700 bg-stone-900/80 text-stone-200 hover:text-amber-400 hover:border-amber-500/50 text-xs font-bold transition-all duration-200 flex items-center gap-2 backdrop-blur-sm shadow-sm active:scale-95 whitespace-nowrap"
        >
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{{ currentLang === 'ar' ? 'English' : 'العربية' }}</span>
        </button>

        <a
          href="#contact"
          class="px-5 py-2 rounded-xl border border-stone-600 bg-stone-900/90 hover:bg-stone-800 text-stone-100 hover:text-amber-400 hover:border-amber-500/60 transition-all duration-300 font-medium whitespace-nowrap shadow-md active:scale-95"
          :class="[
            currentLang === 'ar'
              ? 'text-base font-sans'
              : 'text-sm font-serif uppercase tracking-normal'
          ]"
        >
          {{ currentLang === 'ar' ? 'تواصل معنا' : 'Contact Us' }}
        </a>
      </div>

      <!-- MOBILE MENU BUTTON -->
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="lg:hidden p-2 rounded-xl border border-amber-500/40 bg-stone-900/80 text-amber-500 hover:text-amber-400 active:scale-90 transition-all duration-200 shadow-md z-50 shrink-0"
        aria-label="Toggle Menu"
      >
        <svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

    </div>

    <!-- BACKDROP (DARK OVERLAY FOR MOBILE) -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        @click="isMobileMenuOpen = false"
        class="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
      ></div>
    </transition>

    <!-- MOBILE SIDE DRAWER -->
    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      :enter-from-class="currentLang === 'ar' ? 'translate-x-full' : '-translate-x-full'"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-to-class="translate-x-0"
      :leave-from-class="currentLang === 'ar' ? 'translate-x-full' : '-translate-x-full'"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed top-0 bottom-0 z-50 w-4/5 max-w-xs bg-stone-950 bg-cover bg-center shadow-2xl flex flex-col justify-between px-6 pt-16 pb-8 border-l border-r border-stone-800 lg:hidden overflow-y-auto"
        :class="[currentLang === 'ar' ? 'right-0' : 'left-0']"
        :style="{ backgroundImage: `url(${navBgImage})` }"
      >
        <div class="flex justify-end w-full mb-4">
          <button
            @click="isMobileMenuOpen = false"
            class="p-2 rounded-full border border-stone-700 bg-black/40 text-stone-300 hover:text-white active:scale-90 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex flex-col items-center justify-center my-auto gap-5 text-center w-full">
          <div v-for="link in currentNavLinks" :key="link.name" class="w-full">
            <a
              :href="link.children ? 'javascript:void(0)' : link.href"
              @click="link.children ? toggleMobileSubmenu(link.name) : navigateMobile(link.href)"
              class="transition-colors duration-200 block py-1.5 whitespace-nowrap font-serif tracking-wider uppercase"
              :class="[
                openMobileSubmenu === link.name ? 'text-amber-500 font-semibold' : 'text-stone-100 hover:text-amber-400',
                currentLang === 'ar' ? 'text-xl font-bold font-sans' : 'text-lg font-normal'
              ]"
            >
              {{ link.name }}
            </a>

            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-60 opacity-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="max-h-60 opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div
                v-if="link.children && openMobileSubmenu === link.name"
                class="overflow-hidden flex flex-col items-center gap-2 py-2 my-1 rounded-xl bg-black/40 backdrop-blur-md border border-stone-800/80"
              >
                <a
                  v-for="child in link.children"
                  :key="child.name"
                  :href="child.href"
                  @click="isMobileMenuOpen = false"
                  class="text-stone-300 hover:text-amber-400 transition-colors whitespace-nowrap font-serif tracking-wide py-1 text-sm"
                >
                  — {{ child.name }}
                </a>
              </div>
            </transition>
          </div>
        </div>

        <div class="flex flex-col items-center gap-3 w-full pt-4 border-t border-stone-800/80 mt-auto">
          <button
            @click="toggleLanguage"
            class="w-full py-2.5 rounded-xl border border-stone-700 bg-black/40 text-stone-200 text-xs font-bold uppercase tracking-widest active:scale-95 transition-all text-center whitespace-nowrap"
          >
            {{ currentLang === 'ar' ? 'English' : 'العربية' }}
          </button>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

import navBgImage from '../../assets/puplic_wepsite/navebar/images/navbarnackground.png';
import logoImage from '../../assets/puplic_wepsite/navebar/images/logo.png';

const currentLang = ref('ar');
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const openMobileSubmenu = ref(null);

const navLinksData = {
  ar: [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'عن الشركة', href: '#about' },
    {
      name: 'الخدمات',
      href: '#services',
      children: [
        { name: 'تصميم وتركيب المطابخ', href: '#services-kitchens' },
        { name: 'توريد وقص الرخام والجرانيت', href: '#services-marble' },
        { name: 'أعمال الووترجيت والتصاميم', href: '#services-waterjet' },
        { name: 'تشطيب الواجهات والأرضيات', href: '#services-cladding' },
      ]
    },
    {
      name: 'المنتجات',
      href: '#products',
      children: [
        { name: 'الرخام الطبيعي', href: '#products-natural-marble' },
        { name: 'الجرانيت الطبيعي', href: '#products-granite' },
        { name: 'الرخام الصناعي', href: '#products-artificial-marble' },
        { name: 'مطابخ كلاسيك ومودرن', href: '#products-kitchen-designs' },
      ]
    },
    { name: 'الفيديوهات', href: '#videos' },
    { name: 'تواصل معنا', href: '#contact' }
  ],
  en: [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    {
      name: 'Services',
      href: '#services',
      children: [
        { name: 'Kitchen Design & Fitting', href: '#services-kitchens' },
        { name: 'Marble & Granite Supply', href: '#services-marble' },
        { name: 'Waterjet Cutting & CNC', href: '#services-waterjet' },
        { name: 'Flooring & Wall Cladding', href: '#services-cladding' },
      ]
    },
    {
      name: 'Products',
      href: '#products',
      children: [
        { name: 'Natural Marble', href: '#products-natural-marble' },
        { name: 'Natural Granite', href: '#products-granite' },
        { name: 'Engineered Stone', href: '#products-artificial-marble' },
        { name: 'Kitchen Collections', href: '#products-kitchen-designs' },
      ]
    },
    { name: 'Videos', href: '#videos' },
    { name: 'Contact Us', href: '#contact' }
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

const toggleMobileSubmenu = (linkName) => {
  openMobileSubmenu.value = openMobileSubmenu.value === linkName ? null : linkName;
};

const navigateMobile = (href) => {
  isMobileMenuOpen.value = false;
  window.location.href = href;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
