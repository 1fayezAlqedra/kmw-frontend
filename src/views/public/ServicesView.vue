<template>
  <div
    class="relative min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950 transition-all duration-300 overflow-hidden"
    :dir="currentLang === 'ar' ? 'rtl' : 'ltr'"
  >
    <!-- Background Marble Image with Soft Overlay -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        :src="bgMarble"
        alt="Marble Background"
        class="w-full h-full object-cover object-center opacity-40"
      />
      <!-- تظليل خفيف للحفاظ على تباين النصوص والقراءات -->
      <div class="absolute inset-0 bg-stone-950/80 backdrop-blur-[1px]"></div>
    </div>

    <Navbar class="relative z-10" />

    <main class="relative z-10 flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto space-y-16">

        <!-- Main Header -->
        <div class="text-center space-y-4 max-w-3xl mx-auto">
          <span class="inline-block text-amber-400 font-bold text-xs sm:text-sm tracking-widest uppercase bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
            {{ currentLang === 'ar' ? 'خدماتنا الشاملة' : 'Our Comprehensive Services' }}
          </span>
          <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
            {{ currentLang === 'ar' ? 'أعمال وإبداعات عالم الرخام والمطابخ' : 'Kitchen & Marble World Services' }}
          </h1>
          <p class="text-stone-300 text-sm sm:text-base leading-relaxed drop-shadow-sm font-medium">
            {{ currentLang === 'ar'
                ? 'نقدم أحدث حلول التصميم والتصنيع والتركيب للرخام الطبيعي والصناعي والجرانيت بأعلى معايير الجودة العالمية.'
                : 'Providing top-tier custom design, fabrication, and installation of natural marble, quartz, and granite.'
            }}
          </p>
        </div>

        <!-- 6 Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="service in mainServices"
            :key="service.id"
            class="bg-stone-900/85 backdrop-blur-md border border-stone-800/80 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all duration-500 flex flex-col justify-between group shadow-2xl relative hover:-translate-y-1"
          >
            <!-- Badge -->
            <div
              class="absolute top-4 z-10"
              :class="[currentLang === 'ar' ? 'left-4' : 'right-4']"
            >
              <span class="bg-stone-950/80 backdrop-blur-md border border-stone-700 text-amber-400 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {{ currentLang === 'ar' ? service.badgeAr : service.badgeEn }}
              </span>
            </div>

            <!-- Image Container -->
            <div class="relative h-64 overflow-hidden">
              <img
                :src="service.image"
                :alt="currentLang === 'ar' ? service.titleAr : service.titleEn"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
            </div>

            <!-- Content Area -->
            <div class="p-6 space-y-5 flex-1 flex flex-col justify-between relative z-10 bg-stone-900/90">
              <div class="space-y-3">
                <h2 class="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                  {{ currentLang === 'ar' ? service.titleAr : service.titleEn }}
                </h2>
                <p class="text-stone-300 text-sm leading-relaxed line-clamp-3">
                  {{ currentLang === 'ar' ? service.shortDescAr : service.shortDescEn }}
                </p>

                <!-- Highlights List -->
                <ul class="pt-2 space-y-1.5">
                  <li
                    v-for="(item, idx) in (currentLang === 'ar' ? service.highlightsAr : service.highlightsEn)"
                    :key="idx"
                    class="text-xs text-stone-300 flex items-center gap-2"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- Button to Detailed View -->
              <router-link
                :to="`/services/${service.id}`"
                class="w-full py-3 rounded-xl border border-stone-700 bg-stone-800/80 hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500 text-amber-400 font-bold text-sm transition-all duration-300 text-center block shadow-md group-hover:shadow-amber-500/20 active:scale-95"
              >
                {{ currentLang === 'ar' ? 'استعرض التفاصيل والأعمال (7 مشاريع)' : 'View Details & Portfolio (7 Projects)' }}
              </router-link>
            </div>
          </div>
        </div>

      </div>
    </main>

    <Footer class="relative z-10" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '@/components/User/Navbar.vue';
import Footer from '@/components/User/footer.vue';

// استيراد صورة خلفية الرخام
import bgMarble from '@/assets/puplic_wepsite/navebar/images/button_hover.jpg';

import stairs from '@/assets/puplic_wepsite/services/images/stairs.webp';
import fountains from '@/assets/puplic_wepsite/services/images/fountains.webp';
import tables from '@/assets/puplic_wepsite/services/images/tables.webp';
import villas from '@/assets/puplic_wepsite/services/images/villas.jpg';
import waterjet from '@/assets/puplic_wepsite/services/images/waterjet.jpg';
import Kitchen from '@/assets/puplic_wepsite/services/images/Kitchen.jpg';

// قراءة اللغة من LocalStorage
const getStoredLang = () => {
  return (
    localStorage.getItem('locale') ||
    localStorage.getItem('lang') ||
    document.documentElement.getAttribute('lang') ||
    'ar'
  );
};

const currentLang = ref(getStoredLang());

// مزامنة التغيير المباشر في اللغة
const syncLanguage = () => {
  currentLang.value = getStoredLang();
};

let langInterval = null;

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // الاستماع لحدث التغير في النوافذ الأخرى
  window.addEventListener('storage', syncLanguage);

  // فحص كل 300ms لضمان التحديث التلقائي اللحظي داخل نفس النافذة
  langInterval = setInterval(() => {
    const lang = getStoredLang();
    if (lang !== currentLang.value) {
      currentLang.value = lang;
    }
  }, 300);
});

