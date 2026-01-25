import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';

const Banner: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useProducts({ limit: 1 });
  const mainProduct = products && products.length > 0 ? products[0] : null;
  const handleBannerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (mainProduct) {
      navigate(`/product/${mainProduct.id}`);
    }
  };
  return (
    <>
      {/* Mobile Banner - Version simplifiée */}
      <div className="lg:hidden relative h-[400px] overflow-hidden px-2">
        {/* Image d'arrière-plan */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/banners/cook_banner.jpg)' }}
        ></div>
        
        {/* Overlay léger pour lisibilité */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Contenu centré */}
        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight drop-shadow" style={{ color: '#fff'}}>
            Un repas prêt en <span>10 minutes
            <br />
            sans corvée </span>d'épluchage
          </h1>
          
          <p className="text-white/90 mb-6 text-sm max-w-md">
            Notre machine épluche tous vos ingrédients en 1-2 minutes, vous permettant de cuisiner rapidement et sans effort vos repas préférés.
          </p>
          
          <button
            onClick={handleBannerClick}
            className="inline-flex items-center gap-2 bg-helloboku-links text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-helloboku-links transition-all"
            disabled={!mainProduct}
          >
            Je cuisine sans efforts
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <p className="text-white/80 text-xs mt-6 max-w-sm">
            Un éplucheur acheté, deux accessoires offerts + un livre de recette gratuit
          </p>

          {/* Garanties sur mobile */}
          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-white">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span>Livraison gratuite</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-helloboku-links rounded-full"></div>
              <span>Garantie 2 ans</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
              <span>Retours 30 jours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Banner - Texte à gauche, image à droite */}
      <div className="hidden lg:block bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Colonne gauche - Texte */}
            <div>
              {/* Badge "Nouveau" */}
              <div className="mb-6">
                <span className="inline-block bg-helloboku-links text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                  Nouveau
                </span>
              </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight drop-shadow" style={{ color: '#3931f8' }}>
                Un repas prêt en 10 minutes
                <br />
                sans corvée d'épluchage
              </h1>
              
              <p className="text-helloboku-text mb-8 text-lg leading-relaxed">
                Découvrez nos solutions uniques pour préparer vos repas en un temps record, 
                sans corvée d'épluchage grâce à notre machine
              </p>
              
              {/* Offre spéciale */}
              <div className="mb-8 p-4 bg-helloboku-page-bg rounded-lg border border-helloboku-page-bg">
                <p className="text-helloboku-headings font-bold text-lg">
                  Un éplucheur acheté, deux accessoires offerts + un livre de recette gratuit
                </p>
                <p className="text-sm text-helloboku-text mt-1">
                  Offre valable jusqu'au 30 janvier 2026
                </p>
              </div>
              
              {/* Boutons CTA */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleBannerClick}
                  className="inline-flex items-center gap-3 bg-helloboku-links text-white px-8 py-4 rounded-lg font-bold hover:bg-helloboku-headings transition-all"
                  disabled={!mainProduct}
                >
                  Je cuisine sans efforts
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <Link 
                  to="/about" 
                  className="inline-flex items-center gap-2 border-2 border-helloboku-links text-helloboku-links px-8 py-4 rounded-lg font-semibold hover:bg-helloboku-page-bg transition-all"
                >
                  Notre histoire
                </Link>
              </div>
              
              {/* Statistiques */}
              <div className="flex items-center gap-8 pt-6 border-t border-helloboku-page-bg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-helloboku-headings">4.8/5</div>
                  <div className="text-sm text-helloboku-text">Note moyenne</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-helloboku-headings">17 000+</div>
                  <div className="text-sm text-helloboku-text">Ventes réalisées</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-helloboku-headings">95%</div>
                  <div className="text-sm text-helloboku-text">Clients satisfaits</div>
                </div>
              </div>

              {/* Garanties */}
              <div className="mt-6 flex items-center gap-6 text-sm text-helloboku-text">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Livraison gratuite</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-helloboku-links rounded-full"></div>
                  <span>Garantie 2 ans</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                  <span>Retours 30 jours</span>
                </div>
              </div>
            </div>

            {/* Colonne droite - Image */}
            <div className="relative">
              {/* Badge sur l'image */}
              <div className="absolute -top-4 -left-4 z-10">
                <div className="bg-helloboku-links text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
                  BEST-SELLER
                </div>
              </div>

              {/* Image principale */}
              <div className="relative overflow-hidden rounded-xl">
                <div 
                  className="h-[500px] bg-cover bg-center"
                  style={{ backgroundImage: 'url(/images/banners/cook_banner.jpg)' }}
                ></div>
                
                {/* Texte sur image */}
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-helloboku-page-bg">
                    <div className="text-helloboku-headings">
                      <div className="text-2xl font-bold mb-1">-50%</div>
                      <div className="text-sm font-medium">Pour les 1000 premiers</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicateur de prix */}
              <div className="mt-6 p-4 bg-helloboku-page-bg rounded-lg border border-helloboku-page-bg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-helloboku-text">Prix promotionnel</div>
                    <div className="text-2xl font-bold text-helloboku-headings">79,99€</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-helloboku-text line-through">159,99€</div>
                    <div className="text-sm font-bold text-green-700">Économisez 50%</div>
                  </div>
                </div>
              </div>

              {/* Garanties sous l'image */}
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="p-3 border border-helloboku-page-bg rounded-lg bg-helloboku-page-bg">
                  <div className="text-sm font-semibold text-helloboku-headings">Livraison offerte</div>
                </div>
                <div className="p-3 border border-helloboku-page-bg rounded-lg bg-helloboku-page-bg">
                  <div className="text-sm font-semibold text-helloboku-headings">Garantie 2 ans</div>
                </div>
                <div className="p-3 border border-helloboku-page-bg rounded-lg bg-helloboku-page-bg">
                  <div className="text-sm font-semibold text-helloboku-headings">30 jours retours</div>
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