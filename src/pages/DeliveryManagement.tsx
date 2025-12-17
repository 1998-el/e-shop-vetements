import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { deliveryApi } from '../services/deliveryApi';
import type { Delivery, DeliveryTracking } from '../types/delivery';
import { Package, MapPin, Clock, CheckCircle, Truck, Search } from 'lucide-react';

const DeliveryManagement: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<DeliveryTracking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'my-deliveries' | 'tracking'>('my-deliveries');

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await deliveryApi.findAll();
      setDeliveries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des livraisons');
    } finally {
      setLoading(false);
    }
  };

  const trackPackage = async () => {
    if (!trackingNumber.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const data = await deliveryApi.trackPackage(trackingNumber);
      setTrackingInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Colis non trouvé');
      setTrackingInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'IN_TRANSIT':
      case 'OUT_FOR_DELIVERY':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'SHIPPED':
        return <Package className="w-5 h-5 text-purple-600" />;
      case 'PROCESSING':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (dateInput: string | Date) => {
    return new Date(dateInput).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Livraisons</h1>
            <p className="text-gray-600 mt-2">Suivez vos commandes et gérez les livraisons</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('my-deliveries')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'my-deliveries'
                      ? 'border-[#0464de] text-[#0464de]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Mes Livraisons
                </button>
                <button
                  onClick={() => setActiveTab('tracking')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'tracking'
                      ? 'border-[#0464de] text-[#0464de]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Suivre un Colis
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'my-deliveries' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Mes Livraisons</h2>
                    <button
                      onClick={loadDeliveries}
                      disabled={loading}
                      className="bg-[#0464de] text-white px-4 py-2 rounded-lg hover:bg-[#0355b3] transition-colors disabled:opacity-50"
                    >
                      Actualiser
                    </button>
                  </div>

                  {loading && (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0464de]"></div>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                      {error}
                    </div>
                  )}

                  {!loading && deliveries.length === 0 && (
                    <div className="text-center py-8">
                      <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Aucune livraison trouvée</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {deliveries.map((delivery) => (
                      <div key={delivery.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(delivery.status)}
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                Commande #{delivery.orderId.slice(-8)}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Suivi: {delivery.trackingNumber}
                              </p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            deliveryApi.getStatusColor(delivery.status)
                          }`}>
                            {deliveryApi.getStatusLabel(delivery.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Transporteur:</p>
                            <p className="font-medium">{delivery.carrier}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Destinataire:</p>
                            <p className="font-medium">{delivery.recipientName}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Adresse de livraison:</p>
                            <p className="font-medium">
                              {delivery.shippingAddress.street}<br />
                              {delivery.shippingAddress.postalCode} {delivery.shippingAddress.city}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Livraison prévue:</p>
                            <p className="font-medium">
                              {delivery.estimatedDeliveryDate ? 
                                formatDate(delivery.estimatedDeliveryDate) : 
                                'Non spécifiée'
                              }
                            </p>
                          </div>
                        </div>

                        {delivery.location && (
                          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>Dernière position: {delivery.location}</span>
                          </div>
                        )}

                        {delivery.notes && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">{delivery.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'tracking' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Suivre un Colis</h2>
                  
                  <div className="max-w-md">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Entrez votre numéro de suivi"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0464de]"
                      />
                      <button
                        onClick={trackPackage}
                        disabled={loading || !trackingNumber.trim()}
                        className="bg-[#0464de] text-white px-6 py-2 rounded-lg hover:bg-[#0355b3] transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        <Search className="w-4 h-4" />
                        Suivre
                      </button>
                    </div>
                  </div>

                  {loading && (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0464de]"></div>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mt-4">
                      {error}
                    </div>
                  )}

                  {trackingInfo && (
                    <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-6">
                        {getStatusIcon(trackingInfo.status)}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {deliveryApi.getStatusLabel(trackingInfo.status)}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Suivi: {trackingInfo.trackingNumber}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="text-sm text-gray-600">Transporteur:</p>
                          <p className="font-medium">{trackingInfo.carrier}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Destinataire:</p>
                          <p className="font-medium">{trackingInfo.recipientName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Livraison prévue:</p>
                          <p className="font-medium">
                            {trackingInfo.estimatedDeliveryDate ? 
                              formatDate(trackingInfo.estimatedDeliveryDate) : 
                              'Non spécifiée'
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Commande:</p>
                          <p className="font-medium">
                            #{trackingInfo.order.id.slice(-8)} - €{trackingInfo.order.total.toFixed(2)} 
                            ({trackingInfo.order.items} article{trackingInfo.order.items > 1 ? 's' : ''})
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Historique des événements</h4>
                        <div className="space-y-3">
                          {trackingInfo.updates.map((update, index) => (
                            <div key={index} className="flex gap-3">
                              <div className="flex-shrink-0 mt-1">
                                {getStatusIcon(update.status)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium text-gray-900">
                                    {deliveryApi.getStatusLabel(update.status)}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {formatDate(update.timestamp)}
                                  </p>
                                </div>
                                {update.location && (
                                  <p className="text-sm text-gray-600">📍 {update.location}</p>
                                )}
                                {update.notes && (
                                  <p className="text-sm text-gray-600">{update.notes}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryManagement;