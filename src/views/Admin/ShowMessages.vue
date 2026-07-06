<template>
  <!-- الحاوية ممتدة لـ max-w-6xl لتعطي الجدول حجماً أكبر وأفخم في منتصف الشاشة -->
  <div class="w-full max-w-6xl mx-auto animate-fade-in box-border bg-[#F7F4F0] min-h-screen p-4 sm:p-6 md:p-8" dir="ltr">

    <!-- Header Block -->
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 class="text-2xl md:text-3xl font-black text-[#0A1A2F] tracking-tight uppercase">CONTACT MESSAGES</h3>
        <p class="text-xs text-[#5C728D] font-bold mt-1">Manage, filter, and respond to inbound customer inquiries and stone requests</p>
      </div>

      <RouterLink
        to="/admin/dashboard"
        class="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-white border border-[#EAE3DA] text-xs font-black text-[#0A1A2F] rounded-full transition-all duration-200 hover:bg-[#F7F4F0] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] cursor-pointer whitespace-nowrap"
      >
        <span>← BACK TO DASHBOARD</span>
      </RouterLink>
    </div>

    <!-- ─── CARDS BLOCK: عداد المسجات الذكي ─── -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      <!-- كرت إجمالي الرسائل -->
      <div class="bg-white rounded-2xl border border-[#EAE3DA] p-5 flex items-center justify-between shadow-[0_4px_15px_-3px_rgba(0,0,0,0.02)]">
        <div>
          <span class="block text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Total Messages</span>
          <span class="text-3xl font-black text-[#0A1A2F] mt-1 block">{{ totalCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-[#F7F4F0] flex items-center justify-center text-slate-500 font-bold text-lg">📩</div>
      </div>

      <!-- كرت الرسائل غير المقروءة (باللون البرتقالي المعتمد #A1461D للتنبيه) -->
      <div class="bg-white rounded-2xl border border-[#EAE3DA] p-5 flex items-center justify-between shadow-[0_4px_15px_-3px_rgba(0,0,0,0.02)]">
        <div>
          <span class="block text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Unread Messages</span>
          <span class="text-3xl font-black text-[#A1461D] mt-1 block">{{ unreadCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-[#A1461D]/10 flex items-center justify-center text-[#A1461D] font-bold text-lg">✨</div>
      </div>

      <!-- كرت الرسائل المقروءة -->
      <div class="bg-white rounded-2xl border border-[#EAE3DA] p-5 flex items-center justify-between shadow-[0_4px_15px_-3px_rgba(0,0,0,0.02)]">
        <div>
          <span class="block text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Read Messages</span>
          <span class="text-3xl font-black text-emerald-600 mt-1 block">{{ readCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-lg">✅</div>
      </div>
    </div>

    <!-- ─── FILTER & SEARCH CONTROLS BLOCK ─── -->
    <div class="bg-white rounded-2xl border border-[#EAE3DA] p-4 mb-6 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.02)] flex flex-col md:flex-row gap-4 items-center justify-between">
      <!-- حقل البحث النصي -->
      <div class="relative w-full md:max-w-md">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by sender name, email, or keywords..."
          class="w-full pl-4 pr-4 py-3 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-[#A1461D] text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all duration-300"
        />
      </div>

      <!-- فلتر الحالة كليكبل بالكامل -->
      <div class="flex items-center space-x-2 w-full md:w-auto justify-end">
        <span class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Filter Status:</span>
        <div class="inline-flex rounded-xl border border-[#EAE3DA] p-1 bg-[#F7F4F0]/40">
          <button
            type="button"
            @click="statusFilter = 'all'"
            class="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
            :class="statusFilter === 'all' ? 'bg-[#A1461D] text-white' : 'text-[#5C728D] hover:text-[#0A1A2F]'"
          >
            All
          </button>
          <button
            type="button"
            @click="statusFilter = 'unread'"
            class="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
            :class="statusFilter === 'unread' ? 'bg-[#A1461D] text-white' : 'text-[#5C728D] hover:text-[#0A1A2F]'"
          >
            Unread
          </button>
          <button
            type="button"
            @click="statusFilter = 'read'"
            class="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
            :class="statusFilter === 'read' ? 'bg-[#A1461D] text-white' : 'text-[#5C728D] hover:text-[#0A1A2F]'"
          >
            Read
          </button>
        </div>
      </div>
    </div>

    <!-- ─── MAIN CANVAS TABLE (حجم أكبر وأوضح) ─── -->
    <div class="bg-white rounded-3xl border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] w-full overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse table-auto">

          <!-- Table Head -->
          <thead>
            <tr class="border-b border-[#EAE3DA] bg-[#F7F4F0]/50">
              <th class="p-5 text-xs font-black text-[#5C728D] uppercase tracking-wider w-1/4">Sender Details</th>
              <th class="p-5 text-xs font-black text-[#5C728D] uppercase tracking-wider w-2/5">Message Content</th>
              <th class="p-5 text-xs font-black text-[#5C728D] uppercase tracking-wider text-center w-1/6">Time & Date</th>
              <th class="p-5 text-xs font-black text-[#5C728D] uppercase tracking-wider text-center">Status</th>
              <th class="p-5 text-xs font-black text-[#5C728D] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody class="divide-y divide-[#EAE3DA]/60">
            <tr
              v-for="msg in filteredMessages"
              :key="msg.id"
              class="hover:bg-[#F7F4F0]/30 transition-colors duration-150"
              :class="{'bg-[#A1461D]/5': !msg.is_read}"
            >
              <!-- تفاصيل المرسل الكليكبل بحجم خط أكبر -->
              <td class="p-5 align-middle">
                <div class="flex flex-col space-y-1.5">
                  <span class="text-base font-black text-[#0A1A2F]">{{ msg.name }}</span>
                  <!-- بريد كليكبل -->
                  <a
                    :href="`mailto:${msg.email}`"
                    class="text-xs font-bold text-[#A1461D] hover:underline inline-flex items-center"
                  >
                    {{ msg.email }}
                  </a>
                  <!-- تلفون كليكبل -->
                  <a
                    v-if="msg.phone"
                    :href="`tel:${msg.phone}`"
                    class="text-xs font-bold text-[#5C728D] hover:text-[#0A1A2F] transition-colors"
                  >
                    📱 {{ msg.phone }}
                  </a>
                </div>
              </td>

              <!-- نص الرسالة بحجم أوضح ومريح للعين -->
              <td class="p-5 align-middle">
                <p class="text-sm text-slate-700 font-medium line-clamp-3 leading-relaxed max-w-md">
                  {{ msg.message }}
                </p>
              </td>

              <!-- عمود الوقت والتاريخ المستقل الواضح جداً -->
              <td class="p-5 align-middle text-center whitespace-nowrap">
                <div class="flex flex-col space-y-0.5">
                  <span class="text-xs font-black text-[#0A1A2F]">{{ msg.time }}</span>
                  <span class="text-[10px] font-bold text-slate-400">{{ msg.date }}</span>
                </div>
              </td>

              <!-- حالة الرسالة كليكبل للتبديل السريع -->
              <td class="p-5 align-middle text-center whitespace-nowrap">
                <button
                  @click="toggleReadStatus(msg)"
                  class="inline-flex items-center px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase transition-all duration-200 cursor-pointer"
                  :class="msg.is_read
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-[#A1461D]/10 text-[#A1461D] border border-[#A1461D]/20'"
                >
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="msg.is_read ? 'bg-emerald-500' : 'bg-[#A1461D]'"></span>
                  {{ msg.is_read ? 'Read' : 'Unread' }}
                </button>
              </td>

              <!-- زر المعاينة وفتح المودال -->
              <td class="p-5 align-middle text-right whitespace-nowrap">
                <button
                  @click="openMessageModal(msg)"
                  class="px-4 py-2.5 bg-[#F7F4F0] hover:bg-[#A1461D] text-[#0A1A2F] hover:text-white border border-[#EAE3DA] text-xs font-black rounded-xl transition-all duration-200 uppercase tracking-wider cursor-pointer shadow-xs"
                >
                  View Message
                </button>
              </td>
            </tr>

            <!-- لا يوجد نتائج -->
            <tr v-if="filteredMessages.length === 0">
              <td colspan="5" class="p-12 text-center text-sm font-bold text-[#5C728D]">
                No contact messages found matching your search criteria.
              </td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>

    <!-- ─── MODAL DIALOG DISPLAY ─── -->
    <div v-if="selectedMessage" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div class="bg-white rounded-3xl border border-[#EAE3DA] shadow-2xl w-full max-w-xl overflow-hidden transform transition-all duration-300">

        <!-- Modal Header -->
        <div class="border-b border-[#EAE3DA] p-5 bg-[#F7F4F0]/40 flex items-center justify-between">
          <div>
            <h4 class="text-sm font-black text-[#0A1A2F] uppercase tracking-wider">Inbound Inquiry Details</h4>
            <p class="text-[10px] text-slate-400 font-bold mt-0.5">Received on {{ selectedMessage.date }} @ {{ selectedMessage.time }}</p>
          </div>
          <button @click="closeMessageModal" class="text-slate-400 hover:text-[#A1461D] transition-colors cursor-pointer text-sm font-bold">✕</button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-4">
          <!-- تفاصيل سريعة للمرسل -->
          <div class="grid grid-cols-2 gap-4 p-4 bg-[#F7F4F0]/30 border border-[#EAE3DA] rounded-xl text-xs">
            <div>
              <span class="block text-[10px] font-black text-[#5C728D] uppercase">Sender Name</span>
              <span class="font-bold text-[#0A1A2F] text-sm">{{ selectedMessage.name }}</span>
            </div>
            <div>
              <span class="block text-[10px] font-black text-[#5C728D] uppercase">Phone Line</span>
              <a :href="`tel:${selectedMessage.phone}`" class="font-bold text-[#A1461D] text-sm hover:underline">{{ selectedMessage.phone || 'N/A' }}</a>
            </div>
            <div class="col-span-2">
              <span class="block text-[10px] font-black text-[#5C728D] uppercase">Email Target</span>
              <a :href="`mailto:${selectedMessage.email}`" class="font-bold text-[#A1461D] text-sm hover:underline">{{ selectedMessage.email }}</a>
            </div>
          </div>

          <!-- نص الرسالة الكامل المكتوب -->
          <div class="flex flex-col space-y-1.5">
            <span class="text-[10px] font-black text-[#5C728D] uppercase tracking-wider">Full Message Block</span>
            <div class="p-4 bg-white border border-[#EAE3DA] rounded-xl text-sm font-medium text-slate-700 max-h-56 overflow-y-auto leading-relaxed whitespace-pre-wrap">
              {{ selectedMessage.message }}
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-4 border-t border-[#EAE3DA]/60 bg-[#F7F4F0]/20 flex justify-end">
          <button
            @click="closeMessageModal"
            class="px-5 py-2.5 bg-[#A1461D] hover:bg-amber-950 text-white text-xs font-black rounded-xl transition-all duration-200 uppercase tracking-widest cursor-pointer"
          >
            Close Dialog
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// بيانات تجريبية مبنية بالملي على الـ Migration وفصلنا الوقت والتاريخ بناء على طلبك
const messages = ref([
  {
    id: 1,
    name: 'Fayez Alqedra',
    email: 'fayez@kmw-stone.com',
    phone: '+966 50 123 4567',
    message: 'Hello, I am interested in ordering 500 square meters of Imperial Gold Granite for a villa compound project in Riyadh. Please provide a pricing catalogue and delivery timeline.',
    is_read: false,
    time: '09:30 AM',
    date: '2026-07-05'
  },
  {
    id: 2,
    name: 'Architect Khalid',
    email: 'khalid@design-studio.ae',
    phone: '+971 4 999 8888',
    message: 'Do you offer custom book-match alignment setups for Carrara White Marble blocks? Looking forward to collaborating with your technical workshop team.',
    is_read: true,
    time: '04:15 PM',
    date: '2026-07-04'
  },
  {
    id: 3,
    name: 'Eng. Sarah Ahmed',
    email: 'sarah@kmw-stone.com',
    phone: '+966 55 444 3322',
    message: 'Urgent request for Quartz samples. We have an upcoming hospitality gallery build next week.',
    is_read: false,
    time: '11:05 AM',
    date: '2026-07-02'
  }
])

const searchQuery = ref('')
const statusFilter = ref('all') // Options: 'all', 'unread', 'read'
const selectedMessage = ref(null)

// ─── COMPUTED STATS CODES (حساب الأعداد للكروت التفاعلية تلقائياً) ───
const totalCount = computed(() => messages.value.length)
const unreadCount = computed(() => messages.value.filter(m => !m.is_read).length)
const readCount = computed(() => messages.value.filter(m => m.is_read).length)

// ─── COMPUTED FILTER LOGIC (البحث والفلترة الفورية معاً) ───
const filteredMessages = computed(() => {
  return messages.value.filter(msg => {
    // 1. فلترة الحالة
    const matchesStatus =
      statusFilter.value === 'all' ||
      (statusFilter.value === 'unread' && !msg.is_read) ||
      (statusFilter.value === 'read' && msg.is_read)

    // 2. فلترة البحث النصي
    const query = searchQuery.value.toLowerCase().trim()
    const matchesSearch =
      !query ||
      msg.name.toLowerCase().includes(query) ||
      msg.email.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query) ||
      (msg.phone && msg.phone.includes(query))

    return matchesStatus && matchesSearch
  })
})

// تغيير حالة القراءة عند الضغط عليها كليكبل
const toggleReadStatus = (msg) => {
  msg.is_read = !msg.is_read
}

// فتح المودال لقراءة النص وتحويله لقراءة تلقائية
const openMessageModal = (msg) => {
  selectedMessage.value = msg
  msg.is_read = true
}

const closeMessageModal = () => {
  selectedMessage.value = null
}
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
