<template>
  <div
    class="min-h-screen w-full max-w-full text-stone-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black bg-cover bg-center bg-fixed bg-no-repeat relative overflow-x-hidden"
    :style="{ backgroundImage: `url(${sectionbg})` }"
    :dir="currentLang === 'ar' ? 'rtl' : 'ltr'"
  >
    <div class="absolute inset-0 bg-stone-950/40 backdrop-blur-[1px] pointer-events-none"></div>

    <div class="relative z-10 flex flex-col flex-grow justify-between min-h-screen w-full">

      <Navbar />

      <main class="flex-grow pt-4 sm:pt-10 pb-10 sm:pb-20 px-3 sm:px-6">

        <section class="relative py-8 sm:py-16 lg:py-24 border-b border-stone-800/60 overflow-hidden">
          <div class="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
            <span
              class="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-amber-500/40 bg-amber-500/20 text-amber-400 text-[11px] sm:text-xs md:text-sm font-semibold mb-3 sm:mb-6 tracking-wider uppercase shadow-lg shadow-amber-500/10 backdrop-blur-md animate-pulse"
              :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
            >
              {{ currentLang === 'ar' ? 'مسيرة ريادة منذ 2006' : 'A Legacy of Excellence Since 2006' }}
            </span>

            <h1
              class="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-8 leading-snug sm:leading-tight break-words drop-shadow-lg px-2"
              :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
            >
              {{ currentLang === 'ar' ? 'عراقة الفخامة وإتقان فنون الرخام والمطابخ في دولة الإمارات' : 'Pioneering Marble Craftsmanship & Kitchen Artistry Across the UAE' }}
            </h1>

            <p
              class="max-w-3xl mx-auto text-stone-200 text-xs sm:text-base md:text-lg lg:text-xl font-light leading-relaxed sm:leading-loose text-center animate-fade-in-delayed px-1 drop-shadow-md"
              :class="currentLang === 'ar' ? 'font-arabic-modern' : ''"
            >
              {{ currentLang === 'ar'
                ? 'من قلب مدينة العين النابضة بالحياة، انطلقنا في عام 2006 لنرسم ملامح جديدة وفارقة في عالم الحجر الطبيعي والرخام والمطابخ الفاخرة. على مدار عقدين من الزمن، تجاوزنا إنجاز أكثر من 1,000 مشروع سكني وتجاري وقصري في مختلف إمارات الدولة، متسلحين برؤية هندسية راسخة وأعلى معايير الجودة العالمية.'
                : 'From the vibrant heart of Al Ain, we embarked on our journey in 2006 to redefine the standards of natural stone, marble, and luxury kitchens. Over nearly two decades, we have successfully delivered over 1,000 residential, commercial, and royal projects across all Emirates of the UAE, driven by unwavering engineering precision and uncompromising global quality.'
              }}
            </p>
          </div>
        </section>

        <section class="max-w-5xl mx-auto py-8 sm:py-14 lg:py-20">
          <div class="space-y-6 sm:space-y-12">

            <div
              class="group relative bg-stone-900/60 backdrop-blur-md p-5 sm:p-8 lg:p-12 rounded-xl sm:rounded-3xl border border-stone-700/60 shadow-2xl overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/50 animate-fade-in-up"
              :style="{ backgroundImage: `url(${oldCardBg})` }"
            >
              <div class="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none"></div>
              <div class="absolute inset-0 bg-stone-950/50 pointer-events-none"></div>

              <div class="relative z-10">
                <h2
                  class="text-lg sm:text-2xl md:text-3xl font-extrabold text-white mb-3 sm:mb-6 flex items-center gap-2 sm:gap-3 drop-shadow-md"
                  :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
                >
                  <span class="w-2 sm:w-3 h-5 sm:h-8 bg-amber-500 rounded-full inline-block flex-shrink-0 transition-all duration-300 group-hover:scale-y-110"></span>
                  <span>{{ currentLang === 'ar' ? 'جذورنا في العين.. وامتدادنا يغطي كافة أرجاء الدولة' : 'Our Roots in Al Ain, Reaching Across the Entire UAE' }}</span>
                </h2>

                <div
                  class="space-y-3 sm:space-y-4 text-stone-200 text-xs sm:text-base md:text-lg leading-relaxed font-light drop-shadow-sm"
                  :class="currentLang === 'ar' ? 'font-arabic-modern' : ''"
                >
                  <p>
                    {{ currentLang === 'ar'
                      ? 'تأسست شركتنا في مدينة العين لتكون نقطة انطلاق نحو آفاق أوسع في قطاع المقاولات والديكور وتوريد الرخام. لم تكن رحلتنا مجرد تقديم خدمات تقليدية، بل كانت سعياً مستمراً نحو الابتكار وتقديم تحف معمارية تليق بأرقى الأذواق في الدولة.'
                      : 'Founded in the garden city of Al Ain, our company set out to be a benchmark in contracting, interior design, and premium marble supply. Our journey was never just about routine services; it was a continuous pursuit of innovation, delivering architectural masterpieces tailored to the elite tastes across the nation.'
                    }}
                  </p>
                  <p>
                    {{ currentLang === 'ar'
                      ? 'بفضل ثقة عملائنا المتنامية، توسع نطاق عملنا ليغطي جميع إمارات الدولة (أبوظبي، دبي، الشارقة، عجمان، رأس الخيمة، أم القيوين، والفجيرة). لقد نفذنا مشاريع كبرى ومتنوعة تشمل الفلل الفاخرة، القصور الملكية، والمجمعات السكنية والتجارية، مما جعلنا الاسم الأول الموثوق لدى المهندسين المعماريين والملاك على حد سواء.'
                      : 'Thanks to the growing trust of our clients, our footprint expanded to cover all Emirates of the UAE (Abu Dhabi, Dubai, Sharjah, Ajman, Ras Al Khaimah, Umm Al Quwain, and Fujairah). We have successfully executed diverse large-scale projects including luxury villas, royal palaces, and residential complexes, cementing our status as the most trusted name among architects and property owners alike.'
                    }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="group relative grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 items-center bg-stone-900/60 backdrop-blur-md p-5 sm:p-8 lg:p-12 rounded-xl sm:rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/60 animate-fade-in-up"
              :style="{ backgroundImage: `url(${oldCardBg})` }"
            >
              <div class="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none"></div>
              <div class="absolute inset-0 bg-stone-950/50 pointer-events-none"></div>

              <div class="md:col-span-1 relative z-10 border-b md:border-b-0 border-stone-700/60 pb-3 md:pb-0" :class="currentLang === 'ar' ? 'text-center md:text-right' : 'text-center md:text-left'">
                <span class="block text-3xl sm:text-5xl md:text-6xl font-black text-amber-400 font-serif mb-1 transition-transform duration-300 group-hover:scale-105 drop-shadow-md">+1,000</span>
                <span
                  class="text-stone-200 text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider"
                  :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
                >
                  {{ currentLang === 'ar' ? 'مشروع ناجح ومميز' : 'Successful Projects' }}
                </span>
              </div>

              <div
                class="md:col-span-2 text-stone-200 text-xs sm:text-base md:text-lg leading-relaxed font-light relative z-10 drop-shadow-sm"
                :class="currentLang === 'ar' ? 'font-arabic-modern' : ''"
              >
                <p>
                  {{ currentLang === 'ar'
                    ? 'الوصول إلى إنجاز أكثر من ألف مشروع منذ انطلاقتنا في 2006 لم يأتِ من فراغ؛ بل هو ثمرة التزام صارم بجودة المواد الخام، ودقة متناهية في التصنيع عبر تقنيات الوترجيت والقص الحديثة، وفريق عمل احترافي يضم نخبة من المهندسين والحرفيين.'
                    : 'Surpassing the milestone of over 1,000 completed projects since our inception in 2006 is no coincidence. It is the result of a strict commitment to premium raw materials, meticulous manufacturing utilizing advanced waterjet and cutting technologies, and a professional team of elite engineers and craftsmen.'
                  }}
                </p>
              </div>
            </div>

            <div
              class="group relative bg-stone-900/60 backdrop-blur-md p-5 sm:p-8 lg:p-12 rounded-xl sm:rounded-3xl border border-stone-700/60 shadow-2xl overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/50 animate-fade-in-up"
              :style="{ backgroundImage: `url(${oldCardBg})` }"
            >
              <div class="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none"></div>
              <div class="absolute inset-0 bg-stone-950/50 pointer-events-none"></div>

              <div class="relative z-10">
                <h2
                  class="text-lg sm:text-2xl md:text-3xl font-extrabold text-white mb-3 sm:mb-6 flex items-center gap-2 sm:gap-3 drop-shadow-md"
                  :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
                >
                  <span class="w-2 sm:w-3 h-5 sm:h-8 bg-amber-500 rounded-full inline-block flex-shrink-0 transition-all duration-300 group-hover:scale-y-110"></span>
                  <span>{{ currentLang === 'ar' ? 'فلسفتنا والتزامنا نحو التميز' : 'Our Philosophy & Commitment to Excellence' }}</span>
                </h2>

                <div
                  class="space-y-3 sm:space-y-4 text-stone-200 text-xs sm:text-base md:text-lg leading-relaxed font-light drop-shadow-sm"
                  :class="currentLang === 'ar' ? 'font-arabic-modern' : ''"
                >
                  <p>
                    {{ currentLang === 'ar'
                      ? 'نؤمن في شركتنا بأن الرخام والأحجار الطبيعية ليست مجرد مواد بناء، بل هي أعمال فنية تنطق بالجمال والفخامة وتعيش طويلاً لتروي قصة المكان. من هذا المنطلق، نحرص على استيراد أفخم أنواع الرخام والجرانيت العالمي من مصادرها الأصلية، ونوظف أحدث أساليب التصميم والتنفيذ لضمان مطابقة كل تفصيل لتطلعات عملائنا بدقة مطلقة.'
                      : 'We believe that marble and natural stones are not merely construction materials, but works of art that speak of elegance and luxury, enduring for generations to tell the story of a space. Consequently, we source the finest international marble and granite directly from quarries worldwide, employing state-of-the-art design and execution techniques to ensure every detail matches our clients\' exact aspirations.'
                    }}
                  </p>
                  <p>
                    {{ currentLang === 'ar'
                      ? 'نحن هنا لنستمر في مسيرة البناء والتطوير، واضعين نصب أعيننا دائماً ترسيخ معايير جديدة ومتقدمة في صناعة المطابخ الفاخرة وتلبيسات الواجهات والدرج والأرضيات على مستوى دولة الإمارات العربية المتحدة وخارجها.'
                      : 'We remain dedicated to our journey of construction and development, continuously setting new, advanced standards in the luxury kitchen industry, facade cladding, staircases, and flooring across the UAE and beyond.'
                    }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="relative overflow-hidden bg-cover bg-center bg-no-repeat p-3 sm:p-6 lg:p-8 rounded-xl sm:rounded-3xl border border-stone-700/60"
              :style="{ backgroundImage: `url(${oldCardBg})` }"
            >
              <div class="absolute inset-0 bg-stone-950/50 pointer-events-none rounded-xl sm:rounded-3xl"></div>

              <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 relative z-10">
                <div class="group relative p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-2xl bg-stone-900/70 backdrop-blur-md border border-stone-700/80 text-center shadow-xl flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60">
                  <span class="block text-2xl sm:text-4xl lg:text-5xl font-black text-amber-400 font-serif mb-1 transition-transform duration-300 group-hover:scale-105 drop-shadow-md">2006</span>
                  <span class="text-[11px] sm:text-xs md:text-sm text-stone-200 font-medium leading-tight" :class="currentLang === 'ar' ? 'font-arabic-modern' : ''">
                    {{ currentLang === 'ar' ? 'سنة الانطلاق والتأسيس' : 'Establishment Year' }}
                  </span>
                </div>

                <div class="group relative p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-2xl bg-stone-900/70 backdrop-blur-md border border-stone-700/80 text-center shadow-xl flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60">
                  <span class="block text-2xl sm:text-4xl lg:text-5xl font-black text-amber-400 font-serif mb-1 transition-transform duration-300 group-hover:scale-105 drop-shadow-md">+1,000</span>
                  <span class="text-[11px] sm:text-xs md:text-sm text-stone-200 font-medium leading-tight" :class="currentLang === 'ar' ? 'font-arabic-modern' : ''">
                    {{ currentLang === 'ar' ? 'مشروع منجز بالدولة' : 'Completed Projects' }}
                  </span>
                </div>

                <div class="group relative p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-2xl bg-stone-900/70 backdrop-blur-md border border-stone-700/80 text-center shadow-xl flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60">
                  <span class="block text-2xl sm:text-4xl lg:text-5xl font-black text-amber-400 font-serif mb-1 transition-transform duration-300 group-hover:scale-105 drop-shadow-md">7</span>
                  <span class="text-[11px] sm:text-xs md:text-sm text-stone-200 font-medium leading-tight" :class="currentLang === 'ar' ? 'font-arabic-modern' : ''">
                    {{ currentLang === 'ar' ? 'إمارات نغطيها بالكامل' : 'Emirates Covered' }}
                  </span>
                </div>

                <div class="group relative p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-2xl bg-stone-900/70 backdrop-blur-md border border-stone-700/80 text-center shadow-xl flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60">
                  <span class="block text-2xl sm:text-4xl lg:text-5xl font-black text-amber-400 font-serif mb-1 transition-transform duration-300 group-hover:scale-105 drop-shadow-md">100%</span>
                  <span class="text-[11px] sm:text-xs md:text-sm text-stone-200 font-medium leading-tight" :class="currentLang === 'ar' ? 'font-arabic-modern' : ''">
                    {{ currentLang === 'ar' ? 'التزام وجودة مطلقة' : 'Absolute Commitment' }}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '../../components/User/Navbar.vue';
import Footer from '../../components/User/footer.vue';

// استيراد صورة الخلفية الموحدة للموقع
import sectionbg from '@/assets/puplic_wepsite/navebar/images/button_hover.jpg';

// استيراد الصورة القديمة لاستخدامها كخلفية للكروت
import oldCardBg from '@/assets/puplic_wepsite/navebar/images/navbarnackground.png';

// دالة جلب اللغة المخزنة الموحدة عبر التطبيق
const getStoredLang = () => {
  return localStorage.getItem('locale') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ar';
};

const currentLang = ref(getStoredLang());
let observer = null;

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
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Tajawal:wght@400;500;700;800;900&display=swap');

.font-arabic-modern {
  font-family: 'Tajawal', sans-serif !important;
}

.font-royal-en {
  font-family: 'Cinzel', serif !important;
  letter-spacing: 0.5px;
}

/* Custom Smooth Keyframe Animations */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in-delayed {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
  opacity: 0;
}
</style>
