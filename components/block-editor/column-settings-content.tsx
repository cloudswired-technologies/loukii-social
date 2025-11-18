"use client";

import { Monitor, Tablet, Smartphone, Trash2 } from "lucide-react";
import { ColumnSettings, DeviceMode } from "./types";

interface ColumnSettingsContentProps {
  settings: ColumnSettings;
  onUpdate: (settings: ColumnSettings) => void;
  onDelete?: () => void;
  deleteLabel?: string;
  columnWidget?: any;
  onUpdateColumnWidget?: (updates: any) => void;
  currentDevice?: DeviceMode;
}

export function ColumnSettingsContent({ 
  settings, 
  onUpdate, 
  onDelete, 
  deleteLabel,
  columnWidget,
  onUpdateColumnWidget,
  currentDevice = 'desktop'
}: ColumnSettingsContentProps) {
  return (
    <div className="space-y-3">
      {/* Width - Device Specific */}
      <div>
        <label className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-1">
          <span>Width (%) for</span>
          {currentDevice === 'desktop' && <Monitor className="w-3 h-3" />}
          {currentDevice === 'tablet' && <Tablet className="w-3 h-3" />}
          {currentDevice === 'mobile' && <Smartphone className="w-3 h-3" />}
          <span className="capitalize">{currentDevice}</span>
        </label>
        <input
          type="number"
          value={
            currentDevice === 'mobile' ? (settings.widthMobile ?? settings.widthTablet ?? settings.widthDesktop ?? settings.width ?? 100) :
            currentDevice === 'tablet' ? (settings.widthTablet ?? settings.widthDesktop ?? settings.width ?? 100) :
            (settings.widthDesktop ?? settings.width ?? 100)
          }
          onChange={(e) => {
            const newWidth = parseInt(e.target.value);
            if (currentDevice === 'mobile') {
              onUpdate({ ...settings, widthMobile: newWidth });
            } else if (currentDevice === 'tablet') {
              onUpdate({ ...settings, widthTablet: newWidth });
            } else {
              onUpdate({ ...settings, widthDesktop: newWidth, width: newWidth });
            }
          }}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
          min="0"
          max="100"
        />
        {currentDevice !== 'desktop' && (
          <button
            onClick={() => {
              if (currentDevice === 'mobile') {
                const { widthMobile, ...rest } = settings;
                onUpdate(rest);
              } else {
                const { widthTablet, ...rest } = settings;
                onUpdate(rest);
              }
            }}
            className="text-xs text-blue-600 hover:text-blue-800 mt-1"
          >
            Reset to inherit from {currentDevice === 'mobile' ? 'tablet/desktop' : 'desktop'}
          </button>
        )}
      </div>

      {/* Column Spacing - Only show for Column widgets with nested columns */}
      {columnWidget && columnWidget.columns && columnWidget.columns.length > 1 && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Column Spacing
          </label>
          <select
            value={columnWidget.gap || "8px"}
            onChange={(e) => onUpdateColumnWidget?.({ ...columnWidget, gap: e.target.value })}
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
      )}

      {/* Padding */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Padding
        </label>
        <select
          value={settings.padding || "8px"}
          onChange={(e) => onUpdate({ ...settings, padding: e.target.value })}
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
          value={settings.margin || "0px"}
          onChange={(e) => onUpdate({ ...settings, margin: e.target.value })}
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
            {deleteLabel || "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}
