import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import { isValidEmail } from '../utils/validation';
import CountrySelector from '../components/common/CountrySelector';
import paymentApi from '../services/paymentApi';
import { guestCheckout } from '../utils/guestCheckout';
import { Truck, Shield, CreditCard, Smartphone, AlertCircle, ChevronRight, Home, Package, CheckCircle } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, getTotal, clearCart, sessionId } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
  });

  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'stripe'>('paypal');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState<any>(null);
  const [currentPaymentId, setCurrentPaymentId] = useState<string | null>(null);

  const shippingCost = getTotal() >= 50 ? 0 : 5.99;
  const total = getTotal() + shippingCost;

  // Load payment configuration on component mount
  useEffect(() => {
    loadPaymentConfig();
  }, []);

  const loadPaymentConfig = async () => {
    try {
      const config = await paymentApi.getPaymentConfig();
      setPaymentConfig(config);
    } catch (error) {
      console.error('Failed to load payment config:', error);
      // Continue with default configuration
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCountryChange = (country: string) => {
    setFormData(prev => ({ ...prev, country }));
    if (errors.country) {
      setErrors(prev => ({ ...prev, country: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Shipping validation
    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis';
    if (!formData.address.trim()) newErrors.address = 'Adresse requise';
    if (!formData.city.trim()) newErrors.city = 'Ville requise';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Code postal requis';
    if (!formData.country.trim()) newErrors.country = 'Pays requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createOrderData = () => {
    return {
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      items: cart?.cartItems?.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })) || [],
      total: total,
      subtotal: getTotal(),
      shippingCost: shippingCost,
      paymentMethod: paymentMethod,
    };
  };

  const handlePayPalPayment = async () => {
    if (!validateForm()) return;

    if (!sessionId) {
      setErrors({ submit: 'Session non valide. Veuillez recharger la page.' });
      return;
    }

    setIsSubmitting(true);
    try {
      // Use the new unified checkout system for PayPal
      const checkoutData = guestCheckout.createCartCheckoutData(
        sessionId,
        {
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
        },
        {
          street: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        'paypal',
        'EUR'
      );

      const response = await guestCheckout.processCartCheckout(checkoutData);

      if (response.success && response.payment) {
        // Clear cart and redirect to success page
        clearCart();
        sessionStorage.removeItem('currentOrder');
        navigate('/checkout/success', {
          state: {
            order: response.order,
            payment: response.payment
          }
        });
      } else {
        throw new Error(response.error || 'Erreur lors du paiement PayPal');
      }
    } catch (error: any) {
      console.error('PayPal payment error:', error);
      setErrors({ submit: error.message || 'Erreur lors du paiement PayPal' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStripePayment = async () => {
    if (!validateForm()) return;

    if (!sessionId) {
      setErrors({ submit: 'Session non valide. Veuillez recharger la page.' });
      return;
    }

    setIsSubmitting(true);
    try {
      // Use the new unified checkout system with Stripe Checkout Session (redirect flow)
      const checkoutData = guestCheckout.createCartCheckoutData(
        sessionId,
        {
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
        },
        {
          street: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        'stripe',
        'EUR'
      );

      // Use the redirect-specific checkout method for Stripe
      const response = await guestCheckout.processCartCheckoutWithRedirect(checkoutData);

      // Note: For Stripe Checkout Sessions, the redirect happens automatically
      // The function will redirect to Stripe and we won't reach this code
      // This is here for fallback/error handling
    } catch (error: any) {
      console.error('Stripe payment error:', error);
      setErrors({ submit: error.message || 'Erreur lors du paiement Stripe' });
      setIsSubmitting(false); // Only set to false if there's an error
    }
    // Don't set isSubmitting to false on success as we redirect
  };

  const handlePaymentSuccess = async (provider: 'stripe' | 'paypal', paymentData: any) => {
    try {
      // Get the stored order data
      const storedOrderData = sessionStorage.getItem('currentOrder');
      if (!storedOrderData) {
        throw new Error('No order data found');
      }

      const { orderId, paymentId } = JSON.parse(storedOrderData);
      
      // Confirm the payment with backend
      await paymentApi.handlePaymentSuccess(provider, {
        paymentId,
        ...paymentData
      });

      // Clear cart and redirect to success page
      clearCart();
      sessionStorage.removeItem('currentOrder');
      navigate('/checkout/success');
    } catch (error: any) {
      console.error('Payment confirmation error:', error);
      setErrors({ submit: error.message || 'Erreur lors de la confirmation du paiement' });
    }
  };

  // Handle payment return from PayPal/Stripe
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Handle Stripe Checkout Session return
    const stripeSessionId = urlParams.get('session_id');
    const stripeSuccess = urlParams.get('success');
    const stripeCancel = urlParams.get('cancel');
    
    // Handle legacy PayPal/Stripe payment intent return
    const paymentId = urlParams.get('paymentId');
    const provider = urlParams.get('provider');
    const success = urlParams.get('success');
    const cancel = urlParams.get('cancel');

    // Handle Stripe Checkout Session cancellation
    if (stripeSessionId && stripeCancel === 'true') {
      handlePaymentCancellation('stripe', { sessionId: stripeSessionId });
      return;
    }
    
    // Handle Stripe Checkout Session success
    if (stripeSessionId && stripeSuccess === 'true') {
      handleStripeSessionSuccess(stripeSessionId);
      return;
    }
    
    // Handle legacy payment intent cancellations
    if (paymentId && provider && cancel === 'true') {
      handlePaymentCancellation(provider as 'stripe' | 'paypal', { paymentId });
      return;
    }
    
    // Handle legacy payment intent returns
    if (paymentId && provider && success === 'true') {
      handlePaymentSuccess(provider as 'stripe' | 'paypal', { paymentId });
    }
  }, []);

  // Handle Stripe Checkout Session success
  const handleStripeSessionSuccess = async (sessionId: string) => {
    try {
      setIsSubmitting(true);
      
      // Get session status from backend
      const sessionStatus = await paymentApi.getStripeSessionStatus(sessionId);
      
      if (sessionStatus.status === 'complete' || sessionStatus.paymentStatus === 'paid') {
        // Payment was successful
        clearCart();
        sessionStorage.removeItem('currentOrder');
        
        navigate('/checkout/success', {
          state: {
            order: sessionStatus.order,
            payment: {
              id: sessionStatus.paymentId,
              provider: 'stripe',
              status: 'COMPLETED'
            },
            sessionId: sessionId
          }
        });
      } else {
        throw new Error('Payment was not completed successfully');
      }
    } catch (error: any) {
      console.error('Stripe session success handling error:', error);
      setErrors({ submit: error.message || 'Erreur lors de la confirmation du paiement Stripe' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle payment cancellation
  const handlePaymentCancellation = async (provider: 'stripe' | 'paypal', paymentData: any) => {
    try {
      // Clean up session data
      sessionStorage.removeItem('currentOrder');
      
      // Get cancellation details
      const cancellationData = {
        provider,
        reason: 'Annulé par l\'utilisateur',
        ...paymentData
      };
      
      // Navigate to cancellation page
      navigate('/payment/cancel', {
        state: {
          reason: cancellationData.reason,
          payment: {
            provider: provider,
            amount: total, // We can get this from the current cart total
            ...paymentData
          }
        },
        replace: true
      });
    } catch (error: any) {
      console.error('Payment cancellation handling error:', error);
      // Still navigate to cancellation page even if there's an error
      navigate('/payment/cancel', {
        state: {
          reason: 'Erreur lors de l\'annulation',
          payment: {
            provider: provider,
            amount: total,
            ...paymentData
          }
        },
        replace: true
      });
    }
  };

  if ((cart?.cartItems?.length || 0) === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Panier vide</h1>
            <p className="text-gray-600 mb-8">Ajoutez des produits à votre panier avant de passer commande.</p>
            <button
              onClick={() => navigate('/products')}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50"
            >
              Continuer mes achats
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-900 flex items-center gap-1">
              <Home className="w-3 h-3" />
              Accueil
            </Link>
            <ChevronRight className="w-3 h-3 mx-2" />
            <Link to="/cart" className="hover:text-gray-900">Panier</Link>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="text-gray-900 font-medium">Paiement</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Paiement</h1>
          <p className="text-gray-600 mt-2">Finalisez votre commande</p>
        </div>

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700">{errors.submit}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="border border-gray-200 rounded p-6">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="w-5 h-5 text-gray-900" />
                <h2 className="text-xl font-semibold text-gray-900">Adresse de livraison</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code postal *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                      errors.postalCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>

                <div>
                  <CountrySelector
                    value={formData.country}
                    onChange={handleCountryChange}
                    error={errors.country}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="border border-gray-200 rounded p-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-5 h-5 text-gray-900" />
                <h2 className="text-xl font-semibold text-gray-900">Méthode de paiement</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* PayPal Option */}
                  <div
                    onClick={() => setPaymentMethod('paypal')}
                    className={`border rounded p-4 cursor-pointer transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border ${
                        paymentMethod === 'paypal' ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'paypal' && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">PP</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">PayPal</h3>
                          <p className="text-sm text-gray-600">Paiement sécurisé</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stripe Option */}
                  <div
                    onClick={() => setPaymentMethod('stripe')}
                    className={`border rounded p-4 cursor-pointer transition-all ${
                      paymentMethod === 'stripe'
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border ${
                        paymentMethod === 'stripe' ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'stripe' && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Stripe</h3>
                          <p className="text-sm text-gray-600">Carte bancaire</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-gray-900" />
                    <span className="text-sm font-medium text-gray-900">Paiement 100% sécurisé</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Vos informations de paiement sont protégées par cryptage SSL. 
                    Aucun donnée bancaire n'est stockée sur nos serveurs.
                  </p>
                </div>

                {/* Payment Configuration Status */}
                {paymentConfig && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Configuration des paiements:</h4>
                    <div className="flex gap-4 text-xs text-blue-700">
                      <span>✓ Stripe: {paymentConfig.stripe?.publishableKey ? 'Configuré' : 'Non configuré'}</span>
                      <span>✓ PayPal: {paymentConfig.paypal?.clientId ? 'Configuré' : 'Non configuré'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="border border-gray-200 rounded p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Récapitulatif</h2>

              <div className="space-y-4 mb-6">
                {(cart?.cartItems || []).map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.product.images?.find(img => img.isPrimary)?.url || item.product.images?.[0]?.url || '/images/products/default.jpg'}
                      alt={item.product.name}
                      className="w-12 h-12 object-contain rounded border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/products/default.jpg';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">€{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-medium">€{getTotal().toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Gratuite' : `€${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Info Section */}
              <div className="mb-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Livraison gratuite dès 50€</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Retour 14 jours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Garantie qualité</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                type="button"
                onClick={paymentMethod === 'paypal' ? handlePayPalPayment : handleStripePayment}
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-3 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Traitement...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    {paymentMethod === 'paypal' ? 'Payer avec PayPal' : 'Payer avec Stripe'}
                  </>
                )}
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Paiement sécurisé SSL</span>
                </div>
              </div>

              {/* Payment method icons */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <span>Accepté:</span>
                <div className="flex gap-1">
                  <div className="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">PP</div>
                  <div className="w-6 h-4 bg-purple-600 rounded flex items-center justify-center">
                    <Smartphone className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;