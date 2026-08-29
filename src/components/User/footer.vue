<template>
  <!-- LUXURY FOOTER SECTION -->
  <footer
    id="footer"
    class="relative w-full bg-stone-950 bg-cover bg-center bg-fixed text-white overflow-hidden border-t border-stone-800 select-none"
    :style="{ backgroundImage: `url(${footerBgImage})` }"
  >
    <!-- Dark Marble Overlay: طبقة مظلمة موحدة لضمان وضوح النصوص البيضاء فوق الرخام الأبيض -->
    <div class="absolute inset-0 bg-stone-950/92 backdrop-blur-[2px]"></div>

    <!-- Main Container -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 flex flex-col justify-between">

      <!-- TOP SECTION: GRID INFO & MAP -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-stone-800/80"
        :class="currentLang === 'ar' ? 'text-right md:text-right' : 'text-left md:text-left'"
      >

        <!-- BRAND & BRIEF -->
        <div class="flex flex-col items-center md:items-start justify-start">
          <h3
            class="text-xl sm:text-2xl font-black text-amber-400 tracking-wider mb-3"
            :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
          >
            {{ currentLang === 'ar' ? 'عالم المطابخ والرخام' : 'Kitchen & Marble World' }}
          </h3>
          <p class="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xs font-light">
            {{ currentLang === 'ar'
              ? 'فن وفخامة التصميم في عالم الرخام والجرانيت الطبيعي لأرقى المشاريع والواجهات.'
              : 'Luxury and art of design in natural marble & granite for prestigious projects.'
            }}
          </p>
        </div>

        <!-- CONTACT INFORMATION -->
        <div class="flex flex-col items-center md:items-start space-y-3">
          <span
            class="text-xs sm:text-sm font-bold text-amber-400 tracking-wider uppercase mb-1 block"
            :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
          >
            {{ currentLang === 'ar' ? 'معلومات التواصل' : 'CONTACT INFO' }}
          </span>

          <!-- Location Text -->
          <div
            class="flex items-center gap-2.5 text-xs sm:text-sm text-stone-300 hover:text-white transition-colors"
            :class="currentLang === 'ar' ? 'flex-row-reverse' : 'flex-row'"
          >
            <svg class="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ currentLang === 'ar' ? 'العين، أبوظبي - الإمارات العربية المتحدة' : 'Al Ain, Abu Dhabi - UAE' }}</span>
          </div>

          <!-- Whatsapp -->
          <a
            href="https://wa.me/971506231886"
            target="_blank"
            class="flex items-center gap-2.5 text-xs sm:text-sm text-stone-300 hover:text-white transition-colors"
            :class="currentLang === 'ar' ? 'flex-row-reverse' : 'flex-row'"
          >
            <svg class="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 015.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span dir="ltr">+971 50 623 1886</span>
          </a>

          <!-- Email -->
          <a
            href="mailto:hesham@kmw.ae"
            class="flex items-center gap-2.5 text-xs sm:text-sm text-stone-300 hover:text-white transition-colors"
            :class="currentLang === 'ar' ? 'flex-row-reverse' : 'flex-row'"
          >
            <svg class="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>hesham@kmw.ae</span>
          </a>

          <!-- CTA Button -->
          <div class="pt-2 w-full flex justify-center md:justify-start">
            <a
              href="#contact"
              class="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-amber-500/40 bg-stone-900/90 hover:bg-amber-500 text-amber-400 hover:text-stone-950 font-bold text-xs tracking-wider uppercase shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group/btn w-full max-w-[180px]"
            >
              <span
                class="relative z-10 font-black flex items-center justify-center gap-2"
                :class="currentLang === 'ar' ? 'font-arabic-modern flex-row-reverse' : 'font-royal-en flex-row'"
              >
                {{ currentLang === 'ar' ? 'صفحة التواصل' : 'Contact Us' }}
                <svg
                  class="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                  :class="currentLang === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : ''"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        <!-- SOCIAL MEDIA SECTION -->
        <div class="flex flex-col items-center md:items-start space-y-3">
          <span
            class="text-xs sm:text-sm font-bold text-amber-400 tracking-wider uppercase mb-1 block"
            :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
          >
            {{ currentLang === 'ar' ? 'تابعنا على' : 'FOLLOW US' }}
          </span>

          <div class="flex items-center gap-3">
            <!-- Instagram -->
            <a
              href="https://www.instagram.com/worldmarble.ae/"
              target="_blank"
              aria-label="Instagram"
              class="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <!-- WhatsApp -->
            <a
              href="https://wa.me/971506231886"
              target="_blank"
              aria-label="WhatsApp"
              class="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>

            <!-- Gmail -->
            <a
              href="mailto:hesham@kmw.ae"
              aria-label="Gmail"
              class="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- EXACT LOCATION MAP IFRAME -->
        <div class="flex flex-col items-center md:items-start space-y-3 w-full">
          <span
            class="text-xs sm:text-sm font-bold text-amber-400 tracking-wider uppercase mb-1 block"
            :class="currentLang === 'ar' ? 'font-arabic-modern' : 'font-royal-en'"
          >
            {{ currentLang === 'ar' ? 'موقعنا في العين' : 'OUR LOCATION' }}
          </span>

          <div class="w-full h-36 rounded-xl overflow-hidden border border-stone-800 shadow-xl bg-stone-900">
            <iframe
              src="https://maps.google.com/maps?q=24.1898876,55.7622201&z=15&output=embed"
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>

      <!-- BOTTOM SECTION: COPYRIGHT -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 font-light gap-3">
        <p>© {{ new Date().getFullYear() }} {{ currentLang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.' }}</p>
        <p class="text-stone-300 font-mono text-[11px] sm:text-xs tracking-wider">
          kmw 2026 by fayez alqedra
        </p>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// صورة الرخام الفاخرة
import footerBgImage from '@/assets/puplic_wepsite/aboutUs/images/white_marble.jpg';

// دالة موحدة لجلب اللغة المخزنة أو الحالية بدقة تامة مثل باقي الأقسام
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
</style>
