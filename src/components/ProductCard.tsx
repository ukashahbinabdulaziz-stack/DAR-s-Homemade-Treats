import React, { useState } from 'react';
import { Product, WeightKey, WEIGHT_LABELS, calculateOriginalPrice } from '../types.ts';
import { MessageCircle, ShoppingBag, ShoppingCart, Sparkles, ChevronDown, Truck, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenProductPage: (product: Product, selectedWeight: WeightKey) => void;
  onDirectBuy: (product: Product, selectedWeight: WeightKey, price: number) => void;
  onAddToCart: (product: Product, selectedWeight: WeightKey, quantity: number, price: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenProductPage,
  onDirectBuy,
  onAddToCart,
}) => {
  const [selectedWeight, setSelectedWeight] = useState<WeightKey>('halfKg');

  const currentPrice = product.prices[selectedWeight];
  const discountPercent = product.discountPercent || (product.category === 'desiGhee' ? 25 : 20);
  const originalPrice = calculateOriginalPrice(currentPrice, discountPercent);
  const selectedWeightLabel = WEIGHT_LABELS[selectedWeight];

  // WhatsApp order link
  const whatsappMessage = `Hello Dar's Homemade! I want to order ${product.name} - ${selectedWeightLabel} for discounted price of Rs. ${currentPrice} (Original Rs. ${originalPrice}). Delivery via Bykea. Please guide me.`;
  const whatsappUrl = `https://wa.me/923152019373?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      onClick={() => onOpenProductPage(product, selectedWeight)}
      className="relative group bg-[#FAF7F2] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/35 shadow-xl hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container with 20% or 25% DISCOUNT BADGE */}
      <div className="relative h-72 overflow-hidden bg-[#2A1810]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1209]/80 via-transparent to-black/20 pointer-events-none" />

        {/* 20% or 25% OFF DISCOUNT BADGE (Replacing pure homemade/best seller as requested) */}
        <div className="absolute top-4 left-4 z-10">
          <div className="relative px-3.5 py-1.5 rounded-full bg-red-700 border-2 border-[#FFF5C0] text-[#FFF5C0] shadow-lg flex items-center gap-1.5 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-[#FFF5C0]" />
            <span className="font-cinzel text-xs font-black tracking-wider uppercase">
              {discountPercent}% OFF
            </span>
          </div>
        </div>

        {/* Hover Click To View Product Details Cue */}
        <div className="absolute inset-0 bg-[#120804]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="px-4 py-2 rounded-full bg-[#1A0E0A]/90 border border-[#D4AF37] text-xs font-cinzel font-bold text-[#FFF5C0] flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-4 h-4 text-[#D4AF37]" />
            <span>Click to View Full Product Page</span>
          </div>
        </div>

        {/* Bykea Delivery Tag */}
        <div className="absolute bottom-3 right-4 z-10 text-[10px] font-sans text-emerald-300 bg-[#140A06]/85 backdrop-blur-xs px-2.5 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1">
          <Truck className="w-3 h-3 text-emerald-400" />
          <span>Bykea Delivery (Actual Fare)</span>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#FAF7F2] to-[#F5EFEB]">
        <div>
          {/* Subtitle / Category - Note: inStock removed as requested */}
          <div className="flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-[#997A15] mb-1">
            <span>{product.subtitle}</span>
            <span className="text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
              Limited Offer
            </span>
          </div>

          {/* Title */}
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#2A1810] tracking-tight group-hover:text-[#805008] transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Description */}
          <p className="font-sans text-xs sm:text-sm text-[#4A3225] mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-2 text-[11px] font-semibold text-[#805008] underline flex items-center gap-1">
            <span>View photo gallery &amp; reviews</span>
            <span>&rarr;</span>
          </div>
        </div>

        {/* Weight Selection & Pricing Section */}
        <div
          className="mt-5 pt-4 border-t border-[#D4AF37]/25 space-y-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] uppercase font-cinzel font-bold tracking-wider text-[#2A1810]">
                Select Weight:
              </label>
              <span className="text-[10px] text-[#805008] font-medium">
                Instant Price
              </span>
            </div>

            {/* Dropdown for weight */}
            <div className="relative">
              <select
                value={selectedWeight}
                onChange={(e) => setSelectedWeight(e.target.value as WeightKey)}
                className="w-full appearance-none bg-[#FFFDF9] border border-[#D4AF37]/50 focus:border-[#D4AF37] rounded-xl py-2 px-3 pr-8 text-xs font-semibold text-[#2A1810] shadow-xs outline-none cursor-pointer"
              >
                <option value="pao">1 Pao (250g) — Rs. {product.prices.pao.toLocaleString()}</option>
                <option value="halfKg">Half KG (500g) — Rs. {product.prices.halfKg.toLocaleString()}</option>
                <option value="oneKg">1 KG (1000g) — Rs. {product.prices.oneKg.toLocaleString()}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#997A15] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Quick-toggle pill chips */}
            <div className="grid grid-cols-3 gap-1.5 mt-2">
              {(['pao', 'halfKg', 'oneKg'] as WeightKey[]).map((key) => {
                const isActive = selectedWeight === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedWeight(key)}
                    className={`py-1 px-1.5 text-[11px] rounded-lg font-medium transition-all text-center border cursor-pointer ${
                      isActive
                        ? 'bg-[#1F1209] text-[#E5C365] border-[#D4AF37] shadow-xs font-bold'
                        : 'bg-[#FFFDF9] text-[#4A3225] border-[#D4AF37]/25 hover:border-[#D4AF37]'
                    }`}
                  >
                    {key === 'pao' ? '1 Pao' : key === 'halfKg' ? 'Half KG' : '1 KG'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC PRICE DISPLAY: CROSSED-OUT ORIGINAL PRICE + SALE PRICE */}
          <div className="bg-[#1F1209] p-3 rounded-xl border border-[#D4AF37]/40 shadow-inner space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#FAF7F2]/60">
              <span>Original Rate:</span>
              <span className="line-through text-red-400 font-bold">
                Rs. {originalPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1 border-t border-[#D4AF37]/20">
              <div className="text-[11px] text-[#FAF7F2]/90 uppercase font-cinzel">
                {selectedWeightLabel} ({discountPercent}% OFF):
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-semibold text-[#D4AF37]">Rs.</span>
                <span className="text-xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C0] via-[#E5C365] to-[#D4AF37]">
                  {currentPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons: Direct Buy + WhatsApp + Add To Cart */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Chat & Order WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-[#140A06] font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
              title="Order directly via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#140A06]" />
              <span>WhatsApp</span>
            </a>

            {/* Direct Buy */}
            <button
              type="button"
              onClick={() => onDirectBuy(product, selectedWeight, currentPrice)}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#B8860B] hover:brightness-110 active:scale-95 text-[#1F1209] font-cinzel font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#1F1209]" />
              <span>Direct Buy</span>
            </button>
          </div>

          {/* Add to Cart quick button */}
          <button
            type="button"
            onClick={() => onAddToCart(product, selectedWeight, 1, currentPrice)}
            className="w-full py-2 px-3 rounded-xl bg-[#2A1810]/10 hover:bg-[#2A1810]/20 border border-[#D4AF37]/40 text-[#2A1810] text-xs font-cinzel font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-[#805008]" />
            <span>Add To Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
