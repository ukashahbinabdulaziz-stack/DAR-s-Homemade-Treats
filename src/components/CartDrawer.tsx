import React from 'react';
import { CartItem } from '../types.ts';
import { X, Trash2, ShoppingBag, MessageCircle, Truck, Sparkles, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Generate complete WhatsApp order text for whole cart
  const whatsappItemsList = cartItems
    .map(
      (item, i) =>
        `${i + 1}. ${item.productName} (${item.weightLabel}) x ${item.quantity} = Rs. ${item.totalPrice}`
    )
    .join('\n');

  const whatsappMessage = `Hello Dar's Homemade! I want to order the following items from my cart:\n\n${whatsappItemsList}\n\n*Cart Total: Rs. ${totalAmount}*\nDelivery: Bykea Express (actual fare). Please confirm my order!`;
  const whatsappUrl = `https://wa.me/923152019373?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l-2 border-[#D4AF37] relative">
        {/* Top Header */}
        <div className="p-5 bg-[#1F1209] text-[#FAF7F2] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-playfair text-lg font-bold text-[#FFF5C0]">
              Your Luxury Cart ({totalItemCount})
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#FAF7F2] transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bykea Delivery Ribbon */}
        <div className="bg-[#140A06] px-4 py-2 text-[11px] text-[#FAF7F2]/90 border-b border-[#D4AF37]/25 flex items-center gap-2">
          <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-[#FFF5C0]">Delivery by Bykea:</strong> Dispatched quickly; actual Bykea rider fare paid upon arrival.
          </span>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="py-20 text-center text-[#6B4E3D] space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-[#D4AF37]/50" />
              <div className="font-playfair text-lg font-bold text-[#2A1810]">
                Your cart is empty
              </div>
              <p className="text-xs max-w-xs mx-auto">
                Explore our artisanal Nan Khatai and organic pure Desi Ghee to place an order.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 px-6 py-2 rounded-xl bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#B8860B] text-[#140A06] text-xs font-cinzel font-bold uppercase tracking-wider cursor-pointer"
              >
                Browse Treats
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/30 shadow-xs flex items-center gap-3"
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 rounded-xl object-cover border border-[#D4AF37]/30 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-playfair font-bold text-xs text-[#2A1810] truncate">
                    {item.productName}
                  </h4>
                  <div className="text-[11px] text-[#805008] font-semibold">
                    {item.weightLabel}
                  </div>
                  <div className="text-xs font-bold text-[#2A1810] mt-0.5">
                    Rs. {item.unitPrice.toLocaleString()} each
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-[#D4AF37]/40 rounded-lg overflow-hidden bg-[#FAF7F2]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#805008] hover:bg-[#D4AF37]/15 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-[#2A1810]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#805008] hover:bg-[#D4AF37]/15 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-cinzel font-bold text-[#2A1810]">
                      Rs. {item.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Controls */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-[#FAF7F2] border-t border-[#D4AF37]/30 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#2A1810]">
                Subtotal Payable:
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-bold text-[#805008]">Rs.</span>
                <span className="font-cinzel text-2xl font-bold text-[#2A1810]">
                  {totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              {/* Direct Checkout Form Button */}
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#DFBE59] via-[#D4AF37] to-[#B8860B] hover:brightness-110 active:scale-98 text-[#140A06] font-cinzel font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Proceed to Direct Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Order Whole Cart via WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-[#140A06] font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#140A06]" />
                <span>Order Entire Cart on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
