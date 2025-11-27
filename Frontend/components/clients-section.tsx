"use client"

import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"

export default function ClientsSection() {
  const clients = [
    { id: 1, name: "Company A", logo: "/Home/partComLogo/1.webp" },
    { id: 2, name: "Company B", logo: "/Home/partComLogo/2.webp" },
    { id: 3, name: "Company C", logo: "/Home/partComLogo/4.webp" },
    { id: 4, name: "Company D", logo: "/Home/partComLogo/5.webp" },
    { id: 5, name: "Company E", logo: "/Home/partComLogo/6.webp" },
    { id: 6, name: "Company F", logo: "/Home/partComLogo/7.webp" },
    { id: 7, name: "Company G", logo: "/Home/partComLogo/8.webp" },
    { id: 8, name: "Company H", logo: "/Home/partComLogo/9.webp" },
    { id: 9, name: "Company I", logo: "/Home/partComLogo/10.webp" },
    { id: 10, name: "Company J", logo: "/Home/partComLogo/11.webp" },
    { id: 12, name: "Company L", logo: "/Home/partComLogo/13.webp" },
    { id: 13, name: "Company M", logo: "/Home/partComLogo/14.webp" },
    { id: 14, name: "Company N", logo: "/Home/partComLogo/15.webp" },
    { id: 15, name: "Company O", logo: "/Home/partComLogo/16.png" },
    { id: 16, name: "Company P", logo: "/Home/partComLogo/17.webp" },
    // { id: 17, name: "Company Q", logo: "/Home/partComLogo/18.png" },
    { id: 18, name: "Company R", logo: "/Home/partComLogo/19.png" },
    { id: 19, name: "Company S", logo: "/Home/partComLogo/20.webp" },
    { id: 20, name: "Company T", logo: "/Home/partComLogo/21.webp" },
    { id: 21, name: "Company U", logo: "/Home/partComLogo/22.webp" },
    { id: 22, name: "Company V", logo: "/Home/partComLogo/23.webp" },
    { id: 23, name: "Company W", logo: "/Home/partComLogo/24.webp" },
    { id: 24, name: "Company X", logo: "/Home/partComLogo/25.webp" },
  ]

  return (
    <div className="my-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-black">Our Partners</h2>
      <div className="h-1 w-20 bg-secondary mb-10"></div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 20 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 30 },
          1024: { slidesPerView: 5, spaceBetween: 30 },
          1280: { slidesPerView: 6, spaceBetween: 30 },
        }}
        loop
        className="px-2"
      >
        {clients.map((client, index) => (
          <SwiperSlide key={client.id}>
            <div
              className="bg-white h-32 w-44 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center border-2 border-gray-200"
            >
          <img
              src={client.logo || "/placeholder.svg"}
              alt={client.name}
              className="object-contain object-center h-full w-full p-2"
            />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
