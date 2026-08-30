<template>
  <div class="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between" :dir="currentLang === 'ar' ? 'rtl' : 'ltr'">
    <Navbar />

    <!-- Main Section -->
    <main class="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto space-y-12">

        <!-- Back Button -->
        <div>
          <router-link to="/services" class="inline-flex items-center gap-2 text-stone-400 hover:text-amber-400 text-sm font-semibold transition">
            <svg class="w-4 h-4 transform" :class="[currentLang === 'ar' ? '' : 'rotate-180']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            <span>{{ currentLang === 'ar' ? 'العودة لجميع الخدمات' : 'Back to All Services' }}</span>
          </router-link>
        </div>

        <!-- Category Banner Header -->
        <div
          v-if="categoryData"
          class="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-stone-900 shadow-2xl"
        >
          <div class="absolute inset-0 z-0">
            <img
              :src="categoryData.heroImage"
              :alt="currentLang === 'ar' ? categoryData.titleAr : categoryData.titleEn"
              class="w-full h-full object-cover opacity-30 filter blur-[1px]"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent"></div>
          </div>

          <div class="relative z-10 p-8 sm:p-14 space-y-4 max-w-3xl">
            <span class="inline-block text-xs sm:text-sm font-semibold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full backdrop-blur-md">
              {{ currentLang === 'ar' ? 'الأعمال السابقة' : 'Previous Portfolio' }}
            </span>
            <h1 class="text-3xl sm:text-5xl font-black text-white leading-tight">
              {{ currentLang === 'ar' ? categoryData.titleAr : categoryData.titleEn }}
            </h1>
            <p class="text-stone-300 text-sm sm:text-base leading-relaxed">
              {{ currentLang === 'ar' ? categoryData.descriptionAr : categoryData.descriptionEn }}
            </p>
          </div>
        </div>

        <!-- Projects Grid -->
        <div v-if="categoryData && categoryData.projects.length > 0" class="space-y-8">
          <div class="border-b border-stone-800 pb-4 flex items-center justify-between">
            <h2 class="text-xl sm:text-2xl font-bold text-amber-400">
              {{ currentLang === 'ar' ? 'المشاريع المنفذة' : 'Completed Projects' }}
            </h2>
            <span class="text-xs sm:text-sm text-stone-400">
              {{ categoryData.projects.length }} {{ currentLang === 'ar' ? 'مشروع' : 'Projects' }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="project in categoryData.projects"
              :key="project.id"
              class="bg-stone-900/80 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <!-- Cover Image -->
              <div class="relative h-64 overflow-hidden cursor-pointer" @click="openProjectModal(project)">
                <img
                  :src="project.images[0]"
                  :alt="currentLang === 'ar' ? project.titleAr : project.titleEn"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-stone-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-amber-400 font-bold text-sm">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  <span>{{ currentLang === 'ar' ? 'استعرض الصور (' + project.images.length + ')' : 'View Photos (' + project.images.length + ')' }}</span>
                </div>
                <span
                  class="absolute bottom-3 bg-stone-950/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-amber-400 font-semibold border border-amber-500/20"
                  :class="[currentLang === 'ar' ? 'right-3' : 'left-3']"
                >
                  📷 {{ project.images.length }} {{ currentLang === 'ar' ? 'صور' : 'Photos' }}
                </span>
              </div>

              <!-- Project Info -->
              <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div class="space-y-2">
                  <h3 class="text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                    {{ currentLang === 'ar' ? project.titleAr : project.titleEn }}
                  </h3>
                  <p class="text-stone-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {{ currentLang === 'ar' ? project.descriptionAr : project.descriptionEn }}
                  </p>
                </div>

                <button
                  @click="openProjectModal(project)"
                  class="w-full py-2.5 rounded-xl border border-stone-700 bg-stone-800/60 hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500 text-stone-300 text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>{{ currentLang === 'ar' ? 'عرض صور المشروع' : 'View Project Gallery' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 404 / Category Not Found -->
        <div v-else class="text-center py-20 space-y-4">
          <h2 class="text-2xl font-bold text-stone-400">
            {{ currentLang === 'ar' ? 'القسم غير موجود' : 'Category Not Found' }}
          </h2>
          <router-link to="/services" class="text-amber-400 underline text-sm">
            {{ currentLang === 'ar' ? 'العودة لصفحة الخدمات' : 'Back to Services' }}
          </router-link>
        </div>

      </div>
    </main>

    <!-- Modal Lightbox مع Swiper -->
    <div
      v-if="selectedProject"
      class="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <div class="max-w-4xl w-full bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="absolute top-4 z-30 w-10 h-10 rounded-full bg-stone-950/80 text-stone-300 hover:text-white hover:bg-amber-500 hover:text-stone-950 flex items-center justify-center transition-all border border-stone-700"
          :class="[currentLang === 'ar' ? 'left-4' : 'right-4']"
        >
          ✕
        </button>

        <!-- Swiper Main Gallery -->
        <div class="relative bg-black flex-1 overflow-hidden min-h-[350px] sm:min-h-[450px]">
          <swiper
            :style="{
              '--swiper-navigation-color': '#f59e0b',
              '--swiper-pagination-color': '#f59e0b',
            }"
            :loop="true"
            :spaceBetween="10"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            class="h-full w-full main-swiper"
          >
            <swiper-slide
              v-for="(img, idx) in selectedProject.images"
              :key="idx"
              class="flex items-center justify-center bg-black"
            >
              <img :src="img" class="max-h-[60vh] w-auto object-contain mx-auto" />
            </swiper-slide>
          </swiper>
        </div>

        <!-- Swiper Thumbs & Project Details -->
        <div class="p-6 space-y-4 bg-stone-900 border-t border-stone-800">
          <div>
            <h3 class="text-xl font-bold text-amber-400">
              {{ currentLang === 'ar' ? selectedProject.titleAr : selectedProject.titleEn }}
            </h3>
            <p class="text-stone-300 text-xs sm:text-sm mt-1">
              {{ currentLang === 'ar' ? selectedProject.descriptionAr : selectedProject.descriptionEn }}
            </p>
          </div>

          <!-- Thumbs Swiper -->
          <swiper
            v-if="selectedProject.images.length > 1"
            @swiper="setThumbsSwiper"
            :loop="false"
            :spaceBetween="12"
            :slidesPerView="4"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            class="thumbs-swiper"
          >
            <swiper-slide
              v-for="(img, idx) in selectedProject.images"
              :key="idx"
              class="cursor-pointer opacity-40 hover:opacity-100 transition-opacity rounded-lg overflow-hidden border-2 border-stone-800"
            >
              <img :src="img" class="w-full h-16 object-cover rounded-md" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/User/Navbar.vue';
