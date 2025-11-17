"use client";

import { ParagraphWidget } from "../types";
import { Trash2, GripVertical } from "lucide-react";

interface ParagraphWidgetRendererProps {
  widget: ParagraphWidget;
  onUpdate: (widget: ParagraphWidget) => void;
  onDelete: () => void;
}

export function ParagraphWidgetRenderer({ widget, onUpdate, onDelete }: ParagraphWidgetRendererProps) {
  return (
    <div className="border border-gray-200 rounded-lg hover:border-green-500 transition-colors bg-white">
      {/* Drag Handle & Delete */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1 hover:bg-gray-100 rounded cursor-grab">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </button>
        <button onClick={onDelete} className="p-1 hover:bg-red-100 rounded">
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-3">
        <select
          value={widget.alignment}
          onChange={(e) => onUpdate({ ...widget, alignment: e.target.value as any })}
          className="px-2 py-1 text-xs border border-gray-300 rounded"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>

      {/* Editable Paragraph */}
      <textarea
        value={widget.text}
        onChange={(e) => onUpdate({ ...widget, text: e.target.value })}
        placeholder="Enter paragraph text..."
        className={`w-full border-none outline-none resize-none min-h-[100px] text-${widget.alignment}`}
        rows={4}
      />
    </div>
  );
}
