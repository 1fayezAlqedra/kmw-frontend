<template>
  <div class="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between">

    <!-- Navbar Component -->
    <Navbar />

    <!-- Main Content Wrapper -->
    <main
      class="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-fixed"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <div class="max-w-7xl mx-auto space-y-10">

        <!-- Header Section -->
        <div class="text-center space-y-3">
          <h1
            class="text-3xl sm:text-5xl font-black bg-gradient-to-r from-white via-amber-200 to-amber-500 bg-clip-text text-transparent drop-shadow-md"
            :class="[currentLang === 'ar' ? 'font-sans' : 'font-serif']"
          >
            {{ currentLang === 'ar' ? 'معرض المنتجات' : 'Products Showcase' }}
          </h1>
          <p class="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto">
            {{
              currentLang === 'ar'
                ? 'استكشف تشكيلتنا الفاخرة من الرخام، الجرانيت، الكوارتز، وأعمال الووترجيت المصممة بأعلى معايير الجودة.'
                : 'Explore our premium collection of marble, granite, quartz, and waterjet designs crafted to perfection.'
            }}
          </p>
        </div>

        <!-- Search Bar Section -->
        <div class="max-w-xl mx-auto relative">
          <div class="relative flex items-center">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="currentLang === 'ar' ? 'ابحث عن منتج، لون، أو خامة...' : 'Search for products, colors, or materials...'"
              class="w-full py-3 px-5 border border-stone-800 rounded-2xl bg-stone-900/80 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/80 backdrop-blur-md transition-all duration-300 text-sm sm:text-base"
              :class="[currentLang === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4']"
            />
            <div
              class="absolute flex items-center pointer-events-none text-stone-400"
              :class="[currentLang === 'ar' ? 'right-4' : 'left-4']"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute text-stone-500 hover:text-stone-300 text-xs font-bold px-2 py-1"
              :class="[currentLang === 'ar' ? 'left-3' : 'right-3']"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Category Filter Tabs -->
        <div class="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectCategory(cat.id)"
            class="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm active:scale-95 whitespace-nowrap"
            :class="[
              selectedCategory === cat.id
                ? 'bg-amber-500 border-amber-400 text-stone-950 shadow-amber-500/20 shadow-lg'
                : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-amber-500/50 hover:text-amber-400 backdrop-blur-md'
            ]"
          >
            {{ currentLang === 'ar' ? cat.nameAr : cat.nameEn }}
          </button>
        </div>

        <!-- Dynamic Category Intro Banner (تظهر فقط عند اختيار تصنيف محدد) -->
        <transition name="fade">
          <div
            v-if="currentCategoryInfo"
            class="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-stone-900/80 backdrop-blur-xl shadow-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8"
          >
            <!-- Category Image Header -->
            <div class="w-full md:w-1/3 h-48 sm:h-56 rounded-2xl overflow-hidden relative shrink-0 border border-stone-800">
              <img
                :src="currentCategoryInfo.bannerImage"
                :alt="currentLang === 'ar' ? currentCategoryInfo.titleAr : currentCategoryInfo.titleEn"
                class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
              <span class="absolute bottom-3 right-3 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-3 py-1 rounded-full backdrop-blur-md font-semibold">
                {{ currentLang === 'ar' ? 'نبذة عن التصنيف' : 'Category Overview' }}
              </span>
            </div>

            <!-- Category Description Content -->
            <div class="flex-1 space-y-3 text-center md:text-start">
              <h2
                class="text-2xl sm:text-3xl font-extrabold text-amber-400"
                :class="[currentLang === 'ar' ? 'font-sans' : 'font-serif']"
              >
                {{ currentLang === 'ar' ? currentCategoryInfo.titleAr : currentCategoryInfo.titleEn }}
              </h2>
              <p class="text-stone-300 text-sm sm:text-base leading-relaxed">
                {{ currentLang === 'ar' ? currentCategoryInfo.descAr : currentCategoryInfo.descEn }}
              </p>
            </div>
          </div>
        </transition>

        <!-- Products Grid -->
        <div v-if="paginatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          <div
            v-for="(product, index) in paginatedProducts"
            :key="product.id"
            class="group bg-stone-900/70 border border-stone-800 hover:border-amber-500/50 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
          >
            <!-- Image Container -->
            <div
              class="relative h-60 w-full overflow-hidden bg-stone-950 cursor-pointer"
              @click="openLightbox(index)"
            >
              <img
                :src="product.image"
                :alt="currentLang === 'ar' ? product.titleAr : product.titleEn"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60"></div>

              <span
                class="absolute top-3 right-3 bg-stone-950/80 border border-stone-700 text-amber-400 text-xs px-3 py-1 rounded-full backdrop-blur-md font-medium"
              >
                {{ getCategoryName(product.category) }}
              </span>
            </div>

            <!-- Content Container -->
            <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div class="space-y-2">
                <h3
                  class="text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors"
                  :class="[currentLang === 'ar' ? 'font-sans' : 'font-serif']"
                >
                  {{ currentLang === 'ar' ? product.titleAr : product.titleEn }}
                </h3>
                <p class="text-stone-400 text-xs sm:text-sm line-clamp-2">
                  {{ currentLang === 'ar' ? product.descAr : product.descEn }}
                </p>
              </div>

              <!-- Card Footer / Actions -->
              <div class="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                <router-link
                  :to="`/contact?product=${product.id}`"
                  class="w-full py-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500 hover:text-stone-950 text-amber-400 text-xs sm:text-sm font-bold text-center transition-all duration-300"
                >
                  {{ currentLang === 'ar' ? 'طلب سعر / استفسار' : 'Inquire Now' }}
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20 bg-stone-900/40 rounded-3xl border border-stone-800/60 backdrop-blur-md">
          <svg class="w-16 h-16 text-stone-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 class="text-lg font-bold text-stone-300 mb-1">
            {{ currentLang === 'ar' ? 'لم يتم العثور على نتائج' : 'No products found' }}
          </h3>
          <p class="text-stone-500 text-sm">
            {{ currentLang === 'ar' ? 'جرب البحث بكلمة أخرى أو تغيير التصنيف المختار.' : 'Try searching for something else or change the category.' }}
          </p>
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex items-center justify-center gap-1.5 sm:gap-2 pt-6 flex-wrap">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 rounded-xl border border-stone-800 bg-stone-900/80 text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-500 transition-all text-xs sm:text-sm"
          >
            {{ currentLang === 'ar' ? 'السابق' : 'Prev' }}
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border text-xs sm:text-sm font-bold transition-all duration-300"
            :class="[
              currentPage === page
                ? 'bg-amber-500 border-amber-400 text-stone-950 shadow-md'
                : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-amber-500/50 hover:text-amber-400'
            ]"
          >
            {{ page }}
          </button>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 rounded-xl border border-stone-800 bg-stone-900/80 text-stone-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-amber-500 transition-all text-xs sm:text-sm"
          >
            {{ currentLang === 'ar' ? 'التالي' : 'Next' }}
          </button>
        </div>

      </div>
    </main>

    <!-- Footer Component -->
    <Footer />

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xl flex flex-col justify-between items-center select-none transition-all duration-300"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <!-- Header Info Bar -->
        <div class="w-full p-4 sm:p-5 flex justify-between items-start sm:items-center bg-stone-900/60 border-b border-stone-800/80 backdrop-blur-md z-10 gap-3">
          <div class="flex-1 text-center px-2">
            <!-- Category Tag -->
            <span class="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full mb-1">
              {{ getCategoryName(currentLightboxProduct?.category) }}
            </span>
            <!-- Product Title -->
            <h2 class="text-stone-100 font-bold text-sm sm:text-xl leading-tight">
              {{ currentLang === 'ar' ? currentLightboxProduct?.titleAr : currentLightboxProduct?.titleEn }}
            </h2>
            <!-- Product Description -->
            <p class="text-stone-400 text-xs sm:text-sm max-w-2xl mx-auto truncate mt-1">
              {{ currentLang === 'ar' ? currentLightboxProduct?.descAr : currentLightboxProduct?.descEn }}
            </p>
          </div>
          <!-- Close Button -->
          <button
            @click="closeLightbox"
            class="text-stone-400 hover:text-amber-400 bg-stone-800/50 hover:bg-stone-800 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-2xl font-light focus:outline-none transition-all shrink-0"
          >
            ✕
          </button>
        </div>

        <!-- Center Image View -->
        <div class="relative flex-1 w-full flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <!-- Left Arrow -->
          <button
            @click="prevImage"
            class="absolute left-2 sm:left-6 z-10 text-stone-200 hover:text-amber-400 bg-stone-900/60 hover:bg-stone-900/90 border border-stone-700/60 p-2.5 sm:p-3.5 rounded-full backdrop-blur-md transition-all focus:outline-none active:scale-95 shadow-lg"
          >
            <svg class="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Image Container -->
          <div class="max-w-[92vw] max-h-[70vh] sm:max-h-[75vh] flex items-center justify-center relative">
            <img
              :src="currentLightboxProduct?.image"
              :alt="currentLightboxProduct?.titleEn"
              class="max-h-[70vh] sm:max-h-[75vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl border border-stone-800/80 bg-stone-950/40"
            />
          </div>

          <!-- Right Arrow -->
          <button
            @click="nextImage"
            class="absolute right-2 sm:right-6 z-10 text-stone-200 hover:text-amber-400 bg-stone-900/60 hover:bg-stone-900/90 border border-stone-700/60 p-2.5 sm:p-3.5 rounded-full backdrop-blur-md transition-all focus:outline-none active:scale-95 shadow-lg"
          >
            <svg class="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Counter & Actions Footer -->
        <div class="p-3 sm:p-4 w-full flex items-center justify-between px-6 bg-stone-900/40 border-t border-stone-800/60 backdrop-blur-md text-xs sm:text-sm">
          <span class="text-stone-400 font-mono">
            {{ lightboxIndex + 1 }} / {{ filteredProducts.length }}
          </span>

          <router-link
            :to="`/contact?product=${currentLightboxProduct?.id}`"
            @click="closeLightbox"
            class="px-4 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500 hover:text-stone-950 text-amber-400 font-bold transition-all text-xs sm:text-sm"
          >
            {{ currentLang === 'ar' ? 'طلب سعر' : 'Inquire' }}
          </router-link>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// المكونات العامة
