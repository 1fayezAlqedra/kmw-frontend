<template>
  <div
    class="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4 relative overflow-hidden font-sans main-marble-bg">

    <div class="absolute inset-0 bg-white/5 pointer-events-none"></div>

    <div
      class="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[40%] xl:max-w-[32%] bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] p-8 md:p-12 border border-white/60 relative z-10 transition-all duration-300 flex flex-col items-center">

      <div class="flex justify-center mb-2 w-full">
        <div
          class="w-24 h-24 bg-white/80 p-2 rounded-2xl shadow-md border border-black/5 flex items-center justify-center">
          <img src="@/assets/images/logo.png" alt="KMW Logo" class="max-w-full max-h-full object-contain" />
        </div>
      </div>

      <div class="text-center space-y-2 w-full mb-6">
        <h1 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">Recovery</h1>
        <p class="text-sm md:text-base font-semibold text-slate-500">Enter your email to receive reset instructions</p>
      </div>

      <form class="space-y-6 w-full flex flex-col items-center" @submit.prevent="handleReset">

        <div class="w-full max-w-sm">
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider text-center">Registered
              Email</label>
            <input v-model="email" type="email" required dir="ltr" placeholder="admin@kmw.com"
              class="w-full px-5 py-3.5 bg-white/90 border border-slate-300 rounded-2xl text-slate-900 text-center text-lg shadow-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all duration-200" />
          </div>
        </div>

        <div class="w-full max-w-sm">
          <div class="relative group pt-4">
            <button type="submit"
              class="w-full py-4 px-6 bg-slate-950 text-white text-lg font-bold rounded-2xl transition-all duration-500 relative overflow-hidden group cursor-pointer shadow-md">
              <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out pointer-events-none bg-cover bg-center marble-bg-hover">
              </div>
              <span class="relative z-10 group-hover:text-slate-900 transition-colors duration-300">Send
                Instructions</span>
            </button>
          </div>
        </div>

        <div class="w-full max-w-sm text-center pt-2">
          <router-link to="/"
            class="text-sm text-slate-600 hover:text-slate-900 font-semibold transition-colors underline-offset-4 hover:underline">
            Back to Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const handleReset = () => {
  console.log('Recovery requested for:', email.value)
  alert('If this email exists in our registry, instructions have been dispatched. 📩')
}
</script>

<style scoped>
.main-marble-bg {
  background-image: url('@/assets/images/akbar-nemati-ZVMlab81PFY-unsplash.jpg');
}

.marble-bg-hover {
  background-image: url('@/assets/images/login_btn_hover.avif');
}
</style>
