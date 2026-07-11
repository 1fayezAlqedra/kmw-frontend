<template>
  <div class="w-full max-w-5xl mx-auto animate-fade-in box-border bg-[#F7F4F0] min-h-screen p-4 sm:p-6 md:p-8"
    dir="ltr">

    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 class="text-xl md:text-2xl font-black text-[#0A1A2F] tracking-tight uppercase">CREATE NEW VIDEO</h3>
        <p class="text-xs text-[#5C728D] font-bold mt-1">Add a main stone video classification (e.g., Marble, Granite,
          Quartz)</p>
      </div>

      <RouterLink to="/admin/videos"
        class="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-white border border-[#EAE3DA] text-xs font-black text-[#0A1A2F] rounded-full transition-all duration-200 hover:bg-[#F7F4F0] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] cursor-pointer whitespace-nowrap">
        <span>← BACK TO DASHBOARD</span>
      </RouterLink>
    </div>

    <div
      class="bg-white rounded-3xl border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] w-full overflow-hidden">

      <form @submit.prevent="handleSubmit" class="p-6 md:p-10 space-y-6 md:space-y-8">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div class="flex flex-col space-y-2">
            <label class="text-[11px] font-black text-[#5C728D] tracking-wider uppercase">
              VIDEO NAME <span class="text-[#A1461D]">(ENGLISH)</span>
            </label>
            <input type="text" v-model="form.title_en" placeholder="e.g., Granite, Marble, Quartz"
              class="w-full px-4 py-3 bg-white border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-sm font-bold text-slate-800 placeholder-slate-300 transition-all duration-300"
              required />
          </div>

          <div class="flex flex-col space-y-2 text-right" dir="rtl">
            <label class="text-[11px] font-black text-[#5C728D] tracking-wider font-sans">
              <span class="text-[#A1461D]">اسم الفيديو</span> (باللغة العربية)
            </label>
            <input type="text" v-model="form.title_ar" placeholder="مثال: جرانيت، رخام، كوارتز، بورسلان"
              class="w-full px-4 py-3 bg-white border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-sm font-bold text-slate-800 placeholder-slate-300 transition-all duration-300 font-sans text-right"
              required />
          </div>
        </div>

        <div class="flex flex-col space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-[11px] font-black text-[#5C728D] tracking-wider uppercase">
              VIDEO LINK / RESOURCE URL <span class="text-[#A1461D]">(AUTO DETECTED PLATFORM)</span>
            </label>

            <transition name="fade">
              <span v-if="detectedPlatform" :class="platformBadgeStyles"
                class="text-[10px] font-black px-2.5 py-1 rounded-md tracking-widest uppercase transition-all duration-300 shadow-sm">
                ⚡ {{ detectedPlatform }} DETECTED
              </span>
            </transition>
          </div>

          <div class="relative">
            <input type="url" v-model="form.video_url"
              placeholder="Paste link from Instagram, YouTube, Facebook, or TikTok..."
              class="w-full px-4 py-3 bg-white border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-sm font-medium text-[#0A1A2F] placeholder-slate-400 transition-all duration-300 pr-12"
              required />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div class="flex flex-col space-y-2">
            <label class="text-[11px] font-black text-[#5C728D] tracking-wider uppercase">
              DESCRIPTION <span class="text-[#A1461D]">(ENGLISH)</span>
            </label>
            <textarea v-model="form.description_en" rows="4"
              placeholder="e.g., Collection of natural durable igneous rocks suitable for heavy-duty countertops and flooring..."
              class="w-full px-4 py-3 bg-white border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-sm font-medium text-slate-700 placeholder-slate-300 transition-all duration-300 resize-none"
              required></textarea>
          </div>

          <div class="flex flex-col space-y-2 text-right" dir="rtl">
            <label class="text-[11px] font-black text-[#5C728D] tracking-wider font-sans">
              <span class="text-[#A1461D]">الوصف</span> (باللغة العربية)
            </label>
            <textarea v-model="form.description_ar" rows="4"
              placeholder="مثال: تشكيلة من الصخور الطبيعية الصلبة المقاومة للحرارة والخدش، مثالية للمطابخ والأرضيات الخارجية..."
              class="w-full px-4 py-3 bg-white border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-sm font-medium text-slate-700 placeholder-slate-300 transition-all duration-300 resize-none font-sans text-right"
              required></textarea>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#EAE3DA]/60">
          <RouterLink to="/admin/videos"
            class="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F7F4F0] text-slate-500 border border-[#EAE3DA] text-xs font-black rounded-xl transition-all duration-200 uppercase tracking-widest text-center">
            Cancel
          </RouterLink>

          <button type="submit" :disabled="isSubmitting"
            class="w-full sm:w-auto px-8 py-3 bg-[#A1461D] hover:bg-amber-950 text-white text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-widest text-center cursor-pointer disabled:opacity-50 shadow-sm">
            {{ isSubmitting ? 'Publishing...' : 'Publish Video Asset' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)

const form = ref({
  title_en: '',
  title_ar: '',
  video_url: '',
  description_en: '',
  description_ar: ''
})

const detectedPlatform = computed(() => {
  const url = form.value.video_url.toLowerCase().trim()
  if (!url) return null

  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
  if (url.includes('instagram.com')) return 'instagram'
  if (url.includes('facebook.com') || url.includes('fb.watch')) return 'facebook'
  if (url.includes('tiktok.com')) return 'tiktok'

  return 'unknown'
})

const platformBadgeStyles = computed(() => {
  switch (detectedPlatform.value) {
    case 'youtube':
      return 'bg-red-50 text-red-600 border border-red-200'
    case 'instagram':
      return 'bg-pink-50 text-pink-600 border border-pink-200'
    case 'facebook':
      return 'bg-blue-50 text-blue-600 border border-blue-200'
    case 'tiktok':
      return 'bg-slate-900 text-teal-400 border border-slate-800'
    case 'unknown':
      return 'bg-amber-50 text-[#A1461D] border border-amber-200'
    default:
      return ''
  }
})

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    const data = new FormData()
    data.append('title_en', form.value.title_en)
    data.append('title_ar', form.value.title_ar)
    data.append('video_url', form.value.video_url)
    data.append('platform', detectedPlatform.value || 'unknown')
    data.append('description_en', form.value.description_en)
    data.append('description_ar', form.value.description_ar)

    console.log('FormData Payload Synced:', Object.fromEntries(data))

    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/admin/videos')
  } catch (error) {
    console.error(error)
  } finally {
    isSubmitting.value = false
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
  animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Animation to linke website  */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-4px);
}
</style>
