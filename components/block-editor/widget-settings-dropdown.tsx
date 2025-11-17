"use client";

import { useState, useRef, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { Widget } from "./types";

interface WidgetSettingsDropdownProps {
  widget: Widget;
  onUpdate: (widget: Partial<Widget>) => void;
  onDelete: () => void;
  icon: React.ReactNode;
}

export function WidgetSettingsDropdown({ widget, onUpdate, onDelete, icon }: WidgetSettingsDropdownProps) {
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
            left: rect.left - 256 + 32 // Align to right
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

  // Check if widget has alignment property
  const hasAlignment = 'alignment' in widget;
  const hasWidth = 'width' in widget;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded"
        title="Widget Settings"
      >
        {icon}
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
            className="fixed w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-[101] p-4 max-h-[400px] overflow-y-auto"
            style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-sm">Widget Settings</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Alignment */}
              {hasAlignment && (
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

              {/* Width */}
              {hasWidth && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Width
                  </label>
                  <input
                    type="text"
                    value={(widget as any).width || '100%'}
                    onChange={(e) => onUpdate({ width: e.target.value })}
                    placeholder="e.g., 100%, 500px"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              )}

              {/* Padding */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Padding
                </label>
                <select
                  value={(widget as any).padding || '12px'}
                  onChange={(e) => onUpdate({ padding: e.target.value })}
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
                  value={(widget as any).margin || '0px'}
                  onChange={(e) => onUpdate({ margin: e.target.value })}
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
              <div className="pt-3 mt-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    onDelete();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Widget
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