import Navbar from '@/components/User/Navbar.vue';
import Footer from '@/components/User/footer.vue';

// خلفيات وأصول
import bgImage from '@/assets/puplic_wepsite/navebar/images/button_hover.jpg';

// Spanish marble
import Rojo_Alicant from '@/assets/puplic_wepsite/products/spanish/Rojo_Alicant.jpg';
import Blanco_Macael from '@/assets/puplic_wepsite/products/spanish/Blanco_Macael.jpg';
import Crema_Marfil from '@/assets/puplic_wepsite/products/spanish/Crema_Marfil.webp';
import dark_emperador from '@/assets/puplic_wepsite/products/spanish/dark_emperador.jpg';
import Gris_Serpiente from '@/assets/puplic_wepsite/products/spanish/Gris_Serpiente.webp';
import light_emperador from '@/assets/puplic_wepsite/products/spanish/light_emperador.jpg';
import nero_marquina from '@/assets/puplic_wepsite/products/spanish/nero_marquina.jpg';

// Italian marble
import Statuario from '@/assets/puplic_wepsite/products/italian/Statuario_Italian.jpg';
import Calacatta_Gold from '@/assets/puplic_wepsite/products/italian/Calacatta_Gold.jpg';
import Carrara_White from '@/assets/puplic_wepsite/products/italian/Carrara_White.jpg';
import Picasso from '@/assets/puplic_wepsite/products/italian/Picasso.jpg';
import botticino_classico from '@/assets/puplic_wepsite/products/italian/botticino_classico.jpg';
import Arabescato_Marble from '@/assets/puplic_wepsite/products/italian/Arabescato_Marble.jpg';
import Portoro_Black from '@/assets/puplic_wepsite/products/italian/Portoro_Black.jpg';

