<template>
  <div class="w-full mx-auto p-4 sm:p-0 animate-fade-in box-border overflow-hidden">

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">

      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAE3DA] flex items-center space-x-4 shadow-[0_4px_15px_-3px_rgba(139,92,26,0.02)]">
        <div class="p-3 bg-[#F7F4F0] text-amber-950 rounded-xl border border-[#E2D9CD] flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider truncate">Total Groups</span>
          <span class="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 font-mono">{{ categories.length }}</span>
        </div>
      </div>

      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAE3DA] flex items-center space-x-4 shadow-[0_4px_15px_-3px_rgba(139,92,26,0.02)]">
        <div class="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/xl" class="w-5 h-5 sm:w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider truncate">Active Status</span>
          <span class="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 font-mono">100%</span>
        </div>
      </div>

      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAE3DA] flex items-center space-x-4 shadow-[0_4px_15px_-3px_rgba(139,92,26,0.02)]">
        <div class="p-3 bg-amber-50 text-amber-900 rounded-xl border border-amber-100 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider truncate">Connected Products</span>
          <span class="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 font-mono">148</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] w-full box-border overflow-hidden">

      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border-b border-[#EAE3DA] pb-5 p-5 sm:p-8">
        <div>
          <h4 class="text-xl md:text-2xl font-black text-slate-900 tracking-wide uppercase">Stone Classifications</h4>
          <p class="text-xs text-slate-400 font-bold mt-1">Review and manage your global categories, translations, and SEO slugs</p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div class="relative w-full sm:w-64 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search category..."
              class="w-full pl-10 pr-4 py-2.5 bg-[#F7F4F0]/50 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-xs font-bold text-slate-800 transition-all duration-300 placeholder:text-slate-400 shadow-sm"
            />
          </div>

          <RouterLink
            to="/admin/add-category"
            class="w-full sm:w-auto px-6 py-3 bg-[#F7F4F0] hover:bg-amber-950 hover:text-white text-amber-900 border border-[#E2D9CD] text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-widest text-center cursor-pointer shadow-sm"
          >
            + Create New Category
          </RouterLink>
        </div>
      </div>

      <div class="w-full box-border overflow-x-auto scrollbar-thin">
        <table class="w-full border-collapse text-left table-auto">

          <thead>
            <tr class="border-b border-[#EAE3DA] text-slate-400 text-xs font-black uppercase tracking-widest bg-[#F7F4F0]/30">
              <th class="py-4 px-4 sm:px-6 w-16">ID</th>
              <th class="py-4 px-4 sm:px-6 min-w-[260px]">Classification (EN)</th>
              <th class="py-4 px-4 sm:px-6 min-w-[260px] text-right">التصنيف (AR)</th>
              <th class="py-4 px-4 sm:px-6 min-w-[160px]">Slug Link</th>
              <th class="py-4 px-4 sm:px-6 text-right w-28">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-[#EAE3DA]/50">
            <tr
              v-for="category in filteredCategories"
              :key="category.id"
              class="hover:bg-[#F7F4F0]/20 transition-colors duration-200 group"
            >
              <td class="py-5 px-4 sm:px-6 align-top pt-6">
                <span class="text-sm font-bold text-slate-400 font-mono">#{{ category.id }}</span>
              </td>

              <td class="py-5 px-4 sm:px-6 align-top">
                <div class="flex items-start space-x-3.5">
                  <div class="w-11 h-11 rounded-xl border border-[#EAE3DA] overflow-hidden bg-[#F7F4F0] flex-shrink-0 p-0.5 shadow-sm group-hover:border-amber-950/30 transition-colors duration-300">
                    <img
                      :src="category.image_path"
                      alt="Cover"
                      class="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div class="flex flex-col whitespace-normal break-words min-w-0">
                    <span class="text-sm sm:text-base font-black text-slate-900 group-hover:text-amber-950 transition-colors duration-200 block truncate">
                      {{ category.name_en }}
                    </span>
                    <span class="text-xs text-slate-400 font-medium mt-1 leading-relaxed block">
                      {{ category.description_en }}
                    </span>
                  </div>
                </div>
              </td>

              <td class="py-5 px-4 sm:px-6 text-right align-top" dir="rtl">
                <div class="flex flex-col whitespace-normal break-words min-w-0">
                  <span class="text-sm sm:text-base font-black text-slate-900 font-sans group-hover:text-amber-950 transition-colors duration-200 block truncate">
                    {{ category.name_ar }}
                  </span>
                  <span class="text-xs text-slate-400 font-medium mt-1 font-sans leading-relaxed block">
                    {{ category.description_ar }}
                  </span>
                </div>
              </td>

              <td class="py-5 px-4 sm:px-6 align-top pt-5">
                <span class="inline-block text-[11px] text-amber-900 font-black lowercase tracking-wider bg-[#F7F4F0] px-2.5 py-1.5 rounded-lg border border-[#E2D9CD]/70 shadow-sm font-mono whitespace-normal break-all max-w-[150px]">
                  {{ category.slug }}
                </span>
              </td>

              <td class="py-5 px-4 sm:px-6 text-right align-top pt-4.5">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="handleEdit(category.id)"
                    class="p-2 bg-white hover:bg-amber-950 text-slate-700 hover:text-white rounded-xl border border-[#E2D9CD] hover:border-amber-950 shadow-sm transition-all duration-300 cursor-pointer flex-shrink-0"
                    title="Edit Classification"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button
                    @click="handleDelete(category.id)"
                    class="p-2 bg-white hover:bg-red-600 text-slate-700 hover:text-white rounded-xl border border-[#E2D9CD] hover:border-red-600 shadow-sm transition-all duration-300 cursor-pointer flex-shrink-0"
                    title="Delete Classification"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredCategories.length === 0">
              <td colspan="5" class="py-12 text-center px-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-slate-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p class="text-sm font-black text-slate-700">No categories match your search</p>
                <p class="text-xs text-slate-400 font-bold mt-0.5">Try reviewing the spelling or add a new classification</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const categories = ref([
  {
    id: 1,
    name_en: 'Marble Collection',
    name_ar: 'تشكيلة الرخام الطبيعي',
    description_en: 'Metamorphic rocks known for elegant veining, bright textures, and luxury appeal.',
    description_ar: 'صخور متحولة مشهورة بعروقها الأنيقة، ملمسها اللامع، وتصاميمها الفاخرة.',
    image_path: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400',
    slug: 'marble-collection'
  },
  {
    id: 2,
    name_en: 'Granite Masterpieces',
    name_ar: 'روائع الجرانيت الصلب',
    description_en: 'Ultra-durable volcanic igneous rocks ideal for heavy-duty kitchen countertops and exterior cladding.',
    description_ar: 'صخور نارية بركانية فائقة الصلابة مثالية لأسطح المطابخ الشاقة والكسوة الخارجية.',
    image_path: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
    slug: 'granite-masterpieces'
  },
  {
    id: 3,
    name_en: 'Engineered Quartz',
    name_ar: 'الكوارتز الصناعي الفاخر',
    description_en: 'Modern composite materials offering non-porous surfaces, high scratch resistance, and uniform colors.',
    description_ar: 'مواد حديثة مدمجة توفر أسطحاً غير مسامية، مقاومة عالية للخدش، وألواناً متناسقة.',
    image_path: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400',
    slug: 'engineered-quartz'
  }
])

const filteredCategories = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return categories.value

  return categories.value.filter(cat =>
    cat.name_en.toLowerCase().includes(query) ||
    cat.name_ar.includes(query) ||
    cat.slug.toLowerCase().includes(query)
  )
})

const handleEdit = (id) => {
  router.push(`/admin/edit-category/${id}`)
}

const handleDelete = (id) => {
  if (confirm('Are you sure you want to permanently delete this main classification? All related sub-products might be affected.')) {
    categories.value = categories.value.filter(cat => cat.id !== id)
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* تخصيص وتنعيم شريط التمرير على الموبايل */
.scrollbar-thin::-webkit-scrollbar {
  height: 5px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: #F7F4F0;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #E2D9CD;
  border-radius: 10px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #b5a99a;
}
</style>
