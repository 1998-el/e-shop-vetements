// Payment configuration
export const paymentConfig = {
  // API endpoints
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    payments: '/api/payments', // Note: keeping /api/payments as backend expects this path
  },
  
  // Payment provider configurations
  providers: {
    stripe: {
      publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
      currency: 'EUR',
    },
    paypal: {
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
      environment: import.meta.env.VITE_PAYPAL_ENVIRONMENT || 'sandbox',
      currency: 'EUR',
    },
  },
  
  // URLs for redirects
  urls: {
    success: `${window.location.origin}/checkout/success`,
    cancel: `${window.location.origin}/checkout`,
  },
  
  // Payment settings
  settings: {
    retryAttempts: 3,
    timeout: 30000,
    debug: import.meta.env.DEV,
  },
};

// Helper functions
export const isPaymentConfigured = () => {
  const stripeConfigured = !!paymentConfig.providers.stripe.publishableKey;
  const paypalConfigured = !!paymentConfig.providers.paypal.clientId;
  
  return {
    stripe: stripeConfigured,
    paypal: paypalConfigured,
    any: stripeConfigured || paypalConfigured,
  };
};

export const getPaymentProviderConfig = (provider: 'stripe' | 'paypal') => {
  return paymentConfig.providers[provider];
};

export const getApiUrl = (endpoint: string = '') => {
  // Remove leading slash from endpoint to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${paymentConfig.api.baseUrl}${paymentConfig.api.payments}/${cleanEndpoint}`;
};
