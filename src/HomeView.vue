<template>
  <div class="relative">
    <Navbar />
    <Hero />
    <AboutUs />
    <Services />
    <CustomerCareSection />

    <!-- استخدام الاسم المعدل للمكون -->
    <ProductsSection />

    <FooterSection />

    <!-- Scroll To Top Button -->
    <transition name="fade">
      <button v-show="showScrollBtn" @click="scrollToTop" aria-label="Scroll to top"
        class="fixed bottom-6 left-6 z-50 p-3.5 rounded-full bg-stone-900/90 text-amber-400 border border-amber-500/30 shadow-2xl backdrop-blur-md hover:bg-amber-500 hover:text-stone-950 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group">
        <svg class="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" fill="none"
          stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '@/components/User/Navbar.vue';
import Hero from '@/components/User/Hero.vue';
import AboutUs from '@/components/User/AboutUs.vue';
import FooterSection from '@/components/User/footer.vue';
import Services from '@/components/User/Services.vue';
import CustomerCareSection from '@/components/User/CustomerCareSection.vue';

// استيراد المكون باسم مستعار لتفادي أي تعارض
import ProductsSection from '@/components/User/Products.vue';

const showScrollBtn = ref(false);

const handleScroll = () => {
  showScrollBtn.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
