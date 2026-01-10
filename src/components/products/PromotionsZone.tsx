

import React, { useState, useEffect } from 'react';
import { Clock, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../home/ProductCard';
import { useProducts } from '../../hooks/useProducts';

const PromotionsZone: React.FC = () => {
  const { products, loading } = useProducts({ limit: 20 });

  // Timer d'urgence pour les promotions
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }; // Reset
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filtrer les produits en promotion
  const promotionProducts = products.filter(product =>
    product.oldPrice && product.oldPrice > product.price
  ).slice(0, 4); // Limiter à 4 produits

  if (loading || promotionProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-8 mb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header avec timer */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-gray-700" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Offres <span className="text-gray-700">Exclusives</span>
            </h2>
          </div>

          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            Profitez de nos offres limitées dans le temps.
            <span className="font-semibold"> Économisez jusqu'à 50% !</span>
          </p>

          {/* Timer d'urgence */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-gray-700" />
              <span className="text-gray-900 font-semibold">Offre se termine dans :</span>
            </div>

            <div className="flex justify-center gap-4">
              {[
                { value: timeLeft.hours, label: 'Heures' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Secondes' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-100 border border-gray-200 px-4 py-3 rounded-lg font-bold text-2xl min-w-[3.5rem]">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-gray-600 text-sm mt-2 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Produits en promotion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {promotionProducts.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              {/* Badge urgent */}
              <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded text-xs font-bold">
                🔥 Offre limitée
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Link
            to="/promotions"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
          >
            Voir toutes les promotions
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Urgence complémentaire */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            ⏰ Plus que <span className="font-bold">{timeLeft.hours}h {timeLeft.minutes}m</span> pour profiter de ces tarifs exceptionnels !
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromotionsZone;
