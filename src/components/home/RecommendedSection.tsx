import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { getProductImageUrl } from '../../utils/productImageHelper';

const RecommendedSection: React.FC = () => {
  const { products, loading } = useProducts({ limit: 20 });
  const [activeTab, setActiveTab] = useState('recommended');

  // Mock user preferences (in real app, this would come from user data)
  const recommendedProducts = products.slice(0, 8);
  const recentlyViewed = products.slice(4, 12);
  const trendingProducts = products
    .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
    .slice(0, 8);

  const tabs = [
    { id: 'recommended', label: 'Recommandés pour vous', products: recommendedProducts },
    { id: 'recent', label: 'Récemment vus', products: recentlyViewed },
    { id: 'trending', label: 'Tendances', products: trendingProducts }
  ];

  const activeProducts = tabs.find(tab => tab.id === activeTab)?.products || recommendedProducts;

  if (loading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">Chargement des recommandations...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Vous pourriez aimer
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez des produits soigneusement sélectionnés selon vos préférences
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100 inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {activeProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={getProductImageUrl(product)}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(_e) => {}}
                  loading="lazy"
                  crossOrigin="anonymous"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.oldPrice && product.oldPrice > product.price && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </div>
                  )}
                  {product.available <= 5 && product.available > 0 && (
                    <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                      Plus que {product.available}
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Quick Add to Cart */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-orange-600 text-white p-2 rounded-full shadow-md hover:bg-orange-700 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.reviewCount?.toLocaleString() || 0})
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    €{product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && product.oldPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      €{product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-1 mb-3">
                  <div className={`w-2 h-2 rounded-full ${
                    product.available > 0 ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                  <span className={`text-xs ${
                    product.available > 0 ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {product.available > 0 ? 'En stock' : 'Rupture'}
                  </span>
                </div>

                <button className="w-full bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm">
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-flex items-center bg-white text-orange-600 border-2 border-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors"
          >
            Voir plus de produits
            <ShoppingCart className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendedSection;
