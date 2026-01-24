import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import type { UIProduct } from '../../types';
import { useCart } from '../../context/CartContext';
import ButtonSpinner from '../common/ButtonSpinner';
import { getProductImageUrl } from '../../utils/productImageHelper';

interface ProductCardProps {
  product: UIProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [_imageError, _setImageError] = React.useState(false);
  const [addingToCart, setAddingToCart] = React.useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();



  // Calculate discount percentage
  const discountPercentage = product.oldPrice && product.oldPrice > product.price 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingToCart(true);
    try {
      await addToCart(product.id, 1);
      navigate(`/product/${product.id}`);
    } catch (error) {
      // Optionally handle error
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="group bg-white border border-gray-200 shadow-md h-full flex flex-col rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-purple-400">
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        {/* Image container with discount badge */}
        <div className="relative w-full pt-[100%] bg-white overflow-hidden">
          {/* Discount badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
              -{discountPercentage}%
            </div>
          )}
          <img
            src={getProductImageUrl(product)}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 rounded-2xl border border-gray-200"
            onError={() => {}}
            loading="lazy"
            crossOrigin="anonymous"
            style={{boxSizing:'border-box'}}
          />
        </div>

        {/* Product info - Helloboku Style */}
        <div className="p-3 lg:p-4 flex-1 flex flex-col bg-transparent">
          {/* Title */}
          <h3 className="font-heading font-semibold text-sm lg:text-base text-helloboku-headings mb-2 lg:mb-3 line-clamp-2 leading-relaxed group-hover:text-helloboku-links transition-colors duration-200">
            {product.name}
          </h3>

          {/* Star rating - Dynamic based on product rating */}
          <div className="flex items-center gap-1 mb-3 lg:mb-4">
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              const isFullStar = product.rating >= ratingValue;
              const isHalfStar = product.rating >= ratingValue - 0.5 && product.rating < ratingValue;
              
              return (
                <Star
                  key={i}
                  className={`w-3 h-3 lg:w-4 lg:h-4 ${
                    isFullStar 
                      ? 'text-yellow-400 fill-current' 
                      : isHalfStar 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                  }`}
                  style={isHalfStar ? { clipPath: 'inset(0 50% 0 0)' } : {}}
                />
              );
            })}
            <span className="text-xs text-gray-500 ml-1 lg:ml-2">({product.rating.toFixed(1)})</span>
          </div>

          {/* Price with modern styling */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-1 lg:gap-2">
              <span className="text-lg lg:text-xl font-heading font-bold text-helloboku-headings">
                €{product.price.toFixed(2)}
              </span>

              {product.oldPrice && (
                <span className="text-xs lg:text-sm text-gray-500 line-through">
                  €{product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      
      {/* Bénéfices avant le bouton */}
      <div className="px-3 lg:px-4 pb-2 pt-0">
        <ul className="mb-2 space-y-3 text-xs text-gray-700">
          <li><span className="font-bold text-gray-700 mr-1">💪 Sans effort :</span> Ne fatiguez plus vos mains, l’outil fait le travail pour vous.</li>
          <li><span className="font-bold text-gray-700 mr-1">⚡ Plus vite :</span> Gagnez du temps sur la préparation, tout est prêt en quelques secondes.</li>
          <li><span className="font-bold text-gray-700 mr-1">🧼 Sans saleté :</span> Gardez votre plan de travail propre, fini les éclaboussures et les déchets partout.</li>
          <li><span className="font-bold text-gray-700 mr-1">🛡️ En sécurité :</span> Utilisation sans risque de coupure, même pour les enfants.</li>
        </ul>
      </div>
      {/* Add to cart button - Outside the Link */}
      <div className="p-3 lg:p-4 pt-0">
        <button
          className="w-full bg-helloboku-links text-white py-2 px-3 lg:px-4 rounded-lg font-medium text-sm hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center gap-2 group-hover:bg-helloboku-headings disabled:opacity-50"
          onClick={handleAddToCart}
          disabled={addingToCart}
        >
          {addingToCart ? (
            <ButtonSpinner size="sm" color="white" />
          ) : (
            <ShoppingCart className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">
            {addingToCart ? 'Ajout en cours...' : 'Ajouter au panier'}
          </span>
          <span className="sm:hidden">
            {addingToCart ? '...' : 'Je cuisine sans effort   -20€'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
