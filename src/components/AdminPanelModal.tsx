import React, { useState } from 'react';
import { Product, Order, WeightKey } from '../types.ts';
import {
  X,
  Lock,
  Package,
  ListOrdered,
  Save,
  RotateCcw,
  RefreshCw,
  Download,
  ExternalLink,
  CheckCircle2,
  Clock,
  Truck,
  Check,
  Copy,
  AlertCircle,
  HelpCircle,
  Search,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  onUpdateProducts: (updated: Product[]) => void;
  onResetProducts: () => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onClearOrders: () => void;
  googleSheetsUrl: string;
  onUpdateGoogleSheetsUrl: (url: string) => void;
  onSyncGoogleSheets: () => Promise<void>;
  isSyncingSheets: boolean;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  onUpdateProducts,
  onResetProducts,
  onUpdateOrderStatus,
  onClearOrders,
  googleSheetsUrl,
  onUpdateGoogleSheetsUrl,
  onSyncGoogleSheets,
  isSyncingSheets,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab: 'products' | 'orders' | 'guide'
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'guide'>('products');

  // Product edits local state
  const [editableProducts, setEditableProducts] = useState<Product[]>(products);
  const [productSaveSuccess, setProductSaveSuccess] = useState(false);

  // Order filters
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');

  // Temporary sheet URL state
  const [tempSheetUrl, setTempSheetUrl] = useState(googleSheetsUrl);
  const [sheetSaveSuccess, setSheetSaveSuccess] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  React.useEffect(() => {
    setEditableProducts(products);
  }, [products]);

  React.useEffect(() => {
    setTempSheetUrl(googleSheetsUrl);
  }, [googleSheetsUrl]);

  if (!isOpen) return null;

  // Handle Admin Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. Password is: admin123');
    }
  };

  // Handle Product Field Change
  const handleProductChange = (index: number, field: keyof Product, value: any) => {
    const updated = [...editableProducts];
    updated[index] = { ...updated[index], [field]: value };
    setEditableProducts(updated);
  };

  // Handle Product Price Change
  const handlePriceChange = (index: number, weightKey: WeightKey, value: number) => {
    const updated = [...editableProducts];
    updated[index] = {
      ...updated[index],
      prices: {
        ...updated[index].prices,
        [weightKey]: isNaN(value) ? 0 : value,
      },
    };
    setEditableProducts(updated);
  };

  // Save Products to localStorage
  const handleSaveProducts = () => {
    onUpdateProducts(editableProducts);
    setProductSaveSuccess(true);
    setTimeout(() => setProductSaveSuccess(false), 3000);
  };

  // Save Google Sheets URL
  const handleSaveSheetUrl = () => {
    onUpdateGoogleSheetsUrl(tempSheetUrl.trim());
    setSheetSaveSuccess(true);
    setTimeout(() => setSheetSaveSuccess(false), 3000);
  };

  // Export Orders as CSV
  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Phone Number',
      'Destination City',
      'Full Address',
      'Product',
      'Weight',
      'Quantity',
      'Unit Price',
      'Total Amount (Rs)',
      'Status',
      'Special Notes',
    ];

    const rows = orders.map((o) => [
      `"${o.id}"`,
      `"${o.createdAt}"`,
      `"${o.customerName}"`,
      `"${o.phoneNumber}"`,
      `"${o.city}"`,
      `"${o.address.replace(/"/g, '""')}"`,
      `"${o.productName}"`,
      `"${o.weightLabel}"`,
      o.quantity,
      o.unitPrice,
      o.totalPrice,
      `"${o.status}"`,
      `"${(o.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Dars_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Google Apps Script source code template for 1-click copy
  const googleAppsScriptCode = `/**
 * Google Apps Script for "Dar's Homemade Treats"
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. In row 1, set headers: Order ID | Date | Customer Name | Phone | Address | City | Product | Weight | Quantity | Total Price | Notes | Status
 * 3. Click Extensions > Apps Script
 * 4. Paste this exact code, replacing any default code.
 * 5. Click "Deploy" > "New deployment" > Select type: "Web app"
 * 6. Set Description: "Dar's Treats Order API"
 * 7. Set "Execute as": "Me"
 * 8. Set "Who has access": "Anyone"
 * 9. Click "Deploy", authorize permissions, and copy the Web App URL.
 * 10. Paste the Web App URL in Dar's Treats Admin Panel!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.orderId || "DAR-" + Math.floor(1000 + Math.random() * 9000),
      data.timestamp || new Date().toLocaleString(),
      data.customerName || "",
      data.phoneNumber || "",
      data.address || "",
      data.city || "",
      data.productName || "",
      data.weight || "",
      data.quantity || 1,
      data.totalPrice || 0,
      data.notes || "",
      data.status || "Pending"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Order placed successfully"
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var orders = [];
    
    // Assumes row 0 is the headers
    for (var i = 1; i < rows.length; i++) {
      var r = rows[i];
      if (!r[0]) continue;
      orders.push({
        id: String(r[0]),
        createdAt: String(r[1]),
        customerName: String(r[2]),
        phoneNumber: String(r[3]),
        address: String(r[4]),
        city: String(r[5]),
        productName: String(r[6]),
        weightLabel: String(r[7]),
        quantity: Number(r[8]) || 1,
        totalPrice: Number(r[9]) || 0,
        notes: String(r[10] || ""),
        status: String(r[11] || "Pending"),
        source: "Google Sheets"
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      orders: orders
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: err.toString(),
      orders: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.phoneNumber.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.city.toLowerCase().includes(orderSearchQuery.toLowerCase());

    const matchesStatus =
      orderStatusFilter === 'All' || order.status === orderStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl rounded-3xl bg-[#FAF7F2] border-2 border-[#D4AF37] shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        {/* Top Gold Foil Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#997A15]" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#1F1209] text-[#FAF7F2] border-b border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#D4AF37] bg-[#2A1810] flex items-center justify-center text-[#D4AF37] font-cinzel font-bold">
              D
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#FFF5C0]">
                  Dar&apos;s Treats Admin Dashboard
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-semibold uppercase tracking-wider">
                  Secure Portal
                </span>
              </div>
              <p className="text-xs text-[#FAF7F2]/70 font-sans">
                Manage product pricing, weight variations, sales badges &amp; Google Sheets order history
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#FAF7F2] transition-colors cursor-pointer"
            aria-label="Close Admin Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AUTH CHECK: LOGIN FORM IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6 my-auto">
            <div className="w-16 h-16 rounded-full bg-[#1F1209] border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-lg text-[#D4AF37]">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-playfair text-2xl font-bold text-[#2A1810]">
                Administrator Authentication
              </h3>
              <p className="text-xs text-[#6B4E3D]">
                Enter master password to access product catalog controls and customer orders log.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter Password (admin123)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#FFFDF9] border-2 border-[#D4AF37]/50 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-center text-sm font-semibold text-[#2A1810] shadow-sm outline-none transition-all placeholder:text-[#2A1810]/40"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="p-2.5 rounded-lg bg-red-100 border border-red-300 text-red-800 text-xs font-semibold">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#B8860B] hover:brightness-110 active:scale-98 text-[#1A0E0A] font-cinzel font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer"
              >
                Unlock Admin Dashboard
              </button>

              <div className="text-[11px] text-[#805008] bg-[#FAF7F2] p-2.5 rounded-lg border border-[#D4AF37]/30">
                Default credentials for testing: <span className="font-bold underline">admin123</span>
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED: TABS & CONTROLS */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs Header */}
            <div className="bg-[#170C06] px-6 pt-3 border-b border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs font-cinzel font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'products'
                      ? 'bg-[#FAF7F2] text-[#2A1810] border-t-2 border-[#D4AF37] shadow-lg'
                      : 'text-[#FAF7F2]/70 hover:text-[#D4AF37] hover:bg-[#2A1810]/50'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Tab 1: Manage Products</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs font-cinzel font-bold uppercase tracking-wider transition-all cursor-pointer relative ${
                    activeTab === 'orders'
                      ? 'bg-[#FAF7F2] text-[#2A1810] border-t-2 border-[#D4AF37] shadow-lg'
                      : 'text-[#FAF7F2]/70 hover:text-[#D4AF37] hover:bg-[#2A1810]/50'
                  }`}
                >
                  <ListOrdered className="w-4 h-4" />
                  <span>Tab 2: Order History</span>
                  {orders.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#D4AF37] text-[#1A0E0A] text-[10px] font-bold">
                      {orders.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('guide')}
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-t-xl text-xs font-cinzel font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'guide'
                      ? 'bg-[#FAF7F2] text-[#2A1810] border-t-2 border-[#D4AF37] shadow-lg'
                      : 'text-[#FAF7F2]/70 hover:text-[#D4AF37] hover:bg-[#2A1810]/50'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
                  <span>Google Sheets Setup Guide</span>
                </button>
              </div>

              {/* Quick Summary Pill */}
              <div className="hidden md:flex items-center gap-4 text-xs text-[#FAF7F2]/80 pb-2">
                <div>
                  Orders: <span className="text-[#D4AF37] font-bold">{orders.length}</span>
                </div>
                <div>
                  Revenue: <span className="text-[#D4AF37] font-bold">Rs. {totalRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* TAB CONTENTS */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* ============================================================== */}
              {/* TAB 1: MANAGE PRODUCTS */}
              {/* ============================================================== */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-[#FFFDF9] p-4 rounded-2xl border border-[#D4AF37]/30 shadow-sm">
                    <div>
                      <h3 className="font-playfair text-lg font-bold text-[#2A1810]">
                        Artisanal Products Catalog
                      </h3>
                      <p className="text-xs text-[#6B4E3D]">
                        Edit pricing for 1 Pao, Half KG, and 1 KG weights. Changes are saved to localStorage and immediately reflect on all store cards.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={onResetProducts}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 text-xs font-medium transition-colors cursor-pointer"
                        title="Restore default product data"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Defaults</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveProducts}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#B8860B] hover:brightness-110 active:scale-95 text-[#1A0E0A] font-cinzel font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save All Changes</span>
                      </button>
                    </div>
                  </div>

                  {productSaveSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Products and weight rates updated successfully in localStorage!</span>
                    </div>
                  )}

                  {/* Product Edit Cards */}
                  <div className="space-y-6">
                    {editableProducts.map((prod, idx) => (
                      <div
                        key={prod.id}
                        className="p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] border-2 border-[#D4AF37]/40 shadow-md space-y-5"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#D4AF37]/20">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-full bg-[#1F1209] text-[#D4AF37] font-cinzel text-xs font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <div className="font-playfair text-lg font-bold text-[#2A1810]">
                              {prod.name}
                            </div>
                          </div>

                          {/* Discount Percentage control */}
                          <div className="flex items-center gap-2 text-xs font-medium text-[#2A1810]">
                            <span className="font-bold text-[#805008]">Discount %:</span>
                            <input
                              type="number"
                              min="0"
                              max="90"
                              value={prod.discountPercent || 20}
                              onChange={(e) => handleProductChange(idx, 'discountPercent', parseInt(e.target.value) || 20)}
                              className="w-16 bg-[#FAF7F2] border border-[#D4AF37]/50 rounded-lg px-2 py-1 text-xs font-bold text-[#2A1810] text-center"
                            />
                            <span className="font-bold text-[#D4AF37]">% OFF</span>
                          </div>
                        </div>

                        {/* Editable Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase font-cinzel font-bold text-[#2A1810] mb-1">
                              Product Name
                            </label>
                            <input
                              type="text"
                              value={prod.name}
                              onChange={(e) => handleProductChange(idx, 'name', e.target.value)}
                              className="w-full bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-sm text-[#2A1810] font-semibold outline-none focus:border-[#D4AF37]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs uppercase font-cinzel font-bold text-[#2A1810] mb-1">
                              Discount Badge Text (Displayed on Image)
                            </label>
                            <div className="flex gap-2">
                              <select
                                value={prod.badge}
                                onChange={(e) => handleProductChange(idx, 'badge', e.target.value)}
                                className="w-full bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-xs text-[#2A1810] font-semibold outline-none focus:border-[#D4AF37] cursor-pointer"
                              >
                                <option value="20% OFF">20% OFF</option>
                                <option value="25% OFF">25% OFF</option>
                                <option value="30% OFF">30% OFF</option>
                                <option value="Limited Offer">Limited Offer</option>
                              </select>
                              <input
                                type="text"
                                placeholder="Custom"
                                value={prod.badge}
                                onChange={(e) => handleProductChange(idx, 'badge', e.target.value)}
                                className="w-32 bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-xl px-2 py-2 text-xs text-[#2A1810] outline-none"
                              />
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs uppercase font-cinzel font-bold text-[#2A1810] mb-1">
                              Product Description
                            </label>
                            <textarea
                              rows={2}
                              value={prod.description}
                              onChange={(e) => handleProductChange(idx, 'description', e.target.value)}
                              className="w-full bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs text-[#2A1810] outline-none focus:border-[#D4AF37] resize-none"
                            />
                          </div>
                        </div>

                        {/* RATES FOR ALL 3 WEIGHTS */}
                        <div>
                          <label className="block text-xs uppercase font-cinzel font-bold tracking-wider text-[#997A15] mb-2">
                            Weight Pricing Rates (Pakistani Rupees - Rs.)
                          </label>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* 1 Pao (250g) */}
                            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-1">
                              <div className="text-[11px] font-cinzel font-semibold text-[#2A1810]">
                                1 Pao (250g)
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-[#997A15] font-bold">Rs.</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="50"
                                  value={prod.prices.pao}
                                  onChange={(e) => handlePriceChange(idx, 'pao', parseFloat(e.target.value))}
                                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/40 rounded-lg px-2.5 py-1 text-sm font-bold text-[#2A1810] outline-none focus:border-[#D4AF37]"
                                />
                              </div>
                            </div>

                            {/* Half KG (500g) */}
                            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-1">
                              <div className="text-[11px] font-cinzel font-semibold text-[#2A1810]">
                                Half KG (500g)
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-[#997A15] font-bold">Rs.</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="50"
                                  value={prod.prices.halfKg}
                                  onChange={(e) => handlePriceChange(idx, 'halfKg', parseFloat(e.target.value))}
                                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/40 rounded-lg px-2.5 py-1 text-sm font-bold text-[#2A1810] outline-none focus:border-[#D4AF37]"
                                />
                              </div>
                            </div>

                            {/* 1 KG (1000g) */}
                            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-1">
                              <div className="text-[11px] font-cinzel font-semibold text-[#2A1810]">
                                1 KG (1000g)
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-[#997A15] font-bold">Rs.</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="50"
                                  value={prod.prices.oneKg}
                                  onChange={(e) => handlePriceChange(idx, 'oneKg', parseFloat(e.target.value))}
                                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/40 rounded-lg px-2.5 py-1 text-sm font-bold text-[#2A1810] outline-none focus:border-[#D4AF37]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* TAB 2: ORDER HISTORY & GOOGLE SHEETS */}
              {/* ============================================================== */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  {/* Google Sheets API Config Bar */}
                  <div className="p-4 rounded-2xl bg-[#1F1209] text-[#FAF7F2] border border-[#D4AF37]/40 shadow-md space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-cinzel font-bold text-sm text-[#FFF5C0]">
                          Google Sheets Web App Integration
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('guide')}
                        className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>How to get Google Sheets Web App URL</span>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="url"
                        placeholder="Paste your Google Apps Script Web App URL (https://script.google.com/macros/s/.../exec)"
                        value={tempSheetUrl}
                        onChange={(e) => setTempSheetUrl(e.target.value)}
                        className="flex-1 bg-[#140A06] border border-[#D4AF37]/40 focus:border-[#D4AF37] rounded-xl px-4 py-2 text-xs text-[#FAF7F2] placeholder:text-[#FAF7F2]/40 outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleSaveSheetUrl}
                        className="px-4 py-2 rounded-xl bg-[#2A1810] hover:bg-[#3D2314] border border-[#D4AF37]/50 text-xs font-semibold text-[#FFF5C0] cursor-pointer"
                      >
                        Save URL
                      </button>
                      <button
                        type="button"
                        onClick={onSyncGoogleSheets}
                        disabled={isSyncingSheets || !tempSheetUrl}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#B8860B] text-[#1A0E0A] text-xs font-bold font-cinzel cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSyncingSheets ? 'animate-spin' : ''}`} />
                        <span>{isSyncingSheets ? 'Fetching...' : 'Fetch from Sheet'}</span>
                      </button>
                    </div>

                    {sheetSaveSuccess && (
                      <div className="text-xs text-emerald-400 font-medium">
                        ✓ Google Apps Script URL saved. Orders submitted via &quot;Direct Buy&quot; will now push to your sheet!
                      </div>
                    )}
                  </div>

                  {/* Summary Metric Counters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#D4AF37]/30 text-center">
                      <div className="text-xs uppercase tracking-wider text-[#6B4E3D] font-medium">Total Orders</div>
                      <div className="font-cinzel text-2xl font-bold text-[#2A1810] mt-1">{orders.length}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#D4AF37]/30 text-center">
                      <div className="text-xs uppercase tracking-wider text-[#6B4E3D] font-medium">Total Volume</div>
                      <div className="font-cinzel text-2xl font-bold text-[#805008] mt-1">Rs. {totalRevenue.toLocaleString()}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#D4AF37]/30 text-center">
                      <div className="text-xs uppercase tracking-wider text-amber-700 font-medium">Pending Orders</div>
                      <div className="font-cinzel text-2xl font-bold text-amber-800 mt-1">{pendingCount}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#D4AF37]/30 text-center">
                      <div className="text-xs uppercase tracking-wider text-emerald-700 font-medium">Delivered</div>
                      <div className="font-cinzel text-2xl font-bold text-emerald-800 mt-1">{deliveredCount}</div>
                    </div>
                  </div>

                  {/* Search, Filter & Actions Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFFDF9] p-3.5 rounded-2xl border border-[#D4AF37]/30">
                    <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                      <Search className="w-4 h-4 text-[#805008]" />
                      <input
                        type="text"
                        placeholder="Search by customer name, phone, order ID, or city..."
                        value={orderSearchQuery}
                        onChange={(e) => setOrderSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-none text-xs text-[#2A1810] outline-none placeholder:text-[#2A1810]/40"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={orderStatusFilter}
                        onChange={(e) => setOrderStatusFilter(e.target.value)}
                        className="bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-xl px-3 py-1.5 text-xs text-[#2A1810] font-semibold cursor-pointer outline-none"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>

                      <button
                        type="button"
                        onClick={handleExportCSV}
                        disabled={orders.length === 0}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1F1209] hover:bg-[#2A1810] text-[#D4AF37] text-xs font-semibold cursor-pointer disabled:opacity-40"
                        title="Download CSV spreadsheet"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>

                      {orders.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to clear local order logs?')) {
                              onClearOrders();
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-medium cursor-pointer"
                        >
                          Clear Log
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Orders Table */}
                  <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#FFFDF9] overflow-hidden shadow-sm">
                    {filteredOrders.length === 0 ? (
                      <div className="p-12 text-center text-[#6B4E3D] space-y-2">
                        <ListOrdered className="w-10 h-10 mx-auto text-[#D4AF37]/60" />
                        <div className="font-playfair text-lg font-bold text-[#2A1810]">
                          No Orders Found
                        </div>
                        <p className="text-xs">
                          {orderSearchQuery
                            ? 'No orders match your filter criteria.'
                            : 'Orders submitted via the Direct Buy button will automatically appear here.'}
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[#1F1209] text-[#FFF5C0] font-cinzel uppercase tracking-wider text-[11px] border-b border-[#D4AF37]/30">
                              <th className="py-3 px-4">Order ID &amp; Time</th>
                              <th className="py-3 px-4">Customer</th>
                              <th className="py-3 px-4">Location / Address</th>
                              <th className="py-3 px-4">Product &amp; Weight</th>
                              <th className="py-3 px-4">Amount</th>
                              <th className="py-3 px-4">Status</th>
                              <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#D4AF37]/15 text-[#2A1810]">
                            {filteredOrders.map((order) => {
                              const customerWhatsappUrl = `https://wa.me/${order.phoneNumber.replace(
                                /\D/g,
                                ''
                              )}?text=${encodeURIComponent(
                                `Hello ${order.customerName}! This is Dar's Homemade Treats regarding your Order #${order.id}.`
                              )}`;

                              return (
                                <tr key={order.id} className="hover:bg-[#FAF7F2]/80 transition-colors">
                                  {/* ID & Date */}
                                  <td className="py-3.5 px-4 font-mono">
                                    <div className="font-bold text-[#805008]">{order.id}</div>
                                    <div className="text-[10px] text-[#6B4E3D]">{order.createdAt}</div>
                                  </td>

                                  {/* Customer */}
                                  <td className="py-3.5 px-4">
                                    <div className="font-bold text-[#2A1810]">{order.customerName}</div>
                                    <div className="text-[11px] text-[#6B4E3D]">{order.phoneNumber}</div>
                                  </td>

                                  {/* Location */}
                                  <td className="py-3.5 px-4 max-w-[200px]">
                                    <span className="font-semibold text-[#805008] bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#D4AF37]/20 text-[10px]">
                                      {order.city}
                                    </span>
                                    <p className="text-[11px] text-[#4A3225] line-clamp-1 mt-0.5" title={order.address}>
                                      {order.address}
                                    </p>
                                  </td>

                                  {/* Product */}
                                  <td className="py-3.5 px-4">
                                    <div className="font-semibold text-[#2A1810] line-clamp-1">
                                      {order.productName}
                                    </div>
                                    <div className="text-[11px] text-[#805008]">
                                      {order.weightLabel} × {order.quantity}
                                    </div>
                                  </td>

                                  {/* Price */}
                                  <td className="py-3.5 px-4 whitespace-nowrap">
                                    <span className="font-cinzel font-bold text-sm text-[#2A1810]">
                                      Rs. {order.totalPrice.toLocaleString()}
                                    </span>
                                  </td>

                                  {/* Status Selector */}
                                  <td className="py-3.5 px-4 whitespace-nowrap">
                                    <select
                                      value={order.status}
                                      onChange={(e) =>
                                        onUpdateOrderStatus(order.id, e.target.value as Order['status'])
                                      }
                                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer outline-none ${
                                        order.status === 'Pending'
                                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                                          : order.status === 'Confirmed'
                                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                                          : order.status === 'Dispatched'
                                          ? 'bg-purple-50 text-purple-800 border-purple-300'
                                          : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                      }`}
                                    >
                                      <option value="Pending">Pending</option>
                                      <option value="Confirmed">Confirmed</option>
                                      <option value="Dispatched">Dispatched</option>
                                      <option value="Delivered">Delivered</option>
                                    </select>
                                  </td>

                                  {/* Actions */}
                                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                    <a
                                      href={customerWhatsappUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#140A06] text-[11px] font-medium"
                                      title="Message customer on WhatsApp"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                                      <span>Message</span>
                                    </a>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* TAB 3: GOOGLE SHEETS SETUP GUIDE */}
              {/* ============================================================== */}
              {activeTab === 'guide' && (
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                        <h3 className="font-playfair text-xl font-bold text-[#2A1810]">
                          How to Connect &quot;Direct Buy&quot; to a Free Google Sheet (2 Minutes)
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={copyScriptToClipboard}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#B8860B] text-[#1A0E0A] font-cinzel font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
                      >
                        {copiedScript ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedScript ? 'Code Copied!' : '1-Click Copy Apps Script Code'}</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#5C4033] leading-relaxed">
                      You can store every direct purchase in your personal Google Sheet at zero hosting cost using Google Apps Script. Follow these simple steps:
                    </p>

                    {/* Step-by-step instructions */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-2">
                        <div className="w-6 h-6 rounded-full bg-[#1F1209] text-[#D4AF37] font-bold text-xs flex items-center justify-center">1</div>
                        <h4 className="font-bold text-xs text-[#2A1810]">Create Google Sheet</h4>
                        <p className="text-[11px] text-[#6B4E3D]">
                          Go to <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-[#805008] underline font-bold">sheets.new</a>. Label column headers in Row 1: Order ID, Date, Name, Phone, Address, City, Product, Weight, Quantity, Total Price, Notes, Status.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-2">
                        <div className="w-6 h-6 rounded-full bg-[#1F1209] text-[#D4AF37] font-bold text-xs flex items-center justify-center">2</div>
                        <h4 className="font-bold text-xs text-[#2A1810]">Open Apps Script</h4>
                        <p className="text-[11px] text-[#6B4E3D]">
                          In the Google Sheet menu, click <strong>Extensions &gt; Apps Script</strong>. Delete any code inside Code.gs.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-2">
                        <div className="w-6 h-6 rounded-full bg-[#1F1209] text-[#D4AF37] font-bold text-xs flex items-center justify-center">3</div>
                        <h4 className="font-bold text-xs text-[#2A1810]">Paste &amp; Deploy</h4>
                        <p className="text-[11px] text-[#6B4E3D]">
                          Click <strong>&quot;Deploy&quot; &gt; &quot;New deployment&quot;</strong>. Select <strong>Web App</strong>. Set &quot;Execute as: Me&quot; and &quot;Who has access: Anyone&quot;. Click Deploy.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-2">
                        <div className="w-6 h-6 rounded-full bg-[#1F1209] text-[#D4AF37] font-bold text-xs flex items-center justify-center">4</div>
                        <h4 className="font-bold text-xs text-[#2A1810]">Paste URL in Admin</h4>
                        <p className="text-[11px] text-[#6B4E3D]">
                          Copy the Web App URL (ending in <code className="bg-amber-100 px-1 py-0.5 rounded">/exec</code>) and paste it into Tab 2 of this Admin Panel!
                        </p>
                      </div>
                    </div>

                    {/* Code snippet display */}
                    <div className="pt-3">
                      <div className="flex items-center justify-between text-xs font-mono text-[#D4AF37] bg-[#140A06] px-4 py-2 rounded-t-xl border-t border-x border-[#D4AF37]/30">
                        <span>GoogleAppsScript_Code.gs</span>
                        <button
                          type="button"
                          onClick={copyScriptToClipboard}
                          className="hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedScript ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <pre className="p-4 bg-[#1F1209] text-[#FAF7F2]/90 rounded-b-xl text-[11px] font-mono overflow-x-auto max-h-72 border-b border-x border-[#D4AF37]/30">
                        {googleAppsScriptCode}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
