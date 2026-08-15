import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const normalized = status.toLowerCase().replace(/[\s_-]+/g, '_');

  let badgeStyle = 'bg-gray-100 text-gray-700 border-gray-200';

  if (
    [
      'active',
      'paid',
      'fulfilled',
      'delivered',
      'resolved',
      'approved',
      'completed',
      'sent',
      'success',
      'live',
      'quoted',
    ].includes(normalized)
  ) {
    badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (
    [
      'pending',
      'pending_approval',
      'pending_reply',
      'pending_customer',
      'awaiting_approval',
      'in_transit',
      'at_qc',
      'partially_fulfilled',
      'partially_paid',
      'scheduled',
      'under_review',
      'pickup_scheduled',
      'test_mode',
      'draft',
    ].includes(normalized)
  ) {
    badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (
    [
      'cancelled',
      'refunded',
      'failed',
      'suspended',
      'rejected',
      'out_of_stock',
      'overdue',
      'locked',
      'blocked',
      'danger',
      'high',
      'urgent',
      'flagged',
    ].includes(normalized)
  ) {
    badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (
    [
      'authorized',
      'in_transit',
      'open',
      'new',
      'info',
      'registered',
      'unfulfilled',
    ].includes(normalized)
  ) {
    badgeStyle = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  }

  const formatText = (text: string) => {
    return text
      .split(/[_-]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyle} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {formatText(status)}
    </span>
  );
};
