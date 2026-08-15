import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1 && totalItems <= itemsPerPage) {
    return (
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E8F0] text-xs text-[#6B7280]">
        <span>
          Showing <span className="font-semibold text-[#111827]">{totalItems}</span> results
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-[#E5E8F0] text-xs text-[#6B7280]">
      <div>
        Showing <span className="font-semibold text-[#111827]">{startItem}</span> &ndash;{' '}
        <span className="font-semibold text-[#111827]">{endItem}</span> of{' '}
        <span className="font-semibold text-[#111827]">{totalItems}</span> results
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className="p-1.5 rounded-md border border-[#E5E8F0] bg-white text-[#6B7280] hover:bg-[#F8F9FC] disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
          if (
            p === 1 ||
            p === totalPages ||
            (p >= currentPage - 1 && p <= currentPage + 1)
          ) {
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`min-w-[28px] h-7 px-2 rounded-md font-semibold text-xs transition-colors ${
                  currentPage === p
                    ? 'bg-[#5B6FF5] text-white shadow-xs'
                    : 'text-[#6B7280] hover:bg-[#F8F9FC] border border-transparent'
                }`}
              >
                {p}
              </button>
            );
          }
          if (p === currentPage - 2 || p === currentPage + 2) {
            return (
              <span key={p} className="px-1 text-[#9CA3AF]">
                ...
              </span>
            );
          }
          return null;
        })}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className="p-1.5 rounded-md border border-[#E5E8F0] bg-white text-[#6B7280] hover:bg-[#F8F9FC] disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
