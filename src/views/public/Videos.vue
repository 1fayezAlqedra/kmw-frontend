<template>
  <div class="relative min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950">

    <!-- Background Image with Soft Overlay -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        :src="bgMarble"
        alt="Marble Background"
        class="w-full h-full object-cover object-center opacity-70"
      />
      <!-- تظليل خفيف للحفاظ على تباين النصوص مع إبراز عروق الرخام -->
      <div class="absolute inset-0 bg-stone-950/30"></div>
    </div>

    <!-- Navbar Component -->
    <Navbar class="relative z-10" />

    <!-- Main Content Area -->
    <main class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-grow w-full">

      <!-- Page Header Title -->
      <div class="text-center mb-8 sm:mb-10">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-100 tracking-tight drop-shadow-md">
          {{ isAr ? 'معرض الفيديوهات' : 'Video Gallery' }}
        </h1>
        <div class="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full shadow-lg shadow-amber-500/50"></div>
        <p class="text-stone-300 text-sm sm:text-base mt-3 max-w-xl mx-auto drop-shadow-sm font-medium">
          {{ isAr ? 'استعرض أحدث مقاطع الفيديو والأعمال المتميزة لدينا' : 'Browse our latest featured videos and projects' }}
        </p>
      </div>

      <!-- Search Control Bar -->
      <div class="flex justify-center mb-8 sm:mb-10 pb-6 border-b border-stone-800/60">
        <div class="relative w-full max-w-md group">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="isAr ? 'ابحث باسم الفيديو...' : 'Search by video title...'"
            class="w-full pl-10 pr-10 py-3 rounded-xl bg-stone-900/80 border border-stone-700/60 text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-300 text-sm shadow-lg backdrop-blur-md group-hover:border-stone-600"
          />
          <svg class="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 group-focus-within:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-100 text-sm transition-transform active:scale-90"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Animated Videos Grid -->
      <transition-group
        v-if="paginatedVideos.length > 0"
        tag="div"
        name="video-list"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <article
          v-for="video in paginatedVideos"
          :key="video.id"
          class="group bg-stone-900/85 backdrop-blur-md border border-stone-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col"
        >
          <!-- Video Frame Container -->
          <div class="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
            <iframe
              v-if="video.type === 'youtube'"
              :src="getEmbedUrl(video)"
              :title="isAr ? video.titleAr : video.titleEn"
              class="w-full h-full border-0 group-hover:scale-102 transition-transform duration-500"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
            ></iframe>

            <iframe
              v-else-if="video.type === 'instagram'"
              :src="getEmbedUrl(video)"
              class="w-full h-full border-0 group-hover:scale-102 transition-transform duration-500"
              frameborder="0"
              scrolling="no"
              allowtransparency="true"
            ></iframe>
          </div>

          <!-- Card Content -->
          <div class="p-5 flex flex-col flex-grow justify-between bg-stone-900/95">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                  {{ isAr ? video.categoryNameAr : video.categoryNameEn }}
                </span>
                <span class="text-xs text-stone-400 font-mono flex items-center gap-1">
                  <svg v-if="video.type === 'instagram'" class="w-3.5 h-3.5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>{{ video.duration }}</span>
                </span>
              </div>
              <h3 class="text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors duration-300 line-clamp-2 mt-1">
                {{ isAr ? video.titleAr : video.titleEn }}
              </h3>
              <p class="text-xs sm:text-sm text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                {{ isAr ? video.descAr : video.descEn }}
              </p>
            </div>
          </div>
        </article>
      </transition-group>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-stone-900/80 backdrop-blur-md rounded-2xl border border-stone-800 animate-fade-in">
        <svg class="w-12 h-12 text-stone-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <p class="text-stone-300 font-bold text-base">
          {{ isAr ? 'لا يوجد فيديو يطابق اسم البحث' : 'No videos found matching that title' }}
        </p>
        <button
          @click="searchQuery = ''"
          class="mt-4 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-semibold rounded-xl border border-stone-700 transition active:scale-95"
        >
          {{ isAr ? 'إفراغ البحث' : 'Clear Search' }}
        </button>
      </div>

      <!-- Conditional Pagination -->
      <div
        v-if="filteredVideos.length > itemsPerPage"
        class="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-800/80"
      >
        <span class="text-xs sm:text-sm text-stone-300 font-medium">
          {{ isAr ? `عرض ${startIndex + 1} - ${endIndex} من أصل ${filteredVideos.length} فيديو` : `Showing ${startIndex + 1} - ${endIndex} of ${filteredVideos.length} videos` }}
        </span>

        <div class="flex items-center gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="p-2.5 rounded-xl border border-stone-800 bg-stone-900/90 text-stone-300 hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-md"
          >
            <svg class="w-5 h-5" :class="[isAr ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            class="w-10 h-10 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 active:scale-90 shadow-md"
            :class="[
              currentPage === page
                ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-lg shadow-amber-500/20 scale-105'
                : 'bg-stone-900/90 border-stone-800 text-stone-300 hover:border-stone-700 hover:bg-stone-800'
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="p-2.5 rounded-xl border border-stone-800 bg-stone-900/90 text-stone-300 hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-md"
          >
            <svg class="w-5 h-5" :class="[isAr ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

    </main>

    <!-- Footer Component -->
    <Footer class="relative z-10" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import Navbar from '../../components/User/Navbar.vue';
