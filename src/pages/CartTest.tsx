import React, { useState, useEffect } from 'react';
import { productsApi } from '../services/api';
import { useCart } from '../context/CartContext';
import { guestCheckout } from '../utils/guestCheckout';
import type { Product, ConvertAnonymousCartDto, GuestCheckoutDto } from '../types';
import { ShoppingCart, UserPlus, CreditCard, CheckCircle } from 'lucide-react';

const CartTestPage: React.FC = () => {
  const { cart, loading, error, addToCart, convertAnonymousCartToUser, sessionId, getTotal } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [deliveryInfo, setDeliveryInfo] = useState<ConvertAnonymousCartDto>({
    email: 'test@example.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    phone: '+33123456789'
  });
  const [checkoutData, setCheckoutData] = useState<GuestCheckoutDto>({
    productId: '',
    quantity: 1,
    customerInfo: {
      email: 'test@example.com',
      name: 'Jean Dupont',
      phone: '+33123456789'
    },
    shippingAddress: {
      street: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France'
    },
    payment: {
      provider: 'stripe',
      currency: 'EUR'
    }
  });

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productsApi.getAll();
      setProducts(response.products);
      addTestResult('Products loaded successfully');
    } catch (err) {
      addTestResult(`Error loading products: ${err}`);
    }
  };

  const testAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
      addTestResult(`Added product ${productId} to cart`);
    } catch (err) {
      addTestResult(`Error adding to cart: ${err}`);
    }
  };

  const testConvertCart = async () => {
    try {
      await convertAnonymousCartToUser(deliveryInfo);
      addTestResult('Cart converted to user cart successfully');
    } catch (err) {
      addTestResult(`Error converting cart: ${err}`);
    }
  };

  const testGuestCheckout = async () => {
    try {
      if (!checkoutData.productId) {
        addTestResult('Please select a product for checkout');
        return;
      }
      
      const response = await guestCheckout.processCartCheckout(checkoutData);
      addTestResult(`Guest checkout successful: Order ${response.order.id}`);
    } catch (err) {
      addTestResult(`Error during checkout: ${err}`);
    }
  };

  const testSessionManagement = () => {
    addTestResult(`Current session ID: ${sessionId}`);
    const storedSession = localStorage.getItem('guestSessionId');
    addTestResult(`Stored session ID: ${storedSession}`);
  };

  const clearTestResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Test du Système de Panier Intégré</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Tests de Panier
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={testSessionManagement}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tester la Gestion de Session
                </button>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Ajouter des produits au panier:</h3>
                  <div className="space-y-2">
                    {products.slice(0, 3).map(product => (
                      <button
                        key={product.id}
                        onClick={() => testAddToCart(product.id)}
                        disabled={loading}
                        className="w-full text-left bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {product.name} - €{product.price}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => addTestResult(`Current cart: ${JSON.stringify(cart, null, 2)}`)}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Afficher l'État du Panier
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <UserPlus className="w-5 h-5 mr-2" />
                Conversion Panier Anonyme
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={deliveryInfo.email}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    <input
                      type="text"
                      value={deliveryInfo.firstName}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, firstName: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={deliveryInfo.lastName}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, lastName: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={deliveryInfo.phone || ''}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                
                <button
                  onClick={testConvertCart}
                  disabled={loading || !cart?.cartItems?.length}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  Convertir en Panier Utilisateur
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Checkout Invité
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
                  <select
                    value={checkoutData.productId}
                    onChange={(e) => setCheckoutData({...checkoutData, productId: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="">Sélectionner un produit</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - €{product.price}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                  <input
                    type="number"
                    min="1"
                    value={checkoutData.quantity}
                    onChange={(e) => setCheckoutData({...checkoutData, quantity: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                
                <button
                  onClick={testGuestCheckout}
                  disabled={loading || !checkoutData.productId}
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                >
                  Tester le Checkout
                </button>
              </div>
            </div>
          </div>

          {/* Results and Cart State */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Résultats des Tests
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={clearTestResults}
                  className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Effacer les Résultats
                </button>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-64 overflow-y-auto font-mono text-sm">
                  {testResults.length === 0 ? (
                    <div className="text-gray-500">Aucun résultat de test...</div>
                  ) : (
                    testResults.map((result, index) => (
                      <div key={index} className="mb-1">{result}</div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">État Actuel du Panier</h2>
              
              {loading && <div className="text-blue-600">Chargement...</div>}
              {error && <div className="text-red-600">Erreur: {error}</div>}
              
              {cart ? (
                <div className="space-y-2">
                  <div><strong>ID du panier:</strong> {cart.id}</div>
                  <div><strong>Session ID:</strong> {cart.sessionId || 'N/A'}</div>
                  <div><strong>Nombre d'articles:</strong> {cart.cartItems?.length || 0}</div>
                  <div><strong>Total:</strong> €{getTotal().toFixed(2)}</div>
                  
                  {cart.cartItems && cart.cartItems.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-medium text-gray-900 mb-2">Articles:</h3>
                      <div className="space-y-2">
                        {cart.cartItems.map(item => (
                          <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="font-medium">{item.product.name}</div>
                            <div className="text-sm text-gray-600">
                              Quantité: {item.quantity} × €{item.product.price} = €{(item.quantity * item.product.price).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-500">Panier vide</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTestPage;