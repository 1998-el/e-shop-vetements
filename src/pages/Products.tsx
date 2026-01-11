import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/home/ProductCard';
import { useProducts } from '../hooks/useProducts';
import type { UIProduct } from '../types';
import { RefreshCw, AlertCircle } from 'lucide-react';
import ReviewCarousel from '../components/home/ReviewCarousel';
import PromotionsZone from '../components/products/PromotionsZone';

const Products: React.FC = () => {
  const [page, setPage] = useState(1);

  const {
    products,
    loading,
    error,
    pagination,
    refresh,
    hasMore,
    isLoadingMore
  } = useProducts({ page, limit: 20 });

  const loadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <Layout>
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-3">
          <nav className=" items-center text-xs sm:text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600 transition-colors">Accueil</a>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-gray-900 font-medium">Produits</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 lg:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                Nos produits
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                {loading ? 'Chargement...' : `${pagination?.total || 0} produits`}
              </p>
            </div>
            
            {/* Masquer le bouton sur très petits écrans (< 480px) */}
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-blue-600 text-xs sm:text-sm self-start sm:self-auto"
            >
              <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden xs:inline">Actualiser</span>
              <span className="xs:hidden">↻</span>
            </button>
          </div>
        </div>
      </div>

      {/* Promotions Zone - S'affiche seulement si des produits en promo existent */}
      {!loading && !error && products.some(p => p.oldPrice && p.oldPrice > p.price) && (
        <PromotionsZone />
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {/* Loading State */}
        {loading && products.length === 0 && (
          <div className="text-center py-8 sm:py-16">
            <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-gray-300 border-t-gray-900"></div>
            <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base">Chargement des produits...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-8 sm:py-16 bg-white border border-gray-200 rounded-lg mx-2 sm:mx-0">
            <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-red-500 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Erreur de chargement</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-4">{error}</p>
            <button
              onClick={refresh}
              className="bg-gray-900 text-white px-4 sm:px-6 py-2 rounded hover:bg-gray-800 transition-colors text-sm sm:text-base"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
              {products.map((product: UIProduct) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center px-4 sm:px-0">
                <button
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="border border-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm sm:text-base w-full sm:w-auto"
                >
                  {isLoadingMore ? 'Chargement...' : 'Voir plus de produits'}
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-8 sm:py-16 px-4">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🍳</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Aucun produit disponible</h3>
            <p className="text-gray-600 text-sm sm:text-base">Revenez plus tard pour découvrir notre sélection.</p>
          </div>
        )}
      </div>

      {/* Trust Indicators */}
    

      {/* Reviews Section */}
      <ReviewCarousel />
    </Layout>
  );
};

export default Products;
