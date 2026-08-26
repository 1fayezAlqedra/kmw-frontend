<template>
  <!-- PORTFOLIO / GALLERY SECTION -->
  <section id="portfolio"
    class="relative w-full py-16 sm:py-24 bg-stone-950 bg-cover bg-center bg-fixed text-white overflow-hidden flex flex-col items-center justify-center select-none"
    :style="{ backgroundImage: `url(${sectionBgImage})` }">
    <!-- Dark Glass Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-stone-950/95 via-stone-950/85 to-stone-950/95 backdrop-blur-[2px]">
    </div>

    <!-- Container -->
    <div class="relative z-10 w-[92%] sm:w-[90%] max-w-[1600px] mx-auto flex flex-col items-center">

      <!-- SECTION TITLE -->
      <div class="text-center mb-8 sm:mb-12">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide mb-3 drop-shadow-md"
          :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'">
          {{ currentLang === 'ar' ? 'معرض أعمالنا ومشاريعنا' : 'Our Projects Gallery' }}
        </h2>
        <div class="w-12 sm:w-16 h-1 bg-amber-500/80 mx-auto rounded-full shadow-sm mb-4"></div>
        <p class="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto">
          {{ currentLang === 'ar' ? 'استعرض بعضاً من أحدث وأرقى الأفكار والتنفيذات المعمارية التي قمنا بإنجازها' :
            'Explore some of our latest and finest architectural executions and marble projects' }}
        </p>
      </div>

      <!-- FILTER BUTTONS -->
      <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10 sm:mb-14">
        <button v-for="filter in filters" :key="filter.key" @click="activeFilter = filter.key"
          class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 border border-white/10 backdrop-blur-md"
          :class="[
            activeFilter === filter.key
              ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-lg shadow-amber-500/20 scale-105'
              : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 hover:text-white hover:border-white/20',
            currentLang === 'ar' ? 'font-arabic-modern' : ''
          ]">
          {{ currentLang === 'ar' ? filter.label_ar : filter.label_en }}
        </button>
      </div>

      <!-- PROJECTS GRID -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
        <div v-for="project in filteredProjects" :key="project.id" @click="openLightbox(project)"
          class="group relative rounded-2xl overflow-hidden bg-stone-900/90 border border-white/10 shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/50">
          <!-- Image Layer -->
          <div class="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden bg-stone-950">
            <img :src="project.image" :alt="project.title_ar"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

            <!-- Dark Overlay on Hover -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300">
            </div>

            <!-- Zoom Icon on Hover -->
            <div
              class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                class="w-12 h-12 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>

            <!-- Content overlay -->
            <div class="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end">
              <span class="text-xs font-semibold text-amber-400 mb-1 tracking-wider uppercase">
                {{ currentLang === 'ar' ? project.category_ar : project.category_en }}
              </span>
              <h3
                class="text-lg sm:text-xl font-bold text-white transition-colors duration-300 group-hover:text-amber-300"
                :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'">
                {{ currentLang === 'ar' ? project.title_ar : project.title_en }}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <!-- LIGHTBOX MODAL -->
      <Teleport to="body">
        <div v-if="selectedProject"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-opacity duration-300"
          @click.self="closeLightbox">
          <!-- Close Button -->
          <button @click="closeLightbox"
            class="absolute top-6 right-6 w-12 h-12 rounded-full bg-stone-900/80 hover:bg-amber-500 text-white hover:text-stone-950 flex items-center justify-center border border-white/20 transition-all duration-300 z-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Modal Box -->
          <div
            class="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
            <div class="relative max-h-[75vh] w-full overflow-hidden bg-stone-950 flex items-center justify-center">
              <img :src="selectedProject.image" :alt="selectedProject.title_ar"
                class="w-full max-h-[75vh] object-contain" />
            </div>
            <div
              class="p-6 bg-stone-950/90 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="text-xs font-semibold text-amber-400 tracking-wider">
                  {{ currentLang === 'ar' ? selectedProject.category_ar : selectedProject.category_en }}
                </span>
                <h3 class="text-xl font-bold text-white mt-1"
                  :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'">
                  {{ currentLang === 'ar' ? selectedProject.title_ar : selectedProject.title_en }}
                </h3>
              </div>
              <a href="#contact" @click="closeLightbox"
                class="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all duration-300 shadow-lg"
                :class="currentLang === 'ar' ? 'font-arabic-modern' : ''">
                {{ currentLang === 'ar' ? 'اطلب مشروعك المشابه' : 'Request Similar Project' }}
              </a>
            </div>
          </div>
        </div>
      </Teleport>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

import sectionBgImage from '@/assets/puplic_wepsite/navebar/images/navbarnackground.png';

// صور المشاريع الافتراضية
import graniteImg from '@/assets/puplic_wepsite/Service/images/entrance.jpg';
import graniteImg from '@/assets/puplic_wepsite/Service/images/granite.webp';
import waterjetImg from '@/assets/puplic_wepsite/Service/images/water_jet.jpg';
import stairsImg from '@/assets/puplic_wepsite/Service/images/stairs.jpg';
const currentLang = ref(document.documentElement.getAttribute('lang') || 'ar');
const activeFilter = ref('all');
const selectedProject = ref(null);
let observer = null;
entrance.jpg
// فلاتر التصفية
const filters = [
  { key: 'all', label_ar: 'الكل', label_en: 'All Projects' },
  { key: 'marble', label_ar: 'رخام', label_en: 'Marble' },
  { key: 'granite', label_ar: 'جرانيت', label_en: 'Granite' },
  { key: 'waterjet', label_ar: 'واترجيت', label_en: 'Waterjet' },
  { key: 'stairs', label_ar: 'درج وسلالم', label_en: 'Stairs' }
];

// بيانات المشاريع (جاهزة لاستبدالها بطلب API من الـ Database)
const projectsData = ref([
  { id: 1, category: 'marble', category_ar: 'رخام مستورد', category_en: 'Imported Marble', title_ar: 'تشطيب صالة فيلا فاخرة', title_en: 'Luxury Villa Living Room', image: marbleImg },
  { id: 2, category: 'granite', category_ar: 'جرانيت مصري', category_en: 'Egyptian Granite', title_ar: 'واجهة برج تجاري بالجرانيت الأسود', title_en: 'Commercial Black Granite Facade', image: graniteImg },
  { id: 3, category: 'waterjet', category_ar: 'واترجيت', category_en: 'Waterjet Art', title_ar: 'سجادة أرضية رخام واترجيت', title_en: 'Waterjet Marble Floor Medallion', image: waterjetImg },
  { id: 4, category: 'stairs', category_ar: 'درج وسلالم', category_en: 'Staircases', title_ar: 'درج رخام دبل بلك لأحد القصور', title_en: 'Double Bullnose Palace Staircase', image: stairsImg },
  { id: 5, category: 'marble', category_ar: 'مطابخ رخام', category_en: 'Marble Kitchens', title_ar: 'جزيرة مطبخ رخام كلكتا', title_en: 'Calacatta Marble Kitchen Island', image: marbleImg },
  { id: 6, category: 'granite', category_ar: 'جرانيت', category_en: 'Granite Floors', title_ar: 'أرضيات جرانيت جالاكسي', title_en: 'Black Galaxy Granite Flooring', image: graniteImg }
]);

// فلترة المشاريع المعروضة
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projectsData.value;
  }
  return projectsData.value.filter(item => item.category === activeFilter.value);
});

const openLightbox = (project) => {
  selectedProject.value = project;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  selectedProject.value = null;
  document.body.style.overflow = 'auto';
};

onMounted(() => {
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
  document.body.style.overflow = 'auto';
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
