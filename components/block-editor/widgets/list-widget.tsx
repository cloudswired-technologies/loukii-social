"use client";

import { ListWidget } from "../types";
import { Trash2, GripVertical, Plus, X } from "lucide-react";

interface ListWidgetRendererProps {
  widget: ListWidget;
  onUpdate: (widget: ListWidget) => void;
  onDelete: () => void;
}

export function ListWidgetRenderer({ widget, onUpdate, onDelete }: ListWidgetRendererProps) {
  const addItem = () => {
    onUpdate({ ...widget, items: [...widget.items, ''] });
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...widget.items];
    newItems[index] = value;
    onUpdate({ ...widget, items: newItems });
  };

  const deleteItem = (index: number) => {
    onUpdate({ ...widget, items: widget.items.filter((_, i) => i !== index) });
  };

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

      <div className="mb-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={widget.ordered}
            onChange={(e) => onUpdate({ ...widget, ordered: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm">Ordered list (numbered)</span>
        </label>
      </div>

      <div className="space-y-2">
        {widget.items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <span className="text-sm text-gray-500 w-6">{widget.ordered ? `${index + 1}.` : '•'}</span>
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder="List item"
              className="flex-1 px-2 py-1 border border-gray-300 rounded"
            />
            <button onClick={() => deleteItem(index)} className="p-1 hover:bg-red-100 rounded">
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="mt-3 flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
      >
        <Plus className="w-4 h-4" />
        Add item
      </button>
    </div>
  );
}
