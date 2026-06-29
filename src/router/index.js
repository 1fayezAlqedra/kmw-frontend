import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Admin/Login.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const routes = [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: Login
  },
  {
    path: '/admin',
    component: AdminLayout,
    // أي صفحة نضعها داخل الـ children ستفتح تلقائياً داخل الـ Layout الرئيسي (مكان الكرت الأبيض)
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/layouts/AdminLayout.vue')
      }
    ]
  },
  // تحويل تلقائي: إذا دخل المستخدم على رابط الـ /admin مباشرة يحوله لصفحة الـ login
  {
    path: '/admin/:pathMatch(.*)*',
    redirect: '/admin/login'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
