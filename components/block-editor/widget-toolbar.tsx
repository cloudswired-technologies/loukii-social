"use client";

import { 
  Heading1, 
  Type, 
  Image, 
  Youtube, 
  Columns, 
  Table, 
  Minus, 
  MousePointer2, 
  Smile,
  List
} from "lucide-react";
import { WidgetType } from "./types";

interface WidgetToolbarProps {
  onAddWidget: (type: WidgetType) => void;
  onDragStart: (type: WidgetType) => void;
}

const widgets = [
  { type: 'heading' as WidgetType, icon: Heading1, label: 'Heading' },
  { type: 'paragraph' as WidgetType, icon: Type, label: 'Paragraph' },
  { type: 'image' as WidgetType, icon: Image, label: 'Image' },
  { type: 'youtube' as WidgetType, icon: Youtube, label: 'YouTube' },
  { type: 'column' as WidgetType, icon: Columns, label: 'Column' },
  { type: 'table' as WidgetType, icon: Table, label: 'Table' },
  { type: 'horizontal-line' as WidgetType, icon: Minus, label: 'Line' },
  { type: 'button' as WidgetType, icon: MousePointer2, label: 'Button' },
  { type: 'icon' as WidgetType, icon: Smile, label: 'Icon' },
  { type: 'list' as WidgetType, icon: List, label: 'List' },
];

export function WidgetToolbar({ onAddWidget, onDragStart }: WidgetToolbarProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {widgets.map((widget) => {
          const Icon = widget.icon;
          return (
            <button
              key={widget.type}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move';
                onDragStart(widget.type);
              }}
              onClick={() => onAddWidget(widget.type)}
              className="flex flex-col items-center gap-1 px-2.5 py-2 rounded-md hover:bg-gray-50 hover:border-green-500 border border-transparent transition-all group cursor-grab active:cursor-grabbing"
              title={`${widget.label} - Click or drag to add`}
            >
              <Icon className="w-4 h-4 text-gray-500 group-hover:text-green-600 transition-colors" />
              <span className="text-[10px] text-gray-500 group-hover:text-green-600 whitespace-nowrap font-medium transition-colors">
                {widget.label}
              </span>
            </button>
          );
        })}
    </div>
  );
}
