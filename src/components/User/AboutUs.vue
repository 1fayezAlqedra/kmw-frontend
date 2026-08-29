<template>
  <!-- ABOUT US SECTION - خلفية صورة ممتدة مع طبقة تغشية داكنة -->
  <section
    id="about"
    class="relative w-full py-12 sm:py-20 md:py-24 lg:py-28 bg-stone-950 bg-cover bg-center bg-no-repeat text-white overflow-hidden flex items-center justify-center transition-all duration-700 group/section"
    :style="{ backgroundImage: `url(${sectionBgImage})` }"
  >
    <!-- Dark Glass Overlay (يزداد التعتيم بجمالية عند الهوفر على القسم) -->
    <div class="absolute inset-0 bg-stone-950/85 group-hover/section:bg-stone-950/75 transition-colors duration-500 backdrop-blur-[2px]"></div>

    <!-- Container -->
    <div class="relative z-10 w-[92%] sm:w-[88%] max-w-[1650px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-10 items-center">

      <!-- LEFT SIDE: Marble Slabs Showcase & Center Logo Circle -->
      <div class="lg:col-span-6 relative flex items-center justify-center w-full">

        <!-- Marble Slabs Container (Grid of 4 Slabs) -->
        <div class="relative w-full max-w-[320px] xs:max-w-[420px] sm:max-w-[550px] lg:max-w-[620px] h-[300px] xs:h-[360px] sm:h-[420px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/15 grid grid-cols-4 bg-stone-900">

          <!-- Slab 1: Black -->
          <div class="relative h-full overflow-hidden border-r border-white/10 group/slab">
            <img :src="slab1Image" alt="Marble Slab 1" class="w-full h-full object-cover transition-transform duration-700 group-hover/slab:scale-110" />
            <div class="absolute inset-0 bg-black/20 group-hover/slab:bg-transparent transition-colors duration-300"></div>
          </div>

          <!-- Slab 2: Grey -->
          <div class="relative h-full overflow-hidden border-r border-white/10 group/slab">
            <img :src="slab2Image" alt="Marble Slab 2" class="w-full h-full object-cover transition-transform duration-700 group-hover/slab:scale-110" />
            <div class="absolute inset-0 bg-black/20 group-hover/slab:bg-transparent transition-colors duration-300"></div>
          </div>

          <!-- Slab 3: White Dark Veins -->
          <div class="relative h-full overflow-hidden border-r border-white/10 group/slab">
            <img :src="slab3Image" alt="Marble Slab 3" class="w-full h-full object-cover transition-transform duration-700 group-hover/slab:scale-110" />
            <div class="absolute inset-0 bg-black/20 group-hover/slab:bg-transparent transition-colors duration-300"></div>
          </div>

          <!-- Slab 4: Light White -->
          <div class="relative h-full overflow-hidden group/slab">
            <img :src="slab4Image" alt="Marble Slab 4" class="w-full h-full object-cover transition-transform duration-700 group-hover/slab:scale-110" />
            <div class="absolute inset-0 bg-black/20 group-hover/slab:bg-transparent transition-colors duration-300"></div>
          </div>

        </div>

        <!-- Center Overlay Circular Logo with Dashed Rings -->
        <div class="absolute z-20 flex items-center justify-center pointer-events-none">
          <!-- Outer Rotating Dashed Ring -->
          <div class="absolute w-28 h-28 xs:w-36 xs:h-36 sm:w-44 sm:h-44 rounded-full border border-dashed border-amber-400/60 animate-[spin_20s_linear_infinite]"></div>

          <!-- Center Solid Badge with Your Logo -->
          <div class="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-full bg-stone-950/90 backdrop-blur-md border-2 border-amber-500/80 shadow-[0_0_30px_rgba(0,0,0,0.9)] flex items-center justify-center p-2.5 xs:p-3 overflow-hidden pointer-events-auto transform transition-transform duration-300 hover:scale-110">
            <img :src="companyLogo" alt="Company Logo" class="w-full h-full object-contain" />
          </div>
        </div>

      </div>

      <!-- RIGHT SIDE: Text, Bullet Points & Read More Button -->
      <div
        class="lg:col-span-6 flex flex-col justify-center w-full"
        :class="currentLang === 'ar' ? 'text-right' : 'text-left'"
      >

        <!-- Main Title -->
        <h2
          class="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 tracking-wide leading-snug"
          :class="currentLang === 'ar' ? 'font-diwani' : 'font-royal-en'"
        >
          {{ currentLang === 'ar' ? 'مرحباً بكم في عالم الرخام والمطابخ' : 'Welcome to Kitchen & Marble World' }}
        </h2>

        <!-- Features List -->
        <ul class="space-y-3.5 sm:space-y-4 lg:space-y-5 mb-6 sm:mb-8">
          <li
            v-for="(feature, index) in currentFeatures"
            :key="index"
            class="flex items-start gap-3 sm:gap-4 group/item"
            :class="currentLang === 'ar' ? 'flex-row-reverse text-right' : 'flex-row text-left'"
          >
            <!-- Check Icon Badge -->
            <div class="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mt-0.5 rounded-full bg-stone-900/90 border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-md group-hover/item:bg-amber-500 group-hover/item:text-stone-950 transition-all duration-300">
              <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <!-- Feature Text -->
            <p class="text-xs sm:text-sm md:text-base text-stone-200 font-medium leading-relaxed">
              {{ feature }}
            </p>
          </li>
        </ul>

        <!-- Read More Button -->
        <div :class="currentLang === 'ar' ? 'text-right' : 'text-left'">
          <a
            href="#about-more"
            class="relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full overflow-hidden border border-amber-500/40 text-white hover:text-black font-bold text-xs sm:text-sm tracking-wider shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 group/btn bg-cover bg-center"
            :style="{ backgroundImage: `url(${BtnBgImage})` }"
          >
            <!-- Overlay لتعتيم صورة خلفية الزر لجعل النص أبيض واضح -->
            <div class="absolute inset-0 bg-stone-950/70 transition-opacity duration-500 group-hover/btn:opacity-0"></div>

            <!-- White Hover Background Layer -->
            <div class="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100"></div>

            <!-- Content (Text & Arrow) -->
            <span class="relative z-10 transition-colors duration-300 group-hover/btn:text-black">
              {{ currentLang === 'ar' ? 'أقرأ المزيد' : 'Read More' }}
            </span>

            <svg
              class="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 group-hover/btn:text-black"
              :class="currentLang === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// استيراد صورة الخلفية الخاصة بالقسم والزر
