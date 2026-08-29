<template>
  <div class="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between">
    <!-- Navbar Component -->
    <Navbar />

    <!-- Main Section -->
    <main class="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto space-y-12">

        <!-- Back Button -->
        <div>
          <router-link to="/services" class="inline-flex items-center gap-2 text-stone-400 hover:text-amber-400 text-sm font-semibold transition">
            <svg class="w-4 h-4" :class="[currentLang === 'ar' ? '' : 'rotate-180']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              class="bg-stone-900/80 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group"
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
                <span class="absolute bottom-3 right-3 bg-stone-950/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-amber-400 font-semibold border border-amber-500/20">
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

    <!-- Modal Lightbox (معرض صور المشروع) -->
    <div
      v-if="selectedProject"
      class="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <div class="max-w-4xl w-full bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-950/80 text-stone-300 hover:text-white hover:bg-amber-500 hover:text-stone-950 flex items-center justify-center transition-all border border-stone-700"
        >
          ✕
        </button>

        <!-- Main Image Container -->
        <div class="relative bg-black flex-1 flex items-center justify-center overflow-hidden min-h-[350px] sm:min-h-[450px]">
          <img
            :src="selectedProject.images[activeImageIndex]"
            class="max-h-[60vh] w-auto object-contain transition-all duration-300"
          />

          <!-- Navigation Arrows -->
          <button
            v-if="selectedProject.images.length > 1"
            @click="prevImage"
            class="absolute left-4 p-3 rounded-full bg-stone-900/80 text-white hover:bg-amber-500 hover:text-stone-950 transition border border-stone-700"
          >
            ❮
          </button>
          <button
            v-if="selectedProject.images.length > 1"
            @click="nextImage"
            class="absolute right-4 p-3 rounded-full bg-stone-900/80 text-white hover:bg-amber-500 hover:text-stone-950 transition border border-stone-700"
          >
            ❯
          </button>
        </div>

        <!-- Thumbnails & Project Details -->
        <div class="p-6 space-y-4 bg-stone-900 border-t border-stone-800">
          <div>
            <h3 class="text-xl font-bold text-amber-400">
              {{ currentLang === 'ar' ? selectedProject.titleAr : selectedProject.titleEn }}
            </h3>
            <p class="text-stone-300 text-xs sm:text-sm mt-1">
              {{ currentLang === 'ar' ? selectedProject.descriptionAr : selectedProject.descriptionEn }}
            </p>
          </div>

          <!-- Thumbnails Grid -->
          <div v-if="selectedProject.images.length > 1" class="flex items-center gap-3 overflow-x-auto pb-2">
            <img
              v-for="(img, idx) in selectedProject.images"
              :key="idx"
              :src="img"
              @click="activeImageIndex = idx"
              class="w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all shrink-0"
              :class="activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-stone-800 opacity-60 hover:opacity-100'"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/User/Navbar.vue';
import Footer from '@/components/User/footer.vue';
import defaultHero from '@/assets/puplic_wepsite/navebar/images/button_hover.jpg';

const route = useRoute();

const getStoredLang = () => {
  return localStorage.getItem('locale') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ar';
};

const currentLang = ref(getStoredLang());
const selectedProject = ref(null);
const activeImageIndex = ref(0);

