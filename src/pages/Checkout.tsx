import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import { isValidEmail } from '../utils/validation';
import CountrySelector from '../components/common/CountrySelector';
import paymentApi from '../services/paymentApi';
import { guestCheckout } from '../utils/guestCheckout';
import { 
  Truck, Shield, CreditCard, Smartphone, AlertCircle, ChevronRight, 
  Home, CheckCircle, User, MapPin, CreditCard as PaymentIcon,
  Loader2, CheckCircle2, XCircle, Save, ArrowLeft
} from 'lucide-react';

// Types pour la validation en temps réel
interface ValidationState {
  isValid: boolean;
  message: string;
  touched: boolean;
}

interface FormValidation {
  firstName: ValidationState;
  lastName: ValidationState;
  email: ValidationState;
  phone: ValidationState;
  address: ValidationState;
  city: ValidationState;
  postalCode: ValidationState;
  country: ValidationState;
}

const Checkout: React.FC = () => {
  const { cart, getTotal, clearCart, sessionId } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
  });

  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'stripe'>('stripe');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState<any>(null);

  const [currentStep] = useState(1);
  const [autoSaveEnabled] = useState(true);

  const shippingCost = getTotal() >= 50 ? 0 : 5.99;
  const total = getTotal() + shippingCost;

  // Load payment configuration
  useEffect(() => {
    loadPaymentConfig();
  }, []);

  // Auto-save form data to localStorage
  useEffect(() => {
    if (autoSaveEnabled && formData) {
      localStorage.setItem('checkout-form-data', JSON.stringify(formData));
    }
  }, [formData, autoSaveEnabled]);

  // Load saved form data
  useEffect(() => {
    const savedData = localStorage.getItem('checkout-form-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (error) {
        console.warn('Failed to parse saved form data:', error);
      }
    }
  }, []);

  const loadPaymentConfig = async () => {
    try {
      const config = await paymentApi.getPaymentConfig();
      setPaymentConfig(config);
    } catch (error) {
      console.error('Failed to load payment config:', error);
    }
  };

  // Validation functions
  const validateField = useCallback((name: string, value: string): ValidationState => {
    const trimmedValue = value.trim();
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!trimmedValue) {
          return { isValid: false, message: 'Champ requis', touched: true };
        }
        if (trimmedValue.length < 2) {
          return { isValid: false, message: 'Minimum 2 caractères', touched: true };
        }
        return { isValid: true, message: '', touched: true };
        
      case 'email':
        if (!trimmedValue) {
          return { isValid: false, message: 'Email requis', touched: true };
        }
        if (!isValidEmail(trimmedValue)) {
          return { isValid: false, message: 'Email invalide', touched: true };
        }
        return { isValid: true, message: '', touched: true };
        
      case 'phone':
        if (!trimmedValue) {
          return { isValid: false, message: 'Téléphone requis', touched: true };
        }
        if (!/^[+]?[\d\s\-\(\)]{8,}$/.test(trimmedValue)) {
          return { isValid: false, message: 'Numéro invalide', touched: true };
        }
        return { isValid: true, message: '', touched: true };
        
      case 'address':
        if (!trimmedValue) {
          return { isValid: false, message: 'Adresse requise', touched: true };
        }
        if (trimmedValue.length < 5) {
          return { isValid: false, message: 'Adresse trop courte', touched: true };
        }
        return { isValid: true, message: '', touched: true };
        
      case 'city':
        if (!trimmedValue) {
          return { isValid: false, message: 'Ville requise', touched: true };
        }
        return { isValid: true, message: '', touched: true };
        
      case 'postalCode':
        if (!trimmedValue) {
          return { isValid: false, message: 'Code postal requis', touched: true };
        }
        if (!/^[\d]{5}$/.test(trimmedValue)) {
          return { isValid: false, message: 'Code postal invalide', touched: true };
        }
        return { isValid: true, message: '', touched: true };
        
      case 'country':
        if (!trimmedValue) {
          return { isValid: false, message: 'Pays requis', touched: true };
        }
        return { isValid: true, message: '', touched: true };
        
      default:
        return { isValid: true, message: '', touched: true };
    }
  }, []);

  // Debounced validation
  const [debouncedValidation, setDebouncedValidation] = useState<FormValidation>({
    firstName: { isValid: false, message: '', touched: false },
    lastName: { isValid: false, message: '', touched: false },
    email: { isValid: false, message: '', touched: false },
    phone: { isValid: false, message: '', touched: false },
    address: { isValid: false, message: '', touched: false },
    city: { isValid: false, message: '', touched: false },
    postalCode: { isValid: false, message: '', touched: false },
    country: { isValid: false, message: '', touched: false },
  });


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newValidation = {
        firstName: validateField('firstName', formData.firstName),
        lastName: validateField('lastName', formData.lastName),
        email: validateField('email', formData.email),
        phone: validateField('phone', formData.phone),
        address: validateField('address', formData.address),
        city: validateField('city', formData.city),
        postalCode: validateField('postalCode', formData.postalCode),
        country: validateField('country', formData.country),
      };
      setDebouncedValidation(newValidation);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formData, validateField]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (country: string) => {
    setFormData(prev => ({ ...prev, country }));
  };

  const isFormValid = Object.values(debouncedValidation).every(field => field.isValid);


  // Step indicator component
  const StepIndicator = () => {
    const steps = [
      { id: 1, name: 'Informations', icon: User },
      { id: 2, name: 'Paiement', icon: PaymentIcon },
      { id: 3, name: 'Confirmation', icon: CheckCircle }
    ];

    return (
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
          {/* Mobile: Vertical step indicator */}




          <div className="block sm:hidden">
            <div className="flex items-center justify-center space-x-4">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all
                      ${isActive ? 'border-gray-900 bg-gray-900 text-white' : 
                        isCompleted ? 'border-green-500 bg-green-500 text-white' : 
                        'border-gray-300 text-gray-400'}
                    `}>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`mt-1 text-xs font-medium text-center ${
                      isActive ? 'text-gray-900' : isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop: Horizontal step indicator */}
          <div className="hidden sm:flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <React.Fragment key={step.id}>
                  <div className="flex items-center">
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                      ${isActive ? 'border-gray-900 bg-gray-900 text-white' : 
                        isCompleted ? 'border-green-500 bg-green-500 text-white' : 
                        'border-gray-300 text-gray-400'}
                    `}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`ml-3 text-sm font-medium ${
                      isActive ? 'text-gray-900' : isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Form field component with validation
  const FormField = ({ 
    name, 
    label, 
    type = 'text', 
    required = false,
    icon: Icon 
  }: {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    icon?: any;
  }) => {
    const validation = debouncedValidation[name as keyof FormValidation];
    const hasError = validation.touched && !validation.isValid;
    const hasSuccess = validation.touched && validation.isValid && formData[name as keyof typeof formData];

    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Icon className={`w-4 h-4 ${hasError ? 'text-red-400' : hasSuccess ? 'text-green-500' : 'text-gray-400'}`} />
            </div>
          )}
          <input
            type={type}
            name={name}
            value={formData[name as keyof typeof formData]}
            onChange={handleInputChange}
            className={`
              w-full border rounded-lg px-3 py-3 text-sm transition-all
              focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
              ${Icon ? 'pl-10' : ''}
              ${hasError ? 'border-red-300 bg-red-50' : 
                hasSuccess ? 'border-green-300 bg-green-50' : 
                'border-gray-200 hover:border-gray-300'}
            `}
            placeholder={label}
          />
          {validation.touched && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {hasError ? (
                <XCircle className="w-4 h-4 text-red-400" />
              ) : hasSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : null}
            </div>
          )}
        </div>
        {hasError && (
          <p className="text-red-500 text-xs">{validation.message}</p>
        )}
      </div>
    );
  };

  const handlePayPalPayment = async () => {
    if (!isFormValid) {
      setErrors({ submit: 'Veuillez corriger les erreurs dans le formulaire' });
      return;
    }

    if (!sessionId) {
      setErrors({ submit: 'Session non valide. Veuillez recharger la page.' });
      return;
    }

    setIsSubmitting(true);
    try {
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
        clearCart();
        localStorage.removeItem('checkout-form-data');
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
    if (!isFormValid) {
      setErrors({ submit: 'Veuillez corriger les erreurs dans le formulaire' });
      return;
    }

    if (!sessionId) {
      setErrors({ submit: 'Session non valide. Veuillez recharger la page.' });
      return;
    }

    setIsSubmitting(true);
    try {
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

      await guestCheckout.processCartCheckoutWithRedirect(checkoutData);
    } catch (error: any) {
      console.error('Stripe payment error:', error);
      setErrors({ submit: error.message || 'Erreur lors du paiement Stripe' });
      setIsSubmitting(false);
    }
  };


  const handleStripeSessionSuccess = async (sessionId: string) => {
    try {
      setIsSubmitting(true);
      const sessionStatus = await paymentApi.getStripeSessionStatus(sessionId);
      
      if (sessionStatus.status === 'complete' || sessionStatus.paymentStatus === 'paid') {
        clearCart();
        localStorage.removeItem('checkout-form-data');
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

  const handlePaymentCancellation = async (provider: 'stripe' | 'paypal', paymentData: any) => {
    try {
      localStorage.removeItem('checkout-form-data');
      navigate('/payment/cancel', {
        state: {
          reason: 'Annulé par l\'utilisateur',
          payment: {
            provider: provider,
            amount: total,
            ...paymentData
          }
        },
        replace: true
      });
    } catch (error: any) {
      console.error('Payment cancellation handling error:', error);
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

  const handlePaymentSuccess = async (provider: 'stripe' | 'paypal', paymentData: any) => {
    try {
      const storedOrderData = sessionStorage.getItem('currentOrder');
      if (!storedOrderData) {
        throw new Error('No order data found');
      }

      const { paymentId } = JSON.parse(storedOrderData);
      await paymentApi.handlePaymentSuccess(provider, {
        paymentId,
        ...paymentData
      });

      clearCart();
      localStorage.removeItem('checkout-form-data');
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
    
    const stripeSessionId = urlParams.get('session_id');
    const stripeSuccess = urlParams.get('success');
    const stripeCancel = urlParams.get('cancel');
    
    const paymentId = urlParams.get('paymentId');
    const provider = urlParams.get('provider');
    const success = urlParams.get('success');
    const cancel = urlParams.get('cancel');

    if (stripeSessionId && stripeCancel === 'true') {
      handlePaymentCancellation('stripe', { sessionId: stripeSessionId });
      return;
    }
    
    if (stripeSessionId && stripeSuccess === 'true') {
      handleStripeSessionSuccess(stripeSessionId);
      return;
    }
    
    if (paymentId && provider && cancel === 'true') {
      handlePaymentCancellation(provider as 'stripe' | 'paypal', { paymentId });
      return;
    }
    
    if (paymentId && provider && success === 'true') {
      handlePaymentSuccess(provider as 'stripe' | 'paypal', { paymentId });
    }

  }, [clearCart, navigate, paymentApi, setErrors, setIsSubmitting, total]);

  if ((cart?.cartItems?.length || 0) === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center bg-white rounded-2xl p-12 shadow-sm">
              <div className="text-6xl mb-6">🛒</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Panier vide</h1>
              <p className="text-gray-600 mb-8">Ajoutez des produits à votre panier avant de passer commande.</p>
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Continuer mes achats
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Step Indicator */}
        <StepIndicator />














        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center text-xs sm:text-sm text-gray-600">
              <Link 
                to="/" 
                className="hover:text-gray-900 flex items-center gap-1.5 whitespace-nowrap"
              >
                <Home className="w-3 h-3 flex-shrink-0" />
                Accueil
              </Link>

              <ChevronRight className="w-3 h-3 mx-2 flex-shrink-0 text-gray-400" />

              <Link 
                to="/cart" 
                className="hover:text-gray-900 flex items-center whitespace-nowrap"
              >
                Panier
              </Link>
              <ChevronRight className="w-3 h-3 mx-2 flex-shrink-0 text-gray-400" />
              <span className="text-gray-900 font-medium flex items-center whitespace-nowrap">Paiement</span>
            </nav>
          </div>
        </div>


        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Finaliser la commande</h1>
            <p className="text-gray-600 text-sm sm:text-base">Remplissez vos informations pour procéder au paiement</p>
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
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Truck className="w-4 h-4 text-gray-700" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Adresse de livraison</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <FormField 
                    name="firstName" 
                    label="Prénom" 
                    required 
                    icon={User}
                  />
                  <FormField 
                    name="lastName" 
                    label="Nom" 
                    required 
                    icon={User}
                  />
                  <FormField 
                    name="email" 
                    label="Email" 
                    type="email"
                    required 
                    icon={CreditCard}
                  />
                  <FormField 
                    name="phone" 
                    label="Téléphone" 
                    required 
                    icon={Smartphone}
                  />
                  <div className="md:col-span-2">
                    <FormField 
                      name="address" 
                      label="Adresse" 
                      required 
                      icon={MapPin}
                    />
                  </div>
                  <FormField 
                    name="city" 
                    label="Ville" 
                    required 
                    icon={MapPin}
                  />
                  <FormField 
                    name="postalCode" 
                    label="Code postal" 
                    required 
                    icon={MapPin}
                  />
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


              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-gray-700" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Méthode de paiement</h2>
                </div>


                <div className="space-y-4">
                  {/* Stripe Only - PayPal Unavailable */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Stripe Option - Active */}
                    <div
                      onClick={() => setPaymentMethod('stripe')}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        paymentMethod === 'stripe'
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          paymentMethod === 'stripe' ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
                        }`}>
                          {paymentMethod === 'stripe' && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Stripe</h3>
                            <p className="text-sm text-gray-600">Carte bancaire</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PayPal Option - Disabled */}
                    <div className="border-2 border-gray-200 rounded-xl p-4 opacity-50 cursor-not-allowed relative">
                      <div className="absolute top-2 right-2">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                          Indisponible
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-gray-300">
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-8 bg-gray-400 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">PP</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-500">PayPal</h3>
                            <p className="text-sm text-gray-400">Temporairement indisponible</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PayPal Unavailable Notice */}
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-900">PayPal temporairement indisponible</span>
                    </div>
                    <p className="text-sm text-amber-700">
                      Nous travaillons actuellement sur l'intégration PayPal. 
                      Vous pouvez utiliser Stripe pour vos paiements par carte bancaire.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Paiement 100% sécurisé</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Vos informations sont protégées par cryptage SSL. 
                      Aucun donnée bancaire n'est stockée sur nos serveurs.
                    </p>
                  </div>

                  {paymentConfig && (
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Configuration:</h4>
                      <div className="flex gap-4 text-xs text-gray-600">
                        <span>✓ Stripe: {paymentConfig.stripe?.publishableKey ? 'Actif' : 'Inactif'}</span>
                        <span>✓ PayPal: {paymentConfig.paypal?.clientId ? 'Actif' : 'Inactif'}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>



            {/* Order Summary */}
            <div className="lg:block hidden">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Récapitulatif</h2>

                <div className="space-y-4 mb-6">
                  {(cart?.cartItems || []).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.product.images?.find(img => img.isPrimary)?.url || item.product.images?.[0]?.url || '/images/products/default.jpg'}
                        alt={item.product.name}
                        className="w-12 h-12 object-contain rounded-lg border border-gray-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/products/default.jpg';
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">Qté: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">€{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">€{getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? 'Gratuite' : `€${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-100">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="mb-6 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Livraison gratuite dès 50€</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Retour 14 jours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Paiement sécurisé</span>
                    </div>
                  </div>
                </div>


                {/* Payment Button */}
                <button
                  type="button"
                  onClick={paymentMethod === 'paypal' ? handlePayPalPayment : handleStripePayment}
                  disabled={isSubmitting || !isFormValid}
                  className="w-full bg-gray-900 text-white py-4 rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
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

                {/* Auto-save indicator */}
                <div className="mt-4 text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                  <Save className="w-3 h-3" />
                  <span>Sauvegarde automatique activée</span>
                </div>
              </div>


              {/* Mobile Order Summary - Hidden on lg and above */}
              <div className="lg:hidden bg-white rounded-2xl p-4 sm:p-6 shadow-sm mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Récapitulatif</h2>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">Total</div>
                    <div className="text-lg font-semibold text-gray-900">€{total.toFixed(2)}</div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">€{getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? 'Gratuite' : `€${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Livraison gratuite dès 50€</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Paiement sécurisé SSL</span>
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
