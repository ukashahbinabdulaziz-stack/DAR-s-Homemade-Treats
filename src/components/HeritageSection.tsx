import React from 'react';
import { Award, ShieldCheck, Flame, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const HeritageSection: React.FC = () => {
  return (
    <section id="heritage" className="py-20 lg:py-28 bg-[#F4EFE6] relative overflow-hidden border-t border-b border-[#D4AF37]/30">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2A1810]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#805008] text-xs font-cinzel font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Generational Purity &amp; Mastery</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1810] tracking-tight">
            The Sacred Craft of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#805008] via-[#B8860B] to-[#D4AF37]">
              Dar&apos;s Homemade
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#5C4033] leading-relaxed">
            In an era of mass commercial bakery goods filled with palm oils, artificial essences, and chemical preservatives, Dar&apos;s Homemade Treats stands as a proud guardian of timeless culinary heritage.
          </p>
        </div>

        {/* 3 Heritage Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-[#1F1209] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md group-hover:scale-105 transition-transform">
              <Flame className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-cinzel font-bold text-[#805008] tracking-widest uppercase">
                Step 01 • Sacred Clarification
              </span>
              <h3 className="font-playfair text-xl font-bold text-[#2A1810]">
                Traditional Bilona Desi Ghee
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#5C4033] leading-relaxed">
              We never purchase commercial butter. We culture grass-fed cow and buffalo cream into rich curd, churn it using wooden rods, and clarify the butter slowly in copper cauldrons until a fragrant golden elixir is born.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-[#1F1209] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md group-hover:scale-105 transition-transform">
              <Award className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-cinzel font-bold text-[#805008] tracking-widest uppercase">
                Step 02 • Pristine Harvest
              </span>
              <h3 className="font-playfair text-xl font-bold text-[#2A1810]">
                Handpicked Californian Almonds
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#5C4033] leading-relaxed">
              Every almond is individually inspected for richness, gently dry-roasted to release essential oils, and folded into our dough with freshly ground green cardamom pods for a fragrant crunch in every bite.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-[#1F1209] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md group-hover:scale-105 transition-transform">
              <Heart className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-cinzel font-bold text-[#805008] tracking-widest uppercase">
                Step 03 • Slow Baking
              </span>
              <h3 className="font-playfair text-xl font-bold text-[#2A1810]">
                Generational Royal Crumble
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#5C4033] leading-relaxed">
              Baked at gentle controlled temperatures to produce that quintessential royal dome crack and delicate, crumbly texture that dissolves luxuriously on the tongue without leaving heaviness.
            </p>
          </div>
        </div>

        {/* Purity Guarantee Showcase Banner */}
        <div id="purity" className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1F1209] via-[#2A1810] to-[#140A06] text-[#FAF7F2] border-2 border-[#D4AF37]/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Purity Certification Guarantee</span>
              </div>

              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#FFF5C0]">
                Strictly Zero Dalda, Zero Additives, Zero Compromise
              </h3>

              <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed max-w-2xl">
                We believe what enters your family home should be wholesome, pure, and blessed. If you ever detect adulteration, artificial essence, or industrial shortenings in our treats, we offer an unconditional 100% refund.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Airtight Gold Seal Packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Fresh Made-to-Order</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Nationwide Courier Delivery</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <div className="inline-block p-6 rounded-2xl bg-[#140A06] border border-[#D4AF37] shadow-xl space-y-2">
                <div className="font-cinzel text-xs text-[#D4AF37] uppercase tracking-widest">
                  Direct Inquiries &amp; Orders
                </div>
                <div className="font-playfair text-xl font-bold text-[#FAF7F2]">
                  +92 315 2019373
                </div>
                <div className="text-[11px] text-[#FAF7F2]/60">
                  Concierge available 9 AM – 11 PM PKT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
