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

      <div class="text-center space-y-2 w-full">
        <h1 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">Admin Dashboard</h1>
        <p class="text-xl md:text-2xl font-light text-slate-600">Login page</p>
      </div>

      <form class="space-y-6 w-full flex flex-col items-center" @submit.prevent="handleLogin">

        <div class="w-full max-w-sm">
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider text-center">Email</label>
            <input v-model="email" type="email" required dir="ltr"
              class="w-full px-5 py-3.5 bg-white/90 border border-slate-300 rounded-2xl text-slate-900 text-center text-lg shadow-sm focus:outline-none focus:border-slate-900 focus:bg-white transition-all duration-200" />
          </div>
        </div>

        <div class="w-full max-w-sm">
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider text-center">Password</label>
            <input v-model="password" type="password" required dir="ltr"
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
              <span class="relative z-10 group-hover:text-slate-900 transition-colors duration-300">Login now</span>
            </button>
          </div>
        </div>

        <div class="w-full max-w-sm text-center pt-2">
          <router-link to="/forgot-password" class="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Forget password?</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Showcase Login attempt:', { email: email.value, password: password.value })

  // تخزين توكن وهمي لتخطي حماية المسارات (Route Guards) إن وجدت
  localStorage.setItem('auth_token', 'mocked_admin_token_for_showcase')

  // التوجيه المباشر إلى الداشبورد
  router.push('/admin/dashboard')
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
