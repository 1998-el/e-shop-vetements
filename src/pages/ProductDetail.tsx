import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/home/ProductCard';

import ButtonSpinner from '../components/common/ButtonSpinner';
import { useProduct, useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { reviews } from '../data/mockData';
import { getProductImageUrl } from '../utils/productImageHelper';
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus, AlertCircle, Shield, CheckCircle, Truck, RefreshCw, Lock, Award } from 'lucide-react';
import Video_UGC from '../components/common/Video_UGC';
import ReviewCarousel from '../components/home/ReviewCarousel';
import FAQ from '../components/home/FAQ';
import ProductOffertCarousel from '../components/common/ProductOffertCarousel';
import CategoryCards from '../components/home/CategoryCards';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, loading } = useCart();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
    // Gestion du swipe mobile
    const handleTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchMove = (e: React.TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
      if (touchStartX.current !== null && touchEndX.current !== null) {
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 40) nextImage();
        else if (diff < -40) prevImage();
      }
      touchStartX.current = null;
      touchEndX.current = null;
    };
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
      navigate('/cart');
    } catch (error) {
      // Optionnel : afficher une notification d'erreur
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

      

      <div className="w-full px-0 py-4 md:py-6 lg:py-8">
        {/* Desktop: grille 2 colonnes, mobile: stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Colonne 1: Images + Carrousel */}
          <div className="w-full">
            <div className="relative bg-gray-50 rounded border border-gray-200">
              <div
                style={{width:'100%',aspectRatio:'1/1',background:'#f9fafb',position:'relative',borderRadius:'0.5rem',overflow:'hidden'}}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={product.images[selectedImage] || getProductImageUrl(product)}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-md"
                  style={{margin:0,padding:0,display:'block',position:'absolute',top:0,left:0,right:0,bottom:0,borderRadius:'0.5rem'}}
                  onError={(_e) => {}}
                  crossOrigin="anonymous"
                />
              </div>
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 touch-manipulation"
                    style={{background:'none',border:'none',padding:8,opacity:0.7}}
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 text-white" style={{opacity:0.8}} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 touch-manipulation"
                    style={{background:'none',border:'none',padding:8,opacity:0.7}}
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 text-white" style={{opacity:0.8}} />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div>
                <div className="flex gap-0 sm:gap-0 overflow-x-hidden pb-0">
                  {Array.from({length: product.images.length}).map((_, i) => {
                    const realIndex = (selectedImage + i) % product.images.length;
                    const image = product.images[realIndex];
                    return (
                      <button
                        key={realIndex}
                        onClick={() => setSelectedImage(realIndex)}
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md border-2 border-gray-200 transition-all touch-manipulation ${
                          realIndex === selectedImage 
                            ? 'border-gray-900 ring-2 ring-gray-200' 
                            : 'hover:border-gray-400'
                        }`}
                        aria-label={`Voir l'image ${realIndex + 1}`}
                        style={{margin:0,padding:0, borderRadius:'0.5rem', overflow:'hidden'}}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${realIndex + 1}`}
                          className="w-full h-full object-cover rounded-md"
                          onError={(_e) => {}}
                          loading="lazy"
                          crossOrigin="anonymous"
                          style={{margin:0,padding:0, borderRadius:'0.5rem'}}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Carrousel des produits offerts - Desktop uniquement */}
            <div className="mt-6 hidden lg:block">
              <ProductOffertCarousel />
            </div>
          </div>
          {/* Colonne 2: Infos produit */}
          <div className="bg-white p-4 sm:p-6 md:p-8 border border-gray-200 m-0 w-full">
            <div className="mb-6 sm:mb-8">

              <div className="flex flex-row flex-nowrap items-center gap-1 mb-2 whitespace-nowrap">
                <div className="flex items-center mr-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < defaultRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-800 font-semibold mr-1">
                  4.8/5
                </span>
                <span className="text-sm text-gray-500 font-medium mr-1">(+1.2k avis)</span>
                <br/>
                <span className="text-sm text-green-600 font-bold block">17.3k vendus</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className=" sm:text- text-sm-[#0e0e52] mb-4">Fini l’épluchage pénibles et interminables !</div>
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-base sm:text-lg text-gray-400 line-through mr-2" style={{fontWeight:400}}>€79,99</span>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                    <span className="ml-2 px-2 py-1 rounded bg-green-600 text-white text-xs sm:text-base font-semibold">
                      Economisez 20€
                    </span>
                  </div>
                  <div className="w-full h-px bg-blue-100 mt-2 rounded-full"></div>
                  <div className="flex flex-col gap-3 mt-2">
                    <div className="text-sm sm:text-base">
                      <span className="font-bold text-gray-700 whitespace-nowrap">
                        <span role="img" aria-label="Sans effort" className="mr-1">💪</span>
                        Sans effort :
                      </span>
                      <span className="text-gray-600 font-normal break-words"> Ne fatiguez plus vos mains, l’outil fait le travail pour vous.</span>
                    </div>
                    <div className="text-sm sm:text-base">
                      <span className="font-bold text-gray-700 whitespace-nowrap">
                        <span role="img" aria-label="Plus vite" className="mr-1">⚡</span>
                        Ni perte de temps :
                      </span>
                      <span className="text-gray-600 font-normal break-words"> La machine épluche plusieurs légumes simultanément en 1 ou 2 minutes.</span>
                    </div>
                    <div className="text-sm sm:text-base">
                      <span className="font-bold text-gray-700 whitespace-nowrap">
                        <span role="img" aria-label="Sans Salete" className="mr-1">🧼</span>
                        Sans Saleté :
                      </span>
                      <span className="text-gray-600 font-normal break-words"> Gardez votre plan de travail propre, les déchets d'épluchage restent dans la machine.</span>
                    </div>
                    <div className="text-sm sm:text-base">
                      <span className="font-bold text-gray-700 whitespace-nowrap">
                        <span role="img" aria-label="En securite" className="mr-1">🛡️</span>
                        En sécurité :
                      </span>
                      <span className="text-gray-600 font-normal break-words"> Utilisation sans risque de coupure, même pour les enfants.</span>
                    </div>
                  </div>
                  {/* Bloc Cadeaux Offerts juste après les bénéfices */}
                  <div className="mt-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Offert avec votre pack</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* 1er cadeau */}
                      <div className="bg-white rounded-xl border border-gray-300 border-gray-400 shadow-lg p-2 flex flex-col justify-between relative min-h-[70px] max-h-[90px]">
                        <div className="flex items-center gap-2">
                          <img src="/images/photo_produits_offerts/produit offerts (5).jpeg" alt="Fouet offert" className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800 text-xs sm:text-sm">Casse-oeuf</div>
                          </div>
                          <div className="flex flex-col items-end ml-2">
                            <span className="text-xs text-gray-400 line-through mb-1">17,99€</span>
                            <span className="px-2 py-1 rounded bg-green-600 text-white text-xs font-bold">Offert</span>
                          </div>
                        </div>
                      </div>
                      {/* 2e cadeau */}
                      <div className="bg-white rounded-xl border border-gray-300 border-gray-400 shadow-lg p-2 flex flex-col justify-between relative min-h-[70px] max-h-[90px]">
                        <div className="flex items-center gap-2">
                          <img src="/images/photo_produits_offerts/produit offerts (6).jpeg" alt="Pinceau offert" className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800 text-xs sm:text-sm">Fouet de cuisine</div>
                          </div>
                          <div className="flex flex-col items-end ml-2">
                            <span className="text-xs text-gray-400 line-through mb-1">13,99€</span>
                            <span className="px-2 py-1 rounded bg-green-600 text-white text-xs font-bold">Offert</span>
                          </div>
                        </div>
                      </div>
                      {/* 3e cadeau surprise */}
                      <div className="bg-white rounded-xl border border-gray-300 border-gray-400 shadow-lg p-2 flex flex-col justify-between relative min-h-[70px] max-h-[90px]">
                        <div className="flex items-center gap-2">
                          <div className="relative w-12 h-12 flex items-center justify-center">
                            <img src="/images/produits_a_gagner.png" alt="Cadeau offert" className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800 text-xs sm:text-sm">Cadeau surprise à gagner</div>
                          </div>
                          <div className="flex flex-col items-end ml-2">
                            <span className="text-xs text-gray-400 line-through mb-1">&nbsp;</span>
                            <span className="px-2 py-1 rounded bg-green-600 text-white text-xs font-bold">Offert</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Compteur jusqu'à minuit */}
                    <div className="mt-2 col-span-full">
                      <CountdownToMidnight />
                      {/* Date de livraison */}
                      <LivraisonDate />
                      {/* Bloc Garantie 30 jours */}
                      <div
                        className="mt-2 flex items-start sm:items-center gap-2 sm:gap-4 px-2 py-2 rounded-lg border"
                        style={{ borderColor: '#0e0e52', background: '#f8f9fb' }}
                      >
                        <img
                          src="/images/logos/Check.png"
                          alt="Badge Beldouze"
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover bg-white flex-shrink-0"
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col">
                            <span className="text-[0.68em] sm:text-xs" style={{ whiteSpace: 'nowrap' }}>
                              <span className="font-bold" style={{ color: '#0e0e52' }}>Garantie 30 jours</span> satisfait ou remboursé
                            </span>
                            <span className="text-[0.65em] sm:text-xs text-gray-600 mt-0.5" style={{ lineHeight: 1.2 }}>
                              Si vous n'êtes pas satisfait, à certaines conditions, vous serez remboursé.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Bloc actions aligné à droite sur desktop, déplacé juste après le bloc infos produit */}
            <div className="flex flex-col items-center lg:items-end gap-6 mt-0">
              {/* Quantity Selector */}
              <div className="mb-0 w-full lg:w-auto flex justify-center lg:justify-end">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full justify-center">
                  <div className="inline-flex items-center border border-gray-300 rounded-lg w-[90px] mx-auto">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2 py-1 hover:bg-gray-50 transition-colors touch-manipulation"
                        disabled={loading}
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-2 py-1 font-semibold text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.available, quantity + 1))}
                        className="px-2 py-1 hover:bg-gray-50 transition-colors touch-manipulation"
                        disabled={loading}
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="space-y-3 sm:space-y-4 w-full lg:w-auto flex flex-col items-center lg:items-end">
                <button
                  onClick={handleAddToCart}
                  disabled={loading}
                  className="w-[90%] max-w-[400px] py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-200 text-white hover:opacity-90 touch-manipulation lg:ml-auto"
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
                      <span className="sm:hidden">Au Panier</span>
                    </>
                  )}
                </button>
                {/* Liste des icônes de paiement */}
                <div className="flex flex-row items-center justify-center lg:justify-end mt-2 mb-2 mx-auto lg:mx-0 w-[90%] max-w-[400px] gap-2">
                  {[
                    {src: '/images/icon-payment/Apple Pay.png', alt: 'Apple Pay'},
                    {src: '/images/icon-payment/visa.png', alt: 'Visa'},
                    {src: '/images/icon-payment/Gpay.png', alt: 'Google Pay'},
                    {src: '/images/icon-payment/paypal.png', alt: 'Paypal'},
                    {src: '/images/icon-payment/mastercard.png', alt: 'Mastercard'}
                  ].map((icon) => (
                    <div key={icon.alt} className="flex justify-center">
                      <img
                        src={icon.src}
                        alt={icon.alt}
                        className="rounded-md border border-gray-200 object-contain bg-white shadow-sm"
                        style={{padding:'2px', width:'3.2rem', height:'2rem', maxWidth:'100%'}}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Trust Elements & Benefits */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 w-full lg:w-auto">
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
                {/* Carrousel des produits offerts - Mobile uniquement */}
                <div className="block lg:hidden mt-4">
                  <ProductOffertCarousel />
                </div>
              </div>
            </div>
          </div>
          <CategoryCards />
                {/* Bloc vidéos UGC, avis, FAQ */}
                <div className="max-w-7xl mx-auto w-full">
                  {/* Images "Comment ça marche" et "Tableau comparaison" côte à côte sur desktop */}
                  <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <img 
                        src="/images/images_compsant/Comment ça marche.png" 
                        alt="Comment ça marche" 
                        className="w-full object-contain mx-auto block"
                        style={{maxWidth:'100%'}}
                      />
                    </div>
                    <div>
                      <img 
                        src="/images/images_compsant/Tableau comparaison.png" 
                        alt="Tableau de comparaison" 
                        className="w-full object-contain mx-auto block"
                        style={{maxWidth:'100%'}}
                      />
                    </div>
                  </div>
                  <div className="my-8">
                    <Video_UGC />
                  </div>
                  <div>
                    <ReviewCarousel />
                  </div>
                  <div className="my-8">
                    <FAQ />
                  </div>
                </div>
          </div>


         

          {/* Promotional Text */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-900 font-medium text-sm sm:text-base text-center leading-relaxed">
              Fini les longues corvées d'épluchage : avec notre éplucheur innovant, préparez vos légumes en un instant, sans effort et en toute sécurité
            </p>
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
                      <span className="text-sm text-gray-600 font-medium">+1200 avis clients</span>
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
  
    </Layout>
  );
};



// Countdown component placé en dehors du composant principal
const CountdownToMidnight: React.FC = () => {
  // Initialise le timer à la bonne valeur dès le départ
  const getSecondsToMidnight = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
  };
  const [timeLeft, setTimeLeft] = useState(getSecondsToMidnight());

  useEffect(() => {
    const update = () => {
      setTimeLeft(getSecondsToMidnight());
    };
    update();
    const interval = setInterval(update, 1000);

    // Gestion de la visibilité de la page (mobile, onglet inactif)
    const handleVisibility = () => {
      if (!document.hidden) {
        update();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full flex items-center justify-center gap-0 text-xs text-red-700 bg-red-100 px-1 py-2 rounded border border-red-300 tracking-wide" style={{margin:0}}>
      <span style={{fontSize:'0.8rem',marginRight:'2px',marginLeft:'2px',whiteSpace:'nowrap',fontWeight:'normal'}}>Aujourd'hui :</span>
      <span className="font-mono" style={{fontSize:'1rem',marginRight:'2px',marginLeft:'2px',letterSpacing:'1px', fontWeight:'bold'}}>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
      <span style={{fontSize:'0.85rem',marginRight:'2px',marginLeft:'2px',whiteSpace:'nowrap',fontWeight:'bold'}}>restant</span>
    </div>
  );
};


// Composant pour afficher la date de livraison
const LivraisonDate: React.FC = () => {
  // Délai de livraison en jours
  const delai = 6;
  const mois = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const today = new Date();
  // Ajout du délai en jours, gère le passage au mois suivant automatiquement
  const livraison = new Date(today);
  livraison.setDate(today.getDate() + delai);
  const jour = livraison.getDate();
  const moisNom = mois[livraison.getMonth()];
  return (
    <div className="my-2 text-sm sm:text-base text-blue-900 text-left" style={{fontWeight:'normal'}}>
      Livraison le <span style={{fontWeight:'bold', fontSize:'1em'}}>{jour} {moisNom}</span>
    </div>
  );
}

export default ProductDetail;
