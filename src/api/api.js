import axios from 'axios'

/**
 * Server Base URL & Storage URL
 */
export const SERVER_URL = 'http://127.0.0.1:8000'
export const STORAGE_URL = `${SERVER_URL}/storage`

/**
 * Helper utility to convert relative DB image paths to absolute HTTP URLs
 * Input: "project_categories/dKZBo6FFNJ6ioNmVQsgAwuPPrWWeymB3lykyMYVq.png"
 * Output: "http://127.0.0.1:8000/storage/project_categories/dKZBo6FFNJ6ioNmVQsgAwuPPrWWeymB3lykyMYVq.png"
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return ''

  // If already absolute URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  const cleanPath = imagePath.replace(/^\//, '')

  if (cleanPath.startsWith('storage/')) {
    return `${SERVER_URL}/${cleanPath}`
  }

  return `${STORAGE_URL}/${cleanPath}`
}

/**
 * Custom Axios instance configured for KMW Application API.
 */
const apiClient = axios.create({
  baseURL: `${SERVER_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/**
 * Request Interceptor: Automatically attaches Bearer token to headers.
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * Response Interceptor: Passes standard Axios response object
 * and handles global authentication error states.
 */
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('token')
      localStorage.removeItem('token_data')
      localStorage.removeItem('user')
      localStorage.removeItem('role')
    }
    return Promise.reject(error)
  },
)

/**
 * Project Categories API Endpoints
 */
export const projectCategoriesApi = {
  getProjectCategories: () => apiClient.get('/project-categories'),
  getProjectCategory: (id) => apiClient.get(`/project-categories/${id}`),
  createProjectCategory: (data) => apiClient.post('/project-categories', data),
  updateProjectCategory: (id, data) => apiClient.post(`/project-categories/${id}?_method=PUT`, data),
  deleteProjectCategory: (id) => apiClient.delete(`/project-categories/${id}`),
}

/**
 * System Settings API Endpoints
 */
export const settingsApi = {
  getSettings: () => apiClient.get('/settings'),
  updateSettings: (data) => apiClient.post('/settings', data),
}

/**
 * Admin Accounts Management API Endpoints (Super Admin Only)
 */
export const adminsApi = {
  getAdmins: () => apiClient.get('/admins'),
  createAdmin: (data) => apiClient.post('/admins', data),
  updateAdmin: (id, data) => apiClient.put(`/admins/${id}`, data),
  deleteAdmin: (id) => apiClient.delete(`/admins/${id}`),
}

export default apiClient
