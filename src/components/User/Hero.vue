<template>
  <!-- HERO SECTION - الخلفية الممتدة بعرض الشاشة الكامل -->
  <section
    id="hero"
    class="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[85vh] min-h-[400px] max-h-[850px] overflow-hidden bg-stone-950 bg-cover bg-center flex items-center justify-center"
    :style="{ backgroundImage: `url(${heroBgImage})` }"
  >
    <!-- SLIDER CONTAINER (98% Width with Auto Margins & Touch Support) -->
    <div
      class="relative w-[98%] max-w-[1750px] h-[92%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 group touch-pan-y"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >

      <!-- SLIDES -->
      <div class="relative w-full h-full select-none">
        <div
          v-for="(image, index) in slides"
          :key="index"
          class="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
          :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
        >
          <img :src="image" alt="Hero Slide" class="w-full h-full object-cover" draggable="false" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30"></div>
        </div>
      </div>

      <!-- RESPONSIVE LUXURY TEXT OVERLAY -->
      <div
        class="absolute bottom-14 sm:bottom-20 z-30 max-w-[95%] sm:max-w-3xl pointer-events-none"
        :class="currentLang === 'ar' ? 'right-4 sm:right-8 md:right-16 text-right' : 'left-4 sm:left-8 md:left-16 text-left'"
      >

        <!-- Top Title: White Marble Texture Background with Deep Black Text -->
        <div class="mb-2.5 sm:mb-3">
          <h1
            class="text-base sm:text-2xl md:text-3xl lg:text-4xl font-black text-stone-950 tracking-wide bg-cover bg-center px-6 sm:px-9 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2 border-stone-300 inline-block whitespace-nowrap transform transition-all duration-700 ease-out hover:scale-105 hover:border-amber-500 cursor-pointer pointer-events-auto"
            :style="{ backgroundImage: `url(${marbleBgImage})` }"
            :class="[
              isLoaded ? 'translate-x-0 opacity-100' : (currentLang === 'ar' ? '-translate-x-20 opacity-0' : 'translate-x-20 opacity-0'),
              currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'
            ]"
          >
            {{ currentLang === 'ar' ? 'عالم الرخام والمطابخ' : 'Kitchen & Marble World' }}
          </h1>
        </div>

        <!-- Bottom Description: Sleek dark glass style for balance -->
        <div>
          <p
            class="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-stone-200 tracking-wide bg-stone-900/80 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-2xl border border-white/15 inline-block whitespace-nowrap transform transition-all duration-700 hover:scale-105 cursor-pointer pointer-events-auto"
            :class="[
              isLoaded ? 'opacity-100' : 'opacity-0',
              currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'
            ]"
          >
            {{ currentLang === 'ar' ? 'خبرة في مجال الديكورات وتصاميم الرخام والجرانيت' : 'Expertise in interior decor, marble, and granite designs' }}
          </p>
        </div>

      </div>

      <!-- PREVIOUS BUTTON -->
      <button
        @click="prevSlide"
        class="absolute right-2 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-black border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
        aria-label="Previous Slide"
      >
        <svg class="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- NEXT BUTTON -->
      <button
        @click="nextSlide"
        class="absolute left-2 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-black border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
        aria-label="Next Slide"
      >
        <svg class="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- BOTTOM ACTION BUTTON (VIEW SERVICES / إظهار خدماتنا) -->
      <div class="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 w-full text-center px-4">
        <a
          href="#services"
          class="relative inline-flex items-center justify-center px-6 sm:px-9 py-2.5 sm:py-3.5 rounded-full overflow-hidden border border-white/40 text-white hover:text-black font-extrabold text-[11px] sm:text-sm tracking-widest uppercase shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 group/heroBtn bg-cover bg-center"
          :style="{ backgroundImage: `url(${BtnBgImage})` }"
        >
          <!-- Overlay للتعتيم الداكن الخفيف -->
          <div class="absolute inset-0 bg-stone-950/60 transition-opacity duration-500 group-hover/heroBtn:opacity-0"></div>

          <!-- White Hover Background Layer -->
          <div class="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 group-hover/heroBtn:opacity-100"></div>

          <!-- Content Text -->
          <span
            class="relative z-10 transition-colors duration-300 group-hover/heroBtn:text-stone-950"
            :class="currentLang === 'ar' ? 'font-arabic-modern' : ''"
          >
            {{ currentLang === 'ar' ? 'إظهار خدماتنا' : 'View Services' }}
          </span>
        </a>
      </div>

      <!-- SLIDE INDICATORS (DOTS) -->
      <div class="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2">
        <button
          v-for="(_, index) in slides"
          :key="'dot-' + index"
          @click="currentSlide = index"
          class="h-1 sm:h-1.5 rounded-full transition-all duration-300"
          :class="currentSlide === index ? 'w-5 sm:w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'"
          :aria-label="'Go to slide ' + (index + 1)"
        ></button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

// خلفية زر الخدمات
import BtnBgImage from '@/assets/puplic_wepsite/aboutUs/images/white_marble.jpg';

// خلفية الرخام الخاصة بالعنوان
import marbleBgImage from '../../assets/puplic_wepsite/Hero_section/images/hero_Animation_background.jpg';

// خلفية الهيرو
import heroBgImage from '../../assets/puplic_wepsite/navebar/images/navbarnackground.png';

// صور السلايدر
import slide1 from '../../assets/puplic_wepsite/Hero_section/images/marble_mounten.jpg';
import slide2 from '../../assets/puplic_wepsite/Hero_section/images/Marble_slabs.jpg';

const slides = ref([
  slide1,
  slide2
]);

// حالة اللغة والانيميشن والسلايدر
const currentLang = ref(document.documentElement.getAttribute('lang') || 'ar');
const isLoaded = ref(false);
const currentSlide = ref(0);
let observer = null;

// متغيرات التعامل مع السحب والتمرير باللمس (Touch Events)
let touchStartX = 0;
let touchEndX = 0;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

// منطق اللمس للموبايل
const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
};

const handleSwipeGesture = () => {
  const swipeThreshold = 50; // الحد الأدنى لمسافة السحب بالبكسل
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // سحب لليسار
      currentLang.value === 'ar' ? prevSlide() : nextSlide();
    } else {
      // سحب لليمين
      currentLang.value === 'ar' ? nextSlide() : prevSlide();
    }
  }
};

// إعادة تشغيل الأنيميشن تلقائياً عند تغيير اللغة
watch(currentLang, () => {
  isLoaded.value = false;
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});

onMounted(() => {
  // تأخير الانيميشن الأول عند التحميل
  setTimeout(() => {
    isLoaded.value = true;
  }, 1000);

  // مراقبة تغيير اللغة من العنصر الجذري
  observer = new MutationObserver(() => {
    const newLang = document.documentElement.getAttribute('lang') || 'ar';
    if (currentLang.value !== newLang) {
      currentLang.value = newLang;
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang', 'dir']
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style>
/* استيراد الخطوط الفاخرة والواضحة */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Tajawal:wght@400;500;700;800;900&display=swap');

.font-arabic-modern {
  font-family: 'Tajawal', sans-serif !important;
}

.font-royal-en {
  font-family: 'Cinzel', serif !important;
  font-weight: 700;
  letter-spacing: 1px;
}
</style>
