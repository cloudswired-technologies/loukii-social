"use client";

import { ColumnWidget, Widget, ColumnSettings, WidgetType, DeviceMode } from "../types";
import { Trash2, GripVertical, Settings, Columns3, SlidersHorizontal } from "lucide-react";
import { ColumnSettingsDropdown } from "../column-settings-dropdown-new";
import { getWidthForDevice } from "../responsive-utils";
import { WidgetSettingsDropdown } from "../widget-settings-dropdown";
import { HeadingWidgetRenderer } from "./heading-widget";
import { ParagraphWidgetRenderer } from "./paragraph-widget";
import { ImageWidgetRenderer } from "./image-widget";
import { YouTubeWidgetRenderer } from "./youtube-widget";
import { ButtonWidgetRenderer } from "./button-widget";
import { ListWidgetRenderer } from "./list-widget";
import { HRWidgetRenderer } from "./hr-widget";
import { TableWidgetRenderer } from "./table-widget";
import { IconWidgetRenderer } from "./icon-widget";
import { useState } from "react";

interface ColumnWidgetRendererProps {
  widget: ColumnWidget;
  onUpdate: (widget: ColumnWidget) => void;
  onDelete: () => void;
  renderWidget: (widget: Widget, columnIndex: number) => React.ReactNode;
  draggedWidgetType?: WidgetType | null;
  draggedWidget?: { widget: Widget; rowId: string; columnIndex: number } | null;
  createWidget?: (type: WidgetType) => Widget;
  onNestedWidgetDragStart?: (widget: Widget, nestedColumnIndex: number) => void;
  onNestedWidgetDragEnd?: () => void;
  onMainWidgetDroppedInNested?: (payload: { widgetId: string; targetNestedColumnIndex: number; dropPos: number }) => void;
  deviceMode?: DeviceMode;
  onOpenInspector?: (type: 'widget' | 'column' | 'row', data: any, callbacks: {
    onUpdate: (updates: any) => void;
    onDelete?: () => void;
  }, currentDevice?: DeviceMode) => void;
}

