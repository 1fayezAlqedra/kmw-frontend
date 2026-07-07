<template>
  <div class="w-full mx-auto animate-fade-in box-border bg-[#F7F4F0] min-h-screen p-4 sm:p-6 md:p-8" dir="ltr">

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

    <div class="bg-white rounded-2xl border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] w-full overflow-hidden">

      <div v-if="isLoadingData" class="p-20 flex flex-col items-center justify-center space-y-4">
        <div class="w-8 h-8 border-4 border-[#E2D9CD] border-t-amber-950 rounded-full animate-spin"></div>
        <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">Fetching Project Details...</p>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="p-5 md:p-8 space-y-6 md:space-y-8" enctype="multipart/form-data">

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

        <div class="flex flex-col space-y-2">
          <label class="text-xs font-black text-slate-400 uppercase tracking-wider">Showcase Video URL (Optional)</label>
          <input
            type="url"
            v-model="form.video_url"
            class="w-full px-4 py-3 bg-[#F7F4F0]/50 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-sm font-medium text-slate-800 transition-all duration-300"
          />
        </div>

        <div class="bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-2xl p-4 sm:p-6 md:p-8 space-y-6">
          <div>
            <h5 class="text-sm md:text-base font-black text-slate-900 uppercase tracking-wide">Project Images Album</h5>
            <p class="text-xs text-slate-400 font-bold mt-0.5">Manage existing photos or inject new ones to the collection</p>
          </div>

          <div v-if="existingImages.length > 0" class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Active Gallery Photos</label>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div
                v-for="img in existingImages"
                :key="img.id"
                class="relative aspect-[4/3] rounded-xl border border-[#EAE3DA] bg-white p-1.5 shadow-xs group overflow-hidden"
              >
                <img :src="img.image_path" class="w-full h-full object-cover rounded-lg" />
                <div class="absolute inset-0 bg-amber-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                  <button
                    type="button"
                    @click="removeExistingImage(img.id)"
                    class="bg-white text-red-600 p-2 rounded-xl shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
                    title="Delete permanently from server"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

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

const router = useRouter()
const route = useRoute()

const isLoadingData = ref(true)
const isSubmitting = ref(false)
const isDragging = ref(false)

const projectId = route.params.id

const form = ref({
  name_en: '',
  name_ar: '',
  description_en: '',
  description_ar: '',
  video_url: ''
})

const existingImages = ref([])
const newFiles = ref([])
const newPreviews = ref([])

const fetchProjectDetails = async () => {
  isLoadingData.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 800))

    const mockData = {
      id: projectId,
      name_en: 'Imperial Statuario Penthouse',
      name_ar: 'بنتهاوس رخام ستاتواريو الإمبراطوري',
      description_en: 'Full floor vein matching design layout with custom bookmatch integration.',
      description_ar: 'تصميم أرضيات متناسق العروق مع دمج لوحات رخامية متطابقة بالكامل.',
      video_url: 'https://youtube.com/watch?v=KMW123',
      images: [
        { id: 101, image_path: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
        { id: 102, image_path: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80' }
      ]
    }

    form.value.name_en = mockData.name_en
    form.value.name_ar = mockData.name_ar
    form.value.description_en = mockData.description_en
    form.value.description_ar = mockData.description_ar
    form.value.video_url = mockData.video_url

    existingImages.value = [...mockData.images]

  } catch (error) {
    console.error('Failed to resolve project assets:', error)
  } finally {
    isLoadingData.value = false
  }
}

const removeExistingImage = async (imageId) => {
  if (confirm('Are you sure you want to delete this photo permanently from the database?')) {
    try {
      existingImages.value = existingImages.value.filter(img => img.id !== imageId)
    } catch (error) {
      console.error(error)
    }
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

    data.append('name_en', form.value.name_en)
    data.append('name_ar', form.value.name_ar)
    data.append('description_en', form.value.description_en)
    data.append('description_ar', form.value.description_ar)

    if (form.value.video_url) {
      data.append('video_url', form.value.video_url)
    }

    data.append('_method', 'PUT')

    newFiles.value.forEach((file, index) => {
      data.append(`images[${index}]`, file)
    })

    console.log('Sending Update FormData via Method Spoofing:', data)

    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/admin/projects')
  } catch (error) {
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchProjectDetails()
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
