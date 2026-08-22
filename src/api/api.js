import axios from 'axios'

/**
 * Custom Axios instance configured for KMW Application API.
 */
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
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
    // Return standard response object to maintain predictable API contracts
    return response
  },
  (error) => {
    // Handle unauthorized access (401) globally
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('token')

      // Optional: Redirect to login page on unauthorized session
      // window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

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
