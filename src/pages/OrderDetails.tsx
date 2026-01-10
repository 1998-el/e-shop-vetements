import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ordersApi from '../services/ordersApi';
import type { Order } from '../types';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Truck, MapPin, User, Receipt } from 'lucide-react';

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      loadOrderDetails(orderId);
    }
  }, [orderId]);

  const loadOrderDetails = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const orderData = await ordersApi.getOrderById(id);
      setOrder(orderData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement de la commande');

    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'CONFIRMED':
        return <CheckCircle className="w-6 h-6 text-blue-500" />;
      case 'PROCESSING':
        return <Package className="w-6 h-6 text-purple-500" />;
      case 'SHIPPED':
        return <Truck className="w-6 h-6 text-green-500" />;
      case 'DELIVERED':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'CANCELLED':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return 'En attente de confirmation';
      case 'CONFIRMED':
        return 'Commande confirmée';
      case 'PROCESSING':
        return 'En cours de préparation';
      case 'SHIPPED':
        return 'Expédiée';
      case 'DELIVERED':
        return 'Livrée avec succès';
      case 'CANCELLED':
        return 'Commande annulée';
      default:
        return status;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'PROCESSING':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'SHIPPED':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'DELIVERED':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'CANCELLED':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#0464de] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des détails de la commande...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !order) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Commande introuvable</h1>
              <p className="text-gray-600 mb-8">{error || 'Cette commande n\'existe pas ou n\'est pas accessible.'}</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate('/orders')}
                  className="bg-[#0464de] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0355b3] transition-colors"
                >
                  Voir mes commandes
                </button>
                <Link
                  to="/products"
                  className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Continuer mes achats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/orders')}
              className="inline-flex items-center gap-2 text-[#0464de] hover:text-[#0355b3] mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux commandes
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Commande #{order.id.slice(-8)}</h1>
            <p className="text-gray-600 mt-2">Détails de votre commande</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Status */}
              <div className={`p-6 rounded-lg border-2 ${getStatusColor(order.status)}`}>
                <div className="flex items-center gap-4">
                  {getStatusIcon(order.status)}
                  <div>
                    <h2 className="text-xl font-semibold">{getStatusText(order.status)}</h2>
                    <p className="text-sm opacity-75">Dernière mise à jour: {formatDate(order.updatedAt)}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Articles commandés
                </h3>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.product.images?.find(img => img.isPrimary)?.url || item.product.images?.[0]?.url || '/images/products/default.jpg'}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">{item.product.description}</p>
                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">€{item.price.toFixed(2)} / unité</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              {order.guestInfo?.shippingAddress && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Adresse de livraison
                  </h3>
                  <div className="text-gray-700">
                    <p className="font-medium">{order.guestInfo.name}</p>
                    <p>{order.guestInfo.shippingAddress.street}</p>
                    <p>{order.guestInfo.shippingAddress.postalCode} {order.guestInfo.shippingAddress.city}</p>
                    <p>{order.guestInfo.shippingAddress.country}</p>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              {order.guestInfo && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informations de contact
                  </h3>
                  <div className="text-gray-700 space-y-2">
                    <p><span className="font-medium">Email:</span> {order.guestInfo.email}</p>
                    <p><span className="font-medium">Téléphone:</span> {order.guestInfo.phone}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Résumé
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">€{(order.total - 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-medium">Gratuite</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>€{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-gray-600">Numéro de commande</span>
                    <p className="font-mono font-medium">{order.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Date de commande</span>
                    <p className="font-medium">{formatDate(order.createdAt)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Statut</span>
                    <p className="font-medium">{getStatusText(order.status)}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Link
                    to="/products"
                    className="w-full bg-[#0464de] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#0355b3] transition-colors text-center block"
                  >
                    Continuer mes achats
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;