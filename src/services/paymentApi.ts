import api from './api';
import type {
  PaymentStatusBackend,
  PayPalCallbackData,
  StripeCallbackData
} from '../types';

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

export interface PaymentStatus {
  paymentId: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';
  amount: number;
  currency: string;
  provider: 'stripe' | 'paypal';
  createdAt: string;
  updatedAt: string;
  transactions: Array<{
    id: string;
    type: string;
    status: string;
    amount: number;
    createdAt: string;
  }>;
}

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
  methods: Record<string, number>;
  statusBreakdown: Record<string, number>;
}

class PaymentApiService {
  /**
   * Get payment configuration for frontend
   */
  async getPaymentConfig(): Promise<PaymentConfig> {
    try {
      const response = await api.get('/payments/config');
      return response.data;
    } catch (error) {

      // Return default configuration if backend is not available
      return {
        stripe: {
          publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
        },
        paypal: {
          clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
          environment: import.meta.env.VITE_PAYPAL_ENVIRONMENT || 'sandbox',
        },
      };
    }
  }

  /**
   * Create a new payment
   */
  async createPayment(createPaymentDto: CreatePaymentDto): Promise<any> {
    const response = await api.post('/payments/create', createPaymentDto);
    return response.data;
  }

  /**
   * Confirm a payment
   */
  async confirmPayment(confirmPaymentDto: ConfirmPaymentDto): Promise<any> {
    const response = await api.post('/payments/confirm', confirmPaymentDto);
    return response.data;
  }

  /**
   * Refund a payment
   */
  async refundPayment(refundPaymentDto: RefundPaymentDto): Promise<any> {
    const response = await api.post('/payments/refund', refundPaymentDto);
    return response.data;
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    const response = await api.get(`/payments/${paymentId}/status`);
    return response.data;
  }

  /**
   * Get payments for an order
   */
  async getOrderPayments(orderId: string): Promise<any[]> {
    const response = await api.get(`/payments/order/${orderId}`);
    return response.data;
  }

  /**
   * Get payments for a user
   */
  async getUserPayments(userId: string, limit = 20, offset = 0): Promise<any[]> {
    const response = await api.get(`/payments/user/${userId}`, {
      params: { limit, offset }
    });
    return response.data;
  }

  /**
   * Cancel a pending payment
   */
  async cancelPayment(paymentId: string): Promise<any> {
    const response = await api.post(`/payments/${paymentId}/cancel`);
    return response.data;
  }

  /**
   * Test payment services configuration
   */
  async testPaymentServices(): Promise<any> {
    const response = await api.get('/payments/test');
    return response.data;
  }

  /**
   * Initialize Stripe payment with backend
   */
  async initializeStripePayment(orderId: string, amount: number, currency = 'EUR'): Promise<any> {
    return this.createPayment({
      orderId,
      provider: 'stripe',
      amount,
      currency,
      paymentMethod: 'CREDIT_CARD',
      description: `Payment for order ${orderId}`,
    });
  }

  /**
   * Initialize PayPal payment with backend
   */
  async initializePayPalPayment(orderId: string, amount: number, currency = 'EUR'): Promise<any> {
    return this.createPayment({
      orderId,
      provider: 'paypal',
      amount,
      currency,
      paymentMethod: 'PAYPAL',
      description: `PayPal payment for order ${orderId}`,
    });
  }

  /**
   * Handle successful payment redirect
   */
  async handlePaymentSuccess(provider: 'stripe' | 'paypal', paymentData: any): Promise<any> {
    const confirmData: ConfirmPaymentDto = {
      provider
    };

    if (provider === 'stripe' && paymentData.paymentIntentId) {
      confirmData.stripePaymentIntentId = paymentData.paymentIntentId;
    } else if (provider === 'paypal' && paymentData.orderId) {
      confirmData.paypalOrderId = paymentData.orderId;
      confirmData.paymentId = paymentData.paymentId;
    } else if (paymentData.paymentId) {
      confirmData.paymentId = paymentData.paymentId;
    }

    return this.confirmPayment(confirmData);
  }