// Granite
import Absolute_Double_Black from '@/assets/puplic_wepsite/products/granite/Absolute_Double_Black.jpg';
import black_galaxy from '@/assets/puplic_wepsite/products/granite/black_galaxy.jpg';
import Kashmir_White from '@/assets/puplic_wepsite/products/granite/Kashmir_White.jpg';
import Tan_Brown from '@/assets/puplic_wepsite/products/granite/Tan_Brown.jpg';
import Rosa_Beta from '@/assets/puplic_wepsite/products/granite/Rosa_Beta.jpg';
import Ubatuba from '@/assets/puplic_wepsite/products/granite/Ubatuba.jpg';
import Baltic_Brown from '@/assets/puplic_wepsite/products/granite/Baltic_Brown.jpg';

// Quartz
import Calacatta_White from '@/assets/puplic_wepsite/products/quartz/Calacatta_White.jpg';
import Modern_Concrete_Gray from '@/assets/puplic_wepsite/products/quartz/Modern_Concrete_Gray.webp';
import Royal_Black from '@/assets/puplic_wepsite/products/quartz/Royal_Black.jpg';
import Soft_Beige from '@/assets/puplic_wepsite/products/quartz/Soft_Beige.webp';
import Cocoa_Brown from '@/assets/puplic_wepsite/products/quartz/Cocoa_Brown.jpg';
import Crystal_White from '@/assets/puplic_wepsite/products/quartz/Crystal_White.jpg';
import Gold_Vein from '@/assets/puplic_wepsite/products/quartz/Gold_Vein.webp';