import Footer from '../../components/User/footer.vue';
import bgMarble from '@/assets/puplic_wepsite/navebar/images/button_hover.jpg';

const getStoredLang = () => {
  return localStorage.getItem('locale') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ar';
};

const currentLang = ref(getStoredLang());
const isAr = computed(() => currentLang.value === 'ar');

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 6;
let observer = null;

// دالة تحويل أي رابط يوتيوب أو إنستغرام عادي إلى رابط Embed يعمل داخل iframe
const getEmbedUrl = (video) => {
  if (!video.url) return '';

  if (video.type === 'youtube') {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = video.url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : video.url;
  }

  if (video.type === 'instagram') {
    let cleanUrl = video.url.split('?')[0];
    if (!cleanUrl.endsWith('/')) cleanUrl += '/';
    return `${cleanUrl}embed`;
  }

  return video.url;
};

const videosList = ref([
  {
    id: 1,
    type: 'youtube',
    categoryNameAr: 'تركيب الرخام',
    categoryNameEn: 'Marble Fitting',
    titleAr: 'تركيب أرضيات رخام كالكاتا فاخر لمجلس فيلا',
    titleEn: 'Installing Calacatta Marble Flooring for Villa Majlis',
    descAr: 'خطوات تركيب وقص رخام الكالكاتا الإيطالي مع ضبط السيمترية وعروق الرخام بشكل متناغم.',
    descEn: 'Detailed installation process of Italian Calacatta marble with precise vein matching.',
    url: 'https://youtu.be/mslWlOYyahA?si=FqERyd5GZW0RZ11X',
    duration: '03:22'
  },
  {
    id: 2,
    type: 'instagram',
    categoryNameAr: 'المطابخ الفاخرة',
    categoryNameEn: 'Luxury Kitchens',
    titleAr: 'تصميم وتركيب مطبخ مودرن مع سطح رخام جرانيت طبيعي',
    titleEn: 'Modern Kitchen Installation with Natural Granite Countertop',
    descAr: 'استعراض لمراحل تشطيب مطبخ عالي الجودة متضمن جزيرة رخامية وإضاءات خفية.',
    descEn: 'Showcasing high-end kitchen setup featuring a marble island and embedded lighting.',
    url: 'https://www.instagram.com/reel/DMfG7gHy6ty/',
    duration: 'Reels'
  },
  {
    id: 3,
    type: 'youtube',
    categoryNameAr: 'تشطيب الفلل',
    categoryNameEn: 'Villa Finishes',
    titleAr: 'جولة داخل فيلا مودرن: واجهات رخام وشلالات مائية',
    titleEn: 'Modern Villa Tour: Marble Facades and Water Features',
    descAr: 'تغطية شاملة لأعمال توريد وتكسية الواجهات الخارجية بالرخام الطبيعي المعالج.',
    descEn: 'Comprehensive tour of exterior natural marble cladding and water features.',
    url: 'https://www.youtube.com/embed/cEqM0LTnC0w',
    duration: '08:45'
  },
  {
    id: 4,
    type: 'youtube',
    categoryNameAr: 'قص الووترجيت',
    categoryNameEn: 'Waterjet CNC',
    titleAr: 'دقة قص سجادة رخام ووترجيت لمدخل صالة رئيسية',
    titleEn: 'Precision Waterjet Cutting for Marble Entrance Medallion',
    descAr: 'كيفية تنفيذ وتجميع اللوحات والسجاد الرخامي المعقد باستخدام تقنية تقطيع الووترجيت.',
    descEn: 'How intricate marble medallions are cut and assembled using CNC waterjet technology.',
    url: 'https://www.youtube.com/embed/F85VxH2OE14',
    duration: '03:50'
  },
  {
    id: 5,
    type: 'instagram',
    categoryNameAr: 'تركيب الرخام',
    categoryNameEn: 'Marble Fitting',
    titleAr: 'تركيب وتكسية درجات درج فيلا من رخام الإمبرادور الداكن',
    titleEn: 'Dark Emperador Marble Staircase Cladding for Luxury Villa',
    descAr: 'فن تفصيل وتقفيل أطراف الدرج وتلميعه ميكانيكياً لإعطاء لمعان مرآة مستمر.',
    descEn: 'Expert staircase wrapping using Dark Emperador marble with mechanical mirror polishing.',
    url: 'https://www.instagram.com/reel/DMfG7gHy6ty/',
    duration: 'Reels'
  },
  {
    id: 6,
    type: 'youtube',
    categoryNameAr: 'المطابخ الفاخرة',
    categoryNameEn: 'Luxury Kitchens',
    titleAr: 'تركيب مغاسل رخام مفصلة لمطبخ كلاسيكي راقي',
    titleEn: 'Custom Integrated Marble Sinks for Classic Kitchen',
    descAr: 'تفاصيل دقيقة لدمج الأحواض والمغاسل المصنوعة كلياً من الرخام في كاونتر المطبخ.',
    descEn: 'Seamless integration of custom solid marble sinks into kitchen countertops.',
    url: 'https://www.youtube.com/embed/-qNmlG3tQP4',
    duration: '04:40'
  },
  {
    id: 7,
    type: 'youtube',
    categoryNameAr: 'تشطيب الفلل',
    categoryNameEn: 'Villa Finishes',
    titleAr: 'تكسية جدران حمامات برازيلية برخام الروزا الفاخر',
    titleEn: 'Luxury Rosa Marble Bathroom Wall Cladding',
    descAr: 'تنفيذ أعمال الديكورات الرخامية للحمامات الرئيسية والمغاسل الرخامية.',
    descEn: 'Execution of luxury marble bathroom wall cladding and custom sinks.',
    url: 'https://www.youtube.com/embed/SGbb4_MD4vA',
    duration: '05:10'
  }
]);

const filteredVideos = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return videosList.value;

  return videosList.value.filter(video =>
    video.titleAr.toLowerCase().includes(query) ||
    video.titleEn.toLowerCase().includes(query)
  );
});

watch(searchQuery, () => {
  currentPage.value = 1;
});

const totalPages = computed(() => Math.ceil(filteredVideos.value.length / itemsPerPage) || 1);
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredVideos.value.length));

const paginatedVideos = computed(() => {
  return filteredVideos.value.slice(startIndex.value, endIndex.value);
});

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

<style scoped>
.video-list-enter-active,
.video-list-leave-active {
  transition: all 0.4s ease;
}
.video-list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.video-list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
