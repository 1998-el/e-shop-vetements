import React from 'react';

const MiniBanner: React.FC = () => {
  return (
    <div className="hidden lg:block bg-[#e60023]/5 border-b border-[#e60023/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-4 lg:space-x-6 text-xs lg:text-sm font-medium text-gray-700 py-2 lg:py-3">
          <span>Livraison gratuite dès 49€</span>
          <span className="text-[#e60023]">•</span>
          <span>Jouets de qualité premium</span>
          <span className="text-[#e60023]">•</span>
          <span>Produits livrés en 6 jours</span>
          <span className="text-[#e60023]">•</span>
          <span>Paiement sécurisé</span>
        </div>
      </div>
    </div>
  );
};

export default MiniBanner;