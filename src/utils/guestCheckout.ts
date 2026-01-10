import paymentApi from '../services/paymentApi';
import type { GuestCheckoutData } from '../types';

// Guest checkout utility functions
export const guestCheckout = {
  /**
   * Process guest checkout with unified checkout system
   * Supports both redirect-based (Stripe Checkout Sessions) and embedded flows
   */
  processCartCheckout: async (checkoutData: GuestCheckoutData): Promise<any> => {
    try {
      // Ensure we have a proper sessionId
      if (!checkoutData.sessionId) {
        throw new Error('Session ID is required for guest checkout');
      }

      // Use unified checkout with proper payment method handling
      const response = await paymentApi.unifiedCheckout(checkoutData);
      
      if (!response.success) {
        throw new Error(response.error || 'Checkout failed');
      }

      // Handle Stripe checkout session redirect
      if (response.checkoutUrl) {
        // Store order information for success page
        sessionStorage.setItem('currentOrder', JSON.stringify({
          orderId: response.order.id,
          sessionId: response.sessionId,
          paymentId: response.payment?.id
        }));
        
        // Redirect to Stripe Checkout
        window.location.href = response.checkoutUrl;
        return response;
      }
      
      // For PayPal or embedded payments, return response for further processing
      return response;
    } catch (error) {

      throw error;
    }
  },

  /**
   * Process guest checkout with explicit payment method
   * Use this for Stripe Checkout Sessions (redirect flow)
   */
  processCartCheckoutWithRedirect: async (checkoutData: GuestCheckoutData): Promise<any> => {
    try {
      // Ensure we have a proper sessionId
      if (!checkoutData.sessionId) {
        throw new Error('Session ID is required for guest checkout');
      }

      // Force Stripe Checkout Session for redirect flow
      const redirectCheckoutData: GuestCheckoutData = {
        ...checkoutData,
        payment: {
          ...checkoutData.payment,
          method: 'checkout_session' as const
        }
      };

      const response = await paymentApi.unifiedCheckout(redirectCheckoutData);
      
      if (!response.success) {
        throw new Error(response.error || 'Checkout failed');
      }

      // Handle redirect
      if (response.checkoutUrl) {
        // Store order information for success page
        sessionStorage.setItem('currentOrder', JSON.stringify({
          orderId: response.order.id,
          sessionId: response.sessionId,
          paymentId: response.payment?.id
        }));
        
        // Redirect to Stripe Checkout
        window.location.href = response.checkoutUrl;
      } else {
        throw new Error('No checkout URL received from Stripe');
      }
      
      return response;
    } catch (error) {

      throw error;
    }
  },

  /**
   * Process single product checkout with unified system
   */
  processProductCheckout: async (
    productId: string,
    quantity: number,
    customerInfo: {
      email: string;
      name: string;
      phone: string;
    },
    shippingAddress: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    },
    paymentProvider: 'stripe' | 'paypal' = 'stripe',
    currency: string = 'EUR',
    paymentMethod?: 'checkout_session' | 'payment_intent'
  ): Promise<any> => {
    const checkoutData: GuestCheckoutData = {
      productId,
      quantity,
      customerInfo,
      shippingAddress,
      payment: {
        provider: paymentProvider,
        currency,
        method: paymentMethod
      },
    };

    // Use unified checkout
    const response = await paymentApi.unifiedCheckout(checkoutData);
    
    // Handle Stripe redirect if checkout URL is provided
    if (response.checkoutUrl) {
      // Store order information
      sessionStorage.setItem('currentOrder', JSON.stringify({
        orderId: response.order.id,
        sessionId: response.sessionId,
        paymentId: response.payment?.id
      }));
      
      // Redirect to Stripe Checkout
      window.location.href = response.checkoutUrl;
    }
    
    return response;
  },


  /**
   * Create guest checkout data for cart-based checkout
   */
  createCartCheckoutData: (
    sessionId: string,
    customerInfo: {
      email: string;
      name: string;
      phone: string;
    },
    shippingAddress: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    },
    paymentProvider: 'stripe' | 'paypal' = 'stripe',
    currency: string = 'EUR'
  ): GuestCheckoutData => {
    return {
      sessionId,
      customerInfo,
      shippingAddress,
      payment: {
        provider: paymentProvider,
        currency,
      },
    };
  },

  /**
   * Validate customer information
   */
  validateCustomerInfo: (customerInfo: {
    email: string;
    name: string;
    phone: string;
  }): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!customerInfo.email || !customerInfo.email.includes('@')) {
      errors.push('Email invalide');
    }

    if (!customerInfo.name || customerInfo.name.trim().length < 2) {
      errors.push('Nom invalide');
    }

    if (!customerInfo.phone || customerInfo.phone.trim().length < 8) {
      errors.push('Téléphone invalide');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate shipping address
   */
  validateShippingAddress: (address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  }): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!address.street || address.street.trim().length < 5) {
      errors.push('Adresse invalide');
    }

    if (!address.city || address.city.trim().length < 2) {
      errors.push('Ville invalide');
    }

    if (!address.postalCode || address.postalCode.trim().length < 3) {
      errors.push('Code postal invalide');
    }

    if (!address.country || address.country.trim().length < 2) {
      errors.push('Pays invalide');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

export default guestCheckout;