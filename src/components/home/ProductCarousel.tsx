import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  category?: string;
  maxProducts: number;
  className?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  category,
  maxProducts,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fetch products based on category
  const { products, loading, error } = useProducts({
    categoryName: category,
    limit: maxProducts * 2, // Fetch more to have options
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const displayedProducts = products.slice(0, maxProducts);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || displayedProducts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayedProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayedProducts.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + displayedProducts.length) % displayedProducts.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % displayedProducts.length);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (loading) {
    return (
      <div className={`py-12 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || displayedProducts.length === 0) {
    return (
      <div className={`py-12 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
          </div>
          <div className="text-center text-gray-500">
            {error ? 'Erreur lors du chargement des produits' : 'Aucun produit disponible'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`py-12 bg-gray-50 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / Math.min(displayedProducts.length, 4))}%)` }}
            >
              {displayedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {displayedProducts.length > 4 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                aria-label="Produit précédent"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                aria-label="Produit suivant"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {displayedProducts.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(displayedProducts.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * 4)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / 4) === index 
                      ? 'bg-gray-900 w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Aller au groupe de produits ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            Voir tous les produits
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;