import Footer from '@/components/User/footer.vue';
import defaultHero from '@/assets/puplic_wepsite/navebar/images/button_hover.jpg';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// Asset Imports
import K11 from '@/assets/puplic_wepsite/services/kitchens/K11.jpg';
import K12 from '@/assets/puplic_wepsite/services/kitchens/K12.jpg';
import K13 from '@/assets/puplic_wepsite/services/kitchens/K13.jpg';
import K21 from '@/assets/puplic_wepsite/services/kitchens/k21.jpg';
import k22 from '@/assets/puplic_wepsite/services/kitchens/k22.jpg';
import k31 from '@/assets/puplic_wepsite/services/kitchens/k31.jpg';
import k32 from '@/assets/puplic_wepsite/services/kitchens/k32.jpg';
import k33 from '@/assets/puplic_wepsite/services/kitchens/k33.jpg';
import k41 from '@/assets/puplic_wepsite/services/kitchens/k41.jpg';
import k42 from '@/assets/puplic_wepsite/services/kitchens/k42.jpg';
import k43 from '@/assets/puplic_wepsite/services/kitchens/k43.jpg';
import k51 from '@/assets/puplic_wepsite/services/kitchens/k51.webp';
import k52 from '@/assets/puplic_wepsite/services/kitchens/k52.jpg';
import k61 from '@/assets/puplic_wepsite/services/kitchens/k61.jpg';
import k62 from '@/assets/puplic_wepsite/services/kitchens/k62.jpg';
import k71 from '@/assets/puplic_wepsite/services/kitchens/k71.jpg';
import k72 from '@/assets/puplic_wepsite/services/kitchens/k72.jpg';
import v11 from '@/assets/puplic_wepsite/services/villas/v11.jpg';
import v12 from '@/assets/puplic_wepsite/services/villas/v12.jpg';
import v13 from '@/assets/puplic_wepsite/services/villas/v13.jpg';
import v21 from '@/assets/puplic_wepsite/services/villas/v21.jpg';
import v22 from '@/assets/puplic_wepsite/services/villas/v22.jpg';
import v31 from '@/assets/puplic_wepsite/services/villas/v31.jpg';
import v32 from '@/assets/puplic_wepsite/services/villas/v32.jpg';
import v41 from '@/assets/puplic_wepsite/services/villas/v41.jpg';
import v42 from '@/assets/puplic_wepsite/services/villas/v42.jpg';
import v51 from '@/assets/puplic_wepsite/services/villas/v51.jpg';
import v52 from '@/assets/puplic_wepsite/services/villas/v52.jpg';
import v53 from '@/assets/puplic_wepsite/services/villas/v53.jpg';
import v61 from '@/assets/puplic_wepsite/services/villas/v61.jpg';
import v62 from '@/assets/puplic_wepsite/services/villas/v62.jpg';
import v63 from '@/assets/puplic_wepsite/services/villas/v63.jpg';
import v64 from '@/assets/puplic_wepsite/services/villas/v64.jpg';
import v71 from '@/assets/puplic_wepsite/services/villas/v71.jpg';
import v72 from '@/assets/puplic_wepsite/services/villas/v72.jpg';
import s11 from '@/assets/puplic_wepsite/services/stairs/s11.jpg';
import s12 from '@/assets/puplic_wepsite/services/stairs/s12.jpg';
import s13 from '@/assets/puplic_wepsite/services/stairs/s13.jpg';
import s21 from '@/assets/puplic_wepsite/services/stairs/s21.jpg';
import s22 from '@/assets/puplic_wepsite/services/stairs/s22.jpg';
import s31 from '@/assets/puplic_wepsite/services/stairs/s31.jpg';
import s32 from '@/assets/puplic_wepsite/services/stairs/s32.jpg';
import s41 from '@/assets/puplic_wepsite/services/stairs/s41.jpg';
import s42 from '@/assets/puplic_wepsite/services/stairs/s42.jpg';
import s51 from '@/assets/puplic_wepsite/services/stairs/s51.jpg';
import s52 from '@/assets/puplic_wepsite/services/stairs/s52.jpg';
import s61 from '@/assets/puplic_wepsite/services/stairs/s61.jpg';
import s62 from '@/assets/puplic_wepsite/services/stairs/s62.jpg';
import f11 from '@/assets/puplic_wepsite/services/fountains/f11.jpg';
import f12 from '@/assets/puplic_wepsite/services/fountains/f12.jpg';
import f21 from '@/assets/puplic_wepsite/services/fountains/f21.jpg';
import f22 from '@/assets/puplic_wepsite/services/fountains/f22.jpg';
import f31 from '@/assets/puplic_wepsite/services/fountains/f31.jpg';
import f32 from '@/assets/puplic_wepsite/services/fountains/f32.jpg';
import f41 from '@/assets/puplic_wepsite/services/fountains/f41.jpg';
import f42 from '@/assets/puplic_wepsite/services/fountains/f42.jpg';
import f51 from '@/assets/puplic_wepsite/services/fountains/f51.jpg';
import f52 from '@/assets/puplic_wepsite/services/fountains/f52.jpg';
import f61 from '@/assets/puplic_wepsite/services/fountains/f61.jpg';
import f62 from '@/assets/puplic_wepsite/services/fountains/f62.jpg';
import f71 from '@/assets/puplic_wepsite/services/fountains/f71.jpg';
import f72 from '@/assets/puplic_wepsite/services/fountains/f72.jpg';
import t11 from '@/assets/puplic_wepsite/services/tables/t11.jpg';
import t12 from '@/assets/puplic_wepsite/services/tables/t12.jpg';
import t21 from '@/assets/puplic_wepsite/services/tables/t21.jpg';
import t22 from '@/assets/puplic_wepsite/services/tables/t22.jpg';
import t23 from '@/assets/puplic_wepsite/services/tables/t23.jpg';
import t31 from '@/assets/puplic_wepsite/services/tables/t31.jpg';
import t32 from '@/assets/puplic_wepsite/services/tables/t32.jpg';
import t41 from '@/assets/puplic_wepsite/services/tables/t41.jpg';
import t42 from '@/assets/puplic_wepsite/services/tables/t42.jpg';
import t51 from '@/assets/puplic_wepsite/services/tables/t51.jpg';
import t52 from '@/assets/puplic_wepsite/services/tables/t52.jpg';
import t61 from '@/assets/puplic_wepsite/services/tables/t61.jpg';
import t62 from '@/assets/puplic_wepsite/services/tables/t62.jpg';
import t71 from '@/assets/puplic_wepsite/services/tables/t71.jpg';
import t72 from '@/assets/puplic_wepsite/services/tables/t72.jpg';
import w11 from '@/assets/puplic_wepsite/services/waterjet/w11.jpg';
import w12 from '@/assets/puplic_wepsite/services/waterjet/w12.jpg';
import w13 from '@/assets/puplic_wepsite/services/waterjet/w13.jpg';
import w21 from '@/assets/puplic_wepsite/services/waterjet/w21.jpg';
import w22 from '@/assets/puplic_wepsite/services/waterjet/w22.jpg';
import w31 from '@/assets/puplic_wepsite/services/waterjet/w31.jpg';
import w32 from '@/assets/puplic_wepsite/services/waterjet/w32.jpg';
import w41 from '@/assets/puplic_wepsite/services/waterjet/w41.jpg';
import w42 from '@/assets/puplic_wepsite/services/waterjet/w42.jpg';
import w51 from '@/assets/puplic_wepsite/services/waterjet/w51.jpg';
import w52 from '@/assets/puplic_wepsite/services/waterjet/w52.jpg';
import w61 from '@/assets/puplic_wepsite/services/waterjet/w61.jpg';
import w62 from '@/assets/puplic_wepsite/services/waterjet/w62.jpg';
import w71 from '@/assets/puplic_wepsite/services/waterjet/w71.jpg';
import w72 from '@/assets/puplic_wepsite/services/waterjet/w72.jpg';
import w73 from '@/assets/puplic_wepsite/services/waterjet/w73.jpg';

