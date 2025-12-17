import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, loading, error, updateCartItem, removeFromCart, getTotal, clearCart } = useCart();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-white py-12">
          <div className="max-w-2xl mx-auto px-4">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-900"></div>
              <p className="text-gray-600 mt-4">Chargement du panier...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const shippingCost = getTotal() >= 50 ? 0 : 5.99;
  const totalWithShipping = getTotal() + shippingCost;

  const displayItems = cart?.cartItems?.map(item => ({
    id: item.id,
    name: item.product.name,
    price: item.product.price,
    image: item.product.images?.[0]?.url || '/images/products/default.jpg',
    quantity: item.quantity
  })) || [];

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-white py-12">
          <div className="max-w-2xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900 mb-2">Erreur de chargement</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link
                to="/products"
                className="inline-flex items-center border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50"
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

  if (displayItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-white py-12">
          <div className="max-w-2xl mx-auto px-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">Votre panier est vide</h1>
              <p className="text-gray-600 mb-6">Découvrez notre sélection de jouets</p>
              <Link
                to="/products"
                className="inline-flex items-center border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50"
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

  return (
    <Layout>
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Panier</h1>
            <p className="text-gray-600 text-sm">{displayItems.length} article{displayItems.length > 1 ? 's' : ''}</p>
          </div>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 mb-6 lg:mb-0">
              <div className="border border-gray-200 rounded">
                {displayItems.map((item, index) => (
                  <div key={item.id} className={`flex items-center p-4 ${index !== displayItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    {/* Product Image */}
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded border border-gray-200"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 ml-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">€{item.price.toFixed(2)}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity - 1)}
                            disabled={loading}
                            className="p-1 hover:bg-gray-50 disabled:opacity-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                            disabled={loading}
                            className="p-1 hover:bg-gray-50 disabled:opacity-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="text-right ml-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        €{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        disabled={loading}
                        className="text-gray-500 hover:text-red-600 p-1 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-4">
                <Link
                  to="/products"
                  className="inline-flex items-center text-gray-700 hover:text-gray-900 text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continuer les achats
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 rounded p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Récapitulatif</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sous-total</span>
                    <span className="text-sm font-medium">€{getTotal().toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Livraison</span>
                    <span className="text-sm font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Gratuite</span>
                      ) : (
                        `€${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {getTotal() < 50 && (
                    <p className="text-xs text-gray-500">
                      Ajoutez €{(50 - getTotal()).toFixed(2)} pour la livraison gratuite
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>€{totalWithShipping.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    className="w-full bg-gray-900 text-white py-3 px-6 rounded text-sm font-medium hover:bg-gray-800 block text-center"
                  >
                    Procéder au paiement
                  </Link>

                  <button
                    onClick={clearCart}
                    disabled={loading}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                  >
                    Vider le panier
                  </button>
                </div>

                {/* Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Paiement sécurisé</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Livraison 3-5 jours</span>
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