export function ColumnWidgetRenderer({ widget, onUpdate, onDelete, renderWidget, draggedWidgetType, draggedWidget, createWidget, onNestedWidgetDragStart, onNestedWidgetDragEnd, onMainWidgetDroppedInNested, deviceMode = 'desktop', onOpenInspector }: ColumnWidgetRendererProps) {
  const [dragOverColumn, setDragOverColumn] = useState<number | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{ columnIndex: number; position: number | 'empty' } | null>(null);
  const [draggedNestedColumn, setDraggedNestedColumn] = useState<number | null>(null);
  const [draggedNestedWidget, setDraggedNestedWidget] = useState<{ widget: Widget; nestedColumnIndex: number } | null>(null);
  
  // Helper: Check if widget already exists to prevent duplicates
  const widgetExistsInNestedColumn = (column: Widget[], widgetId: string): boolean => {
    return column.some(w => w.id === widgetId);
  };
  
  const updateColumnSettings = (index: number, settings: ColumnSettings) => {
    const columnSettings = widget.columnSettings || widget.columns.map(() => ({}));
    columnSettings[index] = settings;
    onUpdate({ ...widget, columnSettings });
  };

  const removeColumn = (index: number) => {
    if (widget.columns.length === 1) {
      // If only 1 column left, delete the entire Column widget
      onDelete();
    } else {
      // Remove just this nested column
      const newColumns = widget.columns.filter((_: Widget[], i: number) => i !== index);
      const newSettings = widget.columnSettings?.filter((_: ColumnSettings, i: number) => i !== index);
      
      // Don't redistribute widths - let flex-1 auto-balance
      onUpdate({
        ...widget,
        columns: newColumns,
        columnCount: newColumns.length as 1 | 2 | 3 | 4,
        columnSettings: newSettings,
      });
    }
  };
  
  const handleDragOver = (e: React.DragEvent, columnIndex: number) => {
    e.preventDefault();
    e.stopPropagation(); // Stop propagation to handle drops in nested columns
    setDragOverColumn(columnIndex);
    
    const column = widget.columns[columnIndex];
    if (!column || column.length === 0) {
      setDropIndicator({ columnIndex, position: 'empty' });
      return;
    }
    
    // Calculate drop position based on mouse Y within the column
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    
    // Find which widget position to drop at
    const widgets = Array.from(target.querySelectorAll('[data-nested-widget-id]'));
    let dropPosition = column.length; // Default to end
    
    for (let i = 0; i < widgets.length; i++) {
      const widgetEl = widgets[i] as HTMLElement;
      const widgetRect = widgetEl.getBoundingClientRect();
      const widgetMiddle = widgetRect.top + widgetRect.height / 2 - rect.top;
      
      if (mouseY < widgetMiddle) {
        dropPosition = i;
        break;
      }
    }
    
    setDropIndicator({ columnIndex, position: dropPosition });
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.stopPropagation();
    setDragOverColumn(null);
    setDropIndicator(null);
  };
  
  const handleDrop = (e: React.DragEvent, columnIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const dropPos = dropIndicator?.position === 'empty' ? 0 : (dropIndicator?.position ?? 0);
    
    // SPECIAL HANDLING: When Column widget is dropped into nested column, trigger SPLIT
    if (draggedWidgetType === 'column' || draggedWidget?.widget.type === 'column') {
      // Instead of blocking, trigger a split by adding a new nested column
      if (widget.columns.length < 4) {
        const newNestedColumns = [...widget.columns, []];
        const newCount = newNestedColumns.length;
        
        // Don't set explicit widths - let flex-1 auto-balance
        onUpdate({
          ...widget,
          columns: newNestedColumns,
          columnCount: newCount as 2 | 3 | 4,
          columnSettings: newNestedColumns.map(() => ({
            padding: '8px',
            margin: '0px'
          }))
        });
      }
      e.stopPropagation();
      setDragOverColumn(null);
      setDropIndicator(null);
      return;
    }
    
    // Handle dragging from toolbar (new widget)
    if (draggedWidgetType && createWidget) {
      const newWidget = createWidget(draggedWidgetType);
      const updatedColumns = [...widget.columns];
      updatedColumns[columnIndex] = [...updatedColumns[columnIndex]];
      
      // Duplicate guard: skip if widget already exists
      if (widgetExistsInNestedColumn(updatedColumns[columnIndex], newWidget.id)) {
        e.stopPropagation();
        setDragOverColumn(null);
        setDropIndicator(null);
        return;
      }
      
      updatedColumns[columnIndex].splice(dropPos as number, 0, newWidget);
      onUpdate({ ...widget, columns: updatedColumns });
      e.stopPropagation();
      setDragOverColumn(null);
      setDropIndicator(null);
      return;
    }
    
    // Handle dragging existing widget from parent row (main → nested)
    // Don't mutate here - let parent handle atomically
    if (draggedWidget) {
      // Notify parent with full drop info so it can do atomic remove+insert
      if (onMainWidgetDroppedInNested) {
        onMainWidgetDroppedInNested({
          widgetId: draggedWidget.widget.id,
          targetNestedColumnIndex: columnIndex,
          dropPos: dropPos as number
        });
      }
      
      e.stopPropagation();
      setDragOverColumn(null);
      setDropIndicator(null);
      return;
    }
    
    // Handle nested widget reordering within nested columns
    if (draggedNestedWidget) {
      const sourceColumnIndex = draggedNestedWidget.nestedColumnIndex;
      const targetColumnIndex = columnIndex;
      
      // Remove from source
      const updatedColumns = [...widget.columns];
      updatedColumns[sourceColumnIndex] = updatedColumns[sourceColumnIndex].filter(
        w => w.id !== draggedNestedWidget.widget.id
      );
      
      // Add to target
      updatedColumns[targetColumnIndex] = [...updatedColumns[targetColumnIndex]];
      
      // Duplicate guard: skip if widget already exists
      if (widgetExistsInNestedColumn(updatedColumns[targetColumnIndex], draggedNestedWidget.widget.id)) {
        setDraggedNestedWidget(null);
        setDragOverColumn(null);
        setDropIndicator(null);
        if (onNestedWidgetDragEnd) {
          onNestedWidgetDragEnd();
        }
        e.stopPropagation();
        return;
      }
      
      updatedColumns[targetColumnIndex].splice(dropPos as number, 0, draggedNestedWidget.widget);
      
      onUpdate({ ...widget, columns: updatedColumns });
      setDraggedNestedWidget(null);
      setDragOverColumn(null);
      setDropIndicator(null);
      
      // Clear parent's drag state since we handled it
      if (onNestedWidgetDragEnd) {
        onNestedWidgetDragEnd();
      }
      
      e.stopPropagation(); // Stop propagation since we handled it
      return;
    }
    
    setDragOverColumn(null);
    setDropIndicator(null);
  };
  
  const handleNestedColumnDragStart = (e: React.DragEvent, columnIndex: number) => {
    e.stopPropagation();
    setDraggedNestedColumn(columnIndex);
  };
  
  const handleNestedColumnDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setDraggedNestedColumn(null);
  };
  
  const handleNestedColumnDragOver = (e: React.DragEvent, targetColumnIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedNestedColumn === null || draggedNestedColumn === targetColumnIndex) return;
    
    // Reorder columns
    const newColumns = [...widget.columns];
    const newSettings = widget.columnSettings ? [...widget.columnSettings] : [];
    
    const [movedColumn] = newColumns.splice(draggedNestedColumn, 1);
    const [movedSetting] = newSettings.splice(draggedNestedColumn, 1);
    
    newColumns.splice(targetColumnIndex, 0, movedColumn);
    newSettings.splice(targetColumnIndex, 0, movedSetting);
    
    onUpdate({
      ...widget,
      columns: newColumns,
      columnCount: newColumns.length as 1 | 2 | 3 | 4,
      columnSettings: newSettings.length > 0 ? newSettings : undefined
    });
    
    setDraggedNestedColumn(targetColumnIndex);
  };
  
  const updateNestedWidget = (columnIndex: number, widgetId: string, updates: Partial<Widget> | Widget) => {
    const updatedColumns = widget.columns.map((column, idx) => {
      if (idx === columnIndex) {
        return column.map((w) => w.id === widgetId ? { ...w, ...updates } as Widget : w);
      }
      return column;
    });
    onUpdate({ ...widget, columns: updatedColumns });
  };

  const deleteNestedWidget = (columnIndex: number, widgetId: string) => {
    const updatedColumns = widget.columns.map((column, idx) => {
      if (idx === columnIndex) {
        return column.filter((w) => w.id !== widgetId);
      }
      return column;
    });
    onUpdate({ ...widget, columns: updatedColumns });
  };
  
  const renderNestedWidget = (w: Widget, columnIndex: number) => {
    const widgetElement = (() => {
      switch (w.type) {
        case 'heading':
          return (
            <HeadingWidgetRenderer
              widget={w}
              onUpdate={(updated) => updateNestedWidget(columnIndex, w.id, updated)}
              onDelete={() => deleteNestedWidget(columnIndex, w.id)}
            />
          );
        case 'paragraph':
          return (
            <ParagraphWidgetRenderer
              widget={w}
              onUpdate={(updated) => updateNestedWidget(columnIndex, w.id, updated)}
              onDelete={() => deleteNestedWidget(columnIndex, w.id)}
            />
          );
        case 'image':
          return (
            <ImageWidgetRenderer
              widget={w}
              onUpdate={(updated) => updateNestedWidget(columnIndex, w.id, updated)}
              onDelete={() => deleteNestedWidget(columnIndex, w.id)}
            />
          );
        case 'youtube':
          return (
            <YouTubeWidgetRenderer
              widget={w}
              onUpdate={(updated) => updateNestedWidget(columnIndex, w.id, updated)}
              onDelete={() => deleteNestedWidget(columnIndex, w.id)}
            />
          );
        case 'button':
          return (
            <ButtonWidgetRenderer
              widget={w}
              onUpdate={(updated) => updateNestedWidget(columnIndex, w.id, updated)}
              onDelete={() => deleteNestedWidget(columnIndex, w.id)}
            />
          );
        case 'list':
          return (
            <ListWidgetRenderer
              widget={w}
              onUpdate={(updated) => updateNestedWidget(columnIndex, w.id, updated)}
              onDelete={() => deleteNestedWidget(columnIndex, w.id)}
            />
          );
        case 'horizontal-line':
          return (
            <HRWidgetRenderer
              widget={w}
              onUpdate={(updated) => updateNestedWidget(columnIndex, w.id, updated)}
              onDelete={() => deleteNestedWidget(columnIndex, w.id)}
            />
          );
        case 'table':
          return (
            <TableWidgetRenderer
              widget={w}
              onUpdate={(updated) => updateNestedWidget(columnIndex, w.id, updated)}
              onDelete={() => deleteNestedWidget(columnIndex, w.id)}
            />
          );
        case 'icon':
          return (
            <IconWidgetRenderer
              widget={w}
              onUpdate={(updated) => updateNestedWidget(columnIndex, w.id, updated)}
              onDelete={() => deleteNestedWidget(columnIndex, w.id)}
            />
          );
        default:
          return (
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Widget type: {w.type} (Not supported in nested columns)</p>
            </div>
          );
      }
    })();

    const widgetPadding = (w as any).padding || '0px';
    const widgetMargin = (w as any).margin || '0px';

    return (
      <div
        className="relative group/widget cursor-move"
        style={{ padding: widgetPadding, margin: widgetMargin }}
      >
        {/* Widget Controls - RIGHT (Elementor style) */}
        <div className="absolute -top-2 -right-2 z-10 opacity-0 group-hover/widget:opacity-100 transition-opacity">
          <div className="bg-white rounded-full shadow-md">
            <WidgetSettingsDropdown
              widget={w}
              onUpdate={(updates) => updateNestedWidget(columnIndex, w.id, updates)}
              onDelete={() => deleteNestedWidget(columnIndex, w.id)}
              icon={<SlidersHorizontal className="w-4 h-4 text-gray-600" />}
            />
          </div>
        </div>
        {widgetElement}
      </div>
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg hover:border-green-500 transition-colors bg-white">
      {/* Nested Columns */}
      <div className="flex flex-wrap" style={{ gap: widget.gap || '8px' }}>
        {widget.columns.map((column, columnIndex) => {
          const colSettings = widget.columnSettings?.[columnIndex] || {};
          const colStyle = {
            padding: colSettings.padding || '8px',
            margin: colSettings.margin || '0px',
          };
          
          // Get responsive width based on current device
          const defaultWidth = 100 / widget.columns.length;
          const columnWidth = getWidthForDevice(colSettings, deviceMode, defaultWidth);
          const gap = widget.gap || '8px';
          
          // Calculate flex-basis accounting for gap
          const gapAdjustment = widget.columns.length > 1 ? `(${gap} * ${widget.columns.length - 1} / ${widget.columns.length})` : '0px';
          const flexBasis = `calc(${columnWidth}% - ${gapAdjustment})`;
          
          return (
            <div 
              key={columnIndex} 
              draggable
              onDragStart={(e) => handleNestedColumnDragStart(e, columnIndex)}
              onDragEnd={handleNestedColumnDragEnd}
              onDragOver={(e) => handleNestedColumnDragOver(e, columnIndex)}
              className={`relative group/nested cursor-move ${draggedNestedColumn === columnIndex ? 'opacity-50' : ''}`}
              style={{ 
                flex: `0 0 ${flexBasis}`,
                maxWidth: flexBasis
              }}
            >
            {/* Column Settings - LEFT (Elementor style) */}
            <div className="absolute -top-2 -left-2 z-10 opacity-0 group-hover/nested:opacity-100 transition-opacity">
              <div className="bg-white rounded-full shadow-md">
                {onOpenInspector ? (
                  <button
                    onClick={() => {
                      onOpenInspector('column', colSettings, {
                        onUpdate: (settings) => updateColumnSettings(columnIndex, settings),
                        onDelete: () => removeColumn(columnIndex)
                      }, deviceMode);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    title="Column Settings"
                  >
                    <Columns3 className="w-4 h-4 text-gray-600" />
                  </button>
                ) : (
                  <ColumnSettingsDropdown
                    settings={colSettings}
                    onUpdate={(settings) => updateColumnSettings(columnIndex, settings)}
                    onDelete={() => removeColumn(columnIndex)}
                    deleteLabel={widget.columns.length === 1 ? "Delete Column Widget" : "Delete Column"}
                    icon={<Columns3 className="w-4 h-4 text-gray-600" />}
                    columnWidget={widget}
                    onUpdateColumnWidget={onUpdate}
                    useFixed={true}
                    currentDevice={deviceMode}
                  />
                )}
              </div>
            </div>

            <div 
              className="min-h-[100px] border border-dashed border-gray-300 rounded-lg transition-colors"
              onDragOver={(e) => handleDragOver(e, columnIndex)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, columnIndex)}
              style={{
                borderColor: dragOverColumn === columnIndex ? '#3b82f6' : '#d1d5db',
                backgroundColor: dragOverColumn === columnIndex ? '#eff6ff' : 'transparent',
                padding: colStyle.padding,
                margin: colStyle.margin
              }}
            >
              {column.length === 0 ? (
                <div className="flex items-center justify-center h-full min-h-[100px]">
                  <div className="text-4xl text-gray-300">+</div>
                </div>
              ) : (
                <div className="space-y-2">
                  {column.map((w, widgetIndex) => (
                    <div key={w.id}>
                      {/* Drop Indicator - Before this widget */}
                      {dropIndicator?.columnIndex === columnIndex && 
                       dropIndicator?.position === widgetIndex && (
                        <div className="h-1 bg-blue-500 rounded-full mb-2 shadow-lg" />
                      )}
                      
                      <div 
                        data-nested-widget-id={w.id}
                        draggable
                        onDragStart={(e) => {
                          e.stopPropagation();
                          e.dataTransfer.effectAllowed = 'move';
                          setDraggedNestedWidget({ widget: w, nestedColumnIndex: columnIndex });
                          if (onNestedWidgetDragStart) {
                            onNestedWidgetDragStart(w, columnIndex);
                          }
                        }}
                        onDragEnd={(e) => {
                          e.stopPropagation();
                          setDraggedNestedWidget(null);
                          if (onNestedWidgetDragEnd) {
                            onNestedWidgetDragEnd();
                          }
                        }}
                        className={draggedNestedWidget?.widget.id === w.id ? 'opacity-50' : ''}
                      >
                        {renderNestedWidget(w, columnIndex)}
                      </div>
                      
                      {/* Drop Indicator - After last widget */}
                      {dropIndicator?.columnIndex === columnIndex && 
                       dropIndicator?.position === column.length &&
                       widgetIndex === column.length - 1 && (
                        <div className="h-1 bg-blue-500 rounded-full mt-2 shadow-lg" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
