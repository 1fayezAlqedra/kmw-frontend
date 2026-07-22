import apiClient from './api';

export default {
  /**
   * Get all categories from the backend
   */
  getAll() {
    return apiClient.get('categories');
  },

  /**
   * Send new category data (including the image file) to the backend
   * We pass the formData object directly
   */
  create(formData) {
    return apiClient.post('categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};
