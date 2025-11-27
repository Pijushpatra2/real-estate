"use client";

import React, { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImagePreview {
  previewUrl: string;
  isLocalFile: boolean;
}

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  onImageRemove: (index: number) => void;
  images: (File | string)[];
  maxImages: number;
  buttonText?: string;
  compact?: boolean;
}

export function ImageUpload({
  onImageUpload,
  onImageRemove,
  images,
  maxImages,
  buttonText = "Upload Image",
  compact = false,
}: ImageUploadProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState<ImagePreview[]>([]);

  useEffect(() => {
    const newPreviews: ImagePreview[] = images.map((img) => {
      if (typeof img === "string") {
        return { previewUrl: img, isLocalFile: false };
      } else {
        return { previewUrl: URL.createObjectURL(img), isLocalFile: true };
      }
    });

    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((preview) => {
        if (preview.isLocalFile) {
          URL.revokeObjectURL(preview.previewUrl);
        }
      });
    };
  }, [images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > maxImages) {
      toast({
        title: `Maximum ${maxImages} images allowed`,
        description: `You can only upload up to ${maxImages} images.`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    Array.from(files).forEach((file) => onImageUpload(file));

    setTimeout(() => {
      setIsUploading(false);
      e.target.value = "";
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className={compact ? "" : "flex items-center justify-center w-full"}>
        <label
          htmlFor="image-upload"
          className={`${
            compact
              ? "inline-flex items-center text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
              : "flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading || images.length >= maxImages}
            multiple={maxImages > 1}
          />
          {compact ? (
            <span className="flex items-center">
              <Upload className="h-4 w-4 mr-1" />
              {buttonText}
            </span>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG or WEBP (Max. {maxImages})
              </p>
              {isUploading && (
                <div className="mt-2 text-sm text-gray-500 animate-pulse">
                  Uploading...
                </div>
              )}
            </div>
          )}
        </label>
      </div>

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="flex gap-4 flex-wrap">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative w-20 h-20 rounded overflow-hidden border border-gray-200"
            >
              <img
                src={preview.previewUrl}
                alt="preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onImageRemove(index)}
                className="absolute top-0 right-0 bg-white bg-opacity-75 rounded-bl px-1 text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
