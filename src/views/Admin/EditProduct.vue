<template>
  <div class="p-10 bg-[#F7F4EE] min-h-screen text-left select-none" dir="ltr">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 class="text-[28px] font-black text-[#091124] tracking-tight uppercase">EDIT PRODUCT</h1>
        <p class="text-[13px] font-bold text-[#788FA6] mt-1">Modify details and update images for active stone item #{{ productId }}</p>
      </div>
      <router-link
        to="/admin/products"
        class="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-white hover:bg-[#F7F4EE] text-[#091124] px-5 py-2.5 rounded-full font-black text-[11px] tracking-wider border border-[#E6E1DA] shadow-xs uppercase transition-all"
      >
        ← BACK TO DASHBOARD
      </router-link>
    </div>

    <div class="max-w-6xl mx-auto bg-white rounded-[1.75rem] border border-[#ECE6DD] p-10 shadow-xs">
      <form @submit.prevent="handleSubmit" class="space-y-8">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex flex-col gap-2.5">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#788FA6] uppercase">PRODUCT NAME</span>
              <span class="text-[#A1461D] ml-1 uppercase">(ENGLISH)</span>
            </label>
            <input
              type="text"
              v-model="form.name_en"
              required
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold focus:outline-none focus:border-[#A1461D] transition-all text-[13.5px]"
            />
          </div>

          <div class="flex flex-col gap-2.5 text-right" dir="rtl">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#A1461D] uppercase">اسم المنتج</span>
              <span class="text-[#788FA6] mr-1 uppercase">(باللغة العربية)</span>
            </label>
            <input
              type="text"
              v-model="form.name_ar"
              required
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold focus:outline-none focus:border-[#A1461D] transition-all text-[13.5px] text-right"
            />
          </div>
        </div>

        <div class="flex flex-col gap-2.5">
          <label class="text-[11px] font-black tracking-wider">
            <span class="text-[#788FA6] uppercase">PRODUCT CATEGORY</span>
            <span class="text-[#A1461D] ml-1 uppercase">(ASSIGN MAIN BELONGING)</span>
          </label>
          <div class="relative">
            <select
              v-model="form.category_id"
              required
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-bold focus:outline-none focus:border-[#A1461D] transition-all cursor-pointer text-[13.5px] appearance-none"
            >
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name_en }} — {{ cat.name_ar }}
              </option>
            </select>
            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-[#788FA6] pointer-events-none text-xs">▼</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex flex-col gap-2.5">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#788FA6] uppercase">DESCRIPTION</span>
              <span class="text-[#A1461D] ml-1 uppercase">(ENGLISH)</span>
            </label>
            <textarea
              v-model="form.description_en"
              required
              rows="5"
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold focus:outline-none focus:border-[#A1461D] transition-all resize-none text-[13.5px] leading-relaxed"
            ></textarea>
          </div>

          <div class="flex flex-col gap-2.5 text-right" dir="rtl">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#A1461D] uppercase">الوصف</span>
              <span class="text-[#788FA6] mr-1 uppercase">(باللغة العربية)</span>
            </label>
            <textarea
              v-model="form.description_ar"
              required
              rows="5"
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold focus:outline-none focus:border-[#A1461D] transition-all resize-none text-[13.5px] leading-relaxed text-right"
            ></textarea>
          </div>
        </div>

        <div class="flex flex-col gap-2.5">
          <label class="text-[11px] font-black tracking-wider text-[#788FA6] uppercase">MANAGE PRODUCT IMAGES</label>
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col items-center justify-center w-full h-36 border-2 border-[#E6E1DA] border-dashed rounded-xl cursor-pointer bg-[#FDFDFD] hover:bg-[#F7F4EE] transition-colors">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <span class="text-2xl mb-1">📸</span>
                <p class="text-xs font-bold text-[#788FA6]">Click or drag to add more images to this product gallery</p>
              </div>
              <input type="file" class="hidden" multiple accept="image/*" @change="handleImageUpload" />
            </label>
          </div>

          <div v-if="imagePreviews.length > 0" class="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-2">
            <div v-for="(src, index) in imagePreviews" :key="index" class="relative rounded-xl overflow-hidden border border-[#E6E1DA] bg-white aspect-square shadow-xs group">
              <img :src="src.url" class="w-full h-full object-cover" />

              <button
                type="button"
                @click="setAsMain(index)"
                :class="src.is_main ? 'bg-[#A1461D] text-white' : 'bg-slate-900/60 text-slate-200 opacity-0 group-hover:opacity-100'"
                class="absolute top-2 left-2 text-[9px] font-black px-2 py-0.5 rounded shadow-xs transition-opacity uppercase tracking-wider"
              >
                {{ src.is_main ? 'MAIN' : 'SET AS MAIN' }}
              </button>

              <button type="button" @click="removeImage(index)" class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-black rounded-xl uppercase">Remove</button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end pt-5 border-t border-[#ECE6DD]">
          <button
            type="submit"
            class="px-8 py-3.5 rounded-xl bg-[#091124] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            UPDATE PRODUCT
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = ref(route.params.id || '1')

const categories = ref([
  { id: 1, name_ar: 'رخام إيطالي', name_en: 'Italian Marble' },
  { id: 2, name_ar: 'جرانيت طبيعي', name_en: 'Natural Granite' }
])

const form = ref({
  category_id: 1,
  name_ar: 'رخام كرارا إيطالي نخب أول',
  name_en: 'Carrara Marble Premium',
  description_ar: 'هذا الرخام يعتبر من أرقى وأجود أنواع الرخام الإيطالي المستورد لشركة KMW.',
  description_en: 'This Carrara marble is directly imported from Italian quarries with premier finish.',
  images: []
})

const imagePreviews = ref([
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=150&q=80', is_main: true },
  { url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=150&q=80', is_main: false }
])

const setAsMain = (index) => {
  imagePreviews.value.forEach((img, idx) => { img.is_main = idx === index })
}

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    form.value.images.push(file)
    const reader = new FileReader()
    reader.onload = (e) => { imagePreviews.value.push({ url: e.target.result, is_main: false }) }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  imagePreviews.value.splice(index, 1)
}

const handleSubmit = () => {
  console.log('Updated perfectly matching layout and grid systems!')
}
</script>
