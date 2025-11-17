"use client";

import { ButtonWidget } from "../types";
import { Trash2, GripVertical } from "lucide-react";

interface ButtonWidgetRendererProps {
  widget: ButtonWidget;
  onUpdate: (widget: ButtonWidget) => void;
  onDelete: () => void;
}

export function ButtonWidgetRenderer({ widget, onUpdate, onDelete }: ButtonWidgetRendererProps) {
  return (
    <div className="border border-gray-200 rounded-lg hover:border-green-500 transition-colors bg-white">
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button className="p-1 hover:bg-gray-100 rounded cursor-grab">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </button>
        <button onClick={onDelete} className="p-1 hover:bg-red-100 rounded">
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <select
            value={widget.variant}
            onChange={(e) => onUpdate({ ...widget, variant: e.target.value as any })}
            className="px-2 py-1 text-xs border border-gray-300 rounded"
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="outline">Outline</option>
          </select>
          <select
            value={widget.size}
            onChange={(e) => onUpdate({ ...widget, size: e.target.value as any })}
            className="px-2 py-1 text-xs border border-gray-300 rounded"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
          <select
            value={widget.alignment}
            onChange={(e) => onUpdate({ ...widget, alignment: e.target.value as any })}
            className="px-2 py-1 text-xs border border-gray-300 rounded"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <input
          type="text"
          value={widget.text}
          onChange={(e) => onUpdate({ ...widget, text: e.target.value })}
          placeholder="Button text"
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          value={widget.url}
          onChange={(e) => onUpdate({ ...widget, url: e.target.value })}
          placeholder="Button URL"
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />

        <div className={`text-${widget.alignment}`}>
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              widget.variant === 'primary'
                ? 'bg-green-600 text-white hover:bg-green-700'
                : widget.variant === 'secondary'
                ? 'bg-gray-600 text-white hover:bg-gray-700'
                : 'border-2 border-green-600 text-green-600 hover:bg-green-50'
            } ${
              widget.size === 'sm' ? 'text-sm' : widget.size === 'lg' ? 'text-lg' : 'text-base'
            }`}
          >
            {widget.text}
          </button>
        </div>
      </div>
    </div>
  );
}
