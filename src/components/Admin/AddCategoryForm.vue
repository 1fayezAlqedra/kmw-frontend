<template>
  <div class="bg-white rounded-2xl border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] w-full box-border overflow-hidden animate-fade-in">

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#EAE3DA] pb-5 p-5 sm:p-8">
      <div>
        <h4 class="text-xl md:text-2xl font-black text-slate-900 tracking-wide uppercase">Categories Management</h4>
        <p class="text-xs text-slate-400 font-bold mt-1">Manage, edit, and organize your product categories</p>
      </div>
      <RouterLink
        to="/admin/add-category"
        class="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-[#F7F4F0] hover:bg-amber-950 hover:text-white text-amber-900 border border-[#E2D9CD] text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-widest cursor-pointer shadow-sm text-center"
      >
        + Add New Category
      </RouterLink>
    </div>

    <div class="w-full box-border overflow-x-auto scrollbar-thin">
      <table class="w-full border-collapse text-left">

        <thead>
          <tr class="border-b border-[#EAE3DA] text-slate-400 text-xs font-black uppercase tracking-widest bg-[#F7F4F0]/30">
            <th class="py-4 px-4 sm:px-6 min-w-[70px]">ID</th>
            <th class="py-4 px-4 sm:px-6 min-w-[220px]">Category</th>
            <th class="py-4 px-4 sm:px-6 min-w-[180px] text-right">اسم التصنيف</th>
            <th class="py-4 px-4 sm:px-6 min-w-[180px]">Slug / Route</th>
            <th class="py-4 px-4 sm:px-6 text-right min-w-[120px]">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-[#EAE3DA]/50">
          <tr
            v-for="category in categories"
            :key="category.id"
            class="hover:bg-[#F7F4F0]/20 transition-colors duration-200 group"
          >
            <td class="py-4 px-4 sm:px-6">
              <span class="text-sm font-bold text-slate-400 font-mono">#{{ category.id }}</span>
            </td>

            <td class="py-4 px-4 sm:px-6">
              <div class="flex items-center space-x-3.5">
                <div class="w-11 h-11 rounded-xl border border-[#EAE3DA] overflow-hidden bg-[#F7F4F0] flex-shrink-0 p-0.5 shadow-sm group-hover:border-amber-950/30 transition-colors duration-300">
                  <img
                    :src="category.image_path"
                    alt="Category Image"
                    class="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-sm sm:text-base font-black text-slate-900 truncate group-hover:text-amber-950 transition-colors duration-200">
                    {{ category.name_en }}
                  </span>
                  <span class="text-xs text-slate-400 font-medium truncate max-w-[160px] sm:max-w-[200px] mt-0.5">
                    {{ category.description_en || 'No description available' }}
                  </span>
                </div>
              </div>
            </td>

            <td class="py-4 px-4 sm:px-6 text-right" dir="rtl">
              <div class="flex flex-col min-w-0 justify-end">
                <span class="text-sm font-extrabold text-slate-800 font-sans block truncate">
                  {{ category.name_ar }}
                </span>
                <span class="text-[11px] text-slate-400 font-medium block truncate max-w-[150px] sm:max-w-[180px] mt-0.5">
                  {{ category.description_ar || 'لا يوجد وصف' }}
                </span>
              </div>
            </td>

            <td class="py-4 px-4 sm:px-6">
              <span class="inline-block text-[11px] text-amber-900 font-black lowercase tracking-wider bg-[#F7F4F0] px-2.5 py-1.5 rounded-lg border border-[#E2D9CD]/60 shadow-sm max-w-[150px] sm:max-w-[180px] truncate font-mono">
                {{ category.slug }}
              </span>
            </td>

            <td class="py-4 px-4 sm:px-6 text-right">
              <div class="flex items-center justify-end gap-2">
                <button
                  @click="editCategory(category.id)"
                  class="p-2 bg-white hover:bg-amber-950 text-slate-700 hover:text-white rounded-xl border border-[#E2D9CD] hover:border-amber-950 shadow-sm transition-all duration-300 cursor-pointer flex-shrink-0"
                  title="Edit Category"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>

                <button
                  @click="deleteCategory(category.id)"
                  class="p-2 bg-white hover:bg-red-600 text-slate-700 hover:text-white rounded-xl border border-[#E2D9CD] hover:border-red-600 shadow-sm transition-all duration-300 cursor-pointer flex-shrink-0"
                  title="Delete Category"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const categories = ref([
  {
    id: 1,
    name_en: 'Carrara Marble',
    name_ar: 'رخام كارارا',
    description_en: 'Premium luxury Italian white marble slabs.',
    description_ar: 'ألواح رخام إيطالي أبيض فاخر عالي الجودة.',
    image_path: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=150',
    slug: 'carrara-marble'
  },
  {
    id: 2,
    name_en: 'Nero Marquina',
    name_ar: 'نيرو ماركينا',
    description_en: 'Elegant black marble with stunning white veins.',
    description_ar: 'رخام أسود أنيق مع عروق بيضاء ساحرة.',
    image_path: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=150',
    slug: 'nero-marquina'
  }
])

const editCategory = (id) => {
  console.log('Navigate to edit category ID:', id)
}

const deleteCategory = (id) => {
  if (confirm('Are you sure you want to delete this category?')) {
    console.log('Delete category ID:', id)
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* تحسين شكل شريط التمرير الأفقي الصغير للموبايل */
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
