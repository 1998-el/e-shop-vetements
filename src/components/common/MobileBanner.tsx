import React from 'react';

const MobileBanner: React.FC = () => {
  return (
    <div className="md:hidden relative bg-gradient-to-r from-[#e60023] to-[#cc001e] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative px-4 py-6 text-center text-white">
        <h2 className="text-lg font-bold mb-2"> Offre Spéciale Mobile</h2>
        <p className="text-sm opacity-90 mb-3">Livraison gratuite sur tous vos accessoires de cuisine préférés</p>
        <div className="flex justify-center items-center space-x-4 text-xs">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            Livraison 24h
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            Paiement sécurisé
          </span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-2 left-2 text-white/20 text-2xl">🍳</div>
      <div className="absolute bottom-2 right-2 text-white/20 text-2xl">🥄</div>
      <div className="absolute top-1/2 right-4 text-white/10 text-3xl">✨</div>
    </div>
  );
};

export default MobileBanner;