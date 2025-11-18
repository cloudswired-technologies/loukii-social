"use client";

import { HorizontalLineWidget } from "../types";
import { Trash2, GripVertical } from "lucide-react";
import { FastColorPicker } from "../fast-color-picker";

interface HRWidgetRendererProps {
  widget: HorizontalLineWidget;
  onUpdate: (widget: HorizontalLineWidget) => void;
  onDelete: () => void;
}

export function HRWidgetRenderer({ widget, onUpdate, onDelete }: HRWidgetRendererProps) {
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

      <div className="flex gap-2 mb-3 items-center">
        <select
          value={widget.style}
          onChange={(e) => onUpdate({ ...widget, style: e.target.value as any })}
          className="px-2 py-1 text-xs border border-gray-300 rounded"
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
        <FastColorPicker
          value={widget.color}
          onChange={(color) => onUpdate({ ...widget, color })}
        />
      </div>

      <hr style={{ borderStyle: widget.style, borderColor: widget.color, borderWidth: '2px' }} />
    </div>
  );
}
