"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { DeviceMode, ResponsiveLayout } from "./types";

interface ResponsiveColumnSettingsProps {
  rowId: string;
  currentDevice: DeviceMode;
  columnCount: 1 | 2 | 3 | 4;
  responsiveLayout?: ResponsiveLayout;
  onUpdate: (responsiveLayout: ResponsiveLayout) => void;
}

export function ResponsiveColumnSettings({
  rowId,
  currentDevice,
  columnCount,
  responsiveLayout = {},
  onUpdate,
}: ResponsiveColumnSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentLayout = (): 1 | 2 | 3 | 4 => {
    if (currentDevice === 'desktop') {
      return responsiveLayout.desktop || columnCount;
    } else if (currentDevice === 'tablet') {
      return responsiveLayout.tablet || columnCount;
    } else {
      // Mobile default: stack all columns (each column becomes a row)
      return responsiveLayout.mobile || columnCount;
    }
  };

  const handleLayoutChange = (newColumnCount: 1 | 2 | 3 | 4) => {
    const updated = { ...responsiveLayout };
    if (currentDevice === 'desktop') {
      updated.desktop = newColumnCount;
    } else if (currentDevice === 'tablet') {
      updated.tablet = newColumnCount;
    } else {
      updated.mobile = newColumnCount;
    }
    onUpdate(updated);
  };

  const currentLayout = getCurrentLayout();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title={`Responsive Settings (${currentDevice})`}
      >
        <SlidersHorizontal className="w-4 h-4 text-gray-600" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-gray-900">
                {currentDevice.charAt(0).toUpperCase() + currentDevice.slice(1)} Layout
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Columns per Row
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((count) => (
                    <button
                      key={count}
                      onClick={() => handleLayoutChange(count as 1 | 2 | 3 | 4)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                        currentLayout === count
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  {currentDevice === 'mobile' && (
                    <>Default: Stack all columns (1 per row). Adjust to show multiple columns side-by-side.</>
                  )}
                  {currentDevice === 'tablet' && (
                    <>Default: Same as desktop. Adjust for tablet-specific layout.</>
                  )}
                  {currentDevice === 'desktop' && (
                    <>This is the base layout. Changes affect larger screens.</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
