export type WeightKey = 'pao' | 'halfKg' | 'oneKg';

export interface WeightPricing {
  pao: number;      // 1 Pao (250g)
  halfKg: number;   // Half kg (500g)
  oneKg: number;    // 1 kg (1000g)
}

export interface Product {
  id: string;
  name: string;
  category: 'simple' | 'desiGhee';
  subtitle: string;
  description: string;
  discountPercent: number; // e.g. 20 or 25
  badge: string; // e.g. '20% OFF' or '25% OFF'
  prices: WeightPricing;
  image: string;
  images: string[];
  ingredients: string[];
  deliveryMethod?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  weightKey: WeightKey;
  weightLabel: string;
  unitPrice: number;
  originalPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  city: string;
  notes?: string;
  productId: string;
  productName: string;
  weightKey: WeightKey;
  weightLabel: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered';
  source: 'Website Form' | 'Google Sheets' | 'WhatsApp';
  deliveryType?: string; // 'Bykea (Actual Fare)' | 'Nationwide Courier'
}

export const WEIGHT_LABELS: Record<WeightKey, string> = {
  pao: '1 Pao (250g)',
  halfKg: 'Half KG (500g)',
  oneKg: '1 KG (1000g)',
};

export const WEIGHT_SHORT: Record<WeightKey, string> = {
  pao: '250g',
  halfKg: '500g',
  oneKg: '1 kg',
};

// Calculate original crossed out price with discount
export function calculateOriginalPrice(salePrice: number, discountPercent: number = 20): number {
  const raw = salePrice / (1 - discountPercent / 100);
  return Math.ceil(raw / 50) * 50; // round up to nearest 50 for clean luxury pricing
}
