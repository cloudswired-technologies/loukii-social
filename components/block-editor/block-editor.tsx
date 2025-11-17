"use client";

import { useState, useEffect } from "react";
import { Trash2, GripVertical, Columns3, SlidersHorizontal } from "lucide-react";
import { Row, Widget, WidgetType, BlockEditorData } from "./types";
import { WidgetToolbar } from "./widget-toolbar";
import { ColumnSelector } from "./column-selector";
import { HeadingWidgetRenderer } from "./widgets/heading-widget";
import { ParagraphWidgetRenderer } from "./widgets/paragraph-widget";
import { ImageWidgetRenderer } from "./widgets/image-widget";
import { YouTubeWidgetRenderer } from "./widgets/youtube-widget";
import { ButtonWidgetRenderer } from "./widgets/button-widget";
import { ListWidgetRenderer } from "./widgets/list-widget";
import { HRWidgetRenderer } from "./widgets/hr-widget";
import { ColumnWidgetRenderer } from "./widgets/column-widget";
import { ColumnSettingsDropdown } from "./column-settings-dropdown";
import { WidgetSettingsDropdown } from "./widget-settings-dropdown";
import type { ColumnSettings } from "./types";

interface BlockEditorProps {
  data: BlockEditorData;
  onChange: (data: BlockEditorData) => void;
}

