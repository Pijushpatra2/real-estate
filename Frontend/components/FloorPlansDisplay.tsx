// components/FloorPlansDisplay.tsx
"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ImageIcon, Loader2, X, Download, ChevronRight, Search, ArrowUpDown, Info } from "lucide-react"
import Image from "next/image"
import api from "@/lib/axiosInstance"
import { MEDIA_BASE_URL } from "@/lib/axiosInstance"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"

interface FloorPlan {
  floor_plan_id: string | number
  floor_name: string
  floor_price: string
  floor_size: string
  floor_img?: string
  [key: string]: any
}

interface FloorPlansDisplayProps {
  propertyId: string | number
}

export function FloorPlansDisplay({ propertyId }: FloorPlansDisplayProps) {
  const { toast } = useToast()
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([])
  const [filteredPlans, setFilteredPlans] = useState<FloorPlan[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedImage, setExpandedImage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof FloorPlan
    direction: "ascending" | "descending"
  } | null>(null)

  // Fetch floor plans
  const fetchFloorPlans = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/floor-plans/get/${propertyId}`)
      const data = response.data || []
      setFloorPlans(data)
      setFilteredPlans(data)
    } catch (error) {
      console.error("Error fetching floor plans:", error)
      toast({
        title: "Error",
        description: "Failed to fetch floor plans",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (propertyId) {
      fetchFloorPlans()
    }
  }, [propertyId])

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPlans(floorPlans)
    } else {
      const lowercasedQuery = searchQuery.toLowerCase()
      const filtered = floorPlans.filter(
        (plan) =>
          plan.floor_name.toLowerCase().includes(lowercasedQuery) ||
          plan.floor_size.toString().includes(lowercasedQuery),
      )
      setFilteredPlans(filtered)
    }
  }, [searchQuery, floorPlans])

  // Handle sorting
  const requestSort = (key: keyof FloorPlan) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })

    const sortedItems = [...filteredPlans].sort((a, b) => {
      if (key === "floor_price" || key === "floor_size") {
        // Convert to numbers for numeric sorting
        const aValue = Number.parseFloat(String(a[key]).replace(/[^0-9.-]+/g, ""))
        const bValue = Number.parseFloat(String(b[key]).replace(/[^0-9.-]+/g, ""))

        if (direction === "ascending") {
          return aValue - bValue
        } else {
          return bValue - aValue
        }
      } else {
        // String comparison for text fields
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1
        }
        return 0
      }
    })

    setFilteredPlans(sortedItems)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-8">
        <Loader2 className="h-10 w-10 text-lime-500 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Loading floor plans...</p>
      </div>
    )
  }

  if (floorPlans.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Info className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">No Floor Plans Available</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          This property doesn't have any floor plans uploaded yet. Please check back later or contact the agent for more
          information.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Floor Plans</h3>
          <p className="text-gray-500 text-sm mt-1">
            {floorPlans.length} floor plan{floorPlans.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search floor plans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block bg-white border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-[250px]">
                <button
                  className="flex items-center gap-1 hover:text-lime-700 transition-colors"
                  onClick={() => requestSort("floor_name")}
                >
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-1 hover:text-lime-700 transition-colors"
                  onClick={() => requestSort("floor_price")}
                >
                  Price
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-1 hover:text-lime-700 transition-colors"
                  onClick={() => requestSort("floor_size")}
                >
                  Size
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="text-right">Floor Plan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlans.map((plan) => (
              <TableRow key={plan.floor_plan_id} className="group">
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span className="text-gray-900">{plan.floor_name}</span>
                    <span className="text-xs text-gray-500">ID: {plan.floor_plan_id}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-black border-secondary font-medium">
                    {plan.floor_price}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{plan.floor_size}</span> sq ft
                </TableCell>
                <TableCell className="text-right">
                  {plan.floor_img ? (
                    <div className="flex items-center justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setExpandedImage(`${MEDIA_BASE_URL}${plan.floor_img}`)}
                            >
                              <Search className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View floor plan</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative h-12 w-16 rounded-md overflow-hidden cursor-pointer border border-gray-200"
                        onClick={() => setExpandedImage(`${MEDIA_BASE_URL}${plan.floor_img}`)}
                      >
                        <Image
                          src={`${MEDIA_BASE_URL}${plan.floor_img}`}
                          alt={`${plan.floor_name} floor plan`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <ChevronRight className="h-5 w-5 text-white" />
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end text-gray-400">
                      <ImageIcon className="h-5 w-5 mr-2" />
                      Not available
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4">
        {filteredPlans.map((plan) => (
          <div key={plan.floor_plan_id} className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-medium text-gray-900">{plan.floor_name}</h4>
              <Badge variant="outline" className="bg-lime-50 text-lime-700 border-lime-200 font-medium">
                {plan.floor_price}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">ID: {plan.floor_plan_id}</p>
            <p className="text-sm">
              <span className="font-medium">Size:</span> {plan.floor_size} sq ft
            </p>
            {plan.floor_img ? (
              <div className="relative">
                <Image
                  src={`${MEDIA_BASE_URL}${plan.floor_img}`}
                  alt={`${plan.floor_name} floor plan`}
                  width={600}
                  height={300}
                  className="w-full h-48 rounded-lg object-cover cursor-pointer"
                  onClick={() => setExpandedImage(`${MEDIA_BASE_URL}${plan.floor_img}`)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 backdrop-blur-sm"
                  onClick={() => setExpandedImage(`${MEDIA_BASE_URL}${plan.floor_img}`)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg text-gray-400">
                <div className="text-center">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                  <span className="text-sm">No Image Available</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setExpandedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl h-full max-h-[90vh]"
            >
              <Image
                src={expandedImage || "/placeholder.svg"}
                alt="Expanded floor plan"
                fill
                className="object-contain"
              />
            </motion.div>
            <button
              className="absolute top-4 right-4 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setExpandedImage(null)
              }}
            >
              <X className="h-6 w-6" />
            </button>
            <button
              className="absolute bottom-4 right-4 bg-white/20 text-white px-4 py-2 rounded-md hover:bg-white/30 transition-colors flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation()
                // This is just a UI element - in a real app you'd implement download functionality
                toast({
                  title: "Download started",
                  description: "Floor plan download has started",
                  duration: 3000,
                })
              }}
            >
              <Download className="h-5 w-5" />
              <span>Download</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
