"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Search, X, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import api from "@/lib/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface Amenity {
  aminities_id: number;
  aminities_name: string;
  property_id: number;
  [key: string]: any;
}

interface AmenitiesDisplayProps {
  propertyId: string | number;
  featuredAmenities?: string[];
}

export function AmenitiesDisplay({
  propertyId,
  featuredAmenities = ["Swimming Pool", "Gym", "Parking", "24/7 Security"],
}: AmenitiesDisplayProps) {
  const { toast } = useToast();
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [filteredAmenities, setFilteredAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(`/aminities/get/property/${propertyId}`);
        if (!response.data) throw new Error("No amenities data received");

        setAmenities(response.data);
        setFilteredAmenities(response.data);
      } catch (err) {
        console.error("Error fetching amenities:", err);
        setError(err instanceof Error ? err.message : "Failed to load amenities");
        toast({
          title: "Error",
          description: "Failed to load amenities",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, [propertyId, toast]);

  useEffect(() => {
    const filtered = amenities.filter((amenity) =>
      amenity.aminities_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAmenities(filtered);
  }, [searchQuery, amenities]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-8">
        <Loader2 className="h-10 w-10 text-lime-500 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Loading amenities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <X className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-red-800 mb-2">Failed to Load Amenities</h3>
        <p className="text-red-600 max-w-md mx-auto">{error}</p>
      </div>
    );
  }

  if (filteredAmenities.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Info className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">No Amenities Found</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          This property doesn't have any amenities listed. Please contact the agent for more info.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Property Amenities</h3>
          <p className="text-gray-500 text-sm mt-1">{filteredAmenities.length} amenities available</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search amenities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full sm:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAmenities.map((amenity) => {
          const isFeatured = featuredAmenities.includes(amenity.aminities_name);

          return (
            <motion.div
              key={amenity.aminities_id}
              whileHover={{
                y: -2,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
              className={`flex items-center p-4 rounded-lg border ${
                isFeatured ? "bg-lime-50 border-lime-200" : "bg-white border-gray-200"
              }`}
            >
              <Check className={`h-5 w-5 mr-3 ${isFeatured ? "text-lime-600" : "text-gray-500"}`} />
              <div className="flex-1">
                <span className={`font-medium ${isFeatured ? "text-lime-700" : "text-gray-700"}`}>
                  {amenity.aminities_name}
                </span>
              </div>
              {isFeatured && <Badge className="bg-lime-500 hover:bg-lime-600">Featured</Badge>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
