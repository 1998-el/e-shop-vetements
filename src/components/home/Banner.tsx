
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Truck, Shield, RotateCcw, Star } from 'lucide-react';

const Banner: React.FC = () => {
  return (
    <>
      {/* Mobile Banner - Helloboku Style */}
      <div className="lg:hidden relative overflow-hidden h-[400px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/banners/banner_img.jpg)' }}
        ></div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-helloboku-page-bg/20 via-transparent to-helloboku-links/20"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-20 h-20 bg-helloboku-links/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative px-4 py-12 text-center">
       
         

          <h1 className="text-3xl font-heading font-bold mb-4 leading-tight text-white drop-shadow-lg">
            Des jouets qui font<br />
            <span className="text-white drop-shadow-lg">rêver les enfants</span>
          </h1>

          <p className="text-sm text-white/90 mb-6 leading-relaxed max-w-xs mx-auto drop-shadow-md">
            Découvrez notre sélection unique de jouets éducatifs et ludiques pour tous les âges
          </p>

          {/* CTA Button */}
          <div className="mb-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-helloboku-links text-white px-6 py-3 rounded-2xl font-semibold hover:bg-helloboku-headings transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Découvrir
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust indicators - Mobile */}
          <div className="flex justify-center items-center gap-4 text-xs text-white/90">
            <div className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-white/80" />
              <span>Livraison gratuite</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-white/80" />
              <span>Sécurisé</span>
            </div>
          </div>
        </div>
      </div>


      {/* Desktop Banner - Background Image with Overlay */}
      <div className="hidden lg:block relative overflow-hidden h-[670px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/banners/banner_img.jpg)' }}
        ></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-helloboku-page-bg/20 via-transparent to-helloboku-links/20"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-helloboku-links/20 rounded-full blur-3xl"></div>
          <Sparkles className="absolute top-32 right-32 w-6 h-6 text-white/30 animate-pulse" />
          <Sparkles className="absolute bottom-40 left-32 w-4 h-4 text-white/30 animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 min-h-screen flex items-center">
          <div className="w-full">
            <div className="max-w-4xl">
         

              <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-8 leading-tight text-white drop-shadow-lg  mt-0">
                Des jouets qui font
                <br />
                <span className="text-red-500 drop-shadow-lg">rêver les enfants</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl drop-shadow-md">
                Découvrez notre sélection unique de jouets éducatifs et ludiques. 
                Qualité premium, prix compétitifs et livraison rapide pour le bonheur des petits.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 mb-12">
                <Link 
                  to="/products" 
                  className="group inline-flex items-center gap-3 bg-helloboku-links text-white px-8 py-4 rounded-2xl font-semibold hover:bg-helloboku-headings transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Découvrir la collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                
                <Link 
                  to="/about" 
                  className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-helloboku-headings transition-all duration-300 bg-white/10"
                >
                  Notre histoire
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-8 text-sm text-white/90 mb-12">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-success-400" />
                  <span className="font-medium">Livraison gratuite dès 50€</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-helloboku-links" />
                  <span className="font-medium">Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-white/80" />
                  <span className="font-medium">Retours 14 jours</span>
                </div>
              </div>

              {/* Mini Statistics */}
              <div className="bg-white rounded-md p-6 border border-white/20">
                <div className="flex items-center gap-8">
                  {/* Rating */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-black/40'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-blue-600">
                      <div className="text-2xl font-bold">4.8</div>
                      <div className="text-sm text-gray-500">Note moyenne</div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="w-px h-12 bg-black/30"></div>

                  {/* Sales */}
                  <div className="text-blue-600">
                    <div className="text-2xl font-bold">17 000+</div>
                    <div className="text-sm text-gray-500">Ventes réalisées</div>
                  </div>

                  {/* Separator */}
                  <div className="w-px h-12 bg-black/30"></div>

                  {/* Happy Customers */}
                  <div className="text-blue-600">
                    <div className="text-2xl font-bold">95%</div>
                    <div className="text-sm text-gray-500">Clients satisfaits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;

