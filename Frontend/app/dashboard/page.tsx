// "use client";

// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Building2, Home, MapPin } from "lucide-react";
// import { Progress } from "@/components/ui/progress";
// import DashboardHeader from "@/components/dashboard/DashboardHeader";
// import RecentPropertiesTable from "@/components/dashboard/RecentPropertiesTable";
// import { useToast } from "@/components/ui/use-toast";
// import api from "@/lib/axiosInstance";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// interface Property {
//   property_id: number;
//   prop_title: string;
//   prop_type: string;
//   city_id: number;
//   sale_rent_price: string;
//   prop_status: string;
//   created_at: string;
//   prop_image?: string;
// }

// interface CityWithProperties {
//   city_id: number;
//   city_name: string;
//   cityImage?: string;
//   total_properties: number;
//   properties: Property[];
// }

// interface DashboardStats {
//   total_properties: number;
//   commercial_properties: number;
//   residential_properties: number;
//   total_cities: number;
// }

// export default function DashboardPage() {
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(true);
//   const [stats, setStats] = useState<DashboardStats>({
//     total_properties: 0,
//     commercial_properties: 0,
//     residential_properties: 0,
//     total_cities: 0,
//   });
//   const [recentProperties, setRecentProperties] = useState<Property[]>([]);
//   const [citiesWithProperties, setCitiesWithProperties] = useState<CityWithProperties[]>([]);
//   const [selectedCity, setSelectedCity] = useState<CityWithProperties | null>(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setIsLoading(true);

//         // Fetch all data in parallel
//         const [propertiesRes, citiesRes] = await Promise.all([
//           api.get<Property[]>("/properties/get/all"),
//           api.get<{ data: CityWithProperties[] }>("/properties/get/by-city"),
//         ]);

//         const allProperties = propertiesRes.data;
//         const citiesData = citiesRes.data?.data || [];

//         // Calculate stats
//         const commercial = allProperties.filter(
//           (p) => p.prop_type === "Commercial"
//         ).length;
//         const residential = allProperties.filter(
//           (p) => p.prop_type === "Residential"
//         ).length;

//         setStats({
//           total_properties: allProperties.length,
//           commercial_properties: commercial,
//           residential_properties: residential,
//           total_cities: citiesData.length,
//         });

//         // Set recent properties (first 5)
//         setRecentProperties(allProperties.slice(0, 5));

//         // Set cities with their properties
//         setCitiesWithProperties(citiesData);

//         toast({
//           title: "Welcome back, Admin!",
//           description: "Here's your latest dashboard overview.",
//         });
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//         toast({
//           title: "Error",
//           description: "Failed to load dashboard data",
//           variant: "destructive",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [toast]);

//   const calculatePercentage = (count: number) => {
//     if (stats.total_properties === 0) return 0;
//     return Math.round((count / stats.total_properties) * 100);
//   };

//   const handleCityClick = (city: CityWithProperties) => {
//     setSelectedCity(city);
//   };

//   const handleBackToCities = () => {
//     setSelectedCity(null);
//   };

//   const getCityName = (cityId: number) => {
//     if (!Array.isArray(citiesWithProperties)) return "Unknown";
//     const city = citiesWithProperties.find((c) => c.city_id === cityId);
//     return city ? city.city_name : "Unknown";
//   };

//   return (
//     <div className="space-y-6">
//       <DashboardHeader
//         title="Dashboard"
//         description="Welcome to your property management dashboard"
//       />

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Total Properties */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
//             <Building2 className="h-4 w-4 text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {isLoading ? "..." : stats.total_properties}
//             </div>
//             <p className="text-xs text-gray-500 mt-1">All properties in system</p>
//             <Progress value={100} className="h-1 mt-3" />
//           </CardContent>
//         </Card>

//         {/* Commercial Properties */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Commercial Properties
//             </CardTitle>
//             <Building2 className="h-4 w-4 text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {isLoading ? "..." : stats.commercial_properties}
//             </div>
//             <p className="text-xs text-gray-500 mt-1">
//               {calculatePercentage(stats.commercial_properties)}% of total
//             </p>
//             <Progress
//               value={calculatePercentage(stats.commercial_properties)}
//               className="h-1 mt-3"
//             />
//           </CardContent>
//         </Card>

//         {/* Residential Properties */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Residential Properties
//             </CardTitle>
//             <Home className="h-4 w-4 text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {isLoading ? "..." : stats.residential_properties}
//             </div>
//             <p className="text-xs text-gray-500 mt-1">
//               {calculatePercentage(stats.residential_properties)}% of total
//             </p>
//             <Progress
//               value={calculatePercentage(stats.residential_properties)}
//               className="h-1 mt-3"
//             />
//           </CardContent>
//         </Card>

