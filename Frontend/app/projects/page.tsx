"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Home, MapPin, ArrowRight, Filter, Search } from "lucide-react";
import api, { MEDIA_BASE_URL } from "@/lib/axiosInstance";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface Project {
  id: number;
  prop_title: string;
  prop_type: string;
  area_location: string;
  prop_image: string;
  prop_desc: string;
  features: string[];
  price?: number;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/(^-|-$)+/g, '');   // Remove starting/ending dashes
}




export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [activeFilter, setActiveFilter] = useState<string | null>(typeParam);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/properties/get/all");

        // console.log("API full response:", res.data); // 👈 Add this line

        if (Array.isArray(res.data)) {
          const transformedProjects = res.data.map((project: any) => ({
            id: project.property_id,
            prop_title: project.prop_title,
            prop_type: project.prop_type?.toLowerCase() || "unknown",
            area_location: project.area_location,
            city_name: project.city_name,
            prop_image: project.prop_image || "/placeholder.svg",
            prop_desc: project.prop_desc,
            features: project.nearest_prime_location
              ? project.nearest_prime_location
                  .split(",")
                  .map((f: string) => f.trim())
              : [],
            price: project.sale_rent_price,
            status: project.prop_status,
            date: new Date(project.created_at).toLocaleDateString(),
          }));

          setProjects(transformedProjects);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on search and filters
  useEffect(() => {
    let filtered = projects

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.prop_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.area_location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((project) => project.prop_type.toLowerCase() === selectedType.toLowerCase())
    }

    setFilteredProjects(filtered)
  }, [projects, searchTerm, selectedType])

  if (isLoading) {
    return (
     <div className="pt-20">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-md animate-pulse min-h-[550px]"
            >
              <div className="bg-gray-300 h-64 w-full"></div>
              <div className="flex flex-col flex-1 p-6">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                <div className="mt-auto h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20">
        <div className="bg-gray-100">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Projects
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl">
            Discover our portfolio of premium commercial and residential
            properties designed for modern living and business success.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>



            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedType("all")
              }}
              variant="outline"
              className="w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProjects.length} of {projects.length} properties
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link href={`/projects/${slugify(project.prop_title)}-${project.id}`} key={project.id}>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 "
            >
              <div className="relative h-64">
                <Image
                  src={`${MEDIA_BASE_URL}${project.prop_image}`}
                  alt={project.prop_title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  {project.prop_type === "commercial" ? (
                    <>
                      <Building2 className="h-4 w-4 text-primary mr-1" />
                      <span className="text-sm font-medium">Commercial</span>
                    </>
                  ) : (
                    <>
                      <Home className="h-4 w-4 text-primary mr-1" />
                      <span className="text-sm font-medium">Residential</span>
                    </>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{project.area_location}</span>
                </div>

                <h3 className="text-xl font-bold mb-2">{project.prop_title}</h3>
                <p className="text-gray-600 mb-4">
                  {project.prop_desc.length > 100
                    ? `${project.prop_desc.slice(0, 100)}...`
                    : project.prop_desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.features.slice(0, 3).map((feature, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                    >
                      {feature.trim()}
                    </span>
                  ))}
                  {project.features.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                      +{project.features.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">
                    {project.price ? `₹${project.price.toLocaleString()}` : "Price on Request"}
                  </span>

           
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group flex items-center text-primary font-medium"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

