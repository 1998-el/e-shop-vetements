import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, Star, Truck, Loader2, Eye } from 'lucide-react';
import type { UIProduct } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: UIProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    
    try {
      await addToCart(product.id, 1);
      setIsAddedToCart(true);
      
      // Reset the added state after 2 seconds
      setTimeout(() => {
        setIsAddedToCart(false);
        setIsAddingToCart(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  };

  const calculateDiscount = () => {
    if (!product.oldPrice) return 0;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  };

  const discount = calculateDiscount();

  return (
    <div className="group relative bg-white border border-gray-200 hover:border-red-300 hover:shadow-sm transition-all duration-200 h-full flex flex-col overflow-hidden">
      <Link 
        to={`/product/${product.id}`} 
        className="flex flex-col h-full"
      >
        {/* Image container - Alibaba style */}
        <div className="relative w-full pt-[100%] bg-gray-50 overflow-hidden">
          <img
            src={imageError ? 'https://i.pinimg.com/1200x/83/35/50/8335500eb988e581e971ac1d19ef6b26.jpg' : product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          
          {/* Discount badge - Red for promotions only */}
          {discount > 0 && (
            <div className="absolute top-2 left-2 z-10 bg-red-600 text-white px-2 py-1 text-xs font-semibold">
              -{discount}%
            </div>
          )}

          {/* Limited stock badge - Orange for urgency */}
          {product.available > 0 && product.available <= 5 && (
            <div className="absolute top-2 right-2 z-10 bg-orange-500 text-white px-2 py-1 text-xs font-semibold">
              {product.available} left
            </div>
          )}

          {/* Quick view on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button 
              className="bg-white px-4 py-2 rounded-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors border border-gray-200"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Implement quick view modal here
              }}
            >
              <Eye className="w-4 h-4 inline-block mr-1" />
              Quick View
            </button>
          </div>
        </div>

        {/* Product info - Alibaba minimal style */}
        <div className="p-3 flex-1 flex flex-col">
          {/* Title - simple and clean */}
          <h3 className="font-normal text-sm text-gray-800 mb-2 line-clamp-2 leading-snug h-10 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating - minimal */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                  fill={i < product.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviewCount > 1000 ? `${(product.reviewCount/1000).toFixed(1)}k` : product.reviewCount})
            </span>
          </div>

          {/* Price section */}
          <div className="mt-auto">
            {/* Main price */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-lg font-bold text-gray-900">
                €{product.price.toFixed(2)}
              </span>
              
              {/* Old price if exists */}
              {product.oldPrice && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    €{product.oldPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-red-600 font-semibold">
                    Save €{(product.oldPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Shipping info */}
            <div className="mt-2 text-xs text-gray-600 flex  justify-between items-center">
              <div className="flex items-center gap-1 mb-1">
                <Truck className="w-3 h-3 text-green-600" />
                <span className="text-green-600 font-medium">Free Shipping</span>
              </div>
              
              {/* Stock info */}
              <div className="flex items-center justify-between text-xs ">
               
                {/* <span className="text-blue-600 font-medium">MOQ: 1 piece</span> */}
                 <span className={`font-medium ${product.available > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.available > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Action buttons */}
      <div className="px-3 pb-3 pt-0">
        <div className="flex gap-2">
          {/* Main add to cart button - Blue for primary action */}
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.available <= 0}
            className={`flex-1 py-2.5 rounded-sm text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
              isAddedToCart
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : isAddingToCart
                ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
                : product.available <= 0
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : isAddedToCart ? (
              <>
                <Check className="w-4 h-4" />
                Added
              </>
            ) : product.available <= 0 ? (
              'Out of Stock'
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>

          {/* Secondary button - Neutral gray */}
          {/* <button
            className="w-10 flex items-center justify-center border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors"
            title="Add to compare"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Implement compare functionality
            }}
          >
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </button> */}
        </div>

        {/* Trust badges */}
        {/* <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-gray-600">
            <Shield className="w-3 h-3 text-blue-600" />
            <span className="font-medium">Trade Assurance</span>
          </div>
          <span className="text-green-600 font-medium flex items-center gap-1">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            Verified
          </span>
        </div> */}
      </div>

      {/* Supplier info - Alibaba style */}
      {/* <div className="border-t border-gray-100 px-3 py-2 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">{product.brand?.charAt(0) || 'S'}</span>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-800">{product.brand || 'Verified Supplier'}</div>
              <div className="text-xs text-gray-500">2YRS • Gold Supplier</div>
            </div>
          </div>
          <button 
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Implement contact supplier functionality
            }}
          >
            <MessageCircle className="w-3 h-3" />
            Contact
          </button>
        </div>
      </div> */}

      {/* Professional B2B features */}
      {/* <div className="border-t border-gray-100 px-3 py-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Customization</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Sample Available</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProductCard;