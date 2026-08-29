<template>
  <!-- SERVICES INFINITE MARQUEE SECTION -->
  <section
    id="services"
    class="relative w-full py-16 sm:py-24 bg-stone-950 bg-cover bg-center bg-fixed text-white overflow-hidden flex flex-col items-center justify-center select-none"
    :style="{ backgroundImage: `url(${marbleBgImage})` }"
  >
    <!-- Dark Marble Overlay / Gradient FX -->
    <div class="absolute inset-0 bg-gradient-to-b from-stone-950/90 via-stone-950/85 to-stone-950/95 backdrop-blur-[2px]"></div>

    <!-- Container -->
    <div class="relative z-10 w-full mx-auto flex flex-col items-center px-4">

      <!-- SECTION TITLE -->
      <div class="text-center mb-10 sm:mb-14 px-4">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide mb-3 drop-shadow-md"
          :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
        >
          {{ currentLang === 'ar' ? 'خدماتنا المميزة' : 'Our Services' }}
        </h2>
        <div class="w-12 sm:w-16 h-1 bg-amber-500/80 mx-auto rounded-full shadow-sm"></div>
      </div>

      <!-- SWIPER CAROUSEL CONTAINER -->
      <div class="w-full relative">
        <swiper-container
          ref="swiperEl"
          slides-per-view="1"
          space-between="20"
          loop="true"
          speed="10000"
          autoplay-delay="0"
          autoplay-disable-on-interaction="false"
          autoplay-pause-on-mouse-enter="true"
          grab-cursor="true"
          :breakpoints="{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
            1280: { slidesPerView: 4, spaceBetween: 30 }
          }"
          class="w-full py-4 cursor-grab active:cursor-grabbing"
        >
          <swiper-slide
            v-for="service in currentServices"
            :key="service.id"
            class="h-auto"
          >
            <!-- FULL CLICKABLE CARD CONTAINER -->
            <a
              :href="service.link || '#portfolio'"
              class="group block rounded-2xl overflow-hidden bg-stone-900/90 border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/60 hover:shadow-amber-500/10 backdrop-blur-md h-full flex flex-col justify-between cursor-pointer"
            >

              <!-- Image Container -->
              <div class="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden bg-stone-950">
                <img
                  :src="service.image"
                  :alt="service.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              <!-- Bottom Dark Bar Text -->
              <div class="bg-stone-950/90 p-5 sm:p-6 text-center border-t border-white/5 flex flex-col items-center justify-center min-h-[100px]">
                <h3
                  class="text-base sm:text-lg md:text-xl font-bold text-stone-200 group-hover:text-amber-400 transition-colors duration-300 mb-3 truncate w-full"
                  :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
                >
                  {{ service.title }}
                </h3>

                <!-- Service Action Button Style Container -->
                <div
                  class="relative inline-flex items-center justify-center px-5 py-2 rounded-xl overflow-hidden border border-white/20 text-white font-bold text-xs tracking-wider shadow-md transition-all duration-500 bg-cover bg-center w-full max-w-[200px]"
                  :style="{ backgroundImage: `url(${BtnBgImage})` }"
                >
                  <div class="absolute inset-0 bg-stone-950/70 transition-opacity duration-500 group-hover:opacity-0"></div>
                  <div class="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                  <span
                    class="relative z-10 transition-colors duration-300 group-hover:text-stone-950 font-black"
                    :class="currentLang === 'ar' ? 'font-arabic-modern' : ''"
                  >
                    {{ currentLang === 'ar' ? 'عرض الأعمال' : 'View Projects' }}
                  </span>
                </div>
              </div>

            </a>
          </swiper-slide>
        </swiper-container>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { register } from 'swiper/element/bundle';

// صورة الرخام الفاخرة للزر والخلفية
import BtnBgImage from '@/assets/puplic_wepsite/aboutUs/images/white_marble.jpg';
import marbleBgImage from '@/assets/puplic_wepsite/aboutUs/images/white_marble.jpg';

// صور الخدمات
import entranceImg from '@/assets/puplic_wepsite/Service/images/entrance.jpg';
import graniteImg from '@/assets/puplic_wepsite/Service/images/granite.webp';
import waterjetImg from '@/assets/puplic_wepsite/Service/images/water_jet.jpg';
import stairsImg from '@/assets/puplic_wepsite/Service/images/stairs.jpg';

// تسجيل Swiper Web Components
register();

const swiperEl = ref(null);

const getStoredLang = () => {
  return localStorage.getItem('locale') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ar';
};

const currentLang = ref(getStoredLang());
let observer = null;

const servicesData = ref([
  { id: 1, title_ar: 'الرخام والمداخل الفاخرة', title_en: 'Marble & Entrances', image: entranceImg, link: '#portfolio' },
  { id: 2, title_ar: 'الجرانيت الطبيعي', title_en: 'Natural Granite', image: graniteImg, link: '#portfolio' },
  { id: 3, title_ar: 'تصاميم الواترجيت', title_en: 'Waterjet Designs', image: waterjetImg, link: '#portfolio' },
  { id: 4, title_ar: 'تكسية الدرج والسلالم', title_en: 'Staircase Cladding', image: stairsImg, link: '#portfolio' },
  { id: 5, title_ar: 'أعمال الديكور الداخلي', title_en: 'Interior Decoration', image: entranceImg, link: '#portfolio' }
]);

const currentServices = computed(() => {
  return servicesData.value.map(item => ({
    id: item.id,
    title: currentLang.value === 'ar' ? item.title_ar : item.title_en,
    image: item.image,
    link: item.link
  }));
});

const handleLangChange = (e) => {
  if (e.detail && e.detail.lang) {
    currentLang.value = e.detail.lang;
  } else {
    currentLang.value = getStoredLang();
  }
};

onMounted(async () => {
  // فحص محتويات الـ LocalStorage في الـ Console لمعرفة اسم المفتاح بدقة
  console.log("--- فحص الـ LocalStorage ---");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(`${key}:`, localStorage.getItem(key));
  }
  console.log("----------------------------");

  currentLang.value = getStoredLang();
  await nextTick();

  if (swiperEl.value) {
    const shadowRoot = swiperEl.value.shadowRoot;
    if (shadowRoot) {
      const style = document.createElement('style');
      style.textContent = `.swiper-wrapper { transition-timing-function: linear !important; }`;
      shadowRoot.appendChild(style);
    }
  }

  window.addEventListener('language-changed', handleLangChange);
  window.addEventListener('storage', () => {
    currentLang.value = getStoredLang();
  });

  observer = new MutationObserver(() => {
    currentLang.value = getStoredLang();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang', 'dir']
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  window.removeEventListener('language-changed', handleLangChange);
  window.removeEventListener('storage', () => {});
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Tajawal:wght@400;500;700;800;900&display=swap');

.font-arabic-modern {
  font-family: 'Tajawal', sans-serif !important;
}

.font-royal-en {
  font-family: 'Cinzel', serif !important;
  letter-spacing: 0.5px;
}
</style>
