<template>
  <div class="min-h-screen bg-stone-950 flex flex-col">
    <!-- النافبار يأخذ مكانه المستقل أولاً -->
    <Navbar />

    <!-- الهيرو يأخذ باقي المساحة تحته مباشرة -->
    <main class="flex-1 w-full">
      <Hero />
      <AboutUs />
      <Services />
      <CustomerCareSection />
      <thefooter />
    </main>
  </div>
</template>

<script setup>
import Navbar from '@/components/User/Navbar.vue';
import Hero from '@/components/User/Hero.vue';
import AboutUs from '@/components/User/AboutUs.vue';
import Services from '@/components/User/Services.vue';
import CustomerCareSection from '@/components/User/CustomerCareSection.vue';
import thefooter from '@/components/User/footer.vue';
</script>
