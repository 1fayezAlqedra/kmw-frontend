<template>
  <section
    id="featured-products"
    class="relative w-full py-16 sm:py-24 bg-stone-950 bg-cover bg-center bg-fixed text-white overflow-hidden flex flex-col items-center justify-center select-none"
    :style="{ backgroundImage: `url(${marbleBgImage})` }"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-stone-950/90 via-stone-950/85 to-stone-950/95 backdrop-blur-[2px]"></div>

    <div class="relative z-10 w-full mx-auto flex flex-col items-center px-4">

      <div class="text-center mb-10 sm:mb-14 px-4">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide mb-3 drop-shadow-md"
          :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
        >
          {{ currentLang === 'ar' ? 'منتجاتنا الفاخرة' : 'Our Products' }}
        </h2>
        <div class="w-12 sm:w-16 h-1 bg-amber-500/80 mx-auto rounded-full shadow-sm"></div>
      </div>

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
            v-for="product in currentProducts"
            :key="product.id"
            class="h-auto"
          >
            <div
              class="group block rounded-2xl overflow-hidden bg-stone-900/90 border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/60 hover:shadow-amber-500/10 backdrop-blur-md h-full flex flex-col justify-between"
            >

              <div class="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden bg-stone-950">
                <img
                  :src="product.image"
                  :alt="product.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>

                <span class="absolute top-3 right-3 bg-stone-950/80 border border-white/10 text-amber-400 text-xs px-3 py-1 rounded-full backdrop-blur-md font-bold shadow-lg">
                  {{ product.categoryTag }}
                </span>
              </div>

              <div class="bg-stone-950/90 p-5 sm:p-6 text-center border-t border-white/5 flex flex-col items-center justify-center min-h-[120px]">
                <h3
                  class="text-base sm:text-lg md:text-xl font-bold text-stone-200 group-hover:text-amber-400 transition-colors duration-300 mb-3 truncate w-full"
                  :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
                >
                  {{ product.title }}
                </h3>

                <!-- التوجيه التلقائي مع تمرير اسم الكاتيجوري -->
                <router-link
                  :to="{ path: '/products', query: { category: product.categorySlug } }"
                  class="relative inline-flex items-center justify-center px-5 py-2 rounded-xl overflow-hidden border border-white/20 text-white font-bold text-xs tracking-wider shadow-md transition-all duration-500 bg-cover bg-center w-full max-w-[200px]"
                  :style="{ backgroundImage: `url(${BtnBgImage})` }"
                >
                  <div class="absolute inset-0 bg-stone-950/70 transition-opacity duration-500 group-hover:opacity-0"></div>
                  <div class="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                  <span
                    class="relative z-10 transition-colors duration-300 group-hover:text-stone-950 font-black"
                    :class="currentLang === 'ar' ? 'font-arabic-modern' : ''"
                  >
                    {{ currentLang === 'ar' ? 'عرض المزيد' : 'View More' }}
                  </span>
                </router-link>
              </div>

            </div>
          </swiper-slide>
        </swiper-container>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { register } from 'swiper/element/bundle';

import BtnBgImage from '@/assets/puplic_wepsite/aboutUs/images/white_marble.jpg';
import marbleBgImage from '@/assets/puplic_wepsite/aboutUs/images/white_marble.jpg';

import Statuario from '@/assets/puplic_wepsite/products/italian/Statuario_Italian.jpg';
import Crema_Marfil from '@/assets/puplic_wepsite/products/spanish/Crema_Marfil.webp';
import black_galaxy from '@/assets/puplic_wepsite/products/granite/black_galaxy.jpg';
import Calacatta_White from '@/assets/puplic_wepsite/products/quartz/Calacatta_White.jpg';
import Gold_Circular_Waterjet_MedallionVein from '@/assets/puplic_wepsite/products/Waterjet/Circular_Waterjet_Medallion.jpg';
import Portoro_Black from '@/assets/puplic_wepsite/products/italian/Portoro_Black.jpg';

register();

const swiperEl = ref(null);

const getStoredLang = () => {
  return localStorage.getItem('locale') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ar';
};

const currentLang = ref(getStoredLang());
let observer = null;

// إضافة حقل cat_slug لربط كل عنصر بالقسم المناسب
const productsData = ref([
  {
    id: 101,
    cat_slug: 'italian',
    cat_ar: 'رخام إيطالي',
    cat_en: 'Italian Marble',
    title_ar: 'رخام ستاتواريو إيطالي',
    title_en: 'Statuario Italian Marble',
    image: Statuario
  },
  {
    id: 203,
    cat_slug: 'spanish',
    cat_ar: 'رخام إسباني',
    cat_en: 'Spanish Marble',
    title_ar: 'رخام كريما مارفيل',
    title_en: 'Crema Marfil Marble',
    image: Crema_Marfil
  },
  {
    id: 107,
    cat_slug: 'italian',
    cat_ar: 'رخام إيطالي',
    cat_en: 'Italian Marble',
    title_ar: 'رخام بورتورو أسود',
    title_en: 'Portoro Black Marble',
    image: Portoro_Black
  },
  {
    id: 301,
    cat_slug: 'granite',
    cat_ar: 'جرانيت طبيعي',
    cat_en: 'Natural Granite',
    title_ar: 'جرانيت أسود جالكسي',
    title_en: 'Black Galaxy Granite',
    image: black_galaxy
  },
  {
    id: 401,
    cat_slug: 'quartz',
    cat_ar: 'كوارتز معالج',
    cat_en: 'Engineered Quartz',
    title_ar: 'كوارتز أبيض كلكتا',
    title_en: 'Calacatta White Quartz',
    image: Calacatta_White
  },
  {
    id: 501,
    cat_slug: 'waterjet',
    cat_ar: 'أعمال ووترجيت',
    cat_en: 'Waterjet Art',
    title_ar: 'سجادة ووترجيت دائرية',
    title_en: 'Circular Waterjet Medallion',
    image: Gold_Circular_Waterjet_MedallionVein
  }
]);

const currentProducts = computed(() => {
  return productsData.value.map(item => ({
    id: item.id,
    categorySlug: item.cat_slug,
    categoryTag: currentLang.value === 'ar' ? item.cat_ar : item.cat_en,
    title: currentLang.value === 'ar' ? item.title_ar : item.title_en,
    image: item.image
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
