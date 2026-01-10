import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { CheckCircle, Package, Home, Eye, Receipt } from 'lucide-react';
import type { Order } from '../types';

const CheckoutSuccess: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order as Order | undefined;
  // const payment = location.state?.payment;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Commande confirmée !</h1>
            <p className="text-lg text-gray-600 mb-8">
              Merci pour votre achat. Votre commande a été traitée avec succès.
            </p>

            {/* Order Summary */}
            {order && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <Receipt className="w-5 h-5 text-[#0464de]" />
                  <h2 className="text-lg font-semibold text-gray-900">Récapitulatif de commande</h2>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Numéro de commande</span>
                    <span className="font-medium">#{order.id.slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut</span>
                    <span className="font-medium text-green-600">{getStatusText(order.status)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="font-semibold text-lg">€{order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-3">
                    {order.orderItems?.length || 0} article{(order.orderItems?.length || 0) > 1 ? 's' : ''} commandés
                  </p>
                  <div className="flex gap-2">
                    {order.orderItems?.slice(0, 3).map((item) => (
                      <img
                        key={item.id}
                        src={item.product.images?.find(img => img.isPrimary)?.url || item.product.images?.[0]?.url || '/images/products/default.jpg'}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )) || []}
                    {(order.orderItems?.length || 0) > 3 && (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-600">
                        +{(order.orderItems?.length || 0) - 3}
                      </div>
                    )}
                  </div>
                </div>

                {order.guestInfo && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      Email de confirmation envoyé à: <span className="font-medium">{order.guestInfo.email}</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#0464de]" />
                  <span>Préparation en cours</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0464de] rounded-full"></div>
                  <span>Expédition sous 24h</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                  <span>Livraison</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Un email de confirmation a été envoyé à votre adresse email avec les détails de votre commande.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {order && (
                  <Link
                    to={`/orders/${order.id}`}
                    className="inline-flex items-center bg-[#0464de] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0355b3] transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Voir ma commande
                  </Link>
                )}
                <Link
                  to="/products"
                  className="inline-flex items-center bg-[#0464de] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0355b3] transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Continuer mes achats
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutSuccess;