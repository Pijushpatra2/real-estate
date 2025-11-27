//dashboard/layout.tsx

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import { Toaster } from "@/components/ui/toaster"
import api from "@/lib/axiosInstance"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        router.replace("/login")
        return
      }

      try {
        // Validate token with your backend
        const response = await api.get("/admin/auth/validate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 200) {
          setIsAuthenticated(true)
        } else {
          throw new Error("Invalid token")
        }
      } catch (error) {
        // Token is invalid, remove it and redirect to login
        localStorage.removeItem("token")
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        router.replace("/login")
        return
      } finally {
        setLoading(false)
      }
    }

    validateToken()
  }, [router])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  // If not authenticated, don't render anything (redirect is happening)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 p-8">{children}</div>
      <Toaster />
    </div>
  )
}
