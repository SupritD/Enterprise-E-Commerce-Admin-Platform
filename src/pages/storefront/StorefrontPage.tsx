import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';
import {
  ShoppingBag,
  Search,
  Star,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Tag,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  X,
  CreditCard,
  Plus,
  Minus,
} from 'lucide-react';

export const StorefrontPage: React.FC = () => {
  const { currentStore, showToast } = useApp();
  const { products, coupons, createOrder } = useData();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Form info
  const [customerName, setCustomerName] = useState('John Doe');
  const [customerEmail, setCustomerEmail] = useState('john.doe@example.com');
  const [shippingAddress, setShippingAddress] = useState('742 Evergreen Terrace, Springfield, OR 97477');

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch && p.status === 'active';
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
    showToast({ type: 'success', title: 'Added to Cart', message: `${product.name} added to cart.` });
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as Array<{ product: Product; quantity: number }>
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const found = coupons.find((c) => c.code.toLowerCase() === couponCode.toLowerCase() && c.status === 'active');
    if (found) {
      setDiscountPercent(found.discountValue);
      showToast({ type: 'success', title: 'Coupon Applied!', message: `Applied ${found.discountValue}% discount code: ${found.code}` });
    } else {
      showToast({ type: 'error', title: 'Invalid Coupon', message: 'Coupon code not found or expired. Try "WELCOME10" or "VIPSUMMER".' });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder = createOrder({
      customer: {
        id: `cust_${Date.now()}`,
        name: customerName,
        email: customerEmail,
        phone: '+1 (555) 019-2831',
        totalSpend: total,
        ordersCount: 1,
        tier: 'regular',
      },
      shippingAddress: {
        street: shippingAddress,
        city: 'Springfield',
        state: 'OR',
        zip: '97477',
        country: 'United States',
      },
      billingAddress: {
        street: shippingAddress,
        city: 'Springfield',
        state: 'OR',
        zip: '97477',
        country: 'United States',
      },
      items: cart.map((i) => ({
        id: `item_${Date.now()}_${i.product.id}`,
        productId: i.product.id,
        name: i.product.name,
        sku: i.product.sku,
        thumbnail: i.product.thumbnail,
        price: i.product.salePrice || i.product.price,
        quantity: i.quantity,
        discount: 0,
        tax: (i.product.price * 0.0825),
        total: (i.product.salePrice || i.product.price) * i.quantity,
        fulfillmentStatus: 'unfulfilled',
      })),
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      tax: subtotal * 0.0825,
      total,
      paymentStatus: 'paid',
      fulfillmentStatus: 'unfulfilled',
      paymentMethod: 'Credit Card (Stripe Live Simulation)',
    });

    setCart([]);
    setCheckoutStep('success');
    showToast({
      type: 'success',
      title: 'Order Placed Successfully!',
      message: `Order #${newOrder.orderNumber} has been received and routed to warehouse fulfillment queue.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#111827]">
      {/* Storefront Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E5E8F0] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-xs font-bold text-[#5B6FF5] flex items-center gap-1 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Admin Console</span>
            </Link>
            <div className="h-4 w-px bg-[#E5E8F0]" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#5B6FF5] to-[#7B8DF7] flex items-center justify-center text-white font-bold text-xs">
                O
              </div>
              <span className="font-bold text-sm tracking-tight text-[#111827]">{currentStore.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-xl bg-[#F8F9FC] border border-[#E5E8F0] hover:bg-[#E5E8F0] transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-[#111827]" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#5B6FF5] text-white text-[10px] font-bold flex items-center justify-center">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-[#111827] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[11px] font-bold tracking-widest text-[#5B6FF5] uppercase">
              Live Interactive Connected Storefront
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Enterprise Catalog & Live Checkout Experience
            </h1>
            <p className="text-sm text-slate-300">
              Browse real products from the live catalog, apply coupon codes, and execute instant checkout that directly feeds the admin order & fulfillment pipeline.
            </p>
          </div>

          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono max-w-xs w-full">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Available Demo Coupons:</span>
            </div>
            <div className="text-slate-300">
              &bull; <strong className="text-white">WELCOME10</strong> (10% Off)<br />
              &bull; <strong className="text-white">VIPSUMMER</strong> (20% Off)<br />
              &bull; <strong className="text-white">FLASH50</strong> (50% Off)
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Main View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Category Pills & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#5B6FF5] text-white shadow-sm'
                    : 'bg-white border border-[#E5E8F0] text-[#4B5563] hover:bg-[#F8F9FC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E8F0] rounded-xl text-xs outline-hidden"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#E5E8F0] overflow-hidden shadow-card hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="relative aspect-square bg-[#F8F9FC] overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.salePrice && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-rose-600 text-white font-bold text-[10px] uppercase">
                    Sale
                  </span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                    {product.category}
                  </div>
                  <h3 className="font-bold text-sm text-[#111827] mt-0.5 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-[#6B7280] line-clamp-2 mt-1">{product.shortDescription}</p>
                </div>

                <div className="pt-3 border-t border-[#E5E8F0] flex items-center justify-between">
                  <div>
                    {product.salePrice ? (
                      <div className="flex items-baseline gap-1.5 font-mono">
                        <span className="font-black text-sm text-[#111827]">${product.salePrice.toFixed(2)}</span>
                        <span className="text-xs text-[#9CA3AF] line-through">${product.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <div className="font-mono font-black text-sm text-[#111827]">${product.price.toFixed(2)}</div>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="px-3 py-1.5 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Slide-out Cart & Checkout Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setCartOpen(false)} />

          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col">
            <div className="p-4 border-b border-[#E5E8F0] flex items-center justify-between">
              <h2 className="font-bold text-base text-[#111827]">
                {checkoutStep === 'cart' ? 'Shopping Cart' : checkoutStep === 'checkout' ? 'Express Checkout' : 'Order Placed!'}
              </h2>
              <button onClick={() => setCartOpen(false)} className="p-1.5 text-[#9CA3AF] hover:text-[#111827]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {checkoutStep === 'cart' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-[#6B7280] text-xs">
                      <ShoppingBag className="w-12 h-12 mx-auto text-[#D1D5DB] mb-3" />
                      Your cart is currently empty.
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.product.id} className="flex gap-3 pb-3 border-b border-[#E5E8F0] text-xs">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover border border-[#E5E8F0]"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="font-bold text-[#111827]">{item.product.name}</div>
                            <div className="font-mono text-[#6B7280]">
                              ${(item.product.salePrice || item.product.price).toFixed(2)}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQty(item.product.id, -1)}
                              className="w-6 h-6 rounded border border-[#E5E8F0] flex items-center justify-center text-[#6B7280] hover:bg-[#F8F9FC]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold font-mono text-xs">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQty(item.product.id, 1)}
                              className="w-6 h-6 rounded border border-[#E5E8F0] flex items-center justify-center text-[#6B7280] hover:bg-[#F8F9FC]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-4 border-t border-[#E5E8F0] bg-[#F8F9FC] space-y-3 text-xs">
                    {/* Coupon Input */}
                    <form onSubmit={applyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. WELCOME10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-white border border-[#E5E8F0] rounded-lg text-xs font-mono uppercase"
                      />
                      <button type="submit" className="px-3 py-1.5 bg-white border border-[#E5E8F0] hover:bg-[#F8F9FC] rounded-lg font-bold">
                        Apply
                      </button>
                    </form>

                    <div className="space-y-1 font-mono text-xs">
                      <div className="flex justify-between text-[#6B7280]">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-600 font-bold">
                          <span>Discount ({discountPercent}%):</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[#6B7280]">
                        <span>Shipping:</span>
                        <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between font-bold text-sm text-[#111827] pt-2 border-t border-[#E5E8F0]">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCheckoutStep('checkout')}
                      className="w-full py-3 bg-[#5B6FF5] hover:bg-[#4557E0] text-white font-bold rounded-xl text-xs shadow-md"
                    >
                      Proceed to Checkout (${total.toFixed(2)})
                    </button>
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'checkout' && (
              <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col justify-between p-4 space-y-4 text-xs">
                <div className="space-y-3 overflow-y-auto">
                  <div className="font-bold text-[#111827]">Customer Information</div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B7280] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B7280] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B7280] mb-1">Shipping Address</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F8F9FC] border border-[#E5E8F0] rounded-lg"
                    />
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 space-y-1 font-mono text-[11px]">
                    <div className="text-emerald-800 font-bold">Payment Simulation:</div>
                    <div className="text-emerald-700">Simulated 3D-Secure Stripe charge of ${total.toFixed(2)} USD.</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E8F0] space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Place Live Order (${total.toFixed(2)})
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full py-2 text-[#6B7280] hover:text-[#111827] font-semibold"
                  >
                    Back to Cart
                  </button>
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-[#111827]">Order Confirmed!</h3>
                <p className="text-xs text-[#6B7280]">
                  Your order has been recorded into the live admin database. You can now view it directly in the Admin Order Fulfillment Queue!
                </p>
                <div className="flex gap-2 w-full pt-4">
                  <Link
                    to="/orders"
                    onClick={() => setCartOpen(false)}
                    className="flex-1 py-2.5 bg-[#5B6FF5] text-white font-bold rounded-xl text-xs text-center shadow-sm"
                  >
                    View in Admin Orders
                  </Link>
                  <button
                    onClick={() => {
                      setCheckoutStep('cart');
                      setCartOpen(false);
                    }}
                    className="flex-1 py-2.5 bg-[#F8F9FC] border border-[#E5E8F0] rounded-xl text-xs font-bold"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
