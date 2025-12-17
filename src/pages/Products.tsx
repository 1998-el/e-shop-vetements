import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/home/ProductCard';
import { useProducts } from '../hooks/useProducts';
import type { UIProduct } from '../types';
import { RefreshCw, AlertCircle } from 'lucide-react';

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600 transition-colors">Accueil</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Produits</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Tous nos jouets</h1>
              <p className="text-gray-600 text-sm">
                {loading ? 'Chargement...' : `${pagination?.total || 0} produits`}
              </p>
            </div>
            
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 text-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && products.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-900"></div>
            <p className="text-gray-600 mt-4">Chargement des produits...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Erreur de chargement</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={refresh}
              className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {products.map((product: UIProduct) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {isLoadingMore ? 'Chargement...' : 'Voir plus de produits'}
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🧸</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun produit disponible</h3>
            <p className="text-gray-600">Revenez plus tard pour découvrir notre sélection.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;