// Waterjet
import Gold_Circular_Waterjet_MedallionVein from '@/assets/puplic_wepsite/products/Waterjet/Circular_Waterjet_Medallion.jpg';
import Waterjet_Border_Frame from '@/assets/puplic_wepsite/products/Waterjet/Waterjet_Border_Frame.jpg';
import Waterjet_Wall_Panel from '@/assets/puplic_wepsite/products/Waterjet/Waterjet_Wall_Panel.jpeg';
import Rectangular_Waterjet_Carpet from '@/assets/puplic_wepsite/products/Waterjet/Rectangular_Waterjet_Carpet.jpg';
import Neo_Classic_Waterjet_Art from '@/assets/puplic_wepsite/products/Waterjet/Neo_Classic_Waterjet_Art.webp';
import Andalusian_Waterjet_Pattern from '@/assets/puplic_wepsite/products/Waterjet/Andalusian_Waterjet_Pattern.avif';

const route = useRoute();
const router = useRouter();

const getStoredLang = () => {
  return localStorage.getItem('locale') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ar';
};
const currentLang = ref(getStoredLang());
const searchQuery = ref('');
let observer = null;

const categories = ref([
  { id: 'all', nameAr: 'الكل', nameEn: 'All' },
  { id: 'italian-marble', nameAr: 'رخام إيطالي', nameEn: 'Italian Marble' },
  { id: 'spanish-marble', nameAr: 'رخام إسباني', nameEn: 'Spanish Marble' },
  { id: 'granite', nameAr: 'جرانيت', nameEn: 'Granite' },
  { id: 'quartz', nameAr: 'كوارتز', nameEn: 'Quartz' },
  { id: 'waterjet', nameAr: 'ووتر جيت', nameEn: 'Waterjet' }
]);

const selectedCategory = ref('all');