  /**
   * Get payment analytics for admin
   */
  async getPaymentAnalytics(startDate: Date, endDate: Date): Promise<PaymentAnalytics> {
    const response = await api.get('/payments/analytics', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    });
    return response.data;
  }

  /**
   * Health check for payment services
   */
  async healthCheck(): Promise<{ stripe: boolean; paypal: boolean; backend: boolean }> {
    try {
      const config = await this.testPaymentServices();
      return {
        stripe: config.stripe?.configured || false,
        paypal: config.paypal?.configured || false,
        backend: true,
      };
    } catch (error) {

      return {
        stripe: false,
        paypal: false,
        backend: false,
      };
    }
  }

  /**
   * Unified checkout endpoint - Create order and payment in one step
   * Supports both redirect-based (checkout_session) and embedded (payment_intent) flows
   */
  async unifiedCheckout(checkoutData: {
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
  }): Promise<any> {
    try {
      // Validate required fields
      if (!checkoutData.customerInfo?.email || !checkoutData.customerInfo?.name) {
        throw new Error('Customer email and name are required');
      }
      
      if (!checkoutData.shippingAddress?.street || !checkoutData.shippingAddress?.city) {
        throw new Error('Complete shipping address is required');
      }

      // For Stripe, default to checkout_session for redirect flow
      if (checkoutData.payment.provider === 'stripe' && !checkoutData.payment.method) {
        checkoutData.payment.method = 'checkout_session';
      }

      const response = await api.post('/payments/unified-checkout', checkoutData);
      return response.data;
    } catch (error) {

      throw error;
    }
  }

  /**
   * Guest checkout - Create order and payment in one step (legacy support)
   */
  async guestCheckout(checkoutData: {
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
    };
    delivery?: {
      carrier: string;
      estimatedDeliveryDate: string;
    };
  }): Promise<any> {
    const response = await api.post('/payments/guest-checkout', checkoutData);
    return response.data;
  }

  /**
   * Create Stripe Checkout Session for redirect-based payments
   */
  async createStripeCheckoutSession(checkoutData: {
    orderId?: string;
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
    currency?: string;
    delivery?: {
      carrier: string;
      estimatedDeliveryDate: string;
    };
  }): Promise<any> {
    const response = await api.post('/payments/stripe/checkout', checkoutData);
    return response.data;
  }

  /**
   * Get Stripe checkout session status
   */
  async getStripeSessionStatus(sessionId: string): Promise<any> {
    const response = await api.get(`/payments/stripe/session/${sessionId}`);
    return response.data;
  }

  /**
   * Cancel Stripe checkout session
   */
  async cancelStripeSession(sessionId: string): Promise<any> {
    const response = await api.post(`/payments/stripe/session/${sessionId}/cancel`);
    return response.data;
  }

  /**
   * PayPal payment confirmation callback
   */
  async confirmPayPalCallback(data: PayPalCallbackData): Promise<any> {
    const response = await api.post('/payments/callback/paypal', data);
    return response.data;
  }

  /**
   * Stripe payment confirmation callback
   */
  async confirmStripeCallback(data: StripeCallbackData): Promise<any> {
    const response = await api.post('/payments/callback/stripe', data);
    return response.data;
  }

  /**
   * Process Stripe webhook
   */
  async processStripeWebhook(payload: Buffer, signature: string): Promise<any> {
    const response = await api.post('/payments/webhook/stripe', payload, {
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': signature,
      },
    });
    return response.data;
  }

  /**
   * Process PayPal webhook
   */
  async processPayPalWebhook(payload: any, headers: any): Promise<any> {
    const response = await api.post('/payments/webhook/paypal', payload, {
      headers,
    });
    return response.data;
  }

  /**
   * Get detailed payment status with backend integration
   */
  async getDetailedPaymentStatus(paymentId: string): Promise<PaymentStatusBackend> {
    const response = await api.get(`/payments/${paymentId}/status`);
    return response.data;
  }

  /**
   * Get payment analytics for admin
   */
  async getDetailedPaymentAnalytics(startDate: Date, endDate: Date): Promise<PaymentAnalytics> {
    const response = await api.get('/payments/analytics', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    });
    return response.data;
  }
}

const paymentApi = new PaymentApiService();
export default paymentApi;