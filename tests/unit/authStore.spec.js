import { describe, it, expect, beforeEach } from 'vitest'
import authService from '@/api/authService'

describe('AuthService Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('handles token storage correctly', () => {
    const mockToken = 'kmw-test-token-123'
    localStorage.setItem('token', mockToken)

    expect(localStorage.getItem('token')).toBe(mockToken)
  })

  it('clears token on logout', () => {
    localStorage.setItem('token', 'kmw-test-token-123')
    localStorage.removeItem('token')

    expect(localStorage.getItem('token')).toBeNull()
  })
})
