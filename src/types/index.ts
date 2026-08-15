export type RoleType = 'super_admin' | 'store_admin' | 'inventory_manager' | 'order_manager' | 'support_lead' | 'vendor' | 'b2b_customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  team: string;
  lastLogin: string;
  twoFactorEnabled: boolean;
  status: 'active' | 'pending' | 'deactivated' | 'locked';
  phone?: string;
  permissions?: string[];
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  domain: string;
  currency: string;
  logo: string;
  status: 'active' | 'maintenance' | 'suspended';
  revenue: number;
  ordersCount: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  barcode: string;
  price: number;
  salePrice?: number;
  stock: number;
  warehouseStock: Record<string, number>;
  weightKg: number;
  status: 'active' | 'inactive';
  image?: string;
  attributes: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  barcode?: string;
  type: 'simple' | 'variable' | 'digital' | 'subscription' | 'bundle' | 'gift_card' | string;
  category: string;
  brand: string;
  vendor: string;
  vendorId?: string;
  price: number;
  salePrice?: number;
  costPerItem: number;
  costPrice?: number;
  stock: number;
  lowStockThreshold: number;
  status: 'active' | 'draft' | 'scheduled' | 'out_of_stock' | 'pending_approval' | 'archived' | string;
  rating: number;
  reviewsCount: number;
  unitsSold: number;
  revenue: number;
  thumbnail: string;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  createdAt: string;
  updatedAt: string;
  variants?: ProductVariant[];
  variantsCount?: number;
  weight: number;
  dimensions: { length: number; width: number; height: number };
  seo: { metaTitle: string; metaDescription: string; canonicalUrl: string; ogImage?: string };
  tags: string[];
  labels: string[];
  shippingClass: string;
  isFeatured?: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  productName?: string;
  sku: string;
  thumbnail: string;
  price: number;
  unitPrice?: number;
  quantity: number;
  discount: number;
  tax: number;
  total: number;
  vendor?: string;
  variantTitle?: string;
  fulfillmentStatus: 'unfulfilled' | 'fulfilled' | 'partially_fulfilled' | 'in_transit' | 'delivered' | 'returned' | 'cancelled' | string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  channel: 'online_store' | 'mobile_app' | 'pos' | 'b2b_portal' | 'amazon' | 'marketplace' | string;
  itemsCount: number;
  items: OrderItem[];
  subtotal: number;
  discountTotal: number;
  discount?: number;
  shippingTotal: number;
  taxTotal: number;
  grandTotal: number;
  total?: number;
  currency: string;
  paymentStatus: 'paid' | 'pending' | 'partially_paid' | 'refunded' | 'failed' | 'authorized' | string;
  fulfillmentStatus: 'unfulfilled' | 'partially_fulfilled' | 'fulfilled' | 'in_transit' | 'delivered' | 'cancelled' | string;
  paymentMethod: 'Credit Card' | 'PayPal' | 'Stripe' | 'Razorpay' | 'COD' | 'Bank Transfer' | 'Wallet' | string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode?: string;
    zip?: string;
    country: string;
  };
  billingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode?: string;
    zip?: string;
    country: string;
  };
  shippingMethod: any;
  trackingNumber?: string;
  warehouse?: string;
  riskScore: number; // 0 - 100
  riskLevel: 'low' | 'medium' | 'high' | string;
  tags: string[];
  assignedTo?: string;
  notes: Array<{ id: string; author: string; text: string; date: string }>;
  timeline: Array<{ id: string; title: string; description: string; time: string; type: string }>;
}

