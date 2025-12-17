// Delivery-related types - correspond exactement aux modèles Prisma du backend
export interface Delivery {
  id: string;
  orderId: string;
  userId?: string;
  trackingNumber: string;
  carrier: string;
  status: DeliveryStatus;
  shippingAddress: ShippingAddress;
  recipientName: string;
  estimatedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  notes?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  // Relations incluses par Prisma (selon les includes du backend)
  order?: Order;
  user?: User;
}

export const DeliveryStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  IN_TRANSIT: 'IN_TRANSIT',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  FAILED: 'FAILED',
  RETURNED: 'RETURNED'
} as const;

export type DeliveryStatus = typeof DeliveryStatus[keyof typeof DeliveryStatus];

// Correspond exactement au type Prisma ShippingAddress
export interface ShippingAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  additionalInfo?: string; // Champ optionnel pour informations supplémentaires
}

// DTOs pour les requêtes (correspondent aux DTOs NestJS)
export interface CreateDeliveryDto {
  orderId: string;
  userId?: string; // Optionnel selon les règles métier
  carrier: string;
  trackingNumber?: string; // Généré automatiquement si non fourni
  shippingAddress: ShippingAddress;
  recipientName: string;
  estimatedDeliveryDate: Date;
  notes?: string;
  location?: string;
}

export interface UpdateDeliveryDto {
  orderId?: string;
  userId?: string;
  carrier?: string;
  trackingNumber?: string;
  shippingAddress?: ShippingAddress;
  recipientName?: string;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  notes?: string;
  location?: string;
  status?: DeliveryStatus;
}

export interface UpdateDeliveryStatusDto {
  status: DeliveryStatus;
  notes?: string;
  location?: string;
  actualDeliveryDate?: Date;
}

// Type pour le suivi de colis (format retourné par trackPackage)
export interface DeliveryTracking {
  trackingNumber: string;
  status: DeliveryStatus;
  carrier: string;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  location?: string;
  recipientName: string;
  shippingAddress: ShippingAddress;
  order: {
    id: string;
    total: number;
    items: number;
  };
  updates: DeliveryUpdate[];
}

export interface DeliveryUpdate {
  status: DeliveryStatus;
  timestamp: string;
  location?: string;
  notes?: string;
}

// Type pour les statistiques (retourné par getDeliveryStats)
export interface DeliveryStats {
  PENDING: number;
  PROCESSING: number;
  SHIPPED: number;
  IN_TRANSIT: number;
  OUT_FOR_DELIVERY: number;
  DELIVERED: number;
  FAILED: number;
  RETURNED: number;
}

// Types pour les relations (correspondent aux modèles Prisma)
export interface Order {
  id: string;
  userId?: string;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  // Relations incluses selon les includes du backend
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  brand?: string;
  category: Category;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// Type pour les filtres de recherche (correspond aux query params NestJS)
export interface DeliveryFilters {
  userId?: string;
  status?: string;
  orderId?: string;
  carrier?: string;
}

// Réponse API standard (format NestJS)
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}