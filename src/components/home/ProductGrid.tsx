
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { AlertCircle, RefreshCw, Flame, Clock, Tag, Sparkles } from 'lucide-react';

const ProductGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bestsellers');
  // const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch products from API
  const { products: allProducts, loading, error, refresh } = useProducts({ limit: 20 });

  // Filter out accessoires category products to show only in their dedicated section
  const products = allProducts.filter(product => 
    product.categoryName?.toLowerCase() !== 'accessoires'
  );

  // Get different product categories based on API data
  const bestsellers = products
    .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
    .slice(0, 8);

  const newArrivals = products
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  const onSale = products
    .filter(product => product.oldPrice && product.oldPrice > product.price)
    .slice(0, 8);

  const featured = products
    .filter(product => (product.rating || 0) >= 4.5)
    .slice(0, 8);

  const tabs = [
    { id: 'bestsellers', label: 'Meilleures ventes', products: bestsellers, icon: <Flame className="w-4 h-4" /> },
    { id: 'new-arrivals', label: 'Nouveautés', products: newArrivals, icon: <Clock className="w-4 h-4" /> },
    { id: 'on-sale', label: 'Promos', products: onSale, icon: <Tag className="w-4 h-4" /> },
    { id: 'featured', label: 'À la une', products: featured, icon: <Sparkles className="w-4 h-4" /> }
  ];

  const activeProducts = tabs.find(tab => tab.id === activeTab)?.products || bestsellers;

  // Loading state
  if (loading) {
    return (
      <div className="py-8 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-3 lg:px-8">
          <div className="text-center py-6">
            <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-gray-900"></div>
            <p className="text-gray-600 mt-2 text-xs lg:text-sm">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-8 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-3 lg:px-8">
          <div className="text-center py-6">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">Erreur</h3>
            <p className="text-gray-600 mb-3 text-xs lg:text-sm">{error}</p>
            <button
              onClick={refresh}
              className="bg-gray-900 text-white px-4 py-1.5 rounded text-xs hover:bg-gray-800 transition-colors flex items-center gap-1 mx-auto"
            >
              <RefreshCw className="w-3 h-3" />
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-6 lg:py-12">
      <div className="max-w-7xl mx-auto px-3 lg:px-8">
        {/* Section Header - Mobile Optimized */}
        {/* <div className="mb-6 lg:mb-8">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-1 lg:mb-2">
            Notre sélection
          </h2>
          <p className="text-gray-600 text-xs lg:text-sm">
            Accessoires de cuisine de qualité pour simplifier vos repas
          </p>
        </div> */}

        {/* Mobile Filter Toggle */}
        {/* <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium w-full justify-center"
          >
            <Grid className="w-4 h-4" />
            <span>Filtrer : {tabs.find(t => t.id === activeTab)?.label}</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${showMobileFilters ? 'rotate-90' : ''}`} />
          </button>
        </div> */}

        {/* Mobile Filters Dropdown */}
        {/* {showMobileFilters && (
          <div className="lg:hidden mb-4 bg-gray-50 rounded-lg p-3 shadow-sm">
            <div className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowMobileFilters(false);
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded text-xs font-medium ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        )} */}

        {/* Desktop Tabs */}
        <div className="hidden lg:block mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-6 lg:space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Scroll Indicator */}
        {/* <div className="lg:hidden mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">
                {tabs.find(t => t.id === activeTab)?.label} ({activeProducts.length})
              </span>
            </div>
            <button
              onClick={() => document.getElementById('products-grid')?.scrollBy({ left: 200, behavior: 'smooth' })}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Voir plus →
            </button>
          </div>
        </div> */}

        {/* Products Grid - Responsive Grid */}
        <div
          id="products-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8"
        >
          {activeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        {/* <div className="text-center">
          <Link
            to="/products"
            className="inline-block border border-gray-300 text-gray-700 px-5 py-2.5 lg:px-6 lg:py-3 rounded text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            <span className="hidden sm:inline">Voir tous les produits</span>
            <span className="sm:hidden">Voir tout</span>
            <ChevronRight className="w-4 h-4 inline-block ml-1" />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default ProductGrid;