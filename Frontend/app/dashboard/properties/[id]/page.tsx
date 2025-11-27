"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  MapPin,
  Home,
  Building2,
  Calendar,
  IndianRupee,
  SquareIcon as SquareFoot,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import api, { MEDIA_BASE_URL } from "@/lib/axiosInstance";
import PropertyMediaUpload from "@/components/dashboard/PropertyMediaTab";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FloorPlansManager } from "@/components/dashboard/FloorPlansPage";

export default function PropertyViewPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  type GalleryImage = { img_name: string; [key: string]: any };
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [showAmenityForm, setShowAmenityForm] = useState(false);
  const [editingAmenity, setEditingAmenity] = useState<Amenity | null>(null);
  const [amenitiesText, setAmenitiesText] = useState("");
  interface Amenity {
    aminities_id: number;
    aminities_name: string;
    property_id: number;
    [key: string]: any;
  }
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        console.log(`Fetching property with ID: ${params.id}`);
        const response = await api.get(`/properties/get/${params.id}`);
        console.log("Property fetched:", response.data);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
        toast({
          title: "Error",
          description: "Failed to load property details.",
          variant: "destructive",
        });
        router.push("/dashboard/properties");
      } finally {
        setLoading(false);
      }
    };

    const fetchGallery = async () => {
      try {
        const res = await api.get(`/media/get/${params.id}`);
        console.log("Gallery images:", res.data);
        setGalleryImages(res.data);
      } catch (error) {
        console.error("Failed to load gallery images", error);
      }
    };

    const fetchAmenities = async () => {
      try {
        const response = await api.get(`/aminities/get/property/${params.id}`);
        setAmenities(response.data);
      } catch (error) {
        console.error("Error fetching amenities:", error);
        toast({
          title: "Error",
          description: "Failed to load amenities",
          variant: "destructive",
        });
      }
    };

    if (params.id) {
      fetchProperty();
      fetchGallery();
      fetchAmenities();
    }
  }, [params.id, router, toast]);

  const handleDelete = async () => {
    try {
      await api.delete(`/properties/${params.id}`);
      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
      router.push("/dashboard/properties");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleDeleteAmenity = async (id: number): Promise<void> => {
    try {
      await api.delete(`aminities/delete/${id}`); // Hitting DELETE /api/aminities/delete/:id

      toast({
        title: "Success",
        description: "Amenity deleted successfully",
      });

      // Refresh amenities list
      const response = await api.get<Amenity[]>(
        `/aminities/get/property/${params.id}`
      );
      setAmenities(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete amenity",
        variant: "destructive",
      });
    }
  };

  interface AmenityFormEvent extends React.FormEvent<HTMLFormElement> {}

  interface AmenityResponse {
    aminities_id: number;
    aminities_name: string;
    property_id: number;
    [key: string]: any;
  }

  const handleAmenitySubmit = async (e: AmenityFormEvent): Promise<void> => {
    e.preventDefault();
    const name: string = editingAmenity?.aminities_name || "";
    if (!name) return;

    try {
      if (editingAmenity) {
        await api.put(`/aminities/update/${editingAmenity.aminities_id}`, {
          aminities_name: name,
          property_id: params.id,
        });
        toast({
          title: "Success",
          description: "Amenity updated successfully",
        });
      } else {
        await api.post("/aminities/add", {
          aminities_name: name,
          property_id: params.id,
        });
        toast({
          title: "Success",
          description: "Amenity created successfully",
        });
      }
      setShowAmenityForm(false);
      setEditingAmenity(null);
      // Refresh amenities list
      const response = await api.get<AmenityResponse[]>(
        `/aminities/get/property/${params.id}`
      );
      setAmenities(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: editingAmenity
          ? "Failed to update amenity"
          : "Failed to create amenity",
        variant: "destructive",
      });
    }
  };

  const handleBulkImport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amenitiesText.trim()) return;

    try {
      const amenitiesList = amenitiesText
        .split(",") // Split by comma
        .map((name) => name.trim()) // Trim whitespace
        .filter((name) => name) // Filter out empty entries
        .map((name) => ({
          aminities_name: name, // Use correct key spelling
          property_id: params.id,
        }));

      await api.post("/aminities/add/bulk-insert", amenitiesList);
      toast({
        title: "Success",
        description: `${amenitiesList.length} amenities added successfully`,
      });

      setAmenitiesText("");
      const response = await api.get(`/aminities/get/property/${params.id}`);
      setAmenities(response.data);
    } catch (error) {
      console.error("Bulk import error:", error);
      toast({
        title: "Error",
        description: "Failed to import amenities",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          title="Property Details"
          description="Loading property information..."
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          title="Property Not Found"
          description="The requested property could not be found."
        />
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/dashboard/properties">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "Draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const PropertyTypeIcon =
    property.prop_type === "Commercial" ? Building2 : Home;

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={property.prop_title}
        description={`View and manage property details`}
        action={
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard/properties">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/dashboard/properties/${params.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Property
              </Link>
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Images */}
          {/* <Card>
            <CardHeader className="pb-3">
              <CardTitle>Property Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {property.prop_image ? (
                  <div className="relative aspect-video rounded-md overflow-hidden border">
                    <Image
                      src={`${MEDIA_BASE_URL}${property.prop_image}`}
                      alt={property.prop_title}
                        fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video rounded-md overflow-hidden border">
                    <Image
                      src="/placeholder.svg"
                      alt="No image available"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card> */}

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Property Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Primary Image */}
                {property.prop_image && (
                  <div className="relative aspect-video rounded-md overflow-hidden border">
                    <Image
                      src={`${MEDIA_BASE_URL}${property.prop_image}`}
                      alt="Primary"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Gallery Images */}
                {galleryImages && galleryImages.length > 0 ? (
                  galleryImages.map((gImg, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video rounded-md overflow-hidden border"
                    >
                      <Image
                        src={`${MEDIA_BASE_URL}${gImg.img_name}`}
                        alt={`Gallery ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 col-span-full">
                    No gallery images available.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features & Amenities</TabsTrigger>
              <TabsTrigger value="floor-plans">Floor Plans</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Property Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    {property.prop_desc || "No description available"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <dt className="text-gray-500 w-1/3">Type:</dt>
                      <dd className="flex items-center font-medium">
                        <PropertyTypeIcon className="mr-2 h-4 w-4 text-primary" />
                        {property.prop_type}
                      </dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="text-gray-500 w-1/3">Status:</dt>
                      <dd>{getStatusBadge(property.prop_status)}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="text-gray-500 w-1/3">Size:</dt>
                      <dd className="flex items-center font-medium">
                        <SquareFoot className="mr-2 h-4 w-4 text-primary" />
                        {property.prop_land_size || "N/A"}
                      </dd>
                    </div>
                    {property.prop_bedrooms && (
                      <div className="flex items-center">
                        <dt className="text-gray-500 w-1/3">Bedrooms:</dt>
                        <dd className="font-medium">
                          {property.prop_bedrooms}
                        </dd>
                      </div>
                    )}
                    {property.prop_bathrooms && (
                      <div className="flex items-center">
                        <dt className="text-gray-500 w-1/3">Bathrooms:</dt>
                        <dd className="font-medium">
                          {property.prop_bathrooms}
                        </dd>
                      </div>
                    )}
                    <div className="flex items-center">
                      <dt className="text-gray-500 w-1/3">Added On:</dt>
                      <dd className="flex items-center font-medium">
                        <Calendar className="mr-2 h-4 w-4 text-primary" />
                        {new Date(property.created_at).toLocaleDateString()}
                      </dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="text-gray-500 w-1/3">Year Built:</dt>
                      <dd className="font-medium">
                        {property.prop_year_built || "N/A"}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
            {/* // features and amenities */}

            <TabsContent value="features" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  {/* <div className="flex justify-between items-center">
                    <CardTitle>Amenities</CardTitle>
                    <Button size="sm" onClick={() => setShowAmenityForm(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Amenity
                    </Button>
                  </div> */}
                </CardHeader>
                <CardContent>
                  {showAmenityForm && (
                    <div className="border rounded-lg p-4 mb-4 space-y-4">
                      <h4 className="font-medium">
                        {editingAmenity ? "Edit Amenity" : "Add New Amenity"}
                      </h4>
                      <form
                        onSubmit={handleAmenitySubmit}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name">Amenity Name</Label>
                          <Input
                            id="name"
                            value={editingAmenity?.aminities_name || ""}
                            onChange={(e) => {
                              if (editingAmenity) {
                                setEditingAmenity({
                                  ...editingAmenity,
                                  aminities_name: e.target.value,
                                });
                              } else {
                                // Provide dummy values for aminities_id and property_id to satisfy the type
                                setEditingAmenity({
                                  aminities_id: 0,
                                  aminities_name: e.target.value,
                                  property_id: Number(params.id),
                                });
                              }
                            }}
                            placeholder="Enter amenity name"
                            required
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowAmenityForm(false);
                              setEditingAmenity(null);
                            }}
                            type="button"
                          >
                            Cancel
                          </Button>
                          <Button type="submit">
                            {editingAmenity ? "Update Amenity" : "Add Amenity"}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="border rounded-lg p-4 space-y-4">
                    <h4 className="font-medium">Bulk Import Amenities</h4>
                    <form onSubmit={handleBulkImport} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="amenities">
                          Enter amenities (one per line)
                        </Label>
                        <Textarea
                          id="amenities"
                          value={amenitiesText}
                          onChange={(e) => setAmenitiesText(e.target.value)}
                          placeholder="Enter amenities separated by commas (e.g. Swimming Pool, Gym, Parking)"
                          rows={4}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button type="submit" disabled={!amenitiesText.trim()}>
                          Import Amenities
                        </Button>
                      </div>
                    </form>
                  </div>

                  {amenities.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No amenities added yet
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {amenities.map((amenity) => (
                          <TableRow key={amenity.aminities_id}>
                            <TableCell className="font-medium">
                              {amenity.aminities_name}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setEditingAmenity(amenity);
                                    setShowAmenityForm(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleDeleteAmenity(amenity.aminities_id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="floor-plans" className="space-y-4">
              <FloorPlansManager propertyId={property.property_id} />
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Location Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Address</h4>
                    <p>{property.area_location || "N/A"}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Nearest Prime Location</h4>
                    <p>{property.nearest_prime_location || "N/A"}</p>
                  </div>

                  {property.location_map_link && (
                    <div>
                      <h4 className="font-medium mb-2">Map Link</h4>
                      <a
                        href={property.location_map_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        View on Map
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/3 width on large screens */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Property Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-700">
                  {property.area_location || "N/A"}
                </span>
              </div>

              <Separator />

              <div>
                <div className="text-2xl font-bold flex items-center">
                  <IndianRupee className="h-5 w-5 mr-1" />
                  {property.sale_rent_price ? property.sale_rent_price : "N/A"}
                </div>
                {property.second_price && (
                  <div className="text-sm text-gray-500">
                    <IndianRupee className="h-3 w-3 inline mr-1" />
                    {property.second_price} (Secondary)
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-gray-500">Property Type</div>
                  <div className="font-medium flex items-center">
                    <PropertyTypeIcon className="h-4 w-4 mr-1 text-primary" />
                    {property.prop_type || "N/A"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div>{getStatusBadge(property.prop_status)}</div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium">{property.city_name || "N/A"}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/dashboard/properties/${params.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Property
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Upload Images Button */}
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowUpload(!showUpload)}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {showUpload ? "Hide Upload" : "Upload Property Images"}
              </Button>

              {/* Media Upload Component - shown when button is clicked */}
              {showUpload && (
                <div className="p-4 border rounded-lg">
                  <PropertyMediaUpload propertyId={property.property_id} />
                </div>
              )}
              {property.location_map_link && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() =>
                    window.open(property.location_map_link, "_blank")
                  }
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Map
                </Button>
              )}
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Viewing
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this property?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              property and all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
