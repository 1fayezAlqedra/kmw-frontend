<template>
  <aside
    :class="[
      'fixed top-0 bottom-0 left-0 z-50 w-full max-w-xs bg-[#F7F4F0] text-slate-800 border-r border-[#EAE3DA] shadow-2xl flex flex-col justify-between transition-all duration-300 ease-in-out',
      isCollapsed ? 'opacity-0 pointer-events-none -translate-x-full' : 'opacity-100 pointer-events-auto translate-x-0'
    ]"
    dir="ltr"
  >
    <div class="h-40 px-6 flex flex-col justify-center items-center border-b border-[#EAE3DA] bg-[#F1EAE1]/50 backdrop-blur-[2px] relative pt-4 shrink-0">

      <button
        @click="toggleCollapse"
        class="absolute top-4 right-4 w-8 h-8 bg-white/70 hover:bg-white text-slate-500 hover:text-slate-900 rounded-xl flex items-center justify-center cursor-pointer border border-[#E2D9CD] transition-all shadow-xs text-sm"
      >
        <span>✕</span>
      </button>

      <div class="w-14 h-14 bg-white p-2 rounded-xl shadow-inner border border-[#E2D9CD] flex items-center justify-center overflow-hidden mb-2">
        <img src="@/assets/images/logo.png" alt="KMW" class="max-w-full max-h-full object-contain rounded-lg" />
      </div>

      <div class="text-center">
        <h2 class="text-base md:text-lg font-black text-slate-900 tracking-wider uppercase">KMW Platform</h2>
        <p class="text-[10px] text-amber-800 font-extrabold tracking-widest uppercase mt-0.5">Admin Dashboard</p>
      </div>
    </div>

    <nav class="p-6 space-y-3 flex-1 overflow-y-auto no-scrollbar">

      <a href="#" class="nav-item flex items-center justify-center px-6 py-4 text-slate-700 hover:text-slate-900 font-bold rounded-2xl transition-all relative overflow-hidden group text-lg tracking-wide text-center">
        <span class="z-10 transition-transform duration-300 group-hover:scale-105">Overview</span>
      </a>

      <div class="space-y-1">
        <button @click="toggleDropdown('products')" class="nav-item w-full flex items-center justify-center px-6 py-4 text-slate-700 hover:text-slate-900 font-bold rounded-2xl transition-all relative overflow-hidden group cursor-pointer text-lg tracking-wide text-center">
          <span class="z-10 transition-transform duration-300 group-hover:scale-105">Products</span>
        </button>
        <div :class="['grid transition-all duration-400 ease-in-out overflow-hidden px-4', dropdowns.products ? 'grid-rows-[1fr] opacity-100 mt-2 mb-2' : 'grid-rows-[0fr] opacity-0']">
          <div class="overflow-hidden space-y-1.5 text-center">
            <a href="#" class="sub-nav-item block px-6 py-3 text-base font-extrabold text-slate-500 hover:text-amber-900 rounded-xl transition-all">Show Products</a>
            <a href="#" class="sub-nav-item block px-6 py-3 text-base font-extrabold text-slate-500 hover:text-amber-900 rounded-xl transition-all">Add Products</a>
          </div>
        </div>
      </div>

      <div class="space-y-1">
        <button @click="toggleDropdown('categories')" class="nav-item w-full flex items-center justify-center px-6 py-4 text-slate-700 hover:text-slate-900 font-bold rounded-2xl transition-all relative overflow-hidden group cursor-pointer text-lg tracking-wide text-center">
          <span class="z-10 transition-transform duration-300 group-hover:scale-105">Categories</span>
        </button>
        <div :class="['grid transition-all duration-400 ease-in-out overflow-hidden px-4', dropdowns.categories ? 'grid-rows-[1fr] opacity-100 mt-2 mb-2' : 'grid-rows-[0fr] opacity-0']">
          <div class="overflow-hidden space-y-1.5 text-center">
            <a href="#" class="sub-nav-item block px-6 py-3 text-base font-extrabold text-slate-500 hover:text-amber-900 rounded-xl transition-all">All Categories</a>
            <a href="#" class="sub-nav-item block px-6 py-3 text-base font-extrabold text-slate-500 hover:text-amber-900 rounded-xl transition-all">Show Categories</a>
          </div>
        </div>
      </div>

      <div class="space-y-1">
        <button @click="toggleDropdown('projects')" class="nav-item w-full flex items-center justify-center px-6 py-4 text-slate-700 hover:text-slate-900 font-bold rounded-2xl transition-all relative overflow-hidden group cursor-pointer text-lg tracking-wide text-center">
          <span class="z-10 transition-transform duration-300 group-hover:scale-105">Previous Projects</span>
        </button>
        <div :class="['grid transition-all duration-400 ease-in-out overflow-hidden px-4', dropdowns.projects ? 'grid-rows-[1fr] opacity-100 mt-2 mb-2' : 'grid-rows-[0fr] opacity-0']">
          <div class="overflow-hidden space-y-1.5 text-center">
            <a href="#" class="sub-nav-item block px-6 py-3 text-base font-extrabold text-slate-500 hover:text-amber-900 rounded-xl transition-all">Show All</a>
            <a href="#" class="sub-nav-item block px-6 py-3 text-base font-extrabold text-slate-500 hover:text-amber-900 rounded-xl transition-all">Add Project</a>
          </div>
        </div>
      </div>

      <div class="space-y-1">
        <button @click="toggleDropdown('videos')" class="nav-item w-full flex items-center justify-center px-6 py-4 text-slate-700 hover:text-slate-900 font-bold rounded-2xl transition-all relative overflow-hidden group cursor-pointer text-lg tracking-wide text-center">
          <span class="z-10 transition-transform duration-300 group-hover:scale-105">Videos</span>
        </button>
        <div :class="['grid transition-all duration-400 ease-in-out overflow-hidden px-4', dropdowns.videos ? 'grid-rows-[1fr] opacity-100 mt-2 mb-2' : 'grid-rows-[0fr] opacity-0']">
          <div class="overflow-hidden space-y-1.5 text-center">
            <a href="#" class="sub-nav-item block px-6 py-3 text-base font-extrabold text-slate-500 hover:text-amber-900 rounded-xl transition-all">Show Videos</a>
            <a href="#" class="sub-nav-item block px-6 py-3 text-base font-extrabold text-slate-500 hover:text-amber-900 rounded-xl transition-all">Add Video</a>
          </div>
        </div>
      </div>

      <a href="#" class="nav-item flex items-center justify-center px-6 py-4 text-slate-700 hover:text-slate-900 font-bold rounded-2xl transition-all relative overflow-hidden group text-lg tracking-wide text-center">
        <span class="z-10 transition-transform duration-300 group-hover:scale-105">Contact Page</span>
      </a>

      <a href="#" class="nav-item flex items-center justify-center px-6 py-4 text-slate-700 hover:text-slate-900 font-bold rounded-2xl transition-all relative overflow-hidden group text-lg tracking-wide text-center">
        <span class="z-10 transition-transform duration-300 group-hover:scale-105">Settings</span>
      </a>
    </nav>

    <div class="p-5 border-t border-[#EAE3DA] bg-[#F1EAE1]/30 text-center text-xs text-slate-400 font-bold tracking-wider uppercase shrink-0">
      v1.0.0 © KMW Marble
    </div>
  </aside>

  <div v-if="!isCollapsed" @click="toggleCollapse" class="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] transition-all duration-300"></div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['toggle'])
const isCollapsed = ref(true)

// إضافة تصنيفات الـ dropdowns الجديدة في الـ Reactive state
const dropdowns = reactive({
  products: false,
  categories: false,
  projects: false,
  videos: false
})

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit('toggle')
}

const toggleDropdown = (key) => {
  dropdowns[key] = !dropdowns[key]
}

defineExpose({ isCollapsed, toggleCollapse })
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.nav-item { position: relative; transition: background-color 0.25s ease, transform 0.2s ease; }
.nav-item::before { content: ''; position: absolute; inset: 0; background-image: url('@/assets/images/login_btn_hover.avif'); background-size: cover; background-position: center; opacity: 0; z-index: 0; transition: opacity 0.35s ease-in-out; border-radius: 1rem; pointer-events: none; }
.nav-item:hover::before { opacity: 0.09; }
.nav-item:hover { background-color: rgba(226, 217, 205, 0.35); transform: scale(1.015); }
.sub-nav-item { transition: all 0.2s ease; border-bottom: 2px solid transparent; cursor: pointer; }
.sub-nav-item:hover { background-color: rgba(226, 217, 205, 0.25); border-bottom-color: #b8966b; }
</style>
