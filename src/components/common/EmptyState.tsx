import React, { ReactNode } from 'react';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
      <div className="w-14 h-14 rounded-2xl bg-[#F8F9FC] border border-[#E5E8F0] flex items-center justify-center text-[#9CA3AF] mb-4">
        {icon || <PackageOpen className="w-7 h-7" />}
      </div>
      <h3 className="text-base font-semibold text-[#111827]">{title}</h3>
      <p className="text-sm text-[#6B7280] mt-1 max-w-sm">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 px-4 py-2 bg-[#5B6FF5] text-white text-sm font-medium rounded-lg hover:bg-[#4557E0] transition-colors shadow-xs"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
