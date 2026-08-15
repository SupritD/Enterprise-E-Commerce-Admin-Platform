import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Package,
  Truck,
  DollarSign,
  AlertTriangle,
  QrCode,
  Printer,
  ShieldCheck,
  Send,
} from 'lucide-react';

export const ReturnDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const { returns, updateReturnStatus } = useData();

  const rma = returns.find((r) => r.id === id) || returns[0];

  const [qcGrade, setQcGrade] = useState<'grade_a' | 'grade_b' | 'defective' | 'scrap'>('grade_a');
  const [disposition, setDisposition] = useState<'restock_sellable' | 'b_stock' | 'return_to_vendor' | 'scrap'>('restock_sellable');
  const [restockFee, setRestockFee] = useState('0.00');

  const handleAuthorize = () => {
    updateReturnStatus(rma.id, 'authorized');
    showToast({
      type: 'success',
      title: 'RMA Authorized',
      message: `Prepaid return shipping label generated and emailed to ${rma.customer?.email || 'customer'}.`,
    });
  };

  const handleMarkReceived = () => {
    updateReturnStatus(rma.id, 'received');
    showToast({
      type: 'info',
      title: 'Parcel Received at Dock',
      message: 'Scanned package into Central Hub QC queue.',
    });
  };

  const handleIssueRefund = () => {
    updateReturnStatus(rma.id, 'refunded');
    showToast({
      type: 'success',
      title: 'Refund Dispatched',
      message: `Processed $${(rma.refundAmount ?? 0).toFixed(2)} refund back to customer original payment method.`,
    });
  };

  const handleReject = () => {
    updateReturnStatus(rma.id, 'rejected');
    showToast({
      type: 'error',
      title: 'RMA Denied',
      message: 'Return request rejected. Notification dispatched with policy reason.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/returns')}
            className="p-2 rounded-lg bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] text-[#6B7280] shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-[#111827] tracking-tight">{rma.rmaNumber}</h1>
              <StatusBadge status={rma.status} />
            </div>
            <p className="text-xs text-[#6B7280] font-mono mt-0.5">
              Original Order: <Link to={`/orders/${rma.orderId}`} className="text-[#5B6FF5] hover:underline font-bold">{rma.orderNumber}</Link> &bull; Initiated {rma.createdAt}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {rma.status === 'pending' && (
            <>
              <button
                onClick={handleReject}
                className="px-3.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject RMA</span>
              </button>
              <button
                onClick={handleAuthorize}
                className="px-3.5 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Authorize & Issue Label</span>
              </button>
            </>
          )}

          {rma.status === 'authorized' && (
            <button
              onClick={handleMarkReceived}
              className="px-3.5 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Mark Received at Dock</span>
            </button>
          )}

          {rma.status === 'received' && (
            <button
              onClick={handleIssueRefund}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Approve QC & Settle Refund (${(rma.refundAmount ?? 0).toFixed(2)})</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main 2 Cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Return Items Card */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">Returned Item Details</h3>

            <div className="divide-y divide-[#E5E8F0]">
              {(rma.items || rma.products || []).map((item: any, idx: number) => (
                <div key={idx} className="py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#F8F9FC] border border-[#E5E8F0] flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#5B6FF5]" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#111827]">{item.name}</div>
                      <div className="text-[11px] font-mono text-[#6B7280]">SKU: {item.sku} &bull; Qty: {item.quantity}</div>
                      <div className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded inline-block mt-1">
                        Reason: {item.reason || rma.reason}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-xs text-[#111827]">
                      ${((item.price || 99.99) * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-[10px] text-[#6B7280]">
                      Action: {(rma.requestedAction || 'Refund').replace('_', ' ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {rma.customerNote && (
              <div className="p-3 bg-[#F8F9FC] rounded-lg border border-[#E5E8F0] text-xs">
                <span className="font-bold text-[#111827]">Customer Statement:</span>
                <p className="text-[#4B5563] mt-0.5 italic">"{rma.customerNote}"</p>
              </div>
            )}
          </div>

          {/* QC Inspection Station Card */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5B6FF5]" />
                Warehouse Quality Control Inspection
              </h3>
              <span className="text-xs font-mono text-[#6B7280]">Dock Inspection Station #3</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#111827] mb-1">Physical Condition Grade</label>
                <select
                  value={qcGrade}
                  onChange={(e) => setQcGrade(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg"
                >
                  <option value="grade_a">Grade A (Factory Sealed / Pristine)</option>
                  <option value="grade_b">Grade B (Open Box / Packaging Wear)</option>
                  <option value="defective">Defective / Manufacturing Flaw</option>
                  <option value="scrap">Damaged / Non-Salvable Scrap</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#111827] mb-1">Inventory Disposition</label>
                <select
                  value={disposition}
                  onChange={(e) => setDisposition(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg"
                >
                  <option value="restock_sellable">Restock to Sellable SKU (+Qty)</option>
                  <option value="b_stock">Transfer to Outlet / B-Stock</option>
                  <option value="return_to_vendor">RTV (Return to Vendor Chargeback)</option>
                  <option value="scrap">Write-off & Scrap Disposition</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => showToast({ type: 'success', title: 'QC Report Logged', message: `Graded parcel as ${qcGrade.toUpperCase()} with disposition ${disposition}.` })}
                className="px-4 py-2 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs"
              >
                Log QC Inspection Pass
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar 1 Col */}
        <div className="space-y-6">
          {/* Customer Profile */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#111827]">Customer & Destination</h3>

            <div className="space-y-1">
              <div className="font-bold text-[#111827]">{rma.customer?.name || 'Customer'}</div>
              <div className="text-[#6B7280]">{rma.customer?.email || 'support@buyer.com'}</div>
            </div>

            <div className="pt-3 border-t border-[#E5E8F0] space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Refund Target:</span>
                <span className="font-bold text-[#111827]">Original Visa &bull;&bull;&bull;&bull; 4242</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Restocking Fee:</span>
                <span className="text-rose-600">-$0.00</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-emerald-600 pt-1 border-t border-[#E5E8F0]">
                <span>Total Net Refund:</span>
                <span>${(rma.refundAmount ?? 0).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Prepaid Label Info */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#111827] flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#5B6FF5]" />
              Return Shipping Label
            </h3>

            <div className="p-3 bg-[#F8F9FC] rounded-lg border border-[#E5E8F0] space-y-1 font-mono">
              <div className="text-[#6B7280]">Carrier: <strong>FedEx Ground Return</strong></div>
              <div className="text-[#6B7280]">Tracking: <strong className="text-[#5B6FF5]">7849-2910-4491</strong></div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-1">Status: Delivered to Hub</div>
            </div>

            <button
              onClick={() => showToast({ type: 'info', title: 'Print Label', message: 'Downloading PDF return shipping label...' })}
              className="w-full py-2 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] rounded-lg font-semibold text-[#111827] flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>Reprint Return Label</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
