import api from './api';
import type { Order, OrderItem, OrderFilters } from '../types';

export interface CreateOrderFromCartDto {
  sessionId?: string;
  userId?: string;
}

export interface OrderListResponse {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class OrdersApiService {
  /**
   * Create an order from the user's cart
   */
  async createOrderFromCart(createOrderDto: CreateOrderFromCartDto = {}): Promise<Order> {
    const response = await api.post('/orders', createOrderDto);
    return response.data;
  }

  /**
   * Get all orders for the current user
   */
  async getUserOrders(): Promise<Order[]> {
    const response = await api.get('/orders');
    return response.data;
  }

  /**
   * Get orders with filters and pagination
   */
  async getOrders(filters: OrderFilters = {}): Promise<OrderListResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/orders?${params.toString()}`);
    return response.data;
  }

  /**
   * Get a specific order by ID
   */
  async getOrderById(orderId: string): Promise<Order> {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  }

  /**
   * Get orders for a specific user (admin functionality)
   */
  async getUserOrdersById(userId: string, limit = 20, offset = 0): Promise<OrderListResponse> {
    const response = await api.get(`/orders/user/${userId}`, {
      params: { limit, offset }
    });
    return response.data;
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    const response = await api.patch(`/orders/${orderId}/status`, { status });
    return response.data;
  }

  /**
   * Cancel an order
   */
  async cancelOrder(orderId: string, reason?: string): Promise<Order> {
    const response = await api.post(`/orders/${orderId}/cancel`, { reason });
    return response.data;
  }

  /**
   * Get order statistics for admin dashboard
   */
  async getOrderStatistics(startDate?: Date, endDate?: Date): Promise<{
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    averageOrderValue: number;
  }> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate.toISOString());
    if (endDate) params.append('endDate', endDate.toISOString());

    const response = await api.get(`/orders/statistics?${params.toString()}`);
    return response.data;
  }

  /**
   * Search orders by various criteria
   */
  async searchOrders(query: {
    search?: string;
    status?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
    page?: number;
    limit?: number;
  }): Promise<OrderListResponse> {
    const params = new URLSearchParams();
    
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/orders/search?${params.toString()}`);
    return response.data;
  }

  /**
   * Get order items for a specific order
   */
  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    const response = await api.get(`/orders/${orderId}/items`);
    return response.data;
  }

  /**
   * Track order delivery status
   */
  async trackOrderDelivery(orderId: string): Promise<{
    orderId: string;
    status: string;
    trackingNumber?: string;
    carrier?: string;
    estimatedDelivery?: string;
    deliveryHistory: Array<{
      status: string;
      location: string;
      timestamp: string;
      description: string;
    }>;
  }> {
    const response = await api.get(`/orders/${orderId}/track`);
    return response.data;
  }

  /**
   * Get recent orders for dashboard
   */
  async getRecentOrders(limit = 10): Promise<Order[]> {
    const response = await api.get('/orders/recent', {
      params: { limit }
    });
    return response.data;
  }

  /**
   * Export orders to CSV (admin functionality)
   */
  async exportOrders(filters: OrderFilters = {}): Promise<Blob> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/orders/export?${params.toString()}`, {
      responseType: 'blob'
    });
    return response.data;
  }

  /**
   * Create a repeat order from a previous order
   */
  async createRepeatOrder(originalOrderId: string, modifications?: {
    shippingAddress?: any;
    items?: Array<{ productId: string; quantity: number }>;
  }): Promise<Order> {
    const response = await api.post(`/orders/${originalOrderId}/repeat`, modifications);
    return response.data;
  }

  /**
   * Get order analytics for reporting
   */
  async getOrderAnalytics(period: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<string, number>;
    revenueByPeriod: Array<{
      period: string;
      orders: number;
      revenue: number;
    }>;
    topProducts: Array<{
      productId: string;
      productName: string;
      quantitySold: number;
      revenue: number;
    }>;
  }> {
    const response = await api.get(`/orders/analytics?period=${period}`);
    return response.data;
  }
}

const ordersApi = new OrdersApiService();
export default ordersApi;