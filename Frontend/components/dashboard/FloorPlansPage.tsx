// components/FloorPlansManager.js
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Edit, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axiosInstance";

interface FloorPlansManagerProps {
  propertyId: string | number;
}

export function FloorPlansManager({ propertyId }: FloorPlansManagerProps) {
  const { toast } = useToast();
  interface FloorPlan {
    floor_plan_id: string | number;
    floor_name: string;
    floor_price: string;
    floor_size: string;
    floor_img?: string;
    [key: string]: any;
  }

  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<FloorPlan | null>(null);
  const [formData, setFormData] = useState<{
    floor_name: string;
    floor_price: string;
    floor_size: string;
    floor_img: File | null;
  }>({
    floor_name: "",
    floor_price: "",
    floor_size: "",
    floor_img: null,
  });
  const [previewImage, setPreviewImage] = useState("");

  // Fetch floor plans
  const fetchFloorPlans = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/floor-plans/get/${propertyId}`);
      setFloorPlans(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch floor plans",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchFloorPlans();
    }
  }, [propertyId]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, floor_img: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      floor_name: "",
      floor_price: "",
      floor_size: "",
      floor_img: null,
    });
    setPreviewImage("");
    setSelectedPlan(null);
  };

  // Submit form (add or update)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      formPayload.append("prop_id", propertyId.toString());
      formPayload.append("floor_name", formData.floor_name);
      formPayload.append("floor_price", formData.floor_price);
      formPayload.append("floor_size", formData.floor_size);
      if (formData.floor_img) {
        formPayload.append("floor_img", formData.floor_img);
      }

      if (selectedPlan) {
        // Update existing floor plan
        await api.put(`/floor-plans/update/${selectedPlan.floor_plan_id}`, formPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast({
          title: "Success",
          description: "Floor plan updated successfully",
        });
      } else {
        // Add new floor plan
        await api.post("/floor-plans/add", formPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast({
          title: "Success",
          description: "Floor plan added successfully",
        });
      }

      // Refresh data and close dialog
      fetchFloorPlans();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: selectedPlan
          ? "Failed to update floor plan"
          : "Failed to add floor plan",
        variant: "destructive",
      });
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!selectedPlan) {
      toast({
        title: "Error",
        description: "No floor plan selected for deletion",
        variant: "destructive",
      });
      return;
    }
    try {
      await api.delete(`/floor-plans/delete/${selectedPlan.floor_plan_id}`);
      toast({
        title: "Success",
        description: "Floor plan deleted successfully",
      });
      fetchFloorPlans();
      setIsDeleteDialogOpen(false);
      setSelectedPlan(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete floor plan",
        variant: "destructive",
      });
    }
  };

  // Open edit dialog
  const openEditDialog = (plan: FloorPlan) => {
    setSelectedPlan(plan);
    setFormData({
      floor_name: plan.floor_name,
      floor_price: plan.floor_price,
      floor_size: plan.floor_size,
      floor_img: null,
    });
    setPreviewImage(plan.floor_img ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${plan.floor_img}` : "");
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Floor Plans</h3>
        <Button size="sm" onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Floor Plan
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : floorPlans.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No floor plans added yet
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Image</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {floorPlans.map((plan) => (
                <TableRow key={plan.floor_plan_id}>
                  <TableCell className="font-medium">{plan.floor_name}</TableCell>
                  <TableCell>{plan.floor_price}</TableCell>
                  <TableCell>{plan.floor_size}</TableCell>
                  <TableCell>
                    {plan.floor_img ? (
                      <div className="relative h-10 w-10">
                        <ImageIcon className="h-5 w-5 text-primary" />
                      </div>
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(plan)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedPlan(plan);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        if (!open) {
          resetForm();
          setIsDialogOpen(false);
        } else {
          setIsDialogOpen(true);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedPlan ? "Edit Floor Plan" : "Add New Floor Plan"}
            </DialogTitle>
            <DialogDescription>
              {selectedPlan
                ? "Update the floor plan details"
                : "Fill in the details for the new floor plan"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="floor_name">Floor Name</Label>
              <Input
                id="floor_name"
                name="floor_name"
                value={formData.floor_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="floor_price">Price</Label>
              <Input
                id="floor_price"
                name="floor_price"
                value={formData.floor_price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="floor_size">Size (sq ft)</Label>
              <Input
                id="floor_size"
                name="floor_size"
                value={formData.floor_size}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="floor_img">Floor Plan Image</Label>
              <Input
                id="floor_img"
                name="floor_img"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required={!selectedPlan}
              />
              {previewImage && (
                <div className="mt-2">
                  <div className="relative h-40 w-full border rounded-md overflow-hidden">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                resetForm();
                setIsDialogOpen(false);
              }}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedPlan ? "Update" : "Add"} Floor Plan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the floor plan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
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