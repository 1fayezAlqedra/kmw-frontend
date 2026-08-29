<template>
  <div class="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between">
    <!-- Navbar Component -->
    <Navbar />

    <!-- Main Content Wrapper -->
    <main
      class="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-fixed"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <div class="max-w-7xl mx-auto space-y-16">

        <!-- Hero / Header Section -->
        <div class="text-center space-y-4 max-w-3xl mx-auto">
          <span class="inline-block text-xs sm:text-sm font-semibold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full backdrop-blur-md uppercase">
            {{ currentLang === 'ar' ? 'خدماتنا وأعمالنا' : 'Our Services & Portfolio' }}
          </span>
          <h1
            class="text-3xl sm:text-5xl font-black bg-gradient-to-r from-white via-amber-200 to-amber-500 bg-clip-text text-transparent drop-shadow-md leading-tight"
            :class="[currentLang === 'ar' ? 'font-sans' : 'font-serif']"
          >
            {{ currentLang === 'ar' ? 'اختر القسم لاستعراض أعمالنا السابقة' : 'Select a Category to Explore Our Work' }}
          </h1>
          <p class="text-stone-400 text-sm sm:text-base leading-relaxed">
            {{
              currentLang === 'ar'
                ? 'نقدم مجموعة متكاملة من الأعمال المخصصة في تصنيع وتوريد وتركيب الرخام، الجرانيت، والمطابخ بأعلى معايير الحرفية.'
                : 'Explore our portfolio across custom marble, granite, kitchen fabrication, and architectural projects.'
            }}
          </p>
        </div>

        <!-- 6 Main Service Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="service in mainCategories"
            :key="service.slug"
            class="group relative bg-stone-900/80 border border-stone-800 hover:border-amber-500/60 rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-500 hover:-translate-y-2 shadow-2xl flex flex-col justify-between"
          >
            <!-- Category Image Cover -->
            <div class="relative h-56 overflow-hidden">
              <img
                :src="service.coverImage"
                :alt="currentLang === 'ar' ? service.titleAr : service.titleEn"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>

              <!-- Tag Icon -->
              <span class="absolute top-4 right-4 bg-stone-950/80 border border-amber-500/30 text-amber-400 text-xs px-3 py-1 rounded-full backdrop-blur-md font-semibold">
                {{ service.projectCount }} {{ currentLang === 'ar' ? 'مشروع سابق' : 'Projects' }}
              </span>
            </div>

            <!-- Content Details -->
            <div class="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between relative z-10">
              <div class="space-y-3">
                <h3
                  class="text-2xl font-bold text-stone-100 group-hover:text-amber-400 transition-colors"
                  :class="[currentLang === 'ar' ? 'font-sans' : 'font-serif']"
                >
                  {{ currentLang === 'ar' ? service.titleAr : service.titleEn }}
                </h3>
                <p class="text-stone-400 text-sm leading-relaxed line-clamp-3">
                  {{ currentLang === 'ar' ? service.descAr : service.descEn }}
                </p>
              </div>

              <!-- Action Button to Navigate to Category Projects -->
              <div class="pt-4 border-t border-stone-800/80">
                <router-link
                  :to="`/services/${service.slug}`"
                  class="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500 hover:text-stone-950 text-amber-400 text-sm font-bold transition-all duration-300 shadow-md group-hover:shadow-amber-500/20"
                >
                  <span>{{ currentLang === 'ar' ? 'استعرض الأعمال السابقة' : 'Explore Portfolio' }}</span>
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" :class="[currentLang === 'ar' ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Banner section for general inquiry -->
        <div class="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-amber-500/20 via-stone-900 to-stone-950 p-8 sm:p-12 text-center md:text-start flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div class="space-y-2 max-w-xl">
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white">
              {{ currentLang === 'ar' ? 'تريد تنفيذ فكرة أو تصميم خاص؟' : 'Have a Custom Project in Mind?' }}
            </h3>
            <p class="text-stone-300 text-sm sm:text-base">
              {{ currentLang === 'ar' ? 'فريقنا الجاهز لتقديم الاستشارات الفنية واختيار أفضل أنواع الرخام لمشروعك.' : 'Our team is ready to provide technical consultation and custom material selection.' }}
            </p>
          </div>
          <router-link
            to="/contact"
            class="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm sm:text-base transition-all duration-300 shadow-lg shadow-amber-500/20 shrink-0"
          >
            {{ currentLang === 'ar' ? 'تواصل معنا الآن' : 'Contact Us Now' }}
          </router-link>
        </div>

      </div>
    </main>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '@/components/User/Navbar.vue';
import Footer from '@/components/User/footer.vue';
import bgImage from '@/assets/puplic_wepsite/navebar/images/button_hover.jpg';

const getStoredLang = () => {
  return localStorage.getItem('locale') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ar';
};

const currentLang = ref(getStoredLang());
let observer = null;

// الأقسام الـ 6 الرئيسية
const mainCategories = ref([
  {
    slug: 'kitchens',
    titleAr: 'مطابخ',
    titleEn: 'Kitchens',
    descAr: 'تصميم وتصنيع مطابخ الكوارتز، الجرانيت، والرخام الطبيعي المقاوم للبقع والحرارة.',
    descEn: 'Luxury quartz, granite, and marble kitchen countertop fabrication.',
    coverImage: bgImage,
    projectCount: 12
  },
  {
    slug: 'villas',
    titleAr: 'فلل',
    titleEn: 'Villas',
    descAr: 'تكسية واجهات الفلل والمداخل بالأحجار والرخام الطبيعي بالتثبيت الميكانيكي.',
    descEn: 'Exterior villa cladding and facade installations with natural stone.',
    coverImage: bgImage,
    projectCount: 8
  },
  {
    slug: 'stairs',
    titleAr: 'درج',
    titleEn: 'Stairs',
    descAr: 'تنفيذ وتفصيل أدراج الرخام والجرانيت مع خدمات الشحف والبرم والإنارة المخفية.',
    descEn: 'Custom marble & granite staircases with bullnose profiles and LED slots.',
    coverImage: bgImage,
    projectCount: 15
  },
  {
    slug: 'waterjet',
    titleAr: 'وتر جيت',
    titleEn: 'Waterjet',
    descAr: 'سجادات ونقوش رخامية فاخرة بتقنية التقطيع المائي عالية الدقة للصالات والمداخل.',
    descEn: 'High-precision waterjet cut marble medallions and floor patterns.',
    coverImage: bgImage,
    projectCount: 10
  },
  {
    slug: 'fountains',
    titleAr: 'نوافير',
    titleEn: 'Fountains',
    descAr: 'تصميم ونحت نوافير وشلالات الرخام الطبيعي للحدائق والمداخل الملكية.',
    descEn: 'Custom carved marble fountains and waterfalls for indoor and outdoor spaces.',
    coverImage: bgImage,
    projectCount: 6
  },
  {
    slug: 'tables',
    titleAr: 'طاولات',
    titleEn: 'Tables',
    descAr: 'تفصيل طاولات طعام واستقبال من أقوى أنواع الرخام بقواعد ستانلس ستيل وذهبي.',
    descEn: 'Custom marble dining, coffee, and reception tables with stainless steel bases.',
    coverImage: bgImage,
    projectCount: 14
  }
]);

onMounted(() => {
  currentLang.value = getStoredLang();
  observer = new MutationObserver(() => {
    currentLang.value = getStoredLang();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>
