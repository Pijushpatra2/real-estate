// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { Building } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { useToast } from "@/components/ui/use-toast"
// import api from "@/lib/axiosInstance"

// export default function LoginPage() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       const response = await api.post(`/admin/auth/login`, formData, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })

//       const data = response.data

//       // Store token consistently with dashboard layout
//       if (data.token) {
//         localStorage.setItem("token", data.token) // Changed from "authToken" to "token"
//         document.cookie = `token=${data.token}; path=/; secure; samesite=strict`
//       }

//       toast({
//         title: "Login successful",
//         description: "Welcome to Evernal Group Admin Dashboard",
//       })

//       // Redirect to dashboard
//       router.push("/dashboard")
//     } catch (error: any) {
//   if (error.response) {
//     const status = error.response.status;
//     const msg =
//       error.response.data?.error ||
//       error.response.data?.message ||
//       "Something went wrong";

//     if (status === 400) {
//       toast({
//         title: "Incorrect Password",
//         description: msg || "The password you entered is incorrect.",
//         variant: "destructive",
//       });
//     } else if (status === 404) {
//       toast({
//         title: "User Not Found",
//         description: msg || "No admin account found with this email address.",
//         variant: "destructive",
//       });
//     } else {
//       toast({
//         title: "Login failed",
//         description: msg,
//         variant: "destructive",
//       });
//     }
//   } else {
//     toast({
//       title: "Network Error",
//       description: "Unable to reach the server. Please try again later.",
//       variant: "destructive",
//     });
//   }
// }


//      finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         <div className="flex justify-center mb-6">
//           <div className="flex items-center">
//             <div className="bg-gradient-to-r from-green-800 to-green-600 p-2 rounded-lg mr-2">
//               <Building className="h-6 w-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold">Evernal Group</span>
//           </div>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Admin Login</CardTitle>
//             <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
//           </CardHeader>
//           <form onSubmit={handleSubmit}>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="admin@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? "Logging in..." : "Login"}
//               </Button>
//             </CardFooter>
//           </form>
//         </Card>

//         <div className="text-center mt-6">
//           <Link href="/" className="text-sm text-gray-600 hover:text-lime-600">
//             ← Back to Website
//           </Link>
//         </div>
//       </motion.div>
//     </div>
//   )
// }




"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import api from "@/lib/axiosInstance"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/dashboard")
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Attempting login with:", { email: formData.email })

      const response = await api.post(`/admin/auth/login`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("Login response:", response.data)
      const data = response.data

      // Store token consistently with dashboard layout
      if (data.token) {
        localStorage.setItem("token", data.token)
        document.cookie = `token=${data.token}; path=/; secure; samesite=strict`

        toast({
          title: "Login successful",
          description: "Welcome to Evernal Group Admin Dashboard",
        })

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        throw new Error("No token received from server")
      }
    } catch (error: any) {
      console.error("Login error:", error)

      let title = "Login failed"
      let description = "Something went wrong. Please try again."

      if (error.response) {
        const status = error.response.status
        const errorData = error.response.data

        console.log("Error response:", { status, data: errorData })

        switch (status) {
          case 400:
            title = "Invalid Input"
            description = errorData?.message || errorData?.error || "Please check your email and password."
            break
          case 401:
            title = "Invalid Credentials"
            description = errorData?.message || errorData?.error || "Incorrect email or password."
            break
          case 404:
            title = "User Not Found"
            description = errorData?.message || errorData?.error || "No admin account found with this email."
            break
          case 500:
            title = "Server Error"
            description = "Internal server error. Please try again later."
            break
          default:
            description = errorData?.message || errorData?.error || "An unexpected error occurred."
        }
      } else if (error.request) {
        title = "Network Error"
        description = "Unable to reach the server. Please check your connection."
      } else {
        description = error.message || "An unexpected error occurred."
      }

      toast({
        title,
        description,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Test toast function
  const testToast = () => {
    toast({
      title: "Test Toast",
      description: "This is a test toast message",
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-green-800 to-green-600 p-2 rounded-lg mr-2">
              <Building className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Evernal Group</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              {/* Test button - remove this in production */}
              <Button type="button" variant="outline" onClick={testToast} className="w-full">
                Test Toast
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-lime-600">
            ← Back to Website
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
