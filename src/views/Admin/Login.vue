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

        <div v-if="errorMessage" class="w-full max-w-sm text-center text-red-600 font-bold text-sm bg-red-50/80 backdrop-blur-sm py-3 px-4 rounded-2xl border border-red-200/50 transition-all duration-300">
          {{ errorMessage }}
        </div>

        <div class="w-full max-w-sm">
          <div class="relative group pt-4">
            <button type="submit" :disabled="loading"
              class="w-full py-4 px-6 bg-slate-950 text-white text-lg font-bold rounded-2xl transition-all duration-500 relative overflow-hidden group cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
              <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out pointer-events-none bg-cover bg-center marble-bg-hover">
              </div>
              <span class="relative z-10 group-hover:text-slate-900 transition-colors duration-300">
                {{ loading ? 'Checking...' : 'Login now' }}
              </span>
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
import authService from '@/api/authService'
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = () => {
  loading.value = true
  errorMessage.value = ''

  // تجميع البيانات لإرسالها
  const credentials = {
    email: email.value,
    password: password.value
  }

  // إرسال الطلب الفعلي عبر Axios للباك إيند
  authService.login(credentials)
    .then(response => {
      if (response.data.success) {
        // لقطنا الـ Token الحقيقي الصادر من الـ Laravel Sanctum
        const token = response.data.access_token

        // تخزين التوكن الحقيقي في المتصفح
        localStorage.setItem('token', token)

        // التوجيه المباشر والآمن للداشبورد
        router.push('/admin/dashboard')
      }
    })
    .catch(error => {
      // عرض تفاصيل الخطأ القادم من السيرفر
      if (error.response && error.response.data) {
        errorMessage.value = error.response.data.message || 'Invalid email or password.'
      } else {
        errorMessage.value = 'Connection error. Please check if the backend server is running.'
      }
    })
    .finally(() => {
      loading.value = false
    })
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
