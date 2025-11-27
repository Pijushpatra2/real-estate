"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

export default function LocationMap() {
  const [activeLocation, setActiveLocation] = useState<number | null>(null)

  const locations = [
    { id: 1, name: "Downtown Metro", projects: 12, coordinates: { x: 30, y: 40 } },
    { id: 2, name: "Financial District", projects: 8, coordinates: { x: 60, y: 30 } },
    { id: 3, name: "Suburban Paradise", projects: 15, coordinates: { x: 75, y: 60 } },
    { id: 4, name: "Shopping District", projects: 6, coordinates: { x: 40, y: 70 } },
    { id: 5, name: "Tech Hub", projects: 9, coordinates: { x: 20, y: 60 } },
  ]

  return (
    <div className="bg-gray-50 rounded-xl p-6 md:p-10">
      <div className="relative h-[400px] md:h-[500px] bg-white rounded-lg shadow-inner overflow-hidden">
        {/* Simplified map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Location pins */}
        {locations.map((location) => (
          <motion.div
            key={location.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: location.id * 0.1 }}
            className="absolute cursor-pointer"
            style={{
              left: `${location.coordinates.x}%`,
              top: `${location.coordinates.y}%`,
            }}
            onMouseEnter={() => setActiveLocation(location.id)}
            onMouseLeave={() => setActiveLocation(null)}
          >
            <motion.div
              animate={{
                scale: activeLocation === location.id ? 1.2 : 1,
              }}
              className="relative"
            >
              <MapPin
                className={`h-8 w-8 ${
                  activeLocation === location.id ? "text-lime-500 filter drop-shadow-lg" : "text-gray-700"
                }`}
              />

              {/* Pulse animation */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
                className="absolute -inset-1 rounded-full bg-lime-500/30"
                style={{ display: activeLocation === location.id ? "block" : "none" }}
              />

              {/* Location info tooltip */}
              {activeLocation === location.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-white p-3 rounded-lg shadow-lg z-10 w-48"
                >
                  <h4 className="font-bold text-gray-900">{location.name}</h4>
                  <p className="text-gray-600 text-sm">{location.projects} Properties</p>
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-white transform rotate-45"></div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {locations.slice(0, 3).map((location) => (
          <motion.div
            key={location.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 text-lime-500 mr-2" />
              <h4 className="font-bold">{location.name}</h4>
            </div>
            <p className="text-gray-600 text-sm">{location.projects} Properties Available</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
