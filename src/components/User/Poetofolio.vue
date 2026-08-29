<template>
  <!-- PORTFOLIO / SERVICES SECTION -->
  <section
    id="portfolio"
    class="relative w-full py-16 sm:py-24 bg-stone-950 text-white overflow-hidden flex flex-col items-center justify-center select-none bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${sectionbg})` }"
  >
    <!-- Dark Overlay خلفية القسم لضمان وضوح النصوص -->
    <div class="absolute inset-0 bg-stone-950/90 pointer-events-none"></div>

    <!-- Background Container -->
    <div class="relative z-10 w-full mx-auto flex flex-col items-center">

      <!-- SECTION TITLE -->
      <div class="text-center mb-10 sm:mb-16 px-4">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide mb-3 drop-shadow-md"
          :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
        >
          {{ currentLang === 'ar' ? 'خدماتنا' : 'Our Services' }}
        </h2>
        <div class="w-12 sm:w-16 h-1 bg-amber-500/80 mx-auto rounded-full shadow-sm mb-4"></div>
        <p
          class="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto"
          :class="currentLang === 'ar' ? 'font-arabic-modern' : ''"
        >
          {{ currentLang === 'ar'
            ? 'استعرض بعضاً من أحدث وأرقى الأفكار والتنفيذات المعمارية التي قمنا بإنجازها'
            : 'Explore some of our latest and finest architectural executions and marble projects'
          }}
        </p>
      </div>

      <!-- SWIPER CAROUSEL -->
      <div class="w-full px-4">
        <swiper
          :key="currentLang"
          :dir="currentLang === 'ar' ? 'rtl' : 'ltr'"
          :modules="modules"
          :slides-per-view="'auto'"
          :space-between="20"
          :loop="true"
          :speed="6000"
          :autoplay="{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }"
          :grab-cursor="true"
          class="portfolio-swiper w-full"
        >
          <swiper-slide
            v-for="(project, index) in duplicatedProjects"
            :key="`${project.id}-${index}`"
            class="!w-[280px] sm:!w-[340px] md:!w-[380px]"
          >
            <!-- رابط ينقل إلى الصفحة الرئيسية ويحتوي على الكارد بالكامل -->
            <router-link
              to="/"
              class="group relative block rounded-2xl overflow-hidden bg-stone-900/90 border border-white/10 shadow-2xl transition-all duration-300 hover:border-amber-500/60 hover:-translate-y-1"
            >
              <!-- Image Layer (ثابتة تماماً بدون تكبير) -->
              <div class="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden bg-stone-950">
                <img
                  :src="project.image"
                  :alt="currentLang === 'ar' ? project.title_ar : project.title_en"
                  class="w-full h-full object-cover"
                />

                <!-- Dark Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

                <!-- Content overlay -->
                <div
                  class="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end"
                  :class="currentLang === 'ar' ? 'text-right' : 'text-left'"
                >
                  <span class="text-xs font-semibold text-amber-400 mb-1 tracking-wider uppercase">
                    {{ currentLang === 'ar' ? project.category_ar : project.category_en }}
                  </span>
                  <h3
                    class="text-lg sm:text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-amber-300"
                    :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
                  >
                    {{ currentLang === 'ar' ? project.title_ar : project.title_en }}
                  </h3>

                  <!-- الزر الخاص بالكارد -->
                  <div
                    class="card-btn relative overflow-hidden inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white border border-white/20 transition-all duration-300 w-full"
                    :style="{ '--bg-img': `url(${project.image})` }"
                    :class="currentLang === 'ar' ? 'font-arabic-modern' : ''"
                  >
                    <span
                      class="relative z-10 flex items-center gap-2"
                      :class="currentLang === 'ar' ? 'flex-row-reverse' : 'flex-row'"
                    >
                      {{ currentLang === 'ar' ? 'استعرض التفاصيل' : 'Explore Details' }}
                      <svg
                        class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        :class="currentLang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>

                </div>
              </div>
            </router-link>
          </swiper-slide>
        </swiper>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import sectionbg from '@/assets/puplic_wepsite/navebar/images/navbarnackground.png';
import entranceImg from '@/assets/puplic_wepsite/Service/images/entrance.jpg';
import graniteImg from '@/assets/puplic_wepsite/Service/images/granite.webp';
import waterjetImg from '@/assets/puplic_wepsite/Service/images/water_jet.jpg';
import stairsImg from '@/assets/puplic_wepsite/Service/images/stairs.jpg';

const modules = [Autoplay];

// دالة جلب اللغة المخزنة الموحدة
const getStoredLang = () => {
  return localStorage.getItem('locale') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ar';
};

const currentLang = ref(getStoredLang());
let observer = null;

const projectsData = ref([
  { id: 1, category_ar: 'مطابخ', category_en: 'Kitchens', title_ar: 'تصاميم أسطح وجزر المطابخ الفاخرة', title_en: 'Luxury Kitchen Islands & Countertops', image: graniteImg },
  { id: 2, category_ar: 'حمامات', category_en: 'Bathrooms', title_ar: 'مغاسل وديكورات الحمامات الراقية', title_en: 'Elegant Bathroom Vanities & Decor', image: waterjetImg },
  { id: 3, category_ar: 'فلل', category_en: 'Villas', title_ar: 'تشطيبات وتجهيزات الفلل الفاخرة', title_en: 'Luxury Villa Finishes & Execution', image: entranceImg },
  { id: 4, category_ar: 'درج', category_en: 'Stairs', title_ar: 'تصميم وتنفيذ الدرج الداخلي والخارجي', title_en: 'Interior & Exterior Staircases', image: stairsImg },
  { id: 5, category_ar: 'مداخل', category_en: 'Entrances', title_ar: 'تكسيات مداخل المباني والقصور', title_en: 'Building & Palace Entrances Cladding', image: entranceImg },
  { id: 6, category_ar: 'ارضيات', category_en: 'Flooring', title_ar: 'أرضيات رخام وجرانيت واسعة', title_en: 'Spacious Marble & Granite Flooring', image: graniteImg },
  { id: 7, category_ar: 'وتر جيت', category_en: 'Waterjet', title_ar: 'سجاد أرضيات رخام بتقنية الوترجيت', title_en: 'Waterjet Marble Floor Medallions', image: waterjetImg }
]);

const duplicatedProjects = computed(() => {
  return [
    ...projectsData.value,
    ...projectsData.value,
    ...projectsData.value,
    ...projectsData.value
  ];
});

const handleLangChange = (e) => {
  if (e.detail && e.detail.lang) {
    currentLang.value = e.detail.lang;
  } else {
    currentLang.value = getStoredLang();
  }
};

onMounted(() => {
  currentLang.value = getStoredLang();

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

.portfolio-swiper .swiper-wrapper {
  transition-timing-function: linear !important;
}

/* تأثير الهوفر المخصص للزر */
.card-btn {
  background-color: rgba(255, 255, 255, 0.05);
  background-image: none;
}

.card-btn:hover {
  background-image: linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.85)), var(--bg-img);
  background-size: cover;
  background-position: center;
  border-color: rgba(245, 158, 11, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}
</style>
