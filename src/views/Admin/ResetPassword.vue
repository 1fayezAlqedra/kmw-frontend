<template>
  <div class="min-h-screen flex items-center justify-center main-marble-bg p-4">
    <div class="w-full max-w-sm bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl">
      <h2 class="text-2xl font-black text-center mb-6">New Password</h2>

      <form @submit.prevent="updatePassword" class="space-y-4">
        <!-- حقل كلمة المرور الجديدة -->
        <input v-model="password" type="password" placeholder="New Password" required
          class="w-full px-4 py-3 rounded-xl border border-slate-300 text-center" />

        <!-- حقل تأكيد كلمة المرور -->
        <input v-model="password_confirmation" type="password" placeholder="Confirm Password" required
          class="w-full px-4 py-3 rounded-xl border border-slate-300 text-center" />

        <button type="submit" class="w-full py-3 bg-slate-950 text-white rounded-xl font-bold">
          Update Password
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const password = ref('')
const password_confirmation = ref('')

// استخراج الـ token والإيميل من الرابط
const token = route.query.token
const email = route.query.email

const updatePassword = async () => {
  try {
    const response = await fetch('http://localhost/KMW_CMS/kmw-backend/public/api/v1/password/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        email,
        password: password.value,
        password_confirmation: password_confirmation.value
      })
    })

    const data = await response.json()
    if (data.success) {
      alert('Password updated successfully!')
      router.push('/') // تحويله لصفحة اللوجن
    }
  } catch (error) {
    alert('Failed to reset password.')
  }
}
</script>
