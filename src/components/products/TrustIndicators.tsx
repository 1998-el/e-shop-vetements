import React from 'react';
import { Shield, Truck, RefreshCw, Star, Users, Award } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  const trustStats = [
    {
      icon: Users,
      value: '15k+',
      label: 'Familles satisfaites',
      description: 'Nous faisons confiance à nos produits'
    },
    {
      icon: Star,
      value: '4.8/5',
      label: 'Note moyenne',
      description: 'Basée sur 2500+ avis'
    },
    {
      icon: Shield,
      value: '100%',
      label: 'Sécurisé',
      description: 'Paiements et données protégés'
    }
  ];

  const guarantees = [
    {
      icon: Truck,
      title: 'Livraison gratuite',
      description: 'Dès 50€ d\'achat'
    },
    {
      icon: RefreshCw,
      title: 'Retour gratuit',
      description: '30 jours pour changer d\'avis'
    },
    {
      icon: Award,
      title: 'Qualité garantie',
      description: 'Marques certifiées CE'
    }
  ];

  return (
    <section className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {trustStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {stat.label}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Guarantees Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Nos garanties
            </h3>
            <p className="text-gray-600">
              Achetez en toute sérénité avec nos garanties exceptionnelles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <guarantee.icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {guarantee.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {guarantee.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
