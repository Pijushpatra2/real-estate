"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import api from "@/lib/axiosInstance";

interface City {
  id: string;
  name: string;
}

interface PropertyData {
  id: string;
  prop_title: string;
  prop_type: string;
  city_id: string;
  area_location: string;
  sale_rent_price: string;
  second_price: string;
  prop_area_size: string;
  prop_bedrooms: string;
  prop_bathrooms: string;
  prop_desc: string;
  prop_status: string;
  prop_lebel: string;
  prop_car_park: string;
  prop_garage: string;
  prop_year_built: string;
  prop_land_area: string;
  prop_land_size: string;
  location_map_link: string;
  nearest_prime_location: string;
  prop_image: string;
}

export default function PropertyEditPage() {
  const { id } = useParams();
  console.log("Property ID from params:", id);
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isLoadingProperty, setIsLoadingProperty] = useState(true);
  const [propImage, setPropImage] = useState<File | string>("");

  const [formData, setFormData] = useState({
    prop_title: "",
    prop_type: "",
    city_id: "",
    area_location: "",
    sale_rent_price: "",
    second_price: "",
    prop_area_size: "",
    prop_bedrooms: "",
    prop_bathrooms: "",
    prop_desc: "",
    prop_status: "Draft",
    prop_lebel: "Draft",
    prop_car_park: "",
    prop_garage: "",
    prop_year_built: "",
    prop_land_area: "",
    prop_land_size: "",
    location_map_link: "",
    nearest_prime_location: "",
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoadingCities(true);
        const res = await api.get("/cities/get/all");

        if (Array.isArray(res.data.cities)) {
          setCities(res.data.cities);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error: any) {
        console.error("Error fetching cities:", error);
        toast({
          title: "Failed to fetch cities",
          description:
            error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        });
      } finally {
        setIsLoadingCities(false);
      }
    };

const fetchProperty = async () => {
  try {
    setIsLoadingProperty(true);
    const res = await api.get(`/properties/get/${id}`);

    console.log("Property API response:", res.data); // <-- Add this to debug

    const propertyData: PropertyData = res.data.property || res.data;

    if (!propertyData.prop_title || !propertyData.city_id) {
      throw new Error("Required property fields are missing");
    }

    setFormData({
      prop_title: propertyData.prop_title || "",
      prop_type: propertyData.prop_type || "",
      city_id: propertyData.city_id || "",
      area_location: propertyData.area_location || "",
      sale_rent_price: propertyData.sale_rent_price || "",
      second_price: propertyData.second_price || "",
      prop_area_size: propertyData.prop_area_size || "",
      prop_bedrooms: propertyData.prop_bedrooms || "",
      prop_bathrooms: propertyData.prop_bathrooms || "",
      prop_desc: propertyData.prop_desc || "",
      prop_status: propertyData.prop_status || "Draft",
      prop_lebel: propertyData.prop_lebel || "Draft",
      prop_car_park: propertyData.prop_car_park || "",
      prop_garage: propertyData.prop_garage || "",
      prop_year_built: propertyData.prop_year_built || "",
      prop_land_area: propertyData.prop_land_area || "",
      prop_land_size: propertyData.prop_land_size || "",
      location_map_link: propertyData.location_map_link || "",
      nearest_prime_location: propertyData.nearest_prime_location || "",
    });

    setPropImage(propertyData.prop_image || "");
  } catch (error: any) {
    console.error("Error fetching property:", error);
    toast({
      title: "Failed to fetch property",
      description:
        error instanceof Error ? error.message : "An error occurred",
      variant: "destructive",
    });
    router.push("/dashboard/properties");
  } finally {
    setIsLoadingProperty(false);
  }
};


    fetchCities();
    fetchProperty();
  }, [id, router, toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file: File) => {
    setPropImage(file);
  };

  const handleImageRemove = () => {
    setPropImage("");
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.city_id === "") {
    toast({
      title: "Validation Error",
      description: "Please select a city",
      variant: "destructive",
    });
    return;
  }

  setIsSubmitting(true);

  try {
    const payload = new FormData();

    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, String(value));
    });

    // Handle the image upload
    if (propImage instanceof File) {
      payload.append("prop_image", propImage);
    } else if (typeof propImage === "string") {
      payload.append("prop_image_url", propImage);
    }

    const propertyId = parseInt(id as string, 10);
    console.log("✅ Submitting property update with ID:", propertyId);

    // Log payload for debugging
    for (const [key, value] of payload.entries()) {
      console.log(`🟡 ${key}:`, value);
    }

    // Update the property
    const res = await api.put(`/properties/update/${propertyId}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast({
      title: "Property updated successfully",
      description: `Property ID: ${res.data.property_id}`,
    });

    router.push("/dashboard/properties");
  } catch (error: any) {
    console.error("❌ Error updating property:", error);
    toast({
      title: "Failed to update property",
      description:
        error.response?.data?.message ||
        error.message ||
        "An error occurred while updating the property",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  const renderCitySelect = () => {
    console.log("Cities data:", cities);

    return (
      <div className="space-y-2">
        <label
          htmlFor="city_id"
          className="block text-sm font-medium text-gray-700"
        >
          City *
        </label>

        <select
          id="city_id"
          name="city_id"
          value={formData.city_id || ""}
          onChange={(e) => {
            console.log("Selected value:", e.target.value); // Should print city.id
            setFormData((prev) => ({ ...prev, city_id: e.target.value }));
          }}
          required
          disabled={isLoadingCities}
          className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          {isLoadingCities ? (
            <option value="loading">Loading cities...</option>
          ) : (
            <>
              <option value="" disabled>
                Select a city
              </option>

              {cities?.length > 0 ? (
                cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No cities available
                </option>
              )}
            </>
          )}
        </select>
      </div>
    );
  };

  if (isLoadingProperty) {
    return (
      <div className="space-y-6">
        <DashboardHeader title="Edit Property" description="Loading property information..." />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Edit Property"
        description="Update property details"
        action={
          <Link href="/dashboard/properties">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList>
            <TabsTrigger value="details">Property Details</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          {/* Property Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update the basic details of the property
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="prop_title">Property Name *</Label>
                    <Input
                      id="prop_title"
                      name="prop_title"
                      placeholder="Enter property name"
                      value={formData.prop_title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prop_type">Property Type *</Label>
                    <Select
                      value={formData.prop_type}
                      onValueChange={(value) =>
                        handleSelectChange("prop_type", value)
                      }
                      required
                    >
                      <SelectTrigger id="prop_type">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Land">Land</SelectItem>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prop_status">Status *</Label>
                    <Select
                      value={formData.prop_status}
                      onValueChange={(value) =>
                        handleSelectChange("prop_status", value)
                      }
                      required
                    >
                      <SelectTrigger id="prop_status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sale_rent_price">Primary Price *</Label>
                    <Input
                      id="sale_rent_price"
                      name="sale_rent_price"
                      placeholder="e.g. ₹1.2 Cr or ₹25,000/sqft"
                      value={formData.sale_rent_price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <Label htmlFor="prop_desc">Description *</Label>
                    <Textarea
                      id="prop_desc"
                      name="prop_desc"
                      placeholder="Enter detailed description"
                      value={formData.prop_desc}
                      onChange={handleChange}
                      required
                      rows={5}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Location Details</CardTitle>
                <CardDescription>
                  Update the property location information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderCitySelect()}

                  <div className="space-y-2">
                    <Label htmlFor="area_location">Area/Location *</Label>
                    <Input
                      id="area_location"
                      name="area_location"
                      placeholder="Enter specific location"
                      value={formData.area_location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nearest_prime_location">
                      Nearest Prime Location
                    </Label>
                    <Input
                      id="nearest_prime_location"
                      name="nearest_prime_location"
                      placeholder="e.g. Near City Center, 1km from Metro"
                      value={formData.nearest_prime_location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location_map_link">Map Link</Label>
                    <Input
                      id="location_map_link"
                      name="location_map_link"
                      placeholder="Google Maps or other map link"
                      value={formData.location_map_link}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Specifications Tab */}
          <TabsContent value="specifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Specifications</CardTitle>
                <CardDescription>
                  Update the technical details of the property
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="prop_area_size">
                      Built-up Area (sq.ft) *
                    </Label>
                    <Input
                      id="prop_area_size"
                      name="prop_area_size"
                      type="number"
                      placeholder="Enter property size"
                      value={formData.prop_area_size}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prop_bedrooms">Bedrooms *</Label>
                    <Input
                      id="prop_bedrooms"
                      name="prop_bedrooms"
                      type="number"
                      placeholder="Number of bedrooms"
                      value={formData.prop_bedrooms}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prop_bathrooms">Bathrooms *</Label>
                    <Input
                      id="prop_bathrooms"
                      name="prop_bathrooms"
                      type="number"
                      placeholder="Number of bathrooms"
                      value={formData.prop_bathrooms}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prop_car_park">Car Parking</Label>
                    <Input
                      id="prop_car_park"
                      name="prop_car_park"
                      type="number"
                      placeholder="Number of car parking spaces"
                      value={formData.prop_car_park}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Image</CardTitle>
                <CardDescription>
                  Update the main property image
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  images={propImage ? [propImage] : []}
                  maxImages={1}
                  onImageUpload={handleImageUpload}
                  onImageRemove={handleImageRemove}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/properties")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Updating..." : "Update Property"}
          </Button>
        </div>
      </form>
    </div>
  );
}
