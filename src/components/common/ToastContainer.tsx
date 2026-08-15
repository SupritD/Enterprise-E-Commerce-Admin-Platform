import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderClass = 'border-emerald-200 bg-emerald-50 text-emerald-900';
        let IconComponent = CheckCircle2;
        let iconColor = 'text-emerald-600';

        if (toast.type === 'error') {
          borderClass = 'border-rose-200 bg-rose-50 text-rose-900';
          IconComponent = AlertCircle;
          iconColor = 'text-rose-600';
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-200 bg-amber-50 text-amber-900';
          IconComponent = AlertTriangle;
          iconColor = 'text-amber-600';
        } else if (toast.type === 'info') {
          borderClass = 'border-indigo-200 bg-indigo-50 text-indigo-900';
          IconComponent = Info;
          iconColor = 'text-indigo-600';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-modal bg-white transition-all transform animate-in fade-in slide-in-from-bottom-3 duration-200 ${borderClass}`}
          >
            <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold">{toast.title}</div>
              <div className="text-xs text-[#4B5563] mt-0.5 leading-relaxed">{toast.message}</div>
              {toast.link && (
                <Link
                  to={toast.link.url}
                  className="inline-block text-xs font-semibold text-[#5B6FF5] hover:underline mt-1.5"
                  onClick={() => removeToast(toast.id)}
                >
                  {toast.link.text} &rarr;
                </Link>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              className="text-[#9CA3AF] hover:text-[#111827] p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
