"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/axiosInstance";

export default function PropertyAmenitiesPage({ params }) {
  const { toast } = useToast();
  const [amenities, setAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");
  const [showForm, setShowForm] = useState(false);
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [amenitiesText, setAmenitiesText] = useState("");

  // Fetch amenities
  const fetchAmenities = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/aminities/get/property/${params.id}`);
      setAmenities(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch amenities",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, [params.id]);

  // Handle delete amenity
  const handleDelete = async (id) => {
    try {
      await api.delete(`/aminities/delete/${id}`);
      toast({
        title: "Success",
        description: "Amenity deleted successfully",
      });
      fetchAmenities();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete amenity",
        variant: "destructive",
      });
    }
  };

  // Handle form submit (create/update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const name = editingAmenity?.aminities_name || "";
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
      setShowForm(false);
      setEditingAmenity(null);
      fetchAmenities();
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

  // Handle bulk import
  const handleBulkImport = async (e) => {
    e.preventDefault();
    if (!amenitiesText.trim()) return;

    try {
      const amenitiesList = amenitiesText
        .split("\n")
        .filter((name) => name.trim())
        .map((name) => ({
          aminities_name: name.trim(),
          property_id: params.id,
        }));

      await api.post("/aminities/add/bulk-insert", amenitiesList);
      toast({
        title: "Success",
        description: `${amenitiesList.length} amenities added successfully`,
      });
      setAmenitiesText("");
      fetchAmenities();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import amenities",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Property Amenities</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Amenities List</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
        </TabsList>

        {/* Amenities List Tab */}
        <TabsContent value="list">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Property Amenities</h3>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Amenity
              </Button>
            </div>

            {showForm && (
              <div className="border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">
                  {editingAmenity ? "Edit Amenity" : "Add New Amenity"}
                </h4>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Amenity Name</Label>
                    <Input
                      id="name"
                      value={editingAmenity?.aminities_name || ""}
                      onChange={(e) => setEditingAmenity({
                        ...editingAmenity,
                        aminities_name: e.target.value
                      })}
                      placeholder="Enter amenity name"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowForm(false);
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

            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : amenities.length === 0 ? (
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
                              setShowForm(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(amenity.aminities_id)}
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
          </div>
        </TabsContent>

        {/* Bulk Import Tab */}
        <TabsContent value="bulk">
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
                  placeholder="Swimming Pool\nGym\nParking\n..."
                  rows={5}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="submit"
                  disabled={!amenitiesText.trim()}
                >
                  Import Amenities
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}