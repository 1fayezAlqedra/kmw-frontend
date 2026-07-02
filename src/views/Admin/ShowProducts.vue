<template>
  <div class="w-full mx-auto animate-fade-in box-border overflow-hidden bg-[#F7F4EE] min-h-screen p-4 sm:p-6 md:p-8" dir="ltr">

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6 md:mb-8">
      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-[#E6E1DA] flex items-center space-x-4 shadow-[0_4px_15px_-3px_rgba(161,70,29,0.02)]">
        <div class="p-3 bg-[#F7F4EE] text-[#091124] rounded-xl border border-[#ECE6DD] flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 11m8 4V21M4 11v10l8-4" />
          </svg>
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-[10px] sm:text-xs text-[#788FA6] font-black uppercase tracking-wider truncate">Total Products</span>
          <span class="text-xl sm:text-2xl font-black text-[#091124] mt-0.5 font-mono">{{ products.length }}</span>
        </div>
      </div>

      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-[#E6E1DA] flex items-center space-x-4 shadow-[0_4px_15px_-3px_rgba(161,70,29,0.02)]">
        <div class="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-[10px] sm:text-xs text-[#788FA6] font-black uppercase tracking-wider truncate">Active Showroom</span>
          <span class="text-xl sm:text-2xl font-black text-[#091124] mt-0.5 font-mono">94.2%</span>
        </div>
      </div>

      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-[#E6E1DA] flex items-center space-x-4 shadow-[0_4px_15px_-3px_rgba(161,70,29,0.02)] sm:col-span-2 lg:col-span-1">
        <div class="p-3 bg-amber-50 text-[#A1461D] rounded-xl border border-amber-100 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-[10px] sm:text-xs text-[#788FA6] font-black uppercase tracking-wider truncate">Total Media Blocks</span>
          <span class="text-xl sm:text-2xl font-black text-[#091124] mt-0.5 font-mono">{{ totalImagesCount }} Images</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl md:rounded-[1.75rem] border border-[#ECE6DD] shadow-[0_4px_20px_-4px_rgba(161,70,29,0.03)] w-full box-border overflow-hidden">

      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border-b border-[#ECE6DD] p-5 md:p-8">
        <div>
          <h4 class="text-lg md:text-2xl font-black text-[#091124] tracking-tight uppercase">Active Stock Catalog</h4>
          <p class="text-xs text-[#788FA6] font-bold mt-1">Review your global products list, multiple active galleries, and category nodes</p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div class="relative w-full sm:w-64 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#788FA6] absolute left-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search product name..."
              class="w-full pl-10 pr-4 py-2.5 bg-[#F7F4EE]/40 border border-[#E6E1DA] rounded-xl focus:outline-none focus:border-[#A1461D] focus:bg-white text-xs font-bold text-[#091124] transition-all duration-300 placeholder:text-[#788FA6]/40 shadow-xs"
            />
          </div>

          <RouterLink
            to="/admin/add-product"
            class="w-full sm:w-auto px-6 py-3 bg-[#F7F4EE] hover:bg-[#091124] hover:text-white text-[#A1461D] border border-[#ECE6DD] text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-wider text-center cursor-pointer shadow-xs"
          >
            + Create New Product
          </RouterLink>
        </div>
      </div>

      <div class="hidden md:block w-full box-border overflow-x-auto scrollbar-thin">
        <table class="w-full border-collapse text-left table-auto">
          <thead>
            <tr class="border-b border-[#ECE6DD] text-[#788FA6] text-xs font-black uppercase tracking-wider bg-[#F7F4EE]/20">
              <th class="py-4 px-6 w-16">ID</th>
              <th class="py-4 px-6 min-w-[240px]">Product Info (EN)</th>
              <th class="py-4 px-6 min-w-[240px] text-right">بيانات المنتج (AR)</th>
              <th class="py-4 px-6 min-w-[130px]">Connected Group</th>
              <th class="py-4 px-6 min-w-[110px] text-center">Images Count</th>
              <th class="py-4 px-6 text-right w-28">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-[#ECE6DD]/50">
            <tr
              v-for="product in filteredProducts"
              :key="product.id"
              class="hover:bg-[#F7F4EE]/20 transition-colors duration-200 group"
            >
              <td class="py-5 px-6 align-top pt-6">
                <span class="text-sm font-bold text-[#788FA6] font-mono">#{{ product.id }}</span>
              </td>

              <td class="py-5 px-6 align-top">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 rounded-xl border border-[#E6E1DA] overflow-hidden bg-white p-0.5 shadow-xs group-hover:border-[#091124]/30 transition-all flex-shrink-0">
                    <img :src="product.image_paths[0]" alt="Cover" class="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div class="flex flex-col whitespace-normal break-words min-w-0">
                    <span class="text-sm sm:text-base font-black text-[#091124] group-hover:text-[#A1461D] transition-colors duration-200 block truncate">
                      {{ product.name_en }}
                    </span>
                    <span class="text-xs text-[#788FA6] font-semibold mt-1 leading-relaxed block line-clamp-2">
                      {{ product.description_en }}
                    </span>
                  </div>
                </div>
              </td>

              <td class="py-5 px-6 text-right align-top" dir="rtl">
                <div class="flex flex-col whitespace-normal break-words min-w-0">
                  <span class="text-sm sm:text-base font-black text-[#091124] font-sans group-hover:text-[#A1461D] transition-colors duration-200 block truncate">
                    {{ product.name_ar }}
                  </span>
                  <span class="text-xs text-[#788FA6] font-semibold mt-1 font-sans leading-relaxed block line-clamp-2">
                    {{ product.description_ar }}
                  </span>
                </div>
              </td>

              <td class="py-5 px-6 align-top pt-5.5">
                <span class="inline-block text-[10px] text-[#A1461D] font-black uppercase tracking-wider bg-[#F7F4EE] px-2.5 py-1.5 rounded-lg border border-[#ECE6DD] shadow-xs whitespace-nowrap">
                  {{ product.category_name }}
                </span>
              </td>

              <td class="py-5 px-6 text-center align-top pt-5.5">
                <span class="inline-block text-xs font-black text-[#091124] bg-[#F7F4EE] px-3 py-1 rounded-full border border-[#E6E1DA] font-mono">
                  {{ product.image_paths.length }} files
                </span>
              </td>

              <td class="py-5 px-6 text-right align-top pt-4.5">
                <div class="flex items-center justify-end gap-1.5">
                  <button
                    @click="handleEdit(product.id)"
                    class="p-2 bg-white hover:bg-[#091124] text-slate-600 hover:text-white rounded-xl border border-[#ECE6DD] shadow-xs transition-all duration-200 cursor-pointer flex-shrink-0"
                    title="Edit Item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>

                  <button
                    @click="handleDelete(product.id)"
                    class="p-2 bg-white hover:bg-red-600 text-slate-600 hover:text-white rounded-xl border border-[#ECE6DD] hover:border-red-600 shadow-xs transition-all duration-200 cursor-pointer flex-shrink-0"
                    title="Delete Item"
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

      <div class="block md:hidden divide-y divide-[#ECE6DD]/60">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="p-5 flex flex-col gap-4 bg-white"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-[#788FA6] font-mono">#{{ product.id }}</span>
              <span class="text-[9px] text-[#A1461D] font-black uppercase tracking-wider bg-[#F7F4EE] px-2 py-1 rounded border border-[#ECE6DD]">
                {{ product.category_name }}
              </span>
            </div>

            <div class="flex items-center gap-1.5">
              <button
                @click="handleEdit(product.id)"
                class="p-2 bg-[#F7F4EE]/60 text-slate-600 rounded-xl border border-[#ECE6DD]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="handleDelete(product.id)"
                class="p-2 bg-red-50 text-red-600 rounded-xl border border-red-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-start gap-3.5">
            <div class="w-14 h-14 rounded-xl border border-[#E6E1DA] overflow-hidden bg-white p-0.5 flex-shrink-0 relative">
              <img :src="product.image_paths[0]" alt="Cover" class="w-full h-full object-cover rounded-lg" />
              <span class="absolute bottom-0.5 right-0.5 text-[8px] bg-[#091124] text-white px-1 rounded font-mono font-bold">
                {{ product.image_paths.length }}F
              </span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-sm font-black text-[#091124]">{{ product.name_en }}</span>
              <p class="text-xs text-[#788FA6] font-semibold mt-0.5 leading-relaxed line-clamp-2">{{ product.description_en }}</p>
            </div>
          </div>

          <div class="bg-[#F7F4EE]/30 border border-[#ECE6DD]/60 rounded-xl p-3 flex flex-col text-right" dir="rtl">
            <span class="text-sm font-black text-[#091124] font-sans">{{ product.name_ar }}</span>
            <p class="text-xs text-[#788FA6] font-semibold mt-0.5 font-sans leading-relaxed line-clamp-2">{{ product.description_ar }}</p>
          </div>
        </div>
      </div>

      <div v-if="filteredProducts.length === 0" class="py-14 text-center px-4 border-t border-[#ECE6DD]/50">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#788FA6]/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2m16 0h-2m-2 0H5m-2 0h2" />
        </svg>
        <p class="text-sm font-black text-[#091124]">No items found in your catalog</p>
        <p class="text-xs text-[#788FA6] font-bold mt-0.5">Try altering search keywords or publish a new product asset</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const products = ref([
  {
    id: 101,
    name_en: 'Carrara Statuario Premium',
    name_ar: 'رخام كرارا ستاتواريو نخب أول',
    category_name: 'Italian Marble',
    description_en: 'Elite selection of clean white background with strong, iconic grey tectonic veins.',
    description_ar: 'خامة فاخرة ذات خلفية بيضاء ناصعة وعروق رمادية واضحة ومميزة.',
    image_paths: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=150',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=150',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=150'
    ]
  },
  {
    id: 102,
    name_en: 'Nero Marquina Velvet Block',
    name_ar: 'رخام نيرو ماركينا الأسود المخملي',
    category_name: 'Spanish Luxury',
    description_en: 'High-quality fine grain compact deep black marble with distinct crystalline white veins.',
    description_ar: 'رخام أسود داكن عالي الجودة بحبيبات ناعمة مدمجة وعروق بيضاء كريستالية متناسقة.',
    image_paths: [
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=150'
    ]
  },
  {
    id: 103,
    name_en: 'Volakas Absolute White',
    name_ar: 'رخام فولاكاس الأبيض المطلق',
    category_name: 'Greek Stones',
    description_en: 'Famous white stone with diagonal smoky cloudy ribbon veining for premium open-book views.',
    description_ar: 'حجر أبيض يوناني شهير بعروق شريطية دخانية مائلة ومثالية لتركيبات الـ Open-book الراقية.',
    image_paths: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=150',
      'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=150'
    ]
  }
])

const totalImagesCount = computed(() => {
  return products.value.reduce((acc, curr) => acc + curr.image_paths.length, 0)
})

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return products.value

  return products.value.filter(p =>
    p.name_en.toLowerCase().includes(query) ||
    p.name_ar.includes(query) ||
    p.category_name.toLowerCase().includes(query)
  )
})

const handleEdit = (id) => { router.push(`/admin/edit-product/${id}`) }

const handleDelete = (id) => {
  if (confirm('Are you sure you want to permanently delete this product? This action cannot be undone.')) {
    products.value = products.value.filter(p => p.id !== id)
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

.scrollbar-thin::-webkit-scrollbar {
  height: 5px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: #F7F4EE;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #ECE6DD;
  border-radius: 10px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #b5a99a;
}
</style>
