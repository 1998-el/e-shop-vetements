import React from 'react';
import { Award, ArrowRight, Star } from 'lucide-react';

const FeaturedBrands: React.FC = () => {
  const brands = [
    {
      id: 'nike',
      name: 'Nike',
      logo: '🏃',
      description: 'Performance & Style',
      products: '2.5k+ produits',
      rating: 4.8,
      discount: 'Jusqu\'à -40%',
      color: 'from-black to-gray-800'
    },
    {
      id: 'adidas',
      name: 'Adidas',
      logo: '⚡',
      description: 'Sport & Innovation',
      products: '2.1k+ produits',
      rating: 4.8,
      discount: 'Jusqu\'à -35%',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'zara',
      name: 'Zara',
      logo: '✨',
      description: 'Fashion Forward',
      products: '1.8k+ produits',
      rating: 4.8,
      discount: 'Jusqu\'à -50%',
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 'hm',
      name: 'H&M',
      logo: '🌟',
      description: 'Affordable Fashion',
      products: '3.2k+ produits',
      rating: 4.8,
      discount: 'Jusqu\'à -60%',
      color: 'from-red-600 to-red-800'
    },
    {
      id: 'louis-vuitton',
      name: 'Louis Vuitton',
      logo: '👑',
      description: 'Luxury & Heritage',
      products: '450+ produits',
      rating: 4.9,
      discount: 'Collection exclusive',
      color: 'from-amber-600 to-amber-800'
    },
    {
      id: 'gucci',
      name: 'Gucci',
      logo: '💎',
      description: 'Italian Excellence',
      products: '380+ produits',
      rating: 4.9,
      discount: 'Nouveautés',
      color: 'from-green-600 to-green-800'
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Marques Premium
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez les plus grandes marques de mode, footwear et accessoires
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
            >
              {/* Brand Header */}
              <div className={`relative bg-gradient-to-br ${brand.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{brand.logo}</div>
                    <div>
                      <h3 className="text-xl font-bold">{brand.name}</h3>
                      <p className="text-sm opacity-90">{brand.description}</p>
                    </div>
                  </div>
                  <Award className="w-8 h-8 text-yellow-300" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-300 fill-current" />
                    <span className="font-semibold">{brand.rating}</span>
                    <span className="text-sm opacity-75">({brand.products})</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-bold">{brand.discount}</span>
                  </div>
                </div>
              </div>

              {/* Brand Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">{brand.products}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{brand.rating}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                    <span>Voir produits</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Click Handler */}
              <a
                href={`/products?brand=${brand.name.toLowerCase()}`}
                className="absolute inset-0 z-10"
                aria-label={`Voir tous les produits ${brand.name}`}
              ></a>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600 text-sm">Marques partenaires</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">50k+</div>
              <div className="text-gray-600 text-sm">Produits disponibles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.8★</div>
              <div className="text-gray-600 text-sm">Note moyenne</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Support client</div>
            </div>
          </div>
        </div>

        {/* View All Brands Button */}
        <div className="text-center">
          <a
            href="/brands"
            className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Voir toutes les marques
            <Award className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBrands;
