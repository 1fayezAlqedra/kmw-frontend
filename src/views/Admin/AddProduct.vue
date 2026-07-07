<template>
  <div class="p-10 bg-[#F7F4EE] min-h-screen text-left select-none" dir="ltr">
    <!-- Header Section (100% Match to Screenshot 2026-07-01 203024.png) -->
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 class="text-[28px] font-black text-[#091124] tracking-tight uppercase">CREATE NEW PRODUCT</h1>
        <p class="text-[13px] font-bold text-[#788FA6] mt-1">Add a main stone classification (e.g., Marble, Granite, Quartz)</p>
      </div>
      <router-link
        to="/admin/products"
        class="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-white hover:bg-[#F7F4EE] text-[#091124] px-5 py-2.5 rounded-full font-black text-[11px] tracking-wider border border-[#E6E1DA] shadow-xs uppercase transition-all"
      >
        ← BACK TO PRODUCTS
      </router-link>
    </div>

    <!-- Main Container Card -->
    <div class="max-w-6xl mx-auto bg-white rounded-[1.75rem] border border-[#ECE6DD] p-10 shadow-xs">
      <form @submit.prevent="handleSubmit" class="space-y-8">

        <!-- ROW 1: Two Columns Grid (Product Names) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Product Name (English) -->
          <div class="flex flex-col gap-2.5">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#788FA6] uppercase">PRODUCT NAME</span>
              <span class="text-[#A1461D] ml-1 uppercase">(ENGLISH)</span>
            </label>
            <input
              type="text"
              v-model="form.name_en"
              required
              placeholder="e.g., Granite, Marble, Quartz"
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold placeholder-[#788FA6]/40 focus:outline-none focus:border-[#A1461D] transition-all text-[13.5px]"
            />
          </div>

          <!-- Product Name (Arabic) -->
          <div class="flex flex-col gap-2.5 text-right" dir="rtl">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#A1461D] uppercase">اسم المنتج</span>
              <span class="text-[#788FA6] mr-1 uppercase">(باللغة العربية)</span>
            </label>
            <input
              type="text"
              v-model="form.name_ar"
              required
              placeholder="مثال: جرانيت، رخام، كوارترز، بورسلان"
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold placeholder-[#788FA6]/40 focus:outline-none focus:border-[#A1461D] transition-all text-[13.5px] text-right"
            />
          </div>
        </div>

        <!-- ROW 2: Full Width Grid Element (Category Dropdown matching URL SLUG grid) -->
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
              <option value="" disabled selected>Select the marble category for this product</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name_en }} — {{ cat.name_ar }}
              </option>
            </select>
            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-[#788FA6] pointer-events-none text-xs">▼</span>
          </div>
        </div>

        <!-- ROW 3: Two Columns Grid (Descriptions) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Description (English) -->
          <div class="flex flex-col gap-2.5">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#788FA6] uppercase">DESCRIPTION</span>
              <span class="text-[#A1461D] ml-1 uppercase">(ENGLISH)</span>
            </label>
            <textarea
              v-model="form.description_en"
              required
              rows="5"
              placeholder="e.g., Collection of natural durable igneous rocks suitable for heavy-duty countertops and flooring..."
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold placeholder-[#788FA6]/40 focus:outline-none focus:border-[#A1461D] transition-all resize-none text-[13.5px] leading-relaxed"
            ></textarea>
          </div>

          <!-- Description (Arabic) -->
          <div class="flex flex-col gap-2.5 text-right" dir="rtl">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#A1461D] uppercase">الوصف</span>
              <span class="text-[#788FA6] mr-1 uppercase">(باللغة العربية)</span>
            </label>
            <textarea
              v-model="form.description_ar"
              required
              rows="5"
              placeholder="مثال: تشكيلة من الصخور الطبيعية الصلبة المقاومة للحرارة والخدش، مثالية للمطابخ والأرضيات الخارجية..."
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold placeholder-[#788FA6]/40 focus:outline-none focus:border-[#A1461D] transition-all resize-none text-[13.5px] leading-relaxed text-right"
            ></textarea>
          </div>
        </div>

        <!-- ROW 4: Cover Image Dropzone Box -->
        <div class="flex flex-col gap-2.5">
          <label class="text-[11px] font-black tracking-wider text-[#788FA6] uppercase">PRODUCT COVER IMAGE & GALLERY</label>
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col items-center justify-center w-full h-36 border-2 border-[#E6E1DA] border-dashed rounded-xl cursor-pointer bg-[#FDFDFD] hover:bg-[#F7F4EE] transition-colors">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <span class="text-2xl mb-1">📸</span>
                <p class="text-xs font-bold text-[#788FA6]">Drag & drop multiple product images or click to browse</p>
                <p class="text-[10px] font-medium text-[#788FA6]/70 mt-0.5">The first image will automatically be set as MAIN</p>
              </div>
              <input type="file" class="hidden" multiple accept="image/*" @change="handleImageUpload" />
            </label>
          </div>

          <!-- Live Image Previews -->
          <div v-if="imagePreviews.length > 0" class="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-2">
            <div v-for="(src, index) in imagePreviews" :key="index" class="relative rounded-xl overflow-hidden border border-[#E6E1DA] bg-white aspect-square shadow-xs group">
              <img :src="src" class="w-full h-full object-cover" />
              <span v-if="index === 0" class="absolute top-2 left-2 bg-[#A1461D] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">MAIN</span>
              <button type="button" @click="removeImage(index)" class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-black rounded-xl uppercase">Remove</button>
            </div>
          </div>
        </div>

        <!-- Submission Bottom bar -->
        <div class="flex items-center justify-end pt-5 border-t border-[#ECE6DD]">
          <button
            type="submit"
            class="px-8 py-3.5 rounded-xl bg-[#091124] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            SAVE PRODUCT
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const categories = ref([
  { id: 1, name_ar: 'رخام إيطالي', name_en: 'Italian Marble' },
  { id: 2, name_ar: 'جرانيت طبيعي', name_en: 'Natural Granite' },
  { id: 3, name_ar: 'ألواح كوارتز', name_en: 'Quartz Slabs' }
])

const form = ref({ category_id: '', name_ar: '', name_en: '', description_ar: '', description_en: '', images: [] })
const imagePreviews = ref([])

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    form.value.images.push(file)
    const reader = new FileReader()
    reader.onload = (e) => { imagePreviews.value.push(e.target.result) }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  form.value.images.splice(index, 1)
  imagePreviews.value.splice(index, 1)
}

const handleSubmit = () => { console.log('Saved data matching Screenshot layout perfectly!') }
</script>
