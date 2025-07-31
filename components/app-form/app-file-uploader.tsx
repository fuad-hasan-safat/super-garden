"use client";

import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { FormImageUploadProps } from "./app-form.types";

const AppFileUploader
 = <T extends FieldValues>({
  name,
  control,
  errors,
  label = "Upload Images",
  maxImages = 10,
  maxFileSizeMB = 10,
}: FormImageUploadProps<T>) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFiles = (
    files: FileList | null,
    onChange: (val: File[]) => void
  ) => {
    if (!files) return;
    const fileArray = Array.from(files).slice(0, maxImages);
    const validFiles = fileArray.filter(
      (file) => file.size <= maxFileSizeMB * 1024 * 1024
    );
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
    onChange(validFiles);
  };

  const removeImage = (
    index: number,
    images: File[],
    onChange: (val: File[]) => void
  ) => {
    const updated = images.filter((_, i) => i !== index);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    onChange(updated);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = [], onChange } }) => (
        <div className="space-y-4">
          <Label className="text-sm font-medium text-[#0A400C]">
            {label} (Max {maxImages})
          </Label>

          {/* Upload Zone */}
          <div className="border-2 border-dashed border-[#B1AB86]/30 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => handleFiles(e.target.files, onChange)}
              id={name}
            />
            <label htmlFor={name} className="cursor-pointer">
              <Upload className="w-12 h-12 text-[#819067] mx-auto mb-4" />
              <p className="text-[#0A400C] font-medium mb-2">
                Click to upload images
              </p>
              <p className="text-sm text-[#819067]">
                PNG, JPG, JPEG up to {maxFileSizeMB}MB each
              </p>
            </label>
          </div>

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-[#B1AB86]/30"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index, value, onChange)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {errors?.[name] && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors[name]?.message)}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default AppFileUploader
;
