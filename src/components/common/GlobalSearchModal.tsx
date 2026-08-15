import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Search, X, Package, ShoppingCart, Users, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen } = useApp();
  const { products, orders, customers } = useData();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'orders' | 'customers' | 'pages'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchModalOpen]);

  if (!searchModalOpen) return null;

  const quickPages = [
    { title: 'Executive Dashboard', path: '/dashboard', category: 'Pages', hint: 'KPIs, trends, revenue' },
    { title: 'All Products Catalog', path: '/catalog/products', category: 'Pages', hint: 'Inventory, pricing, SKU' },
    { title: 'Add New Product', path: '/catalog/products/new', category: 'Pages', hint: 'Create product listing' },
    { title: 'Orders Management', path: '/orders', category: 'Pages', hint: 'Fulfill, cancel, track' },
    { title: 'Manual Phone Order', path: '/orders/manual/new', category: 'Pages', hint: 'Create custom draft' },
    { title: 'Returns & RMA Queue', path: '/returns', category: 'Pages', hint: 'QC inspection & refunds' },
    { title: 'Warehouse Multi-Matrix', path: '/inventory/warehouses', category: 'Pages', hint: 'Transfers & stock levels' },
    { title: 'Marketing Coupons', path: '/marketing/coupons', category: 'Pages', hint: 'Discounts & promotions' },
    { title: 'Flash Sales Engine', path: '/marketing/flash-sales', category: 'Pages', hint: 'Time-sensitive drops' },
    { title: 'Support Helpdesk Tickets', path: '/support/tickets', category: 'Pages', hint: 'SLA countdowns & replies' },
    { title: 'B2B RFQs & Quotes', path: '/enterprise/b2b/rfq', category: 'Pages', hint: 'Corporate pricing & terms' },
    { title: 'Workflow Automations', path: '/enterprise/workflows', category: 'Pages', hint: 'Event-driven triggers' },
    { title: 'Fraud Detection Engine', path: '/enterprise/fraud', category: 'Pages', hint: 'Rule triggers & risk scores' },
    { title: 'Multi-Store Manager', path: '/enterprise/stores', category: 'Pages', hint: 'Regional storefronts' },
    { title: 'System Queue & Cache', path: '/system/queue', category: 'Pages', hint: 'Background workers' },
  ];

  const q = query.toLowerCase().trim();

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );

  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(q) ||
      o.customer.name.toLowerCase().includes(q) ||
      o.customer.email.toLowerCase().includes(q)
  );

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q)
  );

  const filteredPages = quickPages.filter(
    (p) => p.title.toLowerCase().includes(q) || p.hint.toLowerCase().includes(q)
  );

  const handleSelect = (path: string) => {
    navigate(path);
    setSearchModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-modal border border-[#E5E8F0] overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E5E8F0] gap-3">
          <Search className="w-5 h-5 text-[#9CA3AF]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, orders, customers, SKUs, or jump to page... (Esc to close)"
            className="flex-1 text-sm bg-transparent border-none outline-hidden text-[#111827] placeholder-[#9CA3AF]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[#9CA3AF] hover:text-[#111827]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="text-xs font-mono bg-[#F8F9FC] border border-[#E5E8F0] px-2 py-1 rounded text-[#6B7280]"
          >
            ESC
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#F8F9FC] border-b border-[#E5E8F0] text-xs">
          {(['all', 'products', 'orders', 'customers', 'pages'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-white text-[#5B6FF5] shadow-xs border border-[#E5E8F0]'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 flex-1 space-y-4">
          {/* Products */}
          {(activeTab === 'all' || activeTab === 'products') && filteredProducts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] px-3 py-1 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" /> Products ({filteredProducts.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredProducts.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelect(`/catalog/products/${product.id}`)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#F8F9FC] cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-9 h-9 rounded-md object-cover border border-[#E5E8F0]"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-[#111827] group-hover:text-[#5B6FF5] truncate">
                          {product.name}
                        </div>
                        <div className="text-xs font-mono text-[#6B7280]">
                          {product.sku} &bull; ${product.price.toFixed(2)} &bull; {product.stock} in stock
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#5B6FF5] transition-transform group-hover:translate-x-0.5" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders */}
          {(activeTab === 'all' || activeTab === 'orders') && filteredOrders.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] px-3 py-1 flex items-center gap-1.5">
                <ShoppingCart className="w-3.5 h-3.5" /> Orders ({filteredOrders.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredOrders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    onClick={() => handleSelect(`/orders/${order.id}`)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#F8F9FC] cursor-pointer group"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#111827] group-hover:text-[#5B6FF5] flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold">{order.orderNumber}</span>
                        <span>&bull;</span>
                        <span>{order.customer.name}</span>
                      </div>
                      <div className="text-xs text-[#6B7280]">
                        ${order.grandTotal.toFixed(2)} &bull; {order.fulfillmentStatus.toUpperCase()} &bull; {order.createdAt}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#5B6FF5]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customers */}
          {(activeTab === 'all' || activeTab === 'customers') && filteredCustomers.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] px-3 py-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Customers ({filteredCustomers.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredCustomers.slice(0, 3).map((cust) => (
                  <div
                    key={cust.id}
                    onClick={() => handleSelect(`/customers/${cust.id}`)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#F8F9FC] cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={cust.avatar}
                        alt={cust.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-[#111827] group-hover:text-[#5B6FF5]">
                          {cust.name}
                        </div>
                        <div className="text-xs text-[#6B7280]">{cust.email} &bull; {cust.group}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#5B6FF5]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Page Jumps */}
          {(activeTab === 'all' || activeTab === 'pages') && filteredPages.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] px-3 py-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Navigation & Tools
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                {filteredPages.slice(0, 8).map((page) => (
                  <div
                    key={page.path}
                    onClick={() => handleSelect(page.path)}
                    className="p-2.5 rounded-lg border border-[#E5E8F0] hover:border-[#5B6FF5]/50 hover:bg-[#F8F9FC] cursor-pointer group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#111827] group-hover:text-[#5B6FF5]">
                        {page.title}
                      </div>
                      <div className="text-[11px] text-[#9CA3AF]">{page.hint}</div>
                    </div>
                    <CornerDownLeft className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#5B6FF5]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 &&
            filteredOrders.length === 0 &&
            filteredCustomers.length === 0 &&
            filteredPages.length === 0 && (
              <div className="py-12 text-center text-[#9CA3AF]">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <div className="text-sm font-medium text-[#111827]">No results found for "{query}"</div>
                <div className="text-xs mt-1">Try searching by SKU, customer email, order number, or tool name.</div>
              </div>
            )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#F8F9FC] border-t border-[#E5E8F0] text-xs text-[#6B7280] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-[#E5E8F0] rounded font-mono text-[10px]">
                &uarr; &darr;
              </kbd>{' '}
              Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-[#E5E8F0] rounded font-mono text-[10px]">
                &crarr;
              </kbd>{' '}
              Select
            </span>
          </div>
          <span className="text-[11px]">OmniCommerce Global Index</span>
        </div>
      </div>
    </div>
  );
};
