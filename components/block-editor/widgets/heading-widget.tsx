"use client";

import { useState, useRef } from "react";
import { HeadingWidget } from "../types";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { FastColorPicker } from "../fast-color-picker";

interface HeadingWidgetRendererProps {
  widget: HeadingWidget;
  onUpdate: (widget: HeadingWidget) => void;
  onDelete: () => void;
}

export function HeadingWidgetRenderer({ widget, onUpdate, onDelete }: HeadingWidgetRendererProps) {
  const [localColor, setLocalColor] = useState((widget as any).color || '#000000');
  const colorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleColorChange = (color: string) => {
    setLocalColor(color);
    if (colorTimeoutRef.current) {
      clearTimeout(colorTimeoutRef.current);
    }
    colorTimeoutRef.current = setTimeout(() => {
      onUpdate({ ...widget, color } as any);
    }, 100);
  };

  const getFontSize = () => {
    switch (widget.level) {
      case 1: return '2rem';
      case 2: return '1.5rem';
      case 3: return '1.25rem';
      case 4: return '1.125rem';
      case 5: return '1rem';
      case 6: return '0.875rem';
      default: return '1.5rem';
    }
  };

  return (
    <div className="group">
      {/* Toolbar - Always visible */}
      <div className="mb-2 bg-white border border-gray-200 rounded-lg shadow-sm p-2 flex items-center gap-1">
        {/* Heading Level */}
        <select
          value={widget.level}
          onChange={(e) => onUpdate({ ...widget, level: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6 })}
          className="px-2 py-1 text-sm border border-gray-300 rounded"
        >
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
          <option value="5">H5</option>
          <option value="6">H6</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Alignment */}
        <button
          onClick={() => onUpdate({ ...widget, alignment: 'left' })}
          className={`p-2 hover:bg-gray-100 rounded ${widget.alignment === 'left' ? 'bg-gray-100' : ''}`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onUpdate({ ...widget, alignment: 'center' })}
          className={`p-2 hover:bg-gray-100 rounded ${widget.alignment === 'center' ? 'bg-gray-100' : ''}`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          onClick={() => onUpdate({ ...widget, alignment: 'right' })}
          className={`p-2 hover:bg-gray-100 rounded ${widget.alignment === 'right' ? 'bg-gray-100' : ''}`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Text Color */}
        <FastColorPicker
          value={localColor}
          onChange={handleColorChange}
        />
      </div>

      {/* Editable Heading */}
      <input
        type="text"
        value={widget.text}
        onChange={(e) => onUpdate({ ...widget, text: e.target.value })}
        placeholder="Enter heading text..."
        className="w-full border border-gray-200 outline-none font-bold px-2 py-1 rounded focus:border-green-500 focus:ring-2 focus:ring-green-500 transition-all"
        style={{
          fontSize: getFontSize(),
          textAlign: widget.alignment || 'left',
          color: (widget as any).color || '#000000'
        }}
      />
    </div>
  );
}
