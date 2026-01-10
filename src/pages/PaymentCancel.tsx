import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { XCircle, ArrowLeft, ShoppingCart, RefreshCw, HelpCircle, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, getTotal } = useCart();
  
  // Get cancellation details
  const urlParams = new URLSearchParams(location.search);
  const sessionId = urlParams.get('session_id');
  const reason = urlParams.get('reason') || 'Annulé par l\'utilisateur';
  const cancellationReason = location.state?.reason || reason;

  useEffect(() => {
    if (sessionId) {
      sessionStorage.removeItem('currentOrder');
    }
  }, [sessionId]);

  const handleRetryPayment = () => navigate('/checkout');
  const handleReturnToCart = () => navigate('/cart');
  const handleReturnToProducts = () => navigate('/products');

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const hasCartItems = cart && cart.cartItems && cart.cartItems.length > 0;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-lg mx-auto px-4">
          {/* Main Content Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="text-center p-6 bg-white border-b border-gray-100">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Paiement annulé
              </h1>
              <p className="text-gray-600">
                Votre transaction a été interrompue. Aucun prélèvement n'a été effectué.
              </p>
            </div>

            {/* Cancellation Details */}
            <div className="p-6 border-b border-gray-100">
              <div className="space-y-4">
                {/* Reason */}
                {cancellationReason && (
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <XCircle className="w-4 h-4 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">Raison de l'annulation</h3>
                        <p className="text-sm text-gray-600">{cancellationReason}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cart Summary (if items exist) */}
                {hasCartItems && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                      <h3 className="font-medium text-gray-900">Votre panier est préservé</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {cart.cartItems.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                            <img
                              src={item.product.images?.[0]?.url || '/images/products/default.jpg'}
                              alt={item.product.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/products/default.jpg';
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                            <p className="text-xs text-gray-500">{item.quantity} × {formatAmount(item.product.price)}</p>
                          </div>
                        </div>
                      ))}
                      
                      {cart.cartItems.length > 2 && (
                        <p className="text-sm text-gray-600">
                          +{cart.cartItems.length - 2} autre{cart.cartItems.length > 3 ? 's' : ''} article{cart.cartItems.length > 3 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-blue-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total</span>
                        <span className="font-semibold text-gray-900">{formatAmount(getTotal())}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6">
              <div className="space-y-3">
                {hasCartItems ? (
                  <>
                    <button
                      onClick={handleRetryPayment}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Réessayer le paiement
                    </button>
                    
                    <button
                      onClick={handleReturnToCart}
                      className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 active:bg-blue-100 transition-colors border border-blue-200 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Modifier mon panier
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleReturnToProducts}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors"
                  >
                    Découvrir nos produits
                  </button>
                )}
                
                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-100 active:bg-gray-200 transition-colors border border-gray-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour à l'accueil
                </button>
              </div>
              
              {/* Help Section */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="w-4 h-4 text-gray-500" />
                  <h3 className="text-sm font-medium text-gray-900">Besoin d'aide ?</h3>
                </div>
                
                <div className="space-y-2">
                  <a
                    href="/faq"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xs font-semibold">?</span>
                    </div>
                    <span>Consulter la FAQ</span>
                  </a>
                  
                  <a
                    href="mailto:support@beldouze.com"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Mail className="w-3 h-3" />
                    </div>
                    <span>Contacter le support</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Security Assurance */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Paiement 100% sécurisé • Aucune donnée bancaire conservée</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentCancel;