<template>
  <div class="w-full flex flex-col space-y-8 md:space-y-14 animate-fade-in px-4 sm:px-0 box-border overflow-hidden">

    <!-- --- Stats Cards Grid --- -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
      <!-- Total Messages Card -->
      <div class="bg-white rounded-2xl p-6 border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(139,92,26,0.12)] hover:-translate-y-2 group select-none min-h-[180px] relative overflow-hidden">
        <div class="text-center">
          <p class="text-[11px] text-amber-800/80 font-black uppercase tracking-[0.2em]">Total Messages</p>
        </div>
        <div class="flex flex-col items-center justify-center my-2 space-y-2">
          <div class="p-2.5 rounded-xl bg-[#F7F4F0] text-amber-900 border border-[#EAE3DA]/60">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-3.586-3.586a2 2 0 00-2.828 0L12 14m0 0l-3.586-3.586a2 2 0 00-2.828 0L4 13" />
            </svg>
          </div>
          <h3 class="text-4xl font-black text-slate-900 tracking-tight">{{ messages.length }}</h3>
        </div>
        <div class="text-center text-[11px] text-slate-400 font-bold uppercase tracking-wider">
          All Inquiries Combined
        </div>
      </div>

      <!-- Unread Messages Card -->
      <div class="bg-white rounded-2xl p-6 border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(139,92,26,0.12)] hover:-translate-y-2 group select-none min-h-[180px] relative overflow-hidden">
        <div class="text-center">
          <p class="text-[11px] text-amber-800/80 font-black uppercase tracking-[0.2em]">Unread Inquiries</p>
        </div>
        <div class="flex flex-col items-center justify-center my-2 space-y-2">
          <div class="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 relative">
            <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-4.8a2 2 0 012.22 0l8 4.8A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5" />
            </svg>
          </div>
          <h3 class="text-4xl font-black text-amber-700 tracking-tight">{{ unreadCount }}</h3>
        </div>
        <div class="text-center text-[11px] text-amber-800 font-extrabold uppercase tracking-wider animate-pulse">
          Requires Attention
        </div>
      </div>

      <!-- Read Messages Card (جديد) -->
      <div class="bg-white rounded-2xl p-6 border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(139,92,26,0.12)] hover:-translate-y-2 group select-none min-h-[180px] relative overflow-hidden">
        <div class="text-center">
          <p class="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em]">Read Inquiries</p>
        </div>
        <div class="flex flex-col items-center justify-center my-2 space-y-2">
          <div class="p-2.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-200/60">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-4xl font-black text-slate-700 tracking-tight">{{ readCount }}</h3>
        </div>
        <div class="text-center text-[11px] text-slate-400 font-bold uppercase tracking-wider">
          Archived & Answered
        </div>
      </div>
    </div>

    <!-- --- Filters & Search Bar --- -->
    <div class="bg-white rounded-2xl p-4 border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] flex flex-col lg:flex-row gap-4 justify-between items-center w-full box-border">
      <!-- Search Input -->
      <div class="relative w-full lg:max-w-xs">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search client, email..."
          class="w-full pl-11 pr-4 py-3 bg-[#F7F4F0]/50 border border-[#E2D9CD] text-sm font-medium text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white transition-all box-border"
        />
      </div>

      <!-- Time Filter Dropdown (جديد ومنطقي) -->
      <div class="relative w-full lg:w-56">
        <select
          v-model="timeFilter"
          class="w-full px-4 py-3 bg-[#F7F4F0] border border-[#E2D9CD] text-xs font-black uppercase tracking-wider text-slate-700 rounded-xl focus:outline-none focus:border-amber-950 transition-all appearance-none cursor-pointer"
        >
          <option value="all">All Time</option>
          <option value="24h">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
        <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      <!-- Read/Unread Filter Tabs -->
      <div class="flex items-center space-x-1.5 bg-[#F7F4F0] p-1 rounded-xl w-full lg:w-auto overflow-x-auto no-scrollbar">
        <button
          @click="statusFilter = 'all'"
          :class="['px-4 py-2.5 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap', statusFilter === 'all' ? 'bg-amber-950 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800']">
          All
        </button>
        <button
          @click="statusFilter = 'unread'"
          :class="['px-4 py-2.5 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap', statusFilter === 'unread' ? 'bg-amber-950 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800']">
          Unread
        </button>
        <button
          @click="statusFilter = 'read'"
          :class="['px-4 py-2.5 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap', statusFilter === 'read' ? 'bg-amber-950 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800']">
          Read
        </button>
      </div>
    </div>

    <!-- --- Messages Table Container (Responsive Wrapper) --- -->
    <div class="bg-white rounded-2xl p-4 sm:p-8 border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] w-full overflow-x-auto block">
      <div class="min-w-[1000px] w-full">

        <!-- Table Header -->
        <div class="grid grid-cols-12 border-b border-[#EAE3DA] pb-4 text-slate-400 text-xs font-black uppercase tracking-widest px-4">
          <div class="col-span-3">Client Info</div>
          <div class="col-span-2">Phone Number</div>
          <div class="col-span-4">Message Snippet</div>
          <div class="col-span-1 text-center">Received</div>
          <div class="col-span-2 text-right">Actions</div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredMessages.length === 0" class="py-16 text-center flex flex-col items-center justify-center space-y-4">
          <div class="p-4 bg-[#F7F4F0] text-slate-400 rounded-full border border-[#EAE3DA]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-3.586-3.586a2 2 0 00-2.828 0L12 14m0 0l-3.586-3.586a2 2 0 00-2.828 0L4 13" />
            </svg>
          </div>
          <div>
            <h5 class="text-base font-black text-slate-800 uppercase tracking-wide">No Messages Found</h5>
            <p class="text-xs text-slate-400 font-bold mt-1">Try adjusting your search criteria or filters</p>
          </div>
        </div>

        <!-- Table Rows -->
        <div class="divide-y divide-[#EAE3DA]/50 w-full flex flex-col">
          <div
            v-for="msg in filteredMessages"
            :key="msg.id"
            :class="[
              'grid grid-cols-12 gap-0 py-5 items-center hover:bg-[#F7F4F0]/20 transition-all duration-200 px-4',
              msg.isUnread ? 'bg-amber-600/[0.01]' : ''
            ]"
          >
            <!-- Client Info -->
            <div class="col-span-3 flex flex-col space-y-1 relative">
              <span :class="['text-sm truncate block', msg.isUnread ? 'font-black text-slate-900' : 'font-bold text-slate-700']">
                <span v-if="msg.isUnread" class="inline-block w-2 h-2 rounded-full bg-amber-700 mr-2 shrink-0"></span>
                {{ msg.clientName }}
              </span>
              <a :href="`mailto:${msg.clientEmail}`" class="text-xs text-slate-400 hover:text-amber-900 font-bold transition-colors underline decoration-dotted underline-offset-4 truncate block">
                {{ msg.clientEmail }}
              </a>
            </div>

            <!-- Phone Number -->
            <div class="col-span-2 text-sm text-slate-600 font-semibold truncate">
              <a :href="`tel:${msg.clientPhone}`" class="hover:text-amber-900 transition-colors">
                {{ msg.clientPhone }}
              </a>
            </div>

            <!-- Message Body Snippet -->
            <div class="col-span-4 pr-6">
              <p :class="['text-sm truncate', msg.isUnread ? 'text-slate-900 font-bold' : 'text-slate-500 font-medium']">
                {{ msg.content }}
              </p>
            </div>

            <!-- Date Received -->
            <div class="col-span-1 text-center">
              <span class="inline-block text-[11px] text-amber-900 font-black uppercase tracking-widest bg-[#F7F4F0] px-2.5 py-1 rounded-lg border border-[#E2D9CD]/70 whitespace-nowrap">
                {{ msg.dateLabel }}
              </span>
            </div>

            <!-- Operational Actions -->
            <div class="col-span-2 flex items-center justify-end space-x-2">
              <button
                @click="toggleReadStatus(msg.id)"
                class="p-2 bg-white hover:bg-[#F7F4F0] text-slate-500 hover:text-amber-900 rounded-xl border border-[#E2D9CD] transition-all cursor-pointer shadow-xs"
                :title="msg.isUnread ? 'Mark as Read' : 'Mark as Unread'"
              >
                <svg v-if="msg.isUnread" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-4.8a2 2 0 012.22 0l8 4.8A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5" />
                </svg>
              </button>

              <button
                @click="openModal(msg)"
                class="px-4 py-2 bg-white hover:bg-amber-950 text-slate-800 hover:text-white font-black text-xs rounded-xl border-2 border-[#E2D9CD] hover:border-amber-950 transition-all duration-300 uppercase tracking-widest shadow-sm cursor-pointer text-center"
              >
                View
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- --- Message Detail Modal --- -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div @click="closeModal" class="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"></div>

      <div class="bg-[#F7F4F0] rounded-2xl border border-[#EAE3DA] shadow-2xl w-full max-w-lg overflow-hidden z-10 animate-scale-up flex flex-col justify-between max-h-[90vh]">
        <div class="px-6 py-5 bg-white border-b border-[#EAE3DA] flex items-center justify-between">
          <div>
            <h3 class="text-lg font-black text-slate-900 uppercase tracking-wide">Message Details</h3>
            <p class="text-[10px] text-amber-800 font-extrabold tracking-widest uppercase mt-0.5">KMW Platform Inquiry</p>
          </div>
          <button @click="closeModal" class="w-8 h-8 bg-[#F7F4F0] hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-xl flex items-center justify-center cursor-pointer border border-[#E2D9CD] transition-all text-sm">
            ✕
          </button>
        </div>

        <div class="p-6 space-y-5 overflow-y-auto no-scrollbar flex-1">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-3.5 rounded-xl border border-[#EAE3DA]/70">
              <span class="block text-[10px] text-slate-400 font-black uppercase tracking-wider mb-1">Sender Client</span>
              <span class="text-sm font-black text-slate-900 block truncate">{{ selectedMessage?.clientName }}</span>
            </div>
            <div class="bg-white p-3.5 rounded-xl border border-[#EAE3DA]/70">
              <span class="block text-[10px] text-slate-400 font-black uppercase tracking-wider mb-1">Timeline Received</span>
              <span class="text-sm font-bold text-amber-900 block truncate">{{ selectedMessage?.dateLabel }}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-xl border border-[#EAE3DA]/70 flex flex-col space-y-1">
              <span class="block text-[10px] text-slate-400 font-black uppercase tracking-wider">Email Address</span>
              <a :href="`mailto:${selectedMessage?.clientEmail}`" class="text-sm font-bold text-amber-950 hover:underline break-all truncate">
                {{ selectedMessage?.clientEmail }}
              </a>
            </div>
            <div class="bg-white p-4 rounded-xl border border-[#EAE3DA]/70 flex flex-col space-y-1">
              <span class="block text-[10px] text-slate-400 font-black uppercase tracking-wider">Phone Number</span>
              <a :href="`tel:${selectedMessage?.clientPhone}`" class="text-sm font-bold text-amber-950 hover:underline break-all truncate">
                {{ selectedMessage?.clientPhone }}
              </a>
            </div>
          </div>

          <div class="bg-white p-5 rounded-xl border border-[#EAE3DA]/70 flex flex-col space-y-2 min-h-[140px]">
            <span class="block text-[10px] text-slate-400 font-black uppercase tracking-wider border-b border-[#F7F4F0] pb-1">Full Message Content</span>
            <p class="text-sm text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
              {{ selectedMessage?.content }}
            </p>
          </div>
        </div>

        <div class="px-6 py-4 bg-white border-t border-[#EAE3DA] flex items-center justify-end space-x-3">
          <button @click="closeModal" class="px-5 py-3 bg-[#F7F4F0] hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl border border-[#E2D9CD] transition-all uppercase tracking-widest cursor-pointer shadow-xs">
            Close
          </button>
          <a :href="`mailto:${selectedMessage?.clientEmail}?subject=Regarding your inquiry to KMW Marble`" class="px-6 py-3 bg-amber-950 hover:bg-amber-900 text-white font-black text-xs rounded-xl transition-all uppercase tracking-widest shadow-md text-center block">
            Reply via Email
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// داتا مهيأة بالكامل لاختبار الفلتر الزمني والـ Dropdown بدقة
const messages = ref([
  {
    id: 1,
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    clientPhone: '+1 (555) 234-5678',
    content: 'Interested in Carrara Marble slabs for a luxury villa project. I need detailed pricing regarding premium selections, expected production lead time, and shipping facilities directly to Dubai.',
    dateLabel: '2 hours ago',
    created_at: new Date(new Date().getTime() - 2 * 60 * 60 * 1000), // منذ ساعتين (أقل من 24 ساعة)
    isUnread: true
  },
  {
    id: 2,
    clientName: 'Sarah Smith',
    clientEmail: 'sarah.s@design.com',
    clientPhone: '+1 (555) 876-5432',
    content: 'Requesting the latest wholesale catalog for interior designers. We have multiple upcoming residential complexes looking for top-tier marble supplier alternatives.',
    dateLabel: '3 days ago',
    created_at: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // منذ 3 أيام (أقل من أسبوع)
    isUnread: false
  },
  {
    id: 3,
    clientName: 'Michael Chang',
    clientEmail: 'm.chang@builders.io',
    clientPhone: '+852 9876 5432',
    content: 'Do you offer customized cutting options for large architectural cut-to-size formats? We have specific requirements for a commercial lobby wall cladding concept.',
    dateLabel: '3 weeks ago',
    created_at: new Date(new Date().getTime() - 21 * 24 * 60 * 60 * 1000), // منذ 3 أسابيع (أقل من شهر)
    isUnread: true
  },
  {
    id: 4,
    clientName: 'Elena Rostova',
    clientEmail: 'elena.r@luxury.ru',
    clientPhone: '+7 (903) 123-4567',
    content: 'Looking for a reliable supplier of Calacatta Gold for our hotel project in Moscow. Please provide available blocks and slab dimensions.',
    dateLabel: '5 months ago',
    created_at: new Date(new Date().getTime() - 150 * 24 * 60 * 60 * 1000), // منذ 5 أشهر (داخل السنة)
    isUnread: false
  }
])

const searchQuery = ref('')
const statusFilter = ref('all')
const timeFilter = ref('all') // 'all', '24h', 'week', 'month', 'year'
const isModalOpen = ref(false)
const selectedMessage = ref(null)

// إحصائيات الكروت الذكية
const unreadCount = computed(() => messages.value.filter(m => m.isUnread).length)
const readCount = computed(() => messages.value.filter(m => !m.isUnread).length)

// الفلترة الشاملة
const filteredMessages = computed(() => {
  const now = new Date()

  return messages.value.filter(msg => {
    // 1. فلتر البحث
    const matchesSearch = msg.clientName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          msg.clientEmail.toLowerCase().includes(searchQuery.value.toLowerCase())

    // 2. فلتر الحالة
    let matchesStatus = true
    if (statusFilter.value === 'unread') matchesStatus = msg.isUnread
    if (statusFilter.value === 'read') matchesStatus = !msg.isUnread

    // 3. فلتر الوقت الدقيق (Dropdown)
    let matchesTime = true
    const diffTime = Math.abs(now - msg.created_at)
    const diffHours = diffTime / (1000 * 60 * 60)
    const diffDays = diffHours / 24

    if (timeFilter.value === '24h') matchesTime = diffHours <= 24
    if (timeFilter.value === 'week') matchesTime = diffDays <= 7
    if (timeFilter.value === 'month') matchesTime = diffDays <= 30
    if (timeFilter.value === 'year') matchesTime = diffDays <= 365

    return matchesSearch && matchesStatus && matchesTime
  })
})

const toggleReadStatus = (id) => {
  const msg = messages.value.find(m => m.id === id)
  if (msg) msg.isUnread = !msg.isUnread
}

const openModal = (msg) => {
  selectedMessage.value = msg
  isModalOpen.value = true
  msg.isUnread = false
}

const closeModal = () => {
  isModalOpen.value = false
  selectedMessage.value = null
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
