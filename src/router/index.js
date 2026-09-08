import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // --------------------------------------------------------------------------
  // 1. Client Landing Page Route (الصفحات العامة)
  // --------------------------------------------------------------------------
  {
    path: '/',
    name: 'Home',
    component: () => import('@/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/public/AboutUs.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/public/ContactUs.vue'),
  },

  // --------------------------------------------------------------------------
  // 2. Services Pages
  // --------------------------------------------------------------------------
  {
    path: '/services',
    name: 'Services',
    component: () => import('@/views/public/ServicesView.vue'),
  },
  {
    path: '/services/:category',
    name: 'service-detail',
    component: () => import('@/views/public/ServiceDetailView.vue'),
  },

  // --------------------------------------------------------------------------
  // 3. Client Pages
  // --------------------------------------------------------------------------
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/public/ProductsView.vue'),
  },
  {
    path: '/videos',
    name: 'Videos',
    component: () => import('../views/public/Videos.vue'),
  },

  // --------------------------------------------------------------------------
  // 4. Authentication Routes
  // --------------------------------------------------------------------------
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Admin/Login.vue'),
    meta: { requiresGuest: true }
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

  // --------------------------------------------------------------------------
  // 5. Admin Dashboard Routes (محمية)
  // --------------------------------------------------------------------------
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
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
      // Categories (Product Categories)
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
      // Project Categories
      {
        path: 'project-categories',
        name: 'showProjectCategories',
        component: () => import('../views/Admin/showProjectCategories.vue'),
      },
      {
        path: 'add-project-category',
        name: 'AddProjectCategory',
        component: () => import('../views/Admin/AddProjectCategory.vue'),
      },
      {
        path: 'edit-project-category/:id',
        name: 'EditProjectCategory',
        component: () => import('../views/Admin/EditProjectCategory.vue'),
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

  // --------------------------------------------------------------------------
  // 6. 404 Fallback
  // --------------------------------------------------------------------------
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0 }
  },
})

// --------------------------------------------------------------------------
// Navigation Guard: فحص التوكن ومدى صلاحيته الزمنيّة (ساعتان)
// --------------------------------------------------------------------------
router.beforeEach((to) => {
  const tokenDataString = localStorage.getItem('token_data')
  let validToken = null

  if (tokenDataString) {
    try {
      const tokenData = JSON.parse(tokenDataString)
      const now = new Date().getTime()

      // التحقق هل انتهت الساعتان أم لا
      if (now > tokenData.expiry) {
        // انتهت الصلاحية: تنظيف البيانات المحفوظة
        localStorage.removeItem('token_data')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
      } else {
        validToken = tokenData.token
      }
    } catch (e) {
      // إذا كان الملف غير صالح
      localStorage.removeItem('token_data')
      localStorage.removeItem('token')
    }
  }

  // الحماية حسب إعدادات الصفحات وإرجاع كائن التوجيه المباشر بدلاً من next()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!validToken) {
      return { name: 'Login' }
    }
  } else if (to.matched.some(record => record.meta.requiresGuest) && validToken) {
    return { name: 'AdminDashboard' }
  }
})

export default router
