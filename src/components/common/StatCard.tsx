import React, { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  id?: string;
  title: string;
  value: string | number;
  change?: number; // e.g. 12.5 or -3.2
  changeLabel?: string;
  icon?: ReactNode;
  subtitle?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  id,
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  subtitle,
  onClick,
}) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white rounded-xl border border-[#E5E8F0] p-5 shadow-card transition-all ${
        onClick ? 'cursor-pointer hover:border-[#5B6FF5]/40 hover:shadow-md' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
          {title}
        </span>
        {icon && (
          <div className="w-9 h-9 rounded-lg bg-[#F8F9FC] border border-[#E5E8F0] flex items-center justify-center text-[#5B6FF5]">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div className="text-2xl font-bold text-[#111827] tracking-tight">{value}</div>
        {change !== undefined && (
          <div
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
              isPositive
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>
              {isPositive ? '+' : ''}
              {change}%
            </span>
          </div>
        )}
      </div>

      {(subtitle || changeLabel) && (
        <div className="mt-2 text-xs text-[#9CA3AF]">
          {subtitle || changeLabel}
        </div>
      )}
    </div>
  );
};
