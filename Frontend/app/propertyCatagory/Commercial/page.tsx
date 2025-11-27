"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, MapPin, ArrowRight } from "lucide-react";
import api, { MEDIA_BASE_URL } from "@/lib/axiosInstance";

interface Project {
  id: number;
  prop_title: string;
  prop_type: string;
  area_location: string;
  prop_image: string;
  prop_desc: string;
  price: number;
  status: string;
  date: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/properties/get/all?prop_type=commercial"); // 🔍 Assume backend accepts query param

        if (Array.isArray(res.data)) {
          const transformedProjects = res.data
            .filter((p: any) => p.prop_type?.toLowerCase() === "commercial")
            .map((project: any) => ({
              id: project.property_id,
              prop_title: project.prop_title,
              prop_type: project.prop_type?.toLowerCase() || "unknown",
              area_location: project.area_location,
              city_name: project.city_name,
              prop_image: project.prop_image || "/placeholder.svg",
              prop_desc: project.prop_desc,
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

  if (isLoading) {
    return (
      <div className="pt-20">
        <div className="bg-gray-100">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Commercial Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Loading commercial projects...
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse"
              >
                <div className="bg-gray-300 h-64 w-full"></div>

                <div className="p-6 space-y-3">
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  <div className="h-5 w-3/4 bg-gray-400 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="h-6 w-24 bg-gray-300 rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  </div>
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
              Commercial Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="bg-gray-100">
              <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 mb-10"
      >
        <div className="container mx-auto px-4 py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Commercial Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover our premium commercial properties designed for modern
            businesses and investors.
          </p>
        </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
             <Link href={`/projects/${slugify(project.prop_title)}-${project.id}`} key={project.id}>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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
                  <Building2 className="h-4 w-4 text-lime-500 mr-1" />
                  <span className="text-sm font-medium">Commercial</span>
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

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">
                    {project.price
                      ? `₹${project.price.toLocaleString()}`
                      : "Price on Request"}
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

        {projects.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No commercial projects found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