// ==========================================
// معلومات ونبذة كل تصنيف (Category Details Data)
// ==========================================
const categoryDetails = ref({
  'spanish-marble': {
    titleAr: 'الرخام الإسباني الفاخر',
    titleEn: 'Luxury Spanish Marble',
    descAr: 'يتميز الرخام الإسباني بتنوع ألوانه الدافئة والغنية كالألوان البيج، البني، والأحمر. يُعرف عالمياً بمتانته وملاءمته لمختلف الديكورات الكلاسيكية والحديثة، ويعطي لمسة من العراقة والدفء للمساحات الداخلية.',
    descEn: 'Spanish marble is famous for its rich warm tones like beige, brown, and red. Universally recognized for its durability and timeless beauty in both classic and contemporary interiors.',
    bannerImage: Crema_Marfil
  },
  'italian-marble': {
    titleAr: 'الرخام الإيطالي الفاخر',
    titleEn: 'Exquisite Italian Marble',
    descAr: 'رمز الفخامة والرقاء عبر العصور، يتميز بخلفياته البيضاء الناصعة وعروقه الرمادية والذهبية الفريدة. مثالي للمشاريع القصرية، الأرضيات الملكية، والحوائط الفاخرة.',
    descEn: 'The epitome of luxury through the ages, known for pure white backgrounds and distinct gray and gold veining. Perfect for palatial projects and premium flooring.',
    bannerImage: Statuario
  },
  'granite': {
    titleAr: 'الجرانيت الطبيعي شديد الصلابة',
    titleEn: 'Durable Natural Granite',
    descAr: 'أقوى الأحجار الطبيعية المخصصة للتحمل العالي. يتميز بمقاومته الفائقة للحرارة والخدوش والخدوش اليومية، مما يجعله الخيار الأول للمطابخ والمساحات الخارجية.',
    descEn: 'One of the strongest natural stones built for heavy endurance. Unmatched resistance to heat and scratches makes it the ideal choice for kitchen countertops.',
    bannerImage: black_galaxy
  },
  'quartz': {
    titleAr: 'الكوارتز المعالج المودرن',
    titleEn: 'Modern Engineered Quartz',
    descAr: 'أسطح كوارتز مبتكرة تجمع بين جمال الأحجار الطبيعية وسهولة الصيانة التامة. تتميز بأنها غير مسامية ومقاومة للبكتيريا والبقع تماماً.',
    descEn: 'Engineered quartz surfaces combining the elegance of natural stone with effortless maintenance. Non-porous, stain-resistant, and highly hygienic.',
    bannerImage: Calacatta_White
  },
  'waterjet': {
    titleAr: 'أعمال الووترجيت الفنية',
    titleEn: 'Artistic Waterjet Designs',
    descAr: 'تقنية قص بالماء عالية الدقة تمكننا من دمج ألوان وأنواع الرخام المختلفة لتشكيل لوحات هندسية وسجادات رخامية مخصصة تفوق الخيال.',
    descEn: 'Precision waterjet cutting techniques that combine various marble colors into stunning custom geometric patterns and floor medallions.',
    bannerImage: Gold_Circular_Waterjet_MedallionVein
  }
});

// الحصوصل على بيانات التصنيف المختار
const currentCategoryInfo = computed(() => {
  if (selectedCategory.value === 'all') return null;
  return categoryDetails.value[selectedCategory.value] || null;
});

