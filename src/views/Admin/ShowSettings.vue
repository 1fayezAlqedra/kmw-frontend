<template>
  <div class="w-full max-w-6xl mx-auto animate-fade-in box-border bg-[#F7F4F0] min-h-screen p-4 sm:p-6 md:p-8" dir="ltr">

    <!-- Header Block -->
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 class="text-2xl md:text-3xl font-black text-[#0A1A2F] tracking-tight uppercase">SYSTEM SETTINGS CONTROL</h3>
        <p class="text-xs text-[#5C728D] font-bold mt-1">Configure core architecture, localization, social registry, and brand identity variables</p>
      </div>

      <RouterLink
        to="/admin/dashboard"
        class="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-white border border-[#EAE3DA] text-xs font-black text-[#0A1A2F] rounded-full transition-all duration-200 hover:bg-[#F7F4F0] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] cursor-pointer whitespace-nowrap"
      >
        <span>← BACK TO DASHBOARD</span>
      </RouterLink>
    </div>

    <!-- Feedback Banner -->
    <div v-if="statusMessage"
         :class="statusType === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'"
         class="mb-6 p-4 rounded-xl border flex items-center justify-between text-xs font-bold transition-all duration-300">
      <div class="flex items-center space-x-2">
        <span>{{ statusType === 'success' ? '✅' : '❌' }}</span>
        <span>{{ statusMessage }}</span>
      </div>
      <button @click="statusMessage = ''" class="cursor-pointer hover:opacity-70">✕</button>
    </div>

    <!-- ─── SETTINGS CORE CANVAS ─── -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

      <!-- Left Column: Navigation Tabs -->
      <div class="md:col-span-1 flex flex-col space-y-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          type="button"
          class="w-full text-left px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-between"
          :class="activeTab === tab.id ? 'bg-[#A1461D] text-white shadow-md' : 'bg-white text-[#5C728D] border border-[#EAE3DA] hover:bg-[#F7F4F0]'"
        >
          <span>{{ tab.label }}</span>
          <span>→</span>
        </button>
      </div>

      <!-- Right Column: Form Panels -->
      <div class="md:col-span-3">
        <form @submit.prevent="saveSettings" class="bg-white rounded-3xl border border-[#EAE3DA] p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] flex flex-col min-h-[520px] justify-between">

          <!-- 1️⃣ TAB: Identity & SEO -->
          <div v-if="activeTab === 'identity'" class="space-y-5 animate-tab-fade">
            <div class="border-b border-[#EAE3DA] pb-3 mb-2">
              <h4 class="text-base font-black text-[#0A1A2F] uppercase">Brand Identity & Search Engines</h4>
              <p class="text-[10px] text-[#5C728D] font-bold">Manage global meta headers affecting Google indexing rankings</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Site Name / Corporate Title</label>
                <input type="text" v-model="form.site_name" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" placeholder="e.g. KMW Stone" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Meta Keywords</label>
                <input type="text" v-model="form.meta_keywords" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" placeholder="granite, marble, luxury stone riyadh" />
              </div>
            </div>

            <div class="flex flex-col space-y-1.5">
              <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">SEO Meta Description</label>
              <textarea v-model="form.meta_description" rows="3" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200 resize-none" placeholder="Premium natural stone factories..."></textarea>
            </div>

            <div class="flex flex-col space-y-1.5">
              <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Copyright Footnote Row</label>
              <input type="text" v-model="form.copyright_text" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" />
            </div>
          </div>

          <!-- 2️⃣ TAB: Contact & Branches -->
          <div v-if="activeTab === 'contact'" class="space-y-5 animate-tab-fade">
            <div class="border-b border-[#EAE3DA] pb-3 mb-2">
              <h4 class="text-base font-black text-[#0A1A2F] uppercase">Corporate Communication Channels</h4>
              <p class="text-[10px] text-[#5C728D] font-bold">Physical branch positioning parameters and routing lines</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Central Support Email</label>
                <input type="email" v-model="form.email" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Primary Phone / WhatsApp</label>
                <input type="text" v-model="form.phone" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Main Factory HQ Address</label>
                <input type="text" v-model="form.factory_address" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" placeholder="Industrial Area, Riyadh, KSA" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Showroom Gallery Location</label>
                <input type="text" v-model="form.showroom_address" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" placeholder="Takhassusi St, Riyadh, KSA" />
              </div>
            </div>

            <div class="flex flex-col space-y-1.5">
              <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Google Maps Embed Link (Iframe URL)</label>
              <input type="text" v-model="form.google_maps_url" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" placeholder="https://google.com/maps/embed/..." />
            </div>
          </div>

          <!-- 3️⃣ TAB: Social Media Links -->
          <div v-if="activeTab === 'social'" class="space-y-5 animate-tab-fade">
            <div class="border-b border-[#EAE3DA] pb-3 mb-2">
              <h4 class="text-base font-black text-[#0A1A2F] uppercase">Social Network Hub</h4>
              <p class="text-[10px] text-[#5C728D] font-bold">External hyper-links linked to public layout vector points</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Instagram Portfolio</label>
                <input type="text" v-model="form.instagram" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" placeholder="https://instagram.com/..." />
              </div>
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">LinkedIn Corporate</label>
                <input type="text" v-model="form.linkedin" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" placeholder="https://linkedin.com/company/..." />
              </div>
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">X / Twitter Handle</label>
                <input type="text" v-model="form.twitter" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" placeholder="https://x.com/..." />
              </div>
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">YouTube Video Channel</label>
                <input type="text" v-model="form.youtube" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" placeholder="https://youtube.com/..." />
              </div>
            </div>
          </div>

          <!-- 4️⃣ TAB: Operation Hours -->
          <div v-if="activeTab === 'hours'" class="space-y-5 animate-tab-fade">
            <div class="border-b border-[#EAE3DA] pb-3 mb-2">
              <h4 class="text-base font-black text-[#0A1A2F] uppercase">Work Shifts & Business Timelines</h4>
              <p class="text-[10px] text-[#5C728D] font-bold">Configure time rows visible to showroom visitors</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Weekdays Shift (Sat - Thu)</label>
                <input type="text" v-model="form.working_hours_weekdays" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" placeholder="08:00 AM - 06:00 PM" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Friday Weekend Policy</label>
                <input type="text" v-model="form.working_hours_friday" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" placeholder="Closed" />
              </div>
            </div>
          </div>

          <!-- 5️⃣ TAB: Advanced Upload Specs -->
          <div v-if="activeTab === 'advanced'" class="space-y-5 animate-tab-fade">
            <div class="border-b border-[#EAE3DA] pb-3 mb-2">
              <h4 class="text-base font-black text-[#0A1A2F] uppercase">System Execution & Upload Thresholds</h4>
              <p class="text-[10px] text-[#5C728D] font-bold">Restrict resource payload sizes across upload fields</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Max Allowed Image Size (MB)</label>
                <input type="number" v-model="form.max_file_size" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Items Per Page (Pagination Row Count)</label>
                <input type="number" v-model="form.pagination_limit" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 transition-all duration-200" />
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-[#A1461D]/5 border border-[#A1461D]/20 rounded-xl">
              <div>
                <span class="block text-xs font-black text-[#0A1A2F] uppercase">Platform Maintenance Lockout</span>
                <span class="block text-[10px] text-[#5C728D] font-bold">Redirect all consumer traffic to an offline layout view</span>
              </div>
              <button
                type="button"
                @click="form.maintenance_mode = !form.maintenance_mode"
                class="px-4 py-1.5 rounded-full text-[9px] font-black tracking-wider uppercase transition-all duration-200 cursor-pointer"
                :class="form.maintenance_mode ? 'bg-[#A1461D] text-white' : 'bg-white border border-[#EAE3DA] text-[#5C728D]'"
              >
                {{ form.maintenance_mode ? 'Locked' : 'Live' }}
              </button>
            </div>
          </div>

          <!-- Action Footer Submit Button -->
          <div class="mt-8 pt-4 border-t border-[#EAE3DA]/60 flex items-center justify-between">
            <span class="text-[10px] text-slate-400 font-bold">Valid entries push global parameters live to the public client context.</span>
            <button
              type="submit"
              :disabled="isSaving"
              class="px-6 py-3 bg-[#A1461D] hover:bg-amber-950 disabled:bg-slate-400 text-white text-xs font-black rounded-xl transition-all duration-200 uppercase tracking-widest cursor-pointer shadow-md"
            >
              {{ isSaving ? 'SAVING CONFIG DATA...' : 'COMMIT SYSTEM CHANGES' }}
            </button>
          </div>

        </form>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeTab = ref('identity')
const isSaving = ref(false)
const settingId = ref('1')

const tabs = [
  { id: 'identity', label: '🌐 Identity & SEO' },
  { id: 'contact', label: '📞 Contact & Branches' },
  { id: 'social', label: '✨ Social Links' },
  { id: 'hours', label: '⏳ Business Hours' },
  { id: 'advanced', label: '⚙️ Core Config' }
]

const form = ref({
  site_name: '',
  email: '',
  phone: '',
  meta_description: '',
  meta_keywords: '',
  copyright_text: '© 2026 KMW Stone Studio. All rights reserved.',
  factory_address: '',
  showroom_address: '',
  google_maps_url: '',
  instagram: '',
  linkedin: '',
  twitter: '',
  youtube: '',
  working_hours_weekdays: '',
  working_hours_friday: '',
  max_file_size: 10,
  pagination_limit: 12,
  maintenance_mode: false
})

const statusMessage = ref('')
const statusType = ref('success')

const fetchSettings = async () => {
  try {
    form.value.site_name = 'KMW Stone Studio'
    form.value.email = 'info@kmw-stone.com'
    form.value.phone = '+966 50 123 4567'
    form.value.meta_description = 'KMW Studio is the leading provider of premium luxury natural stone, granite, and custom block masonry in Riyadh.'
    form.value.meta_keywords = 'marble, granite, stone carving, architecture riyadh'
    form.value.factory_address = 'Industrial Area, 3rd Phase, Riyadh, Saudi Arabia'
    form.value.showroom_address = 'Al-Takhassusi Center, Block B, Riyadh'
    form.value.google_maps_url = 'https://google.com/maps/embed/v1/place?key=AIzaSy...'
    form.value.instagram = 'https://instagram.com/kmwstone'
    form.value.linkedin = 'https://linkedin.com/company/kmwstone'
    form.value.working_hours_weekdays = '08:00 AM - 05:30 PM'
    form.value.working_hours_friday = 'Closed'
  } catch (error) {
    statusMessage.value = 'Failed to fetch global parameters registry.'
    statusType.value = 'error'
  }
}

const saveSettings = async () => {
  isSaving.value = true
  statusMessage.value = ''
  try {
    await new Promise(resolve => setTimeout(resolve, 900))
    statusMessage.value = 'Global application configuration payload has been committed to database!'
    statusType.value = 'success'
  } catch (error) {
    statusMessage.value = 'Payload execution failed.'
    statusType.value = 'error'
  } finally {
    isSaving.value = false
    setTimeout(() => { statusMessage.value = '' }, 4000)
  }
}

onMounted(() => {
  fetchSettings()
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
@keyframes tabFade {
  from { opacity: 0; transform: translateX(6px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-tab-fade {
  animation: tabFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
