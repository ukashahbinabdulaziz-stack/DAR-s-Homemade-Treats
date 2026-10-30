import React, { useState } from 'react';
import { Product, WeightKey, WEIGHT_LABELS, Order } from '../types.ts';
import { X, CheckCircle2, ShieldCheck, Sparkles, MessageCircle, Truck, Package, ArrowRight, Loader2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';

interface DirectBuyModalProps {
  product: Product | null;
  selectedWeight: WeightKey;
  initialPrice: number;
  initialQuantity?: number;
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (newOrder: Order) => void;
  googleSheetsUrl: string;
}

export const DirectBuyModal: React.FC<DirectBuyModalProps> = ({
  product,
  selectedWeight,
  initialPrice,
  initialQuantity = 1,
  isOpen,
  onClose,
  onOrderSuccess,
  googleSheetsUrl,
}) => {
  const [currentWeight, setCurrentWeight] = useState<WeightKey>(selectedWeight);
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lahore');
  const [customCity, setCustomCity] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync weight if prop changes when opening
  React.useEffect(() => {
    setCurrentWeight(selectedWeight);
    setQuantity(initialQuantity || 1);
    setSubmittedOrder(null);
    setErrorMsg(null);
  }, [selectedWeight, initialQuantity, isOpen]);

  if (!isOpen || !product) return null;

  const unitPrice = product.prices[currentWeight];
  const totalPrice = unitPrice * quantity;
  const weightLabel = WEIGHT_LABELS[currentWeight];

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 8) {
      setErrorMsg('Please enter a valid phone number for delivery coordination.');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('Please enter your complete delivery address.');
      return;
    }

    const finalCity = city === 'Other' ? (customCity.trim() || 'Pakistan') : city;
    const generatedOrderId = `DAR-${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedDate = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: generatedOrderId,
      createdAt: formattedDate,
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      city: finalCity,
      notes: notes.trim(),
      productId: product.id,
      productName: product.name,
      weightKey: currentWeight,
      weightLabel: weightLabel,
      unitPrice: unitPrice,
      quantity: quantity,
      totalPrice: totalPrice,
      status: 'Pending',
      source: 'Website Form',
    };

    setIsSubmitting(true);

    try {
      /**
       * GOOGLE SHEETS INTEGRATION (Web App URL)
       * We POST the JSON payload to the Google Apps Script Web App URL.
       * If user hasn't configured a live script URL yet, we catch gracefully and save locally.
       */
      const endpoint = googleSheetsUrl && googleSheetsUrl.startsWith('http')
        ? googleSheetsUrl
        : '';

      if (endpoint) {
        // Post to Google Apps Script Web App
        // Using mode: 'no-cors' allows submission without CORS blockage in Google Apps Script redirects
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: newOrder.id,
            timestamp: newOrder.createdAt,
            customerName: newOrder.customerName,
            phoneNumber: newOrder.phoneNumber,
            address: newOrder.address,
            city: newOrder.city,
            productName: newOrder.productName,
            weight: newOrder.weightLabel,
            quantity: newOrder.quantity,
            totalPrice: newOrder.totalPrice,
            notes: newOrder.notes || 'None',
            status: newOrder.status,
          }),
        });
      }

      // Record order locally and notify parent
      onOrderSuccess(newOrder);
      setSubmittedOrder(newOrder);
    } catch (err) {
      console.warn('Google Sheet submission warning:', err);
      // Even if network fails to Google Sheet, still log locally so order isn't lost
      onOrderSuccess(newOrder);
      setSubmittedOrder(newOrder);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappReceiptMessage = submittedOrder
    ? `Hello Dar's Homemade! I just placed Order #${submittedOrder.id} on your website for ${submittedOrder.productName} (${submittedOrder.weightLabel} x ${submittedOrder.quantity}) totaling Rs. ${submittedOrder.totalPrice}. Customer: ${submittedOrder.customerName}, Phone: ${submittedOrder.phoneNumber}, City: ${submittedOrder.city}. Please confirm my delivery!`
    : '';

  const whatsappReceiptUrl = `https://wa.me/923152019373?text=${encodeURIComponent(whatsappReceiptMessage)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#FAF7F2] border-2 border-[#D4AF37] shadow-2xl overflow-hidden my-8">
        {/* Top Gold Foil Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#997A15]" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1A0E0A]/10 hover:bg-[#1A0E0A]/20 text-[#2A1810] transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* CONDITION 1: LUXURY ORDER SUCCESS VIEW */}
        {submittedOrder ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500/40 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-in zoom-in-75 duration-300" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#805008] text-xs font-cinzel font-semibold tracking-wider uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Order Confirmed &amp; Logged</span>
              </div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2A1810]">
                Thank You, {submittedOrder.customerName}!
              </h2>
              <p className="font-sans text-sm text-[#5C4033] mt-1.5 max-w-md mx-auto">
                Your order has been recorded successfully. Our master confectioner is preparing your fresh homemade treat.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#1A0E0A] text-[#FAF7F2] rounded-2xl p-5 border border-[#D4AF37]/40 shadow-inner text-left space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/25">
                <div>
                  <span className="text-[10px] uppercase font-sans tracking-widest text-[#D4AF37]">
                    Order Reference
                  </span>
                  <div className="font-cinzel text-lg font-bold text-[#FFF5C0]">
                    #{submittedOrder.id}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-sans tracking-widest text-[#FAF7F2]/60">
                    Payment Method
                  </span>
                  <div className="text-xs font-semibold text-emerald-400">
                    Cash on Delivery (COD)
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#FAF7F2]/90">
                <div className="flex justify-between">
                  <span className="text-[#FAF7F2]/60">Item:</span>
                  <span className="font-semibold text-right">{submittedOrder.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FAF7F2]/60">Weight &amp; Qty:</span>
                  <span>{submittedOrder.weightLabel} × {submittedOrder.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FAF7F2]/60">Destination:</span>
                  <span>{submittedOrder.city}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#D4AF37]/20 text-sm font-bold">
                  <span className="text-[#D4AF37]">Total Amount:</span>
                  <span className="font-cinzel text-base text-[#FFF5C0]">
                    Rs. {submittedOrder.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* WhatsApp Priority Dispatch Action */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappReceiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-[#140A06] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#25D366]/20 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 text-[#140A06]" />
                <span>Send Order Copy to WhatsApp for VIP Dispatch</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 px-6 rounded-xl bg-[#2A1810] hover:bg-[#1A0E0A] text-[#FAF7F2] font-cinzel text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Continue Browsing Treats
              </button>
            </div>
          </div>
        ) : (
          /* CONDITION 2: DIRECT BUY POPUP FORM */
          <form onSubmit={handleConfirmOrder} className="p-6 sm:p-8 space-y-6">
            {/* Header with Monogram & Title */}
            <div className="text-center space-y-1">
              <div className="flex justify-center mb-2">
                <BrandLogo size="sm" showText={false} />
              </div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2A1810]">
                Direct Purchase Order
              </h2>
              <p className="font-sans text-xs text-[#6B4E3D]">
                Freshly prepared and sealed in tamper-proof airtight packaging
              </p>
            </div>

            {/* Selected Product & Weight Badge Card */}
            <div className="rounded-2xl p-4 bg-[#1F1209] text-[#FAF7F2] border border-[#D4AF37]/40 shadow-inner flex flex-col sm:flex-row items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-xl object-cover border border-[#D4AF37]/40 shrink-0"
              />
              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-playfair font-bold text-base text-[#FAF7F2] line-clamp-1">
                    {product.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold">
                    {product.badge}
                  </span>
                </div>

                {/* Weight selector inside modal */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#FAF7F2]/70 font-medium">Weight:</span>
                    <select
                      value={currentWeight}
                      onChange={(e) => setCurrentWeight(e.target.value as WeightKey)}
                      className="bg-[#2A1810] border border-[#D4AF37]/50 rounded-lg px-2 py-1 text-xs text-[#FFF5C0] font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="pao">1 Pao (250g) - Rs. {product.prices.pao}</option>
                      <option value="halfKg">Half KG (500g) - Rs. {product.prices.halfKg}</option>
                      <option value="oneKg">1 KG (1000g) - Rs. {product.prices.oneKg}</option>
                    </select>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#FAF7F2]/70 font-medium">Qty:</span>
                    <div className="flex items-center border border-[#D4AF37]/40 rounded-lg overflow-hidden bg-[#2A1810]">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2 py-0.5 text-xs text-[#D4AF37] hover:bg-[#3D2314] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-[#FAF7F2]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#D4AF37] hover:bg-[#3D2314] cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Final Price Line */}
                <div className="pt-2 border-t border-[#D4AF37]/25 flex items-baseline justify-between text-xs">
                  <span className="text-[#FAF7F2]/80 uppercase font-cinzel">Total Payable:</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-[#D4AF37]">Rs.</span>
                    <span className="font-cinzel text-xl font-bold text-[#FFF5C0]">
                      {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error banner if validation fails */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Form Inputs: Customer Name, Phone Number, Delivery Address */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-cinzel font-bold tracking-wider text-[#2A1810] mb-1.5">
                  Customer Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Usman Malik"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 rounded-xl px-4 py-2.5 text-sm text-[#2A1810] shadow-sm outline-none transition-all placeholder:text-[#2A1810]/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-cinzel font-bold tracking-wider text-[#2A1810] mb-1.5">
                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0315-XXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#D4AF37]/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 rounded-xl px-4 py-2.5 text-sm text-[#2A1810] shadow-sm outline-none transition-all placeholder:text-[#2A1810]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-cinzel font-bold tracking-wider text-[#2A1810] mb-1.5">
                    Destination City <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#D4AF37]/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 rounded-xl px-4 py-2.5 text-sm text-[#2A1810] shadow-sm outline-none transition-all cursor-pointer font-medium"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Other">Other City...</option>
                  </select>
                </div>
              </div>

              {city === 'Other' && (
                <div>
                  <label className="block text-xs uppercase font-cinzel font-bold tracking-wider text-[#2A1810] mb-1.5">
                    Specify Your City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city name in Pakistan"
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#D4AF37]/40 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-[#2A1810] outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs uppercase font-cinzel font-bold tracking-wider text-[#2A1810] mb-1.5">
                  Complete Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House/Plot #, Street name, Block / Phase, Landmark..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 rounded-xl px-4 py-2 text-sm text-[#2A1810] shadow-sm outline-none transition-all placeholder:text-[#2A1810]/40 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-cinzel font-bold tracking-wider text-[#2A1810] mb-1.5">
                  Special Instructions or Gift Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ring bell upon arrival, add gift card ribbon"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FFFDF9] border border-[#D4AF37]/40 focus:border-[#D4AF37] rounded-xl px-4 py-2 text-sm text-[#2A1810] shadow-sm outline-none transition-all placeholder:text-[#2A1810]/40"
                />
              </div>
            </div>

            {/* Payment & Bykea Delivery Assurance */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/35 text-xs text-[#4A3225]">
              <Truck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div>
                  <span className="font-bold text-[#2A1810]">Bykea Delivery (بائیکیا):</span> Dispatch will be via Bykea express. Delivery charges are paid directly to the Bykea rider at your doorstep based on actual fare (jitnay Bykea ride charges hon).
                </div>
                <div className="text-[11px] text-[#805008]">
                  • <strong>Payment Method:</strong> Cash on Delivery (COD) for your treats upon arrival.
                </div>
              </div>
            </div>

            {/* "Confirm Order" Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#B8860B] hover:brightness-110 active:scale-98 text-[#1A0E0A] font-cinzel font-bold text-sm tracking-widest uppercase transition-all duration-200 shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#1A0E0A]" />
                    <span>Transmitting Order...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Order (Rs. {totalPrice.toLocaleString()})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