// قائمة المنتجات
const products = ref([
  // Italian Marble
  { id: 101, category: 'italian-marble', titleAr: 'رخام ستاتواريو إيطالي', titleEn: 'Statuario Italian Marble', descAr: 'عروق رمادية ناعمة وخلفية بيضاء ناصعة للأرضيات والواجهات الراقية.', descEn: 'Soft gray veins with bright white background for luxury designs.', image: Statuario },
  { id: 102, category: 'italian-marble', titleAr: 'رخام كلكتا فاخر', titleEn: 'Calacatta Gold Marble', descAr: 'تميز بعروق ذهبية ورمادية تعطي لمسة دافئة وفاخرة.', descEn: 'Distinctive gold and gray veins providing a warm luxury ambiance.', image: Calacatta_Gold },
  { id: 103, category: 'italian-marble', titleAr: 'رخام كارارا أبيض', titleEn: 'Carrara White Marble', descAr: 'الكلاسيكي الإيطالي الأشهر، مثالي للمطابخ والحمامات.', descEn: 'Classic Italian marble, perfect for kitchens and bathrooms.', image: Carrara_White },
  { id: 104, category: 'italian-marble', titleAr: 'رخام بيكاسو إيطالي', titleEn: 'Picasso Marble', descAr: 'أنماط فريدة تشبه اللوحات الفنية الطبيعية.', descEn: 'Unique patterns resembling natural artistic paintings.', image: Picasso },
  { id: 105, category: 'italian-marble', titleAr: 'رخام بوتشينو كلاسيك', titleEn: 'Botticino Classic', descAr: 'لون بيج دافئ مع عروق بيضاء وخفيفة للغاية.', descEn: 'Warm beige shade with delicate light white veins.', image: botticino_classico },
  { id: 106, category: 'italian-marble', titleAr: 'رخام أرابيسكاتو', titleEn: 'Arabescato Marble', descAr: 'عروق متقاطعة داكنة خلفيتها بيضاء ناصعة.', descEn: 'Dark intersecting veins against a pure white background.', image: Arabescato_Marble },
  { id: 107, category: 'italian-marble', titleAr: 'رخام بورتورو أسود', titleEn: 'Portoro Black Marble', descAr: 'رخام إيطالي أسود ملكي بعروق ذهبية بارزة.', descEn: 'Royal black Italian marble with striking gold veining.', image: Portoro_Black },

  // Spanish Marble
  { id: 201, category: 'spanish-marble', titleAr: 'رخام إمبرادور دارك', titleEn: 'Emperador Dark', descAr: 'بني دافئ غني بعروق كريستالية بيضاء متداخلة.', descEn: 'Rich warm brown with interwoven white crystal veins.', image: dark_emperador },
  { id: 202, category: 'spanish-marble', titleAr: 'رخام إمبرادور لايت', titleEn: 'Emperador Light', descAr: 'درجة بني فاتحة تناسب المساحات الحديثة والكلاسيكية.', descEn: 'Light brown shade suited for modern and classic spaces.', image: light_emperador },
  { id: 203, category: 'spanish-marble', titleAr: 'رخام كريما مارفيل', titleEn: 'Crema Marfil', descAr: 'من أشهر أنواع الرخام الإسباني البيج الهادئ.', descEn: 'One of Spain’s most famous calm beige marbles.', image: Crema_Marfil },
  { id: 204, category: 'spanish-marble', titleAr: 'رخام روخو أليكانتي', titleEn: 'Rojo Alicante', descAr: 'رخام أحمر إسباني فاخر بعروق بيضاء خفيفة.', descEn: 'Luxury Spanish red marble with subtle white veins.', image: Rojo_Alicant },
  { id: 205, category: 'spanish-marble', titleAr: 'رخام نيرو ماركينا', titleEn: 'Nero Marquina', descAr: 'رخام أسود عميق بعروق بيضاء حادة ومميزة.', descEn: 'Deep black marble with sharp and distinctive white veins.', image: nero_marquina },
  { id: 206, category: 'spanish-marble', titleAr: 'رخام بلانكو ماكاييل', titleEn: 'Blanco Macael', descAr: 'رخام أبيض إسباني نقي وصلب للغاية.', descEn: 'Pure and durable Spanish white marble.', image: Blanco_Macael },
  { id: 207, category: 'spanish-marble', titleAr: 'رخام غريس سيربيجنتي', titleEn: 'Gris Serpiente', descAr: 'رخام رمادي إسباني بنقوش هادئة وأنيقة.', descEn: 'Spanish gray marble featuring calm, elegant patterns.', image: Gris_Serpiente },

  // Granite
  { id: 301, category: 'granite', titleAr: 'جرانيت أسود جالكسي', titleEn: 'Black Galaxy Granite', descAr: 'أسود داكن بنقاط ذهبية براقة لأسطح المطابخ.', descEn: 'Dark black with sparkling gold specks for countertops.', image: black_galaxy },
  { id: 302, category: 'granite', titleAr: 'جرانيت دبل بلاك', titleEn: 'Absolute Double Black', descAr: 'صلابة فائقة ولون أسود مطلق لمظهر مودرن.', descEn: 'High durability and absolute black tone for modern style.', image: Absolute_Double_Black },
  { id: 303, category: 'granite', titleAr: 'جرانيت أبيض كشمير', titleEn: 'Kashmir White Granite', descAr: 'خلفية رمادية/بيضاء بنقاط عنابية صغيرة.', descEn: 'Grayish white background with subtle burgundy dots.', image: Kashmir_White },
  { id: 304, category: 'granite', titleAr: 'جرانيت تان براون', titleEn: 'Tan Brown Granite', descAr: 'مزيج من البني والأسود مناسب للمساحات الخارجية والداخلية.', descEn: 'Blend of brown and black suited for indoor and outdoor spaces.', image: Tan_Brown },
  { id: 305, category: 'granite', titleAr: 'جرانيت روزا بيتا', titleEn: 'Rosa Beta Granite', descAr: 'جرانيت وردي/رمادي هادئ ومقاوم للاستخدام الشديد.', descEn: 'Calm pinkish-gray granite built for heavy traffic.', image: Rosa_Beta },
  { id: 306, category: 'granite', titleAr: 'جرانيت أوبا توبا', titleEn: 'Ubatuba Granite', descAr: 'لون أخضر داكن يقترب من الأسود مع بقع ذهبية.', descEn: 'Dark green tone close to black with gold flecks.', image: Ubatuba },
  { id: 307, category: 'granite', titleAr: 'جرانيت بالتيك براون', titleEn: 'Baltic Brown Granite', descAr: 'دوائر بنية مميزة وخلفية داكنة فائقة القوة.', descEn: 'Distinct circular brown patterns with high strength.', image: Baltic_Brown },

  // Quartz
  { id: 401, category: 'quartz', titleAr: 'كوارتز أبيض كلكتا', titleEn: 'Calacatta White Quartz', descAr: 'مظهر الرخام الطبيعي مع مقاومة تامة للبقع والخدوش.', descEn: 'Look of natural marble with complete stain resistance.', image: Calacatta_White },
  { id: 402, category: 'quartz', titleAr: 'كوارتز رمادي مودرن', titleEn: 'Modern Concrete Gray Quartz', descAr: 'تصميم عصرية يشبه الخرسانة الناعمة للمطابخ حديثة.', descEn: 'Modern smooth concrete finish designed for sleek kitchens.', image: Modern_Concrete_Gray },
  { id: 403, category: 'quartz', titleAr: 'كوارتز أسود ملكي', titleEn: 'Royal Black Quartz', descAr: 'سطح أسود صلب ونقي وسهل التنظيف تماماً.', descEn: 'Pure solid black surface that is effortless to clean.', image: Royal_Black },
  { id: 404, category: 'quartz', titleAr: 'كوارتز بيج ناعم', titleEn: 'Soft Beige Quartz', descAr: 'لون بيج دافئ يعكس الإضاءة بشكل رائع.', descEn: 'Warm beige color that reflects ambient light beautifully.', image: Soft_Beige },
  { id: 405, category: 'quartz', titleAr: 'كوارتز كوكوا براون', titleEn: 'Cocoa Brown Quartz', descAr: 'سطح بني ناعم ومقاوم للبكتيريا والسوائل.', descEn: 'Smooth brown surface resistant to bacteria and liquids.', image: Cocoa_Brown },
  { id: 406, category: 'quartz', titleAr: 'كوارتز أبيض الكريستال', titleEn: 'Crystal White Quartz', descAr: 'حبيبات كريستالية تعطي لمعاناً زجاجياً راقياً.', descEn: 'Crystal particles providing an elegant glass-like shine.', image: Crystal_White },
  { id: 407, category: 'quartz', titleAr: 'كوارتز ماربيل جولد', titleEn: 'Gold Vein Quartz', descAr: 'عروق ذهبية دقيقة وخلفية بيضاء ساحرة.', descEn: 'Subtle gold veins over a charming white surface.', image: Gold_Vein },

  // Waterjet
  { id: 501, category: 'waterjet', titleAr: 'تنسيق أرضيات ووترجيت دائرية', titleEn: 'Circular Waterjet Medallion', descAr: 'قص زغرفي وهندسي دقيق لوسط المداخل والصالات.', descEn: 'Precise decorative pattern for grand hall entrances.', image: Gold_Circular_Waterjet_MedallionVein },
  { id: 502, category: 'waterjet', titleAr: 'إطار ووترجيت للمجالس', titleEn: 'Waterjet Border Frame', descAr: 'إطارات رخامية متداخلة للأرضيات والممرات.', descEn: 'Interlocking marble borders for hallways and floors.', image: Waterjet_Border_Frame },
  { id: 503, category: 'waterjet', titleAr: 'لوحة ووترجيت جدارية', titleEn: 'Waterjet Wall Panel', descAr: 'تصميم زغرفي إسلامي أو هندسي مخصص للجدران.', descEn: 'Customized Islamic or geometric wall decoration.', image: Waterjet_Wall_Panel },
  { id: 504, category: 'waterjet', titleAr: 'سجادة رخام ووترجيت مستطيلة', titleEn: 'Rectangular Waterjet Carpet', descAr: 'تصميم يماثل السجاد الفاخر مصنوع من أفضل أنواع الرخام.', descEn: 'Luxury carpet pattern crafted entirely from marble.', image: Rectangular_Waterjet_Carpet },
  { id: 505, category: 'waterjet', titleAr: 'تصميم ووترجيت نيو كلاسيك', titleEn: 'Neo-Classic Waterjet Art', descAr: 'مزج ألوان الرخام الإسباني والإيطالي بتناغم.', descEn: 'Harmonious blend of Spanish and Italian marbles.', image: Neo_Classic_Waterjet_Art },
  { id: 507, category: 'waterjet', titleAr: 'زخرفة ووترجيت أندلسية', titleEn: 'Andalusian Waterjet Pattern', descAr: 'نقوش مستوحاة من العمارة الأندلسية العريقة.', descEn: 'Patterns inspired by traditional Andalusian architecture.', image: Andalusian_Waterjet_Pattern }
]);

