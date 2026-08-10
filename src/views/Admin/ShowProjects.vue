<template>
  <div class="w-full mx-auto animate-fade-in box-border bg-[#F7F4F0] min-h-screen p-4 sm:p-6 md:p-8" dir="ltr">

    <!-- Top Action Bar & Title -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h4 class="text-lg md:text-2xl font-black text-slate-900 tracking-wide uppercase">Marble Projects Showcase</h4>
        <p class="text-xs text-slate-400 font-bold mt-1">Manage, preview, and organize your global marble gallery assets</p>
      </div>

      <!-- Add Project Trigger -->
      <RouterLink
        to="/admin/add-project"
        class="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-[#F7F4F0] hover:bg-amber-950 hover:text-white text-amber-900 border border-[#E2D9CD] text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-widest text-center cursor-pointer shadow-xs"
      >
        <span>+ Add New Project</span>
      </RouterLink>
    </div>

    <!-- 📊 Stats & Filter Toolbar Bar (فوق الجدول) -->
    <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">

      <!-- Counter: Total Projects -->
      <div class="bg-white p-4 rounded-2xl border border-[#EAE3DA] flex items-center justify-between shadow-xs">
        <div>
          <span class="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Total Projects</span>
          <span class="text-xl font-black text-slate-800">{{ projects.length }}</span>
        </div>
        <div class="w-10 h-10 rounded-xl bg-[#F7F4F0] border border-[#EAE3DA] flex items-center justify-center text-amber-950">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      </div>

      <!-- 🔍 Interactive Search Input -->
      <div class="bg-white p-2 rounded-2xl border border-[#EAE3DA] flex items-center shadow-xs">
        <div class="relative w-full flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400 absolute left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search project, description, slug..."
            class="w-full pl-9 pr-4 py-3 bg-[#F7F4F0]/50 text-slate-800 placeholder-slate-400 text-xs font-bold rounded-xl border border-transparent focus:border-[#E2D9CD] focus:outline-none transition-all"
          />
        </div>
      </div>

    </div>

    <!-- Main Datatable Container -->
    <div class="bg-white rounded-2xl border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] w-full overflow-hidden">

      <!-- Loading State -->
      <div v-if="isLoading" class="p-20 flex flex-col items-center justify-center space-y-4">
        <div class="w-8 h-8 border-4 border-[#E2D9CD] border-t-amber-950 rounded-full animate-spin"></div>
        <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">Loading Projects Assets...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProjects.length === 0" class="p-20 text-center flex flex-col items-center justify-center">
        <div class="w-16 h-16 bg-[#F7F4F0] border border-[#EAE3DA] rounded-2xl flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h5 class="text-sm font-black text-slate-700 uppercase tracking-wider">
          {{ searchQuery ? 'No Matching Results' : 'No Projects Found' }}
        </h5>
        <p class="text-xs text-slate-400 font-bold mt-1 max-w-xs mx-auto">
          {{ searchQuery ? 'Try adjusting your search query parameters.' : 'Your showcase gallery is completely pristine. Start seeding it by creating a new marble project bundle.' }}
        </p>
      </div>

      <!-- Datatable Canvas -->
      <div v-else class="w-full">

        <!-- 1. Desktop Table View (Hidden on Mobile) -->
        <table class="w-full text-left border-collapse hidden md:table">
          <thead>
            <tr class="bg-[#F7F4F0]/60 border-b border-[#EAE3DA]">
              <th class="p-4 md:p-5 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-wider w-24">Preview</th>
              <th class="p-4 md:p-5 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-wider">Project Identity</th>
              <!-- 🏷️ Category Slug Header -->
              <th class="p-4 md:p-5 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-wider w-36">Category Slug</th>
              <!-- 📝 Description Bundle Header -->
              <th class="p-4 md:p-5 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-wider hidden md:table-cell">Description Bundle (EN / AR)</th>
              <th class="p-4 md:p-5 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-wider text-center w-32">Media Count</th>
              <th class="p-4 md:p-5 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-wider text-right w-36">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#EAE3DA]/50">
            <tr
              v-for="project in filteredProjects"
              :key="project.id"
              class="hover:bg-[#F7F4F0]/20 transition-colors duration-150"
            >
              <!-- Thumbnail Image Bundle Preview -->
              <td class="p-4 md:p-5 vertical-middle">
                <div class="w-16 aspect-[4/3] rounded-lg border border-[#EAE3DA] bg-[#F7F4F0] p-0.5 overflow-hidden shadow-xs">
                  <img
                    :src="getProjectCoverImage(project)"
                    class="w-full h-full object-cover rounded-md"
                    @error="handleImageError"
                  />
                </div>
              </td>

              <!-- Multilingual Identities -->
              <td class="p-4 md:p-5 vertical-middle">
                <div class="flex flex-col space-y-1">
                  <span class="text-xs md:text-sm font-black text-slate-800 tracking-wide">{{ project.name_en }}</span>
                  <span class="text-xs md:text-sm font-bold text-slate-500 font-sans tracking-normal" dir="rtl">{{ project.name_ar }}</span>
                </div>
              </td>

              <!-- 🏷️ Category Slug Badge Column -->
              <td class="p-4 md:p-5 vertical-middle">
                <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-amber-950/5 border border-amber-950/10 text-[11px] font-black text-amber-950 lowercase tracking-tight">
                  /{{ project.category?.slug || 'uncategorized' }}
                </span>
              </td>

              <!-- 📝 Desktop Descriptions Bundle Column -->
              <td class="p-4 md:p-5 vertical-middle hidden md:table-cell max-w-xs">
                <div class="flex flex-col space-y-1">
                  <p class="text-xs text-slate-500 font-medium truncate" :title="project.description_en">{{ project.description_en }}</p>
                  <p class="text-xs text-slate-400 font-sans font-medium truncate text-right" dir="rtl" :title="project.description_ar">{{ project.description_ar }}</p>
                </div>
              </td>

              <!-- Media Analytics Counter -->
              <td class="p-4 md:p-5 vertical-middle text-center">
                <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-[#F7F4F0] border border-[#EAE3DA] text-[10px] font-black text-slate-600 uppercase tracking-wider">
                  {{ project.images?.length || 0 }} Photos
                </span>
              </td>

              <!-- Actions Group Grid -->
              <td class="p-4 md:p-5 vertical-middle text-right">
                <div class="flex items-center justify-end space-x-2">
                  <!-- Edit Action -->
                  <RouterLink
                    :to="`/admin/edit-project/${project.id}`"
                    class="p-2 text-slate-400 hover:text-amber-950 hover:bg-[#F7F4F0] rounded-xl border border-transparent hover:border-[#EAE3DA] transition-all duration-200 cursor-pointer"
                    title="Edit Asset"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </RouterLink>

                  <!-- Delete Trigger -->
                  <button
                    type="button"
                    @click="deleteProject(project.id)"
                    class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50/50 rounded-xl border border-transparent hover:border-red-100 transition-all duration-200 cursor-pointer"
                    title="Delete Asset"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 2. Mobile Stacked View (Hidden on Desktop) -->
        <div class="block md:hidden divide-y divide-[#EAE3DA]/60">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="p-4 flex flex-col space-y-4 bg-white"
          >
            <!-- Top Section: ID, Category & Actions -->
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="text-xs font-black text-slate-400">#{{ project.id }}</span>
                <span class="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-950/5 border border-amber-950/10 text-[10px] font-black text-amber-950 lowercase">
                  /{{ project.category?.slug || 'uncategorized' }}
                </span>
              </div>

              <!-- Actions Group -->
              <div class="flex items-center space-x-2">
                <RouterLink
                  :to="`/admin/edit-project/${project.id}`"
                  class="p-2 text-slate-400 hover:text-amber-950 hover:bg-[#F7F4F0] rounded-xl border border-[#EAE3DA] transition-all duration-200 cursor-pointer bg-[#F7F4F0]/40"
                  title="Edit Asset"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </RouterLink>

                <button
                  type="button"
                  @click="deleteProject(project.id)"
                  class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50/50 rounded-xl border border-[#EAE3DA] transition-all duration-200 cursor-pointer bg-[#F7F4F0]/40"
                  title="Delete Asset"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Middle Section: Image and English Info -->
            <div class="flex items-start space-x-3">
              <div class="w-16 aspect-[4/3] rounded-lg border border-[#EAE3DA] bg-[#F7F4F0] p-0.5 overflow-hidden shadow-xs shrink-0">
                <img
                  :src="getProjectCoverImage(project)"
                  class="w-full h-full object-cover rounded-md"
                  @error="handleImageError"
                />
              </div>
              <div class="flex flex-col space-y-1 min-w-0">
                <span class="text-xs font-black text-slate-800 tracking-wide">{{ project.name_en }}</span>
                <p class="text-[11px] text-slate-400 font-medium leading-relaxed line-clamp-2">{{ project.description_en }}</p>
              </div>
            </div>

            <!-- Bottom Section: Arabic Container Box -->
            <div class="bg-[#F7F4F0]/60 border border-[#EAE3DA] rounded-xl p-3 flex flex-col space-y-1" dir="rtl">
              <span class="text-xs font-black text-slate-800 tracking-wide">{{ project.name_ar }}</span>
              <p class="text-[11px] text-slate-400 font-sans font-medium leading-relaxed line-clamp-2">{{ project.description_ar }}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/api/api'

const isLoading = ref(true)
const projects = ref([])
const searchQuery = ref('')

// عنوان السيرفر لتحميل الصور
const storageBaseUrl = 'http://127.0.0.1:8000/storage/'

// صورة Fallback SVG
const fallbackImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>'

const handleImageError = (e) => {
  e.target.src = fallbackImage
}

// بناء رابط صورة الغلاف
const getProjectCoverImage = (project) => {
  if (project.images && project.images.length > 0) {
    const mainImg = project.images.find(img => img.is_main) || project.images[0]
    const path = mainImg.image_path || mainImg

    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }
    return `${storageBaseUrl}${path}`
  }
  return fallbackImage
}

// 🔍 الفلترة المباشرة عبر محرك البحث
const filteredProjects = computed(() => {
  if (!searchQuery.value.trim()) return projects.value

  const q = searchQuery.value.toLowerCase().trim()
  return projects.value.filter(project => {
    const nameEn = project.name_en?.toLowerCase() || ''
    const nameAr = project.name_ar?.toLowerCase() || ''
    const descEn = project.description_en?.toLowerCase() || ''
    const descAr = project.description_ar?.toLowerCase() || ''
    const catSlug = project.category?.slug?.toLowerCase() || ''

    return nameEn.includes(q) ||
           nameAr.includes(q) ||
           descEn.includes(q) ||
           descAr.includes(q) ||
           catSlug.includes(q)
  })
})

// جلب المشاريع من الـ API
const fetchProjects = async () => {
  isLoading.value = true
  try {
    const response = await api.get('/projects')
    projects.value = response.data?.data || response.data || []
  } catch (error) {
    console.error('Error fetching marble projects:', error)
    if (error.response?.status === 401) {
      alert('Unauthorized! Please log in again.')
    }
  } finally {
    isLoading.value = false
  }
}

// حذف المشروع عبر API
const deleteProject = async (id) => {
  if (confirm('Are you absolute sure you want to completely purge this marble project from the index?')) {
    try {
      await api.delete(`/projects/${id}`)
      projects.value = projects.value.filter(p => p.id !== id)
    } catch (error) {
      console.error('Failed to delete project:', error)
      alert(error.response?.data?.message || 'An error occurred while deleting the project.')
    }
  }
}

onMounted(() => {
  fetchProjects()
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
.vertical-middle {
  vertical-align: middle;
}
</style>
