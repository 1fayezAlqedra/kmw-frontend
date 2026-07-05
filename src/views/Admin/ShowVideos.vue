<template>
  <div class="w-full mx-auto bg-[#FBF9F6] min-h-screen p-4 sm:p-6 md:p-8 font-sans selection:bg-amber-900 selection:text-white" dir="ltr">

    <!-- 1. Top Stats Grid (Matching image_ffcb22.png Hierarchy) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Total Videos Card -->
      <div class="bg-white border border-[#EAE3DA]/60 rounded-2xl p-6 flex items-center space-x-4 shadow-[0_4px_20px_-4px_rgba(139,92,26,0.02)]">
        <div class="w-12 h-12 bg-[#FBF9F6] border border-[#EAE3DA]/60 rounded-xl flex items-center justify-center text-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <span class="block text-[10px] font-black text-slate-400 tracking-wider uppercase">Total Cinematic Assets</span>
          <span class="block text-2xl font-black text-slate-800 mt-0.5">2 <span class="text-xs text-slate-400 font-bold ml-1">Clips</span></span>
        </div>
      </div>

      <!-- Active Streams Card -->
      <div class="bg-white border border-[#EAE3DA]/60 rounded-2xl p-6 flex items-center space-x-4 shadow-[0_4px_20px_-4px_rgba(139,92,26,0.02)]">
        <div class="w-12 h-12 bg-[#F6FBF7] border border-[#DCEAE0] rounded-xl flex items-center justify-center text-emerald-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0x" />
          </svg>
        </div>
        <div>
          <span class="block text-[10px] font-black text-slate-400 tracking-wider uppercase">Streaming Status</span>
          <span class="block text-2xl font-black text-[#2E7D46] mt-0.5">100% <span class="text-xs text-emerald-600 font-bold ml-1">Active</span></span>
        </div>
      </div>

      <!-- Global Views Sync -->
      <div class="bg-white border border-[#EAE3DA]/60 rounded-2xl p-6 flex items-center space-x-4 shadow-[0_4px_20px_-4px_rgba(139,92,26,0.02)]">
        <div class="w-12 h-12 bg-[#FDF8F3] border border-[#F5E6D8] rounded-xl flex items-center justify-center text-amber-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <span class="block text-[10px] font-black text-slate-400 tracking-wider uppercase">Connected Source</span>
          <span class="block text-2xl font-black text-amber-950 mt-0.5">YouTube</span>
        </div>
      </div>
    </div>

    <!-- 2. Main Catalog Canvas -->
    <div class="bg-white border border-[#EAE3DA]/60 rounded-3xl shadow-[0_4px_25px_-5px_rgba(139,92,26,0.03)] overflow-hidden">

      <!-- Catalog Header Bar with Search & Call Action -->
      <div class="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#F7F4F0]">
        <div>
          <h3 class="text-xl font-black text-slate-900 tracking-tight uppercase">Active Video Catalog</h3>
          <p class="text-xs text-slate-400 font-medium mt-1">Review your corporate marble clips, showcase playlists, and translation nodes</p>
        </div>

        <div class="flex items-center gap-3 self-end sm:self-center w-full sm:w-auto">
          <!-- Live Search Input -->
          <div class="relative flex-1 sm:w-64">
            <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search video name..."
              class="w-full pl-9 pr-4 py-2 bg-[#FBF9F6] border border-[#EAE3DA]/80 text-xs font-semibold rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-amber-900/40 transition-colors"
            />
          </div>

          <!-- Create Trigger Button -->
          <RouterLink
            to="/admin/add-video"
            class="px-5 py-2.5 bg-[#FDF9F3] border border-[#F0E6D8] hover:bg-amber-950 hover:text-white text-[#8A5C22] text-xs font-black rounded-xl transition-all duration-200 uppercase tracking-wider shadow-xs whitespace-nowrap cursor-pointer"
          >
            + Create New Video
          </RouterLink>
        </div>
      </div>

      <!-- 3. Desktop Video Table View -->
      <div class="w-full overflow-x-auto hidden md:block">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#FBF9F6]/40 border-b border-[#EAE3DA]/40">
              <th class="p-4 pl-8 text-[11px] font-black text-slate-400 uppercase tracking-wider w-20">ID</th>
              <th class="p-4 text-[11px] font-black text-slate-400 uppercase tracking-wider w-24">Preview</th>
              <th class="p-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Video Info (EN)</th>
              <th class="p-4 text-[11px] font-black text-slate-400 uppercase tracking-wider text-right" dir="rtl">بيانات الفيديو (AR)</th>
              <th class="p-4 text-[11px] font-black text-slate-400 uppercase tracking-wider text-center w-36">Source Platform</th>
              <th class="p-4 pr-8 text-[11px] font-black text-slate-400 uppercase tracking-wider text-right w-28">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#EAE3DA]/30">
            <tr v-for="video in videos" :key="video.id" class="hover:bg-[#FBF9F6]/30 transition-colors duration-100">

              <!-- ID Column -->
              <td class="p-4 pl-8 text-xs font-bold text-slate-400 align-middle">
                #{{ video.id }}
              </td>

              <!-- Clickable Video Thumbnail (Requested Feature) -->
              <td class="p-4 align-middle">
                <a
                  :href="video.youtube_url"
                  target="_blank"
                  class="block w-16 aspect-video bg-slate-900 rounded-xl overflow-hidden border border-[#EAE3DA] relative group cursor-pointer shadow-xs transition-transform duration-200 hover:scale-105"
                  title="Click to watch video asset"
                >
                  <img
                    :src="`https://img.youtube.com/vi/${getYoutubeId(video.youtube_url)}/mqdefault.jpg`"
                    class="w-full h-full object-cover transition-opacity group-hover:opacity-85"
                  />
                  <!-- Floating Play overlay icon -->
                  <div class="absolute inset-0 bg-black/10 flex items-center justify-center transition-colors group-hover:bg-black/30">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white drop-shadow-xs transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </a>
              </td>

              <!-- Video Info EN -->
              <td class="p-4 align-middle max-w-xs">
                <span class="block text-sm font-black text-slate-900 tracking-wide">{{ video.title_en }}</span>
                <p class="text-xs text-slate-400 font-medium mt-0.5 leading-relaxed truncate">{{ video.description_en }}</p>
              </td>

              <!-- Video Info AR -->
              <td class="p-4 align-middle text-right max-w-xs" dir="rtl">
                <span class="block text-sm font-bold text-slate-900 font-sans tracking-normal">{{ video.title_ar }}</span>
                <p class="text-xs text-slate-400 font-medium font-sans mt-0.5 leading-relaxed truncate">{{ video.description_ar }}</p>
              </td>

              <!-- Source Label (Matching image_ffcb22.png tags style) -->
              <td class="p-4 align-middle text-center">
                <span class="inline-flex items-center px-3 py-1 bg-[#FDF8F3] border border-[#F5E6D8] rounded-md text-[10px] font-black text-[#8A5C22] uppercase tracking-wider">
                  YouTube Link
                </span>
              </td>

              <!-- Actions Group -->
              <td class="p-4 pr-8 align-middle text-right">
                <div class="flex items-center justify-end space-x-1.5">
                  <RouterLink
                    :to="`/admin/edit-video/${video.id}`"
                    class="p-2 text-slate-400 hover:text-slate-800 hover:bg-[#FBF9F6] border border-[#EAE3DA]/50 rounded-lg transition-all duration-150 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </RouterLink>

                  <button
                    type="button"
                    @click="deleteVideo(video.id)"
                    class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50/50 border border-[#EAE3DA]/50 rounded-lg transition-all duration-150 cursor-pointer"
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

      <!-- 4. Mobile Stacked View (For smaller screen adapters) -->
      <div class="block md:hidden divide-y divide-[#EAE3DA]/40">
        <div v-for="video in videos" :key="video.id" class="p-5 flex flex-col space-y-4 bg-white">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-400">#{{ video.id }}</span>
            <span class="px-2.5 py-0.5 bg-[#FDF8F3] border border-[#F5E6D8] rounded text-[9px] font-black text-[#8A5C22] uppercase">YouTube</span>
          </div>

          <div class="flex items-start space-x-3">
            <a :href="video.youtube_url" target="_blank" class="w-16 aspect-video rounded-lg overflow-hidden border border-[#EAE3DA] bg-black shrink-0 relative block">
              <img :src="`https://img.youtube.com/vi/${getYoutubeId(video.youtube_url)}/mqdefault.jpg`" class="w-full h-full object-cover" />
            </a>
            <div class="min-w-0">
              <span class="text-xs font-black text-slate-900 block truncate">{{ video.title_en }}</span>
              <p class="text-[11px] text-slate-400 mt-0.5 truncate">{{ video.description_en }}</p>
            </div>
          </div>

          <div class="bg-[#FBF9F6] border border-[#EAE3DA]/60 rounded-xl p-3 text-right" dir="rtl">
            <span class="text-xs font-bold text-slate-900 block font-sans">{{ video.title_ar }}</span>
            <p class="text-[11px] text-slate-400 mt-0.5 truncate font-sans">{{ video.description_ar }}</p>
          </div>

          <div class="flex items-center justify-end space-x-2 pt-1">
            <RouterLink :to="`/admin/edit-video/${video.id}`" class="px-3 py-1.5 border border-[#EAE3DA] rounded-lg text-xs font-bold text-slate-600 bg-white">Edit</RouterLink>
            <button @click="deleteVideo(video.id)" class="px-3 py-1.5 border border-red-100 bg-red-50/20 text-red-600 rounded-lg text-xs font-bold">Delete</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// دالة لاستخراج معرّف فيديو اليوتيوب لإنشاء رابط التمبنايل تلقائياً
const getYoutubeId = (url) => {
  if (!url) return ''
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : ''
}

// محاكاة بيانات حقول الفيديوهات تماماً مثل حقول الكتالوج بالصورة المرجعية المرفقة
const videos = ref([
  {
    id: 101,
    title_en: 'Carrara Production & Showreel Showcase',
    title_ar: 'إنتاج رخام كرارا وعرض فني متكامل للشركات',
    description_en: 'Elite selection of clean white background with strong, iconic grey tectonic marble veins.',
    description_ar: 'خامة فاخرة ذات خلفية بيضاء ناصعة وعروق رمادية واضحة ومميزة للفخامة.',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 102,
    title_en: 'Nero Marquina Velvet Architecture Block',
    title_ar: 'كتل رخام نيرو ماركينا الأسود المخملي المعماري',
    description_en: 'High-quality fine grain compact deep black marble with distinct crystalline white veins.',
    description_ar: 'رخام أسود داكن عالي الجودة بحبيبات ناعمة مدمجة وعروق بيضاء كريستالية متناسقة.',
    youtube_url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk'
  }
])

const deleteVideo = (id) => {
  if (confirm('Are you absolute sure you want to completely purge this video asset?')) {
    videos.value = videos.value.filter(v => v.id !== id)
  }
}
</script>
