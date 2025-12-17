// DTOs pour les livraisons (correspondant aux DTOs NestJS)
import { DeliveryStatus } from './delivery';

export interface CreateDeliveryDto {
  orderId: string;
  userId?: string;
  carrier: string;
  trackingNumber?: string;
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

// Interfaces auxiliaires pour correspondre aux modèles Prisma
export interface ShippingAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  additionalInfo?: string;
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

export interface Order {
  id: string;
  userId?: string;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
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

// Réponse API standard NestJS
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Filtres pour les requêtes
export interface DeliveryFilters {
  userId?: string;
  status?: string;
  orderId?: string;
  carrier?: string;
}

// Données pour les statistiques
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