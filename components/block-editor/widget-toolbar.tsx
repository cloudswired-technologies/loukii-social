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
    <div className="flex items-center gap-2 overflow-x-auto">
      {widgets.map((widget) => {
          const Icon = widget.icon;
          return (
            <div
              key={widget.type}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move';
                onDragStart(widget.type);
              }}
              onClick={() => onAddWidget(widget.type)}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group min-w-[60px] cursor-grab active:cursor-grabbing"
              title={`${widget.label} - Click or drag to add`}
            >
              <Icon className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
              <span className="text-xs text-gray-600 group-hover:text-green-600 whitespace-nowrap">
                {widget.label}
              </span>
            </div>
          );
        })}
    </div>
  );
}
