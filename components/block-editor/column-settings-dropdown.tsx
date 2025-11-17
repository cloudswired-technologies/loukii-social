"use client";

import { useState, useRef, useEffect } from "react";
import { Settings, X, Trash2 } from "lucide-react";
import { ColumnSettings } from "./types";

interface ColumnSettingsDropdownProps {
  settings: ColumnSettings;
  onUpdate: (settings: ColumnSettings) => void;
  onDelete?: () => void;
  deleteLabel?: string;
  icon?: React.ReactNode;
}

export function ColumnSettingsDropdown({ settings, onUpdate, onDelete, deleteLabel, icon }: ColumnSettingsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      
      // Wait for dropdown to render to get actual height
      setTimeout(() => {
        if (dropdownRef.current) {
          const dropdownHeight = dropdownRef.current.offsetHeight;
          const spaceAbove = rect.top;
          
          // If not enough space below but enough space above, open upwards
          const shouldOpenUpwards = spaceBelow < dropdownHeight + 20 && spaceAbove > dropdownHeight;
          
          setDropdownPosition({
            top: shouldOpenUpwards ? rect.top - dropdownHeight - 4 : rect.bottom + 4,
            left: rect.left
          });
        }
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded"
        title="Settings"
      >
        {icon || <Settings className="w-4 h-4 text-gray-600" />}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[100]" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown - Fixed position to avoid clipping */}
          <div 
            ref={dropdownRef}
            className="fixed w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-[101] p-4 max-h-[500px] overflow-y-auto"
            style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-sm">Settings</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Width */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Width (%)
                </label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={settings.width || 100}
                  onChange={(e) => onUpdate({ ...settings, width: Number(e.target.value) })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                />
              </div>

              {/* Column Spacing */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Column Spacing
                </label>
                <select
                  value={(settings as any).gap || '12px'}
                  onChange={(e) => onUpdate({ ...settings, gap: e.target.value } as any)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                >
                  <option value="0px">None</option>
                  <option value="4px">Small (4px)</option>
                  <option value="8px">Medium (8px)</option>
                  <option value="12px">Default (12px)</option>
                  <option value="16px">Large (16px)</option>
                  <option value="24px">XLarge (24px)</option>
                </select>
              </div>

              {/* Padding */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Padding
                </label>
                <select
                  value={settings.padding || "12px"}
                  onChange={(e) => onUpdate({ ...settings, padding: e.target.value })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                >
                  <option value="0px">None</option>
                  <option value="4px">Small (4px)</option>
                  <option value="8px">Medium (8px)</option>
                  <option value="12px">Default (12px)</option>
                  <option value="16px">Large (16px)</option>
                  <option value="24px">XLarge (24px)</option>
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
                  <option value="0px">None</option>
                  <option value="4px">Small (4px)</option>
                  <option value="8px">Medium (8px)</option>
                  <option value="12px">Large (12px)</option>
                  <option value="16px">XLarge (16px)</option>
                </select>
              </div>

              {/* Delete Button */}
              {onDelete && (
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <button
                    onClick={() => {
                      onDelete();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    {deleteLabel || "Delete"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
