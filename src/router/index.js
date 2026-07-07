import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Authentication Routes
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Admin/Login.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/Admin/ForgotPassword.vue'),
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../views/Admin/ResetPassword.vue'),
  },

  // Admin Dashboard Routes
  {
    path: '/admin',
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
      // Team Management
      {
        path: 'team-management',
        name: 'TeamManagement',
        component: () => import('../views/Admin/TeamManagement.vue'),
      },
      // Categories
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
      // Products
      {
        path: 'products',
        name: 'ShowProducts',
        component: () => import('../views/Admin/ShowProducts.vue'),
      },
      {
        path: 'add-product',
        name: 'AddProduct',
        component: () => import('../views/Admin/AddProduct.vue'),
      },
      {
        path: 'edit-product/:id',
        name: 'EditProduct',
        component: () => import('../views/Admin/EditProduct.vue'),
      },
      // Projects
      {
        path: 'projects',
        name: 'ShowProjects',
        component: () => import('../views/Admin/ShowProjects.vue'),
      },
      {
        path: 'add-project',
        name: 'AddProject',
        component: () => import('../views/Admin/AddProject.vue'),
      },
      {
        path: 'edit-project/:id',
        name: 'EditProject',
        component: () => import('../views/Admin/EditProject.vue'),
      },
      // Videos
      {
        path: 'videos',
        name: 'ShowVideos',
        component: () => import('../views/Admin/ShowVideos.vue'),
      },
      {
        path: 'add-video',
        name: 'AddVideo',
        component: () => import('../views/Admin/AddVideo.vue'),
      },
      {
        path: 'edit-video/:id',
        name: 'EditVideo',
        component: () => import('../views/Admin/EditVideo.vue'),
      },
      // Contact Messages
      {
        path: 'messages',
        name: 'ShowMessages',
        component: () => import('../views/Admin/ShowMessages.vue'),
      },
      // System Settings
      {
        path: 'settings',
        name: 'ShowSettings',
        component: () => import('../views/Admin/ShowSettings.vue'),
      },
    ],
  },

  // 404 Fallback
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0 }
  },
})

export default router
