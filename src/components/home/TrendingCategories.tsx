
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';

const TrendingCategories: React.FC = () => {
  const categories = [
    {
      id: 'clothing',
      name: 'Mode Femme',
      image: '/images/categories/women-fashion.jpg',
      description: 'Tendances & Elegance',
      itemCount: '2.5k+ produits',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'shoes',
      name: 'Chaussures',
      image: '/images/categories/shoes.jpg',
      description: 'Style & Confort',
      itemCount: '1.8k+ produits',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'accessories',
      name: 'Accessoires',
      image: '/images/categories/accessories.jpg',
      description: 'Complétez votre style',
      itemCount: '3.2k+ produits',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'bags',
      name: 'Sacs & Maroquinerie',
      image: '/images/categories/bags.jpg',
      description: 'Elegance & Praticité',
      itemCount: '1.5k+ produits',
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'jewelry',
      name: 'Bijoux',
      image: '/images/categories/jewelry.jpg',
      description: 'Brillance & Luxe',
      itemCount: '900+ produits',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 'watches',
      name: 'Montres',
      image: '/images/categories/watches.jpg',
      description: 'Precision & Style',
      itemCount: '600+ produits',
      color: 'from-gray-600 to-gray-800'
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Catégories Tendance
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez les catégories les plus populaires et trouvez exactement ce que vous cherchez
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100"
            >
              {/* Background Image */}
              <div className="relative aspect-square overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">
                      {category.id === 'clothing' && '👗'}
                      {category.id === 'shoes' && '👟'}
                      {category.id === 'accessories' && '👜'}
                      {category.id === 'bags' && '🎒'}
                      {category.id === 'jewelry' && '💍'}
                      {category.id === 'watches' && '⌚'}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ArrowRight className="w-6 h-6 text-gray-900" />
                  </div>
                </div>
              </div>

              {/* Category Info */}
              <div className="p-4 bg-white">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.itemCount}</p>
                </div>
              </div>

              {/* Click Handler */}
              <a
                href={`/products?category=${category.id}`}
                className="absolute inset-0 z-10"
                aria-label={`Voir tous les produits de la catégorie ${category.name}`}
              ></a>
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Voir toutes les catégories
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingCategories;
