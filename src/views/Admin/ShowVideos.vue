<template>
  <div class="w-full mx-auto bg-[#FBF9F6] min-h-screen p-4 sm:p-6 md:p-8 font-sans selection:bg-amber-900 selection:text-white" dir="ltr">

    <!-- 1. Top Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Total Videos Card -->
      <div class="bg-white border border-[#EAE3DA]/80 rounded-2xl p-6 flex items-center space-x-4 shadow-[0_4px_20px_-4px_rgba(139,92,26,0.03)]">
        <div class="w-12 h-12 bg-[#FBF9F6] border border-[#EAE3DA] rounded-xl flex items-center justify-center text-[#8A5C22]">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <span class="block text-[10px] font-black text-slate-400 tracking-wider uppercase">Total Video Clips</span>
          <span class="block text-2xl font-black text-slate-900 mt-0.5">{{ videos.length }} <span class="text-xs text-slate-400 font-bold ml-1">Clips</span></span>
        </div>
      </div>

      <!-- Active Status Card -->
      <div class="bg-white border border-[#EAE3DA]/80 rounded-2xl p-6 flex items-center space-x-4 shadow-[0_4px_20px_-4px_rgba(139,92,26,0.03)]">
        <div class="w-12 h-12 bg-[#FDF9F3] border border-[#F5E6D8] rounded-xl flex items-center justify-center text-[#8A5C22]">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0" />
          </svg>
        </div>
        <div>
          <span class="block text-[10px] font-black text-slate-400 tracking-wider uppercase">Library Status</span>
          <span class="block text-2xl font-black text-[#8A5C22] mt-0.5">Active</span>
        </div>
      </div>

      <!-- Source Sync Card -->
      <div class="bg-white border border-[#EAE3DA]/80 rounded-2xl p-6 flex items-center space-x-4 shadow-[0_4px_20px_-4px_rgba(139,92,26,0.03)]">
        <div class="w-12 h-12 bg-[#FBF9F6] border border-[#EAE3DA] rounded-xl flex items-center justify-center text-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <span class="block text-[10px] font-black text-slate-400 tracking-wider uppercase">Integration</span>
          <span class="block text-2xl font-black text-slate-900 mt-0.5">YouTube</span>
        </div>
      </div>
    </div>

    <!-- 2. Main Catalog Canvas -->
    <div class="bg-white border border-[#EAE3DA]/80 rounded-3xl shadow-[0_4px_25px_-5px_rgba(139,92,26,0.03)] overflow-hidden">

      <!-- Catalog Header Bar -->
      <div class="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#F7F4F0]">
        <div>
          <h3 class="text-xl font-black text-slate-900 tracking-tight uppercase">Video Showcase Library</h3>
          <p class="text-xs text-slate-400 font-medium mt-1">Manage embedded YouTube video highlights and descriptions</p>
        </div>

        <div class="flex items-center gap-3 self-end sm:self-center w-full sm:w-auto">
          <!-- Live Search -->
          <div class="relative flex-1 sm:w-64">
            <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search video name..."
              class="w-full pl-9 pr-4 py-2.5 bg-[#FBF9F6] border border-[#EAE3DA] text-xs font-semibold rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-amber-900/40 transition-colors"
            />
          </div>

          <!-- Add Button (تم التعديل لاستخدام اسم المسار الصحيح) -->
          <RouterLink
            :to="{ name: 'AddVideo' }"
            class="px-5 py-2.5 bg-[#FDF9F3] border border-[#F0E6D8] hover:bg-amber-950 hover:text-white text-[#8A5C22] text-xs font-black rounded-xl transition-all duration-200 uppercase tracking-wider shadow-xs whitespace-nowrap cursor-pointer"
          >
            + Add Video
          </RouterLink>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="p-12 text-center text-slate-400">
        <div class="w-8 h-8 border-2 border-[#8A5C22] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <span class="text-xs font-medium">Loading video library...</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredVideos.length === 0" class="p-12 text-center text-slate-400">
        <p class="text-sm font-bold text-slate-700">No video assets found</p>
        <p class="text-xs mt-1">Try adjusting your search query or add a new video.</p>
      </div>

      <!-- Desktop Table View -->
      <div v-else class="w-full overflow-x-auto hidden md:block">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#FBF9F6]/50 border-b border-[#EAE3DA]/60">
              <th class="p-4 pl-8 text-[11px] font-black text-slate-400 uppercase tracking-wider w-20">ID</th>
              <th class="p-4 text-[11px] font-black text-slate-400 uppercase tracking-wider w-28">Preview</th>
              <th class="p-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Video Info (EN)</th>
              <th class="p-4 text-[11px] font-black text-slate-400 uppercase tracking-wider text-right" dir="rtl">بيانات الفيديو (AR)</th>
              <th class="p-4 text-[11px] font-black text-slate-400 uppercase tracking-wider text-center w-36">Platform</th>
              <th class="p-4 pr-8 text-[11px] font-black text-slate-400 uppercase tracking-wider text-right w-28">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#EAE3DA]/40">
            <tr v-for="video in filteredVideos" :key="video.id" class="hover:bg-[#FBF9F6]/40 transition-colors duration-150">

              <!-- ID -->
              <td class="p-4 pl-8 text-xs font-bold text-slate-400 align-middle">
                #{{ video.id }}
              </td>

              <!-- Thumbnail -->
              <td class="p-4 align-middle">
                <a
                  :href="video.youtube_url"
                  target="_blank"
                  class="block w-20 aspect-video bg-slate-900 rounded-xl overflow-hidden border border-[#EAE3DA] relative group cursor-pointer shadow-xs transition-transform duration-200 hover:scale-105"
                  title="Watch on YouTube"
                >
                  <img
                    v-if="getYoutubeId(video.youtube_url)"
                    :src="`https://img.youtube.com/vi/${getYoutubeId(video.youtube_url)}/mqdefault.jpg`"
                    class="w-full h-full object-cover transition-opacity group-hover:opacity-80"
                  />
                  <div class="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors group-hover:bg-black/40">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white drop-shadow-xs transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </a>
              </td>

              <!-- EN Title & Desc -->
              <td class="p-4 align-middle max-w-xs">
                <span class="block text-sm font-black text-slate-900 tracking-wide truncate">{{ video.title_en || 'Untitled' }}</span>
                <p class="text-xs text-slate-400 font-medium mt-0.5 leading-relaxed truncate">{{ video.description_en || '-' }}</p>
              </td>

              <!-- AR Title & Desc -->
              <td class="p-4 align-middle text-right max-w-xs" dir="rtl">
                <span class="block text-sm font-bold text-slate-900 font-sans tracking-normal truncate">{{ video.title_ar || '-' }}</span>
                <p class="text-xs text-slate-400 font-medium font-sans mt-0.5 leading-relaxed truncate">{{ video.description_ar || '-' }}</p>
              </td>

              <!-- Source Tag -->
              <td class="p-4 align-middle text-center">
                <span class="inline-flex items-center px-3 py-1 bg-[#FDF8F3] border border-[#F5E6D8] rounded-md text-[10px] font-black text-[#8A5C22] uppercase tracking-wider">
                  YouTube
                </span>
              </td>

              <!-- Actions -->
              <td class="p-4 pr-8 align-middle text-right">
                <div class="flex items-center justify-end space-x-1.5">
                  <!-- Edit Button (تم التعديل لاستخدام اسم المسار وممر الإيد) -->
                  <RouterLink
                    :to="{ name: 'EditVideo', params: { id: video.id } }"
                    class="p-2 text-slate-400 hover:text-slate-800 hover:bg-[#FBF9F6] border border-[#EAE3DA] rounded-lg transition-all duration-150 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </RouterLink>

                  <button
                    type="button"
                    @click="deleteVideo(video.id)"
                    class="p-2 text-slate-400 hover:text-rose-700 hover:bg-rose-50/50 border border-[#EAE3DA] rounded-lg transition-all duration-150 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards View -->
      <div v-if="!isLoading && filteredVideos.length > 0" class="block md:hidden divide-y divide-[#EAE3DA]/40">
        <div v-for="video in filteredVideos" :key="video.id" class="p-5 flex flex-col space-y-4 bg-white">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-400">#{{ video.id }}</span>
            <span class="px-2.5 py-0.5 bg-[#FDF8F3] border border-[#F5E6D8] rounded text-[9px] font-black text-[#8A5C22] uppercase">YouTube</span>
          </div>

          <div class="flex items-start space-x-3">
            <a :href="video.youtube_url" target="_blank" class="w-20 aspect-video rounded-lg overflow-hidden border border-[#EAE3DA] bg-slate-900 shrink-0 relative block">
              <img :src="`https://img.youtube.com/vi/${getYoutubeId(video.youtube_url)}/mqdefault.jpg`" class="w-full h-full object-cover" />
            </a>
            <div class="min-w-0">
              <span class="text-xs font-black text-slate-900 block truncate">{{ video.title_en || 'Untitled' }}</span>
              <p class="text-[11px] text-slate-400 mt-0.5 truncate">{{ video.description_en || '-' }}</p>
            </div>
          </div>

          <div v-if="video.title_ar" class="bg-[#FBF9F6] border border-[#EAE3DA]/80 rounded-xl p-3 text-right" dir="rtl">
            <span class="text-xs font-bold text-slate-900 block font-sans">{{ video.title_ar }}</span>
            <p class="text-[11px] text-slate-400 mt-0.5 truncate font-sans">{{ video.description_ar }}</p>
          </div>

          <div class="flex items-center justify-end space-x-2 pt-1">
            <!-- Edit Button Mobile -->
            <RouterLink :to="{ name: 'EditVideo', params: { id: video.id } }" class="px-3 py-1.5 border border-[#EAE3DA] rounded-lg text-xs font-bold text-slate-600 bg-white">Edit</RouterLink>
            <button @click="deleteVideo(video.id)" class="px-3 py-1.5 border border-rose-100 bg-rose-50/20 text-rose-700 rounded-lg text-xs font-bold">Delete</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import apiClient from '@/api/api'

const videos = ref([])
const searchQuery = ref('')
const isLoading = ref(true)

const fetchVideos = async () => {
  isLoading.value = true
  try {
    const response = await apiClient.get('/videos')
    videos.value = response.data.data || response.data
  } catch (error) {
    console.error('Error fetching videos:', error)
  } finally {
    isLoading.value = false
  }
}

const deleteVideo = async (id) => {
  if (confirm('Are you sure you want to delete this video asset?')) {
    try {
      await apiClient.delete(`/videos/${id}`)
      videos.value = videos.value.filter(v => v.id !== id)
    } catch (error) {
      console.error('Error deleting video:', error)
      alert('Failed to delete video.')
    }
  }
}

const filteredVideos = computed(() => {
  if (!searchQuery.value.trim()) return videos.value
  const query = searchQuery.value.toLowerCase()
  return videos.value.filter(v =>
    v.title_en?.toLowerCase().includes(query) ||
    v.title_ar?.includes(query)
  )
})

const getYoutubeId = (url) => {
  if (!url) return ''
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : ''
}

onMounted(() => {
  fetchVideos()
})
</script>
