import apiClient from './api'

export default {
  login(credentials) {
    return apiClient.post('auth/login', credentials)
  },
}

