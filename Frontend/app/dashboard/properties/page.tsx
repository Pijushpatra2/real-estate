"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, MoreHorizontal, Search, Trash2, Edit, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import api from "@/lib/axiosInstance";

interface Property {
  property_id: number;
  prop_title: string;
  city_name: string;
  sale_rent_price: string;
  prop_land_size: string;
  prop_status: string;
  prop_status_for_admin: string;
  prop_type: string;
  created_at: string;
}

export default function PropertiesPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get("/properties/get/all");

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid data format received from server");
        }

        // Transform data to match our display requirements
        const formattedProperties = response.data.map((property: any) => ({
          property_id: property.property_id,
          prop_title: property.prop_title || "N/A",
          city_name: property.city_name || "N/A",
          sale_rent_price: property.sale_rent_price || "N/A",
          prop_land_size: property.prop_land_size || "N/A",
          prop_status: property.prop_status || "N/A",
          prop_status_for_admin: property.prop_status_for_admin || "pending",
          prop_type: property.prop_type || "N/A",
          created_at: property.created_at,
        }));

        setProperties(formattedProperties);
      } catch (err) {
        setError("Failed to load properties. Please try again later.");
        console.error("Error fetching properties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties with null checks
  const filteredProperties = properties.filter((property) => {
    const title = property.prop_title?.toLowerCase() || "";
    const city = property.city_name?.toLowerCase() || "";
    const status = property.prop_status || "";
    const type = property.prop_type || "";

    const matchesSearch =
      title.includes(searchQuery.toLowerCase()) ||
      city.includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || status === statusFilter;
    const matchesType = typeFilter === "all" || type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDeleteClick = (id: number) => {
    setPropertyToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!propertyToDelete) return;

    try {
      await api.delete(`/properties/delete/${propertyToDelete}`);
      setProperties((prev) =>
        prev.filter((p) => p.property_id !== propertyToDelete)
      );
      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setPropertyToDelete(null);
    }
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "for sale":
        return <Badge className="bg-green-500">For Sale</Badge>;
      case "for rent":
        return <Badge className="bg-blue-500">For Rent</Badge>;
      case "sold":
        return <Badge className="bg-purple-500">Sold</Badge>;
      case "hot":
        return <Badge className="bg-red-500">Hot</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAdminStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Properties"
        description="Manage your property listings"
        action={
          <Link href="/dashboard/properties/new">
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </Link>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search properties..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="For Rent">For Rent</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
              <SelectItem value="Hot">Hot</SelectItem>
              <SelectItem value="Available Soon">Available Soon</SelectItem>
              <SelectItem value="Ready to Move">Ready to Move</SelectItem>
              <SelectItem value="Under Construction">
                Under Construction
              </SelectItem>
              <SelectItem value="Booked">Booked</SelectItem>
              <SelectItem value="Featured">Featured</SelectItem>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="Off Market">Off Market</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Residential">Residential</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Land Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Admin Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <TableRow key={property.property_id}>
                    <TableCell className="font-medium">
                      {property.prop_title}
                    </TableCell>
                    <TableCell>{property.city_name}</TableCell>
                    <TableCell>
                      {property.sale_rent_price}
                    </TableCell>
                    <TableCell>{property.prop_land_size}</TableCell>
                    <TableCell>
                      {getStatusBadge(property.prop_status)}
                    </TableCell>
                    <TableCell>
                      {getAdminStatusBadge(property.prop_status_for_admin)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{property.prop_type}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(property.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link
                              href={`/dashboard/properties/${property.property_id}`}
                              className="flex items-center w-full"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem>
                            <Link href={`/dashboard/properties/${property.property_id}/edit`} className="flex items-center w-full">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem> */}
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() =>
                              handleDeleteClick(property.property_id)
                            }
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-8 text-gray-500"
                  >
                    No properties found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this property?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              property from the database.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
