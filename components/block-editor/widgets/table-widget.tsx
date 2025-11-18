"use client";

import { useState } from "react";
import { TableWidget } from "../types";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface TableWidgetRendererProps {
  widget: TableWidget;
  onUpdate: (widget: TableWidget) => void;
  onDelete: () => void;
}

export function TableWidgetRenderer({ widget, onUpdate, onDelete }: TableWidgetRendererProps) {
  const [isEditing, setIsEditing] = useState(false);

  const addRow = () => {
    const newRow = Array(widget.headers.length).fill("");
    onUpdate({ ...widget, rows: [...widget.rows, newRow] });
  };

  const addColumn = () => {
    const newHeaders = [...widget.headers, `Column ${widget.headers.length + 1}`];
    const newRows = widget.rows.map(row => [...row, ""]);
    onUpdate({ ...widget, headers: newHeaders, rows: newRows });
  };

  const deleteRow = (rowIndex: number) => {
    const newRows = widget.rows.filter((_, i) => i !== rowIndex);
    onUpdate({ ...widget, rows: newRows });
  };

  const deleteColumn = (colIndex: number) => {
    const newHeaders = widget.headers.filter((_, i) => i !== colIndex);
    const newRows = widget.rows.map(row => row.filter((_, i) => i !== colIndex));
    onUpdate({ ...widget, headers: newHeaders, rows: newRows });
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...widget.headers];
    newHeaders[index] = value;
    onUpdate({ ...widget, headers: newHeaders });
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...widget.rows];
    newRows[rowIndex][colIndex] = value;
    onUpdate({ ...widget, rows: newRows });
  };

  return (
    <div className="group relative">
      {/* Table Controls */}
      <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={addRow}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
        >
          <Plus className="w-3 h-3" />
          Add Row
        </button>
        <button
          onClick={addColumn}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus className="w-3 h-3" />
          Add Column
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-2 py-1 text-xs rounded ${
            isEditing ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {isEditing ? 'Done Editing' : 'Edit Table'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="w-full border-collapse">
          {/* Headers */}
          <thead className="bg-gray-100">
            <tr>
              {widget.headers.map((header, colIndex) => (
                <th
                  key={colIndex}
                  className="border border-gray-300 px-3 py-2 text-left relative group/header"
                >
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={header}
                        onChange={(e) => updateHeader(colIndex, e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                        placeholder="Header"
                      />
                      {widget.headers.length > 1 && (
                        <button
                          onClick={() => deleteColumn(colIndex)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                          title="Delete Column"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="font-semibold text-sm">{header}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {widget.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="group/row hover:bg-gray-50">
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 px-3 py-2 relative"
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        placeholder="Cell content"
                      />
                    ) : (
                      <span className="text-sm">{cell || '-'}</span>
                    )}
                  </td>
                ))}
                {isEditing && (
                  <td className="border-0 px-2">
                    <button
                      onClick={() => deleteRow(rowIndex)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover/row:opacity-100 transition-opacity"
                      title="Delete Row"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {widget.rows.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-sm">
          No rows yet. Click "Add Row" to start.
        </div>
      )}
    </div>
  );
}
