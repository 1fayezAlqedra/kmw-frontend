import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/admin/dashboard',
  },

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
      // --- قسم التصنيفات (Categories) ---
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
      // --- قسم المنتجات (Products) ---
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
      // --- قسم المشاريع (Projects) ---
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
      }
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
