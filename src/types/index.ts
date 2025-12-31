// API Types - moved from services/api.ts to avoid circular imports
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  products: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductFilterDto {
  search?: string;
  categoryId?: string;
  categoryName?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  brand?: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    description?: string;
  };
  variants?: ProductVariant[];
  images: ProductImage[];
  reviews?: Review[];
  averageRating?: number;
  _count?: {
    reviews: number;
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  attributes: Record<string, any>;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

// UI Product type that extends the API product with additional fields
export interface UIProduct {
  // Base product fields
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  brand?: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    description?: string;
  };
  variants?: ProductVariant[];
  reviews?: Review[];
  averageRating?: number;
  _count?: {
    reviews: number;
  };
  
  // Legacy fields for backward compatibility with existing components
  rating: number; // Maps to averageRating
  reviewCount: number; // Maps to _count.reviews
  oldPrice?: number; // Not in API, can be calculated or added separately
  soldToday?: number; // Not in API, placeholder for future use
  available: number; // Maps to stock
  images: string[]; // Simplified images array for UI
  image: string; // Primary image for cart context
  categoryName: string; // Category name for filtering
  age?: string; // Not in API, can be added as custom field
}

// UI Review type
export interface UIReview extends Review {
  userName: string; // Maps to user.firstName + user.lastName
  userAvatar: string; // Not in API, placeholder
  date: string; // Maps to createdAt
  badge?: string; // Not in API, placeholder
}

// UI Category type
export interface UICategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  productCount?: number;
}

// Helper function to generate random rating between 3.5 and 5.0
export const generateRandomRating = (): number => {
  // Generate random rating between 3.5 and 5.0 with 0.5 increments
  const ratings = [3.5, 4.0, 4.5, 5.0];
  return ratings[Math.floor(Math.random() * ratings.length)];
};

// Helper function to generate random review count
const generateRandomReviewCount = (): number => {
  // Generate random review count between 10 and 500
  return Math.floor(Math.random() * 491) + 10;
};

// Mapper functions to convert API types to UI types
export const mapApiProductToUI = (apiProduct: Product): UIProduct => {
  return {
    ...apiProduct,
    rating: apiProduct.averageRating || generateRandomRating(),
    reviewCount: apiProduct._count?.reviews || generateRandomReviewCount(),
    available: apiProduct.stock,
    images: apiProduct.images.map(img => img.url),
    image: apiProduct.images.find(img => img.isPrimary)?.url || apiProduct.images[0]?.url || '',
    categoryName: apiProduct.category.name,
    // Legacy fields with defaults
    oldPrice: undefined,
    soldToday: 0,
    age: undefined,
    brand: apiProduct.brand || '',
  };
};

export const mapApiReviewToUI = (apiReview: Review): UIReview => {
  return {
    ...apiReview,
    userName: `${apiReview.user.firstName} ${apiReview.user.lastName}`,
    userAvatar: '/images/avatars/default-avatar.jpg', // Default avatar
    date: new Date(apiReview.createdAt).toLocaleDateString('fr-FR'),
    badge: undefined,
  };
};

// Legacy Product interface for backward compatibility
export interface LegacyProduct {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  available: number;
  soldToday: number;
  images: string[];
  description: string;
  category: string;
  brand: string;
  age: string;
}

export interface LegacyReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  badge?: string;
}

