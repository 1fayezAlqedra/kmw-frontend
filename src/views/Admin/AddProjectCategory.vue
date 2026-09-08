<template>
  <div class="w-full mx-auto animate-fade-in box-border bg-[#F7F4F0] min-h-screen p-4 sm:p-6 md:p-8" dir="ltr">

    <!-- Header & Back Button -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h4 class="text-lg md:text-xl font-black text-slate-900 tracking-wide uppercase">ADD NEW PROJECT CATEGORY</h4>
        <p class="text-xs text-slate-400 font-bold mt-1">Create a new category classification for marble projects showcase</p>
      </div>

      <RouterLink
        to="/admin/project-categories"
        class="inline-flex items-center justify-center px-6 py-2.5 bg-white hover:bg-[#F7F4F0] text-slate-900 border border-[#EAE3DA]/70 text-xs font-black rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.02)] transition-all duration-300 uppercase tracking-wider cursor-pointer self-start sm:self-auto"
      >
        <span class="mr-1.5 text-sm font-light">←</span> BACK TO CATEGORIES
      </RouterLink>
    </div>

    <!-- Form Container -->
    <div class="bg-white rounded-2xl border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] w-full overflow-hidden">
      <form @submit.prevent="handleSubmit" class="p-5 md:p-8 space-y-6 md:space-y-8" enctype="multipart/form-data">

        <!-- Validation Errors Banner -->
        <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold">
          {{ errorMessage }}
        </div>

        <!-- Names Section (Ar & En) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div class="flex flex-col space-y-2" dir="ltr">
            <label class="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              CATEGORY NAME (ENGLISH) <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              v-model="form.name_en"
              placeholder="e.g. Flooring & Wall Cladding"
              class="w-full px-4 py-3 bg-[#F7F4F0]/50 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-sm font-bold text-slate-800 transition-all duration-300 text-left placeholder:text-slate-400 placeholder:font-normal"
              required
            />
          </div>

          <div class="flex flex-col space-y-2" dir="rtl">
            <label class="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              اسم التصنيف (بالعربية) <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              v-model="form.name_ar"
              placeholder="مثال: الأرضيات وتكسية الجدران"
              class="w-full px-4 py-3 bg-[#F7F4F0]/50 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-sm font-bold text-slate-800 transition-all duration-300 placeholder:text-slate-400 placeholder:font-normal"
              required
            />
          </div>
        </div>

        <!-- Descriptions Section (Ar & En) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div class="flex flex-col space-y-2" dir="ltr">
            <label class="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              DESCRIPTION (ENGLISH) <span class="text-slate-300">(OPTIONAL)</span>
            </label>
            <textarea
              v-model="form.description_en"
              rows="4"
              placeholder="Brief description about this project category..."
              class="w-full px-4 py-3 bg-[#F7F4F0]/50 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-sm font-medium text-slate-800 transition-all duration-300 resize-none text-left placeholder:text-slate-400"
            ></textarea>
          </div>

          <div class="flex flex-col space-y-2" dir="rtl">
            <label class="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              وصف التصنيف (بالعربية) <span class="text-slate-300">(اختياري)</span>
            </label>
            <textarea
              v-model="form.description_ar"
              rows="4"
              placeholder="وصف مختصر لمجال المشاريع المندرجة تحت هذا التصنيف..."
              class="w-full px-4 py-3 bg-[#F7F4F0]/50 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-sm font-medium text-slate-800 transition-all duration-300 resize-none placeholder:text-slate-400"
            ></textarea>
          </div>
        </div>

        <!-- Category Cover Image Upload Zone -->
        <div class="bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-2xl p-4 sm:p-6 md:p-8 space-y-6" dir="ltr">
          <div>
            <h5 class="text-xs md:text-sm font-black text-slate-900 uppercase tracking-wide">CATEGORY IMAGE / COVER</h5>
            <p class="text-[11px] text-slate-400 font-bold mt-0.5">Upload a cover image representing this marble category</p>
          </div>

          <div
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            :class="[
              'border-2 border-dashed rounded-xl p-8 md:p-12 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer',
              isDragging ? 'border-amber-900 bg-amber-50/50' : 'border-[#EAE3DA] bg-white hover:border-[#E2D9CD]'
            ]"
            @click="$refs.fileInput.click()"
          >
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />

            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <p class="text-xs font-black text-slate-700 uppercase tracking-wider">
              DRAG & DROP CATEGORY IMAGE OR <span class="text-[#8B5E1A] underline cursor-pointer">BROWSE</span>
            </p>
            <p class="text-[10px] text-slate-400 font-bold mt-1">Supports PNG, JPG, WEBP formats</p>
          </div>

          <!-- Preview -->
          <div v-if="imagePreview" class="relative w-40 aspect-[4/3] rounded-xl border border-[#EAE3DA] bg-white p-1.5 shadow-xs group overflow-hidden">
            <img :src="imagePreview" class="w-full h-full object-cover rounded-lg" />
            <div class="absolute inset-0 bg-amber-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
              <button
                type="button"
                @click.stop="removeImage"
                class="bg-white text-red-600 p-2 rounded-xl shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Submit Buttons Bar -->
        <div class="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#EAE3DA]/60" dir="ltr">
          <RouterLink
            to="/admin/project-categories"
            class="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-[#F7F4F0] text-slate-500 border border-[#EAE3DA] text-[11px] font-black rounded-full transition-all duration-200 uppercase tracking-widest text-center"
          >
            CANCEL
          </RouterLink>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full sm:w-auto px-8 py-2.5 bg-[#F7F4F0] hover:bg-[#8B5E1A] hover:text-white text-[#8B5E1A] border border-[#E2D9CD] text-[11px] font-black rounded-full transition-all duration-300 uppercase tracking-widest text-center cursor-pointer disabled:opacity-50"
          >
            {{ isSubmitting ? 'SAVING...' : 'SAVE CATEGORY' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api/api'

const router = useRouter()
const isSubmitting = ref(false)
const isDragging = ref(false)
const errorMessage = ref('')

const form = ref({
  name_en: '',
  name_ar: '',
  description_en: '',
  description_ar: ''
})

const coverFile = ref(null)
const imagePreview = ref(null)

// Drag & Drop handlers
const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (file && file.type.startsWith('image/')) {
    setFile(file)
  }
}

const handleDrop = (e) => {
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    setFile(file)
  }
}

const setFile = (file) => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
  coverFile.value = file
  imagePreview.value = URL.createObjectURL(file)
}

const removeImage = () => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
  coverFile.value = null
  imagePreview.value = null
}

// Submit Form to project-categories API endpoint
const handleSubmit = async () => {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const data = new FormData()
    data.append('name_en', form.value.name_en)
    data.append('name_ar', form.value.name_ar)

    if (form.value.description_en) {
      data.append('description_en', form.value.description_en)
    }
    if (form.value.description_ar) {
      data.append('description_ar', form.value.description_ar)
    }
    if (coverFile.value) {
      data.append('image', coverFile.value)
    }

    // جلب التوكن من الموضع المخزن فيه
    const token = localStorage.getItem('token') || localStorage.getItem('access_token')

    const response = await apiClient.post('project-categories', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token ? `Bearer ${token}` : '',
        'Accept': 'application/json'
      }
    })

    if (response.data && (response.data.success || response.status === 201 || response.status === 200)) {
      router.push('/admin/project-categories')
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Unauthenticated session. Please log in again.'
    } else if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors
      const firstErrorKey = Object.keys(errors)[0]
      errorMessage.value = errors[firstErrorKey][0] || 'Please fix the validation errors.'
    } else {
      console.error('Error creating category:', error)
      errorMessage.value = 'Failed to create category. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
}
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
