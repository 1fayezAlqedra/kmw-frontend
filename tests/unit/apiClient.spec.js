import { describe, it, expect, beforeEach } from 'vitest'
import api from '@/api/api'

describe('API Service Axios Interceptor', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('attaches Bearer Token to Request Headers when present in localStorage', async () => {
    const testToken = 'kmw-bearer-test-123'
    localStorage.setItem('token', testToken)

    const config = { headers: {} }

    // فحص محاكاة الـ interceptor
    const updatedConfig = api.interceptors.request.handlers[0].fulfilled(config)

    expect(updatedConfig.headers.Authorization).toBe(`Bearer ${testToken}`)
  })
})