export interface ReturnRequest {
  id: string;
  rmaNumber: string;
  orderNumber: string;
  orderId: string;
  customer: { id: string; name: string; email: string; avatar: string };
  products: Array<{
    productId: string;
    name: string;
    thumbnail: string;
    sku: string;
    quantity: number;
    reason: string;
    qcGrade?: 'Grade A (Like New)' | 'Grade B (Minor Wear)' | 'Grade C (Damaged)' | 'Defective';
    qcResult?: 'Restock' | 'Liquidate' | 'Scrap' | 'Return to Vendor';
  }>;
  items?: Array<{
    productId?: string;
    name?: string;
    thumbnail?: string;
    sku?: string;
    quantity?: number;
    reason?: string;
    price?: number;
  }>;
  reason: string;
  requestedAction?: string;
  customerNote?: string;
  resolution: 'refund_original' | 'store_credit' | 'replacement' | 'exchange';
  status: 'new' | 'awaiting_approval' | 'approved' | 'pickup_scheduled' | 'in_transit' | 'at_qc' | 'resolved' | 'cancelled' | string;
  slaDeadline: string;
  refundAmount: number;
  createdAt: string;
  photos: string[];
}

export interface Customer {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  avatar: string;
  group: 'Standard' | 'VIP Platinum' | 'Wholesale Tier 1' | 'B2B Enterprise' | 'Employee' | string;
  totalOrders: number;
  ordersCount?: number;
  totalSpend: number;
  totalSpent?: number;
  avgOrderValue: number;
  averageOrderValue?: number;
  creditLimit?: number;
  paymentTerms?: string;
  lastOrderDate: string;
  createdAt: string;
  status: 'active' | 'flagged' | 'blocked' | 'guest' | string;
  walletBalance: number;
  rewardPoints: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | string;
  churnRisk: 'low' | 'medium' | 'high' | string;
  preferredChannel: string;
  tags: string[];
  shippingAddress?: {
    name?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    postalCode?: string;
    country?: string;
  };
  billingAddress?: {
    name?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    postalCode?: string;
    country?: string;
  };
  addresses: Array<{
    id: string;
    isDefaultShipping: boolean;
    isDefaultBilling: boolean;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }>;
}

export interface Vendor {
  id: string;
  name: string;
  storeName?: string;
  storeSlug: string;
  legalEntity?: string;
  logo: string;
  owner: string;
  contactName?: string;
  email: string;
  phone: string;
  category: string;
  productsCount: number;
  rating: number;
  reviewsCount: number;
  commissionPlan: string;
  commissionRate: number; // percentage
  status: 'active' | 'pending_approval' | 'suspended' | 'rejected' | string;
  kycStatus?: string;
  balance?: number;
  totalSales?: number;
  pendingPayout?: number;
  payoutMethod?: {
    type?: string;
    bankName?: string;
    routingNumber?: string;
    accountNumber?: string;
    email?: string;
  };
  gmv: number;
  commissionEarned: number;
  payoutDue: number;
  onTimeDeliveryRate: number;
  joinedDate: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  type: 'central' | 'regional' | '3pl' | 'retail_store';
  address: string;
  city: string;
  country: string;
  isDefault: boolean;
  fulfillmentPriority: number;
  capacityUsedPercentage: number;
  active: boolean;
  manager: string;
  contactEmail: string;
}

export interface StockTransfer {
  id: string;
  transferNumber: string;
  sourceWarehouseId: string;
  sourceWarehouseName: string;
  sourceWarehouse?: string;
  destWarehouseId: string;
  destWarehouseName: string;
  destinationWarehouse?: string;
  itemsCount: number;
  totalUnits: number;
  items: Array<{ sku: string; name: string; quantity: number; receivedQty?: number }>;
  status: 'draft' | 'pending_approval' | 'in_transit' | 'completed' | 'cancelled' | string;
  createdBy: string;
  createdAt: string;
  eta: string;
  expectedArrival?: string;
  notes?: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  warehouseId: string;
  warehouseName: string;
  warehouse?: string;
  totalAmount: number;
  itemsCount: number;
  status: 'draft' | 'sent' | 'partially_received' | 'received' | 'cancelled' | string;
  expectedDate: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  discountType: 'percentage' | 'fixed_amount' | 'free_shipping' | 'buy_x_get_y' | string;
  value: number;
  discountValue?: number;
  minSpend: number;
  maxDiscount?: number;
  usageCount: number;
  usageLimit: number;
  perCustomerLimit: number;
  status: 'active' | 'scheduled' | 'expired' | 'disabled' | string;
  validFrom: string;
  validTo: string;
  appliesTo: 'all_products' | 'specific_categories' | 'specific_products' | 'minimum_order' | string;
  customerEligibility: 'all' | 'specific_groups' | 'first_time_only' | string;
}

