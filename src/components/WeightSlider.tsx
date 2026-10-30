import React, { useState, useEffect } from 'react';
import { WeightKey, Product, calculateOriginalPrice } from '../types.ts';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ShoppingCart,
  MessageCircle,
  Truck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface WeightSliderProps {
  products: Product[];
  onOpenProductPage: (product: Product, weight: WeightKey) => void;
  onDirectBuyItem: (product: Product, weight: WeightKey, price: number) => void;
  onAddToCartItem: (product: Product, weight: WeightKey, quantity: number, price: number) => void;
}

export const WeightSlider: React.FC<WeightSliderProps> = ({
  products,
  onOpenProductPage,
  onDirectBuyItem,
  onAddToCartItem,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'simple' | 'desiGhee'>('simple');
  const [isHovered, setIsHovered] = useState(false);

  // 3 distinct single-item slides (1 Pao, Half KG, 1 KG)
  const slides = [
    {
      weightKey: 'pao' as WeightKey,
      title: '1 Pao (250 Grams) Pack',
      portion: 'Fresh Small Batch (~7 to 8 Pieces)',
      subtitle: 'Single portion / trial pack with whole roasted almond',
      discount: 20,
      image: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_11.19.13_PM__1__efe2856a.jpeg',
    },
    {
      weightKey: 'halfKg' as WeightKey,
      title: 'Half KG (500 Grams) Box',
      portion: 'Family Sharing Box (~15 to 16 Pieces)',
      subtitle: 'Most popular family tea-time indulgence',
      discount: 20,
      image: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_11.19.13_PM_e0f68e8e.jpeg',
    },
    {
      weightKey: 'oneKg' as WeightKey,
      title: '1 KG (1000 Grams) Royal Tin',
      portion: 'Grand Feast & Gift Tin (~30 to 32 Pieces)',
      subtitle: 'Generous royal treat packed in luxury gift box',
      discount: 25,
      image: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_11.19.14_PM__1__9d7f34ee.jpeg',
    },
  ];

  // Auto slide every 6 seconds if not hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  const activeSlide = slides[currentSlideIndex];

  // Get active product based on selected category (Simple vs Desi Ghee)
  const currentProduct =
    products.find((p) => p.category === selectedCategory) || products[0];

  const salePrice = currentProduct ? currentProduct.prices[activeSlide.weightKey] : 500;
  const originalPrice = calculateOriginalPrice(salePrice, activeSlide.discount);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const whatsappMessage = `Hello Dar's Homemade! I want to order ${currentProduct.name} - ${activeSlide.title} for discounted price of Rs. ${salePrice} (Was Rs. ${originalPrice}). Delivery via Bykea. Please guide me.`;
  const whatsappUrl = `https://wa.me/923152019373?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section
      className="py-12 bg-gradient-to-b from-[#170C06] via-[#24130B] to-[#1A0E0A] border-y-2 border-[#D4AF37]/35 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle gold ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Header & Category Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-cinzel font-bold tracking-widest uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weight Sizes Slider</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#FFF5C0]">
              Nan Khatai Size Showcase
            </h2>
          </div>

          {/* 2 CATEGORIES SWITCHER: Simple vs Desi Ghee */}
          <div className="flex items-center p-1 rounded-xl bg-[#120804] border border-[#D4AF37]/40">
            <button
              type="button"
              onClick={() => setSelectedCategory('simple')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
                selectedCategory === 'simple'
                  ? 'bg-gradient-to-r from-[#DFBE59] to-[#D4AF37] text-[#140A06] shadow-sm'
                  : 'text-[#FAF7F2]/70 hover:text-[#D4AF37]'
              }`}
            >
              Simple Nan Khatai
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('desiGhee')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
                selectedCategory === 'desiGhee'
                  ? 'bg-gradient-to-r from-[#DFBE59] to-[#D4AF37] text-[#140A06] shadow-sm'
                  : 'text-[#FAF7F2]/70 hover:text-[#D4AF37]'
              }`}
            >
              Desi Ghee Nan Khatai
            </button>
          </div>
        </div>

        {/* SINGLE-ITEM SLIDER CONTAINER: Only ONE weight item shown at a time */}
        <div className="relative rounded-3xl bg-[#FAF7F2] border-2 border-[#D4AF37] shadow-2xl overflow-hidden">
          {/* Top Foil */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#997A15]" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
            {/* Left Column: Big Single Photo with Discount Badge (e.g. 20% OFF or 25% OFF) */}
            <div className="md:col-span-6 relative">
              <div className="relative h-72 sm:h-84 rounded-2xl overflow-hidden bg-[#1A0E0A] border-2 border-[#D4AF37]/40 shadow-xl group">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#140A06]/70 via-transparent to-transparent pointer-events-none" />

                {/* DISCOUNT BADGE ON PICTURE (20% OFF or 25% OFF as requested) */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="px-3.5 py-1.5 rounded-full bg-red-700 border-2 border-[#FFF5C0] text-[#FFF5C0] font-cinzel text-xs font-extrabold tracking-wider uppercase shadow-xl flex items-center gap-1.5 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFF5C0]" />
                    <span>{activeSlide.discount}% DISCOUNT</span>
                  </div>
                </div>

                {/* Bykea Delivery Indicator */}
                <div className="absolute bottom-3 right-3 z-10 text-[11px] font-sans text-emerald-300 bg-[#140A06]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-emerald-500/40 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Bykea Delivery (Actual Fare)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Slide Info, Crossed-Out Original Price, Sale Price & Buttons */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-5">
              <div>
                {/* Category & Weight Title */}
                <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-[#805008] uppercase tracking-wider mb-1">
                  <span>{currentProduct.name}</span>
                </div>

                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2A1810] leading-snug">
                  {activeSlide.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#5C4033] mt-1.5 font-medium">
                  {activeSlide.portion} • {activeSlide.subtitle}
                </p>
              </div>

              {/* PRICING BLOCK: CROSSED OUT HIGHER PRICE + SALE PRICE */}
              <div className="p-4 rounded-2xl bg-[#1F1209] text-[#FAF7F2] border border-[#D4AF37]/40 shadow-inner space-y-2">
                <div className="flex items-center justify-between text-xs text-[#FAF7F2]/70">
                  <span className="uppercase font-cinzel tracking-wider">Original Price:</span>
                  <span className="line-through text-red-400 font-bold text-sm">
                    Rs. {originalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1 border-t border-[#D4AF37]/20">
                  <span className="text-xs font-cinzel uppercase text-[#D4AF37] font-bold">
                    Special Offer Price ({activeSlide.discount}% OFF):
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-[#D4AF37] font-bold">Rs.</span>
                    <span className="font-cinzel text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C0] via-[#E5C365] to-[#D4AF37]">
                      {salePrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS ON THE SLIDE */}
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Buy It Now */}
                  <button
                    type="button"
                    onClick={() => onDirectBuyItem(currentProduct, activeSlide.weightKey, salePrice)}
                    className="py-3 px-3 rounded-xl bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#B8860B] hover:brightness-110 active:scale-95 text-[#140A06] font-cinzel font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Buy Now</span>
                  </button>

                  {/* Add To Cart */}
                  <button
                    type="button"
                    onClick={() => onAddToCartItem(currentProduct, activeSlide.weightKey, 1, salePrice)}
                    className="py-3 px-3 rounded-xl bg-[#2A1810] hover:bg-[#1A0E0A] text-[#FFF5C0] font-cinzel font-bold text-xs uppercase tracking-wider border border-[#D4AF37]/50 shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Add To Cart</span>
                  </button>
                </div>

                {/* WhatsApp Order Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-[#140A06] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#140A06]" />
                  <span>Order on WhatsApp (+92 315 2019373)</span>
                </a>
              </div>
            </div>
          </div>

          {/* SLIDER CONTROLS BAR: Left Arrow, Dots (1, 2, 3), Right Arrow */}
          <div className="bg-[#1F1209] p-3 px-6 border-t border-[#D4AF37]/30 flex items-center justify-between text-[#FAF7F2]">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#D4AF37] hover:scale-110 transition-all cursor-pointer"
              aria-label="Previous weight slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dot indicators for 3 items */}
            <div className="flex items-center gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.weightKey}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'w-8 bg-[#D4AF37]'
                      : 'w-2.5 bg-[#FAF7F2]/30 hover:bg-[#FAF7F2]/60'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
              <span className="text-xs font-mono text-[#D4AF37] ml-2 font-bold">
                {currentSlideIndex + 1} of {slides.length}
              </span>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#D4AF37] hover:scale-110 transition-all cursor-pointer"
              aria-label="Next weight slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