const route = useRoute();

// إعداد وحدات Swiper
const modules = [FreeMode, Navigation, Thumbs];
const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

// قراءة اللغة من LocalStorage بأمان
const getStoredLang = () => {
  return (
    localStorage.getItem('locale') ||
    localStorage.getItem('lang') ||
    document.documentElement.getAttribute('lang') ||
    'ar'
  );
};

const currentLang = ref(getStoredLang());

const syncLanguage = () => {
  currentLang.value = getStoredLang();
};

onMounted(() => {
  window.addEventListener('storage', syncLanguage);
  const interval = setInterval(() => {
    const lang = getStoredLang();
    if (lang !== currentLang.value) {
      currentLang.value = lang;
    }
  }, 500);

  onUnmounted(() => {
    window.removeEventListener('storage', syncLanguage);
    clearInterval(interval);
  });
});

const selectedProject = ref(null);

// بيانات الخدمات والمشاريع
const servicesData = ref({
  kitchens: {
    heroImage: K11,
    titleAr: 'مطابخ - الأعمال السابقة',
    titleEn: 'Kitchens Portfolio',
    descriptionAr: 'استعرض تشكيلتنا من المطابخ الفاخرة المصنوعة من الرخام والكوارتز والجرانيت بتصاميم مودرن وكلاسيك.',
    descriptionEn: 'Explore our completed kitchen projects using premium marble, quartz, and granite.',
    projects: [
      {
        id: 'k1',
        titleAr: 'تجهيز وتشطيب مطبخ فيلا في دبي (جميرا)',
        titleEn: 'Luxury Villa Kitchen Fitting - Jumeirah, Dubai',
        descriptionAr: 'تصنيع وتثبيت كاونتر كوارتز أبيض مقاوم للبقع والحرارة مع إضاءة مخفية وشلال رخامي على الجوانب.',
        images: [K11, K12, K13]
      },
      {
        id: 'k2',
        titleAr: 'تجهيز مطبخ كلاسيك في الشارقة (الخزامية)',
        titleEn: 'Classic Marble Kitchen - Al Khozama, Sharjah',
        descriptionAr: 'تركيب مطبخ كامل من الجرانيت الأسود الفاخر مع حفر مغاسل دقيق وتلميع كريستالي.',
        images: [K21, k22]
      },
      {
        id: 'k3',
        titleAr: 'مطابخ مجمع فيلل سكني في عجمان',
        titleEn: 'Residential Villa Complex Kitchens - Ajman',
        descriptionAr: 'توريد وتثبيت سطوح رخام صناعي عالي الجودة لـ 12 فيلا سكنية بتصميم حديث وموحد.',
        images: [k31, k32, k33]
      },
      {
        id: 'k4',
        titleAr: 'مطبخ مفتوح مع جزيرة رخام في أبوظبي',
        titleEn: 'Open Concept Kitchen with Marble Island - Abu Dhabi',
        descriptionAr: 'تكسية جزيرة المطبخ (Island) بالكامل برخام الكالكاتا الإيطالي المعرق باللون الذهبي.',
        images: [k41, k42, k43]
      },
      {
        id: 'k5',
        titleAr: 'تجديد مطبخ فيلا مودرن في دبي هيلز',
        titleEn: 'Modern Villa Kitchen Renovation - Dubai Hills',
        descriptionAr: 'استبدال السطوح القديمة برخام كوارتز رمادي داكن وتجهيز أحواض غسيل غاطسة دقيقة.',
        images: [k51, k52]
      },
      {
        id: 'k6',
        titleAr: 'مطبخ بنتهاوس فاخر في رأس الخيمة',
        titleEn: 'Luxury Penthouse Kitchen - Ras Al Khaimah',
        descriptionAr: 'تصميم وتنفيذ كاونترات رخام بولغاري نادر مع حواف دائرية معالجة ضد الرطوبة.',
        images: [k61, k62]
      },
      {
        id: 'k7',
        titleAr: 'مطبخ خارجي (شواء) لفيلا في الفجيرة',
        titleEn: 'Outdoor BBQ Marble Counter - Fujairah Villa',
        descriptionAr: 'تركيب سطوح جرانيت طبيعي شديد الصلابة ومقاوم للعوامل الجوية الخارجية والحرارة.',
        images: [k71, k72]
      }
    ]
  },
  villas: {
    heroImage: v11,
    titleAr: 'فلل - الأعمال السابقة',
    titleEn: 'Villas Portfolio',
    descriptionAr: 'تشطيب واجهات ومداخل الفلل بالأحجار والرخام الطبيعي بتقنيات التثبيت الميكانيكي.',
    descriptionEn: 'Villa facade cladding and entrance finishing with natural stone.',
    projects: [
      {
        id: 'v1',
        titleAr: 'تجهيز وتشطيب فيلا فاخرة في دبي (نخلة جميرا)',
        titleEn: 'Luxury Villa Cladding - Palm Jumeirah, Dubai',
        descriptionAr: 'تكسية واجهة فيلا بالكامل برخام الترافرتين الطبيعي مع دمج الإنارة والتثبيت الميكانيكي.',
        images: [v11, v12, v13]
      },
      {
        id: 'v2',
        titleAr: 'تجهيز مجموعة فيلل في الشارقة (الرحمانية)',
        titleEn: 'Villa Group External Finishing - Al Rahmaniya, Sharjah',
        descriptionAr: 'مشروع متكامل لتشطيب واجهات 6 فيلل سكنية بالحجر الطبيعي البيج والديكورات المحفورة.',
        images: [v21, v22]
      },
      {
        id: 'v3',
        titleAr: 'تشطيب مدخل ومجالس فيلا في أبوظبي (المرموم)',
        titleEn: 'Villa Entrance & Majlis Cladding - Abu Dhabi',
        descriptionAr: 'توريد وتركيب أرضيات رخام كريما مارفل مع ألواح جدارية محفورة بتقنية CNC.',
        images: [v31, v32]
      },
      {
        id: 'v4',
        titleAr: 'تشطيب واجهة فيلا مودرن في عجمان',
        titleEn: 'Modern Villa Facade - Ajman',
        descriptionAr: 'دمج رخام الجرانيت الرمادي مع الحجر الأبيض في تصميم عصري فاخر للواجهات الخارجية.',
        images: [v41, v42]
      },
      {
        id: 'v5',
        titleAr: 'تكسية جدران ومداخل فيلا في دبي (مرعب)',
        titleEn: 'Interior Marble Cladding Villa - Dubai',
        descriptionAr: 'تركيب أعمدة رخام طبيعي ومداخل مقوسة للمجلس الرئيسي في الفيلا.',
        images: [v51, v52, v53]
      },
      {
        id: 'v6',
        titleAr: 'تشطيب كامل لفيلا خاصة في أم القيوين',
        titleEn: 'Private Villa Complete Marble Work - Umm Al Quwain',
        descriptionAr: 'تنفيذ كافة أعمال الرخام الداخلية والخارجية شاملاً الحمامات والمطابخ والأرضيات.',
        images: [v61, v62, v63, v64]
      },
      {
        id: 'v7',
        titleAr: 'واجهة فيلا كلاسيكية في العين',
        titleEn: 'Classic Villa Facade & Columns - Al Ain',
        descriptionAr: 'تثبيت حجر الرياض والرخام الطبيعي مع الكورنيش العلوي للأعمدة والشبابيك.',
        images: [v71, v72]
      }
    ]
  },
  stairs: {
    heroImage: s11,
    titleAr: 'درج - الأعمال السابقة',
    titleEn: 'Stairs Portfolio',
    descriptionAr: 'أدراج رخام وجرانيت دائرية ومستقيمة مع حفر البرم والإنارة المخفية.',
    descriptionEn: 'Straight and curved marble staircases with custom edge profiles.',
    projects: [
      {
        id: 's1',
        titleAr: 'درج دائري لفيلا فاخرة في دبي (البرشاء)',
        titleEn: 'Curved Grand Staircase - Al Barsha, Dubai',
        descriptionAr: 'تفصيل درج داخلي فخم من رخام روزا إيطالي مع درابزين رخامي وتلميع ماسي.',
        images: [s11, s12, s13]
      },
      {
        id: 's2',
        titleAr: 'تجهيز درج دوبلكس في الشارقة (مويلح)',
        titleEn: 'Duplex Villa Staircase - Muwaileh, Sharjah',
        descriptionAr: 'تركيب نائم وقائم درج رخام بيج مع إضاءة LED مخفية تحت خطوات الدرج.',
        images: [s21, s22]
      },
      {
        id: 's3',
        titleAr: 'درج خارجي رئيسي لفيلا في أبوظبي',
        titleEn: 'Main Entrance Exterior Stairs - Abu Dhabi',
        descriptionAr: 'تصنيع درج خارجي من الجرانيت المقاوم للانزلاق والحس السطحي الخشن للتثبيت المقاوم لعوامل الطقس.',
        images: [s31, s32]
      },
      {
        id: 's4',
        titleAr: 'درج معلق مع تكسية رخام في دبي',
        titleEn: 'Floating Marble Stairs - Dubai Villa',
        descriptionAr: 'تكسية عتبات درج معلق بجسور حديدية برخام إمبيرادور داكن ذو مظهر عصري.',
        images: [s41, s42]
      },
      {
        id: 's5',
        titleAr: 'درج مدخل مجمع فيلل في عجمان',
        titleEn: 'Villa Complex Entrance Stairs - Ajman',
        descriptionAr: 'تركيب أدراج جرانيت أسود سادة للمداخل الرئيسية مع حفر حواف مانعة للانزلاق.',
        images: [s51, s52]
      },
      {
        id: 's6',
        titleAr: 'درج حلزوني فخم في فيلا بالشارقة',
        titleEn: 'Spiral Marble Stairs - Sharjah Villa',
        descriptionAr: 'قص وتركيب رخام أبيض بمواصفات هندسية دقيقة لتتناسب مع دوران الدرج الحلزوني.',
        images: [s61, s62]
      }
    ]
  },
  waterjet: {
    heroImage: w11,
    titleAr: 'وتر جيت - الأعمال السابقة',
    titleEn: 'Waterjet Portfolio',
    descriptionAr: 'تصاميم وسجادات رخام ووترجيت محفورة ومقصوصة بالماء للصالات والمداخل الفاخرة.',
    descriptionEn: 'Intricate waterjet cut floor medallions and carpets for luxury spaces.',
    projects: [
      {
        id: 'w1',
        titleAr: 'سجادة ووترجيت لمدخل قصر في دبي (الخوانيج)',
        titleEn: 'Palace Entrance Waterjet Medallion - Al Khawaneej, Dubai',
        descriptionAr: 'سجادة رخامية مدمجة من 4 أنواع رخام إسباني بتصاميم هندسية وتداخلات فائقة الدقة.',
        images: [w12, w11, w13]
      },
      {
        id: 'w2',
        titleAr: 'تشطيب صالة فيلا بسجادة ووترجيت في الشارقة',
        titleEn: 'Villa Hall Waterjet Carpet - Sharjah',
        descriptionAr: 'قص وتجميع لوحة ووترجيت دائرية بقطر 4 أمتار في مركز الصالة الرئيسية.',
        images: [w21, w22]
      },
      {
        id: 'w3',
        titleAr: 'وترجيت مدخل مجلس رسمي في أبوظبي',
        titleEn: 'Official Majlis Entrance Waterjet - Abu Dhabi',
        descriptionAr: 'تصميم زخارف إسلامية مفرغة بالماء مدمجة مع الرخام الأبيض والأسود الفاخر.',
        images: [w31, w32]
      },
      {
        id: 'w4',
        titleAr: 'تجهيز أرضيات لوبي فيلا في عجمان',
        titleEn: 'Villa Lobby Waterjet Flooring - Ajman',
        descriptionAr: 'تنفيذ ممرات رخام مع حواف وسجادات ووترجيت طولي لربط غرف الفيلا.',
        images: [w41, w42]
      },
      {
        id: 'w5',
        titleAr: 'سجادة ووترجيت بيضاوية لفيلا في دبي',
        titleEn: 'Oval Waterjet Design - Dubai Villa',
        descriptionAr: 'دمج رخام الأخضر الهندسي مع الكريما مارفل في تصميم نباتي متميز تحت النجفة الرئيسية.',
        images: [w51, w52]
      },
      {
        id: 'w6',
        titleAr: 'أرضية ووترجيت لمقعد خاص في الفجيرة',
        titleEn: 'Custom Waterjet Floor - Fujairah',
        descriptionAr: 'تراكيب هندسية دقيقة من الرخام الإيطالي والتركي مقصوصة بأحدث أجهزة الووترجيت.',
        images: [w61, w62]
      },
      {
        id: 'w7',
        titleAr: 'لوحة جدارية ووترجيت في فيلا بطلب خاص بالعين',
        titleEn: 'Waterjet Wall Panel - Al Ain Villa',
        descriptionAr: 'تصميم جدارية رخام ووترجيت خلفية لشلال مالي داخل صالة الفيلا.',
        images: [w71, w72, w73]
      }
    ]
  },
  fountains: {
    heroImage: f11,
    titleAr: 'نوافير - الأعمال السابقة',
    titleEn: 'Fountains Portfolio',
    descriptionAr: 'نوافير وشلالات رخام طبيعي منحوتة يدوياً للمجالس والحدائق.',
    descriptionEn: 'Hand-carved marble fountains for gardens and reception halls.',
    projects: [
      {
        id: 'f1',
        titleAr: 'نافورة رخام كلاسيك 3 طبقات لفيلا في دبي',
        titleEn: '3-Tier Classic Marble Fountain - Dubai Villa',
        descriptionAr: 'نافورة حجرية مع نحت يدوي ونظام ضخ مائي مغلق وإضاءة ضد الماء في حديقة الفيلا.',
        images: [f11, f12]
      },
      {
        id: 'f2',
        titleAr: 'شلال جداري رخام لمدخل فيلا في الشارقة',
        titleEn: 'Wall Marble Waterfall - Sharjah Villa Entrance',
        descriptionAr: 'تكسية جدار كامل برخام الترافرتين المموج مع تجميع مائي خفي وإضاءة أسفل الرخام.',
        images: [f21, f22]
      },
      {
        id: 'f3',
        titleAr: 'نافورة رخام مودرن لبهو فيلا في أبوظبي',
        titleEn: 'Modern Interior Fountain - Abu Dhabi',
        descriptionAr: 'تصميم مكعبات رخام أسود وأبيض متدرجة يتدفق منها الماء بهدوء داخل الصالة الرئيسية.',
        images: [f31, f32]
      },
      {
        id: 'f4',
        titleAr: 'نافورة حدائق في مجموعة فيلل بالعجمان',
        titleEn: 'Garden Fountains - Ajman Villa Complex',
        descriptionAr: 'تركيب 3 نوافير رخامية دائرية بتصاميم مستوحاة من الأندلس في ساحات الفيلل.',
        images: [f41, f42]
      },
      {
        id: 'f5',
        titleAr: 'شلال رخام حجر طبيعي لفيلا في أم القيوين',
        titleEn: 'Natural Stone Waterfall - Umm Al Quwain Villa',
        descriptionAr: 'شلال خارجي ضخم من أحجار الجرانيت والرخام الخشن في جلسة الحديقة الخارجية.',
        images: [f51, f52]
      },
      {
        id: 'f6',
        titleAr: 'نافورة منحوتة يدوياً لفيلا في رأس الخيمة',
        titleEn: 'Hand-Carved Marble Fountain - Ras Al Khaimah',
        descriptionAr: 'نحت تفاصيل دقيقة على حوض النافورة والعمود الأوسط من رخام أبيض يوناني صافي.',
        images: [f61, f62]
      },
      {
        id: 'f7',
        titleAr: 'نافورة جدارية مع حوض رخام بالعين',
        titleEn: 'Wall Mounted Fountain - Al Ain Villa',
        descriptionAr: 'تثبيت رأس نافورة نحاسي على لوح رخام محفور مع حوض تجميع سفلي معالج ضد التسريب.',
        images: [f71, f72]
      }
    ]
  },
  tables: {
    heroImage: t11,
    titleAr: 'طاولات - الأعمال السابقة',
    titleEn: 'Tables Portfolio',
    descriptionAr: 'طاولات طعام وقهوة مخصصة من الرخام الطبيعي والستانلس الذهبي.',
    descriptionEn: 'Custom marble dining and coffee tables with gold accents.',
    projects: [
      {
        id: 't1',
        titleAr: 'طاولة طعام رخام كالكاتا لفيلا في دبي',
        titleEn: 'Calacatta Marble Dining Table - Dubai Villa',
        descriptionAr: 'طاولة 12 فرد من الرخام الإيطالي بحواف دائرية أنيقة وقواعد ستانلس استيل ذهبي.',
        images: [t11, t12]
      },
      {
        id: 't2',
        titleAr: 'طاولات مجلس ضيافة كامل في الشارقة',
        titleEn: 'Majlis Marble Tables Set - Sharjah Villa',
        descriptionAr: 'تجهيز طاولة رئيسية مع 8 طاولات خدمة جانبية من رخام الإمبيرادور الإسباني الداكن.',
        images: [t21, t22, t23]
      },
      {
        id: 't3',
        titleAr: 'طاولة قهوة مودرن لفيلا في أبوظبي',
        titleEn: 'Modern Coffee Table - Abu Dhabi Villa',
        descriptionAr: 'تصميم طاولة قهوة منسوبة من ألواح الرخام الأسود مع إضاءة خفية تحت القاعدة.',
        images: [t31, t32]
      },
      {
        id: 't4',
        titleAr: 'طاولات مدخل (Console) لفيلا في عجمان',
        titleEn: 'Console Marble Table - Ajman Villa Entrance',
        descriptionAr: 'تصنيع طاولة كنسول جدارية بحواف مائلة من الرخام الأخضر الفاخر والقواعد المعدنية.',
        images: [t41, t42]
      },
      {
        id: 't5',
        titleAr: 'طاولة اجتماعات رخام لفيلا مكتبية في دبي',
        titleEn: 'Marble Conference Table - Private Villa Office, Dubai',
        descriptionAr: 'طاولة ضخمة طول 4 أمتار قطعة واحدة من الجرانيت المعالج والملمع كريستالياً.',
        images: [t51, t52]
      },
      {
        id: 't6',
        titleAr: 'مجموعة طاولات قهوة دائرية في رأس الخيمة',
        titleEn: 'Round Marble Coffee Tables Set - Ras Al Khaimah',
        descriptionAr: 'طاولات داخلية متداخلة الأحجام من رخام الأونكس الشفاف المضيء.',
        images: [t61, t62]
      },
      {
        id: 't7',
        titleAr: 'طاولة طعام خارجية للحدائق في الفجيرة',
        titleEn: 'Outdoor Garden Marble Table - Fujairah',
        descriptionAr: 'طاولة جرانيت خرساني مقاومة للحرارة العالية والمطر في الجلسة الخارجية للفيلا.',
        images: [t71, t72]
      }
    ]
  }
});

const categoryData = computed(() => {
  return servicesData.value[route.params.category] || null;
});

const openProjectModal = (project) => {
  selectedProject.value = project;
};

const closeModal = () => {
  selectedProject.value = null;
  thumbsSwiper.value = null;
};
</script>

<style scoped>
.thumbs-swiper .swiper-slide-thumb-active {
  opacity: 1;
  border-color: #f59e0b !important;
}

div::-webkit-scrollbar {
  height: 6px;
}
div::-webkit-scrollbar-thumb {
  background: #78350f;
  border-radius: 4px;
}
</style>
