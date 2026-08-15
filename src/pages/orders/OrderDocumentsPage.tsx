import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import {
  FileText,
  Printer,
  Download,
  Barcode,
  Package,
  Truck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const OrderDocumentsPage: React.FC = () => {
  const { showToast } = useApp();
  const { orders } = useData();
  const [docType, setDocType] = useState<'invoice' | 'packing_slip' | 'shipping_label'>('invoice');

  const sampleOrder = orders[0];

  const handlePrint = () => {
    showToast({
      type: 'success',
      title: 'Printing Document',
      message: `Dispatched ${docType.replace('_', ' ')} to network thermal/laser printer.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Order Documents & Print Engine</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Generate compliant commercial tax invoices, multi-SKU picking slips, and 4x6 thermal carrier shipping labels.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast({ type: 'info', title: 'Exporting PDF', message: 'Compiled high-resolution PDF document.' })}
            className="px-3 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Document</span>
          </button>
        </div>
      </div>

      {/* Document Selector Switch */}
      <div className="flex items-center gap-2 border-b border-[#E5E8F0]">
        <button
          onClick={() => setDocType('invoice')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
            docType === 'invoice' ? 'border-[#5B6FF5] text-[#5B6FF5]' : 'border-transparent text-[#6B7280]'
          }`}
        >
          Commercial Tax Invoice
        </button>
        <button
          onClick={() => setDocType('packing_slip')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
            docType === 'packing_slip' ? 'border-[#5B6FF5] text-[#5B6FF5]' : 'border-transparent text-[#6B7280]'
          }`}
        >
          Warehouse Picking & Packing Slip
        </button>
        <button
          onClick={() => setDocType('shipping_label')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
            docType === 'shipping_label' ? 'border-[#5B6FF5] text-[#5B6FF5]' : 'border-transparent text-[#6B7280]'
          }`}
        >
          FedEx 4x6 Shipping Label
        </button>
      </div>

      {/* Rendered Document Preview Card */}
      <div className="bg-white rounded-xl border border-[#E5E8F0] p-8 shadow-card max-w-3xl mx-auto space-y-6">
        {docType === 'invoice' && (
          <div className="space-y-6 text-xs text-[#111827]">
            <div className="flex justify-between items-start border-b border-[#E5E8F0] pb-6">
              <div>
                <div className="text-xl font-black text-[#5B6FF5] tracking-tight">OMNICOMMERCE</div>
                <div className="text-[11px] text-[#6B7280] mt-1 leading-relaxed">
                  OmniCommerce Global Inc.<br />
                  100 Enterprise Way, Suite 400<br />
                  San Francisco, CA 94105 &bull; EIN: 84-2910492
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-base font-bold uppercase">Commercial Invoice</h2>
                <div className="font-mono text-[11px] text-[#6B7280] mt-1">Invoice: INV-{sampleOrder.orderNumber}</div>
                <div className="font-mono text-[11px] text-[#6B7280]">Date: {sampleOrder.createdAt}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="font-bold text-[#6B7280] uppercase text-[10px]">Billed To:</span>
                <div className="font-semibold text-sm mt-0.5">{sampleOrder.customer.name}</div>
                <div className="text-[#6B7280] mt-0.5">
                  {sampleOrder.shippingAddress.street}<br />
                  {sampleOrder.shippingAddress.city}, {sampleOrder.shippingAddress.state} {sampleOrder.shippingAddress.zip}
                </div>
              </div>
              <div>
                <span className="font-bold text-[#6B7280] uppercase text-[10px]">Payment Terms:</span>
                <div className="font-semibold mt-0.5">Paid via Credit Card (Stripe)</div>
                <div className="text-[#6B7280]">Status: Settled in USD</div>
              </div>
            </div>

            <table className="w-full text-left border-collapse border-y border-[#E5E8F0]">
              <thead>
                <tr className="bg-[#F8F9FC] text-[10px] font-bold text-[#6B7280] uppercase">
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">SKU</th>
                  <th className="py-2.5 px-3 text-right">Qty</th>
                  <th className="py-2.5 px-3 text-right">Rate</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E8F0]">
                {sampleOrder.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2.5 px-3 font-medium">{item.productName}</td>
                    <td className="py-2.5 px-3 font-mono text-[#6B7280]">{item.sku}</td>
                    <td className="py-2.5 px-3 text-right font-mono">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right font-mono">${item.unitPrice.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end">
              <div className="w-64 space-y-1.5 text-right font-mono">
                <div className="flex justify-between text-[#6B7280]"><span>Subtotal:</span><span>${sampleOrder.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#6B7280]"><span>Shipping:</span><span>${sampleOrder.shippingTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#6B7280]"><span>Tax:</span><span>${sampleOrder.taxTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm font-bold text-[#111827] pt-2 border-t border-[#E5E8F0]">
                  <span>Total Due:</span><span>${sampleOrder.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {docType === 'packing_slip' && (
          <div className="space-y-6 text-xs text-[#111827]">
            <div className="flex justify-between border-b pb-4">
              <div>
                <h2 className="text-lg font-bold">WAREHOUSE PICKING MANIFEST</h2>
                <div className="font-mono text-[#6B7280]">{sampleOrder.orderNumber} &bull; Bin Location: Rack B-12</div>
              </div>
              <Barcode className="w-24 h-8 text-[#111827]" />
            </div>

            <div className="space-y-2">
              <h4 className="font-bold uppercase text-[10px] text-[#6B7280]">Items To Pick & Verify:</h4>
              {sampleOrder.items.map((item) => (
                <div key={item.id} className="p-3 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded text-[#5B6FF5]" />
                    <div>
                      <div className="font-bold">{item.productName}</div>
                      <div className="font-mono text-[11px] text-[#6B7280]">SKU: {item.sku}</div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-base">{item.quantity} PCS</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {docType === 'shipping_label' && (
          <div className="border-4 border-black p-6 rounded-none max-w-sm mx-auto space-y-4 font-mono text-xs">
            <div className="flex justify-between border-b-2 border-black pb-2">
              <div>
                <div className="font-bold text-base">FedEx Ground</div>
                <div>TRACKING #: 9402 9182 3910 2910</div>
              </div>
              <div className="font-bold text-xl border-2 border-black px-2 py-1">PRIORITY</div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px]">SHIP TO:</div>
              <div className="font-bold">{sampleOrder.customer.name}</div>
              <div>{sampleOrder.shippingAddress.street}</div>
              <div>{sampleOrder.shippingAddress.city}, {sampleOrder.shippingAddress.state} {sampleOrder.shippingAddress.zip}</div>
            </div>

            <div className="border-t-2 border-black pt-4 flex flex-col items-center">
              <Barcode className="w-full h-16 text-black" />
              <div className="text-[10px] tracking-widest mt-1">94029182391029100021</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