// تصفية المنتجات
const filteredProducts = computed(() => {
  return products.value.filter(item => {
    const matchesCategory = selectedCategory.value === 'all' || item.category === selectedCategory.value;
    const query = searchQuery.value.trim().toLowerCase();
    const matchesSearch = !query ||
      item.titleAr.toLowerCase().includes(query) ||
      item.titleEn.toLowerCase().includes(query) ||
      item.descAr.toLowerCase().includes(query) ||
      item.descEn.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
});

// الترقيم
const currentPage = ref(1);
const itemsPerPage = 12;

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage) || 1;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }
};

watch([selectedCategory, searchQuery], () => {
  currentPage.value = 1;
});

// نافذة الصور Lightbox
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

const currentLightboxProduct = computed(() => {
  return filteredProducts.value[lightboxIndex.value] || null;
});

const openLightbox = (pageIndex) => {
  const globalIndex = (currentPage.value - 1) * itemsPerPage + pageIndex;
  lightboxIndex.value = globalIndex;
  lightboxOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = '';
};

const nextImage = () => {
  if (filteredProducts.value.length === 0) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % filteredProducts.value.length;
};

const prevImage = () => {
  if (filteredProducts.value.length === 0) return;
  lightboxIndex.value = (lightboxIndex.value - 1 + filteredProducts.value.length) % filteredProducts.value.length;
};

