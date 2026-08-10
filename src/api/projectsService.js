import api from '@/services/api' // أو مسار axios المعتمد لديك

export default {
  // جلب كافة المشاريع
  getProjects() {
    return api.get('/v1/projects')
  },

  // جلب مشروع محدد بواسطة الـ Slug
  getProject(slug) {
    return api.get(`/v1/projects/${slug}`)
  },

  // إنشاء مشروع جديد مع رفع الصور والـ Category ID
  createProject(formData) {
    return api.post('/v1/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // تحديث مشروع قائم
  updateProject(id, formData) {
    // نمرر _method = PUT إذا أرسلت عبر FormData في Laravel
    formData.append('_method', 'PUT')
    return api.post(`/v1/projects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // حذف مشروع
  deleteProject(id) {
    return api.delete(`/v1/projects/${id}`)
  },
}
