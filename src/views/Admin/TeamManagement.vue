<template>
  <div class="min-h-screen bg-[#F7F4F0] p-4 sm:p-8" dir="ltr">

    <div class="max-w-5xl mx-auto space-y-6 animate-fade-in">

      <!-- Top Header Row -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#EAE3DA] pb-5">
        <div>
          <h1 class="text-2xl font-black text-[#0A1A2F] uppercase tracking-tight">System Team Architecture</h1>
          <p class="text-xs text-[#5C728D] font-bold uppercase tracking-wider mt-0.5">Provision, promote, or deprecate sub-admin deployment nodes (Editors)</p>
        </div>

        <button
          @click="openCreateModal = true"
          class="px-5 py-3 bg-[#A1461D] hover:bg-[#853714] text-white text-xs font-black rounded-xl uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-md flex items-center space-x-2"
        >
          <span>+ Deploy New User</span>
        </button>
      </div>

      <!-- Feedback Banner -->
      <div v-if="feedback" :class="feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'" class="p-4 border rounded-xl text-xs font-bold transition-all duration-300">
        {{ feedback.text }}
      </div>

      <!-- Main Datatable Grid -->
      <div class="bg-white border border-[#EAE3DA] rounded-2xl overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[#F7F4F0]/60 border-b border-[#EAE3DA]">
                <th class="p-4 text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Identity Name</th>
                <th class="p-4 text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Endpoint Email</th>
                <th class="p-4 text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Clearance Status</th>
                <th class="p-4 text-[10px] font-black text-[#5C728D] uppercase tracking-wider text-right">Operational Executions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#EAE3DA]/50 text-xs text-slate-700 font-medium">
              <tr v-if="isLoading">
                <td colspan="4" class="p-8 text-center text-slate-400 font-bold uppercase tracking-widest">Querying database registry...</td>
              </tr>
              <tr v-else-if="!editors || editors.length === 0">
                <td colspan="4" class="p-8 text-center text-slate-400 font-bold uppercase tracking-widest">No active users deployed in the cluster.</td>
              </tr>
              <tr v-else v-for="editor in editors" :key="editor.id" class="hover:bg-[#F7F4F0]/20 transition-all">
                <td class="p-4 font-bold text-[#0A1A2F]">{{ editor.name }}</td>
                <td class="p-4 font-mono text-[#5C728D]">{{ editor.email }}</td>
                <td class="p-4">
                  <span
                    :class="editor.role === 'admin' ? 'bg-purple-50 text-purple-800 border-purple-200' : 'bg-amber-50 text-amber-800 border-amber-200'"
                    class="px-2.5 py-1 border rounded-md text-[10px] font-black uppercase tracking-wider"
                  >
                    {{ editor.role }}
                  </span>
                </td>
                <td class="p-4 text-right space-x-2">
                  <!-- زر التبديل الديناميكي بين رتبة أدمن ومحرر -->
                  <button
                    @click="toggleUserRole(editor)"
                    class="px-2.5 py-1.5 bg-white border border-[#EAE3DA] hover:border-slate-600 text-slate-600 hover:text-slate-800 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {{ editor.role === 'admin' ? 'Demote to Editor' : 'Promote to Admin' }}
                  </button>
                  <button
                    @click="deleteEditor(editor.id)"
                    class="px-2.5 py-1.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Deprecate (Delete)
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- MODAL LAYER -->
      <div v-if="openCreateModal" class="fixed inset-0 z-50 bg-[#0A1A2F]/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white border border-[#EAE3DA] w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-xl animate-scale-up space-y-4">
          <div>
            <h3 class="text-base font-black text-[#0A1A2F] uppercase tracking-tight">Provision New User Node</h3>
            <p class="text-[10px] text-[#5C728D] font-bold uppercase tracking-wider">Creates a new system account within the registry.</p>
          </div>

          <form @submit.prevent="createEditor" class="space-y-4">
            <div class="flex flex-col space-y-1">
              <label class="text-[9px] font-black text-[#5C728D] uppercase tracking-wider">Full Legal Name</label>
              <input type="text" v-model="newEditor.name" required class="w-full px-3 py-2 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#A1461D]" placeholder="John Doe" />
            </div>

            <div class="flex flex-col space-y-1">
              <label class="text-[9px] font-black text-[#5C728D] uppercase tracking-wider">System Route Mail</label>
              <input type="email" v-model="newEditor.email" required class="w-full px-3 py-2 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#A1461D]" placeholder="user@kmw.com" />
            </div>

            <div class="flex flex-col space-y-1">
              <label class="text-[9px] font-black text-[#5C728D] uppercase tracking-wider">Secure Access Phrase</label>
              <input type="password" v-model="newEditor.password" required class="w-full px-3 py-2 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#A1461D]" placeholder="••••••••" />
            </div>

            <div class="pt-2 flex items-center justify-end space-x-2">
              <button type="button" @click="openCreateModal = false" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black rounded-lg uppercase tracking-wider cursor-pointer">Cancel</button>
              <button type="submit" :disabled="isLoading" class="px-4 py-2 bg-[#A1461D] hover:bg-[#853714] text-white text-[10px] font-black rounded-lg uppercase tracking-wider cursor-pointer disabled:bg-slate-400">
                {{ isLoading ? 'Deploying...' : 'Confirm Node Creation' }}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const token = localStorage.getItem('kmw_token')

