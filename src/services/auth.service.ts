import axios from 'axios'
import { type User, Register, Login } from '../types/User'

class AuthService {
  baseUrl: string
  token = localStorage.getItem('token')

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async register(body: Register) {
    const { data } = await axios.post(`${this.baseUrl}/register/`, body, {
        headers: {
            'Content-Type': 'application/json'
          }
    
    })
    return data.message
  }

  async login(body: Login): Promise<User> {
    const { data } = await axios.post(`${this.baseUrl}/login/`, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    localStorage.setItem('token', data.access)
    return data.user
  }

  async logout() {
    localStorage.removeItem('token')
  }

}

export const authService = new AuthService(import.meta.env.VITE_BACKEND_URL)
