import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/home/ProductCard';
import { useProduct, useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus, AlertCircle } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { product, loading, error } = useProduct(id || '');
  const { products: allProducts } = useProducts({ limit: 8 });

  const relatedProducts = allProducts
    .filter(p => p.categoryName === product?.categoryName && p.id !== product?.id)
    .slice(0, 4);

  if (loading) {
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

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
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

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-900">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-gray-900">Produits</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="relative bg-white rounded border border-gray-200">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain p-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/products/default.jpg';
                }}
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex mt-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border ${
                      selectedImage === index ? 'border-gray-900' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} avis)
                </span>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="ml-2 text-gray-500 line-through">€{product.oldPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <div>Marque: {product.brand}</div>
                <div>Âge: {product.age}</div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.available, quantity + 1))}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.available} en stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gray-900 text-white py-3 rounded hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Ajouter au panier
              </button>
            </div>

            {/* Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Livraison gratuite dès 50€</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Retour 14 jours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Garantie qualité</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 border border-gray-200 rounded">
          <div className="border-b border-gray-200">
            <div className="flex">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium text-sm border-b-2 ${
                    activeTab === tab
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab === 'description' && 'Description'}
                  {/* {tab === 'specifications' && 'Caractéristiques'} */}
                  {tab === 'reviews' && 'Avis'}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 mb-6">{product.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Âge recommandé</div>
                    <div className="text-gray-600">{product.age}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Catégorie</div>
                    <div className="text-gray-600">{product.category.name}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Marque</div>
                    <div className="text-gray-600">{product.brand}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Stock</div>
                    <div className="text-gray-600">{product.available} unités</div>
                  </div>
                </div>
              </div>
            )}

          
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-xl font-bold">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">{product.reviewCount} avis</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {Array.from({ length: Math.min(3, product.reviewCount) }).map((_, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div>
                          <div className="text-sm font-medium">Client {index + 1}</div>
                          <div className="flex items-center">
                            {renderStars(5 - index)}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Excellent produit, mon enfant adore. Recommandé !
                      </p>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50">
                    Voir tous les avis
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;