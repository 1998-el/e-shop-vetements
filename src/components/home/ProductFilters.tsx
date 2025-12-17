import React from 'react';

const ProductFilters: React.FC = () => {
  const filterLinks = [
    'Voir plus',
    'Poupée',
    'Jouets pour ados',
    'Tonies',
    'Jouets Gabby',
    'Véhicules et circuits',
    'LEGO 10374 Bouquet de roses roses',
    'JOUET',
    'Catalogue de Noël',
    'Jeux de construction',
    'Jouet'
  ];

  const serviceLinks = [
    { title: 'Satisfait ou remboursé', description: '14 jours pour changer d\'avis' },
    { title: 'Paiement 100% sécurisé', description: 'Moyens de paiement' },
    { title: 'Livraison Offerte', description: 'en magasin et point relais dès 59€' },
    { title: 'Retrait magasin', description: 'Consultez, réservez, retirez' },
    { title: 'Payer en 3x | 4x sans frais', description: 'dès 50€' },
    { title: 'Service client', description: 'lun. au ven. 9h-12h30 et 13' }
  ];

  return (
    <div className="bg-white py-4 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4">
      
        {/* Filter Links - Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 ">
          {filterLinks.map((link, index) => (
            <button
              key={index}
              className="border border-gray-200 px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-600 hover:bg-gray-50 rounded-t-md transition-colors duration-200  hover:border-blue-600"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Service Links */}
        <div className="flex flex-wrap gap-4">
          {serviceLinks.map((service, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 w-48">
              <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;