//         {/* Cities */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Cities</CardTitle>
//             <MapPin className="h-4 w-4 text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {isLoading ? "..." : stats.total_cities}
//             </div>
//             <p className="text-xs text-gray-500 mt-1">Cities with properties</p>
//             <Progress value={100} className="h-1 mt-3" />
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Main Properties Table */}
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle>
//               {selectedCity 
//                 ? `Properties in ${selectedCity.city_name}`
//                 : 'Recent Properties'}
//             </CardTitle>
//             <CardDescription>
//               {isLoading
//                 ? "Loading..."
//                 : selectedCity
//                   ? `Showing ${selectedCity.properties?.length || 0} properties`
//                   : `Showing ${recentProperties.length} recent properties`}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {selectedCity ? (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Title</TableHead>
//                     <TableHead>Type</TableHead>
//                     <TableHead>Price</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Date Added</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {selectedCity.properties?.map((property) => (
//                     <TableRow key={property.property_id}>
//                       <TableCell className="font-medium">{property.prop_title}</TableCell>
//                       <TableCell>{property.prop_type}</TableCell>
//                       <TableCell>{property.sale_rent_price}</TableCell>
//                       <TableCell>{property.prop_status}</TableCell>
//                       <TableCell>
//                         {new Date(property.created_at).toLocaleDateString()}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             ) : (
//               <RecentPropertiesTable
//                 properties={recentProperties.map((prop) => ({
//                   id: prop.property_id,
//                   name: prop.prop_title,
//                   type: prop.prop_type,
//                   city: getCityName(prop.city_id),
//                   price: prop.sale_rent_price,
//                   status: prop.prop_status,
//                   date: new Date(prop.created_at).toLocaleDateString(),
//                 }))}
//               />
//             )}
//           </CardContent>
//         </Card>

//         {/* Cities List */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Properties by City</CardTitle>
//             <CardDescription>
//               {selectedCity ? (
//                 <span 
//                   className="text-blue-500 cursor-pointer hover:underline"
//                   onClick={handleBackToCities}
//                 >
//                   ← Back to all cities
//                 </span>
//               ) : (
//                 "Click on a city to view its properties"
//               )}
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <div className="flex justify-center items-center h-40">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//               </div>
//             ) : Array.isArray(citiesWithProperties) && citiesWithProperties.length > 0 ? (
//               citiesWithProperties.map((city, index) => {
//                 const colors = [
//                   "bg-lime-500",
//                   "bg-blue-500",
//                   "bg-purple-500",
//                   "bg-orange-500",
//                   "bg-pink-500",
//                 ];
//                 const color = colors[index % colors.length];
//                 const count = city.total_properties || 0;

//                 return (
//                   <div 
//                     key={city.city_id} 
//                     className="space-y-1 cursor-pointer hover:bg-gray-50 p-2 rounded"
//                     onClick={() => handleCityClick(city)}
//                   >
//                     <div className="flex justify-between text-sm font-medium">
//                       <span>{city.city_name}</span>
//                       <span>{count}</span>
//                     </div>
//                     <Progress
//                       value={Math.min(
//                         100,
//                         stats.total_properties === 0
//                           ? 0
//                           : (count / stats.total_properties) * 100
//                       )}
//                       className={`h-2 ${color} rounded-full`}
//                     />
//                   </div>
//                 );
//               })
//             ) : (
//               <p className="text-sm text-gray-500">No city data available.</p>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



















// =====================





"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Home, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RecentPropertiesTable from "@/components/dashboard/RecentPropertiesTable";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Property {
  property_id: number;
  prop_title: string;
  prop_type: string;
  city_id: number;
  sale_rent_price: string;
  prop_status: string;
  created_at: string;
}

interface CityWithProperties {
  city_id: number;
  city_name: string;
  total_properties: number;
  properties: Property[];
}

interface DashboardStats {
  total_properties: number;
  commercial_properties: number;
  residential_properties: number;
  total_cities: number;
}

