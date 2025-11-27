// // app/layout.tsx
// "use client"

// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import Navbar from "@/components/navbar"
// import ChatbotButton from "@/components/chatbot/ChatbotButton"
// import Footer from "@/components/footer" // <-- Import Footer
// import { usePathname } from "next/navigation"
// import { use } from "react"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Evernal Group | Premium Property Solutions",
//   description: "Discover premium commercial and residential properties with Evernal Group",
//   // icons
// }
//   const pathname = usePathname()
//   const isDashboard = pathname?.startsWith("/dashboard")

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {!isDashboard && <Navbar />}
//         {children}
//         <ChatbotButton />
//         {!isDashboard && <Footer />}
//       </body>
//     </html>
//   )
// }


// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LayoutWrapper from "./LayoutWrapper"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Evernal Group | Premium Property Solutions",
  description: "Discover premium commercial and residential properties with Evernal Group",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster/>
      </body>
    </html>
  )
}
