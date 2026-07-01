import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/admin/dashboard',
  },

  {
    path: '/admin',
    // تغيير الاستيراد هنا ليكون مسار نسبي مباشر ومستقر
    component: () => import('../layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/admin/dashboard',
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/Admin/Main.vue'),
      },
      {
        path: 'categories',
        name: 'ShowCategories',
        component: () => import('../views/Admin/ShowCategories.vue'),
      },
      {
        path: 'add-category',
        name: 'AddCategory',
        component: () => import('../views/Admin/AddCategory.vue'),
      },
      {
        path: 'edit-category/:id',
        name: 'EditCategory',
        component: () => import('../views/Admin/EditCategory.vue'),
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