const editors = ref([])
const isLoading = ref(false)
const openCreateModal = ref(false)
const feedback = ref(null)

// بيانات وهمية (Fake Data) يتم تحميلها في حال عدم استجابة السيرفر الفعلي للـ API
const mockData = [
  { id: 101, name: 'Ahmad Al-Mansour', email: 'ahmad.m@kmw-cms.com', role: 'admin' },
  { id: 102, name: 'Sarah Connor', email: 's.connor@kmw-cms.com', role: 'editor' },
  { id: 103, name: 'Mustafa Hamdan', email: 'm.hamdan@kmw-cms.com', role: 'editor' }
]

const newEditor = ref({
  name: '',
  email: '',
  password: ''
})

const API_BASE_URL = 'http://localhost/KMW_CMS/kmw-backend/public/api/v1'

const triggerFeedback = (text, type = 'success') => {
  feedback.value = { text, type }
  setTimeout(() => { feedback.value = null }, 4000)
}

// 1. جلب قائمة الحسابات (مع ميزة الـ Fake Data التلقائية)
const fetchEditors = async () => {
  isLoading.value = true
  try {
    const response = await fetch(`${API_BASE_URL}/editors`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) throw new Error('Server offline or 404 route matching failure.')

    const data = await response.json()
    if (data.success) {
      editors.value = data.data || []
    } else {
      throw new Error()
    }
  } catch (error) {
    // تشغيل البيانات الوهمية كخيار بديل عند توقف السيرفر
    editors.value = [...mockData]
    triggerFeedback('API offline. Simulated registry sandbox active (Fake Data Loaded).', 'error')
  } finally {
    isLoading.value = false
  }
}

// 2. دالة إضافة مستخدم جديد (متطابقة مع قواعد البيانات)
const createEditor = async () => {
  isLoading.value = true
  try {
    const response = await fetch(`${API_BASE_URL}/editors/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newEditor.value)
    })

    const data = await response.json()
    if (data.success) {
      triggerFeedback('New node provisioned and injected successfully into active cluster.')
      openCreateModal.value = false
      newEditor.value = { name: '', email: '', password: '' }
      await fetchEditors()
    } else {
      triggerFeedback(data.message || 'Validation mismatch.', 'error')
    }
  } catch (error) {
    // دعم إضافة البيانات الوهمية محلياً في وضع الساندبوكس للتجريب
    const mockId = Math.floor(Math.random() * 1000)
    editors.value.push({
      id: mockId,
      name: newEditor.value.name,
      email: newEditor.value.email,
      role: 'editor'
    })
    triggerFeedback('Local node simulation created (Sandbox Mode).')
    openCreateModal.value = false
    newEditor.value = { name: '', email: '', password: '' }
  } finally {
    isLoading.value = false
  }
}

// 3. دالة تبديل الرتبة بشكل تبادلي (Admin ↔ Editor) متطابقة تماماً مع قواعد البيانات
const toggleUserRole = async (user) => {
  // تحديد الرتبة القادمة بناءً على الحالية
  const targetRole = user.role === 'admin' ? 'editor' : 'admin'

  if (!confirm(`Are you certain you want to reassign this user's clearance level to [${targetRole.toUpperCase()}]?`)) return

  try {
    const response = await fetch(`${API_BASE_URL}/editors/${user.id}/promote`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ role: targetRole }) // يرسل الرتبة المطلوبة مباشرة لقاعدة البيانات
    })

    const data = await response.json()
    if (data.success) {
      triggerFeedback(`Clearance configuration updated to ${targetRole}.`)
      await fetchEditors()
    } else {
      throw new Error()
    }
  } catch (error) {
    // تعديل محلي فوري للبيانات الوهمية لتراها تتغير أمامك مباشرة بالمتصفح
    user.role = targetRole
    triggerFeedback(`Local entity clearance level toggled to ${targetRole} (Sandbox Mode).`)
  }
}

// 4. دالة حذف الحساب
const deleteEditor = async (id) => {
  if (!confirm('Confirm absolute account deletion for this user?')) return
  try {
    const response = await fetch(`${API_BASE_URL}/editors/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    const data = await response.json()
    if (data.success) {
      triggerFeedback('Account purged successfully from base registry.')
      await fetchEditors()
    } else {
      throw new Error()
    }
  } catch (error) {
    // تفعيل حذف البيانات الوهمية محلياً للتجربة
    editors.value = editors.value.filter(e => e.id !== id)
    triggerFeedback('Local object popped and sliced from cluster.', 'error')
  }
}

onMounted(() => {
  fetchEditors()
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
