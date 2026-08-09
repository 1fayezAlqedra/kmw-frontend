import axios from 'axios'

// إنشاء Instance موحد لجميع طلبات مشروع KMW
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1', // مسار سيرفر Laravel
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// إرفاق التوكن مع كل طلب بشكل آلي عند توفره
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
  }
)

// التعامل مع الأخطاء العامة (مثل انتهاء الصلاحية 401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token')
      // يمكنك توجيهه لصفحة التسجيل إن أردت:
      // window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
