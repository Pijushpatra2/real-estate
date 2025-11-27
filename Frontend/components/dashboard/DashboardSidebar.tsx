// "use client"

// import Link from "next/link"
// import { usePathname, useRouter } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { LayoutDashboard, Home, Building2, MapPin, Settings, FileText, Menu, X, LogOut } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useState } from "react"
// import Image from "next/image"

// export default function DashboardSidebar() {
//   const pathname = usePathname()
//     const router = useRouter()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   const routes = [
//     {
//       label: "Dashboard",
//       icon: LayoutDashboard,
//       href: "/dashboard",
//       active: pathname === "/dashboard",
//     },
//     {
//       label: "Properties",
//       icon: Building2,
//       href: "/dashboard/properties",
//       active: pathname.includes("/dashboard/properties"),
//     },
//     {
//       label: "Cities",
//       icon: MapPin,
//       href: "/dashboard/cities",
//       active: pathname.includes("/dashboard/cities"),
//     },
//     {
//       label: "Blogs",
//       icon: FileText,
//       href: "/dashboard/blogs",
//       active: pathname.includes("/dashboard/blogs"),
//     },
//     {
//       label: "Visitor data",
//       icon: FileText,
//       href: "/dashboard/visitordata",
//       active: pathname.includes("/dashboard/visitordata"),
//     },
//     // {
//     //   label: "Settings",
//     //   icon: Settings,
//     //   href: "/dashboard/settings",
//     //   active: pathname.includes("/dashboard/settings"),
//     // },
//   ]

//     const handleLogout = () => {
//     localStorage.removeItem("token")
//     document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
//     router.push("/login")
//   }

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <div className="lg:hidden flex items-center justify-between p-4 border-b">
//         <div className="flex items-center">
//           <Image src="/evernal.png" alt="Evernal Logo" width={32} height={32} className="mr-2" />
//           <span className="font-bold text-lg">Evernal Admin</span>
//         </div>
//         <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//           {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </Button>
//       </div>

//       {/* Sidebar for desktop and mobile */}
//       <div
//         className={cn(
//           "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r lg:static lg:block transition-all duration-300 transform",
//           isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
//         )}
//       >
//         <div className="p-6 flex items-center border-b h-[80px]">
//           <Image src="/evernal.png" alt="Evernal Logo" width={32} height={32} className="mr-2" />
//           <span className="font-bold text-lg">Evernal Admin</span>
//         </div>

//         <div className="flex flex-col p-4">
//           <div className="space-y-1">
//             {routes.map((route) => (
//               <Link key={route.href} href={route.href} onClick={() => setIsMobileMenuOpen(false)}>
//                 <div
//                   className={cn(
//                     "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-[#0B5D48]",
//                     route.active ? "bg-[#F8F4EF] text-[#0B5D48] font-medium" : "text-gray-500",
//                   )}
//                 >
//                   <route.icon className="h-4 w-4" />
//                   {route.label}
//                 </div>
//               </Link>
//             ))}
//           </div>

// <div className="pt-4 border-t space-y-1">
//             <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
//               <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-[#0B5D48] text-gray-500">
//                 <Home className="h-4 w-4" />
//                 Back to Website
//               </div>
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-red-600 text-gray-500"
//             >
//               <LogOut className="h-4 w-4" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Overlay for mobile */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
//       )}
//     </>
//   )
// }





"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Home, Building2, MapPin, Settings, FileText, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Properties",
      icon: Building2,
      href: "/dashboard/properties",
      active: pathname.includes("/dashboard/properties"),
    },
    {
      label: "Cities",
      icon: MapPin,
      href: "/dashboard/cities",
      active: pathname.includes("/dashboard/cities"),
    },
    {
      label: "Blogs",
      icon: FileText,
      href: "/dashboard/blogs",
      active: pathname.includes("/dashboard/blogs"),
    },
    {
      label: "Visitor data",
      icon: FileText,
      href: "/dashboard/visitordata",
      active: pathname.includes("/dashboard/visitordata"),
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem("token")
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    router.push("/login")
  }

  if (!isMounted) return null

  return (
    <>
      {/* Mobile Menu Button - Fixed position */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white border-b shadow-sm">
        <div className="flex items-center">
          <Image src="/evernal.png" alt="Evernal Logo" width={32} height={32} className="mr-2" />
          <span className="font-bold text-lg">Evernal Admin</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="z-60"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r lg:static lg:z-auto lg:block transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="p-6 flex items-center border-b h-[80px]">
          <Image src="/evernal.png" alt="Evernal Logo" width={32} height={32} className="mr-2" />
          <span className="font-bold text-lg">Evernal Admin</span>
        </div>

        <div className="flex flex-col p-4 h-[calc(100%-80px)] overflow-y-auto">
          <div className="space-y-1">
            {routes.map((route) => (
              <Link 
                key={route.href} 
                href={route.href} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-[#0B5D48]",
                    route.active ? "bg-[#F8F4EF] text-[#0B5D48] font-medium" : "text-gray-500",
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>

          <div className="pt-4 mt-auto border-t space-y-1">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-[#0B5D48] text-gray-500">
                <Home className="h-4 w-4" />
                Back to Website
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-red-600 text-gray-500"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay - only visible when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}