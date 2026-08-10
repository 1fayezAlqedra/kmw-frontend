<template>
  <div class="w-full mx-auto animate-fade-in box-border bg-[#F7F4F0] min-h-screen p-4 sm:p-6 md:p-8" dir="ltr">

    <!-- Top Action Bar -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h4 class="text-lg md:text-2xl font-black text-slate-900 tracking-wide uppercase">Edit Marble Project</h4>
        <p class="text-xs text-slate-400 font-bold mt-1">Update marble specifications, localized text, and manage gallery images</p>
      </div>

      <RouterLink
        to="/admin/projects"
        class="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-[#F7F4F0] text-slate-900 border border-[#EAE3DA]/70 text-xs font-black rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.02)] transition-all duration-300 uppercase tracking-wider cursor-pointer self-end sm:self-auto"
      >
        <span class="mr-1.5 text-sm font-light">←</span> BACK TO PROJECTS
      </RouterLink>
    </div>

    <!-- Form Container -->
    <div class="bg-white rounded-2xl border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] w-full overflow-hidden">

      <!-- Loading State -->
      <div v-if="isLoadingData" class="p-20 flex flex-col items-center justify-center space-y-4">
        <div class="w-8 h-8 border-4 border-[#E2D9CD] border-t-amber-950 rounded-full animate-spin"></div>
        <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">Fetching Project Details...</p>
      </div>

      <!-- Main Form -->
      <form v-else @submit.prevent="handleSubmit" class="p-5 md:p-8 space-y-6 md:space-y-8" enctype="multipart/form-data">

        <!-- Category Selection -->
        <div class="flex flex-col space-y-2">
          <label class="text-xs font-black text-slate-400 uppercase tracking-wider">Project Category <span class="text-red-500">*</span></label>
          <div class="relative">
            <select
              v-model="form.category_id"
              class="w-full px-4 py-3 bg-[#F7F4F0]/50 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-sm font-bold text-slate-800 transition-all duration-300 appearance-none cursor-pointer"
              required
            >
              <option value="" disabled>Select Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name_en || cat.name || `Category #${cat.id}` }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
              ▼
            </div>
          </div>
        </div>

        <!-- Titles Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div class="flex flex-col space-y-2">
            <label class="text-xs font-black text-slate-400 uppercase tracking-wider">Project Title (English) <span class="text-red-500">*</span></label>
            <input
              type="text"
              v-model="form.name_en"
              class="w-full px-4 py-3 bg-[#F7F4F0]/50 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-sm font-bold text-slate-800 transition-all duration-300"
              required
            />
          </div>

          <div class="flex flex-col space-y-2 text-right" dir="rtl">
            <label class="text-xs font-black text-slate-400 uppercase tracking-wider font-sans">اسم المشروع (بالعربية) <span class="text-red-500">*</span></label>
            <input
              type="text"
              v-model="form.name_ar"
              class="w-full px-4 py-3 bg-[#F7F4F0]/50 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-sm font-bold text-slate-800 transition-all duration-300 font-sans"
              required
            />
          </div>
        </div>

        <!-- Descriptions Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div class="flex flex-col space-y-2">
            <label class="text-xs font-black text-slate-400 uppercase tracking-wider">Description (English) <span class="text-red-500">*</span></label>
            <textarea
              v-model="form.description_en"
              rows="4"
              class="w-full px-4 py-3 bg-[#F7F4F0]/50 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-sm font-medium text-slate-800 transition-all duration-300 resize-none"
              required
            ></textarea>
          </div>

          <div class="flex flex-col space-y-2 text-right" dir="rtl">
            <label class="text-xs font-black text-slate-400 uppercase tracking-wider font-sans">وصف المشروع (بالعربية) <span class="text-red-500">*</span></label>
            <textarea
              v-model="form.description_ar"
              rows="4"
              class="w-full px-4 py-3 bg-[#F7F4F0]/50 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-sm font-medium text-slate-800 transition-all duration-300 resize-none font-sans"
              required
            ></textarea>
          </div>
        </div>

        <!-- Media Gallery Box -->
        <div class="bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-2xl p-4 sm:p-6 md:p-8 space-y-6">
          <div>
            <h5 class="text-sm md:text-base font-black text-slate-900 uppercase tracking-wide">Project Images Album</h5>
            <p class="text-xs text-slate-400 font-bold mt-0.5">Manage existing photos or inject new ones to the collection</p>
          </div>

          <!-- Existing Images Grid -->
          <div v-if="existingImages.length > 0" class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Active Gallery Photos</label>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div
                v-for="img in existingImages"
                :key="img.id"
                class="relative aspect-[4/3] rounded-xl border border-[#EAE3DA] bg-white p-1.5 shadow-xs group overflow-hidden"
              >
                <img :src="getImageFullUrl(img.image_path)" class="w-full h-full object-cover rounded-lg" @error="handleImageError" />
                <div class="absolute inset-0 bg-amber-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                  <button
                    type="button"
                    @click="markImageForDeletion(img.id)"
                    class="bg-white text-red-600 p-2 rounded-xl shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
                    title="Remove Image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- File Upload Zone for New Images -->
          <div class="space-y-2">
            <label class="text-[10px] font-black text-amber-900 uppercase tracking-widest block">Upload New Photos Bundle</label>
            <div
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleDrop"
              :class="[
                'border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer',
                isDragging ? 'border-amber-950 bg-amber-50/50' : 'border-[#EAE3DA] bg-white hover:border-[#E2D9CD]'
              ]"
              @click="$refs.fileInput.click()"
            >
              <input
                type="file"
                ref="fileInput"
                multiple
                accept="image/*"
                class="hidden"
                @change="handleFileSelect"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-xs font-black text-slate-700 uppercase tracking-wider">Queue new files here or <span class="text-amber-800 underline">Browse</span></p>
            </div>
          </div>

          <!-- Previews for Newly Queued Images -->
          <div v-if="newPreviews.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
            <div
              v-for="(url, index) in newPreviews"
              :key="index"
              class="relative aspect-[4/3] rounded-xl border border-amber-900/30 bg-amber-50/20 p-1.5 shadow-xs group overflow-hidden"
            >
              <img :src="url" class="w-full h-full object-cover rounded-lg" />
              <span class="absolute top-2 left-2 bg-amber-950 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">New</span>
              <div class="absolute inset-0 bg-amber-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                <button
                  type="button"
                  @click.stop="removeNewImage(index)"
                  class="bg-white text-red-600 p-2 rounded-xl shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Action Controls -->
        <div class="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#EAE3DA]/60">
          <RouterLink
            to="/admin/projects"
            class="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F7F4F0] text-slate-500 border border-[#EAE3DA] text-xs font-black rounded-xl transition-all duration-200 uppercase tracking-widest text-center"
          >
            Cancel
          </RouterLink>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full sm:w-auto px-8 py-3 bg-[#F7F4F0] hover:bg-amber-950 hover:text-white text-amber-900 border border-[#E2D9CD] text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-widest text-center cursor-pointer disabled:opacity-50"
          >
            {{ isSubmitting ? 'Saving Changes...' : 'Save Changes' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/api/api'

const router = useRouter()
const route = useRoute()

const isLoadingData = ref(true)
const isSubmitting = ref(false)
const isDragging = ref(false)

const projectId = route.params.id

const storageBaseUrl = 'http://127.0.0.1:8000/storage/'
const fallbackImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>'

const categories = ref([])

const form = ref({
  category_id: '',
  name_en: '',
  name_ar: '',
  description_en: '',
  description_ar: ''
})

const existingImages = ref([])
const deletedImageIds = ref([])
const newFiles = ref([])
const newPreviews = ref([])

const getImageFullUrl = (path) => {
  if (!path) return fallbackImage
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${storageBaseUrl}${path}`
}

const handleImageError = (e) => {
  e.target.src = fallbackImage
}

// جلب الأقسام لتعبئة الـ Dropdown
const fetchCategories = async () => {
  try {
    const res = await api.get('/categories')
    categories.value = res.data?.data || res.data
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
}

// جلب تفاصيل المشروع
const fetchProjectDetails = async () => {
  isLoadingData.value = true
  try {
    const response = await api.get(`/projects/${projectId}`)
    const project = response.data?.data || response.data

    form.value.category_id = project.category_id || project.category?.id || ''
    form.value.name_en = project.name_en || ''
    form.value.name_ar = project.name_ar || ''
    form.value.description_en = project.description_en || ''
    form.value.description_ar = project.description_ar || ''

    existingImages.value = project.images || []
  } catch (error) {
    console.error('Failed to fetch project details:', error)
    alert(error.response?.data?.message || 'Failed to fetch project details.')
    router.push('/admin/projects')
  } finally {
    isLoadingData.value = false
  }
}

// التجهيز لحذف الصورة السيرفرية
const markImageForDeletion = (imageId) => {
  if (confirm('Are you sure you want to remove this photo?')) {
    deletedImageIds.value.push(imageId)
    existingImages.value = existingImages.value.filter(img => img.id !== imageId)
  }
}

// إداريات الرفع الجديد
const handleFileSelect = (e) => { addFiles(e.target.files) }
const handleDrop = (e) => { isDragging.value = false; addFiles(e.dataTransfer.files) }

const addFiles = (files) => {
  Array.from(files).forEach(file => {
    if (file.type.startsWith('image/')) {
      newFiles.value.push(file)
      newPreviews.value.push(URL.createObjectURL(file))
    }
  })
}

const removeNewImage = (index) => {
  URL.revokeObjectURL(newPreviews.value[index])
  newFiles.value.splice(index, 1)
  newPreviews.value.splice(index, 1)
}

// حفظ التعديلات وإرسال البيانات
const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    const data = new FormData()

    data.append('category_id', form.value.category_id)
    data.append('name_en', form.value.name_en)
    data.append('name_ar', form.value.name_ar)
    data.append('description_en', form.value.description_en)
    data.append('description_ar', form.value.description_ar)

    // Method Spoofing لارافل
    data.append('_method', 'PUT')

    // إرسال معرفات الصور المراد حذفها من السيرفر
    deletedImageIds.value.forEach((id, index) => {
      data.append(`deleted_images[${index}]`, id)
    })

    // إرفاق الصور الجديده
    newFiles.value.forEach((file, index) => {
      data.append(`images[${index}]`, file)
    })

    await api.post(`/projects/${projectId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    router.push('/admin/projects')
  } catch (error) {
    console.error('Error updating project:', error)
    alert(error.response?.data?.message || 'Failed to save project updates.')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  await fetchCategories()
  await fetchProjectDetails()
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