export default function DashboardPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    total_properties: 0,
    commercial_properties: 0,
    residential_properties: 0,
    total_cities: 0,
  });
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const [citiesWithProperties, setCitiesWithProperties] = useState<CityWithProperties[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityWithProperties | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        const [propertiesRes, citiesRes] = await Promise.all([
          api.get<Property[]>("/properties/get/all"),
          api.get<{ data: CityWithProperties[] }>("/properties/get/by-city"),
        ]);

        const allProperties = propertiesRes.data;
        const citiesData = citiesRes.data?.data || [];

        setStats({
          total_properties: allProperties.length,
          commercial_properties: allProperties.filter(p => p.prop_type === "Commercial").length,
          residential_properties: allProperties.filter(p => p.prop_type === "Residential").length,
          total_cities: citiesData.length,
        });

        setRecentProperties(allProperties.slice(0, 5));
        setCitiesWithProperties(citiesData);

        toast({ title: "Welcome back, Admin!", description: "Here's your latest dashboard overview." });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({ title: "Error", description: "Failed to load dashboard data", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  const getCityName = (id: number) => {
    const city = citiesWithProperties.find((c) => c.city_id === id);
    return city?.city_name || "Unknown";
  };

  const calculatePercentage = (count: number) => {
    if (stats.total_properties === 0) return 0;
    return Math.round((count / stats.total_properties) * 100);
  };

  const handleCityClick = (city: CityWithProperties) => {
    setSelectedCity(city);
  };

  const handleBackToCities = () => {
    setSelectedCity(null);
  };

  // 🟨 Return loading skeleton here
  if (isLoading) {
    return (
      <div className="flex">
        {/* Sidebar Skeleton */}
        <div className="w-64 bg-gray-100 border-r p-4 hidden lg:block">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-6 bg-gray-300 rounded" />
            ))}
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-28 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-6 bg-gray-300 rounded w-1/4" />
            <div className="h-64 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // ✅ Actual content when not loading
  return (
    <div className="flex">
      {/* Actual Sidebar from layout already shown in layout.tsx */}

      <div className="flex-1 space-y-6 p-6">
        <DashboardHeader
          title="Dashboard"
          description="Welcome to your property management dashboard"
        />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_properties}</div>
              <p className="text-xs text-gray-500 mt-1">All properties in system</p>
              <Progress value={100} className="h-1 mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Commercial Properties</CardTitle>
              <Building2 className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.commercial_properties}</div>
              <p className="text-xs text-gray-500 mt-1">
                {calculatePercentage(stats.commercial_properties)}% of total
              </p>
              <Progress value={calculatePercentage(stats.commercial_properties)} className="h-1 mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Residential Properties</CardTitle>
              <Home className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.residential_properties}</div>
              <p className="text-xs text-gray-500 mt-1">
                {calculatePercentage(stats.residential_properties)}% of total
              </p>
              <Progress value={calculatePercentage(stats.residential_properties)} className="h-1 mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Cities</CardTitle>
              <MapPin className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_cities}</div>
              <p className="text-xs text-gray-500 mt-1">Cities with properties</p>
              <Progress value={100} className="h-1 mt-3" />
            </CardContent>
          </Card>
        </div>

        {/* Table and City List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedCity
                  ? `Properties in ${selectedCity.city_name}`
                  : "Recent Properties"}
              </CardTitle>
              <CardDescription>
                {selectedCity
                  ? `Showing ${selectedCity.properties?.length || 0} properties`
                  : `Showing ${recentProperties.length} recent properties`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedCity ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCity.properties.map((property) => (
                      <TableRow key={property.property_id}>
                        <TableCell>{property.prop_title}</TableCell>
                        <TableCell>{property.prop_type}</TableCell>
                        <TableCell>{property.sale_rent_price}</TableCell>
                        <TableCell>{property.prop_status}</TableCell>
                        <TableCell>{new Date(property.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <RecentPropertiesTable
                  properties={recentProperties.map((p) => ({
                    id: p.property_id,
                    name: p.prop_title,
                    type: p.prop_type,
                    city: getCityName(p.city_id),
                    price: p.sale_rent_price,
                    status: p.prop_status,
                    date: new Date(p.created_at).toLocaleDateString(),
                  }))}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Properties by City</CardTitle>
              <CardDescription>
                {selectedCity ? (
                  <span
                    className="text-blue-500 hover:underline cursor-pointer"
                    onClick={handleBackToCities}
                  >
                    ← Back to all cities
                  </span>
                ) : (
                  "Click a city to view its properties"
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {citiesWithProperties.map((city, index) => {
                const colors = ["bg-lime-500", "bg-blue-500", "bg-orange-500"];
                const color = colors[index % colors.length];

                return (
                  <div
                    key={city.city_id}
                    onClick={() => handleCityClick(city)}
                    className="space-y-1 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <div className="flex justify-between text-sm font-medium">
                      <span>{city.city_name}</span>
                      <span>{city.total_properties}</span>
                    </div>
                    <Progress
                      value={Math.min(100, (city.total_properties / stats.total_properties) * 100)}
                      className={`h-2 ${color} rounded-full`}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