export interface FlashSale {
  id: string;
  name: string;
  bannerImage: string;
  startTime: string;
  endTime: string;
  status: 'live' | 'scheduled' | 'ended';
  productsCount: number;
  stockRemainingPercent: number;
  totalRevenue: number;
  products: Array<{
    productId: string;
    name: string;
    originalPrice: number;
    salePrice: number;
    stockAllocated: number;
    stockSold: number;
  }>;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  channels: Array<'email' | 'sms' | 'whatsapp' | 'push'>;
  segment: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'active_automated' | string;
  scheduledDate: string;
  sentCount: number;
  openRate: number;
  clickRate: number;
  revenue: number;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customer: { id: string; name: string; email: string; avatar: string };
  subject: string;
  category: 'order_inquiry' | 'shipping_delay' | 'return_refund' | 'product_question' | 'billing' | 'technical' | string;
  priority: 'low' | 'medium' | 'high' | 'urgent' | string;
  status: 'open' | 'pending_customer' | 'pending_reply' | 'overdue' | 'resolved' | 'closed' | string;
  assignedTo: string;
  slaDeadline: string;
  isOverdue: boolean;
  channel?: string;
  createdAt: string;
  lastUpdated: string;
  orderNumber?: string;
  messages: Array<{
    id: string;
    sender: string;
    senderName?: string;
    senderRole: 'customer' | 'agent' | 'system' | string;
    avatar: string;
    timestamp: string;
    message: string;
    attachments?: string[];
  }>;
}

export interface B2BCompany {
  id: string;
  name: string;
  taxId: string;
  industry: string;
  country: string;
  buyersCount: number;
  creditLimit: number;
  creditUsed: number;
  paymentTerms: 'Net 30' | 'Net 60' | 'Net 90' | 'Due on Receipt';
  status: 'active' | 'pending_approval' | 'credit_hold' | 'suspended';
  salesRep: string;
  totalOrders: number;
  totalSpend: number;
  joinedDate: string;
}

export interface B2BRFQ {
  id: string;
  rfqNumber: string;
  companyId: string;
  companyName: string;
  contactName: string;
  itemsCount: number;
  items: Array<{ productId: string; name: string; requestedQty: number; listPrice: number; quotedPrice?: number }>;
  assignedManager: string;
  quotedTotal?: number;
  status: 'new' | 'under_review' | 'quoted' | 'accepted' | 'expired' | 'rejected';
  validUntil: string;
  createdAt: string;
}

export interface WorkflowAutomation {
  id: string;
  name: string;
  trigger: string;
  stepsCount: number;
  runs24h: number;
  successRate: number;
  status: 'active' | 'paused' | 'draft' | string;
  description: string;
  lastRun: string;
  conditions?: any[];
  actions?: any[];
}

export interface FraudRule {
  id: string;
  name: string;
  entityType: 'order' | 'customer' | 'ip' | 'card' | string;
  riskScoreContribution?: number;
  riskScoreIncrement?: number;
  action: 'flag_for_review' | 'auto_cancel' | 'require_3ds' | 'log_only' | 'auto_block' | string;
  status: 'active' | 'test_mode' | 'inactive' | string;
  condition?: string;
  triggered24h?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'order' | 'inventory' | 'security' | 'return' | 'vendor' | 'support';
  link: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  link?: { text: string; url: string };
}