import sectionBgImage from '@/assets/puplic_wepsite/navebar/images/navbarnackground.png';
import BtnBgImage from '@/assets/puplic_wepsite/aboutUs/images/white_marble.jpg';
// استيراد صور الألواح واللوجو
import slab1Image from '@/assets/puplic_wepsite/aboutUs/images/black_marble.jpg';
import slab2Image from '@/assets/puplic_wepsite/aboutUs/images/gray_marble.jpg';
import slab3Image from '@/assets/puplic_wepsite/aboutUs/images/white_marble.jpg';
import slab4Image from '@/assets/puplic_wepsite/aboutUs/images/light_marble.jpg';
import companyLogo from '@/assets/puplic_wepsite/navebar/images/logo.png';

// دالة موحدة لجلب اللغة المخزنة أو الحالية بدقة
const getStoredLang = () => {
  return localStorage.getItem('locale') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ar';
};

// حالة اللغة
const currentLang = ref(getStoredLang());
let observer = null;

// النصوص بالعربية والإنجليزية
const featuresAr = [
  'توريد وتركيب كل انواع الرخام والجرانيت مصري ومستورد وتنفيذ ارقي تصاميم الأرضيات والحوائط، مداخل، درج (سلالم)، اعمدة ، نحت.',
  'ضع بين ايديكم خبرة عشرون عاما في مجال الديكورات وتصاميم الرخام والجرانيت.',
  'كافة انواع الاحجار بالاضافه الي التوريد والتركيب لكافة الاحجام من هيئات حكوميه ونوادي وفلل وشركات خاصه وابراج ووحدات سكنية.',
  'درجة عالية الاحترافيه والجوده مع مجموعه من امهر وافضل المهندسين والفنيين.'
];

const featuresEn = [
  'Supply and installation of all types of local and imported marble and granite, executing exquisite designs for floors, walls, entrances, stairs, columns, and carving.',
  'Placing over twenty years of experience in the field of decorations, marble, and granite designs at your disposal.',
  'All types of stones in addition to supply and installation for all scales including government entities, clubs, villas, private companies, towers, and residential units.',
  'High degree of professionalism and quality with a team of the most skilled and finest engineers and technicians.'
];

const currentFeatures = computed(() => {
  return currentLang.value === 'ar' ? featuresAr : featuresEn;
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

<style scoped>
/* التنسيقات الخاصة بالخطوط والاستجابة */
</style>