export function BlockEditor({ data, onChange }: BlockEditorProps) {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState<number | null>(null);
  const [draggedWidget, setDraggedWidget] = useState<{ widget: Widget; rowId: string; columnIndex: number } | null>(null);
  const [draggedWidgetType, setDraggedWidgetType] = useState<WidgetType | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<{ rowId: string; columnIndex: number } | null>(null);
  const [dragOverTarget, setDragOverTarget] = useState<{ rowId: string; columnIndex: number } | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{ rowId: string; columnIndex: number; position: number | 'empty' } | null>(null);
  const [draggedNestedWidget, setDraggedNestedWidget] = useState<{ widget: Widget; columnWidgetId: string; nestedColumnIndex: number } | null>(null);

  // Helper: Check if widget already exists in target to prevent duplicates
  const widgetExistsInColumn = (column: Widget[], widgetId: string): boolean => {
    return column.some(w => w.id === widgetId);
  };

  // Helper: Type-safe ColumnWidget manipulation
  const isColumnWidget = (widget: Widget): widget is import('./types').ColumnWidget => {
    return widget.type === 'column';
  };

  // Global cleanup: clear stale drag indicators if drag ends outside canvas
  useEffect(() => {
    const handleGlobalDragEnd = () => {
      setDraggedWidget(null);
      setDraggedWidgetType(null);
      setDraggedNestedWidget(null);
      setDragOverTarget(null);
      setDropIndicator(null);
      setDraggedColumn(null);
    };

    window.addEventListener('dragend', handleGlobalDragEnd);
    return () => window.removeEventListener('dragend', handleGlobalDragEnd);
  }, []);

  const addRow = (columnCount: 1 | 2 | 3 | 4) => {
    const newRow: Row = {
      id: `row-${Date.now()}`,
      columnCount,
      columns: Array(columnCount).fill([]).map(() => []),
    };
    onChange({ ...data, rows: [...data.rows, newRow] });
  };

  const addWidget = (type: WidgetType) => {
    if (selectedRowId === null || selectedColumnIndex === null) {
      alert("Please select a column first by clicking on it");
      return;
    }

    const newWidget = createWidget(type);
    const updatedRows = data.rows.map((row) => {
      if (row.id === selectedRowId) {
        const updatedColumns = [...row.columns];
        updatedColumns[selectedColumnIndex] = [...updatedColumns[selectedColumnIndex], newWidget];
        return { ...row, columns: updatedColumns };
      }
      return row;
    });

    onChange({ ...data, rows: updatedRows });
  };

  const createWidget = (type: WidgetType): Widget => {
    const baseWidget = { id: `widget-${Date.now()}`, type };
    
    switch (type) {
      case 'heading':
        return { ...baseWidget, type: 'heading', level: 2, text: '', alignment: 'left' };
      case 'paragraph':
        return { ...baseWidget, type: 'paragraph', text: '', alignment: 'left' };
      case 'image':
        return { ...baseWidget, type: 'image', url: '', alt: '', width: '100%', alignment: 'center' };
      case 'youtube':
        return { ...baseWidget, type: 'youtube', videoId: '', width: '100%', height: '400px' };
      case 'column':
        return { 
          ...baseWidget, 
          type: 'column', 
          columns: [[]], // Start with 1 nested column
          columnCount: 1,
          gap: '12px',
          columnSettings: [
            { width: 100, padding: '12px', margin: '0px', gap: '12px' }
          ]
        };
      case 'table':
        return { ...baseWidget, type: 'table', headers: ['Column 1', 'Column 2'], rows: [['', '']] };
      case 'horizontal-line':
        return { ...baseWidget, type: 'horizontal-line', style: 'solid', color: '#e5e7eb' };
      case 'button':
        return { ...baseWidget, type: 'button', text: 'Click me', url: '#', variant: 'primary', size: 'md', alignment: 'left' };
      case 'icon':
        return { ...baseWidget, type: 'icon', iconName: 'star', size: 24, color: '#000000', alignment: 'left' };
      case 'list':
        return { ...baseWidget, type: 'list', items: ['Item 1', 'Item 2'], ordered: false };
      default:
        return { ...baseWidget, type: 'paragraph', text: '', alignment: 'left' };
    }
  };

  const updateWidget = (rowId: string, columnIndex: number, widgetId: string, updates: Partial<Widget> | Widget) => {
    const updatedRows = data.rows.map((row) => {
      if (row.id === rowId) {
        const updatedColumns = row.columns.map((column, idx) => {
          if (idx === columnIndex) {
            return column.map((w) => w.id === widgetId ? { ...w, ...updates } as Widget : w);
          }
          return column;
        });
        return { ...row, columns: updatedColumns };
      }
      return row;
    });
    onChange({ ...data, rows: updatedRows });
  };

  const deleteWidget = (rowId: string, columnIndex: number, widgetId: string) => {
    const updatedRows = data.rows.map((row) => {
      if (row.id === rowId) {
        const updatedColumns = row.columns.map((column, idx) => {
          if (idx === columnIndex) {
            return column.filter((w) => w.id !== widgetId);
          }
          return column;
        });
        return { ...row, columns: updatedColumns };
      }
      return row;
    });
    onChange({ ...data, rows: updatedRows });
  };

  const deleteRow = (rowId: string) => {
    onChange({ ...data, rows: data.rows.filter((row) => row.id !== rowId) });
  };

  const deleteColumn = (rowId: string, columnIndex: number) => {
    const updatedRows = data.rows.map((row) => {
      if (row.id === rowId) {
        // If only 1 column left, delete entire row
        if (row.columns.length === 1) {
          return null;
        }
        
        // Remove the column and its settings
        const updatedColumns = row.columns.filter((_, idx) => idx !== columnIndex);
        const updatedSettings = row.columnSettings?.filter((_, idx) => idx !== columnIndex);
        return {
          ...row,
          columns: updatedColumns,
          columnCount: updatedColumns.length as 1 | 2 | 3 | 4,
          columnSettings: updatedSettings,
        };
      }
      return row;
    }).filter(Boolean) as Row[];

    onChange({ ...data, rows: updatedRows });
  };

  const updateColumnSettings = (rowId: string, columnIndex: number, settings: ColumnSettings) => {
    const updatedRows = data.rows.map((row) => {
      if (row.id === rowId) {
        const columnSettings = row.columnSettings || row.columns.map(() => ({}));
        columnSettings[columnIndex] = settings;
        return { ...row, columnSettings };
      }
      return row;
    });
    onChange({ ...data, rows: updatedRows });
  };

  // Drag and Drop Handlers
  const handleDragStart = (widget: Widget, rowId: string, columnIndex: number) => {
    // Exclusive: clear other drag states
    setDraggedWidgetType(null);
    setDraggedNestedWidget(null);
    setDraggedWidget({ widget, rowId, columnIndex });
  };
  
  const handleNestedWidgetDragStart = (columnWidgetId: string, widget: Widget, nestedColumnIndex: number) => {
    // Exclusive: clear other drag states and UI indicators
    setDraggedWidgetType(null);
    setDraggedWidget(null);
    setDragOverTarget(null);
    setDropIndicator(null);
    setDraggedNestedWidget({ widget, columnWidgetId, nestedColumnIndex });
  };
  
  const handleNestedWidgetDragEnd = () => {
    setDraggedNestedWidget(null);
    setDragOverTarget(null);
    setDropIndicator(null);
  };
  
  const handleMainWidgetDroppedInNested = (payload: { widgetId: string; targetNestedColumnIndex: number; dropPos: number }, columnWidgetId: string, targetRowId: string, targetColumnIndex: number) => {
    // Atomic: Remove from main source AND insert into nested target in single update
    if (!draggedWidget) return;
    
    const { widget, rowId: sourceRowId, columnIndex: sourceColumnIndex } = draggedWidget;
    const { targetNestedColumnIndex, dropPos } = payload;
    
    const isSameColumn = sourceRowId === targetRowId && sourceColumnIndex === targetColumnIndex;
    
    const finalRows = data.rows.map((row) => {
      return {
        ...row,
        columns: row.columns.map((column, idx) => {
          const isSourceColumn = row.id === sourceRowId && idx === sourceColumnIndex;
          const isTargetColumn = row.id === targetRowId && idx === targetColumnIndex;
          
          // If same column: remove from main AND insert into nested in one pass
          if (isSourceColumn && isTargetColumn) {
            // First remove from main
            const columnWithoutWidget = column.filter((w) => w.id !== widget.id);
            
            // Then insert into nested
            const result = columnWithoutWidget.map((w) => {
              if (w.id === columnWidgetId && isColumnWidget(w)) {
                const columnWidget = w;
                const updatedNestedColumns = [...columnWidget.columns];
                const targetNestedCol = [...updatedNestedColumns[targetNestedColumnIndex]];
                
                // Duplicate guard
                if (targetNestedCol.some(nw => nw.id === widget.id)) {
                  return w;
                }
                
                targetNestedCol.splice(dropPos, 0, widget);
                updatedNestedColumns[targetNestedColumnIndex] = targetNestedCol;
                return { ...columnWidget, columns: updatedNestedColumns };
              }
              return w;
            });
            return result;
          }
          
          // Remove from main source column only
          if (isSourceColumn) {
            return column.filter((w) => w.id !== widget.id);
          }
          
          // Insert into nested target column only
          if (isTargetColumn) {
            return column.map((w) => {
              if (w.id === columnWidgetId && isColumnWidget(w)) {
                const columnWidget = w;
                const updatedNestedColumns = [...columnWidget.columns];
                const targetNestedCol = [...updatedNestedColumns[targetNestedColumnIndex]];
                
                // Duplicate guard
                if (targetNestedCol.some(nw => nw.id === widget.id)) {
                  return w;
                }
                
                targetNestedCol.splice(dropPos, 0, widget);
                updatedNestedColumns[targetNestedColumnIndex] = targetNestedCol;
                return { ...columnWidget, columns: updatedNestedColumns };
              }
              return w;
            });
          }
          
          return column;
        })
      };
    });
    
    // Safety net: ensure the widget exists in target nested column (self-heal if missing)
    const ensuredRows = finalRows.map((row) => {
      if (row.id !== targetRowId) return row;
      return {
        ...row,
        columns: row.columns.map((column, idx) => {
          if (idx !== targetColumnIndex) return column;
          return column.map((w) => {
            if (w.id === columnWidgetId && isColumnWidget(w)) {
              const columnWidget = w;
              const updatedNestedColumns = [...columnWidget.columns];
              const targetNestedCol = [...updatedNestedColumns[targetNestedColumnIndex]];
              const alreadyInNested = targetNestedCol.some((nw: Widget) => nw.id === widget.id);
              if (!alreadyInNested) {
                targetNestedCol.splice(dropPos, 0, widget);
                updatedNestedColumns[targetNestedColumnIndex] = targetNestedCol;
                return { ...columnWidget, columns: updatedNestedColumns };
              }
              return w;
            }
            return w;
          });
        })
      };
    });

    onChange({ ...data, rows: ensuredRows });
    setDraggedWidget(null);
    setDragOverTarget(null);
    setDropIndicator(null);
  };

  const handleDragOver = (e: React.DragEvent, rowId: string, columnIndex: number) => {
    e.preventDefault();
    setDragOverTarget({ rowId, columnIndex });
    
    // Find the column
    const row = data.rows.find(r => r.id === rowId);
    const column = row?.columns[columnIndex];
    
    if (!column || column.length === 0) {
      setDropIndicator({ rowId, columnIndex, position: 'empty' });
      return;
    }
    
    // Calculate drop position based on mouse Y within the column
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    
    // Find which widget position to drop at
    const widgets = Array.from(target.querySelectorAll('[data-widget-id]'));
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
    
    setDropIndicator({ rowId, columnIndex, position: dropPosition });
  };

  const handleDragLeave = () => {
    setDragOverTarget(null);
    setDropIndicator(null);
  };

  const handleDrop = (e: React.DragEvent, targetRowId: string, targetColumnIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const dropPos = dropIndicator?.position === 'empty' ? 0 : (dropIndicator?.position ?? 0);
    
    // If dragging from toolbar (new widget)
    if (draggedWidgetType) {
      // Special handling for Column widget - always create new in main column
      // Split logic is handled by column-widget.tsx when dropping inside nested columns
      if (draggedWidgetType === 'column') {
        const newWidget = createWidget(draggedWidgetType);
        const updatedRows = data.rows.map((row) => {
          if (row.id === targetRowId) {
            const updatedColumns = row.columns.map((column, idx) => {
              if (idx === targetColumnIndex) {
                const newColumn = [...column];
                newColumn.splice(dropPos as number, 0, newWidget);
                return newColumn;
              }
              return column;
            });
            return { ...row, columns: updatedColumns };
          }
          return row;
        });
        onChange({ ...data, rows: updatedRows });
        setDraggedWidgetType(null);
        setDragOverTarget(null);
        setDropIndicator(null);
        return;
      }
      
      // Normal widget handling
      const newWidget = createWidget(draggedWidgetType);
      const updatedRows = data.rows.map((row) => {
        if (row.id === targetRowId) {
          const updatedColumns = row.columns.map((column, idx) => {
            if (idx === targetColumnIndex) {
              // Duplicate guard: skip if widget already exists
              if (widgetExistsInColumn(column, newWidget.id)) {
                return column;
              }
              const newColumn = [...column];
              newColumn.splice(dropPos as number, 0, newWidget);
              return newColumn;
            }
            return column;
          });
          return { ...row, columns: updatedColumns };
        }
        return row;
      });
      onChange({ ...data, rows: updatedRows });
      setDraggedWidgetType(null);
      setDragOverTarget(null);
      setDropIndicator(null);
      return;
    }

    // Handle dragging nested widget to main column
    if (draggedNestedWidget) {
      const { widget, columnWidgetId, nestedColumnIndex } = draggedNestedWidget;
      
      // Do both remove from nested AND add to main in single update
      const finalRows = data.rows.map((row) => {
        return {
          ...row,
          columns: row.columns.map((column, idx) => {
            // First, remove from nested column in all Column widgets
            const columnWithRemovedWidget = column.map((w) => {
              if (w.id === columnWidgetId && isColumnWidget(w)) {
                const columnWidget = w;
                const updatedNestedColumns = [...columnWidget.columns];
                updatedNestedColumns[nestedColumnIndex] = updatedNestedColumns[nestedColumnIndex].filter(
                  (nestedW: Widget) => nestedW.id !== widget.id
                );
                return { ...columnWidget, columns: updatedNestedColumns };
              }
              return w;
            });
            
            // Then, if this is the target column, add widget to main column
            if (row.id === targetRowId && idx === targetColumnIndex) {
              // Duplicate guard: skip if widget already exists in main column
              if (widgetExistsInColumn(columnWithRemovedWidget, widget.id)) {
                return columnWithRemovedWidget;
              }
              const newColumn = [...columnWithRemovedWidget];
              newColumn.splice(dropPos as number, 0, widget);
              return newColumn;
            }
            
            return columnWithRemovedWidget;
          })
        };
      });
      
      onChange({ ...data, rows: finalRows });
      setDraggedNestedWidget(null);
      setDragOverTarget(null);
      setDropIndicator(null);
      return;
    }
    
    // If dragging existing widget between columns
    if (!draggedWidget) return;

    const { widget, rowId: sourceRowId, columnIndex: sourceColumnIndex } = draggedWidget;

    // Remove from source
    const updatedRows = data.rows.map((row) => {
      if (row.id === sourceRowId) {
        const updatedColumns = row.columns.map((column, idx) => {
          if (idx === sourceColumnIndex) {
            return column.filter((w) => w.id !== widget.id);
          }
          return column;
        });
        return { ...row, columns: updatedColumns };
      }
      return row;
    });

    // Add to target at specific position
    const finalRows = updatedRows.map((row) => {
      if (row.id === targetRowId) {
        const updatedColumns = row.columns.map((column, idx) => {
          if (idx === targetColumnIndex) {
            // Duplicate guard: skip if widget already exists
            if (widgetExistsInColumn(column, widget.id)) {
              return column;
            }
            const newColumn = [...column];
            newColumn.splice(dropPos as number, 0, widget);
            return newColumn;
          }
          return column;
        });
        return { ...row, columns: updatedColumns };
      }
      return row;
    });

    onChange({ ...data, rows: finalRows });
    setDraggedWidget(null);
    setDragOverTarget(null);
    setDropIndicator(null);
  };

  const handleDragEnd = () => {
    setDraggedWidget(null);
    setDraggedWidgetType(null);
    setDraggedNestedWidget(null);
    setDragOverTarget(null);
    setDropIndicator(null);
  };

  const handleToolbarDragStart = (type: WidgetType) => {
    // Exclusive: clear other drag states
    setDraggedWidget(null);
    setDraggedNestedWidget(null);
    setDraggedWidgetType(type);
  };

  const renderWidget = (widget: Widget, rowId: string, columnIndex: number) => {
    const widgetElement = (() => {
      switch (widget.type) {
        case 'heading':
          return (
            <HeadingWidgetRenderer
              widget={widget}
              onUpdate={(w) => updateWidget(rowId, columnIndex, widget.id, w)}
              onDelete={() => deleteWidget(rowId, columnIndex, widget.id)}
            />
          );
        case 'paragraph':
          return (
            <ParagraphWidgetRenderer
              widget={widget}
              onUpdate={(w) => updateWidget(rowId, columnIndex, widget.id, w)}
              onDelete={() => deleteWidget(rowId, columnIndex, widget.id)}
            />
          );
        case 'image':
          return (
            <ImageWidgetRenderer
              widget={widget}
              onUpdate={(w) => updateWidget(rowId, columnIndex, widget.id, w)}
              onDelete={() => deleteWidget(rowId, columnIndex, widget.id)}
            />
          );
        case 'youtube':
          return (
            <YouTubeWidgetRenderer
              widget={widget}
              onUpdate={(w) => updateWidget(rowId, columnIndex, widget.id, w)}
              onDelete={() => deleteWidget(rowId, columnIndex, widget.id)}
            />
          );
        case 'button':
          return (
            <ButtonWidgetRenderer
              widget={widget}
              onUpdate={(w) => updateWidget(rowId, columnIndex, widget.id, w)}
              onDelete={() => deleteWidget(rowId, columnIndex, widget.id)}
            />
          );
        case 'list':
          return (
            <ListWidgetRenderer
              widget={widget}
              onUpdate={(w) => updateWidget(rowId, columnIndex, widget.id, w)}
              onDelete={() => deleteWidget(rowId, columnIndex, widget.id)}
            />
          );
        case 'horizontal-line':
          return (
            <HRWidgetRenderer
              widget={widget}
              onUpdate={(w) => updateWidget(rowId, columnIndex, widget.id, w)}
              onDelete={() => deleteWidget(rowId, columnIndex, widget.id)}
            />
          );
        case 'column':
          return (
            <ColumnWidgetRenderer
              widget={widget}
              onUpdate={(w) => updateWidget(rowId, columnIndex, widget.id, w)}
              onDelete={() => deleteWidget(rowId, columnIndex, widget.id)}
              renderWidget={(w, colIdx) => renderWidget(w, rowId, columnIndex)}
              draggedWidgetType={draggedWidgetType}
              draggedWidget={draggedWidget}
              createWidget={createWidget}
              onNestedWidgetDragStart={(w, nestedColIdx) => handleNestedWidgetDragStart(widget.id, w, nestedColIdx)}
              onNestedWidgetDragEnd={handleNestedWidgetDragEnd}
              onMainWidgetDroppedInNested={(payload) => handleMainWidgetDroppedInNested(payload, widget.id, rowId, columnIndex)}
            />
          );
        case 'table':
        case 'icon':
          return (
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Widget type: {widget.type} (Coming soon)</p>
            </div>
          );
        default:
          return (
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Unknown widget type</p>
            </div>
          );
      }
    })();

    const widgetPadding = (widget as any).padding || '0px';
    const widgetMargin = (widget as any).margin || '0px';

    // Column widget is special - no widget settings, no drag, just the nested columns
    if (widget.type === 'column') {
      return (
        <div key={widget.id} data-widget-id={widget.id}>
          {widgetElement}
        </div>
      );
    }

    return (
      <div
        key={widget.id}
        data-widget-id={widget.id}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.effectAllowed = 'move';
          handleDragStart(widget, rowId, columnIndex);
        }}
        onDragEnd={handleDragEnd}
        className={`relative group/widget cursor-move ${draggedWidget?.widget.id === widget.id ? 'opacity-50' : ''}`}
        style={{ padding: widgetPadding, margin: widgetMargin }}
      >
        {/* Widget Controls - RIGHT (Elementor style) */}
        <div className="absolute -top-2 -right-2 z-10 opacity-0 group-hover/widget:opacity-100 transition-opacity">
          <div className="bg-white rounded-full shadow-md">
            <WidgetSettingsDropdown
              widget={widget}
              onUpdate={(updates) => updateWidget(rowId, columnIndex, widget.id, updates)}
              onDelete={() => deleteWidget(rowId, columnIndex, widget.id)}
              icon={<SlidersHorizontal className="w-4 h-4 text-gray-600" />}
            />
          </div>
        </div>
        {widgetElement}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Widget Toolbar */}
      <WidgetToolbar onAddWidget={addWidget} onDragStart={handleToolbarDragStart} />

      {/* Editor Canvas - Auto expand based on content */}
      <div className="p-4 bg-gray-50 block-editor-canvas min-h-[400px]">
        {data.rows.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium mb-2">No rows yet</p>
            <p className="text-sm">Add a row using the buttons below to get started</p>
          </div>
        ) : (
          <div className="space-y-4 max-w-6xl mx-auto">
            {data.rows.map((row) => (
              <div key={row.id} className="bg-white border border-gray-200 rounded-lg p-4 relative">
                {/* Columns */}
                <div 
                  className={`grid grid-cols-${row.columnCount}`}
                  style={{ gap: row.columnSettings?.[0]?.gap || '12px' }}
                >
                  {row.columns.map((column, columnIndex) => {
                    const colSettings = row.columnSettings?.[columnIndex] || {};
                    const colStyle = {
                      width: colSettings.width ? `${colSettings.width}%` : undefined,
                      padding: colSettings.padding || '12px',
                      margin: colSettings.margin || '0px',
                    };
                    
                    return (
                    <div
                      key={columnIndex}
                      draggable
                      onDragStart={() => setDraggedColumn({ rowId: row.id, columnIndex })}
                      onDragEnd={() => setDraggedColumn(null)}
                      className={`relative group/column transition-opacity ${
                        draggedColumn?.rowId === row.id && draggedColumn?.columnIndex === columnIndex ? 'opacity-50' : ''
                      }`}
                      style={{ width: colStyle.width }}
                    >
                      {/* Column Settings - LEFT (Elementor style) */}
                      <div className="absolute -top-2 -left-2 z-10 opacity-0 group-hover/column:opacity-100 transition-opacity">
                        <div className="bg-white rounded-full shadow-md">
                          <ColumnSettingsDropdown
                            settings={colSettings}
                            onUpdate={(settings) => updateColumnSettings(row.id, columnIndex, settings)}
                            onDelete={() => deleteColumn(row.id, columnIndex)}
                            deleteLabel={row.columns.length === 1 ? "Delete Row" : "Delete Column"}
                            icon={<Columns3 className="w-4 h-4 text-gray-600" />}
                          />
                        </div>
                      </div>

                      <div
                        style={{ padding: colStyle.padding, margin: colStyle.margin }}
                        onClick={() => {
                          setSelectedRowId(row.id);
                          setSelectedColumnIndex(columnIndex);
                        }}
                        onDragOver={(e) => handleDragOver(e, row.id, columnIndex)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, row.id, columnIndex)}
                        className={`min-h-[100px] border-2 border-dashed rounded-lg p-3 transition-colors ${
                          selectedRowId === row.id && selectedColumnIndex === columnIndex
                            ? 'border-green-500 bg-green-50'
                            : dragOverTarget?.rowId === row.id && dragOverTarget?.columnIndex === columnIndex
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {column.length === 0 ? (
                          <p className="text-sm text-gray-400 text-center py-8">
                            Click to select, then add widgets from toolbar above. Or drag widgets here.
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {column.map((widget, widgetIndex) => (
                              <div key={widget.id}>
                                {/* Drop Indicator - Before this widget */}
                                {dropIndicator?.rowId === row.id && 
                                 dropIndicator?.columnIndex === columnIndex && 
                                 dropIndicator?.position === widgetIndex && (
                                  <div className="h-1 bg-blue-500 rounded-full mb-2 shadow-lg" />
                                )}
                                
                                {renderWidget(widget, row.id, columnIndex)}
                                
                                {/* Drop Indicator - After last widget */}
                                {dropIndicator?.rowId === row.id && 
                                 dropIndicator?.columnIndex === columnIndex && 
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
            ))}
          </div>
        )}
      </div>

      {/* Column Selector */}
      <ColumnSelector onSelectColumns={addRow} />
    </div>
  );
}
