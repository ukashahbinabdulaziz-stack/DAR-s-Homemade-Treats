import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How are the Nan Khatai packed to prevent breakage during nationwide shipping?',
    a: 'Every single batch is packaged inside food-grade airtight containers surrounded by double-cushioned bubble armor and luxury gold gift boxes. We guarantee cookies arrive whole, crisp, and bakery-fresh whether you are in Karachi, Islamabad, or Quetta.',
  },
  {
    q: 'What is the shelf life of Dar’s Nan Khatai and Pure Desi Ghee?',
    a: 'Our Classic and Royal Nan Khatai stay perfectly fresh and crumbly for up to 45 to 60 days when kept in their airtight tin at room temperature. Our 100% Organic Desi Ghee is naturally clarified with zero moisture and has a shelf life of 12+ months without needing refrigeration.',
  },
  {
    q: 'How does Cash on Delivery (COD) and delivery work?',
    a: 'We offer Cash on Delivery (COD) across all major cities and towns of Pakistan. You only pay when the rider hands over your sealed package at your door. We also accept direct Bank Transfer or JazzCash/Easypaisa if you prefer prepaid shipping.',
  },
  {
    q: 'What is the difference between Classic Nan Khatai and Royal Nan Khatai?',
    a: 'Classic Nan Khatai is baked with our time-honored artisanal recipe using pure butterfat and Californian almonds. Royal Almond Nan Khatai is baked exclusively in 100% grass-fed homemade Desi Ghee with saffron threads and extra roasted almond crowns for an ultra-rich royal experience.',
  },
  {
    q: 'Can I place bulk orders for wedding favors, corporate gifts, or Eid?',
    a: 'Yes! We specialize in bespoke luxury gift hampers with customized gold foil ribbons, personalized calligraphy cards, and assorted weight tiers. Please click "Chat & Order" to speak directly with our concierge at +92 315 2019373.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-20 bg-[#F4EFE6] border-t border-[#D4AF37]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#805008] text-xs font-cinzel font-semibold tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#2A1810]">
            Everything You Need to Know
          </h2>
          <p className="font-sans text-sm text-[#6B4E3D]">
            Have questions regarding our ingredients, shipping, or storage? We are here to help.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#FAF7F2] border-2 border-[#D4AF37]/30 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FFFDF9] transition-colors"
                >
                  <span className="font-playfair font-bold text-base sm:text-lg text-[#2A1810]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#805008] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#D4AF37]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C4033] leading-relaxed border-t border-[#D4AF37]/15 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
