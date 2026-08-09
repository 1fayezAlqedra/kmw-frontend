<template>
  <!-- حاوية الصفحة متزنة في المنتصف ومطابقة للـ DNA اللوني -->
  <div class="w-full max-w-5xl mx-auto animate-fade-in box-border bg-[#F7F4F0] min-h-screen p-4 sm:p-6 md:p-8" dir="ltr">

    <!-- Navigation Block (Header & Back) -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 class="text-xl md:text-2xl font-black text-[#0A1A2F] tracking-tight uppercase">EDIT VIDEO ASSET</h3>
        <p class="text-xs text-[#5C728D] font-bold mt-1">Modify video record fields, streaming source or localization titles (#{{ videoId }})</p>
      </div>

      <!-- زر العودة الدائري الكامل BACK TO DASHBOARD -->
      <RouterLink
        :to="{ name: 'ShowVideos' }"
        class="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-white border border-[#EAE3DA] text-xs font-black text-[#0A1A2F] rounded-full transition-all duration-200 hover:bg-[#F7F4F0] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] cursor-pointer whitespace-nowrap"
      >
        <span>← BACK TO DASHBOARD</span>
      </RouterLink>
    </div>

    <!-- Main White Canvas Form Container -->
    <div class="bg-white rounded-3xl border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] w-full overflow-hidden relative">

      <!-- Loading State Overlay -->
      <div v-if="isLoading" class="p-16 text-center text-slate-400">
        <div class="w-8 h-8 border-2 border-[#A1461D] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <span class="text-xs font-bold text-[#0A1A2F]">Fetching video data for ID #{{ videoId }}...</span>
      </div>

      <!-- Form Content -->
      <form v-else @submit.prevent="handleUpdate" class="p-6 md:p-10 space-y-6 md:space-y-8">

        <!-- ROW 1: Video Titles (EN / AR) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <!-- Video Title EN -->
          <div class="flex flex-col space-y-2">
            <label class="text-[11px] font-black text-[#5C728D] tracking-wider uppercase">
              VIDEO NAME <span class="text-[#A1461D]">(ENGLISH)</span>
            </label>
            <input
              type="text"
              v-model="form.title_en"
              placeholder="e.g., Granite, Marble, Quartz"
              class="w-full px-4 py-3 bg-white border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-sm font-bold text-slate-800 placeholder-slate-300 transition-all duration-300"
              required
            />
          </div>

          <!-- Video Title AR (RTL) -->
          <div class="flex flex-col space-y-2 text-right" dir="rtl">
            <label class="text-[11px] font-black text-[#5C728D] tracking-wider font-sans">
              <span class="text-[#A1461D]">اسم الفيديو</span> (باللغة العربية)
            </label>
            <input
              type="text"
              v-model="form.title_ar"
              placeholder="مثال: جرانيت، رخام، كوارتز، بورسلان"
              class="w-full px-4 py-3 bg-white border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-sm font-bold text-slate-800 placeholder-slate-300 transition-all duration-300 font-sans text-right"
              required
            />
          </div>
        </div>

        <!-- ROW 2: YouTube Link Field -->
        <div class="flex flex-col space-y-2">
          <label class="text-[11px] font-black text-[#5C728D] tracking-wider uppercase">
            VIDEO PLATFORM SOURCE <span class="text-[#A1461D]">(ASSIGN MAIN BELONGING)</span>
          </label>
          <input
            type="url"
            v-model="form.youtube_url"
            placeholder="Select or paste the youtube resource for this video asset"
            class="w-full px-4 py-3 bg-white border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-sm font-medium text-[#0A1A2F] placeholder-slate-400 transition-all duration-300"
            required
          />
        </div>

        <!-- ROW 3: Video Descriptions (EN / AR) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <!-- Description EN -->
          <div class="flex flex-col space-y-2">
            <label class="text-[11px] font-black text-[#5C728D] tracking-wider uppercase">
              DESCRIPTION <span class="text-[#A1461D]">(ENGLISH)</span>
            </label>
            <textarea
              v-model="form.description_en"
              rows="4"
              placeholder="e.g., Collection of natural durable igneous rocks suitable for heavy-duty countertops and flooring..."
              class="w-full px-4 py-3 bg-white border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-sm font-medium text-slate-600 transition-all duration-300 resize-none"
              required
            ></textarea>
          </div>

          <!-- Description AR (RTL) -->
          <div class="flex flex-col space-y-2 text-right" dir="rtl">
            <label class="text-[11px] font-black text-[#5C728D] tracking-wider font-sans">
              <span class="text-[#A1461D]">الوصف</span> (باللغة العربية)
            </label>
            <textarea
              v-model="form.description_ar"
              rows="4"
              placeholder="مثال: تشكيلة من الصخور الطبيعية الصلبة المقاومة للحرارة والخدش، مثالية للمطابخ والأرضيات الخارجية..."
              class="w-full px-4 py-3 bg-white border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-sm font-medium text-slate-600 transition-all duration-300 resize-none font-sans text-right"
              required
            ></textarea>
          </div>
        </div>

        <!-- ROW 4: Action Control Buttons Container -->
        <div class="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#EAE3DA]/60">
          <RouterLink
            :to="{ name: 'ShowVideos' }"
            class="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F7F4F0] text-slate-500 border border-[#EAE3DA] text-xs font-black rounded-xl transition-all duration-200 uppercase tracking-widest text-center"
          >
            Cancel
          </RouterLink>

          <!-- زر التحديث والحفظ -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full sm:w-auto px-8 py-3 bg-[#A1461D] hover:bg-amber-950 text-white text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-widest text-center cursor-pointer disabled:opacity-50 shadow-sm"
          >
            {{ isSubmitting ? 'Updating...' : 'Save Changes' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiClient from '@/api/api'

const router = useRouter()
const route = useRoute()

const videoId = route.params.id
const isLoading = ref(true)
const isSubmitting = ref(false)

const form = ref({
  title_en: '',
  title_ar: '',
  youtube_url: '',
  description_en: '',
  description_ar: ''
})

// جلب بيانات الفيديو الحقيقية من الـ API بـ ID الفيديو
const fetchVideoDetails = async () => {
  if (!videoId) {
    console.error('Video ID is missing!')
    router.push({ name: 'ShowVideos' })
    return
  }

  isLoading.value = true
  try {
    const response = await apiClient.get(`/videos/${videoId}`)
    const videoData = response.data.data || response.data

    // تعبئة النموذج بالبيانات القادمة من الباك إيند
    form.value = {
      title_en: videoData.title_en || '',
      title_ar: videoData.title_ar || '',
      youtube_url: videoData.youtube_url || '',
      description_en: videoData.description_en || '',
      description_ar: videoData.description_ar || ''
    }
  } catch (error) {
    console.error('Failed to fetch video details:', error)
    alert('Failed to load video data from server.')
    router.push({ name: 'ShowVideos' })
  } finally {
    isLoading.value = false
  }
}

const handleUpdate = async () => {
  isSubmitting.value = true
  try {
    // إرسال التحديث الحقيقي لـ Laravel API
    await apiClient.put(`/videos/${videoId}`, form.value)
    router.push({ name: 'ShowVideos' })
  } catch (error) {
    console.error('Error updating video:', error)
    alert('Failed to save changes. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchVideoDetails()
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
