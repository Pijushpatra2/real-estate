"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/axiosInstance";

interface PropertyMediaUploadProps {
  propertyId: string;
  onSuccess?: () => void; // Optional callback after upload
}

export default function PropertyMediaUpload({ propertyId, onSuccess }: PropertyMediaUploadProps) {
  const { toast } = useToast();
  const [uploadMode, setUploadMode] = useState<"single" | "multiple">("multiple");
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    if (uploadMode === "single") {
      setFiles([selectedFiles[0]]);
    } else {
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

const handleUpload = async () => {
  if (files.length === 0) return;

  const formData = new FormData();
  formData.append("prop_id", propertyId);

  const fieldName = uploadMode === "single" ? "gallery_img" : "gallery_images";
  files.forEach(file => formData.append(fieldName, file));

  // Debug logs
  console.log("Uploading with propertyId:", propertyId);
  console.log("Files to upload:", files);
  console.log("FormData entries:");
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    setIsUploading(true);
    const endpoint = uploadMode === "single" ? "/media/upload" : "/media/upload-multiple";
    await api.post(endpoint, formData);
    toast({ title: "Success", description: "Images uploaded successfully" });
    setFiles([]);
    onSuccess?.();
  } catch (error) {
    console.error("Upload error:", error);
    toast({ title: "Error", description: "Upload failed", variant: "destructive" });
  } finally {
    setIsUploading(false);
  }
};


  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={uploadMode === "single" ? "default" : "outline"}
          onClick={() => {
            setUploadMode("single");
            setFiles([]);
          }}
        >
          Single Image
        </Button>
        <Button
          variant={uploadMode === "multiple" ? "default" : "outline"}
          onClick={() => {
            setUploadMode("multiple");
            setFiles([]);
          }}
        >
          Multiple Images
        </Button>
      </div>

      <div className="border-2 border-dashed rounded-lg p-4 text-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple={uploadMode === "multiple"}
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <Upload className="mr-2 h-4 w-4" /> Select {uploadMode === "single" ? "Image" : "Images"}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          {uploadMode === "single"
            ? "Upload one property image"
            : "Upload up to 20 images (JPEG/PNG/WebP)"}
        </p>
      </div>

      {files.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {files.map((file, i) => (
              <div key={i} className="relative aspect-square">
                <img
                  src={URL.createObjectURL(file)}
                  className="h-full w-full object-cover rounded"
                  alt="Preview"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => removeFile(i)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : `Upload ${files.length} Image${files.length > 1 ? "s" : ""}`}
          </Button>
        </>
      )}
    </div>
  );
}
