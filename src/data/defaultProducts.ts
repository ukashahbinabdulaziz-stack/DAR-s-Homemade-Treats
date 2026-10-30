import { Product } from '../types.ts';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-simple',
    name: 'Simple Almond Nan Khatai (Classic)',
    category: 'simple',
    subtitle: 'Classic Artisanal Recipe with Whole Toasted Almond',
    description:
      'Our timeless classic Almond Nan Khatai. Slow-baked using pure butterfat, stone-ground flour, and crushed cardamoms, crowned with a crisp whole Californian almond in the center. Light, crumbly, and dissolves effortlessly on the tongue.',
    discountPercent: 20,
    badge: '20% OFF',
    prices: {
      pao: 500,     // 1 Pao (250g) = Rs. 500 (Was Rs. 650)
      halfKg: 1000, // Half kg = Rs. 1000 (Was Rs. 1,250)
      oneKg: 2000,  // 1 kg = Rs. 2000 (Was Rs. 2,500)
    },
    // User's authentic single close-up photo:
    image: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_11.19.13_PM__1__efe2856a.jpeg',
    images: [
      '/assets/aistudio/WhatsApp_Image_2026-10-30_at_11.19.13_PM__1__efe2856a.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-30_at_11.19.14_PM_4d935561.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-30_at_11.19.14_PM__1__9d7f34ee.jpeg',
    ],
    ingredients: [
      'Stone-Ground Wheat & Gram Flour',
      'Handpicked Whole Roasted Almonds',
      'Green Cardamom Pod Infusion',
      'Artisanal Clarified Butterfat',
      'Raw Cane Sugar & Golden Saffron Glaze',
    ],
    deliveryMethod: 'Fast Delivery via Bykea (Actual rider fare paid upon arrival)',
  },
  {
    id: 'prod-desighee',
    name: 'Desi Ghee Almond Nan Khatai (Royal)',
    category: 'desiGhee',
    subtitle: 'Baked Exclusively in 100% Pure Desi Ghee',
    description:
      'The crown jewel recipe. Prepared exclusively with 100% pure Desi Ghee for an ultra-rich aroma and luxurious melt-in-the-mouth texture. Infused with saffron threads and roasted whole almonds for an authentic royal indulgence.',
    discountPercent: 25,
    badge: '25% OFF',
    prices: {
      pao: 1000,    // 1 Pao (250g) = Rs. 1000 (Was Rs. 1,350)
      halfKg: 2000, // Half kg = Rs. 2000 (Was Rs. 2,650)
      oneKg: 4000,  // 1 kg = Rs. 4000 (Was Rs. 5,350)
    },
    // User's authentic trio photo:
    image: '/assets/aistudio/WhatsApp_Image_2026-10-30_at_11.19.13_PM_e0f68e8e.jpeg',
    images: [
      '/assets/aistudio/WhatsApp_Image_2026-10-30_at_11.19.13_PM_e0f68e8e.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-30_at_11.19.14_PM__1__9d7f34ee.jpeg',
      '/assets/aistudio/WhatsApp_Image_2026-10-30_at_11.19.13_PM__1__efe2856a.jpeg',
    ],
    ingredients: [
      '100% Pure Traditional Desi Ghee',
      'Whole Roasted California Almonds',
      'Kashmiri Saffron Threads (Zafraan)',
      'Freshly Ground Aromatic Cardamom',
      'Slow-Baking Royal Technique',
    ],
    deliveryMethod: 'Fast Delivery via Bykea (Actual rider fare paid upon arrival)',
  },
];

export const INITIAL_ORDERS = [
  {
    id: 'DAR-8492',
    createdAt: '2026-10-29 16:30',
    customerName: 'Haji Muhammad Iqbal',
    phoneNumber: '+92 300 4581290',
    address: 'House 14-B, Sector G-11/2',
    city: 'Islamabad',
    notes: 'Please pack in luxury gift packaging.',
    productId: 'prod-desighee',
    productName: 'Desi Ghee Almond Nan Khatai (Royal)',
    weightKey: 'oneKg' as const,
    weightLabel: '1 KG (1000g)',
    unitPrice: 4000,
    quantity: 1,
    totalPrice: 4000,
    status: 'Dispatched' as const,
    source: 'Website Form' as const,
    deliveryType: 'Bykea (Actual Fare)',
  },
  {
    id: 'DAR-8488',
    createdAt: '2026-10-28 19:40',
    customerName: 'Dr. Tariq Mahmood',
    phoneNumber: '+92 333 5129988',
    address: 'Lane 7, Cavalry Ground, Cantt',
    city: 'Lahore',
    notes: 'Call before delivery please.',
    productId: 'prod-simple',
    productName: 'Simple Almond Nan Khatai (Classic)',
    weightKey: 'oneKg' as const,
    weightLabel: '1 KG (1000g)',
    unitPrice: 2000,
    quantity: 1,
    totalPrice: 2000,
    status: 'Delivered' as const,
    source: 'Website Form' as const,
    deliveryType: 'Bykea (Actual Fare)',
  },
];
