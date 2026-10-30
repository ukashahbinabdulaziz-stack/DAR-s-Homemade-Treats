import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo.tsx';
import { MessageCircle, Menu, X, Sparkles, Phone, ShoppingCart, Truck } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
  onExploreClick: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onAdminClick,
  onExploreClick,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappNumber = '923152019373';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Dar's Homemade! I want to inquire about ordering your homemade almond nan khatai and pure desi ghee."
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-[#1A0E0A]/95 backdrop-blur-md border-b-2 border-[#D4AF37]/35 transition-all duration-300 shadow-2xl">
      {/* Top Luxury Announcement Ribbon with Bykea Delivery Note */}
      <div className="bg-gradient-to-r from-[#120804] via-[#2F190E] to-[#120804] border-b border-[#D4AF37]/25 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#FAF7F2]/90">
          <div className="hidden sm:flex items-center gap-2 text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="tracking-wide">Pure Homemade Desi Ghee &amp; Nan Khatai</span>
          </div>

          <div className="mx-auto sm:mx-0 flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[#FFF5C0] font-semibold">City Delivery via Bykea</span>
            <span className="text-[#FAF7F2]/60 hidden xs:inline">•</span>
            <span className="text-[#FAF7F2]/80 hidden xs:inline">Actual Bykea fare charged upon delivery</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[#D4AF37]">
            <a
              href={`tel:+${whatsappNumber}`}
              className="flex items-center gap-1.5 hover:text-[#FFF5C0] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              <span className="font-semibold">+92 315 2019373</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo with New Royal Crown Crest */}
        <a href="#" className="flex items-center">
          <BrandLogo size="md" lightText={true} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <button
            onClick={onExploreClick}
            className="text-xs uppercase tracking-[0.2em] font-medium text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors duration-200 cursor-pointer"
          >
            The Collection
          </button>
          <a
            href="#heritage"
            className="text-xs uppercase tracking-[0.2em] font-medium text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors duration-200"
          >
            Heritage Recipe
          </a>
          <a
            href="#purity"
            className="text-xs uppercase tracking-[0.2em] font-medium text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors duration-200"
          >
            Purity Guarantee
          </a>
          <a
            href="#reviews"
            className="text-xs uppercase tracking-[0.2em] font-medium text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors duration-200"
          >
            Reviews
          </a>
          <a
            href="#faqs"
            className="text-xs uppercase tracking-[0.2em] font-medium text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors duration-200"
          >
            FAQs
          </a>
        </nav>

        {/* CTA Actions + Cart Button */}
        <div className="flex items-center gap-3">
          {/* Cart Trigger Button */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-[#2A1810] hover:bg-[#3D2314] border border-[#D4AF37]/50 text-[#FFF5C0] transition-all hover:scale-105 cursor-pointer flex items-center justify-center shadow-md"
            aria-label="Open Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#DFBE59] to-[#D4AF37] text-[#140A06] text-[10px] font-extrabold shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* WhatsApp Direct */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#FAF7F2] text-xs font-medium tracking-wide transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Order</span>
          </a>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#FAF7F2] hover:text-[#D4AF37] hover:bg-[#2A1810]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#140A06] border-b-2 border-[#D4AF37]/40 px-6 py-5 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3 pb-3 border-b border-[#D4AF37]/20">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExploreClick();
              }}
              className="text-left py-2 text-sm uppercase tracking-widest text-[#FAF7F2] hover:text-[#D4AF37]"
            >
              The Collection
            </button>
            <a
              href="#heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm uppercase tracking-widest text-[#FAF7F2] hover:text-[#D4AF37]"
            >
              Heritage Recipe
            </a>
            <a
              href="#purity"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm uppercase tracking-widest text-[#FAF7F2] hover:text-[#D4AF37]"
            >
              Purity Guarantee
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm uppercase tracking-widest text-[#FAF7F2] hover:text-[#D4AF37]"
            >
              Reviews
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm uppercase tracking-widest text-[#FAF7F2] hover:text-[#D4AF37]"
            >
              FAQs
            </a>
          </div>

          <div className="space-y-2 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#2A1810] text-[#FFF5C0] font-bold text-xs border border-[#D4AF37]/50"
            >
              <ShoppingCart className="w-4 h-4 text-[#D4AF37]" />
              <span>View Cart ({cartCount} Items)</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25D366] text-[#140A06] font-semibold text-xs tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Direct (+92 315 2019373)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
