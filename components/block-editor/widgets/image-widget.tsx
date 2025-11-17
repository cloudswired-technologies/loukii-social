"use client";

import { ImageWidget } from "../types";
import { Trash2, GripVertical, Upload } from "lucide-react";
import { useState } from "react";

interface ImageWidgetRendererProps {
  widget: ImageWidget;
  onUpdate: (widget: ImageWidget) => void;
  onDelete: () => void;
}

export function ImageWidgetRenderer({ widget, onUpdate, onDelete }: ImageWidgetRendererProps) {
  const [imageUrl, setImageUrl] = useState(widget.url);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setImageUrl(url);
        onUpdate({ ...widget, url });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg hover:border-green-500 transition-colors bg-white">
      {/* Image Upload or Display */}
      {!imageUrl ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-green-500 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Click to upload image</span>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      ) : (
        <div className={`text-${widget.alignment}`}>
          <img src={imageUrl} alt={widget.alt} style={{ width: widget.width }} className="rounded" />
          <input
            type="text"
            value={widget.caption || ''}
            onChange={(e) => onUpdate({ ...widget, caption: e.target.value })}
            placeholder="Image caption (optional)"
            className="w-full mt-2 px-2 py-1 text-sm border border-gray-300 rounded"
          />
        </div>
      )}
    </div>
  );
}