// بيانات الأعمال السابقة لكل قسم
const servicesData = ref({
  kitchens: {
    heroImage: defaultHero,
    titleAr: 'مطابخ - الأعمال السابقة',
    titleEn: 'Kitchens Portfolio',
    descriptionAr: 'استعرض تشكيلتنا من المطابخ الفاخرة المصنوعة من الرخام والكوارتز والجرانيت بتصاميم مودرن وكلاسيك.',
    descriptionEn: 'Explore our completed kitchen projects using premium marble, quartz, and granite.',
    projects: [
      {
        id: 'k1',
        titleAr: 'مطبخ مودرن كوارتز أبيض',
        titleEn: 'Modern White Quartz Kitchen',
        descriptionAr: 'تصنيع وتثبيت كاونتر كوارتز أبيض مقاوم للبقع والحرارة مع إضاءة مخفية وشلال رخامي على الجوانب.',
        images: [defaultHero, defaultHero, defaultHero]
      },
      {
        id: 'k2',
        titleAr: 'مطبخ جرانيت أسود جالكسي',
        titleEn: 'Black Galaxy Granite Kitchen',
        descriptionAr: 'تركيب مطبخ كامل من الجرانيت الأسود الفاخر مع حفر مغاسل دقيق وتلميع كريستالي.',
        images: [defaultHero, defaultHero]
      }
    ]
  },
  villas: {
    heroImage: defaultHero,
    titleAr: 'فلل - الأعمال السابقة',
    titleEn: 'Villas Portfolio',
    descriptionAr: 'تشطيب واجهات ومداخل الفلل بالأحجار والرخام الطبيعي بتقنيات التثبيت الميكانيكي.',
    descriptionEn: 'Villa facade cladding and entrance finishing with natural stone.',
    projects: [
      {
        id: 'v1',
        titleAr: 'واجهة فيلا رخام ترافرتين',
        titleEn: 'Travertine Villa Facade',
        descriptionAr: 'تكسية واجهة فيلا بالكامل بالرخام الطبيعي مع دمج الإنارة والتثبيت الميكانيكي.',
        images: [defaultHero, defaultHero]
      }
    ]
  },
  stairs: {
    heroImage: defaultHero,
    titleAr: 'درج - الأعمال السابقة',
    titleEn: 'Stairs Portfolio',
    descriptionAr: 'أدراج رخام وجرانيت دائرية ومستقيمة مع حفر البرم والإنارة المخفية.',
    descriptionEn: 'Straight and curved marble staircases with custom edge profiles.',
    projects: [
      {
        id: 's1',
        titleAr: 'درج دائري رخام روزا إيطالي',
        titleEn: 'Curved Italian Rosa Stairs',
        descriptionAr: 'تفصيل درج داخلي فخم مع درابزين رخامي وتلميع ماسي.',
        images: [defaultHero, defaultHero]
      }
    ]
  },
  waterjet: {
    heroImage: defaultHero,
    titleAr: 'وتر جيت - الأعمال السابقة',
    titleEn: 'Waterjet Portfolio',
    descriptionAr: 'تصاميم وسجادات رخام ووترجيت محفورة ومقصوصة بالماء للصالات والمداخل الفاخرة.',
    descriptionEn: 'Intricate waterjet cut floor medallions and carpets for luxury spaces.',
    projects: [
      {
        id: 'w1',
        titleAr: 'سجادة ووترجيت مدخل القصر',
        titleEn: 'Waterjet Entrance Medallion',
        descriptionAr: 'سجادة رخامية مدمجة من 4 أنواع رخام إسباني بتصاميم هندسية.',
        images: [defaultHero, defaultHero, defaultHero]
      }
    ]
  },
  fountains: {
    heroImage: defaultHero,
    titleAr: 'نوافير - الأعمال السابقة',
    titleEn: 'Fountains Portfolio',
    descriptionAr: 'نوافير وشلالات رخام طبيعي منحوتة يدوياً للمجالس والحدائق.',
    descriptionEn: 'Hand-carved marble fountains for gardens and reception halls.',
    projects: [
      {
        id: 'f1',
        titleAr: 'نافورة رخام كلاسيك 3 طبقات',
        titleEn: '3-Tier Classic Fountain',
        descriptionAr: 'نافورة حجرية مع نحت يدوي ونظام ضخ مائي مغلق.',
        images: [defaultHero, defaultHero]
      }
    ]
  },
  tables: {
    heroImage: defaultHero,
    titleAr: 'طاولات - الأعمال السابقة',
    titleEn: 'Tables Portfolio',
    descriptionAr: 'طاولات طعام وقهوة مخصصة من الرخام الطبيعي والستانلس الذهبي.',
    descriptionEn: 'Custom marble dining and coffee tables with gold accents.',
    projects: [
      {
        id: 't1',
        titleAr: 'طاولة طعام رخام كالكاتا',
        titleEn: 'Calacatta Dining Table',
        descriptionAr: 'طاولة 10 أفراد من الرخام الإيطالي بحواف دائرية أنيقة.',
        images: [defaultHero, defaultHero]
      }
    ]
  }
});

const categoryData = computed(() => {
  return servicesData.value[route.params.category] || null;
});

const openProjectModal = (project) => {
  selectedProject.value = project;
  activeImageIndex.value = 0;
};

const closeModal = () => {
  selectedProject.value = null;
};

const nextImage = () => {
  if (!selectedProject.value) return;
  activeImageIndex.value = (activeImageIndex.value + 1) % selectedProject.value.images.length;
};

const prevImage = () => {
  if (!selectedProject.value) return;
  activeImageIndex.value = (activeImageIndex.value - 1 + selectedProject.value.images.length) % selectedProject.value.images.length;
};
</script>
