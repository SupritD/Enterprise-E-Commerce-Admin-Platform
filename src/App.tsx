import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { DataProvider } from './context/DataContext';

// Layouts
import { AdminLayout } from './components/layout/AdminLayout';
import { PublicLayout } from './components/layout/PublicLayout';

// Public & Auth Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/public/ResetPasswordPage';
import { TwoFactorPage } from './pages/public/TwoFactorPage';
import { OnboardingPage } from './pages/public/OnboardingPage';

// Dashboards
import { ExecutiveDashboard } from './pages/dashboards/ExecutiveDashboard';
import { RevenueDashboard } from './pages/dashboards/RevenueDashboard';
import { OperationsDashboard } from './pages/dashboards/OperationsDashboard';
import { MarketingDashboard } from './pages/dashboards/MarketingDashboard';
import { InventoryDashboard } from './pages/dashboards/InventoryDashboard';
import { VendorDashboard } from './pages/dashboards/VendorDashboard';

// Catalog
import { ProductsPage } from './pages/catalog/ProductsPage';
import { ProductDetailPage } from './pages/catalog/ProductDetailPage';
import { AttributesPage } from './pages/catalog/AttributesPage';
import { CollectionsPage } from './pages/catalog/CollectionsPage';
import { CategoriesPage } from './pages/catalog/CategoriesPage';
import { BrandsSuppliersPage } from './pages/catalog/BrandsSuppliersPage';
import { VariantsManagerPage } from './pages/catalog/VariantsManagerPage';
import { MediaImportExportPage } from './pages/catalog/MediaImportExportPage';

// Inventory
import { StockOverviewPage } from './pages/inventory/StockOverviewPage';
import { WarehousesPage } from './pages/inventory/WarehousesPage';
import { StockTransfersPage } from './pages/inventory/StockTransfersPage';
import { StockAdjustmentsPage } from './pages/inventory/StockAdjustmentsPage';
import { PurchaseOrdersPage } from './pages/inventory/PurchaseOrdersPage';

// Orders
import { OrdersListPage } from './pages/orders/OrdersListPage';
import { OrderDetailPage } from './pages/orders/OrderDetailPage';
import { DraftOrdersPage } from './pages/orders/DraftOrdersPage';
import { ManualOrderPage } from './pages/orders/ManualOrderPage';
import { OrderDocumentsPage } from './pages/orders/OrderDocumentsPage';

// Returns & RMA
import { ReturnsListPage } from './pages/returns/ReturnsListPage';
import { ReturnDetailPage } from './pages/returns/ReturnDetailPage';

// Customers
import { CustomersListPage } from './pages/customers/CustomersListPage';
import { CustomerDetailPage } from './pages/customers/CustomerDetailPage';
import { CustomerSegmentsPage } from './pages/customers/CustomerSegmentsPage';
import { B2BAccountsPage } from './pages/customers/B2BAccountsPage';
import { LoyaltyRewardsPage } from './pages/customers/LoyaltyRewardsPage';

// Vendors & Affiliates
import { VendorsListPage } from './pages/vendors/VendorsListPage';
import { VendorDetailPage } from './pages/vendors/VendorDetailPage';
import { VendorApplicationsPage } from './pages/vendors/VendorApplicationsPage';
import { VendorPayoutsPage } from './pages/vendors/VendorPayoutsPage';
import { AffiliatesPage } from './pages/marketing/AffiliatesPage';

// Marketing
import { DiscountsPage } from './pages/marketing/DiscountsPage';
import { CampaignsPage } from './pages/marketing/CampaignsPage';
import { AbandonedCartPage } from './pages/marketing/AbandonedCartPage';

// Shipping & Logistics
import { ShippingZonesPage } from './pages/shipping/ShippingZonesPage';
import { CarriersPage } from './pages/shipping/CarriersPage';
import { ShippingRulesPage } from './pages/shipping/ShippingRulesPage';
import { TrackingPage } from './pages/shipping/TrackingPage';

// Payments & Taxes
import { PaymentGatewaysPage } from './pages/finance/PaymentGatewaysPage';
import { TransactionLedgerPage } from './pages/finance/TransactionLedgerPage';
import { TaxSettingsPage } from './pages/finance/TaxSettingsPage';
import { TaxReportsPage } from './pages/finance/TaxReportsPage';

// Support
import { TicketsListPage } from './pages/support/TicketsListPage';
import { TicketDetailPage } from './pages/support/TicketDetailPage';
import { KnowledgeBasePage } from './pages/support/KnowledgeBasePage';
import { LiveChatPage } from './pages/support/LiveChatPage';
import { EmailTemplatesPage } from './pages/support/EmailTemplatesPage';

// Analytics
import { AnalyticsReportsPage } from './pages/analytics/AnalyticsReportsPage';
import { ExportReportsPage } from './pages/analytics/ExportReportsPage';

