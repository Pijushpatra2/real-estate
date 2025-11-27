"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, MapPin, Building2, Home, ArrowRight } from "lucide-react"

export default function ProjectFinder() {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const projects = [
    {
      id: 1,
      title: "Evernal Heights",
      type: "Residential",
      location: "Downtown Metro",
      image: "/placeholder.svg?height=500&width=800",
      description: "Luxury apartments with panoramic city views and premium amenities.",
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Evernal Business Tower",
      type: "Commercial",
      location: "Financial District",
      image: "/placeholder.svg?height=500&width=800",
      description: "Grade A office spaces with smart building technology and sustainable design.",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "Evernal Residences",
      type: "Residential",
      location: "Suburban Paradise",
      image: "/placeholder.svg?height=500&width=800",
      description: "Exclusive villas with private gardens and community facilities.",
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: 4,
      title: "Evernal Retail Plaza",
      type: "Commercial",
      location: "Shopping District",
      image: "/placeholder.svg?height=500&width=800",
      description: "Prime retail spaces in high-footfall areas with modern infrastructure.",
      icon: <Building2 className="h-5 w-5" />,
    },
  ]

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: activeIndex * carouselRef.current.offsetWidth,
        behavior: "smooth",
      })
    }
  }, [activeIndex])

  return (
    <div className="my-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-black">Featured Projects</h2>
      <div className="h-1 w-20 bg-lime-500 mb-10"></div>

      <div className="relative">
        <div ref={carouselRef} className="flex overflow-hidden snap-x snap-mandatory">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="min-w-full snap-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center mr-3">
                      {project.icon}
                      <span className="ml-1">{project.type}</span>
                    </span>
                    <span className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {project.location}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
                  <p className="text-gray-600 mb-6">{project.description}</p>

                  <Link href={`/projects/${project.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group bg-gradient-to-r from-lime-500 to-lime-400 text-white px-5 py-2 rounded-md flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
                    >
                      View Project Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-lime-500 w-10" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
