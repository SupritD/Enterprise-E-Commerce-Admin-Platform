import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Product,
  Order,
  ReturnRequest,
  Customer,
  Vendor,
  Warehouse,
  StockTransfer,
  PurchaseOrder,
  Coupon,
  FlashSale,
  MarketingCampaign,
  SupportTicket,
  B2BCompany,
  B2BRFQ,
  WorkflowAutomation,
  FraudRule,
} from '../types';
import {
  initialProducts,
  initialOrders,
  initialReturns,
  initialCustomers,
  initialVendors,
  initialWarehouses,
  initialCoupons,
  initialFlashSales,
  initialCampaigns,
  initialTickets,
  initialB2BCompanies,
  initialB2BRFQs,
  initialWorkflows,
  initialFraudRules,
} from '../data/mockData';
import { useApp } from './AppContext';

interface DataContextType {
  products: Product[];
  orders: Order[];
  returns: ReturnRequest[];
  customers: Customer[];
  vendors: Vendor[];
  warehouses: Warehouse[];
  purchaseOrders: PurchaseOrder[];
  stockTransfers: StockTransfer[];
  suppliers: any[];
  affiliates: any[];
  coupons: Coupon[];
  flashSales: FlashSale[];
  campaigns: MarketingCampaign[];
  tickets: SupportTicket[];
  b2bCompanies: B2BCompany[];
  b2bRFQs: B2BRFQ[];
  workflows: WorkflowAutomation[];
  fraudRules: FraudRule[];
  
  // Product Actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'unitsSold' | 'revenue'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => Product | undefined;
  
  // Order Actions
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (id: string, paymentStatus?: Order['paymentStatus'], fulfillmentStatus?: Order['fulfillmentStatus']) => void;
  addOrderNote: (orderId: string, text: string) => void;
  cancelOrder: (orderId: string, reason?: string) => void;
  
  // Return / RMA Actions
  createReturn: (rmaData: Partial<ReturnRequest>) => ReturnRequest;
  updateReturnStatus: (id: string, status: ReturnRequest['status']) => void;
  
