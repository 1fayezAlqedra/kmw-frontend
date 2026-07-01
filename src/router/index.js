import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/admin/dashboard',
  },

  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '', // في حال دخل المستخدم على /admin فقط
        redirect: '/admin/dashboard',
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/Admin/Main.vue'),
      },
      {
        path: 'categories',
        name: 'ShowCategories',
        component: () => import('@/views/Admin/ShowCategories.vue'),
      },
      {
        path: 'add-category',
        name: 'AddCategory',
        component: () => import('@/views/Admin/AddCategory.vue'),
      },
      {
        path: 'edit-category/:id', // هنا نمرر الـ id كـ параметр ديناميكي
        name: 'EditCategory',
        component: () => import('@/views/Admin/EditCategory.vue'),
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/admin/dashboard',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
