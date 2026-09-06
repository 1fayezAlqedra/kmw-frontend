<template>
  <!-- CUSTOMER CARE & CTA SECTION (MINIMAL LUXURY - NO CARDS & NO YELLOW) -->
  <section
    id="customer-care"
    class="relative w-full py-12 sm:py-16 md:py-20 bg-stone-950 bg-cover bg-center bg-fixed text-white overflow-hidden flex flex-col items-center justify-center select-none"
    :style="{ backgroundImage: `url(${sectionBgImage})` }"
  >
    <!-- Dark Marble Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-stone-950/95 via-stone-950/90 to-stone-950/95 backdrop-blur-[2px]"></div>

    <!-- Responsive Container -->
    <div class="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center text-center">

      <!-- SUBTITLE / TOP TAG -->
      <span
        class="text-stone-300 font-medium text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 block"
        :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
      >
        {{ currentLang === 'ar' ? 'نحن هنا دائماً لخدمتك' : 'ALWAYS AT YOUR SERVICE' }}
      </span>

      <!-- SECTION TITLE -->
      <h2
        class="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-wide mb-4 sm:mb-6 leading-tight drop-shadow-md"
        :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
      >
        {{ currentLang === 'ar' ? 'خدمة عملاء مميزة واستشارات تخصصية' : 'Premium Support & Expert Consultation' }}
      </h2>

      <!-- LUXURY SILVER DIVIDER -->
      <div class="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-stone-400 to-transparent mb-6 sm:mb-8"></div>

      <!-- SHORT DESCRIPTION -->
      <p class="text-stone-300 text-xs sm:text-base md:text-lg max-w-2xl leading-relaxed mb-8 sm:mb-10 font-light px-2">
        {{ currentLang === 'ar'
          ? 'يتواجد فريقنا المتخصص لمساعدتك في اختيار أنسب أنواع الرخام والجرانيت لمشروعك، مع تقديم استشارات دقيقة ومتابعة مستمرة لضمان أعلى مستويات الجودة.'
          : 'Our expert team is always available to help you select the ideal marble and granite grades, offering precise consultations and continuous support.'
        }}
      </p>

      <!-- RESPONSIVE ACTION BUTTON -->
      <div class="w-full sm:w-auto px-4">
        <a
          href="#contact"
          class="relative inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-full overflow-hidden border border-white/30 text-white font-extrabold text-xs sm:text-sm tracking-widest uppercase shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 group/cta bg-cover bg-center"
          :style="{ backgroundImage: `url(${sectionBgImage})` }"
        >
          <!-- Dark Overlay -->
          <div class="absolute inset-0 bg-stone-950/75 transition-opacity duration-500 group-hover/cta:opacity-10"></div>

          <!-- White Hover Layer -->
          <div class="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 group-hover/cta:opacity-100"></div>

          <!-- Button Text & Icon -->
          <span
            class="relative z-10 transition-colors duration-300 group-hover/cta:text-stone-950 font-black flex items-center justify-center gap-3"
            :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
          >
            {{ currentLang === 'ar' ? 'تواصل مع خدمة العملاء' : 'Contact Customer Care' }}
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover/cta:translate-x-1"
              :class="currentLang === 'ar' ? 'rotate-180 group-hover/cta:-translate-x-1' : ''"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// صورة الرخام الفاخرة
import sectionBgImage from '@/assets/puplic_wepsite/aboutUs/images/white_marble.jpg';

// دالة جلب اللغة الحالية من local storage أو من عنصر html
const getStoredLang = () => {
  return localStorage.getItem('locale') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ar';
};

const currentLang = ref(getStoredLang());
let observer = null;

const handleStorageChange = (event) => {
  if (event.key === 'locale' || event.key === 'lang') {
    currentLang.value = getStoredLang();
  }
};

onMounted(() => {
  currentLang.value = getStoredLang();

  // 1. مراقبة التغييرات في DOM على عنصر html
  observer = new MutationObserver(() => {
    const newLang = getStoredLang();
    if (currentLang.value !== newLang) {
      currentLang.value = newLang;
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang', 'dir']
  });

  // 2. مراقبة التغييرات في localStorage مباشرة
  window.addEventListener('storage', handleStorageChange);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  window.removeEventListener('storage', handleStorageChange);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap');

.font-arabic-modern {
  font-family: 'Tajawal', sans-serif !important;
}

.font-royal-en {
  font-family: 'Cinzel', serif !important;
  letter-spacing: 0.5px;
}
</style>
