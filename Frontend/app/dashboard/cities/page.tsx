"use client";

import { useEffect, useState } from "react";
import axios from "axios";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Plus, MoreHorizontal, Search, Trash2, Edit } from "lucide-react";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import api, {MEDIA_BASE_URL} from "@/lib/axiosInstance";

// ✅ TypeScript interface for city
interface City {
  id: number;
  name: string;
  cityImage: string;
  created_at?: string;
  updated_at?: string;
}

export default function CitiesPage() {
  const { toast } = useToast();
  const [cities, setCities] = useState<City[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cityImage, setCityImage] = useState<string | File>("");
  const [newCity, setNewCity] = useState({
    name: "",
  });
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [cityToDelete, setCityToDelete] = useState<number | null>(null);

  const fetchCities = async () => {
    try {
      const res = await api.get("/cities/get/all");

      console.log("API response:", res.data); // Logs the correct shape
      if (Array.isArray(res.data.cities)) {
        setCities(res.data.cities);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error("Error fetching cities:", error);
      toast({
        title: "Failed to fetch cities",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleAddCity = async () => {
    if (!newCity.name.trim()) {
      toast({ title: "City name is required", variant: "destructive" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newCity.name);
      if (cityImage) {
        formData.append("cityImage", cityImage); // ✅ field name must match backend
      }

      await api.post("/cities/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({ title: "City added successfully" });
      setNewCity({ name: "" });
      setCityImage("");
      setIsAddDialogOpen(false);
      fetchCities();
    } catch (error) {
      toast({
        title: "Error adding city",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  interface EditCity {
    id: number;
    name: string;
    cityImage: string;
    created_at?: string;
    updated_at?: string;
    [key: string]: any; // for any extra fields
  }

  const handleEditClick = (city: EditCity) => {
    setEditingCity({ ...city });
    setCityImage(city.cityImage);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCity = async () => {
    if (!editingCity?.name?.trim()) {
      toast({ title: "City name is required", variant: "destructive" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", editingCity.name);

      if (cityImage instanceof File) {
        formData.append("image", cityImage); // ✅ new image
      } else if (typeof cityImage === "string") {
        formData.append("existingImage", cityImage); // ✅ send existing image URL or ID
      }

      await api.put(`/cities/update/${editingCity.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({ title: "City updated successfully" });
      setIsEditDialogOpen(false);
      setEditingCity(null);
      setCityImage("");
      fetchCities();
    } catch (error) {
      toast({
        title: "Error updating city",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (id: number) => {
    setCityToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/cities/delete/${cityToDelete}`);
      toast({ title: "City deleted successfully" });
      fetchCities();
    } catch (error) {
      toast({
        title: "Error deleting city",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setCityToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Cities"
        description="Manage your city listings"
        action={
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add City
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New City</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Label>City Name *</Label>
                <Input
                  value={newCity.name}
                  onChange={(e) =>
                    setNewCity({ ...newCity, name: e.target.value })
                  }
                />
                <Label>City Image</Label>
                <Card>
                  <CardContent className="pt-6">
                    <ImageUpload
                      images={cityImage ? [cityImage] : []} // cityImage can be File or string
                      maxImages={1}
                      onImageUpload={(file) => setCityImage(file)}
                      onImageRemove={() => setCityImage("")}
                    />
                  </CardContent>
                </Card>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddCity}>Add</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="flex justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cities..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <TableRow key={city.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <img
                        src={
                          city.cityImage
                            ? `${MEDIA_BASE_URL}${city.cityImage}`
                            : "/placeholder.svg"
                        }
                        alt={city.name}
                        className="w-10 h-10 mr-3 rounded-md object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.svg";
                        }}
                      />
                      {city.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0 w-8 h-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(city)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteClick(city.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-6">
                  No cities found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      {editingCity && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit City</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Label>City Name *</Label>
              <Input
                value={editingCity.name}
                onChange={(e) =>
                  setEditingCity({ ...editingCity, name: e.target.value })
                }
              />
              <Label>City Image</Label>
              <Card>
                <CardContent className="pt-6">
                  <ImageUpload
                    images={cityImage ? [cityImage] : []}
                    maxImages={1}
                    onImageUpload={(file) => setCityImage(file)}
                    onImageRemove={() => setCityImage("")}
                  />
                </CardContent>
              </Card>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateCity}>Update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete City</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "
              {Array.isArray(cities) &&
                cities.find((c) => c.id === cityToDelete)?.name}
              "? This action cannot be undone.
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