import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/home/ProductCard';
import ButtonSpinner from '../components/common/ButtonSpinner';
import { useProduct, useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { reviews } from '../data/mockData';
import { getProductImageUrl } from '../utils/productImageHelper';
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus, AlertCircle, Shield, CheckCircle, Truck, RefreshCw, Lock, Award } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, loading } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { product, loading: productLoading, error } = useProduct(id || '');
  const { products: allProducts } = useProducts({ limit: 8 });

  const relatedProducts = allProducts
    .filter(p => p.categoryName === product?.categoryName && p.id !== product?.id)
    .slice(0, 4);

  if (productLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-900"></div>
            <p className="text-gray-600 mt-4">Chargement du produit...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Produit non trouvé</h1>
            <p className="text-gray-600 mb-6">{error || 'Le produit que vous recherchez n\'existe pas.'}</p>
            <Link
              to="/products"
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50"
            >
              Retour aux produits
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
    } catch (error) {

    }
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  // Default rating for all products
  const defaultRating = 4.8;

  // Create more diverse reviews with male names
  const diverseReviews = [
    ...reviews,
    {
      id: '16',
      userName: 'Pierre M.',
      userAvatar: '/images/avatars/avatar16.jpg',
      rating: 5,
      comment: 'Excellent produit, ma femme et moi sommes ravis. La qualité est au rendez-vous et le service client est réactif.',
      date: '2024-12-15',
      badge: 'Client fidèle'
    },
    {
      id: '17',
      userName: 'Marc D.',
      userAvatar: '/images/avatars/avatar17.jpg',
      rating: 4,
      comment: 'Bon rapport qualité-prix. Produits livrés en 6 jours comme promis. Je recommande ce produit.',
      date: '2024-12-14',
      badge: 'Parent'
    },
    {
      id: '18',
      userName: 'Thomas L.',
      userAvatar: '/images/avatars/avatar18.jpg',
      rating: 5,
      comment: 'Très satisfait de mon achat. Le produit correspond exactement à la description. Merci !',
      date: '2024-12-13',
      badge: 'Expert'
    },
    {
      id: '19',
      userName: 'Jean-Pierre B.',
      userAvatar: '/images/avatars/avatar19.jpg',
      rating: 5,
      comment: 'Parfait pour toute la famille. Tous adorent ce produit et nous sommes très contents de la qualité.',
      date: '2024-12-12',
      badge: 'Parent'
    },
    {
      id: '20',
      userName: 'Luc R.',
      userAvatar: '/images/avatars/avatar20.jpg',
      rating: 4,
      comment: 'Bonne découverte ! Le produit est bien conçu et pratique. Livraison sans problème.',
      date: '2024-12-11',
      badge: 'Client fidèle'
    }
  ];

  return (
    <Layout>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <nav className="items-center text-xs md:text-sm text-gray-700 overflow-x-auto">
            <Link to="/" className="hover:text-gray-900 transition-colors font-medium whitespace-nowrap">Accueil</Link>
            <span className="mx-2 md:mx-3 text-gray-400">/</span>
            <Link to="/products" className="hover:text-gray-900 transition-colors font-medium whitespace-nowrap">Produits</Link>
            <span className="mx-2 md:mx-3 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold whitespace-nowrap">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Product Images */}
          <div>

            <div className="relative bg-gray-50 rounded border border-gray-200">
              <img
                src={product.images[selectedImage] || getProductImageUrl(product)}
                alt={product.name}
                className="w-full h-64 sm:h-80 md:h-96 object-contain p-4 sm:p-6 md:p-8"
                onError={(_e) => {}}
                crossOrigin="anonymous"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-3 sm:p-4 rounded-full hover:bg-gray-50 shadow-sm touch-manipulation"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-3 sm:p-4 rounded-full hover:bg-gray-50 shadow-sm touch-manipulation"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 sm:mt-6">
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded border-2 transition-all touch-manipulation ${
                        selectedImage === index 
                          ? 'border-gray-900 ring-2 ring-gray-200' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      aria-label={`Voir l'image ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                        onError={(_e) => {}}
                        loading="lazy"
                        crossOrigin="anonymous"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>


          {/* Product Info */}
          <div className="bg-white p-4 sm:p-6 md:p-8 border border-gray-200">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{product.name}</h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="flex items-center">
                  {renderStars(defaultRating)}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {defaultRating} (5000 avis)
                </span>
              </div>
              <div className="mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="ml-2 sm:ml-3 text-lg text-gray-500 line-through">€{product.oldPrice.toFixed(2)}</span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 sm:p-4 hover:bg-gray-50 transition-colors touch-manipulation"
                    disabled={loading}
                    aria-label="Diminuer la quantité"
                  >
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="px-4 sm:px-6 py-3 sm:py-4 font-semibold min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.available, quantity + 1))}
                    className="p-3 sm:p-4 hover:bg-gray-50 transition-colors touch-manipulation"
                    disabled={loading}
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {product.available} en stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={loading}
                className="w-full py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-200 text-white hover:opacity-90 touch-manipulation"
                style={{
                  backgroundColor: loading ? '#9CA3AF' : '#0e0e52'
                }}
              >
                {loading ? (
                  <>
                    <ButtonSpinner size="sm" color="white" />
                    <span className="hidden sm:inline">Ajout en cours...</span>
                    <span className="sm:hidden">Ajout...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span className="hidden sm:inline">Ajouter au panier</span>
                    <span className="sm:hidden">Au panier</span>
                  </>
                )}
              </button>
            </div>


            {/* Trust Elements & Benefits */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm mb-4 sm:mb-6">
                <div className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation">
                  <Truck className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-gray-800 text-sm sm:text-base">Livraison gratuite</div>
                    <div className="text-gray-600 text-xs">Dès 50€ d'achat</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation">
                  <RefreshCw className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-gray-800 text-sm sm:text-base">Retour 14 jours</div>
                    <div className="text-gray-600 text-xs">30 jours satisfait ou remboursées</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation">
                  <Lock className="w-6 h-6 text-purple-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-gray-800 text-sm sm:text-base">Paiement sécurisé</div>
                    <div className="text-gray-600 text-xs">SSL 256-bit chiffré</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation">
                  <Award className="w-6 h-6 text-orange-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-gray-800 text-sm sm:text-base">Garantie qualité</div>
                    <div className="text-gray-600 text-xs">Produits certifiés CE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promotional Text */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-900 font-medium text-sm sm:text-base text-center leading-relaxed">
              Fini les longues corvées d'épluchage : avec notre éplucheur innovant, préparez vos légumes en un instant, sans effort et en toute sécurité
            </p>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8 sm:mt-12 border border-gray-200 rounded">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {['description', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm border-b-2 whitespace-nowrap touch-manipulation ${
                    activeTab === tab
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab === 'description' && 'Description'}
                  {tab === 'reviews' && 'Avis'}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Catégorie</div>
                    <div className="text-gray-600">{product.category.name}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Stock</div>
                    <div className="text-gray-600">{product.available} unités</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (

              <div className="space-y-4 sm:space-y-6">
                {/* Review Summary */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <div className="flex items-center">
                          {renderStars(defaultRating)}
                        </div>
                        <span className="text-xl sm:text-2xl font-bold text-gray-900">{defaultRating}</span>
                        <span className="text-gray-600 text-sm sm:text-base">sur 5</span>
                      </div>
                      <span className="text-sm text-gray-600 font-medium">5000 avis clients</span>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="flex items-center gap-2 text-green-600 mb-1">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm font-medium">Avis vérifiés</span>
                      </div>
                      <span className="text-xs text-gray-500">Tous les avis sont authentiques</span>
                    </div>
                  </div>

                  {/* Rating Distribution */}
                  <div className="hidden sm:grid grid-cols-5 gap-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const percentage = Math.floor(Math.random() * 40) + 10;
                      return (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">{stars}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Mobile Rating Summary */}
                  <div className="sm:hidden flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Répartition des notes</span>
                    </div>
                    <div className="space-y-1">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const percentage = Math.floor(Math.random() * 40) + 10;
                        return (
                          <div key={stars} className="flex items-center gap-2">
                            <span className="text-xs text-gray-600 w-8">{stars}★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 w-8 text-right">{percentage}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>


                {/* Reviews List */}
                <div className="space-y-4 sm:space-y-6">
                  {diverseReviews.slice(0, 8).map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-white hover:shadow-sm transition-shadow">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200"
                            onError={(_e) => {}}
                            crossOrigin="anonymous"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="font-semibold text-gray-900 text-sm sm:text-base">{review.userName}</span>
                              {review.badge && (
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  <Shield className="w-3 h-3 mr-1" />
                                  {review.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-xs sm:text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-600 font-medium">Avis vérifié</span>
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>



              </div>
            )}
          </div>
        </div>


        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Produits similaires</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="w-full">
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
