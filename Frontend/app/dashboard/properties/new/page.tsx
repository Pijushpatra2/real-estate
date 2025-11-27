"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import api, { MEDIA_BASE_URL } from "@/lib/axiosInstance";

interface City {
  city_id: string;
  name: string;
}

export default function NewPropertyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [prop_image, setPropImage] = useState<File | string>("");

  // Store image files to upload
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    prop_title: "",
    prop_type: "",
    city_id: "",
    area_location: "",
    sale_rent_price: "",
    second_price: "N/A",
    prop_area_size: "",
    prop_bedrooms: "N/A",
    prop_bathrooms: "N/A",
    prop_desc: "",
    prop_status: "",
    prop_lebel: "",
    prop_status_for_admin: "",
    prop_car_park: "N/A",
    prop_garage: "N/A",
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

        console.log("API response:", res.data);
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

    fetchCities();
  }, [toast]);

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
    setImageFiles((prev) => [...prev, file]);
  };
  const handleImageRemove = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (formData.city_id === "") {
      toast({
        title: "Validation Error",
        description: "Please select a city",
        variant: "destructive",
      });
      return;
    }

    if (!prop_image) {
      toast({
        title: "Validation Error",
        description: "Please upload a property image",
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

      // Handle the main image upload
      if (prop_image instanceof File) {
        payload.append("prop_image", prop_image);
      } else if (typeof prop_image === "string") {
        payload.append("prop_image_url", prop_image);
      }

      // Submit the form
      const res = await api.post("/properties/add", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success
      toast({
        title: "Property created successfully",
        description: `Property ID: ${res.data.property_id}`,
      });

      router.push("/dashboard/properties?success=true");
    } catch (error: any) {
      // Error handling remains the same
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
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Add New Property"
        description="Create a new property listing"
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
            <TabsTrigger value="features">Features & Amenities</TabsTrigger>
          </TabsList>

          {/* Basic Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the basic details of the property
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
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prop_lebel">
                      User Status / Possession *
                    </Label>
                    <Select
                      value={formData.prop_lebel}
                      onValueChange={(value) =>
                        handleSelectChange("prop_lebel", value)
                      }
                      required
                    >
                      <SelectTrigger id="prop_lebel">
                        <SelectValue placeholder="Select lebel for users" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Trending">Trending</SelectItem>
                        <SelectItem value="Hot Deal">Hot Deal</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                        <SelectItem value="Budget">Budget</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prop_status_for_admin">
                      Admin Status *
                    </Label>
                    <Select
                      value={formData.prop_status_for_admin}
                      onValueChange={(value) =>
                        handleSelectChange("prop_status_for_admin", value)
                      }
                      required
                    >
                      <SelectTrigger id="prop_status_for_admin">
                        <SelectValue placeholder="Select prop status for admin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
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
                        <SelectValue placeholder="Select property status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ready to Move">
                          Ready to Move
                        </SelectItem>
                        <SelectItem value="Under Construction">
                          Under Construction
                        </SelectItem>
                        <SelectItem value="Available Soon">
                          Available Soon
                        </SelectItem>
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

                  {/* <div className="space-y-2">
                    <Label htmlFor="second_price">Secondary Price</Label>
                    <Input
                      id="second_price"
                      name="second_price"
                      placeholder="Optional alternative price"
                      value={formData.second_price}
                      onChange={handleChange}
                    />
                  </div> */}

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
                  Enter the property location information
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
                  Enter the technical details of the property
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
                    <Label htmlFor="prop_land_area">Land Area</Label>
                    <Input
                      id="prop_land_area"
                      name="prop_land_area"
                      type="number"
                      placeholder="Enter land area if applicable"
                      value={formData.prop_land_area}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prop_land_size">Land Size *</Label>
                    <Input
                      id="prop_land_size"
                      name="prop_land_size"
                      placeholder="e.g. 1 Acre, 2400 sq.ft"
                      value={formData.prop_land_size}
                      onChange={handleChange}
                    />
                  </div>

                  {/* <div className="space-y-2">
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
                  </div> */}

                  {/* <div className="space-y-2">
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
                  </div> */}

                  {/* <div className="space-y-2">
                    <Label htmlFor="prop_car_park">Car Parking</Label>
                    <Input
                      id="prop_car_park"
                      name="prop_car_park"
                      type="number"
                      placeholder="Number of car parking spaces"
                      value={formData.prop_car_park}
                      onChange={handleChange}
                    />
                  </div> */}

                  {/* <div className="space-y-2">
                    <Label htmlFor="prop_garage">Garage</Label>
                    <Input
                      id="prop_garage"
                      name="prop_garage"
                      type="number"
                      placeholder="Number of garages"
                      value={formData.prop_garage}
                      onChange={handleChange}
                    />
                  </div> */}

                  <div className="space-y-2">
                    <Label htmlFor="prop_year_built">Year of Built</Label>
                    <Input
                      id="prop_year_built"
                      name="prop_year_built"
                      type="number"
                      placeholder="Construction year"
                      value={formData.prop_year_built}
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
                <CardTitle>Upload Images</CardTitle>
                <CardDescription>
                  Upload the main property image
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  images={prop_image ? [prop_image] : []}
                  maxImages={1}
                  onImageUpload={(file) => setPropImage(file)}
                  onImageRemove={() => setPropImage("")}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          {/* <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Features and Amenities</CardTitle>
                <CardDescription>
                  List all features and amenities of the property
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="features">Features List *</Label>
                    <Textarea
                      id="features"
                      name="features"
                      placeholder="E.g. Swimming Pool, Gym, Park, Security, CCTV, Lift, Power Backup"
                      value={formData.features}
                      onChange={handleChange}
                      rows={3}
                      required
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Separate features with commas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
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
            {isSubmitting ? "Submitting..." : "Create Property"}
          </Button>
        </div>
      </form>
    </div>
  );
}
