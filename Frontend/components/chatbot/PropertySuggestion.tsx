"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Building2, Home, MapPin, ArrowRight } from "lucide-react"

type PropertySuggestionProps = {
  property: {
    id: number
    title: string
    type: string
    location: string
    image: string
    price: string
  }
}

export default function PropertySuggestion({ property }: PropertySuggestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="flex">
        <div className="relative h-24 w-24 flex-shrink-0">
          <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
        </div>

        <div className="p-2 flex-1">
          <div className="flex items-center mb-1">
            {property.type === "commercial" ? (
              <Building2 className="h-3 w-3 text-lime-500 mr-1" />
            ) : (
              <Home className="h-3 w-3 text-lime-500 mr-1" />
            )}
            <span className="text-xs text-gray-600 capitalize">{property.type}</span>
          </div>

          <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{property.title}</h4>

          <div className="flex items-center mt-1 mb-1">
            <MapPin className="h-3 w-3 text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">{property.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-lime-600">{property.price}</span>

            <Link href={`/projects/${property.id}`}>
              <button className="text-xs text-lime-500 flex items-center hover:underline">
                View
                <ArrowRight className="h-3 w-3 ml-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
