import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  requiresPhrase?: string; // e.g. "DELETE"
  variant?: 'danger' | 'warning' | 'primary';
  onConfirm: () => void;
  onClose?: () => void;
  onCancel?: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  description,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  requiresPhrase,
  variant = 'danger',
  onConfirm,
  onClose,
  onCancel,
}) => {
  const [typedPhrase, setTypedPhrase] = useState('');

  if (!isOpen) return null;

  const handleClose = onClose || onCancel || (() => {});
  const modalText = description || message || '';

  const isConfirmedDisabled = requiresPhrase
    ? typedPhrase.trim() !== requiresPhrase
    : false;

  const handleConfirm = () => {
    if (!isConfirmedDisabled) {
      onConfirm();
      setTypedPhrase('');
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-modal border border-[#E5E8F0] max-w-md w-full p-6 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                variant === 'danger'
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : 'bg-amber-50 text-amber-600 border border-amber-200'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#111827]">{title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-md text-[#9CA3AF] hover:text-[#111827]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-3 text-sm text-[#4B5563] leading-relaxed">{modalText}</p>

        {requiresPhrase && (
          <div className="mt-4">
            <label className="block text-xs font-semibold text-[#374151] mb-1.5">
              Please type <span className="font-mono font-bold text-rose-600">{requiresPhrase}</span> to confirm:
            </label>
            <input
              type="text"
              value={typedPhrase}
              onChange={(e) => setTypedPhrase(e.target.value)}
              placeholder={requiresPhrase}
              className="w-full border border-[#E5E8F0] rounded-lg px-3 py-2 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden font-mono"
            />
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#E5E8F0]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#4B5563] bg-white border border-[#E5E8F0] rounded-lg hover:bg-[#F8F9FC] transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirmedDisabled}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-xs ${
              isConfirmedDisabled
                ? 'opacity-50 cursor-not-allowed bg-gray-400'
                : variant === 'danger'
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-[#5B6FF5] hover:bg-[#4557E0]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
