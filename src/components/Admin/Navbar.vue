<template>
  <header class="h-24 bg-[#F7F4F0]/80 backdrop-blur-md border-b border-[#EAE3DA] px-6 md:px-12 flex items-center justify-between sticky top-0 z-30 transition-all duration-300 w-full">

    <div v-if="isCollapsed" class="flex items-center space-x-4 md:space-x-6 transition-all duration-300">
      <button
        @click="$emit('open-sidebar')"
        class="flex items-center justify-center w-11 h-11 rounded-xl bg-white hover:bg-[#F1EAE1] shadow-sm border border-[#E2D9CD] text-slate-700 transition-all duration-200 cursor-pointer group"
        aria-label="Open sidebar"
      >
        <span class="flex flex-col items-center justify-center gap-1 w-5">
          <span class="block w-5 h-0.5 bg-amber-800/80 rounded-full transition-all group-hover:w-6"></span>
          <span class="block w-4 h-0.5 bg-amber-800/80 rounded-full transition-all group-hover:w-5"></span>
          <span class="block w-3 h-0.5 bg-amber-800/80 rounded-full transition-all group-hover:w-4"></span>
        </span>
      </button>

      <div class="w-12 h-12 bg-white p-1.5 rounded-xl shadow-inner border border-[#E2D9CD] flex items-center justify-center overflow-hidden shrink-0">
        <img src="@/assets/images/logo.png" alt="KMW Logo" class="max-w-full max-h-full object-contain rounded-lg" />
      </div>

      <div class="leading-tight">
        <h1 class="text-base md:text-xl font-black text-slate-900 tracking-wide">
          Overview
        </h1>
        <p class="text-[10px] md:text-xs text-amber-800 font-extrabold uppercase tracking-widest mt-0.5">
          Admin Dashboard
        </p>
      </div>
    </div>

    <div v-else class="w-10"></div>

    <div class="flex items-center space-x-3 shrink-0">
      <div class="text-right hidden sm:block">
        <p class="text-sm font-black text-slate-900 tracking-wide">Fayez Alqedra</p>
        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Administrator</p>
      </div>
      <div class="w-11 h-11 bg-amber-900/90 hover:bg-amber-900 text-white font-black rounded-xl flex items-center justify-center shadow-md select-none transition-transform duration-200 hover:scale-105 cursor-pointer text-sm">
        FA
      </div>
    </div>
  </header>
</template>

<script setup>
// نمرر حالة الانكماش من الـ Layout الرئيسي
defineProps({
  isCollapsed: Boolean
})

// إرسال حدث للـ Layout لفتح السايدبار
defineEmits(['open-sidebar'])
</script>

<style scoped>
/* ناف بار نظيف بدون استدعاءات خاطئة */
</style>
