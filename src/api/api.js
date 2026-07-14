import axios from 'axios';

const apiClient = axios.create({
  // الرابط الصحيح مع الـ v1 لمطابقة مسارات الـ Laravel عندك
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// الحارس اللي بيلصق التوكن تلقائياً في الطلبات المحمية بعد تسجيل الدخول
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