onUnmounted(() => {
  window.removeEventListener('storage', syncLanguage);
  if (langInterval) clearInterval(langInterval);
});

const mainServices = ref([
  {
    id: 'kitchens',
    titleAr: 'تصميم وتنفيذ المطابخ',
    titleEn: 'Kitchen Design & Fabrication',
    shortDescAr: 'تفصيل كاونترات ومطابخ كوارتز ورخام طبيعي وجرانيت هندسي بأعلى مقاييس الجودة.',
    shortDescEn: 'Custom quartz, marble, and granite kitchen countertops tailored to perfection.',
    badgeAr: 'مطابخ',
    badgeEn: 'Kitchens',
    image: Kitchen,
    highlightsAr: ['كوارتز مقاوم للخدش والبكتيريا', 'تكسية جدران حوض المطبخ (Backsplash)', 'قص ليزري دقيق للكاونترات'],
    highlightsEn: ['Scratch & Bacteria Resistant Quartz', 'Full Backsplash Wall Cladding', 'Precision Laser Edge Cutting']
  },
  {
    id: 'villas',
    titleAr: 'تكسية وتطوير الفلل',
    titleEn: 'Villa Facades & Interiors',
    shortDescAr: 'تكسية واجهات الفلل بالرخام الطبيعي والجرانيت، والمداخل الملكية والديكورات الداخلية.',
    shortDescEn: 'Luxurious villa exterior cladding, entrance halls, and interior stonework.',
    badgeAr: 'فلل',
    badgeEn: 'Villas',
    image: villas,
    highlightsAr: ['تثبيت ميكانيكي آمن للواجهات', 'أحجار وترافرتين ورخام عالي التحمل', 'ديكورات أعمدة ومداخل ملكية'],
    highlightsEn: ['Safe Mechanical Facade Anchoring', 'High-Durability Travertine & Stone', 'Royal Column & Portal Decor']
  },
  {
    id: 'stairs',
    titleAr: 'تصنيع وتركيب الأدراج',
    titleEn: 'Staircases & Steps',
    shortDescAr: 'تنفيذ درجات الرخام الدائرية والمستقيمة مع البروفايل والدعسات المضيئة وإضاءة المخفية.',
    shortDescEn: 'Custom straight and curved marble staircases with anti-slip finishes.',
    badgeAr: 'درج',
    badgeEn: 'Stairs',
    image: stairs,
    highlightsAr: ['حفر خطوط مانعة للانزلاق', 'شامفر وبروفايل إيطالي للحواف', 'تشطيبات رخام وجرانيت فاخرة'],
    highlightsEn: ['Anti-Slip Safety Grooves', 'Italian Chamfer & Bullnose Edging', 'Luxury Marble & Granite Finish']
  },
  {
    id: 'waterjet',
    titleAr: 'قص وتشكيل الووتر جيت',
    titleEn: 'Waterjet Cut Patterns',
    shortDescAr: 'سجادات رخام هندسية وزخارف مخصصة لمدخل الصالات والميادين باستخدام قاطع الماء.',
    shortDescEn: 'Intricate marble medallions, carpets, and geometric patterns cut with waterjet.',
    badgeAr: 'ووتر جيت',
    badgeEn: 'Waterjet',
    image: waterjet,
    highlightsAr: ['قص هيدروليكي فائق الدقة', 'زخارف إسلامية ومودرن سجادات', 'دمج أنواع رخام متعددة'],
    highlightsEn: ['Ultra-Precision Hydraulic Cutting', 'Modern & Islamic Floor Medallions', 'Multi-Marble Seamless Inlays']
  },
  {
    id: 'fountains',
    titleAr: 'النوافير والشلالات الرخامية',
    titleEn: 'Marble Fountains & Waterfalls',
    shortDescAr: 'تصميم وتصنيع النوافير والشلالات الجدارية والحدائق من الرخام والحجر الطبيعي.',
    shortDescEn: 'Custom indoor and outdoor marble fountains, waterfalls, and water features.',
    badgeAr: 'نوافير',
    badgeEn: 'Fountains',
    image: fountains,
    highlightsAr: ['عزل مائي متكامل ومقاوم للرطوبة', 'إضاءات LED مقاومة للماء', 'أنظمة ضخ وتدوير مياه مدمجة'],
    highlightsEn: ['Full Moisture & Waterproof Isolation', 'Submersible Waterproof LED Lighting', 'Integrated Water Circulation Pumps']
  },
  {
    id: 'tables',
    titleAr: 'الطاولات والمغاسل الرخامية',
    titleEn: 'Marble Tables & Sinks',
    shortDescAr: 'طاولات طعام وقهوة ومغاسل رخام مفصلة خصيصاً مع إطارات الستانلس المقاوم للصدأ.',
    shortDescEn: 'Bespoke dining tables, coffee tables, and integrated marble washbasins.',
    badgeAr: 'طاولات',
    badgeEn: 'Tables',
    image: tables,
    highlightsAr: ['حفر وتشكيل المغاسل بالكامل', 'قواعد ستانلس ذهبي وأسود', 'قص حواف هيدروليكي ناعم'],
    highlightsEn: ['Fully Carved Custom Basins', 'Gold & Black Stainless Steel Frames', 'Smooth Hydraulic Edge Polish']
  }
]);
</script>
