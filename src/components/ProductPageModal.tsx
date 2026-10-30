import React, { useState } from 'react';
import { Product, WeightKey, WEIGHT_LABELS, calculateOriginalPrice } from '../types.ts';
import {
  X,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  MessageCircle,
  Truck,
  ShieldCheck,
  Check,
  ChevronLeft,
  ArrowRight,
  PackageCheck,
  Award,
} from 'lucide-react';

interface ProductPageModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onBuyItNow: (product: Product, weight: WeightKey, quantity: number, price: number) => void;
  onAddToCart: (product: Product, weight: WeightKey, quantity: number, price: number) => void;
  initialWeight?: WeightKey;
}

export const ProductPageModal: React.FC<ProductPageModalProps> = ({
  product,
  isOpen,
  onClose,
  onBuyItNow,
  onAddToCart,
  initialWeight = 'halfKg',
}) => {
  const [selectedWeight, setSelectedWeight] = useState<WeightKey>(initialWeight);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [addedToast, setAddedToast] = useState(false);

  React.useEffect(() => {
    if (initialWeight) setSelectedWeight(initialWeight);
    setQuantity(1);
    setSelectedImageIndex(0);
    setAddedToast(false);
  }, [product, initialWeight, isOpen]);

  if (!isOpen || !product) return null;

  const discountPercent = product.discountPercent || (product.category === 'desiGhee' ? 25 : 20);
  const currentUnitPrice = product.prices[selectedWeight];
  const totalPrice = currentUnitPrice * quantity;
  const originalUnitPrice = calculateOriginalPrice(currentUnitPrice, discountPercent);
  const originalTotalPrice = originalUnitPrice * quantity;
  const weightLabel = WEIGHT_LABELS[selectedWeight];

  // Gallery of photos
  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  const currentDisplayImage = galleryImages[selectedImageIndex] || product.image;

  // WhatsApp order link with exact required prefilled message:
  const whatsappMessage = `Hello Dar's Homemade! I want to order ${product.name} - ${weightLabel} (Qty: ${quantity}) for Rs. ${totalPrice}. Delivery via Bykea. Please guide me.`;
  const whatsappUrl = `https://wa.me/923152019373?text=${encodeURIComponent(whatsappMessage)}`;

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedWeight, quantity, currentUnitPrice);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#FAF7F2] border-2 border-[#D4AF37] shadow-2xl overflow-hidden my-4 flex flex-col max-h-[95vh]">
        {/* Top Luxury Gold Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#997A15]" />

        {/* Modal Top Bar */}
        <div className="px-5 py-3 bg-[#1F1209] text-[#FAF7F2] flex items-center justify-between border-b border-[#D4AF37]/30">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Treats</span>
          </button>

          <span className="font-cinzel text-xs text-[#D4AF37] uppercase tracking-widest hidden sm:inline">
            Dar&apos;s Homemade Treats • Product Details
          </span>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#FAF7F2] transition-colors cursor-pointer"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Image Gallery (Showing Authentic User Photos) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Active Image Frame */}
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#1F1209] border-2 border-[#D4AF37]/40 shadow-xl group">
                <img
                  src={currentDisplayImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* DISCOUNT BADGE ON IMAGE */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="px-3.5 py-1.5 rounded-full bg-red-700 border-2 border-[#FFF5C0] text-[#FFF5C0] shadow-lg flex items-center gap-1.5 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFF5C0]" />
                    <span className="font-cinzel text-xs font-black tracking-wider uppercase">
                      {product.discountPercent || (product.category === 'desiGhee' ? 25 : 20)}% OFF
                    </span>
                  </div>
                </div>

                {/* Real Homemade Photo Badge */}
                <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-md bg-[#140A06]/85 backdrop-blur-xs text-[10px] font-sans font-semibold text-[#FFF5C0] border border-[#D4AF37]/30">
                  📷 100% Original Photo of Our Baking
                </div>
              </div>

              {/* Thumbnails row (allows customer to switch angles) */}
              {galleryImages.length > 1 && (
                <div>
                  <div className="text-[11px] font-cinzel font-semibold text-[#805008] uppercase tracking-wider mb-2">
                    Explore All Photo Angles:
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          selectedImageIndex === idx
                            ? 'border-[#D4AF37] scale-105 shadow-md ring-2 ring-[#D4AF37]/40'
                            : 'border-transparent opacity-70 hover:opacity-100 hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bykea Delivery Highlight Box */}
              <div className="p-4 rounded-2xl bg-[#1F1209] text-[#FAF7F2] border border-[#D4AF37]/35 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FFF5C0]">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>On-Demand Delivery via Bykea (بائیکیا)</span>
                </div>
                <p className="text-[11px] text-[#FAF7F2]/80 leading-relaxed">
                  Delivery is dispatched through Bykea express riders. Bykea delivery charges are calculated on actual fare according to distance and paid directly to the Bykea rider upon delivery (jitnay Bykea ride charges hon).
                </p>
              </div>
            </div>

            {/* Right Column: Product Info & 3 Distinct Action Buttons */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#997A15] mb-1">
                  <span>{product.subtitle}</span>
                </div>

                <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2A1810] leading-tight">
                  {product.name}
                </h1>

                <p className="font-sans text-xs sm:text-sm text-[#4A3225] mt-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Weight Selection with Instant Dynamic Price Update */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border-2 border-[#D4AF37]/40 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase font-cinzel font-bold tracking-wider text-[#2A1810]">
                    Select Weight:
                  </label>
                  <span className="text-[11px] text-[#805008] font-semibold">
                    Instant Price Calculation
                  </span>
                </div>

                {/* Weight selection buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {(['pao', 'halfKg', 'oneKg'] as WeightKey[]).map((key) => {
                    const isSelected = selectedWeight === key;
                    const price = product.prices[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedWeight(key)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1F1209] text-[#FFF5C0] border-[#D4AF37] shadow-md'
                            : 'bg-[#FAF7F2] text-[#2A1810] border-[#D4AF37]/30 hover:border-[#D4AF37]'
                        }`}
                      >
                        <div className="text-xs font-bold">
                          {key === 'pao' ? '1 Pao (250g)' : key === 'halfKg' ? 'Half KG (500g)' : '1 KG (1000g)'}
                        </div>
                        <div className={`text-xs mt-1 font-cinzel font-bold ${isSelected ? 'text-[#D4AF37]' : 'text-[#805008]'}`}>
                          Rs. {price.toLocaleString()}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Quantity & Total Price Row */}
                <div className="pt-3 border-t border-[#D4AF37]/25 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-cinzel font-bold text-[#2A1810]">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-[#D4AF37]/50 rounded-lg overflow-hidden bg-[#FAF7F2]">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 text-sm font-bold text-[#805008] hover:bg-[#D4AF37]/10 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-[#2A1810]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 text-sm font-bold text-[#805008] hover:bg-[#D4AF37]/10 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-[10px] uppercase font-sans text-red-500 font-bold">Was:</span>
                      <span className="line-through text-red-500 font-bold text-xs">
                        Rs. {originalTotalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 justify-end">
                      <span className="text-xs text-[#805008] font-bold">Rs.</span>
                      <span className="font-cinzel text-2xl font-bold text-[#2A1810]">
                        {totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Added to cart notification */}
              {addedToast && (
                <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added {product.name} ({weightLabel} × {quantity}) to your cart!</span>
                  </div>
                </div>
              )}

              {/* THREE SPECIFIED ACTION BUTTONS: BUY IT NOW, ADD TO CART, WHATSAPP */}
              <div className="space-y-3 pt-2">
                {/* 1. BUY IT NOW BUTTON */}
                <button
                  type="button"
                  onClick={() => onBuyItNow(product, selectedWeight, quantity, currentUnitPrice)}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#B8860B] hover:brightness-110 active:scale-98 text-[#140A06] font-cinzel font-bold text-sm tracking-widest uppercase shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#140A06]" />
                  <span>Buy It Now (Rs. {totalPrice.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 2. ADD TO CART BUTTON */}
                  <button
                    type="button"
                    onClick={handleAddToCartClick}
                    className="py-3.5 px-4 rounded-xl bg-[#2A1810] hover:bg-[#1A0E0A] text-[#FFF5C0] font-cinzel font-bold text-xs uppercase tracking-wider border border-[#D4AF37]/50 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:border-[#D4AF37]"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#D4AF37]" />
                    <span>Add To Cart</span>
                  </button>

                  {/* 3. ORDER VIA WHATSAPP BUTTON */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-[#140A06] font-bold text-xs uppercase tracking-wider shadow-md shadow-[#25D366]/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-[#140A06]" />
                    <span>Order via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Pure Ingredients & Purity Assurance */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-[#805008] uppercase">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Artisanal Ingredients:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#4A3225]">
                  {product.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#D4AF37] shrink-0" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
