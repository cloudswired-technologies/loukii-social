"use client";

import { Trash2 } from "lucide-react";
import { Widget } from "./types";
import { FastColorPicker } from "./fast-color-picker";

interface WidgetSettingsContentProps {
  widget: Widget;
  onUpdate: (updates: any) => void;
  onDelete: () => void;
}

export function WidgetSettingsContent({ widget, onUpdate, onDelete }: WidgetSettingsContentProps) {
  // Check widget type and properties
  const hasAlignment = 'alignment' in widget;
  const isHeading = widget.type === 'heading';
  const isParagraph = widget.type === 'paragraph';
  const isButton = widget.type === 'button';
  const isIcon = widget.type === 'icon';
  const isHR = widget.type === 'horizontal-line';
  const isImage = widget.type === 'image';
  const isYouTube = widget.type === 'youtube';

  return (
    <div className="space-y-3">
      {/* Heading Level */}
      {isHeading && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Heading Level
          </label>
          <select
            value={(widget as any).level || 2}
            onChange={(e) => onUpdate({ level: Number(e.target.value) as any })}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
          >
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
            <option value="4">H4</option>
            <option value="5">H5</option>
            <option value="6">H6</option>
          </select>
        </div>
      )}

      {/* Text Color (Heading and Button only - Paragraph has toolbar) */}
      {(isHeading || isButton) && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Text Color
          </label>
          <FastColorPicker
            value={(widget as any).color || '#000000'}
            onChange={(color) => onUpdate({ color })}
            className="w-full"
          />
        </div>
      )}

      {/* Background Color (Button) */}
      {isButton && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <FastColorPicker
            value={(widget as any).backgroundColor || '#16A34A'}
            onChange={(backgroundColor) => onUpdate({ backgroundColor })}
            className="w-full"
          />
        </div>
      )}

      {/* Icon Size */}
      {isIcon && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Icon Size: {(widget as any).size || 48}px
          </label>
          <input
            type="range"
            min="16"
            max="128"
            value={(widget as any).size || 48}
            onChange={(e) => onUpdate({ size: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>
      )}

      {/* Icon Color */}
      {isIcon && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Icon Color
          </label>
          <FastColorPicker
            value={(widget as any).color || '#000000'}
            onChange={(color) => onUpdate({ color })}
            className="w-full"
          />
        </div>
      )}

      {/* HR Style */}
      {isHR && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Line Style
          </label>
          <select
            value={(widget as any).style || 'solid'}
            onChange={(e) => onUpdate({ style: e.target.value })}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
          </select>
        </div>
      )}

      {/* HR Thickness */}
      {isHR && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Thickness
          </label>
          <select
            value={(widget as any).thickness || '1px'}
            onChange={(e) => onUpdate({ thickness: e.target.value })}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
          >
            <option value="1px">1px</option>
            <option value="2px">2px</option>
            <option value="3px">3px</option>
            <option value="4px">4px</option>
            <option value="5px">5px</option>
          </select>
        </div>
      )}

      {/* HR Color */}
      {isHR && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Line Color
          </label>
          <FastColorPicker
            value={(widget as any).color || '#e5e7eb'}
            onChange={(color) => onUpdate({ color })}
            className="w-full"
          />
        </div>
      )}

      {/* Image/YouTube Width */}
      {(isImage || isYouTube) && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Width
          </label>
          <select
            value={(widget as any).width || '100%'}
            onChange={(e) => onUpdate({ width: e.target.value })}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
          >
            <option value="100%">Full Width (100%)</option>
            <option value="75%">Large (75%)</option>
            <option value="50%">Medium (50%)</option>
            <option value="25%">Small (25%)</option>
          </select>
        </div>
      )}

      {/* Alignment (Not for Paragraph - has toolbar) */}
      {hasAlignment && !isParagraph && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Alignment
          </label>
          <select
            value={(widget as any).alignment || 'left'}
            onChange={(e) => onUpdate({ alignment: e.target.value as any })}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      )}

      {/* Padding */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Padding
        </label>
        <select
          value={(widget as any).padding || '0px'}
          onChange={(e) => onUpdate({ padding: e.target.value })}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
        >
          <option value="0px">0px</option>
          <option value="4px">4px</option>
          <option value="8px">8px</option>
          <option value="12px">12px</option>
          <option value="16px">16px</option>
          <option value="24px">24px</option>
        </select>
      </div>

      {/* Margin */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Margin
        </label>
        <select
          value={(widget as any).margin || '0px'}
          onChange={(e) => onUpdate({ margin: e.target.value })}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
        >
          <option value="0px">0px</option>
          <option value="4px">4px</option>
          <option value="8px">8px</option>
          <option value="12px">12px</option>
          <option value="16px">16px</option>
        </select>
      </div>

      {/* Delete Button */}
      <div className="pt-3 mt-3 border-t border-gray-200">
        <button
          onClick={onDelete}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded text-sm font-medium transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete Widget
        </button>
      </div>
    </div>
  );
}
