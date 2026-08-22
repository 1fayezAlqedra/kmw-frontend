<template>
  <div class="w-full max-w-6xl mx-auto animate-fade-in box-border bg-[#F7F4F0] min-h-screen p-4 sm:p-6 md:p-8" dir="ltr">

    <!-- Header Block -->
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 class="text-2xl md:text-3xl font-black text-[#0A1A2F] tracking-tight uppercase">SYSTEM SETTINGS CONTROL</h3>
        <p class="text-xs text-[#5C728D] font-bold mt-1">Configure site architecture, SEO, social presence, and system administrators</p>
      </div>

      <RouterLink
        to="/admin/dashboard"
        class="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-white border border-[#EAE3DA] text-xs font-black text-[#0A1A2F] rounded-full transition-all duration-200 hover:bg-[#F7F4F0] shadow-sm cursor-pointer whitespace-nowrap"
      >
        <span>← BACK TO DASHBOARD</span>
      </RouterLink>
    </div>

    <!-- Status Alert -->
    <div v-if="statusMessage"
         :class="statusType === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'"
         class="mb-6 p-4 rounded-xl border flex items-center justify-between text-xs font-bold transition-all duration-300">
      <div class="flex items-center space-x-2">
        <span>{{ statusType === 'success' ? '✅' : '❌' }}</span>
        <span>{{ statusMessage }}</span>
      </div>
      <button @click="statusMessage = ''" class="cursor-pointer hover:opacity-70">✕</button>
    </div>

    <!-- Navigation Tabs & Panels -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

      <!-- Tabs Sidebar -->
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

      <!-- Main Form Area -->
      <div class="md:col-span-3">

        <!-- SETTINGS FORM (Tabs: identity, contact, social, system) -->
        <form v-if="activeTab !== 'admins'" @submit.prevent="saveSettings" class="bg-white rounded-3xl border border-[#EAE3DA] p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] flex flex-col min-h-[460px] justify-between">

          <div v-if="isLoading" class="animate-pulse space-y-4 my-auto">
            <div class="h-4 bg-[#F7F4F0] rounded w-1/3"></div>
            <div class="h-10 bg-[#F7F4F0] rounded w-full"></div>
            <div class="h-10 bg-[#F7F4F0] rounded w-full"></div>
          </div>

          <div v-else>
            <!-- 🌐 Identity & SEO -->
            <div v-if="activeTab === 'identity'" class="space-y-5 animate-tab-fade">
              <div class="border-b border-[#EAE3DA] pb-3 mb-2">
                <h4 class="text-base font-black text-[#0A1A2F] uppercase">Brand Identity & Search Engines</h4>
                <p class="text-[10px] text-[#5C728D] font-bold">Manage site meta information for indexing</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex flex-col space-y-1.5">
                  <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Site Name</label>
                  <input type="text" v-model="form.site_name" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800" placeholder="KMW Platform" />
                </div>
                <div class="flex flex-col space-y-1.5">
                  <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Meta Keywords</label>
                  <input type="text" v-model="form.meta_keywords" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800" placeholder="granite, marble, factory" />
                </div>
              </div>

              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">SEO Meta Description</label>
                <textarea v-model="form.meta_description" rows="3" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 resize-none"></textarea>
              </div>

              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Copyright Text</label>
                <input type="text" v-model="form.copyright_text" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800" />
              </div>
            </div>

            <!-- 📞 Contact Info -->
            <div v-if="activeTab === 'contact'" class="space-y-5 animate-tab-fade">
              <div class="border-b border-[#EAE3DA] pb-3 mb-2">
                <h4 class="text-base font-black text-[#0A1A2F] uppercase">Contact Details</h4>
                <p class="text-[10px] text-[#5C728D] font-bold">Official contact channels and location links</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex flex-col space-y-1.5">
                  <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Support Email</label>
                  <input type="email" v-model="form.email" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800" />
                </div>
                <div class="flex flex-col space-y-1.5">
                  <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Phone / WhatsApp</label>
                  <input type="text" v-model="form.phone" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800" />
                </div>
              </div>

              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Factory / Headquarter Address</label>
                <input type="text" v-model="form.factory_address" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800" />
              </div>

              <div class="flex flex-col space-y-1.5">
                <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Google Maps Embed URL</label>
                <input type="text" v-model="form.google_maps_url" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800" placeholder="https://google.com/maps/embed/..." />
              </div>
            </div>

            <!-- ✨ Social Links -->
            <div v-if="activeTab === 'social'" class="space-y-5 animate-tab-fade">
              <div class="border-b border-[#EAE3DA] pb-3 mb-2">
                <h4 class="text-base font-black text-[#0A1A2F] uppercase">Social Networks</h4>
                <p class="text-[10px] text-[#5C728D] font-bold">Public platform links for footer and header icons</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex flex-col space-y-1.5">
                  <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Instagram URL</label>
                  <input type="text" v-model="form.instagram" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800" />
                </div>
                <div class="flex flex-col space-y-1.5">
                  <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">LinkedIn URL</label>
                  <input type="text" v-model="form.linkedin" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800" />
                </div>
                <div class="flex flex-col space-y-1.5">
                  <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">X / Twitter URL</label>
                  <input type="text" v-model="form.twitter" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800" />
                </div>
                <div class="flex flex-col space-y-1.5">
                  <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">YouTube Channel</label>
                  <input type="text" v-model="form.youtube" class="w-full px-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800" />
                </div>
              </div>
            </div>

            <!-- ⚙️ Maintenance / System Switch -->
            <div v-if="activeTab === 'system'" class="space-y-5 animate-tab-fade">
              <div class="border-b border-[#EAE3DA] pb-3 mb-2">
                <h4 class="text-base font-black text-[#0A1A2F] uppercase">System State</h4>
                <p class="text-[10px] text-[#5C728D] font-bold">Global maintenance and system control</p>
              </div>

              <div class="flex items-center justify-between p-4 bg-[#A1461D]/5 border border-[#A1461D]/20 rounded-xl">
                <div>
                  <span class="block text-xs font-black text-[#0A1A2F] uppercase">Maintenance Mode</span>
                  <span class="block text-[10px] text-[#5C728D] font-bold">Temporarily restrict front-end visitor access</span>
                </div>
                <button
                  type="button"
                  @click="form.maintenance_mode = !form.maintenance_mode"
                  class="px-5 py-2 rounded-full text-[10px] font-black tracking-wider uppercase transition-all duration-200 cursor-pointer"
                  :class="form.maintenance_mode ? 'bg-[#A1461D] text-white' : 'bg-white border border-[#EAE3DA] text-[#5C728D]'"
                >
                  {{ form.maintenance_mode ? 'Active (Locked)' : 'Live (Public)' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-8 pt-4 border-t border-[#EAE3DA]/60 flex items-center justify-end">
            <button
              type="submit"
              :disabled="isSaving"
              class="px-6 py-3 bg-[#A1461D] hover:bg-amber-950 disabled:bg-slate-400 text-white text-xs font-black rounded-xl transition-all duration-200 uppercase tracking-widest cursor-pointer shadow-md"
            >
              {{ isSaving ? 'SAVING...' : 'SAVE SETTINGS' }}
            </button>
          </div>
        </form>

        <!-- 👤 ADMIN ACCOUNTS TAB -->
        <div v-if="activeTab === 'admins'" class="bg-white rounded-3xl border border-[#EAE3DA] p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] flex flex-col min-h-[460px] justify-between animate-tab-fade">
          <div>
            <div class="border-b border-[#EAE3DA] pb-3 mb-6 flex items-center justify-between">
              <div>
                <h4 class="text-base font-black text-[#0A1A2F] uppercase">System Administrators</h4>
                <p class="text-[10px] text-[#5C728D] font-bold">Manage accounts with admin dashboard access</p>
              </div>
              <button
                @click="openAdminModal()"
                type="button"
                class="px-4 py-2 bg-[#A1461D] hover:bg-amber-950 text-white text-xs font-black rounded-xl transition-all duration-200 uppercase tracking-wider cursor-pointer">
                + ADD ADMIN
              </button>
            </div>

            <div v-if="isLoadingAdmins" class="animate-pulse space-y-3">
              <div v-for="i in 3" :key="i" class="h-12 bg-[#F7F4F0] rounded-xl w-full"></div>
            </div>

            <div v-else class="overflow-x-auto rounded-xl border border-[#EAE3DA]">
              <table class="w-full text-left text-xs">
                <thead class="bg-[#F7F4F0] text-[#0A1A2F] font-black uppercase border-b border-[#EAE3DA]">
                  <tr>
                    <th class="p-3.5">Name</th>
                    <th class="p-3.5">Email</th>
                    <th class="p-3.5">Role</th>
                    <th class="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#EAE3DA] font-semibold text-slate-700">
                  <tr v-for="admin in adminsList" :key="admin.id" class="hover:bg-[#F7F4F0]/50 transition-colors">
                    <td class="p-3.5 font-bold text-[#0A1A2F]">{{ admin.name }}</td>
                    <td class="p-3.5 text-slate-500">{{ admin.email }}</td>
                    <td class="p-3.5">
                      <span :class="admin.role === 'super_admin' ? 'bg-[#A1461D]/10 text-[#A1461D] border-[#A1461D]/30' : 'bg-slate-100 text-slate-600 border-slate-200'" class="px-2.5 py-1 rounded-full text-[9px] font-black uppercase border">
                        {{ admin.role === 'super_admin' ? 'SUPER ADMIN' : 'ADMIN' }}
                      </span>
                    </td>
                    <td class="p-3.5 text-right space-x-2">
                      <button @click="openAdminModal(admin)" type="button" class="text-xs font-bold text-indigo-600 hover:text-indigo-900 cursor-pointer">Edit</button>
                      <button @click="deleteAdminUser(admin.id)" type="button" class="text-xs font-bold text-rose-600 hover:text-rose-900 cursor-pointer">Delete</button>
                    </td>
                  </tr>
                  <tr v-if="adminsList.length === 0">
                    <td colspan="4" class="p-8 text-center text-slate-400 font-bold">No admin accounts found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Admin Create/Edit Modal -->
    <div v-if="showAdminModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div class="bg-white rounded-3xl border border-[#EAE3DA] w-full max-w-md p-6 sm:p-8 shadow-2xl space-y-5">
        <div class="border-b border-[#EAE3DA] pb-3">
          <h4 class="text-base font-black text-[#0A1A2F] uppercase">{{ isEditingAdmin ? 'EDIT ADMIN' : 'ADD NEW ADMIN' }}</h4>
        </div>

        <form @submit.prevent="submitAdminForm" class="space-y-4">
          <div class="flex flex-col space-y-1">
            <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Full Name</label>
            <input v-model="adminForm.name" type="text" required class="w-full px-4 py-2.5 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#A1461D]" />
          </div>

          <div class="flex flex-col space-y-1">
            <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Email Address</label>
            <input v-model="adminForm.email" type="email" required class="w-full px-4 py-2.5 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#A1461D]" />
          </div>

          <div class="flex flex-col space-y-1">
            <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Password {{ isEditingAdmin ? '(Leave blank to keep current)' : '' }}</label>
            <input v-model="adminForm.password" :required="!isEditingAdmin" type="password" class="w-full px-4 py-2.5 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#A1461D]" />
          </div>

          <div class="flex flex-col space-y-1">
            <label class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Role</label>
            <select v-model="adminForm.role" class="w-full px-4 py-2.5 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#A1461D]">
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <div class="pt-3 flex items-center justify-end space-x-3">
            <button type="button" @click="showAdminModal = false" class="px-5 py-2.5 border border-[#EAE3DA] rounded-xl text-xs font-black text-slate-600 hover:bg-[#F7F4F0]">CANCEL</button>
            <button type="submit" :disabled="isSavingAdmin" class="px-5 py-2.5 bg-[#A1461D] text-white rounded-xl text-xs font-black hover:bg-amber-950 disabled:opacity-50">
              {{ isSavingAdmin ? 'SAVING...' : 'SAVE' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { settingsApi, adminsApi } from '@/api/api'

const activeTab = ref('identity')
const isLoading = ref(true)
const isSaving = ref(false)

const tabs = [
  { id: 'identity', label: '🌐 Identity & SEO' },
  { id: 'contact', label: '📞 Contact Details' },
  { id: 'social', label: '✨ Social Links' },
  { id: 'system', label: '⚙️ System Control' },
  { id: 'admins', label: '👤 Admin Accounts' }
]

const form = ref({
  site_name: '',
  email: '',
  phone: '',
  meta_description: '',
  meta_keywords: '',
  copyright_text: '',
  factory_address: '',
  google_maps_url: '',
  instagram: '',
  linkedin: '',
  twitter: '',
  youtube: '',
  maintenance_mode: false
})

const statusMessage = ref('')
const statusType = ref('success')

// Admins State
const isLoadingAdmins = ref(false)
const isSavingAdmin = ref(false)
const adminsList = ref([])
const showAdminModal = ref(false)
const isEditingAdmin = ref(false)
const currentAdminId = ref(null)
const adminForm = ref({ name: '', email: '', password: '', role: 'admin' })

const fetchSettings = async () => {
  isLoading.value = true
  try {
    const res = await settingsApi.getSettings()
    const data = res.data?.data || res.data
    if (data) {
      Object.keys(form.value).forEach((key) => {
        if (data[key] !== undefined) {
          form.value[key] = data[key]
        }
      })
    }
  } catch (error) {
    statusMessage.value = error.response?.data?.message || 'Failed to load settings.'
    statusType.value = 'error'
  } finally {
    isLoading.value = false
  }
}

const saveSettings = async () => {
  isSaving.value = true
  statusMessage.value = ''
  try {
    const res = await settingsApi.updateSettings(form.value)
    statusMessage.value = res.data?.message || 'Settings saved successfully!'
    statusType.value = 'success'
  } catch (error) {
    statusMessage.value = error.response?.data?.message || 'Failed to save settings.'
    statusType.value = 'error'
  } finally {
    isSaving.value = false
    setTimeout(() => { statusMessage.value = '' }, 4000)
  }
}

const fetchAdmins = async () => {
  isLoadingAdmins.value = true
  try {
    const res = await adminsApi.getAdmins()
    adminsList.value = res.data?.data || res.data || []
  } catch (error) {
    statusMessage.value = error.response?.data?.message || 'Failed to load admins.'
    statusType.value = 'error'
  } finally {
    isLoadingAdmins.value = false
  }
}

const openAdminModal = (admin = null) => {
  if (admin) {
    isEditingAdmin.value = true
    currentAdminId.value = admin.id
    adminForm.value = { name: admin.name, email: admin.email, password: '', role: admin.role }
  } else {
    isEditingAdmin.value = false
    currentAdminId.value = null
    adminForm.value = { name: '', email: '', password: '', role: 'admin' }
  }
  showAdminModal.value = true
}

const submitAdminForm = async () => {
  isSavingAdmin.value = true
  try {
    if (isEditingAdmin.value) {
      await adminsApi.updateAdmin(currentAdminId.value, adminForm.value)
      statusMessage.value = 'Admin updated successfully!'
    } else {
      await adminsApi.createAdmin(adminForm.value)
      statusMessage.value = 'Admin created successfully!'
    }
    statusType.value = 'success'
    showAdminModal.value = false
    fetchAdmins()
  } catch (error) {
    statusMessage.value = error.response?.data?.message || 'Failed to save admin user.'
    statusType.value = 'error'
  } finally {
    isSavingAdmin.value = false
    setTimeout(() => { statusMessage.value = '' }, 4000)
  }
}

const deleteAdminUser = async (id) => {
  if (!confirm('Are you sure you want to delete this admin account?')) return
  try {
    await adminsApi.deleteAdmin(id)
    statusMessage.value = 'Admin removed successfully.'
    statusType.value = 'success'
    fetchAdmins()
  } catch (error) {
    statusMessage.value = error.response?.data?.message || 'Failed to delete admin account.'
    statusType.value = 'error'
  } finally {
    setTimeout(() => { statusMessage.value = '' }, 4000)
  }
}

onMounted(() => {
  fetchSettings()
  fetchAdmins()
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes tabFade {
  from { opacity: 0; transform: translateX(5px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-tab-fade {
  animation: tabFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
