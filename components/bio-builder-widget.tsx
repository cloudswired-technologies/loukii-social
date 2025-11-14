"use client";

import { useState } from "react";

type WidgetType = "paragraph" | "heading" | "image" | "video" | "bulletList" | "numberedList" | "iconList" | "quote" | "divider";

interface Widget {
  id: string;
  type: WidgetType;
  content: string;
  level?: number;
  imageFile?: File;
  imagePreview?: string;
  videoUrl?: string;
  items?: string[];
  icon?: string;
}

interface BioWidgetProps {
  widget: Widget;
  blockId: string;
  colIndex: number;
  widgetIndex: number;
  onUpdate: (updates: Partial<Widget>) => void;
  onDelete: () => void;
  onDragStart: () => void;
}

export function BioWidget({ widget, onUpdate, onDelete, onDragStart }: BioWidgetProps) {
  const [isHovered, setIsHovered] = useState(false);

  const renderWidget = () => {
    switch (widget.type) {
      case "paragraph":
        return (
          <textarea
            value={widget.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            placeholder="Start writing your paragraph..."
            className="w-full min-h-[100px] px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        );

      case "heading":
        return (
          <div className="space-y-2">
            <div className="flex gap-2">
              {[1, 2, 3].map((level) => (
                <button
                  key={level}
                  onClick={() => onUpdate({ level })}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    widget.level === level
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  H{level}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={widget.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              placeholder="Enter heading text..."
              className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                widget.level === 1 ? "text-3xl font-bold" :
                widget.level === 2 ? "text-2xl font-semibold" :
                "text-xl font-medium"
              }`}
            />
          </div>
        );

      case "image":
        return (
          <div className="space-y-2">
            {widget.imagePreview ? (
              <div className="relative">
                <img
                  src={widget.imagePreview}
                  alt="Preview"
                  className="w-full rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => onUpdate({ imageFile: undefined, imagePreview: undefined })}
                  className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <label className="block w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        onUpdate({ imageFile: file, imagePreview: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
                <div className="text-center">
                  <svg className="mx-auto w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">Click to upload image</p>
                </div>
              </label>
            )}
          </div>
        );

      case "video":
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={widget.videoUrl || ""}
              onChange={(e) => onUpdate({ videoUrl: e.target.value })}
              placeholder="Enter YouTube video URL..."
              className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {widget.videoUrl && (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </div>
            )}
          </div>
        );

      case "bulletList":
      case "numberedList":
        return (
          <div className="space-y-2">
            {widget.items?.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-gray-500 mt-2">
                  {widget.type === "bulletList" ? "•" : `${idx + 1}.`}
                </span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...(widget.items || [])];
                    newItems[idx] = e.target.value;
                    onUpdate({ items: newItems });
                  }}
                  placeholder="List item..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    const newItems = widget.items?.filter((_, i) => i !== idx);
                    onUpdate({ items: newItems });
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={() => onUpdate({ items: [...(widget.items || []), ""] })}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              + Add item
            </button>
          </div>
        );

      case "quote":
        return (
          <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
            <textarea
              value={widget.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              placeholder="Enter quote..."
              className="w-full bg-transparent text-gray-700 italic text-lg focus:outline-none resize-none"
              rows={3}
            />
          </div>
        );

      case "divider":
        return (
          <div className="py-4">
            <hr className="border-t-2 border-gray-300" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group mb-4 p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors bg-white"
    >
      {/* Widget Controls */}
      {isHovered && (
        <div className="absolute -top-3 right-2 flex gap-1 bg-white border border-gray-200 rounded-lg shadow-sm p-1">
          <button
            onClick={onDelete}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button
            className="p-1.5 text-gray-500 hover:bg-gray-50 rounded cursor-move"
            title="Drag to reorder"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      )}

      {/* Widget Content */}
      {renderWidget()}
    </div>
  );
}
