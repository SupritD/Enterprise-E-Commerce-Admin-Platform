import React, { ReactNode } from 'react';
import { X } from 'lucide-react';

interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  children: ReactNode;
}

export const BulkActionBar: React.FC<BulkActionBarProps> = ({
  selectedCount,
  onClearSelection,
  children,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#1A1F36] text-white rounded-full px-6 py-3 shadow-modal flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-200 border border-white/10">
      <div className="flex items-center gap-2 pr-3 border-r border-white/20 text-xs font-semibold">
        <span className="w-5 h-5 rounded-full bg-[#5B6FF5] text-white flex items-center justify-center text-[10px]">
          {selectedCount}
        </span>
        <span>Selected</span>
      </div>

      <div className="flex items-center gap-2">{children}</div>

      <button
        onClick={onClearSelection}
        aria-label="Clear selection"
        className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 ml-2"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
