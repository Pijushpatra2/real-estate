// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import {
//   Building2,
//   Home,
//   MapPin,
//   ArrowRight,
//   Filter,
//   ArrowLeft,
//   Check,
//   Phone,
//   Mail,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import api, { MEDIA_BASE_URL } from "@/lib/axiosInstance";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@radix-ui/react-dropdown-menu";

// interface Property {
//   property_id: number;
//   prop_title: string;
//   prop_type: string;
//   sale_rent_price: string;
//   prop_image: string;
//   city_id: number;
//   city_name: string;
//   cityImage: string;
//   area_location: string;
//   prop_desc: string;
//   prop_status: string;
//   prop_year_built: string;
//   features: string[];
//   contact_person: string;
//   contact_email: string;
//   contact_phone: string;
//   prop_bedrooms?: number;
//   prop_bathrooms?: number;
//   prop_land_size?: string;
//   [key: string]: any;
// }

// export default function CityPage() {
//   const params = useParams();
//   const cityId = params?.city_id as string;

//   const [activeFilter, setActiveFilter] = useState<string | null>(null);
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [cityData, setCityData] = useState<{
//     city_id: number;
//     city_name: string;
//     cityImage: string;
//     description: string;
//   } | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         const response = await api.get(`/properties/get/by-city/${cityId}`);

//         if (!Array.isArray(response.data.data)) {
//           throw new Error("Invalid data format received from server");
//         }

//         const formattedProperties = response.data.data.map((property: any) => ({
//           property_id: property.property_id,
//           prop_title: property.prop_title || "N/A",
//           prop_type: property.prop_type || "N/A",
//           sale_rent_price: property.sale_rent_price || "N/A",
//           prop_image: property.prop_image || "/placeholder.svg",
//           city_id: property.city_id,
//           city_name: property.city_name || "N/A",
//           cityImage: property.cityImage || "/placeholder-city.svg",
//           area_location: property.area_location || "Location not specified",
//           prop_desc: property.prop_desc || "No description available",
//           prop_status: property.prop_status || "Status not specified",
//           prop_year_built: property.prop_year_built || "N/A",
//           features: parseFeatures(property.features),
//           contact_person: property.contact_person || "Sales Representative",
//           contact_email: property.contact_email || "info@evernalgroup.com",
//           contact_phone: property.contact_phone || "+91 8697891111",
//           prop_bedrooms: property.prop_bedrooms,
//           prop_bathrooms: property.prop_bathrooms,
//           prop_land_size: property.prop_land_size,
//         }));

//         setProperties(formattedProperties);

//         if (formattedProperties.length > 0) {
//           const firstProperty = formattedProperties[0];
//           setCityData({
//             city_id: firstProperty.city_id,
//             city_name: firstProperty.city_name,
//             cityImage: firstProperty.cityImage,
//             description: `Explore ${formattedProperties.length} properties in ${firstProperty.city_name}`,
//           });
//         }
//       } catch (err) {
//         setError("Failed to load properties. Please try again later.");
//         console.error("Error fetching properties:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (cityId) {
//       fetchProperties();
//     } else {
//       setError("City ID is missing");
//       setIsLoading(false);
//     }
//   }, [cityId]);

//   const parseFeatures = (features: any): string[] => {
//     if (!features) return [];
//     if (Array.isArray(features)) return features;
//     if (typeof features === "string")
//       return features.split(",").map((f) => f.trim());
//     return [];
//   };

//   const filteredProperties = useMemo(() => {
//     if (!activeFilter) return properties;
//     return properties.filter(
//       (property) =>
//         property.prop_type.toLowerCase() === activeFilter.toLowerCase()
//     );
//   }, [properties, activeFilter]);

//   const cityStats = useMemo(
//     () => ({
//       population: "Data not available",
//       area: "Data not available",
//       established: "Data not available",
//       description: cityData?.description || "Explore properties in this city",
//       propertyCount: properties.length,
//     }),
//     [cityData, properties]
//   );

//   const statusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "for sale":
//         return "bg-lime-500";
//       case "for rent":
//         return "bg-blue-500";
//       case "sold":
//         return "bg-red-500";
//       default:
//         return "bg-amber-500";
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="pt-20">
//         <div className="container mx-auto px-4 py-8 animate-pulse">
//           <div className="h-5 w-32 bg-gray-200 rounded mb-6"></div>

//           <div className="bg-gray-100 rounded-lg h-64 mb-8"></div>

//           <div className="flex flex-wrap gap-4 mb-8">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="h-10 w-24 bg-gray-200 rounded"></div>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="bg-white rounded-xl shadow-sm p-4">
//                 <div className="h-48 bg-gray-200 rounded mb-4"></div>
//                 <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
//                 <div className="h-3 bg-gray-100 rounded mb-2 w-1/2"></div>
//                 <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
//                 <div className="h-8 bg-gray-200 rounded w-full"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="pt-20">
//         <div className="container mx-auto px-4 py-8">
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">{error}</p>
//             <Link
//               href="/"
//               className="inline-flex items-center text-secondary mt-4"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br py-20">
//       <div className="bg-gray-100 w-full">
//         <div className="w-full px-4 py-12 md:py-20 relative">
//           {cityData?.cityImage && (
//             <div className="absolute inset-0 overflow-hidden opacity-10">
//               <Image
//                 src={`${MEDIA_BASE_URL}${cityData.cityImage}`}
//                 alt={cityData.city_name}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           )}

//           <div className="container mx-auto px-4 ">
//             <Link
//               href="/"
//               className="inline-flex items-center text-gray-600 hover:text-secondary mb-6"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Home
//             </Link>
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               Properties in {cityData?.city_name || "this city"}
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mb-6">
//               {cityStats.description}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-12">
//         <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
//           <div className="flex items-center space-x-2">
//             <Filter className="h-5 w-5 text-gray-500" />
//             <span className="font-medium">Filter by:</span>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => setActiveFilter(null)}
//               className={`px-4 py-2 rounded-md transition-colors duration-300 ${
//                 activeFilter === null
//                   ? "bg-secondary text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               All Properties
//             </button>

//             <button
//               onClick={() => setActiveFilter("commercial")}
//               className={`px-4 py-2 rounded-md transition-colors duration-300 ${
//                 activeFilter === "commercial"
//                   ? "bg-secondary text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Commercial
//             </button>

//             <button
//               onClick={() => setActiveFilter("residential")}
//               className={`px-4 py-2 rounded-md transition-colors duration-300 ${
//                 activeFilter === "residential"
//                   ? "bg-secondary text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Residential
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProperties.map((property) => (
//             <motion.div
//               key={property.property_id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               <Link href={`/projects/${property.property_id}`}>
//               <div className="relative h-64 w-full">
//                 <Image
//                   src={
//                     property.prop_image
//                       ? `${MEDIA_BASE_URL}${property.prop_image}`
//                       : "/placeholder.svg"
//                   }
//                   alt={property.prop_title}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 />
//                 <div className="absolute top-4 left-4">
//                   <Badge
//                     className={`${statusColor(
//                       property.prop_status
//                     )} hover:${statusColor(property.prop_status)} text-white`}
//                   >
//                     {property.prop_status}
//                   </Badge>
//                 </div>
//                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
//                   {property.prop_type.toLowerCase() === "commercial" ? (
//                     <>
//                       <Building2 className="h-4 w-4 text-secondary mr-1" />
//                       <span className="text-sm font-medium">Commercial</span>
//                     </>
//                   ) : (
//                     <>
//                       <Home className="h-4 w-4 text-secondary mr-1" />
//                       <span className="text-sm font-medium">Residential</span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               <div className="p-6">
//                 <div className="flex items-center text-gray-500 mb-2">
//                   <MapPin className="h-4 w-4 mr-1" />
//                   <span className="text-sm">{property.area_location}</span>
//                 </div>

//                 <h3 className="text-xl font-bold mb-2 line-clamp-1">
//                   {property.prop_title}
//                 </h3>

//                 <div className="flex items-center justify-between mb-4">
//                   <p className="text-lg font-semibold text-secondary">
//                     {property.sale_rent_price.startsWith("₹")
//                       ? property.sale_rent_price
//                       : `₹ ${property.sale_rent_price}`}
//                   </p>
//                   {property.prop_land_size && (
//                     <p className="text-sm text-gray-500">
//                       {property.prop_land_size}
//                     </p>
//                   )}
//                 </div>

//                 <p className="text-gray-600 mb-4 line-clamp-2">
//                   {property.prop_desc}
//                 </p>

//                 {property.features.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {property.features.slice(0, 3).map((feature, i) => (
//                       <Badge key={i} variant="outline" className="bg-white">
//                         <Check className="h-3 w-3 mr-1 text-secondary" />
//                         {feature}
//                       </Badge>
//                     ))}
//                   </div>
//                 )}

                
//                   <motion.button
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     className="group flex items-center text-secondary font-medium hover:text-primary transition-colors duration-300 w-full justify-center bg-secondary/10 py-2 rounded-md"
//                   >
//                     View Details
//                     <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
//                   </motion.button>
                
//               </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {filteredProperties.length === 0 && !isLoading && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">
//               No properties found in {cityData?.city_name || "this city"}{" "}
//               matching your criteria.
//             </p>
//             <button
//               onClick={() => setActiveFilter(null)}
//               className="mt-4 px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



//===============================



"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  Home,
  MapPin,
  ArrowRight,
  Filter,
  ArrowLeft,
  Check,
  Phone,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api, { MEDIA_BASE_URL } from "@/lib/axiosInstance";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface Property {
  property_id: number;
  prop_title: string;
  prop_type: string;
  sale_rent_price: string;
  prop_image: string;
  city_id: number;
  city_name: string;
  cityImage: string;
  area_location: string;
  prop_desc: string;
  prop_status: string;
  features: string[];
  prop_land_size?: string;
  [key: string]: any;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replace(/(^-|-$)+/g, '');   // Remove starting/ending dashes
}

export default function CityPage() {
  const params = useParams();
  const cityId = params?.city_id as string;

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [cityData, setCityData] = useState<{
    city_id: number;
    city_name: string;
    cityImage: string;
    description: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get(`/properties/get/by-city/${cityId}`);

        if (!Array.isArray(response.data.data)) {
          throw new Error("Invalid data format received from server");
        }

        const formattedProperties = response.data.data.map((property: any) => ({
          property_id: property.property_id,
          prop_title: property.prop_title || "N/A",
          prop_type: property.prop_type || "N/A",
          sale_rent_price: property.sale_rent_price || "N/A",
          prop_image: property.prop_image || "/placeholder.svg",
          city_id: property.city_id,
          city_name: property.city_name || "N/A",
          cityImage: property.cityImage || "/placeholder-city.svg",
          area_location: property.area_location || "Location not specified",
          prop_desc: property.prop_desc || "No description available",
          prop_status: property.prop_status || "Status not specified",
          features: parseFeatures(property.features),
          contact_person: property.contact_person || "Sales Representative",
          contact_email: property.contact_email || "info@evernalgroup.com",
          contact_phone: property.contact_phone || "+91 8697891111",
          prop_land_size: property.prop_land_size,
        }));

        setProperties(formattedProperties);

        if (formattedProperties.length > 0) {
          const firstProperty = formattedProperties[0];
          setCityData({
            city_id: firstProperty.city_id,
            city_name: firstProperty.city_name,
            cityImage: firstProperty.cityImage,
            description: `Explore ${formattedProperties.length} properties in ${firstProperty.city_name}`,
          });
        }
      } catch (err) {
        setError("Failed to load properties. Please try again later.");
        console.error("Error fetching properties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (cityId) {
      fetchProperties();
    } else {
      setError("City ID is missing");
      setIsLoading(false);
    }
  }, [cityId]);

  const parseFeatures = (features: any): string[] => {
    if (!features) return [];
    if (Array.isArray(features)) return features;
    if (typeof features === "string")
      return features.split(",").map((f) => f.trim());
    return [];
  };

  const filteredProperties = useMemo(() => {
    if (!activeFilter) return properties;
    return properties.filter(
      (property) =>
        property.prop_type.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [properties, activeFilter]);

  const cityStats = useMemo(
    () => ({
      population: "Data not available",
      area: "Data not available",
      established: "Data not available",
      description: cityData?.description || "Explore properties in this city",
      propertyCount: properties.length,
    }),
    [cityData, properties]
  );

  const statusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "for sale":
        return "bg-lime-500";
      case "for rent":
        return "bg-blue-500";
      case "sold":
        return "bg-red-500";
      default:
        return "bg-amber-500";
    }
  };

  if (isLoading) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 animate-pulse">
          <div className="h-5 w-32 bg-gray-200 rounded mb-6"></div>

          <div className="bg-gray-100 rounded-lg h-64 mb-8"></div>

          <div className="flex flex-wrap gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded"></div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
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
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{error}</p>
            <Link
              href="/"
              className="inline-flex items-center text-secondary mt-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br py-20">
      <div className="bg-gray-100 w-full">
        <div className="w-full px-4 py-12 md:py-20 relative">
          {cityData?.cityImage && (
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <Image
                src={`${MEDIA_BASE_URL}${cityData.cityImage}`}
                alt={cityData.city_name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="container mx-auto px-4 ">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-secondary mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Properties in {cityData?.city_name || "this city"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mb-6">
              {cityStats.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="font-medium">Filter by:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                activeFilter === null
                  ? "bg-secondary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Properties
            </button>

            <button
              onClick={() => setActiveFilter("commercial")}
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                activeFilter === "commercial"
                  ? "bg-secondary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Commercial
            </button>

            <button
              onClick={() => setActiveFilter("residential")}
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                activeFilter === "residential"
                  ? "bg-secondary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Residential
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
             <Link href={`/projects/${slugify(property.prop_title)}-${property.property_id}`} key={property.property_id}>
            <motion.div
              key={property.property_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* <Link href={`/projects/${property.property_id}`}> */}
              <div className="relative h-64 w-full">
                <Image
                  src={
                    property.prop_image
                      ? `${MEDIA_BASE_URL}${property.prop_image}`
                      : "/placeholder.svg"
                  }
                  alt={property.prop_title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    className={`${statusColor(
                      property.prop_status
                    )} hover:${statusColor(property.prop_status)} text-white`}
                  >
                    {property.prop_status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  {property.prop_type.toLowerCase() === "commercial" ? (
                    <>
                      <Building2 className="h-4 w-4 text-secondary mr-1" />
                      <span className="text-sm font-medium">Commercial</span>
                    </>
                  ) : (
                    <>
                      <Home className="h-4 w-4 text-secondary mr-1" />
                      <span className="text-sm font-medium">Residential</span>
                    </>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.area_location}</span>
                </div>

                <h3 className="text-xl font-bold mb-2 line-clamp-1">
                  {property.prop_title}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-semibold text-secondary">
                    {property.sale_rent_price.startsWith("₹")
                      ? property.sale_rent_price
                      : `₹ ${property.sale_rent_price}`}
                  </p>
                  {property.prop_land_size && (
                    <p className="text-sm text-gray-500">
                      {property.prop_land_size}
                    </p>
                  )}
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {property.prop_desc}
                </p>

                {property.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {property.features.slice(0, 3).map((feature, i) => (
                      <Badge key={i} variant="outline" className="bg-white">
                        <Check className="h-3 w-3 mr-1 text-secondary" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                )}

                
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group flex items-center text-secondary font-medium hover:text-primary transition-colors duration-300 w-full justify-center bg-secondary/10 py-2 rounded-md"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                
              </div>
              
            </motion.div></Link>
          ))}
        </div>

        {filteredProperties.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No properties found in {cityData?.city_name || "this city"}{" "}
              matching your criteria.
            </p>
            <button
              onClick={() => setActiveFilter(null)}
              className="mt-4 px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
