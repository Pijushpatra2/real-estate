"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import ChatbotButton from "@/components/chatbot/ChatbotButton"
import Footer from "@/components/footer"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith("/dashboard")
  const [allowed, setAllowed] = useState(false)
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    if (isDashboard) {
      const token = localStorage.getItem("token")
      if (!token) {
        window.location.href = "/login"
      } else {
        setAllowed(true)
      }
      setChecked(true)
    } else {
      setChecked(true)
    }
  }, [isDashboard])

  if (isDashboard && (!checked || !allowed)) return null

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      <ChatbotButton />
      {!isDashboard && <Footer />}
    </>
  )
}