export interface LegacyBrand {
  id: string;
  name: string;
  logo: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

// Legacy data structure for backward compatibility
export const legacyProducts: LegacyProduct[] = [
  {
    id: '1',
    name: 'LEGO Classic Creative Fun',
    price: 29.99,
    oldPrice: 39.99,
    rating: 4.8,
    reviewCount: 1250,
    available: 50,
    soldToday: 15,
    images: ['/images/products/lego1.jpg', '/images/products/lego2.jpg', '/images/products/lego3.jpg'],
    description: 'Unleash your creativity with this classic LEGO set perfect for all ages.',
    category: 'Building Toys',
    brand: 'LEGO',
    age: '6+ years'
  },
  // Add more legacy products as needed
];

export const legacyReviews: LegacyReview[] = [
  {
    id: '1',
    userName: 'Marie Dupont',
    userAvatar: '/images/avatars/avatar1.jpg',
    rating: 5,
    comment: 'Excellent jouet, mon enfant adore ! La qualité est au rendez-vous.',
    date: '2024-01-15',
    badge: 'Parent'
  },
  // Add more legacy reviews as needed
];

export const legacyBrands: LegacyBrand[] = [
  { id: '1', name: 'LEGO', logo: '/images/logos/lego.png' },
  { id: '2', name: 'Barbie', logo: '/images/logos/barbie.png' },
  { id: '3', name: 'Hot Wheels', logo: '/images/logos/hotwheels.png' },
  { id: '4', name: 'Nintendo', logo: '/images/logos/nintendo.png' },
  { id: '5', name: 'Fisher-Price', logo: '/images/logos/fisherprice.png' },
  { id: '6', name: 'Play-Doh', logo: '/images/logos/playdoh.png' }
];

export const videos: Video[] = [
  {
    id: '1',
    title: 'LEGO Building Adventure',
    url: '/videos/lego-adventure.mp4',
    thumbnail: '/images/thumbnails/lego-thumb.jpg'
  },
  {
    id: '2',
    title: 'Barbie Dreamhouse Tour',
    url: '/videos/barbie-tour.mp4',
    thumbnail: '/images/thumbnails/barbie-thumb.jpg'
  },
  {
    id: '3',
    title: 'Hot Wheels Racing',
    url: '/videos/hotwheels-race.mp4',
    thumbnail: '/images/thumbnails/hotwheels-thumb.jpg'
  }
];

// Cart-related types for backend integration
export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCartItemDto {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}

export interface GuestCartItemDto {
  productId: string;
  quantity: number;
}

export interface GuestCustomerInfo {
  email: string;
  name: string;
  phone: string;
}

export interface GuestShippingAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface GuestPaymentInfo {
  provider: 'stripe' | 'paypal';
  currency: string;
}

export interface GuestCheckoutDto {
  productId: string;
  quantity: number;
  customerInfo: GuestCustomerInfo;
  shippingAddress: GuestShippingAddress;
  payment: GuestPaymentInfo;
}

export interface GuestOrder {
  id: string;
  userId: string;
  total: number;
  status: string;
  guestInfo?: {
    email: string;
    name: string;
    phone: string;
    shippingAddress: GuestShippingAddress;
  };
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    product: Product;
  }>;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  provider: string;
  paymentMethod: string;
  status: string;
  description: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface GuestCheckoutResponse {
  success: boolean;
  order: GuestOrder;
  payment: Payment;
  message: string;
  error?: string;
}

export interface ConvertAnonymousCartDto {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export const benefits = [
  {
    icon: '🚚',
    title: 'Free Shipping',
    description: 'Free delivery on orders over €50'
  },
  {
    icon: '⭐',
    title: 'Premium Quality',
    description: 'High-quality toys from trusted brands'
  },
  {
    icon: '♻️',
    title: 'Durable & Safe',
    description: 'Long-lasting fun with safety standards'
  },
  {
    icon: '💝',
    title: 'Gift Ready',
    description: 'Perfect gifts for all occasions'
  }
];

export const faqData = [
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unused items in their original packaging.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries in Europe. Shipping costs vary by destination.'
  },
  {
    question: 'Are your toys safe for children?',
    answer: 'All our toys meet European safety standards (CE marking) and are tested for quality.'
  },
  {
    question: 'Can I track my order?',
    answer: 'Yes, you will receive a tracking number via email once your order ships.'
  }
];

// Order-related types from backend integration
export interface Order {
  id: string;
  userId: string;
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  guestInfo?: {
    email: string;
    name: string;
    phone: string;
    shippingAddress: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
  };
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface CreateOrderDto {
  userId?: string;
  sessionId?: string;
  total: number;
  status?: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
}

export interface OrderFilters {
  userId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface OrderResponse {
  success: boolean;
  order?: Order;
  orders?: Order[];
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Enhanced guest checkout types for backend integration
export interface GuestCheckoutData {
  sessionId?: string;
  productId?: string;
  quantity?: number;
  customerInfo: {
    email: string;
    name: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  payment: {
    provider: 'stripe' | 'paypal';
    currency: string;
    method?: 'checkout_session' | 'payment_intent'; // For Stripe: redirect vs embedded
  };
  delivery?: {
    carrier: string;
    estimatedDeliveryDate: string;
  };
}

export interface GuestCheckoutBackendResponse {
  success: boolean;
  order: Order;
  payment: Payment;
  message: string;
  error?: string;
}

// Payment transaction types
export interface PaymentTransaction {
  id: string;
  paymentId: string;
  type: 'PAYMENT' | 'REFUND' | 'CHARGEBACK';
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  amount: number;
  currency: string;
  provider: string;
  providerTransactionId?: string;
  providerData?: Record<string, any>;
  createdAt: string;
}

// Enhanced payment status for backend
export interface PaymentStatusBackend {
  paymentId: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';
  amount: number;
  currency: string;
  provider: 'stripe' | 'paypal';
  createdAt: string;
  updatedAt: string;
  transactions: PaymentTransaction[];
  order: {
    id: string;
    status: string;
    total: number;
  };
}

// Payment analytics for admin dashboard
export interface PaymentAnalytics {
  totalPayments: number;
  totalAmount: number;
  successfulPayments: number;
  failedPayments: number;
  cancelledPayments: number;
  refundedAmount: number;
  providers: {
    stripe: { count: number; amount: number };
    paypal: { count: number; amount: number };
  };
  methods: {
    CREDIT_CARD: number;
    DEBIT_CARD: number;
    PAYPAL: number;
    BANK_TRANSFER: number;
  };
  statusBreakdown: {
    PENDING: number;
    PROCESSING: number;
    COMPLETED: number;
    FAILED: number;
    CANCELLED: number;
    REFUNDED: number;
    PARTIALLY_REFUNDED: number;
  };
}

// Callback types for payment providers
export interface PayPalCallbackData {
  paymentId: string;
  success: boolean;
  transactionId?: string;
}

export interface StripeCallbackData {
  paymentIntentId: string;
  success: boolean;
}

// Health check response
export interface PaymentHealthCheck {
  stripe: {
    configured: boolean;
    keyPrefix: string;
  };
  paypal: {
    configured: boolean;
    environment: string;
    clientIdPrefix: string;
  };
  message: string;
}

// Payment DTOs for API calls
export interface CreatePaymentDto {
  orderId: string;
  provider: 'stripe' | 'paypal';
  amount: number;
  currency: string;
  paymentMethod: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER';
  description?: string;
  metadata?: Record<string, any>;
}

export interface ConfirmPaymentDto {
  provider: 'stripe' | 'paypal';
  paymentId?: string;
  stripePaymentIntentId?: string;
  paypalOrderId?: string;
}

export interface RefundPaymentDto {
  paymentId: string;
  provider: 'stripe' | 'paypal';
  amount?: number;
  reason?: string;
}

export interface PaymentConfig {
  stripe: {
    publishableKey: string;
  };
  paypal: {
    clientId: string;
    environment: string;
  };
}