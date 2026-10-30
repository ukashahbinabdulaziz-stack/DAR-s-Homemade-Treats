import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/923152019373?text=Hello%20Dar%27s%20Homemade!%20I%20want%20to%20order%20luxury%20treats.';

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3 rounded-full bg-[#25D366] text-[#140A06] font-bold text-xs uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#140A06]/20"
        title="Chat with Dar's Homemade Treats on WhatsApp"
      >
        {/* Pulsing ping indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-600 border border-white" />
        </span>

        <MessageCircle className="w-5 h-5 fill-current shrink-0" />
        <span className="hidden sm:inline font-sans font-bold">Chat &amp; Order</span>
      </a>
    </aside>
  );
};