// Touch Gestures
let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX < touchStartX - 50) {
    currentLang.value === 'ar' ? prevImage() : nextImage();
  }
  if (touchEndX > touchStartX + 50) {
    currentLang.value === 'ar' ? nextImage() : prevImage();
  }
};

const handleKeyDown = (e) => {
  if (!lightboxOpen.value) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') currentLang.value === 'ar' ? prevImage() : nextImage();
  if (e.key === 'ArrowLeft') currentLang.value === 'ar' ? nextImage() : prevImage();
};

const getCategoryName = (catId) => {
  const found = categories.value.find(c => c.id === catId);
  if (!found) return '';
  return currentLang.value === 'ar' ? found.nameAr : found.nameEn;
};

const selectCategory = (catId) => {
  selectedCategory.value = catId;
  if (catId === 'all') {
    router.push({ path: '/products' });
  } else {
    router.push({ path: '/products', query: { cat: catId } });
  }
};

const syncCategoryFromQuery = () => {
  const catQuery = route.query.cat;
  if (catQuery && categories.value.some(c => c.id === catQuery)) {
    selectedCategory.value = catQuery;
  } else {
    selectedCategory.value = 'all';
  }
};

watch(() => route.query.cat, () => {
  syncCategoryFromQuery();
});

onMounted(() => {
  syncCategoryFromQuery();
  currentLang.value = getStoredLang();
  window.addEventListener('keydown', handleKeyDown);

  observer = new MutationObserver(() => {
    currentLang.value = getStoredLang();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  if (observer) observer.disconnect();
  document.body.style.overflow = '';
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
