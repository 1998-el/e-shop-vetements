import React from 'react';
import { 
  Truck, 
  Shield, 
  RotateCcw, 
  Headphones, 
  CreditCard, 
  Award,
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Livraison Gratuite',
      description: 'Dès 50€ d\'achat',
      details: 'Livraison express 24-48h',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Paiement Sécurisé',
      description: 'SSL 256-bit',
      details: 'CB, PayPal, Apple Pay',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <RotateCcw className="w-8 h-8" />,
      title: 'Retours Gratuits',
      description: '30 jours',
      details: 'Retour facile et rapide',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'Support 24/7',
      description: 'Service client',
      details: 'Chat, téléphone, email',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const trustIndicators = [
    {
      icon: <Award className="w-5 h-5" />,
      text: 'Marque certifiée ISO 9001'
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: 'Plus de 100k clients satisfaits'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: 'Livraison dans 27 pays'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: 'Expédition sous 2h'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Nous nous engageons à vous offrir la meilleure expérience d'achat en ligne
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${service.bgColor} ${service.color} mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className={`text-sm font-medium ${service.color} mb-1`}>
                {service.description}
              </p>
              <p className="text-xs text-gray-600">
                {service.details}
              </p>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CreditCard className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-900">Moyens de paiement acceptés</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center justify-items-center">
            {['💳', '🏦', '📱', '💰', '🅿️', '🏪'].map((icon, index) => (
              <div
                key={index}
                className="w-16 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-2xl border border-gray-200 hover:border-gray-300 transition-colors"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustIndicators.map((indicator, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-md border border-gray-100"
            >
              <div className="text-green-600">
                {indicator.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {indicator.text}
              </span>
            </div>
          ))}
        </div>

        {/* Security Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-lg">
            <Shield className="w-8 h-8" />
            <div className="text-left">
              <div className="font-bold text-lg">Site 100% Sécurisé</div>
              <div className="text-sm opacity-90">Certificat SSL & Protection des données</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
