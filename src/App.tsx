/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, WeightKey, Order, CartItem, WEIGHT_LABELS, calculateOriginalPrice } from './types.ts';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './data/defaultProducts.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { WeightSlider } from './components/WeightSlider.tsx';
import { ProductCard } from './components/ProductCard.tsx';
import { ProductPageModal } from './components/ProductPageModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { DirectBuyModal } from './components/DirectBuyModal.tsx';
import { AdminPanelModal } from './components/AdminPanelModal.tsx';
import { HeritageSection } from './components/HeritageSection.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { Sparkles, ShieldCheck, HeartHandshake, PhoneCall, Truck } from 'lucide-react';

export default function App() {
  // Products State with localStorage persistence (v3 ensures 2 Nan Khatai varieties & discounts take effect)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('dars_products_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to read dars_products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Orders State with localStorage persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('dars_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to read dars_orders from localStorage', e);
    }
    return INITIAL_ORDERS;
  });

  // Cart State with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dars_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to read dars_cart from localStorage', e);
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Dedicated Product Page State
  const [isProductPageOpen, setIsProductPageOpen] = useState(false);
  const [selectedProductForPage, setSelectedProductForPage] = useState<Product | null>(null);
  const [selectedProductPageWeight, setSelectedProductPageWeight] = useState<WeightKey>('halfKg');

  // Direct Buy Modal State
  const [isDirectBuyOpen, setIsDirectBuyOpen] = useState(false);
  const [activeProductForBuy, setActiveProductForBuy] = useState<Product | null>(null);
  const [activeWeightForBuy, setActiveWeightForBuy] = useState<WeightKey>('halfKg');
  const [activePriceForBuy, setActivePriceForBuy] = useState<number>(0);
  const [activeQuantityForBuy, setActiveQuantityForBuy] = useState<number>(1);

  // Google Sheets Web App URL with localStorage persistence
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('dars_google_sheets_url');
      if (saved) return saved;
    } catch (e) {
      console.warn('Failed to read dars_google_sheets_url', e);
    }
    return '';
  });

  // Admin Modal State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSyncingSheets, setIsSyncingSheets] = useState(false);

  // Save products whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('dars_products_v3', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  // Save orders whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('dars_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Save cart whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('dars_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Save Google Sheets URL
  const handleUpdateGoogleSheetsUrl = (url: string) => {
    setGoogleSheetsUrl(url);
    try {
      localStorage.setItem('dars_google_sheets_url', url);
    } catch (e) {
      console.error('Failed to save google sheets url', e);
    }
  };

  // Open Dedicated Product Page View
  const handleOpenProductPage = (product: Product, weight: WeightKey = 'halfKg') => {
    setSelectedProductForPage(product);
    setSelectedProductPageWeight(weight);
    setIsProductPageOpen(true);
  };

  // Open Direct Buy Modal
  const handleOpenDirectBuy = (
    product: Product,
    selectedWeight: WeightKey,
    price: number,
    quantity: number = 1
  ) => {
    setActiveProductForBuy(product);
    setActiveWeightForBuy(selectedWeight);
    setActivePriceForBuy(price);
    setActiveQuantityForBuy(quantity);
    setIsDirectBuyOpen(true);
  };

  // Add Item to Cart
  const handleAddToCart = (
    product: Product,
    selectedWeight: WeightKey,
    quantity: number = 1,
    unitPrice: number
  ) => {
    const cartItemId = `${product.id}-${selectedWeight}`;
    const weightLabel = WEIGHT_LABELS[selectedWeight];
    const discountPercent = product.discountPercent || (product.category === 'desiGhee' ? 25 : 20);
    const originalUnitPrice = calculateOriginalPrice(unitPrice, discountPercent);

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          productName: product.name,
          productImage: product.image,
          weightKey: selectedWeight,
          weightLabel,
          unitPrice,
          originalPrice: originalUnitPrice,
          quantity,
          totalPrice: quantity * unitPrice,
        };
        return [newItem, ...prev];
      }
    });

    setIsCartOpen(true);
  };

  // Cart item quantity update
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item from cart
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Proceed from Cart to Direct Checkout
  const handleProceedCartCheckout = () => {
    if (cartItems.length === 0) return;
    const firstItem = cartItems[0];
    const matchingProduct = products.find((p) => p.id === firstItem.productId) || products[0];
    setIsCartOpen(false);
    handleOpenDirectBuy(
      matchingProduct,
      firstItem.weightKey,
      firstItem.unitPrice,
      firstItem.quantity
    );
  };

  // Record a newly placed order from Direct Buy
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // If order was placed, clear cart if matching
    setCartItems([]);
  };

  // Update order status in Admin panel
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Clear orders
  const handleClearOrders = () => {
    setOrders([]);
  };

  // Reset products to defaults
  const handleResetProducts = () => {
    if (window.confirm('Reset all products and price rates back to original defaults?')) {
      setProducts(INITIAL_PRODUCTS);
    }
  };

  // Sync orders dynamically from Google Sheets Web App URL (doGet)
  const handleSyncGoogleSheets = async () => {
    if (!googleSheetsUrl || !googleSheetsUrl.startsWith('http')) {
      alert('Please configure a valid Google Apps Script Web App URL first.');
      return;
    }

    setIsSyncingSheets(true);
    try {
      const res = await fetch(googleSheetsUrl);
      const data = await res.json();
      if (data && Array.isArray(data.orders) && data.orders.length > 0) {
        setOrders((prev) => {
          const map = new Map<string, Order>();
          data.orders.forEach((o: Order) => map.set(o.id, o));
          prev.forEach((o) => {
            if (!map.has(o.id)) map.set(o.id, o);
          });
          return Array.from(map.values());
        });
        alert(`Successfully fetched ${data.orders.length} order(s) from your Google Sheet!`);
      } else {
        alert('Google Sheet responded, but no orders were found yet.');
      }
    } catch (err: any) {
      console.error('Error syncing with Google Sheets:', err);
      alert('Unable to sync from Google Sheet. Please check that your Apps Script is deployed as a Web App with access set to "Anyone".');
    } finally {
      setIsSyncingSheets(false);
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A1810] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#2A1810]">
      {/* Header with New Regal Crown Logo & Live Cart Button */}
      <Header
        onAdminClick={() => setIsAdminOpen(true)}
        onExploreClick={scrollToProducts}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Luxury Hero Banner */}
        <Hero onExploreClick={scrollToProducts} />

        {/* WEIGHTS SHOWCASE SLIDER (1 Pao, Half KG, 1 KG as 3 distinct single-item slides) */}
        <WeightSlider
          products={products}
          onOpenProductPage={(prod, weight) => handleOpenProductPage(prod, weight)}
          onDirectBuyItem={(prod, weight, price) => handleOpenDirectBuy(prod, weight, price, 1)}
          onAddToCartItem={(prod, weight, qty, price) => handleAddToCart(prod, weight, qty, price)}
        />

        {/* PRODUCTS SECTION: The 2 Nan Khatai Varieties (Simple & Desi Ghee) */}
        <section id="products-section" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#805008] text-xs font-cinzel font-bold tracking-widest uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Two Royal Confectionery Recipes</span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1810] tracking-tight">
              Almond Nan Khatai Varieties
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#5C4033] leading-relaxed max-w-2xl mx-auto">
              Choose between our <strong>Simple Classic Recipe</strong> and <strong>Royal Desi Ghee Recipe</strong>. Limited-time <strong>20% &amp; 25% discount</strong> on all sizes. Click any item to view photo gallery or order directly.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-[#805008] font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" /> Bykea Delivery (Rider actual fare on delivery)
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Whole Roasted Californian Almond on Every Cookie
              </span>
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-[#D4AF37]" /> WhatsApp Hotline: +92 315 2019373
              </span>
            </div>
          </div>

          {/* Product Cards Grid: 2 Clean Luxury Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-5xl mx-auto">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProductPage={(prod, weight) => handleOpenProductPage(prod, weight)}
                onDirectBuy={(prod, weight, price) => handleOpenDirectBuy(prod, weight, price, 1)}
                onAddToCart={(prod, weight, qty, price) => handleAddToCart(prod, weight, qty, price)}
              />
            ))}
          </div>
        </section>

        {/* Heritage & Recipe Craft Story */}
        <HeritageSection />

        {/* Patron Reviews */}
        <ReviewsSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Luxury Footer with Discreet Admin Login Button */}
      <Footer onAdminClick={() => setIsAdminOpen(true)} />

      {/* Floating WhatsApp Quick Order Button */}
      <FloatingWhatsApp />

      {/* DEDICATED PRODUCT PAGE MODAL (Gallery, Buy It Now, Add to Cart, WhatsApp) */}
      <ProductPageModal
        product={selectedProductForPage}
        isOpen={isProductPageOpen}
        onClose={() => setIsProductPageOpen(false)}
        initialWeight={selectedProductPageWeight}
        onBuyItNow={(prod, weight, qty, price) => {
          setIsProductPageOpen(false);
          handleOpenDirectBuy(prod, weight, price, qty);
        }}
        onAddToCart={(prod, weight, qty, price) => {
          handleAddToCart(prod, weight, qty, price);
        }}
      />

      {/* CART SLIDE-OVER DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedCartCheckout}
      />

      {/* Direct Buy Popup Modal Form with Bykea Fare Details */}
      <DirectBuyModal
        isOpen={isDirectBuyOpen}
        onClose={() => setIsDirectBuyOpen(false)}
        product={activeProductForBuy}
        selectedWeight={activeWeightForBuy}
        initialPrice={activePriceForBuy}
        initialQuantity={activeQuantityForBuy}
        onOrderSuccess={handleOrderSuccess}
        googleSheetsUrl={googleSheetsUrl}
      />

      {/* Admin Panel Modal Overlay (Discreet Password Protected: admin123) */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        orders={orders}
        onUpdateProducts={setProducts}
        onResetProducts={handleResetProducts}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onClearOrders={handleClearOrders}
        googleSheetsUrl={googleSheetsUrl}
        onUpdateGoogleSheetsUrl={handleUpdateGoogleSheetsUrl}
        onSyncGoogleSheets={handleSyncGoogleSheets}
        isSyncingSheets={isSyncingSheets}
      />
    </div>
  );
}
