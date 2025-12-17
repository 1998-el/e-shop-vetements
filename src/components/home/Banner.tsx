import React, { useEffect } from 'react';

const Banner: React.FC = () => {
  // Banner timer functionality is not used in this component
  // Keeping the useState and useEffect for potential future use
  
  useEffect(() => {
    // Future timer functionality can be added here
  }, []);

  return (
    <>
      {/* Mobile Banner - Professional design */}
      <div className="lg:hidden bg-primary-400 text-white relative overflow-hidden border-b border-secondary-200">
        {/* Hero Section with Background */}
        <div className="relative bg-primary-600 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-3 leading-tight text-white">
              Bienvenue chez <span className="text-accent-300">Kids'Trésor</span>
            </h1>
            <p className="text-sm text-primary-100 mb-4 leading-relaxed max-w-xs mx-auto">
              Découvrez des jouets exceptionnels pour enfants de tous âges
            </p>

            {/* CTA Button */}
            <div className="mb-4">
              <a href="/products" className="bg-white text-primary-900 px-6 py-3 rounded-lg font-semibold hover:bg-accent-300 transition-colors inline-block shadow-md hover:shadow-lg">
                Acheter maintenant
              </a>
            </div>
          </div>
        </div>

        {/* Trust & Services Section */}
       
      </div>

      {/* Desktop Banner - Professional design */}
      <div className="hidden lg:block bg-primary-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <h1 className="text-5xl font-bold mb-6 leading-tight text-white">
                Bienvenue chez <span className="text-accent-300">Kids'Trésor</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed max-w-lg">
                Découvrez des jouets exceptionnels pour enfants de tous âges. Qualité premium, prix compétitifs et livraison rapide.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <a href="/products" className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-block shadow-lg hover:shadow-xl transform hover:scale-105">
                  Acheter maintenant
                </a>
              
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                  <span className="text-sm text-primary-100">Livraison gratuite</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                  <span className="text-sm text-primary-100">Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                  <span className="text-sm text-primary-100">Satisfait ou remboursé</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <img
                src="/images/banners/banner_img.jpg"
                alt="Enfants jouant avec des jouets"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              {/* Floating promotion */}
              <div className="absolute -top-4 -right-4 bg-accent-400 text-primary-900 px-6 py-3 rounded-lg font-bold shadow-lg text-center">
                <div className="text-2xl">-50%</div>
                <div className="text-sm">sur sélection</div>
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </>
  );
};

export default Banner;