  // Customer Actions
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'totalOrders' | 'totalSpend' | 'avgOrderValue'>) => Customer;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  
  // Vendor Actions
  updateVendorStatus: (id: string, status: Vendor['status']) => void;
  
  // Marketing Actions
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => Coupon;
  toggleCoupon: (id: string) => void;
  addFlashSale: (sale: Omit<FlashSale, 'id' | 'totalRevenue' | 'stockRemainingPercent'>) => FlashSale;
  
  // Ticket Actions
  addTicketMessage: (ticketId: string, message: string, role?: 'agent' | 'customer') => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  
  // B2B & Workflow Actions
  updateRFQStatus: (id: string, status: B2BRFQ['status'], quotedTotal?: number) => void;
  toggleWorkflow: (id: string) => void;
  addWorkflow: (wf: Omit<WorkflowAutomation, 'id' | 'runs24h' | 'successRate' | 'lastRun'>) => WorkflowAutomation;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useApp();

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('omni_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('omni_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [returns, setReturns] = useState<ReturnRequest[]>(initialReturns);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [warehouses, setWarehouses] = useState<Warehouse[]>(initialWarehouses);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([
    {
      id: 'po_01',
      poNumber: 'PO-2026-0881',
      supplierId: 'supp_01',
      supplierName: 'Apex Precision Acoustics Corp',
      warehouseId: 'wh_nj_01',
      warehouseName: 'Central East Coast Hub (New Jersey)',
      totalAmount: 48500.0,
      itemsCount: 400,
      status: 'partially_received',
      expectedDate: '2026-08-20',
      createdAt: '2026-08-10',
    },
    {
      id: 'po_02',
      poNumber: 'PO-2026-0882',
      supplierId: 'supp_02',
      supplierName: 'Chronos Swiss Micro-Precision',
      warehouseId: 'wh_ca_02',
      warehouseName: 'Pacific West Coast Center (California)',
      totalAmount: 120000.0,
      itemsCount: 250,
      status: 'sent',
      expectedDate: '2026-08-25',
      createdAt: '2026-08-12',
    },
  ]);
  const [stockTransfers, setStockTransfers] = useState<StockTransfer[]>([
    {
      id: 'st_01',
      transferNumber: 'TRF-2026-0044',
      sourceWarehouseId: 'wh_nj_01',
      sourceWarehouseName: 'Central East Coast Hub (New Jersey)',
      destWarehouseId: 'wh_ca_02',
      destWarehouseName: 'Pacific West Coast Center (California)',
      itemsCount: 3,
      totalUnits: 150,
      items: [
        { sku: 'AUDIO-APX-PRO-SLV', name: 'Apex Pro Noise-Cancelling Wireless Headphones', quantity: 50, receivedQty: 50 },
        { sku: 'TECH-CHRONO-S9-TI', name: 'Chronos Smart Watch S9 Ultra Titanium', quantity: 100, receivedQty: 100 },
      ],
      status: 'in_transit',
      createdBy: 'Sarah Jenkins',
      createdAt: '2026-08-13',
      eta: '2026-08-17',
      notes: 'Replenish West Coast hub for regional Prime SLA delivery',
    },
  ]);
  const [suppliers, setSuppliers] = useState<any[]>([
    {
      id: 'supp_01',
      name: 'Apex Precision Acoustics Corp',
      code: 'SUPP-APX',
      contactPerson: 'David Chen',
      email: 'david.chen@apex-precision.tw',
      phone: '+886 2 2345 6789',
      category: 'Electronics & Audio Components',
      leadTimeDays: 14,
      rating: 4.9,
      status: 'active',
      totalPOs: 24,
      totalSpend: 540000,
    },
    {
      id: 'supp_02',
      name: 'Chronos Swiss Micro-Precision SA',
      code: 'SUPP-CHRO',
      contactPerson: 'Sophie Dubois',
      email: 'sophie.d@chronos-swiss.ch',
      phone: '+41 22 819 4000',
      category: 'Titanium Casings & Sapphire Glass',
      leadTimeDays: 21,
      rating: 4.95,
      status: 'active',
      totalPOs: 18,
      totalSpend: 890000,
    },
  ]);
  const [affiliates, setAffiliates] = useState<any[]>([
    {
      id: 'aff_01',
      name: 'TechGear Pro Reviews',
      code: 'TECHPRO10',
      email: 'partners@techgearpro.com',
      commissionRate: 8.5,
      totalClicks: 24500,
      conversions: 1840,
      totalRevenue: 348000,
      earnings: 29580,
      status: 'active',
      payoutMethod: 'PayPal',
    },
    {
      id: 'aff_02',
      name: 'Modern Workspace Studio',
      code: 'DESKSETUP',
      email: 'hello@modernworkspaces.io',
      commissionRate: 10.0,
      totalClicks: 18200,
      conversions: 920,
      totalRevenue: 198000,
      earnings: 19800,
      status: 'active',
      payoutMethod: 'Direct Bank Wire',
    },
  ]);
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [flashSales, setFlashSales] = useState<FlashSale[]>(initialFlashSales);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(initialCampaigns);
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [b2bCompanies, setB2BCompanies] = useState<B2BCompany[]>(initialB2BCompanies);
  const [b2bRFQs, setB2BRFQs] = useState<B2BRFQ[]>(initialB2BRFQs);
  const [workflows, setWorkflows] = useState<WorkflowAutomation[]>(initialWorkflows);
  const [fraudRules, setFraudRules] = useState<FraudRule[]>(initialFraudRules);

  // Sync products & orders to local storage for realistic persistence
  React.useEffect(() => {
    localStorage.setItem('omni_products', JSON.stringify(products));
  }, [products]);

  React.useEffect(() => {
    localStorage.setItem('omni_orders', JSON.stringify(orders));
  }, [orders]);

  // Product Methods
  const addProduct = (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'unitsSold' | 'revenue'>): Product => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...data,
      id: newId,
      unitsSold: 0,
      revenue: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast({
      type: 'success',
      title: 'Product Created',
      message: `"${newProduct.name}" was successfully added to the catalog.`,
    });
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updates,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : p
      )
    );
    showToast({
      type: 'success',
      title: 'Product Updated',
      message: 'Product changes were saved successfully.',
    });
  };

  const deleteProduct = (id: string) => {
    const p = products.find((x) => x.id === id);
    setProducts((prev) => prev.filter((x) => x.id !== id));
    showToast({
      type: 'warning',
      title: 'Product Deleted',
      message: `"${p?.name || id}" has been removed from catalog.`,
    });
  };

  const duplicateProduct = (id: string): Product | undefined => {
    const original = products.find((p) => p.id === id);
    if (!original) return undefined;
    const duplicated: Product = {
      ...original,
      id: `prod-${Date.now()}`,
      name: `${original.name} (Copy)`,
      sku: `${original.sku}-COPY`,
      status: 'draft',
      unitsSold: 0,
      revenue: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [duplicated, ...prev]);
    showToast({
      type: 'info',
      title: 'Product Duplicated',
      message: `Created draft copy: "${duplicated.name}"`,
    });
    return duplicated;
  };

  // Order Methods
  const createOrder = (orderData: Partial<Order>): Order => {
    const newId = `ord_${Date.now()}`;
    const orderNum = `ORD-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: newId,
      orderNumber: orderNum,
      createdAt: new Date().toLocaleString(),
      customer: orderData.customer || {
        id: 'cust_guest',
        name: 'Guest Customer',
        email: 'guest@example.com',
        phone: '+1 555 000 0000',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80',
      },
      channel: orderData.channel || 'online_store',
      itemsCount: orderData.items?.length || 1,
      items: orderData.items || [],
      subtotal: orderData.subtotal || 100,
      discountTotal: orderData.discountTotal || 0,
      shippingTotal: orderData.shippingTotal || 0,
      taxTotal: orderData.taxTotal || 10,
      grandTotal: orderData.grandTotal || 110,
      currency: 'USD',
      paymentStatus: orderData.paymentStatus || 'paid',
      fulfillmentStatus: orderData.fulfillmentStatus || 'unfulfilled',
      paymentMethod: orderData.paymentMethod || 'Credit Card',
      shippingAddress: orderData.shippingAddress || {
        name: 'Customer',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States',
      },
      billingAddress: orderData.billingAddress || {
        name: 'Customer',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States',
      },
      shippingMethod: orderData.shippingMethod || {
        carrier: 'FedEx Express',
        service: 'Standard Ground',
      },
      riskScore: 10,
      riskLevel: 'low',
      tags: ['Manual Order'],
      notes: [],
      timeline: [
        {
          id: `tl_${Date.now()}`,
          title: 'Order Created',
          description: 'Order created via Admin Portal',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'order',
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast({
      type: 'success',
      title: 'Order Placed',
      message: `Order #${newOrder.orderNumber} successfully registered.`,
    });
    return newOrder;
  };

  const updateOrderStatus = (
    id: string,
    paymentStatus?: Order['paymentStatus'],
    fulfillmentStatus?: Order['fulfillmentStatus']
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const newTimeline = [...o.timeline];
        if (fulfillmentStatus && fulfillmentStatus !== o.fulfillmentStatus) {
          newTimeline.push({
            id: `tl_${Date.now()}`,
            title: `Fulfillment status changed to ${fulfillmentStatus.replace('_', ' ').toUpperCase()}`,
            description: `Updated by Alex Vance`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'shipping',
          });
        }
        return {
          ...o,
          paymentStatus: paymentStatus || o.paymentStatus,
          fulfillmentStatus: fulfillmentStatus || o.fulfillmentStatus,
          timeline: newTimeline,
        };
      })
    );
    showToast({
      type: 'success',
      title: 'Order Updated',
      message: `Status updated for order.`,
    });
  };

  const addOrderNote = (orderId: string, text: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          notes: [
            ...o.notes,
            {
              id: `note_${Date.now()}`,
              author: 'Alex Vance (Admin)',
              text,
              date: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
            },
          ],
        };
      })
    );
    showToast({
      type: 'info',
      title: 'Note Added',
      message: 'Internal note saved to order history.',
    });
  };

  const cancelOrder = (orderId: string, reason?: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          fulfillmentStatus: 'cancelled',
          paymentStatus: 'refunded',
          timeline: [
            ...o.timeline,
            {
              id: `tl_${Date.now()}`,
              title: 'Order Cancelled',
              description: reason ? `Reason: ${reason}` : 'Cancelled by administrator',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              type: 'order',
            },
          ],
        };
      })
    );
    showToast({
      type: 'warning',
      title: 'Order Cancelled',
      message: 'Order status changed to cancelled and inventory released.',
    });
  };

  // Return Methods
  const createReturn = (rmaData: Partial<ReturnRequest>): ReturnRequest => {
    const newId = `rma_${Date.now()}`;
    const newRMA: ReturnRequest = {
      id: newId,
      rmaNumber: `RMA-2026-${Math.floor(100 + Math.random() * 900)}`,
      orderNumber: rmaData.orderNumber || 'ORD-2026-00101',
      orderId: rmaData.orderId || 'ord_10091',
      customer: rmaData.customer || {
        id: 'cust_01',
        name: 'Eleanor Sterling',
        email: 'eleanor.sterling@acme-corp.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
      },
      products: rmaData.products || [],
      reason: rmaData.reason || 'Customer request',
      resolution: rmaData.resolution || 'refund_original',
      status: 'new',
      slaDeadline: '2026-08-18 18:00',
      refundAmount: rmaData.refundAmount || 150.0,
      createdAt: new Date().toISOString().split('T')[0],
      photos: [],
    };
    setReturns((prev) => [newRMA, ...prev]);
    showToast({
      type: 'success',
      title: 'RMA Created',
      message: `Return request #${newRMA.rmaNumber} initiated.`,
    });
    return newRMA;
  };

  const updateReturnStatus = (id: string, status: ReturnRequest['status']) => {
    setReturns((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    showToast({
      type: 'info',
      title: 'Return Status Updated',
      message: `RMA status updated to "${status.replace('_', ' ')}"`,
    });
  };

  // Customer Methods
  const addCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'totalOrders' | 'totalSpend' | 'avgOrderValue'>): Customer => {
    const newCust: Customer = {
      ...customerData,
      id: `cust_${Date.now()}`,
      totalOrders: 0,
      totalSpend: 0,
      avgOrderValue: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCustomers((prev) => [newCust, ...prev]);
    showToast({
      type: 'success',
      title: 'Customer Added',
      message: `Customer profile created for "${newCust.name}".`,
    });
    return newCust;
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast({
      type: 'success',
      title: 'Customer Saved',
      message: 'Profile details updated.',
    });
  };

  // Vendor Methods
  const updateVendorStatus = (id: string, status: Vendor['status']) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
    showToast({
      type: 'info',
      title: 'Vendor Status Changed',
      message: `Vendor status updated to "${status}".`,
    });
  };

  // Marketing Methods
  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usageCount'>): Coupon => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coup_${Date.now()}`,
      usageCount: 0,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast({
      type: 'success',
      title: 'Coupon Created',
      message: `Coupon code "${newCoupon.code}" is now ready.`,
    });
    return newCoupon;
  };

  const toggleCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'active' ? 'disabled' : 'active' }
          : c
      )
    );
  };

  const addFlashSale = (saleData: Omit<FlashSale, 'id' | 'totalRevenue' | 'stockRemainingPercent'>): FlashSale => {
    const newSale: FlashSale = {
      ...saleData,
      id: `fs_${Date.now()}`,
      totalRevenue: 0,
      stockRemainingPercent: 100,
    };
    setFlashSales((prev) => [newSale, ...prev]);
    showToast({
      type: 'success',
      title: 'Flash Sale Scheduled',
      message: `Flash Sale "${newSale.name}" has been registered.`,
    });
    return newSale;
  };

  // Ticket Methods
  const addTicketMessage = (ticketId: string, message: string, role: 'agent' | 'customer' = 'agent') => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        return {
          ...t,
          status: role === 'agent' ? 'pending_customer' : 'open',
          lastUpdated: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
          messages: [
            ...t.messages,
            {
              id: `msg_${Date.now()}`,
              sender: role === 'agent' ? 'Alex Vance (Support)' : t.customer.name,
              senderRole: role,
              avatar:
                role === 'agent'
                  ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80'
                  : t.customer.avatar,
              timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
              message,
            },
          ],
        };
      })
    );
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status } : t))
    );
    showToast({
      type: 'info',
      title: 'Ticket Updated',
      message: `Ticket marked as ${status}.`,
    });
  };

  // B2B & Workflow Methods
  const updateRFQStatus = (id: string, status: B2BRFQ['status'], quotedTotal?: number) => {
    setB2BRFQs((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, quotedTotal: quotedTotal ?? r.quotedTotal } : r))
    );
    showToast({
      type: 'success',
      title: 'RFQ Updated',
      message: `Quote request #${id} updated to "${status}".`,
    });
  };

  const toggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: w.status === 'active' ? 'paused' : 'active' }
          : w
      )
    );
  };

  const addWorkflow = (wfData: Omit<WorkflowAutomation, 'id' | 'runs24h' | 'successRate' | 'lastRun'>): WorkflowAutomation => {
    const newWf: WorkflowAutomation = {
      ...wfData,
      id: `wf_${Date.now()}`,
      runs24h: 0,
      successRate: 100,
      lastRun: 'Just now',
    };
    setWorkflows((prev) => [newWf, ...prev]);
    showToast({
      type: 'success',
      title: 'Workflow Created',
      message: `Automation "${newWf.name}" is now online.`,
    });
    return newWf;
  };

  return (
    <DataContext.Provider
      value={{
        products,
        orders,
        returns,
        customers,
        vendors,
        warehouses,
        purchaseOrders,
        stockTransfers,
        suppliers,
        affiliates,
        coupons,
        flashSales,
        campaigns,
        tickets,
        b2bCompanies,
        b2bRFQs,
        workflows,
        fraudRules,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        createOrder,
        updateOrderStatus,
        addOrderNote,
        cancelOrder,
        createReturn,
        updateReturnStatus,
        addCustomer,
        updateCustomer,
        updateVendorStatus,
        addCoupon,
        toggleCoupon,
        addFlashSale,
        addTicketMessage,
        updateTicketStatus,
        updateRFQStatus,
        toggleWorkflow,
        addWorkflow,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
