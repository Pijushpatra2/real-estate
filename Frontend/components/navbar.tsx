"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Briefcase,
  BookOpen,
  Building,
  Info,
  Phone,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !(navbarRef.current && navbarRef.current.contains(event.target as Node))
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Projects", href: "/projects", icon: <Briefcase size={18} /> },
    { name: "Blogs", href: "/blog", icon: <BookOpen size={18} /> },
    {
      name: "Seller Corner",
      href: "/seller-corner",
      icon: <Building size={18} />,
    },
    {
      name: "About Us",
      href: "/about",
      icon: <Info size={18} />,
      // submenu: [
      //   { name: "Our Team", href: "/team" },
      //   { name: "Careers", href: "/careers" },
      // ],
    },
    { name: "Contact", href: "/contact", icon: <Phone size={18} /> },
  ];

  const loginMenu = {
    name: "Login",
    icon: <Building size={18} />,
    submenu: [
      { name: "Admin Login", href: "/login" },
      { name: "Employee Login", href: "/login/employee" },
    ],
  };

  const toggleMobileSubmenu = (menuName) => {
    setMobileSubmenu(mobileSubmenu === menuName ? null : menuName);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        ref={navbarRef}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#ECECEC] backdrop-blur-md shadow-md"
            : "bg-[#ECECEC] backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="/evernal.png"
                  alt="Evernal Logo"
                  className="h-12 w-28 sm:w-32 md:h-14 md:w-40 lg:h-14 lg:w-48 xl:h-20 xl:w-60"
                />
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center space-x-1 text-sm xl:text-base">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <Link
                    href={item.href}
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-secondary transition-colors"
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                    {item.submenu && <ChevronDown size={16} className="ml-1" />}
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-secondary group-hover:w-4/5 transition-all duration-300" />
                  </Link>

                  {item.submenu && (
                    <div className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative ml-2 text-sm xl:text-base"
              >
                <div className="relative">
                  <button
                    onClick={() => setIsLoginMenuOpen((prev) => !prev)}
                    className="flex items-center px-4 py-2 rounded-md text-white bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    <span className="mr-2">{loginMenu.icon}</span>
                    {loginMenu.name}
                    <ChevronDown
                      size={16}
                      className={`ml-1 transition-transform ${
                        isLoginMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isLoginMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md z-50">
                      {loginMenu.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-secondary transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={sidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="fixed top-0 left-0 h-screen w-80 bg-white z-50 shadow-xl lg:hidden flex flex-col"
            >
              <div className="p-5 flex-1 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <img src="/evernal.png" alt="Logo" className="h-12" />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-700 hover:text-secondary"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="space-y-2 text-sm">
                  {navItems.map((item) => (
                    <div key={item.name} className="border-b border-gray-100">
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => toggleMobileSubmenu(item.name)}
                            className="flex items-center justify-between w-full py-3 px-3 text-gray-700 hover:text-secondary"
                          >
                            <div className="flex items-center">
                              <span className="mr-3">{item.icon}</span>
                              {item.name}
                            </div>
                            <ChevronDown
                              size={18}
                              className={`transition-transform ${
                                mobileSubmenu === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {mobileSubmenu === item.name && (
                            <div className="pl-10 pb-2 space-y-2">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block py-2 px-3 text-gray-600 hover:text-secondary"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center py-3 px-3 text-gray-700 hover:text-secondary"
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}

                  <div className="border-b border-gray-100">
                    <button
                      onClick={() => toggleMobileSubmenu("login")}
                      className="flex items-center justify-between w-full py-3 px-3 bg-gradient-to-r from-secondary to-primary text-white rounded-md"
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{loginMenu.icon}</span>
                        {loginMenu.name}
                      </div>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          mobileSubmenu === "login" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileSubmenu === "login" && (
                      <div className="pl-10 pb-2 space-y-2">
                        {loginMenu.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-2 px-3 text-gray-600 hover:text-secondary"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}





// ==================



// "use client";

// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   Home,
//   Briefcase,
//   BookOpen,
//   Building,
//   Info,
//   Phone,
//   Menu,
//   X,
//   ChevronDown,
// } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileSubmenu, setMobileSubmenu] = useState(null);
//   const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
//   const navbarRef = useRef<HTMLDivElement>(null);
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const pathname = usePathname();

  



//     useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         !(navbarRef.current && navbarRef.current.contains(event.target as Node))
//       ) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   const navItems = [
//     { name: "Home", href: "/", icon: <Home size={18} /> },
//     { name: "Projects", href: "/projects", icon: <Briefcase size={18} /> },
//     { name: "Blogs", href: "/blog", icon: <BookOpen size={18} /> },
//     {
//       name: "Seller Corner",
//       href: "/seller-corner",
//       icon: <Building size={18} />,
//     },
//     {
//       name: "About Us",
//       href: "/about",
//       icon: <Info size={18} />,
//       submenu: [
//         { name: "Our Team", href: "/team" },
//         { name: "Careers", href: "/careers" },
//       ],
//     },
//     { name: "Contact", href: "/contact", icon: <Phone size={18} /> },
//   ];

//   const loginMenu = {
//     name: "Login",
//     icon: <Building size={18} />,
//     submenu: [
//       { name: "Admin Login", href: "/login" },
//       { name: "Employee Login", href: "/login/employee" },
//     ],
//   };

//   const toggleMobileSubmenu = (menuName) => {
//     setMobileSubmenu(mobileSubmenu === menuName ? null : menuName);
//   };




//   return (
//     <>
//     <AnimatePresence>
//       {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//             onClick={() => setIsOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       <div className="hidden lg:flex items-center space-x-1 text-sm xl:text-base">
//         {navItems.map((item) => (
//           <motion.div
//             key={item.name}
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="relative group"
//           >
//             <Link
//               href={item.href}
//               className={`flex items-center px-3 py-2 ${
//                 pathname === item.href
//                   ? "text-secondary"
//                   : "text-gray-700 hover:text-secondary"
//               } transition-colors`}
//             >
//               <span className="mr-2">{item.icon}</span>
//               {item.name}
//               {item.submenu && <ChevronDown size={16} className="ml-1" />}
//               <span
//                 className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-secondary ${
//                   pathname === item.href
//                     ? "w-4/5"
//                     : "w-0 group-hover:w-4/5 transition-all duration-300"
//                 }`}
//               />
//             </Link>

//             {item.submenu && (
//               <div className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                 {item.submenu.map((subItem) => (
//                   <Link
//                     key={subItem.name}
//                     href={subItem.href}
//                     className={`block px-4 py-2 text-sm ${
//                       pathname === subItem.href
//                         ? "bg-gray-100 text-secondary"
//                         : "text-gray-700 hover:bg-gray-50"
//                     }`}
//                   >
//                     {subItem.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         ))}

//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="relative ml-2 text-sm xl:text-base"
//               >
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsLoginMenuOpen((prev) => !prev)}
//                     className="flex items-center px-4 py-2 rounded-md text-white bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
//                   >
//                     <span className="mr-2">{loginMenu.icon}</span>
//                     {loginMenu.name}
//                     <ChevronDown
//                       size={16}
//                       className={`ml-1 transition-transform ${
//                         isLoginMenuOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </button>

//                   {isLoginMenuOpen && (
//                     <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md z-50">
//                       {loginMenu.submenu.map((subItem) => (
//                         <Link
//                           key={subItem.name}
//                           href={subItem.href}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                         >
//                           {subItem.name}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             </div>

//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="lg:hidden p-2 text-gray-700 hover:text-secondary transition"
//               aria-label="Toggle menu"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               ref={sidebarRef}
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
//               className="fixed top-0 left-0 h-screen w-80 bg-white z-50 shadow-xl lg:hidden flex flex-col"
//             >
//               <div className="p-5 flex-1 overflow-y-auto">
//                 <div className="flex justify-between items-center mb-8">
//                   <Link href="/" onClick={() => setIsOpen(false)}>
//                     <img src="/evernal.png" alt="Logo" className="h-12" />
//                   </Link>
//                   <button
//                     onClick={() => setIsOpen(false)}
//                     className="p-2 text-gray-700 hover:text-secondary"
//                     aria-label="Close menu"
//                   >
//                     <X size={24} />
//                   </button>
//                 </div>

//                 <nav className="space-y-2 text-sm">
//                   {navItems.map((item) => (
//                     <div key={item.name} className="border-b border-gray-100">
//                       {item.submenu ? (
//                         <>
//                           <button
//                             onClick={() => toggleMobileSubmenu(item.name)}
//                             className="flex items-center justify-between w-full py-3 px-3 text-gray-700 hover:text-secondary"
//                           >
//                             <div className="flex items-center">
//                               <span className="mr-3">{item.icon}</span>
//                               {item.name}
//                             </div>
//                             <ChevronDown
//                               size={18}
//                               className={`transition-transform ${
//                                 mobileSubmenu === item.name ? "rotate-180" : ""
//                               }`}
//                             />
//                           </button>

//                           {mobileSubmenu === item.name && (
//                             <div className="pl-10 pb-2 space-y-2">
//                               {item.submenu.map((subItem) => (
//                                 <Link
//                                   key={subItem.name}
//                                   href={subItem.href}
//                                   onClick={() => setIsOpen(false)}
//                                   className="block py-2 px-3 text-gray-600 hover:text-secondary"
//                                 >
//                                   {subItem.name}
//                                 </Link>
//                               ))}
//                             </div>
//                           )}
//                         </>
//                       ) : (
//                         <Link
//                           href={item.href}
//                           onClick={() => setIsOpen(false)}
//                           className="flex items-center py-3 px-3 text-gray-700 hover:text-secondary"
//                         >
//                           <span className="mr-3">{item.icon}</span>
//                           {item.name}
//                         </Link>
//                       )}
//                     </div>
//                   ))}

//                   <div className="border-b border-gray-100">
//                     <button
//                       onClick={() => toggleMobileSubmenu("login")}
//                       className="flex items-center justify-between w-full py-3 px-3 bg-gradient-to-r from-secondary to-primary text-white rounded-md"
//                     >
//                       <div className="flex items-center">
//                         <span className="mr-3">{loginMenu.icon}</span>
//                         {loginMenu.name}
//                       </div>
//                       <ChevronDown
//                         size={18}
//                         className={`transition-transform ${
//                           mobileSubmenu === "login" ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>

//                     {mobileSubmenu === "login" && (
//                       <div className="pl-10 pb-2 space-y-2">
//                         {loginMenu.submenu.map((subItem) => (
//                           <Link
//                             key={subItem.name}
//                             href={subItem.href}
//                             onClick={() => setIsOpen(false)}
//                             className="block py-2 px-3 text-gray-600 hover:text-secondary"
//                           >
//                             {subItem.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </nav>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>
//     </>
//   );
// }
