"use client";

import { useState, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { Widget, ColumnSettings, Row, DeviceMode } from "./types";
import { FastColorPicker } from "./fast-color-picker";
import { ColumnSettingsContent } from "./column-settings-content";
import { WidgetSettingsContent } from "./widget-settings-content";

interface InspectorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'widget' | 'column' | 'row' | null;
  data: any;
  onUpdate: (updates: any) => void;
  onDelete?: () => void;
  inline?: boolean; // NEW: inline mode for left sidebar
  currentDevice?: DeviceMode; // For column width controls
}

export function InspectorPanel({ isOpen, onClose, type, data, onUpdate, onDelete, inline = false, currentDevice = 'desktop' }: InspectorPanelProps) {
  if (!isOpen || !type) return null;

  const renderWidgetSettings = (widget: Widget) => {
    return (
      <WidgetSettingsContent
        widget={widget}
        onUpdate={onUpdate}
        onDelete={onDelete!}
      />
    );
  };

  const renderWidgetSettingsOLD = (widget: Widget) => {
    const isHeading = widget.type === 'heading';
    const isParagraph = widget.type === 'paragraph';
    const isButton = widget.type === 'button';
    const isIcon = widget.type === 'icon';
    const isHR = widget.type === 'horizontal-line';

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
              onChange={(e) => onUpdate({ level: Number(e.target.value) })}
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

        {/* Text Color (Heading & Button only - Paragraph has toolbar) */}
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
              Icon Size: {(widget as any).size}px
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

        {/* Alignment (Not for Paragraph) */}
        {'alignment' in widget && !isParagraph && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Alignment
            </label>
            <select
              value={(widget as any).alignment || 'left'}
              onChange={(e) => onUpdate({ alignment: e.target.value })}
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
        {onDelete && (
          <div className="pt-3 mt-3 border-t border-gray-200">
            <button
              onClick={onDelete}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded text-sm font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Widget
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderColumnSettings = (settings: ColumnSettings) => {
    return (
      <ColumnSettingsContent
        settings={settings}
        onUpdate={onUpdate}
        onDelete={onDelete}
        currentDevice={currentDevice}
      />
    );
  };

  // Inline mode - for left sidebar (dropdown style like Column Settings)
  if (inline) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium text-sm">
            {type === 'widget' ? 'Widget Settings' : type === 'column' ? 'Column Settings' : 'Row Settings'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[400px] overflow-y-auto">
          {type === 'widget' && renderWidgetSettings(data)}
          {type === 'column' && renderColumnSettings(data)}
        </div>
      </div>
    );
  }

  // Overlay mode - slides from right
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-[200] transition-opacity"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[201] transform transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Inspector</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-73px)]">
          {type === 'widget' && renderWidgetSettings(data)}
          {type === 'column' && renderColumnSettings(data)}
        </div>
      </div>
    </>
  );
}
