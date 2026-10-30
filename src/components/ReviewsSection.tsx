import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Begum Shahida Qureshi',
    location: 'Gulberg III, Lahore',
    order: 'Royal Almond Nan Khatai (Pure Desi Ghee) - 1 KG',
    rating: 5,
    date: 'Verified Buyer • 3 days ago',
    comment:
      'SubhanAllah! Having lived in old Lahore for 50 years, I know real Nan Khatai. Dar’s has captured that authentic melt-in-the-mouth texture with pure Desi Ghee aroma that you simply cannot buy in modern bakeries anymore. Outstanding quality.',
  },
  {
    name: 'Malik Jahangir Khan',
    location: 'DHA Phase 6, Karachi',
    order: 'Organic Pure Desi Ghee - 1 KG',
    rating: 5,
    date: 'Verified Buyer • 1 week ago',
    comment:
      'The Desi Ghee is exceptionally granular (Danedar) and has that unmistakable nutty aroma of traditional Bilona butter. We tried it on hot parathas and daal—the flavor took us back to village freshness. Truly 100% pure.',
  },
  {
    name: 'Dr. Fatima Tariq',
    location: 'Sector F-7/2, Islamabad',
    order: 'Premium Almond Nan Khatai (Classic) - 1 KG',
    rating: 5,
    date: 'Verified Buyer • 2 weeks ago',
    comment:
      'The airtight luxury gold tin packaging was immaculate—not a single cookie was broken despite courier delivery from Lahore to Islamabad! Fresh, aromatic, and whole roasted almonds in every bite. Highly recommended for gifting.',
  },
];

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#805008] text-xs font-cinzel font-semibold tracking-wider uppercase">
            <span>Patron Testimonials</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#2A1810]">
            Beloved By Families Nationwide
          </h2>

          <p className="font-sans text-sm text-[#6B4E3D]">
            Read unfiltered impressions from esteemed customers who appreciate the distinction of pure ingredients and artisan baking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="p-7 rounded-3xl bg-[#FFFDF9] border-2 border-[#D4AF37]/30 shadow-md hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-[#D4AF37]">
                    {[...Array(review.rating)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#D4AF37]/40" />
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#4A3225] leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#D4AF37]/20 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-playfair font-bold text-sm text-[#2A1810]">
                    {review.name}
                  </span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="text-[11px] text-[#805008] font-medium">
                  {review.location}
                </div>
                <div className="text-[10px] text-[#2A1810]/50 font-mono">
                  {review.order}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
