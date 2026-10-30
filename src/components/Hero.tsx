import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award, ChevronDown, MessageCircle } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const whatsappUrl = `https://wa.me/923152019373?text=${encodeURIComponent(
    "Hello Dar's Homemade! I want to inquire about ordering your premium treats."
  )}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1F1209] via-[#2A1810] to-[#170C06] text-[#FAF7F2] py-20 lg:py-28">
      {/* Background Subtle Luxury Patterns & Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#997A15]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Top Royal Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Royal Heritage • 100% Homemade</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight">
              Artisanal Nan Khatai &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C0] via-[#D4AF37] to-[#B8860B] underline decoration-[#D4AF37]/30 decoration-wavy">
                Pure Desi Ghee
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="font-sans text-base sm:text-lg text-[#FAF7F2]/80 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Crafted in small sacred batches following generational recipes. Made with 100% pure Bilona-churned Desi Ghee, handpicked Californian almonds, and fragrant green cardamoms. Zero preservatives, zero compromise.
            </p>

            {/* Value Props Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 py-2 max-w-lg mx-auto lg:mx-0">
              <div className="p-3 rounded-xl bg-[#FAF7F2]/5 border border-[#D4AF37]/20 text-center">
                <div className="text-[#D4AF37] font-cinzel font-bold text-lg">100%</div>
                <div className="text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 font-medium">Pure Desi Ghee</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2]/5 border border-[#D4AF37]/20 text-center">
                <div className="text-[#D4AF37] font-cinzel font-bold text-lg">Slow-Baked</div>
                <div className="text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 font-medium">Melt-in-Mouth</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2]/5 border border-[#D4AF37]/20 text-center">
                <div className="text-[#D4AF37] font-cinzel font-bold text-lg">Fresh</div>
                <div className="text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 font-medium">Made to Order</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#B8860B] text-[#1A0E0A] font-cinzel font-bold text-sm tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all duration-200 shadow-xl shadow-[#D4AF37]/25 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore The Collection</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/15 border border-[#D4AF37]/40 text-[#FAF7F2] font-sans font-medium text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp (+92 315 2019373)</span>
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 text-xs text-[#FAF7F2]/60 pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Guaranteed Organic Purity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>Luxury Airtight Packaging</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Frame */}
          <div className="lg:col-span-5 relative">
            {/* Ornate Gold Border Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl p-3 bg-gradient-to-b from-[#D4AF37]/40 via-[#2A1810] to-[#D4AF37]/40 shadow-2xl">
              <div className="relative rounded-2xl overflow-hidden bg-[#1A0E0A] border border-[#D4AF37]/50 p-4 sm:p-6 space-y-5">
                {/* Visual Header Inside Frame */}
                <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                    <span className="text-xs uppercase font-cinzel font-semibold tracking-widest text-[#D4AF37]">
                      Signature Reserve
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-sans tracking-widest text-[#FAF7F2]/60">
                    Lahore, Pakistan
                  </span>
                </div>

                {/* Hero Feature Visual Carousel Preview */}
                <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden group">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-10-30_at_11.19.13_PM__1__efe2856a.jpeg"
                    alt="Dar's Homemade Almond Nan Khatai"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140A06] via-transparent to-transparent opacity-80" />

                  {/* Floating Gold Badge */}
                  <div className="absolute top-3 left-3 bg-[#1A0E0A]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D4AF37] shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-[11px] font-cinzel font-bold text-[#D4AF37] tracking-wider uppercase">
                      Pure Desi Ghee &amp; Almond
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#140A06]/90 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-between">
                    <div>
                      <div className="font-playfair text-sm font-bold text-[#FAF7F2]">
                        Authentic Homemade Nan Khatai
                      </div>
                      <div className="text-[11px] text-emerald-400 font-medium">
                        ✓ Fast Delivery via Bykea Rider
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-sans text-[#D4AF37] block">Starts at</span>
                      <span className="font-cinzel font-bold text-sm text-[#FFF5C0]">Rs. 500</span>
                    </div>
                  </div>
                </div>

                {/* Trust Highlights */}
                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-[#FAF7F2]/5 border border-[#D4AF37]/20 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="text-[#FAF7F2]/80">Generational Secret Family Recipe</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF7F2]/5 border border-[#D4AF37]/20 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="text-[#FAF7F2]/80">No Hydrogenated Oils or Preservatives</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
