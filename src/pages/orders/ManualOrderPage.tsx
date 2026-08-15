import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Send,
  User,
  Search,
  DollarSign,
  Calculator,
} from 'lucide-react';

export const ManualOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const { products, customers, createOrder } = useData();

  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [items, setItems] = useState([
    { productId: products[0]?.id || 'prod_01', quantity: 1, unitPrice: products[0]?.price || 349.99 },
  ]);
  const [discountAmount, setDiscountAmount] = useState('0');
  const [shippingCost, setShippingCost] = useState('15.00');
  const [paymentOption, setPaymentOption] = useState<'invoice' | 'card_entry' | 'custom'>('invoice');

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.0825;
  const grandTotal = subtotal - parseFloat(discountAmount || '0') + parseFloat(shippingCost || '0') + tax;

  const handleAddItem = () => {
    setItems([...items, { productId: products[0]?.id || 'prod_01', quantity: 1, unitPrice: products[0]?.price || 100 }]);
  };

  const handleCreate = (status: 'draft' | 'paid') => {
    const cust = customers.find((c) => c.id === selectedCustomerId) || customers[0];
    const newOrder = {
      id: `ord_${Date.now()}`,
      orderNumber: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: {
        id: cust.id,
        name: cust.name,
        email: cust.email,
        phone: cust.phone,
        avatar: cust.avatar,
      },
      channel: 'b2b_portal' as const,
      paymentStatus: status === 'paid' ? ('paid' as const) : ('pending' as const),
      fulfillmentStatus: 'unfulfilled' as const,
      riskLevel: 'low' as const,
      items: items.map((it, idx) => {
        const prod = products.find((p) => p.id === it.productId) || products[0];
        return {
          id: `item_${idx}`,
          productId: prod.id,
          name: prod.name,
          productName: prod.name,
          sku: prod.sku,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          price: it.unitPrice,
          discount: 0,
          tax: 0,
          total: it.quantity * it.unitPrice,
          thumbnail: prod.thumbnail,
          fulfillmentStatus: 'unfulfilled',
        };
      }),
      subtotal,
      discountTotal: parseFloat(discountAmount) || 0,
      shippingTotal: parseFloat(shippingCost) || 0,
      taxTotal: tax,
      grandTotal,
      currency: 'USD',
      itemsCount: items.reduce((sum, item) => sum + item.quantity, 0),
      paymentMethod: 'Credit Card',
      riskScore: 10,
      tags: ['Manual Order', 'B2B'],
      notes: [],
      timeline: [],
      shippingAddress: cust.shippingAddress || {
        name: cust.name,
        street: '100 Enterprise Way',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States',
      },
      billingAddress: cust.billingAddress || {
        name: cust.name,
        street: '100 Enterprise Way',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States',
      },
      shippingMethod: {
        carrier: 'FedEx',
        service: 'Express Courier',
      },
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      warehouse: 'Chicago Central Hub',
    };

    createOrder(newOrder as any);
    showToast({
      type: 'success',
      title: 'Order Created',
      message: `Created order ${newOrder.orderNumber} for ${cust.name}.`,
    });
    navigate('/orders');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/orders')}
            className="p-2 rounded-lg bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] text-[#6B7280] shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Create Manual B2B / Phone Order</h1>
            <p className="text-xs text-[#6B7280]">
              Manual order creation with custom line items, wholesale tiered discounts, and invoice emailing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleCreate('draft')}
            className="px-3.5 py-1.5 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg text-xs font-semibold text-[#111827] shadow-2xs"
          >
            Save as Draft Order
          </button>
          <button
            type="button"
            onClick={() => handleCreate('paid')}
            className="px-4 py-2 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Create & Send Invoice</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Customer Picker & Line Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Card */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">Customer Account</h3>
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">Select Existing Client or Organization</label>
              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E5E8F0] rounded-lg text-xs"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} &bull; {c.email} ({c.tier.toUpperCase()} Tier)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#111827]">Order Line Items</h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs font-semibold text-[#5B6FF5] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Another Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => {
                const prod = products.find((p) => p.id === item.productId) || products[0];
                return (
                  <div key={idx} className="p-3 rounded-lg border border-[#E5E8F0] bg-[#F8F9FC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex-1">
                      <select
                        value={item.productId}
                        onChange={(e) => {
                          const updated = [...items];
                          const selected = products.find((p) => p.id === e.target.value);
                          updated[idx].productId = e.target.value;
                          if (selected) updated[idx].unitPrice = selected.price;
                          setItems(updated);
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-[#E5E8F0] rounded text-xs"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>{p.name} (${p.price.toFixed(2)})</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[#6B7280]">Qty:</span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const updated = [...items];
                            updated[idx].quantity = parseInt(e.target.value) || 1;
                            setItems(updated);
                          }}
                          className="w-16 px-2 py-1 bg-white border border-[#E5E8F0] rounded font-mono"
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-[#6B7280]">Unit $:</span>
                        <input
                          type="number"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => {
                            const updated = [...items];
                            updated[idx].unitPrice = parseFloat(e.target.value) || 0;
                            setItems(updated);
                          }}
                          className="w-20 px-2 py-1 bg-white border border-[#E5E8F0] rounded font-mono"
                        />
                      </div>

                      <div className="font-mono font-bold w-20 text-right">
                        ${(item.quantity * item.unitPrice).toFixed(2)}
                      </div>

                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setItems(items.filter((_, i) => i !== idx))}
                          className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Summary & Cost Calculations */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E8F0] p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">Order Ledger & Calculations</h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-[#6B7280]">
                <span>Items Subtotal:</span>
                <span className="font-mono font-semibold text-[#111827]">${subtotal.toFixed(2)}</span>
              </div>

              <div>
                <label className="block text-[#6B7280] mb-1">Discount Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-[#E5E8F0] rounded text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[#6B7280] mb-1">Shipping & Handling ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-[#E5E8F0] rounded text-xs font-mono"
                />
              </div>

              <div className="flex justify-between text-[#6B7280]">
                <span>Sales Tax (8.25%):</span>
                <span className="font-mono">${tax.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-[#E5E8F0] flex justify-between text-base font-bold text-[#111827]">
                <span>Grand Total:</span>
                <span className="font-mono text-[#5B6FF5]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
