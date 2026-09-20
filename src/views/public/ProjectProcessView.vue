<template>
  <div
    class="min-h-screen w-full text-stone-100 flex flex-col justify-between bg-cover bg-center bg-fixed bg-no-repeat relative overflow-x-hidden"
    :style="{ backgroundImage: `url(${sectionbg})` }"
    :dir="currentLang === 'ar' ? 'rtl' : 'ltr'"
  >
    <!-- طبقة التعتيم مع التأثير الضبابي Background Overlay -->
    <div class="absolute inset-0 bg-stone-950/75 backdrop-blur-[2px] pointer-events-none"></div>

    <div class="relative z-10 flex flex-col flex-grow justify-between min-h-screen w-full">
      <!-- Navbar -->
      <Navbar />

      <!-- Main Content Area -->
      <main class="flex-grow py-12 px-4 sm:px-8 lg:px-16 flex items-center justify-center">

        <div
          class="w-full max-w-5xl relative bg-stone-950/80 backdrop-blur-2xl
                 p-7 sm:p-12 lg:p-16 rounded-[2.5rem]
                 border border-stone-800/80
                 shadow-[0_25px_60px_rgba(0,0,0,0.9)]
                 overflow-hidden bg-cover bg-center bg-no-repeat"
          :style="{ backgroundImage: `url(${cardBg})` }"
        >
          <!-- طبقات الإضاءة والتعتيم الداخلية -->
          <div class="absolute inset-0 bg-stone-950/85 pointer-events-none"></div>
          <div class="absolute -top-32 -left-32 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-32 -right-32 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10">

            <!-- الهيدر والعنوان الرئيسي -->
            <div class="max-w-2xl mb-14 sm:mb-20">
              <span class="inline-flex items-center px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-inner">
                {{ currentLang === 'ar' ? 'منهجية العمل' : 'OUR WORKFLOW' }}
              </span>
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                {{ currentLang === 'ar' ? 'دورة تنفيذ المشاريـع' : 'Procedure' }}
              </h1>
              <p class="text-stone-300 text-sm sm:text-base leading-relaxed">
                {{ currentLang === 'ar'
                  ? 'رحلة متكاملة ومتقنة نخوضها معاً خطوة بخطوة من الفكرة الأولى وحتى التسليم النهائي.'
                  : 'A seamless step-by-step journey from initial concept to final flawless delivery.'
                }}
              </p>
            </div>

            <!-- قائمة الخطوات المتسلسلة المترابطة (تصميم ورا بعضه) -->
            <div class="relative space-y-16 sm:space-y-24">
              <!-- الخط العمودي الذهبي الممتد بمنتصف الخطوات -->
              <div
                class="absolute top-4 bottom-4 w-0.5 bg-gradient-to-b from-amber-500/80 via-amber-500/20 to-transparent hidden lg:block"
                :class="[currentLang === 'ar' ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2']"
              ></div>

              <!-- عنصر الخطوة Single Step Item -->
              <div
                v-for="(step, index) in steps"
                :key="index"
                :ref="(el) => { if (el) stepRefs[index] = el }"
                class="step-item opacity-0 translate-y-12 transition-all duration-1000 ease-out flex flex-col lg:flex-row items-center gap-8 sm:gap-12 relative"
                :class="[index % 2 === 1 ? 'lg:flex-row-reverse' : '']"
              >
                <!-- دائرية رقم الخطوة المضيئة في المنتصف -->
                <div
                  class="hidden lg:flex absolute top-0 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-950 border-2 border-amber-500 text-amber-400 font-black text-sm items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] z-20"
                  :class="[currentLang === 'ar' ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2']"
                >
                  0{{ index + 1 }}
                </div>

                <!-- قسم التفاصيل والنصوص -->
                <div class="w-full lg:w-1/2 space-y-4">
                  <div class="flex items-center gap-3">
                    <!-- رقم الخطوة في الشاشات الصغيرة -->
                    <span class="lg:hidden w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black text-sm flex items-center justify-center shrink-0 shadow-inner">
                      0{{ index + 1 }}
                    </span>
                    <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">
                      {{ currentLang === 'ar' ? `المرحلة 0${index + 1}` : `Phase 0${index + 1}` }}
                    </span>
                  </div>

                  <h2 class="text-2xl sm:text-3xl font-black text-white leading-snug">
                    {{ currentLang === 'ar' ? step.titleAr : step.titleEn }}
                  </h2>

                  <p class="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                    {{ currentLang === 'ar' ? step.descAr : step.descEn }}
                  </p>

                  <!-- النقاط الفرعية -->
                  <div class="pt-3 border-t border-stone-800/60 space-y-2">
                    <div
                      v-for="(point, pIndex) in (currentLang === 'ar' ? step.pointsAr : step.pointsEn)"
                      :key="pIndex"
                      class="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300"
                    >
                      <svg class="w-4 h-4 text-amber-400 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{{ point }}</span>
                    </div>
                  </div>
                </div>

                <!-- قسم الصورة المرفقة لكل مرحلة -->
                <div class="w-full lg:w-1/2 group">
                  <div class="relative min-h-[220px] sm:min-h-[280px] rounded-2xl overflow-hidden border border-stone-800/80 shadow-2xl transition-all duration-500 hover:border-amber-500/40">
                    <img
                      :src="step.image"
                      :alt="currentLang === 'ar' ? step.titleAr : step.titleEn"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- قسم الدعوة للتواصل CTA مع أنيميشن عند الوصول إليه -->
            <div
              ref="ctaRef"
              class="opacity-0 translate-y-12 transition-all duration-1000 ease-out mt-20 sm:mt-28 pt-12 border-t border-stone-800/80 text-center relative"
            >
              <h2 class="text-2xl sm:text-3xl font-black text-white mb-3">
                {{ currentLang === 'ar' ? 'جاهز لبدء مشروعك معنا؟' : 'Ready to Start Your Project?' }}
              </h2>
              <p class="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
                {{ currentLang === 'ar'
                  ? 'تواصل معنا اليوم لحجز موعد معاينة مجانية لرفع المقاسات واختيار أرقى خامات الرخام والجرانيت لمشروعك.'
                  : 'Contact us today to schedule a free measurement visit and select the finest marble and granite materials.'
                }}
              </p>
              <router-link
                to="/contact"
                class="inline-block py-4 px-9 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm sm:text-base tracking-widest uppercase transition-all duration-300 shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-[0.99]"
              >
                {{ currentLang === 'ar' ? 'تواصل معنا الآن' : 'CONTACT US NOW' }}
              </router-link>
            </div>

          </div>
        </div>
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

