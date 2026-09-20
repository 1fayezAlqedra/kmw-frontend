<template>
  <div class="w-full mx-auto animate-fade-in box-border bg-[#F8F6F2] min-h-screen p-4 sm:p-6 md:p-8" dir="ltr">

    <!-- Top Header Bar -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-xl md:text-2xl font-bold text-[#2A3439]">Edit Marble Project</h1>
        <p class="text-xs text-[#8C98A4] font-medium mt-1">Update marble specifications, localized text, and manage gallery images</p>
      </div>

      <RouterLink
        to="/admin/projects"
        class="inline-flex items-center justify-center px-5 py-2.5 bg-white hover:bg-[#F3EFEA] text-[#2A3439] border border-[#E5DFD5] text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer self-end sm:self-auto shadow-xs"
      >
        <span class="mr-2 text-sm font-light">←</span> BACK TO PROJECTS
      </RouterLink>
    </div>

    <!-- Main Card Container -->
    <div class="bg-white rounded-2xl border border-[#EAE5DD] shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] w-full overflow-hidden p-6 sm:p-8 md:p-10">

      <!-- Loading State -->
      <div v-if="isLoadingData" class="py-20 flex flex-col items-center justify-center space-y-4">
        <div class="w-8 h-8 border-3 border-[#E2D9CD] border-t-[#8B5A2B] rounded-full animate-spin"></div>
        <p class="text-xs text-[#8C98A4] font-semibold uppercase tracking-widest">Fetching Project Details...</p>
      </div>

      <!-- Form Content -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">

        <!-- Row 1: Project Name (English & Arabic) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col space-y-2">
            <label class="text-xs font-black tracking-wider text-[#7E8B9B]">
              PROJECT NAME <span class="text-[#8B4513] font-normal">(ENGLISH)</span>
            </label>
            <input
              type="text"
              v-model="form.name_en"
              placeholder="e.g., Granite, Marble, Quartz"
              class="w-full px-4 py-3 bg-white border border-[#EAE5DD] rounded-xl text-sm font-medium text-[#2A3439] placeholder-[#BAC2CC] focus:outline-none focus:border-[#C2B5A5] transition-all"
              required
            />
          </div>

          <div class="flex flex-col space-y-2 text-right">
            <label class="text-xs font-black tracking-wider text-[#7E8B9B] font-sans">
              اسم المشروع <span class="text-[#8B4513] font-normal">(باللغة العربية)</span>
            </label>
            <input
              type="text"
              dir="rtl"
              v-model="form.name_ar"
              placeholder="مثال: جرانيت، رخام، كوارترز"
              class="w-full px-4 py-3 bg-white border border-[#EAE5DD] rounded-xl text-sm font-medium text-[#2A3439] placeholder-[#BAC2CC] focus:outline-none focus:border-[#C2B5A5] transition-all font-sans"
              required
            />
          </div>
        </div>

        <!-- Row 2: Category -->
        <div class="flex flex-col space-y-2">
          <label class="text-xs font-black tracking-wider text-[#7E8B9B]">CATEGORY</label>
          <div class="relative">
            <select
              v-model="form.project_category_id"
              class="w-full px-4 py-3 bg-white border border-[#EAE5DD] rounded-xl text-sm font-medium text-[#2A3439] appearance-none cursor-pointer focus:outline-none focus:border-[#C2B5A5] transition-all"
              required
            >
              <option value="" disabled class="text-[#BAC2CC]">Select category...</option>
              <option v-for="cat in projectCategories" :key="cat.id" :value="cat.id">
                {{ cat.name_en || cat.name || `Category #${cat.id}` }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#A0AEC0]">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Row 3: Description (English & Arabic) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col space-y-2">
            <label class="text-xs font-black tracking-wider text-[#7E8B9B]">
              DESCRIPTION <span class="text-[#8B4513] font-normal">(ENGLISH)</span>
            </label>
            <textarea
              v-model="form.description_en"
              rows="4"
              placeholder="e.g., Collection of natural durable igneous rocks suitable for heavy-duty countertops and flooring..."
              class="w-full px-4 py-3 bg-white border border-[#EAE5DD] rounded-xl text-sm font-medium text-[#2A3439] placeholder-[#BAC2CC] focus:outline-none focus:border-[#C2B5A5] transition-all resize-none"
              required
            ></textarea>
          </div>

          <div class="flex flex-col space-y-2 text-right">
            <label class="text-xs font-black tracking-wider text-[#7E8B9B] font-sans">
              الوصف <span class="text-[#8B4513] font-normal">(باللغة العربية)</span>
            </label>
            <textarea
              dir="rtl"
              v-model="form.description_ar"
              rows="4"
              placeholder="مثال: تشكيلة من الصخور الطبيعية الصلبة المقاومة للحرارة والخدش، مثالية للمطابخ والأرضيات الخارجية..."
              class="w-full px-4 py-3 bg-white border border-[#EAE5DD] rounded-xl text-sm font-medium text-[#2A3439] placeholder-[#BAC2CC] focus:outline-none focus:border-[#C2B5A5] transition-all resize-none font-sans"
              required
            ></textarea>
          </div>
        </div>

        <!-- Row 4: Project Images Box -->
        <div class="flex flex-col space-y-3 pt-2">
          <label class="text-xs font-black tracking-wider text-[#7E8B9B]">PROJECT IMAGES</label>

          <!-- Existing Images Grid -->
          <div v-if="existingImages.length > 0" class="mb-2">
            <span class="text-[11px] font-bold text-[#8C98A4] block mb-2">Current Active Images</span>
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              <div
                v-for="img in existingImages"
                :key="img.id"
                class="relative aspect-[4/3] rounded-xl border border-[#EAE5DD] bg-white p-1 shadow-xs group overflow-hidden"
              >
                <img :src="getImageFullUrl(img.image_path)" class="w-full h-full object-cover rounded-lg" @error="handleImageError" />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                  <button
                    type="button"
                    @click="markImageForDeletion(img.id)"
                    class="bg-white text-red-600 p-1.5 rounded-lg shadow-md hover:scale-105 transition cursor-pointer"
                    title="Remove Image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Drag and Drop Upload Area -->
          <div
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            :class="[
              'border-2 border-dashed rounded-2xl py-10 px-4 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer',
              isDragging ? 'border-[#8B5A2B] bg-[#FDFBF7]' : 'border-[#E3DCD1] bg-white hover:border-[#C2B5A5]'
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

            <div class="mb-2 text-2xl">📷</div>
            <p class="text-xs font-bold text-[#4A5568]">
              Click to upload <span class="font-normal text-[#718096]">or drag project images here</span>
            </p>
            <p class="text-[11px] text-[#A0AEC0] mt-1">
              Supports PNG, JPG or WEBP up to 5MB
            </p>
          </div>

          <!-- New Image Previews -->
          <div v-if="newPreviews.length > 0" class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
            <div
              v-for="(url, index) in newPreviews"
              :key="index"
              class="relative aspect-[4/3] rounded-xl border border-[#C2B5A5] bg-[#FDFBF7] p-1 shadow-xs group overflow-hidden"
            >
              <img :src="url" class="w-full h-full object-cover rounded-lg" />
              <span class="absolute top-1.5 left-1.5 bg-[#8B5A2B] text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">New</span>
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                <button
                  type="button"
                  @click.stop="removeNewImage(index)"
                  class="bg-white text-red-600 p-1.5 rounded-lg shadow-md hover:scale-105 transition cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-[#F0EBE1]">
          <RouterLink
            to="/admin/projects"
            class="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-[#F8F6F2] text-[#7E8B9B] border border-[#EAE5DD] text-xs font-bold rounded-xl transition-all duration-200 uppercase text-center"
          >
            Cancel
          </RouterLink>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full sm:w-auto px-8 py-2.5 bg-[#3B2818] hover:bg-[#25190E] text-white text-xs font-bold rounded-xl transition-all duration-200 uppercase text-center cursor-pointer disabled:opacity-50 shadow-xs"
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

const storageBaseUrl = import.meta.env.VITE_STORAGE_URL || 'http://127.0.0.1:8000/storage/'
const fallbackImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>'

const projectCategories = ref([])

const form = ref({
  project_category_id: '',
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
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path

  const cleanBase = storageBaseUrl.endsWith('/') ? storageBaseUrl : `${storageBaseUrl}/`
  const cleanPath = path.startsWith('/') ? path.substring(1) : path

  return `${cleanBase}${cleanPath}`
}

const handleImageError = (e) => {
  e.target.onerror = null
  e.target.src = fallbackImage
}

const fetchProjectCategories = async () => {
  try {
    const res = await api.get('/project-categories')
    if (Array.isArray(res.data)) {
      projectCategories.value = res.data
    } else if (Array.isArray(res.data?.data)) {
      projectCategories.value = res.data.data
    }
  } catch (err) {
    console.error('Failed to fetch project categories:', err)
  }
}

const fetchProjectDetails = async () => {
  isLoadingData.value = true
  try {
    const response = await api.get(`/projects/${projectId}`)
    const project = response.data?.data || response.data

    form.value.project_category_id = project.project_category_id || project.project_category?.id || ''
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

const markImageForDeletion = (imageId) => {
  if (confirm('Are you sure you want to remove this photo?')) {
    deletedImageIds.value.push(imageId)
    existingImages.value = existingImages.value.filter(img => img.id !== imageId)
  }
}

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

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    const data = new FormData()

    data.append('project_category_id', form.value.project_category_id)
    data.append('name_en', form.value.name_en)
    data.append('name_ar', form.value.name_ar)
    data.append('description_en', form.value.description_en)
    data.append('description_ar', form.value.description_ar)

    data.append('_method', 'PUT')

    deletedImageIds.value.forEach((id, index) => {
      data.append(`deleted_images[${index}]`, id)
    })

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
  await Promise.all([
    fetchProjectCategories(),
    fetchProjectDetails()
  ])
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
