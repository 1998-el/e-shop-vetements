import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import type { Product, ProductImage } from '../types';

const Cart: React.FC = () => {
  const { 
    cart, 
    loading: cartLoading, 
    error, 
    updatingItems,
    addingItems,
    updateCartItem, 
    removeFromCart, 
    getTotal, 
    clearCart 
  } = useCart();
  
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Gestion des erreurs d'image
  const handleImageError = (productId: string) => {
    setImageErrors(prev => new Set([...prev, productId]));
  };

  // Fonction pour obtenir l'URL de l'image
  const getImageUrl = (product: Product, productId: string): string => {
    if (imageErrors.has(productId)) return '';
    
    const firstImage = product.images?.[0];
    if (firstImage && typeof firstImage === 'object') {
      const urlProperty = (firstImage as ProductImage).url;
      if (typeof urlProperty === 'string') return urlProperty;
    }
    
    return '';
  };

  // Fonction pour gérer la mise à jour d'un item
  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await handleRemoveItem(itemId);
      return;
    }

    setUpdateError(null);
    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {

      setUpdateError('Erreur lors de la mise à jour de la quantité. Veuillez réessayer.');
    }
  };

  // Fonction pour gérer la suppression d'un item
  const handleRemoveItem = async (itemId: string) => {
    setUpdateError(null);
    try {
      await removeFromCart(itemId);
    } catch (error) {

      setUpdateError('Erreur lors de la suppression de l\'article. Veuillez réessayer.');
    }
  };

  // Chargement initial uniquement
  if (cartLoading && !cart) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
          <div className="max-w-2xl mx-auto px-3 sm:px-4">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-200 border-t-blue-600"></div>
              <p className="text-gray-600 mt-4">Chargement du panier...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
          <div className="max-w-2xl mx-auto px-3 sm:px-4">
            <div className="text-center bg-white rounded-lg shadow-sm p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Erreur de chargement</h1>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">{error}</p>
              <Link
                to="/products"
                className="inline-flex items-center border border-[#0e0e52] text-[#0e0e52] px-4 sm:px-6 py-2.5 rounded-lg hover:bg-[#0e0e52] hover:text-white transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux produits
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Vérifier si le panier est vide - ne pas montrer vide pendant les mises à jour
  const cartItems = cart?.cartItems || [];
  const isEmpty = cartItems.length === 0 && !cartLoading && !addingItems && updatingItems.size === 0 && !error;

  if (isEmpty) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
          <div className="max-w-2xl mx-auto px-3 sm:px-4">
            <div className="text-center bg-white rounded-lg shadow-sm p-6 sm:p-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Votre panier est vide</h1>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">Découvrez notre sélection d'accessoires de cuisine</p>
              <Link
                to="/products"
                className="inline-flex items-center bg-[#0e0e52] text-white px-4 sm:px-6 py-2.5 rounded-lg hover:bg-[#0e0e52]/90 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voir les produits
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Calculs des totaux
  const subtotal = getTotal();
  const shippingCost = subtotal >= 50 ? 0 : 5.99;
  const tva = subtotal * 0.20;
  const totalWithShipping = subtotal + shippingCost + tva;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Panier</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {cartItems.length} article{cartItems.length > 1 ? 's' : ''}
              {(updatingItems.size > 0 || addingItems) && (
                <span className="text-blue-600">
                  {' '}•
                </span>
              )}
            </p>
          </div>

          {/* Message d'erreur de mise à jour */}
          {updateError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-700 text-sm">{updateError}</p>
              <button
                onClick={() => setUpdateError(null)}
                className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
              >
                Fermer
              </button>
            </div>
          )}

          <div className="lg:grid lg:grid-cols-3 lg:gap-6 xl:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 mb-6 lg:mb-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {cartItems.map((item, index) => {
                  const isUpdating = updatingItems.has(item.id);
                  
                  return (
                    <div key={item.id} className={`flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      {/* Product Image */}
                      <div className="w-full sm:w-16 h-48 sm:h-16 flex-shrink-0 mb-4 sm:mb-0">
                        <img
                          src={getImageUrl(item.product, item.product.id)}
                          alt={item.product.name}
                          className="w-full h-full object-contain rounded-lg border border-gray-200 p-2"
                          onError={() => handleImageError(item.product.id)}
                          loading="lazy"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 w-full sm:ml-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2 line-clamp-2">
                              {item.product.name}
                              {isUpdating && (
                                <span className="ml-2 text-xs text-blue-600">
                                  •
                                </span>
                              )}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-3">€{item.product.price.toFixed(2)}</p>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleUpdateQuantity(item.id, item.quantity - 1);
                                  }}
                                  disabled={isUpdating}
                                  type="button"
                                  className="p-2 hover:bg-gray-50 disabled:opacity-50 transition-colors rounded-l-lg"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                                  {isUpdating ? (
                                    <span className="text-blue-600">•</span>
                                  ) : (
                                    item.quantity
                                  )}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleUpdateQuantity(item.id, item.quantity + 1);
                                  }}
                                  disabled={isUpdating}
                                  type="button"
                                  className="p-2 hover:bg-gray-50 disabled:opacity-50 transition-colors rounded-r-lg"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Subtotal & Remove */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                            <div className="text-right">
                              <p className="text-sm sm:text-base font-semibold text-gray-900">
                                €{(item.product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              disabled={isUpdating}
                              className="text-gray-500 hover:text-red-600 p-2 disabled:opacity-50 transition-colors rounded-lg hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Shopping */}
              <div className="mt-4 sm:mt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center text-[#0e0e52] hover:text-[#0e0e52]/80 text-sm sm:text-base transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continuer les achats
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Récapitulatif</h2>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Prix total</span>
                    <span className="text-sm sm:text-base font-medium">€{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Taxes TVA (20%)</span>
                    <span className="text-sm sm:text-base font-medium">€{tva.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Livraison</span>
                    <span className="text-sm sm:text-base font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-600 font-semibold">Gratuite</span>
                      ) : (
                        `€${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {subtotal > 0 && subtotal < 50 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-xs sm:text-sm text-orange-700">
                        Ajoutez €{(50 - subtotal).toFixed(2)} pour la livraison gratuite
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 sm:pt-6 mb-6 sm:mb-8">
                  <div className="flex justify-between items-center text-base sm:text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-gray-900">€{totalWithShipping.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <Link
                    to="/checkout"
                    className="w-full bg-[#0e0e52] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-medium hover:bg-[#0e0e52]/90 transition-colors block text-center shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {(addingItems || updatingItems.size > 0) ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Mise à jour...
                      </>
                    ) : (
                      'Procéder au paiement'
                    )}
                  </Link>

                  <button
                    onClick={clearCart}
                    disabled={cartLoading || addingItems || updatingItems.size > 0}
                    className="w-full border-2 border-[#0e0e52] text-[#0e0e52] py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-medium hover:bg-[#0e0e52] hover:text-white disabled:opacity-50 transition-colors flex items-center justify-center"
                  >
                    {(cartLoading || addingItems || updatingItems.size > 0) ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#0e0e52] border-t-transparent mr-2"></div>
                        Traitement...
                      </>
                    ) : (
                      'Vider le panier'
                    )}
                  </button>
                </div>

                {/* Info */}
                <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-200">
                  <div className="text-xs sm:text-sm text-gray-500 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Paiement sécurisé</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Livraison 3-5 jours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>30 jours satisfait ou remboursées</span>
                    </div>
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

export default Cart;