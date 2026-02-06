import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import CountrySelector from '../components/common/CountrySelector';
import FormField from '../components/common/FormField';

import { guestCheckout } from '../utils/guestCheckout';
import {
  Truck, Shield, CreditCard, Smartphone, AlertCircle,
  User, MapPin, Loader2, ArrowLeft
} from 'lucide-react';

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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFirstProductImageUrl = () => {
    const firstItem = cart?.cartItems?.[0];
    const firstImage = (firstItem?.product as any)?.images?.[0];
    if (typeof firstImage === 'string') return firstImage;
    if (firstImage && typeof firstImage === 'object' && 'url' in firstImage) return (firstImage as any).url as string;
    return '';
  };



  const shippingCost = getTotal() >= 50 ? 0 : 5.99;
  const total = getTotal() + shippingCost;

  useEffect(() => {
    // Load saved form data
    const savedData = localStorage.getItem('checkout-form-data');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {

      }
    }
  }, []);

  // Save form data on change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      localStorage.setItem('checkout-form-data', JSON.stringify(newData));
      return newData;
    });
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [fieldErrors]);

  const handleCountryChange = (country: string) => {
    setFormData(prev => {
      const newData = { ...prev, country };
      localStorage.setItem('checkout-form-data', JSON.stringify(newData));
      return newData;
    });
  };

  // Simple validation functions
  const validateEmail = (email: string): string => {
    if (!email.trim()) return 'Email requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email invalide';
    return '';
  };

  const validateRequired = (value: string, fieldName: string): string => {
    if (!value.trim()) return `${fieldName} requis`;
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return 'Téléphone requis';
    if (!/^[+]?[\d\s\-\(\)]{8,}$/.test(phone)) return 'Numéro invalide';
    return '';
  };

  const validatePostalCode = (postalCode: string): string => {
    if (!postalCode.trim()) return 'Code postal requis';
    if (!/^[\d]{5}$/.test(postalCode)) return 'Code postal invalide (5 chiffres)';
    return '';
  };

  // Validation ONLY on submit
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate each field
    const firstNameError = validateRequired(formData.firstName, 'Prénom');
    if (firstNameError) newErrors.firstName = firstNameError;
    
    const lastNameError = validateRequired(formData.lastName, 'Nom');
    if (lastNameError) newErrors.lastName = lastNameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    const addressError = validateRequired(formData.address, 'Adresse');
    if (addressError) newErrors.address = addressError;
    
    const cityError = validateRequired(formData.city, 'Ville');
    if (cityError) newErrors.city = cityError;
    
    const postalCodeError = validatePostalCode(formData.postalCode);
    if (postalCodeError) newErrors.postalCode = postalCodeError;
    
    const countryError = validateRequired(formData.country, 'Pays');
    if (countryError) newErrors.country = countryError;
    
    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if all required fields are filled (for button state only)
  const isFormFilled = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'];
    return requiredFields.every(field => {
      const value = formData[field as keyof typeof formData];
      return value && value.trim().length > 0;
    });
  };

  const handleStripePayment = async () => {
    // Validate ONLY on click
    if (!validateForm()) {
      setErrors({ submit: 'Veuillez corriger les erreurs dans le formulaire' });
      return;
    }

    if (!sessionId) {
      setErrors({ submit: 'Session non valide. Veuillez recharger la page.' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
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

      setErrors({ submit: error.message || 'Erreur lors du paiement Stripe' });
      setIsSubmitting(false);
    }
  };

  const handlePayPalPayment = async () => {
    // Validate ONLY on click
    if (!validateForm()) {
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

      setErrors({ submit: error.message || 'Erreur lors du paiement PayPal' });
    } finally {
      setIsSubmitting(false);
    }
  };



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
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-8">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
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
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={fieldErrors.firstName}
                  />
                  <FormField
                    name="lastName"
                    label="Nom"
                    required
                    icon={User}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={fieldErrors.lastName}
                  />
                  <FormField
                    name="email"
                    label="Email"
                    type="email"
                    required
                    icon={CreditCard}
                    value={formData.email}
                    onChange={handleInputChange}
                    error={fieldErrors.email}
                  />
                  <FormField
                    name="phone"
                    label="Téléphone"
                    required
                    icon={Smartphone}
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={fieldErrors.phone}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      name="address"
                      label="Adresse"
                      required
                      icon={MapPin}
                      value={formData.address}
                      onChange={handleInputChange}
                      error={fieldErrors.address}
                    />
                  </div>
                  <FormField
                    name="city"
                    label="Ville"
                    required
                    icon={MapPin}
                    value={formData.city}
                    onChange={handleInputChange}
                    error={fieldErrors.city}
                  />
                  <FormField
                    name="postalCode"
                    label="Code postal"
                    required
                    icon={MapPin}
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    error={fieldErrors.postalCode}
                  />
                  <div>
                    <CountrySelector
                      value={formData.country}
                      onChange={handleCountryChange}
                      error={fieldErrors.country}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                         <img src="/images/logos/payer_par_carte-removebg-preview.png" className="w-11 h-11 ml-4" alt="" />
                          <div>
                            <h3 className="font-semibold text-gray-900">Carte Bancaire</h3>
                            <p className="text-sm text-gray-600">Paiement sécurisé</p>
                          </div>
                        </div>
                      </div>
                    </div>

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
                         <img src="/images/logos/paypal-removebg-preview.png" alt="" className="w-18 h-18 object-contain" />
                          <div>
                            <h3 className="font-semibold text-gray-500">PayPal</h3>
                            <p className="text-sm text-gray-400">Temporairement indisponible</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
                <div className="flex items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Récapitulatif</h2>
                  <span className="mx-2 text-4xl text-gray-900">·</span>
                  <span className="text-lg sm:text-sm text-500 font-normal">{(cart?.cartItems?.length || 0) + 3} articles</span>
                </div>

                {/* Ligne récapitulatif produit supprimée comme demandé */}

                {/* Bloc produit + cadeaux offerts */}
                <div className="mb-6 space-y-3">
                  {cart?.cartItems?.[0] && (
                    <div className="bg-white rounded-xl border border-gray-300 border-gray-400 shadow-lg p-2 flex items-center gap-2">
                      <div className="relative w-12 h-12">
                        <img
                          src={getFirstProductImageUrl()}
                          alt={cart.cartItems[0].product.name}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                        />
                        <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center z-10">1</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-xs sm:text-sm line-clamp-1">
                          {cart.cartItems[0].product.name}
                        </div>
                      </div>
                      <div className="flex flex-col items-end ml-2">
                        <span className="text-xs text-gray-400 line-through mb-1">79,99€</span>
                        <span className="text-sm font-bold text-green-600">€{cart.cartItems[0].product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* 1er cadeau */}
                    <div className="bg-white rounded-xl border border-gray-300 border-gray-400 shadow-lg p-2 flex flex-col justify-between min-h-[70px] max-h-[90px]">
                      <div className="flex items-center gap-2">
                        <div className="relative w-12 h-12">
                          <img src="/images/photo_produits_offerts/produit offerts (5).jpeg" alt="Fouet offert" className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                          <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center z-10">2</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-xs sm:text-sm">Casse-oeuf</div>
                        </div>
                        <div className="flex flex-col items-end ml-2">
                          <span className="text-xs text-gray-400 line-through mb-1">17,99€</span>
                          <span className="px-2 py-1 rounded bg-green-600 text-white text-xs font-bold">Offert</span>
                        </div>
                      </div>
                    </div>
                    {/* 2e cadeau */}
                    <div className="bg-white rounded-xl border border-gray-300 border-gray-400 shadow-lg p-2 flex flex-col justify-between min-h-[70px] max-h-[90px]">
                      <div className="flex items-center gap-2">
                        <div className="relative w-12 h-12">
                          <img src="/images/photo_produits_offerts/produit offerts (6).jpeg" alt="Pinceau offert" className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                          <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center z-10">3</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-xs sm:text-sm">Fouet de cuisine</div>
                        </div>
                        <div className="flex flex-col items-end ml-2">
                          <span className="text-xs text-gray-400 line-through mb-1">13,99€</span>
                          <span className="px-2 py-1 rounded bg-green-600 text-white text-xs font-bold">Offert</span>
                        </div>
                      </div>
                    </div>
                    {/* 3e cadeau surprise */}
                    <div className="bg-white rounded-xl border border-gray-300 border-gray-400 shadow-lg p-2 flex flex-col justify-between min-h-[70px] max-h-[90px]">
                      <div className="flex items-center gap-2">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <img src="/images/produits_a_gagner.png" alt="Cadeau offert" className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                          <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center z-10">4</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-xs sm:text-sm">Cadeau surprise à gagner</div>
                        </div>
                        <div className="flex flex-col items-end ml-2">
                          <span className="text-xs text-gray-400 line-through mb-1">&nbsp;</span>
                          <span className="px-2 py-1 rounded bg-green-600 text-white text-xs font-bold">Offert</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2 mb-3">
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
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-[0.65em] text-gray-400 mt-0">taxes 20% : 11,99</span>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  type="button"
                  onClick={paymentMethod === 'paypal' ? handlePayPalPayment : handleStripePayment}
                  disabled={isSubmitting || !isFormFilled()}
                  className={`w-full py-3 rounded-xl flex items-center justify-center font-medium transition-all ${
                    isFormFilled() && !isSubmitting
                      ? 'bg-[#0e0e52] text-white hover:bg-[#18186a]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    <span className="text-lg font-bold">Je&nbsp;  commande</span>
                  )}
                </button>

                {!isFormFilled() && !isSubmitting && (
                  <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-800 text-sm text-center">
                      Veuillez remplir tous les champs requis
                    </p>
                  </div>
                )}

                <div className="mt-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="text-base text-gray-700 font-semibold" >Paiement sécurisé SSL</span>
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