import Navbar from '../../components/User/Navbar.vue';
import Footer from '../../components/User/footer.vue';
import sectionbg from '@/assets/puplic_wepsite/navebar/images/button_hover.jpg';
import cardBg from '@/assets/puplic_wepsite/navebar/images/navbarnackground.png';

// قراءة اللغة لضمان التزامن المباشر
const getStoredLang = () => {
  return localStorage.getItem('locale') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ar';
};

const currentLang = ref(getStoredLang());
let observer = null;
let scrollObserver = null;

// المراجع الخاصة بالأنيميشن عند السكرول
const stepRefs = ref([]);
const ctaRef = ref(null);

// بيانات المراحل
const steps = [
  {
    titleAr: 'الاستماع لطلبات العميل والاستشارة',
    titleEn: 'Consultation & Requirements Gathering',
    descAr: 'نعقد جلسة اجتماع مع العميل لمناقشة أفكاره ومتطلبات المطبخ أو المشروع، وعرض العينات والكتالوجات لاختيار أنواع الرخام والجرانيت المناسبة.',
    descEn: 'We hold a consultation meeting with the client to understand their vision, budget, and showcase marble and granite physical samples.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop',
    pointsAr: [
      'فهم الاحتياجات ورغبات التنسيق',
      'استعراض عينات الرخام والجرانيت والكوارتز',
      'تقديم نصائح هندسية وتقدير مبدئي للتكلفة'
    ],
    pointsEn: [
      'Understanding custom client requirements',
      'Reviewing physical marble & granite samples',
      'Providing preliminary cost estimation'
    ]
  },
  {
    titleAr: 'إرسال الفنيين للمعاينة ورفع المقاسات',
    titleEn: 'Site Inspection & Laser Measurements',
    descAr: 'ينتقل فريق الفنيين المهندسين إلى موقع المشروع لإجراء فحص شامل للمكان ورفع المقاسات بدقة متناهية باستخدام أحدث أجهزة الليزر.',
    descEn: 'Our technical team visits the project site with precision laser measurement tools to evaluate wall angles and exact dimensions.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop',
    pointsAr: [
      'رفع المقاسات الدقيقة بأجهزة الليزر',
      'فحص استواء الجدران ومواضع السباكة والكهرباء',
      'تسجيل كل التفاصيل الفنية الخاصة بالموقع'
    ],
    pointsEn: [
      'Laser-precise site measurements',
      'Evaluating plumbing and electrical placement',
      'Documenting site-specific technical details'
    ]
  },
  {
    titleAr: 'التصميم الهندسي وعرض ثلاثي الأبعاد (3D)',
    titleEn: '3D Visualization & Shop Drawings',
    descAr: 'يقوم مهندسو التصميم بتحويل المقاسات إلى مخططات 3D تفاعلية تُظهر الشكل النهائي للمطبخ أو الرخام مع توزيع العروق (Bookmatching).',
    descEn: 'Our designers prepare detailed 3D renders and shop drawings illustrating vein alignment and full layouts before fabrication.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop',
    pointsAr: [
      'إعداد تصميم ثلاثي الأبعاد محاكي للواقع',
      'توزيع عروق الرخام بشكل متناسق جمالياً',
      'اعتماد المخططات التنفيذية والنهائية'
    ],
    pointsEn: [
      'Photorealistic 3D rendering',
      'Seamless vein matching planning',
      'Final shop drawing approval'
    ]
  },
  {
    titleAr: 'التصنيع والقص بتقنية الووترجيت (Waterjet)',
    titleEn: 'Precision Fabrication & Waterjet Cutting',
    descAr: 'في مصانعنا، يتم تقطيع ألواح الرخام وتشكيل الزوايا وحفر الفتحات باستخدام ماكينات الووترجيت والتصنيع الآلي المتقدم لضمان دقة 100%.',
    descEn: 'At our facility, marble slabs are accurately cut, edged, and shaped using advanced CNC and Waterjet technology.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop',
    pointsAr: [
      'قص هيدروليكي مائي فائق الدقة',
      'تنعيم وتشكيل الحواف والتجاويف',
      'فحص جودة كل قطعة قبل الخروج من المصنع'
    ],
    pointsEn: [
      'High-precision Waterjet cutting',
      'Custom edge profiling and cutouts',
      'Strict quality control inspection'
    ]
  },
  {
    titleAr: 'النقل الاحترافي والتركيب بالموقع',
    titleEn: 'Safe Transport & On-Site Installation',
    descAr: 'يتم تغليف الرخام ونقله بسيارات مجهزة لمنع التكسر، ثم يقوم فريق التركيب المتخصص بتثبيته وتجميع الفواصل بمواد عالية الجودة.',
    descEn: 'The components are safely transported and installed by skilled craftsmen using specialized adhesives to achieve seamless joints.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1000&auto=format&fit=crop',
    pointsAr: [
      'نقل آمن بحوامل خاصة بالرخام',
      'تركيب محترف مع إخفاء الفواصل والتسوية',
      'التأكد من متانة واستواء جميع الأسطح'
    ],
    pointsEn: [
      'Safe transport with marble frames',
      'Expert installation and joint blending',
      'Ensuring overall surface levelling'
    ]
  },
  {
    titleAr: 'الجلي والتلميع والتسليم النهائي',
    titleEn: 'Polishing, Sealing & Final Handover',
    descAr: 'المرحلة الأخيرة تشمل جلي الرخام وتلميعه وإضافة طبقة حماية وعزل (Sealer) مقاومة للبقع والرطوبة، ثم تسليم المشروع للعميل.',
    descEn: 'The final phase includes crystallization polishing and protective sealing against stains, followed by a final project handover.',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop',
    pointsAr: [
      'جلي وتلميع كريستالي بالماس',
      'تطبيق طبقة حماية عازلة ضد السوائل والبقع',
      'تسليم المطبخ/المشروع مع الضمان ونظام العناية'
    ],
    pointsEn: [
      'Diamond crystallization polishing',
      'Protective sealant application',
      'Final project inspection & warranty handover'
    ]
  }
];

// إعداد أنيميشن التمرير ظهور العناصر IntersectionObserver
const initScrollAnimation = () => {
  const options = {
    root: null,
    threshold: 0.15
  };

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-12');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        scrollObserver.unobserve(entry.target); // إيقاف المراقبة بعد الظهور
      }
    });
  }, options);

  stepRefs.value.forEach((el) => {
    if (el) scrollObserver.observe(el);
  });

  if (ctaRef.value) {
    scrollObserver.observe(ctaRef.value);
  }
};

onMounted(() => {
  currentLang.value = getStoredLang();

  // مراقبة تغيير اللغة
  observer = new MutationObserver(() => {
    const lang = getStoredLang();
    if (lang !== currentLang.value) {
      currentLang.value = lang;
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

  window.addEventListener('storage', () => {
    currentLang.value = getStoredLang();
  });

  // تشغيل أنيميشن التمرير بعد تجهيز عناصر الـ DOM
  nextTick(() => {
    initScrollAnimation();
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  if (scrollObserver) scrollObserver.disconnect();
  window.removeEventListener('storage', () => {});
});
</script>

<style scoped>
/* إضافة تحسينات الانتقال والإنيميشن */
.step-item {
  will-change: transform, opacity;
}
</style>