// Enterprise & B2B
import { MultiStorePage } from './pages/enterprise/MultiStorePage';
import { B2BQuotesPage } from './pages/enterprise/B2BQuotesPage';
import { WorkflowAutomationsPage } from './pages/enterprise/WorkflowAutomationsPage';
import { FraudDetectionPage } from './pages/enterprise/FraudDetectionPage';
import { HeadlessApiPage } from './pages/enterprise/HeadlessApiPage';
import { ERPIntegrationsPage } from './pages/enterprise/ERPIntegrationsPage';

// Security & Users
import { UsersListPage } from './pages/security/UsersListPage';
import { RolesPermissionsPage } from './pages/security/RolesPermissionsPage';
import { SecuritySettingsPage } from './pages/security/SecuritySettingsPage';
import { AuditLogsPage } from './pages/security/AuditLogsPage';

// System Settings
import { GeneralSettingsPage } from './pages/system/GeneralSettingsPage';
import { QueueManagerPage } from './pages/system/QueueManagerPage';
import { WebhooksPage } from './pages/system/WebhooksPage';
import { BackupsCronPage } from './pages/system/BackupsCronPage';

// Live Connected Storefront
import { StorefrontPage } from './pages/storefront/StorefrontPage';

export default function App() {
  return (
    <AppProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Live Customer Storefront (Full Screen Interactive Preview) */}
            <Route path="/storefront" element={<StorefrontPage />} />

            {/* Public Authentication Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/welcome" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/two-factor" element={<TwoFactorPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
            </Route>

            {/* Authenticated Enterprise Admin Console Routes */}
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Dashboards */}
              <Route path="/dashboard" element={<ExecutiveDashboard />} />
              <Route path="/dashboard/revenue" element={<RevenueDashboard />} />
              <Route path="/dashboard/operations" element={<OperationsDashboard />} />
              <Route path="/dashboard/marketing" element={<MarketingDashboard />} />
              <Route path="/dashboard/inventory" element={<InventoryDashboard />} />
              <Route path="/dashboard/vendors" element={<VendorDashboard />} />

              {/* Catalog */}
              <Route path="/catalog/products" element={<ProductsPage />} />
              <Route path="/catalog/products/new" element={<ProductDetailPage />} />
              <Route path="/catalog/products/:id" element={<ProductDetailPage />} />
              <Route path="/catalog/attributes" element={<AttributesPage />} />
              <Route path="/catalog/collections" element={<CollectionsPage />} />
              <Route path="/catalog/categories" element={<CategoriesPage />} />
              <Route path="/catalog/brands" element={<BrandsSuppliersPage />} />
              <Route path="/catalog/suppliers" element={<BrandsSuppliersPage />} />
              <Route path="/catalog/variants" element={<VariantsManagerPage />} />
              <Route path="/catalog/reviews" element={<VariantsManagerPage />} />
              <Route path="/catalog/media" element={<MediaImportExportPage />} />
              <Route path="/catalog/import" element={<MediaImportExportPage />} />

              {/* Inventory */}
              <Route path="/inventory" element={<StockOverviewPage />} />
              <Route path="/inventory/warehouses" element={<WarehousesPage />} />
              <Route path="/inventory/multi-warehouse" element={<StockOverviewPage />} />
              <Route path="/inventory/transfers" element={<StockTransfersPage />} />
              <Route path="/inventory/adjustments" element={<StockAdjustmentsPage />} />
              <Route path="/inventory/purchase-orders" element={<PurchaseOrdersPage />} />
              <Route path="/inventory/audits" element={<StockAdjustmentsPage />} />

              {/* Orders */}
              <Route path="/orders" element={<OrdersListPage />} />
              <Route path="/orders/draft" element={<DraftOrdersPage />} />
              <Route path="/orders/manual/new" element={<ManualOrderPage />} />
              <Route path="/orders/invoices" element={<OrderDocumentsPage />} />
              <Route path="/orders/packing-slips" element={<OrderDocumentsPage />} />
              <Route path="/orders/shipping-labels" element={<OrderDocumentsPage />} />
              <Route path="/orders/timeline" element={<OrderDocumentsPage />} />
              <Route path="/orders/:id" element={<OrderDetailPage />} />

              {/* Returns & RMA */}
              <Route path="/returns" element={<ReturnsListPage />} />
              <Route path="/returns/approvals" element={<ReturnsListPage />} />
              <Route path="/returns/inspection" element={<ReturnDetailPage />} />
              <Route path="/returns/refunds" element={<ReturnDetailPage />} />
              <Route path="/returns/exchanges" element={<ReturnDetailPage />} />
              <Route path="/returns/:id" element={<ReturnDetailPage />} />

              {/* Customers */}
              <Route path="/customers" element={<CustomersListPage />} />
              <Route path="/customers/groups" element={<CustomerSegmentsPage />} />
              <Route path="/customers/segments" element={<CustomerSegmentsPage />} />
              <Route path="/customers/wallets" element={<CustomersListPage />} />
              <Route path="/customers/wishlists" element={<CustomersListPage />} />
              <Route path="/customers/:id" element={<CustomerDetailPage />} />

              {/* Vendors */}
              <Route path="/vendors" element={<VendorsListPage />} />
              <Route path="/vendors/approval" element={<VendorApplicationsPage />} />
              <Route path="/vendors/products" element={<VendorsListPage />} />
              <Route path="/vendors/orders" element={<VendorsListPage />} />
              <Route path="/vendors/payouts" element={<VendorPayoutsPage />} />
              <Route path="/vendors/commissions" element={<VendorPayoutsPage />} />
              <Route path="/vendors/:id" element={<VendorDetailPage />} />

              {/* Affiliates */}
              <Route path="/affiliates" element={<AffiliatesPage />} />
              <Route path="/affiliates/referrals" element={<AffiliatesPage />} />
              <Route path="/affiliates/links" element={<AffiliatesPage />} />
              <Route path="/affiliates/commissions" element={<AffiliatesPage />} />
              <Route path="/affiliates/payouts" element={<AffiliatesPage />} />

              {/* Marketing */}
              <Route path="/marketing/coupons" element={<DiscountsPage />} />
              <Route path="/marketing/discounts" element={<DiscountsPage />} />
              <Route path="/marketing/flash-sales" element={<DiscountsPage />} />
              <Route path="/marketing/campaigns" element={<CampaignsPage />} />
              <Route path="/marketing/loyalty" element={<LoyaltyRewardsPage />} />
              <Route path="/marketing/referral" element={<LoyaltyRewardsPage />} />
              <Route path="/marketing/abandoned-cart" element={<AbandonedCartPage />} />
              <Route path="/marketing/upsell" element={<DiscountsPage />} />

              {/* Shipping & Logistics */}
              <Route path="/shipping/zones" element={<ShippingZonesPage />} />
              <Route path="/shipping/rules" element={<ShippingRulesPage />} />
              <Route path="/shipping/carriers" element={<CarriersPage />} />
              <Route path="/shipping/tracking" element={<TrackingPage />} />

              {/* Payments & Tax */}
              <Route path="/payments/gateways" element={<PaymentGatewaysPage />} />
              <Route path="/payments/transactions" element={<TransactionLedgerPage />} />
              <Route path="/payments/refunds" element={<TransactionLedgerPage />} />
              <Route path="/tax/classes" element={<TaxSettingsPage />} />
              <Route path="/tax/gst" element={<TaxSettingsPage />} />
              <Route path="/tax/reports" element={<TaxReportsPage />} />

              {/* Support */}
              <Route path="/support/tickets" element={<TicketsListPage />} />
              <Route path="/support/tickets/:id" element={<TicketDetailPage />} />
              <Route path="/support/kb" element={<KnowledgeBasePage />} />
              <Route path="/support/chat" element={<LiveChatPage />} />
              <Route path="/support/contact-forms" element={<TicketsListPage />} />
              <Route path="/notifications/email" element={<EmailTemplatesPage />} />

              {/* Analytics & Reports */}
              <Route path="/reports/sales" element={<AnalyticsReportsPage />} />
              <Route path="/reports/products" element={<AnalyticsReportsPage />} />
              <Route path="/reports/inventory" element={<AnalyticsReportsPage />} />
              <Route path="/reports/vendors" element={<AnalyticsReportsPage />} />
              <Route path="/reports/custom" element={<ExportReportsPage />} />

              {/* Enterprise & B2B */}
              <Route path="/enterprise/stores" element={<MultiStorePage />} />
              <Route path="/enterprise/b2b/companies" element={<B2BAccountsPage />} />
              <Route path="/enterprise/b2b/rfq" element={<B2BQuotesPage />} />
              <Route path="/enterprise/workflows" element={<WorkflowAutomationsPage />} />
              <Route path="/enterprise/fraud" element={<FraudDetectionPage />} />
              <Route path="/enterprise/headless" element={<HeadlessApiPage />} />
              <Route path="/enterprise/integrations/erp" element={<ERPIntegrationsPage />} />

              {/* Security & Users */}
              <Route path="/users" element={<UsersListPage />} />
              <Route path="/roles" element={<RolesPermissionsPage />} />
              <Route path="/security/2fa" element={<SecuritySettingsPage />} />
              <Route path="/security/sessions" element={<SecuritySettingsPage />} />
              <Route path="/security/ip-restrictions" element={<SecuritySettingsPage />} />
              <Route path="/security/api-tokens" element={<HeadlessApiPage />} />
              <Route path="/logs/login" element={<AuditLogsPage />} />
              <Route path="/logs/activity" element={<AuditLogsPage />} />

              {/* System & Config */}
              <Route path="/system/settings" element={<GeneralSettingsPage />} />
              <Route path="/system/queue" element={<QueueManagerPage />} />
              <Route path="/system/cache" element={<QueueManagerPage />} />
              <Route path="/system/cron" element={<BackupsCronPage />} />
              <Route path="/system/backups" element={<BackupsCronPage />} />
              <Route path="/system/webhooks" element={<WebhooksPage />} />

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AppProvider>
  );
}
