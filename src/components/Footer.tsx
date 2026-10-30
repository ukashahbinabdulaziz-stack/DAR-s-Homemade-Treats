import React from 'react';
import { BrandLogo } from './BrandLogo.tsx';
import { Phone, MessageCircle, MapPin, Mail, ShieldCheck, Lock, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const whatsappUrl =
    'https://wa.me/923152019373?text=Hello%20Dar%27s%20Homemade!%20I%20would%20like%20to%20inquire%20about%20your%20artisanal%20treats.';

  return (
    <footer className="bg-[#140A06] text-[#FAF7F2] border-t-2 border-[#D4AF37]/40 relative overflow-hidden">
      {/* Subtle gold gradient accent on top */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#B8860B]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: Brand Info & Logo */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo size="md" lightText={true} />
            <p className="font-sans text-xs sm:text-sm text-[#FAF7F2]/75 max-w-sm leading-relaxed">
              Dar&apos;s Homemade Treats is a boutique culinary atelier dedicated to preserving generational recipes of slow-baked Almond Nan Khatai and authentic Bilona-churned pure Desi Ghee.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-cinzel tracking-wider">Uncompromising Royal Purity</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-cinzel text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
              The Atelier
            </div>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80 font-medium">
              <li>
                <a href="#products-section" className="hover:text-[#D4AF37] transition-colors">
                  Artisanal Nan Khatai &amp; Desi Ghee
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-[#D4AF37] transition-colors">
                  Generational Recipe &amp; Craft
                </a>
              </li>
              <li>
                <a href="#purity" className="hover:text-[#D4AF37] transition-colors">
                  100% Purity Guarantee
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#D4AF37] transition-colors">
                  Patron Reviews
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#D4AF37] transition-colors">
                  Packaging &amp; Delivery FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact & Concierge */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-cinzel text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
              Customer Concierge
            </div>
            <div className="space-y-2.5 text-xs text-[#FAF7F2]/80">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: +92 315 2019373</span>
              </a>

              <a
                href="tel:+923152019373"
                className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Direct Line: +92 315 2019373</span>
              </a>

              <div className="flex items-center gap-2 text-[#FAF7F2]/70">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Lahore, Pakistan • Nationwide Express Courier</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/30 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Quick WhatsApp Assistance</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Discreet Admin Login Button */}
        <div className="mt-12 pt-6 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <div>
            &copy; {new Date().getFullYear()} Dar&apos;s Homemade Treats. All Rights Reserved. Handcrafted in Pakistan.
          </div>

          {/* DISCREET ADMIN LOGIN BUTTON AS EXPLICITLY REQUESTED */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onAdminClick}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F1209] hover:bg-[#2A1810] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 text-[#FAF7F2]/60 hover:text-[#D4AF37] transition-all text-[11px] cursor-pointer"
              title="Discreet Staff Portal (Password: admin123)"
            >
              <Lock className="w-3 h-3 text-[#D4AF37]/70 group-hover:text-[#D4AF37]" />
              <span className="font-mono">Admin Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
