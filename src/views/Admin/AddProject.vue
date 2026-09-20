<template>
  <div class="p-4 sm:p-6 md:p-10 bg-[#F7F4EE] min-h-screen text-left select-none" dir="ltr">
    <!-- Header Section -->
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 class="text-xl sm:text-[28px] font-black text-[#091124] tracking-tight uppercase">CREATE NEW PROJECT</h1>
        <p class="text-xs sm:text-[13px] font-bold text-[#788FA6] mt-1">Add a new project to your portfolio</p>
      </div>
      <router-link to="/admin/projects"
        class="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-white hover:bg-[#F7F4EE] text-[#091124] px-5 py-2.5 rounded-full font-black text-[11px] tracking-wider border border-[#E6E1DA] shadow-xs uppercase transition-all">
        ← BACK TO DASHBOARD
      </router-link>
    </div>

    <!-- Main Container Card -->
    <div class="max-w-6xl mx-auto bg-white rounded-2xl md:rounded-[1.75rem] border border-[#ECE6DD] p-6 sm:p-10 shadow-xs">
      <form @submit.prevent="handleSubmit" class="space-y-8">

        <!-- ROW 1: Project Names (EN & AR) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <!-- Project Name (English) -->
          <div class="flex flex-col gap-2.5">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#788FA6] uppercase">PROJECT NAME</span>
              <span class="text-[#A1461D] ml-1 uppercase">(ENGLISH)</span>
            </label>
            <input type="text" v-model="form.name_en" required placeholder="e.g., Granite, Marble, Quartz"
              :class="{ 'border-red-500': errors.name_en }"
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold placeholder-[#788FA6]/40 focus:outline-none focus:border-[#A1461D] transition-all text-[13.5px]" />
            <span class="text-red-500 text-xs font-semibold" v-if="errors.name_en">{{ errors.name_en[0] }}</span>
          </div>

          <!-- Project Name (Arabic) -->
          <div class="flex flex-col gap-2.5 text-right" dir="rtl">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#A1461D] uppercase">اسم المشروع</span>
              <span class="text-[#788FA6] mr-1 uppercase">(باللغة العربية)</span>
            </label>
            <input type="text" v-model="form.name_ar" required placeholder="مثال: جرانيت، رخام، كوارترز"
              :class="{ 'border-red-500': errors.name_ar }"
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold placeholder-[#788FA6]/40 focus:outline-none focus:border-[#A1461D] transition-all text-[13.5px] text-right font-sans" />
            <span class="text-red-500 text-xs font-semibold" v-if="errors.name_ar">{{ errors.name_ar[0] }}</span>
          </div>
        </div>

        <!-- ROW 2: Category Dropdown -->
        <div class="flex flex-col gap-2.5">
          <label class="text-[11px] font-black tracking-wider text-[#788FA6] uppercase">CATEGORY</label>
          <div class="relative">
            <select v-model="form.category_id" required
              :class="{ 'border-red-500': errors.category_id }"
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-bold focus:outline-none focus:border-[#A1461D] transition-all cursor-pointer text-[13.5px] appearance-none">
              <option value="" disabled selected>Select category...</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name_en || cat.name_ar || cat.name }}
              </option>
            </select>
            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-[#788FA6] pointer-events-none text-xs">▼</span>
          </div>
          <span class="text-red-500 text-xs font-semibold" v-if="errors.category_id">{{ errors.category_id[0] }}</span>
        </div>

        <!-- ROW 3: Descriptions (EN & AR) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <!-- Description (English) -->
          <div class="flex flex-col gap-2.5">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#788FA6] uppercase">DESCRIPTION</span>
              <span class="text-[#A1461D] ml-1 uppercase">(ENGLISH)</span>
            </label>
            <textarea v-model="form.description_en" rows="5"
              placeholder="e.g., Collection of natural durable igneous rocks suitable for heavy-duty countertops and flooring..."
              :class="{ 'border-red-500': errors.description_en }"
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold placeholder-[#788FA6]/40 focus:outline-none focus:border-[#A1461D] transition-all resize-none text-[13.5px] leading-relaxed"></textarea>
            <span class="text-red-500 text-xs font-semibold" v-if="errors.description_en">{{ errors.description_en[0] }}</span>
          </div>

          <!-- Description (Arabic) -->
          <div class="flex flex-col gap-2.5 text-right" dir="rtl">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#A1461D] uppercase">الوصف</span>
              <span class="text-[#788FA6] mr-1 uppercase">(باللغة العربية)</span>
            </label>
            <textarea v-model="form.description_ar" rows="5"
              placeholder="مثال: تشكيلة من الصخور الطبيعية الصلبة المقاومة للحرارة والخدش، مثالية للمطابخ والأرضيات الخارجية..."
              :class="{ 'border-red-500': errors.description_ar }"
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold placeholder-[#788FA6]/40 focus:outline-none focus:border-[#A1461D] transition-all resize-none text-[13.5px] leading-relaxed text-right font-sans"></textarea>
            <span class="text-red-500 text-xs font-semibold" v-if="errors.description_ar">{{ errors.description_ar[0] }}</span>
          </div>
        </div>

        <!-- ROW 4: Image Dropzone Box -->
        <div class="flex flex-col gap-2.5">
          <label class="text-[11px] font-black tracking-wider text-[#788FA6] uppercase">PROJECT IMAGES</label>
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col items-center justify-center w-full h-36 border-2 border-[#E6E1DA] border-dashed rounded-xl cursor-pointer bg-[#FDFDFD] hover:bg-[#F7F4EE] transition-colors">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <span class="text-2xl mb-1">📸</span>
                <p class="text-xs font-bold text-[#788FA6]">Click to upload or drag project images here</p>
                <p class="text-[10px] font-medium text-[#788FA6]/70 mt-0.5">Supports PNG, JPG or WEBP up to 5MB</p>
              </div>
              <input type="file" class="hidden" multiple accept="image/*" @change="handleFileUpload" />
            </label>
          </div>

          <!-- Live Image Previews -->
          <div v-if="imagePreviews.length > 0" class="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-2">
            <div v-for="(src, index) in imagePreviews" :key="index"
              class="relative rounded-xl overflow-hidden border border-[#E6E1DA] bg-white aspect-square shadow-xs group">
              <img :src="src" class="w-full h-full object-cover" />
              <button type="button" @click="removeImage(index)"
                class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-black rounded-xl uppercase">
                Remove
              </button>
            </div>
          </div>
          <span class="text-red-500 text-xs font-semibold" v-if="errors.images">{{ errors.images[0] }}</span>
        </div>

        <!-- General Error Alert -->
        <div v-if="errors.general" class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
          {{ errors.general }}
        </div>

        <!-- Bottom Action Bar -->
        <div class="flex items-center justify-end gap-3 pt-5 border-t border-[#ECE6DD]">
          <button type="button" @click="router.push('/admin/projects')"
            class="px-6 py-3.5 rounded-xl bg-white border border-[#E6E1DA] hover:bg-[#F7F4EE] text-[#091124] font-black text-xs uppercase tracking-wider transition-all cursor-pointer">
            CANCEL
          </button>
          <button type="submit" :disabled="isSubmitting"
            class="px-8 py-3.5 rounded-xl bg-[#091124] hover:bg-slate-800 disabled:bg-slate-500 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer">
            {{ isSubmitting ? 'SAVING PROJECT...' : 'SAVE PROJECT' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/api.js'

const router = useRouter()
const categories = ref([])
const isSubmitting = ref(false)
const errors = ref({})

const form = ref({
  name_ar: '',
  name_en: '',
  category_id: '',
  description_ar: '',
  description_en: ''
})

const uploadedFiles = ref([])
const imagePreviews = ref([])

const fetchCategories = async () => {
  try {
    const response = await api.get('/project-categories')
    categories.value = response.data?.data || response.data || []
  } catch (err) {
    console.error('Failed to load categories:', err)
  }
}

onMounted(() => {
  fetchCategories()
})

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    uploadedFiles.value.push(file)
    const reader = new FileReader()
    reader.onload = (e) => { imagePreviews.value.push(e.target.result) }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  uploadedFiles.value.splice(index, 1)
  imagePreviews.value.splice(index, 1)
}

const handleSubmit = async () => {
  isSubmitting.value = true
  errors.value = {}

  try {
    const data = new FormData()
    data.append('name_ar', form.value.name_ar)
    data.append('name_en', form.value.name_en)

    // توليد الـ Slug تلقائياً من الاسم بالإنجليزية برمجياً
    const generatedSlug = form.value.name_en
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

    data.append('slug', generatedSlug)

    if (form.value.category_id) {
      data.append('category_id', parseInt(form.value.category_id, 10))
    }
    if (form.value.description_ar) {
      data.append('description_ar', form.value.description_ar)
    }
    if (form.value.description_en) {
      data.append('description_en', form.value.description_en)
    }

    uploadedFiles.value.forEach((file) => {
      data.append('images[]', file)
    })

    await api.post('/projects', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    router.push('/admin/projects')
  } catch (error) {
    if (error.response && error.response.status === 422) {
      errors.value = error.response.data.errors || {}
    } else {
      errors.value = { general: 'An error occurred while saving. Please try again.' }
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
