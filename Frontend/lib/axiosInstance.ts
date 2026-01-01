import axios from "axios"

// Get from .env.local
const ROOT_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const API_BASE_URL = `${ROOT_BASE_URL}/api/v1`
export const MEDIA_BASE_URL = ROOT_BASE_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
}) 



// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token")
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default api
