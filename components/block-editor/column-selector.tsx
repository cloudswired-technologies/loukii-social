"use client";

interface ColumnSelectorProps {
  onSelectColumns: (count: 1 | 2 | 3 | 4) => void;
}

export function ColumnSelector({ onSelectColumns }: ColumnSelectorProps) {
  const columnOptions = [
    { count: 1, label: '1 Column', grid: 'grid-cols-1' },
    { count: 2, label: '2 Columns', grid: 'grid-cols-2' },
    { count: 3, label: '3 Columns', grid: 'grid-cols-3' },
    { count: 4, label: '4 Columns', grid: 'grid-cols-4' },
  ] as const;

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Add Row:
        </span>
        <div className="flex gap-2 flex-wrap">
          {columnOptions.map((option) => (
            <button
              key={option.count}
              onClick={() => onSelectColumns(option.count)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
