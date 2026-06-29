<template>
  <div class="w-full flex flex-col space-y-8 md:space-y-14 animate-fade-in px-4 sm:px-0 box-border overflow-hidden">

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">

      <div class="bg-white rounded-2xl p-6 border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(139,92,26,0.12)] hover:-translate-y-2 group select-none min-h-[240px] relative overflow-hidden">
        <div class="text-center">
          <p class="text-[11px] text-amber-800/80 font-black uppercase tracking-[0.2em]">Total Categories</p>
        </div>
        <div class="flex flex-col items-center justify-center my-2 space-y-2">
          <div class="p-2.5 rounded-xl bg-[#F7F4F0] text-amber-900 border border-[#EAE3DA]/60">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <h3 class="text-4xl font-black text-slate-900 tracking-tight">12</h3>
        </div>
        <button class="w-full py-3.5 bg-[#F7F4F0]/70 hover:bg-amber-950 text-slate-800 hover:text-white font-black text-xs rounded-xl border border-[#E2D9CD] transition-all duration-300 uppercase tracking-widest cursor-pointer shadow-sm">
          View Categories
        </button>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(139,92,26,0.12)] hover:-translate-y-2 group select-none min-h-[240px] relative overflow-hidden">
        <div class="text-center">
          <p class="text-[11px] text-amber-800/80 font-black uppercase tracking-[0.2em]">Premium Products</p>
        </div>
        <div class="flex flex-col items-center justify-center my-2 space-y-2">
          <div class="p-2.5 rounded-xl bg-[#F7F4F0] text-amber-900 border border-[#EAE3DA]/60">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>
          </div>
          <h3 class="text-4xl font-black text-slate-900 tracking-tight">148</h3>
        </div>
        <button class="w-full py-3.5 bg-[#F7F4F0]/70 hover:bg-amber-950 text-slate-800 hover:text-white font-black text-xs rounded-xl border border-[#E2D9CD] transition-all duration-300 uppercase tracking-widest cursor-pointer shadow-sm">
          View Products
        </button>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(139,92,26,0.12)] hover:-translate-y-2 group select-none min-h-[240px] relative overflow-hidden">
        <div class="text-center">
          <p class="text-[11px] text-amber-800/80 font-black uppercase tracking-[0.2em]">Previous Projects</p>
        </div>
        <div class="flex flex-col items-center justify-center my-2 space-y-2">
          <div class="p-2.5 rounded-xl bg-[#F7F4F0] text-amber-900 border border-[#EAE3DA]/60">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <h3 class="text-4xl font-black text-slate-900 tracking-tight">24</h3>
        </div>
        <button class="w-full py-3.5 bg-[#F7F4F0]/70 hover:bg-amber-950 text-slate-800 hover:text-white font-black text-xs rounded-xl border border-[#E2D9CD] transition-all duration-300 uppercase tracking-widest cursor-pointer shadow-sm">
          View Projects
        </button>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(139,92,26,0.12)] hover:-translate-y-2 group select-none min-h-[240px] relative overflow-hidden">
        <div class="text-center">
          <p class="text-[11px] text-amber-800/80 font-black uppercase tracking-[0.2em]">Videos</p>
        </div>
        <div class="flex flex-col items-center justify-center my-2 space-y-2">
          <div class="p-2.5 rounded-xl bg-[#F7F4F0] text-amber-900 border border-[#EAE3DA]/60">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 022 2z" /></svg>
          </div>
          <h3 class="text-4xl font-black text-slate-900 tracking-tight">16</h3>
        </div>
        <button class="w-full py-3.5 bg-[#F7F4F0]/70 hover:bg-amber-950 text-slate-800 hover:text-white font-black text-xs rounded-xl border border-[#E2D9CD] transition-all duration-300 uppercase tracking-widest cursor-pointer shadow-sm">
          View Videos
        </button>
      </div>

    </div>

    <div class="bg-white rounded-2xl p-4 sm:p-8 border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] w-full box-border">

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#EAE3DA] pb-5 mb-5">
        <div>
          <h4 class="text-xl md:text-2xl font-black text-slate-900 tracking-wide uppercase">Recent Messages</h4>
          <p class="text-xs text-slate-400 font-bold mt-1">Latest inquiries from the contact page</p>
        </div>
        <button class="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-[#F7F4F0] hover:bg-amber-950 hover:text-white text-amber-900 border border-[#E2D9CD] text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-widest cursor-pointer shadow-sm text-center">
          View All Messages
        </button>
      </div>

      <div class="w-full box-border overflow-hidden">

        <div class="hidden md:grid md:grid-cols-12 border-b border-[#EAE3DA] pb-3 text-slate-400 text-xs font-black uppercase tracking-widest pl-4 pr-4">
          <div class="col-span-3">Client</div>
          <div class="col-span-5">Message</div>
          <div class="col-span-2 text-center">Date</div>
          <div class="col-span-2 text-right">Action</div>
        </div>

        <div class="divide-y divide-[#EAE3DA]/50 w-full flex flex-col">

          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 py-5 md:py-6 items-center hover:bg-[#F7F4F0]/20 transition-colors duration-200 rounded-xl md:rounded-none px-2 md:px-4">

            <div class="col-span-1 md:col-span-3 flex flex-col space-y-1">
              <span class="text-base font-black text-slate-900 truncate">John Doe</span>
              <a href="mailto:john@example.com" class="text-xs text-slate-400 hover:text-amber-900 font-bold transition-colors underline decoration-dotted underline-offset-4 truncate break-all">
                john@example.com
              </a>
            </div>

            <div class="col-span-1 md:col-span-5 pr-2">
              <p class="text-sm text-slate-600 font-medium leading-relaxed md:truncate">
                Interested in Carrara Marble slabs for a luxury villa project...
              </p>
            </div>

            <div class="col-span-1 md:col-span-2 text-left md:text-center">
              <span class="inline-block text-[11px] text-amber-900 font-black uppercase tracking-widest bg-[#F7F4F0] px-2.5 py-1 rounded-lg border border-[#E2D9CD]/70">
                2 hours ago
              </span>
            </div>

            <div class="col-span-1 md:col-span-2 text-right w-full">
              <button class="w-full md:w-auto px-6 py-3.5 bg-white hover:bg-amber-950 text-slate-800 hover:text-white font-black text-xs rounded-xl border-2 border-[#E2D9CD] hover:border-amber-950 transition-all duration-300 uppercase tracking-widest shadow-sm cursor-pointer text-center">
                Open Message
              </button>
            </div>

          </div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 py-5 md:py-6 items-center hover:bg-[#F7F4F0]/20 transition-colors duration-200 rounded-xl md:rounded-none px-2 md:px-4">

            <div class="col-span-1 md:col-span-3 flex flex-col space-y-1">
              <span class="text-base font-black text-slate-900 truncate">Sarah Smith</span>
              <a href="mailto:sarah.s@design.com" class="text-xs text-slate-400 hover:text-amber-900 font-bold transition-colors underline decoration-dotted underline-offset-4 truncate break-all">
                sarah.s@design.com
              </a>
            </div>

            <div class="col-span-1 md:col-span-5 pr-2">
              <p class="text-sm text-slate-600 font-medium leading-relaxed md:truncate">
                Requesting the latest wholesale catalog for interior designers.
              </p>
            </div>

            <div class="col-span-1 md:col-span-2 text-left md:text-center">
              <span class="inline-block text-[11px] text-amber-900 font-black uppercase tracking-widest bg-[#F7F4F0] px-2.5 py-1 rounded-lg border border-[#E2D9CD]/70">
                Yesterday
              </span>
            </div>

            <div class="col-span-1 md:col-span-2 text-right w-full">
              <button class="w-full md:w-auto px-6 py-3.5 bg-white hover:bg-amber-950 text-slate-800 hover:text-white font-black text-xs rounded-xl border-2 border-[#E2D9CD] hover:border-amber-950 transition-all duration-300 uppercase tracking-widest shadow-sm cursor-pointer text-center">
                Open Message
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

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
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
