import React from 'react';
import Layout from '../components/layout/Layout';
import Banner from '../components/home/Banner';
import CategoryCards from '../components/home/CategoryCards';
import ProductGrid from '../components/home/ProductGrid';
import ReviewCarousel from '../components/home/ReviewCarousel';
import FAQ from '../components/home/FAQ';
import Video_UGC from '../components/common/Video_UGC';
import Positionnement from '../components/common/Positionnement';
import LogoCarousel from '../components/home/LogoCarousel';
import ProductCarousel from '../components/home/ProductCarousel';
import VideoAutoplayOnScroll from '../components/home/VideoAutoplayOnScroll';

// New Amazon/Alibaba style components

const Home: React.FC = () => {
  return (
    <Layout>
      {/* Top Mini Banner */}
      {/* <MiniBanner /> */}
      
      {/* Main Hero Banner */}
      <Banner />
      

      {/* Deals & Flash Sales Section supprimée */}
       <CategoryCards />
       {/* Bloc d'infos statistiques mobile, sur une ligne */}
      <div className="flex flex-row items-center justify-center gap-6 mt-10 mb-12 px-6 py-4 text-center text-gray-800 text-base font-semibold md:hidden" style={{ borderRadius: '1rem' }}>
         <div>
           <span className="text-xl text-yellow-500 font-bold">4.8/5</span><br />
           <span className="text-sm font-normal text-gray-500">Note moyenne</span>
         </div>
         <div>
           <span className="text-xl text-helloboku-links font-bold">+17,3k</span><br />
           <span className="text-sm font-normal text-gray-500">Ventes réalisées</span>
         </div>
         <div>
           <span className="text-xl text-green-600 font-bold">92.3%</span><br />
           <span className="text-sm font-normal text-gray-500">Clients satisfaits</span>
         </div>
      </div>

          {/* Positionnement - juste après le bloc des stats */}
          <Positionnement />
      
      {/* Trending Categories - Alibaba Style */}
      {/* <TrendingCategories /> */}
      
      {/* Featured Brands - Premium Section */}
      {/* <FeaturedBrands /> */}
      
      {/* Product Grid - Existing but enhanced */}
      <ProductGrid />
      
      {/* Recommended Products - Amazon Style */}
      {/* <RecommendedSection /> */}
      
      {/* Services & Trust Section */}
      {/* <ServicesSection /> */}
      
      
      {/* Section vidéo avec autoplay au scroll - Plus large */}
      <VideoAutoplayOnScroll
        videoSrc="/videos/tiktok_1766724838220.mp4" // Vidéo de démo pour test
        posterSrc="https://picsum.photos/1920/1080?random=1" // Image de remplacement
        title="L'épluchage ne doit plus être une souffrance"
        description="Regardez comment notre éplucheur révolutionnaire transforme la préparation des légumes en quelques secondes, sans effort et avec une précision parfaite."
        className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-16"
        threshold={0.5}
      />
      
    

      {/* Best Selling Products Carousel */}
      {/* <ProductCarousel 
        title="Produits les plus vendus" 
        subtitle="Découvrez les produits favoris de nos clients"
        maxProducts={3}
        className="bg-white"
      /> */}

      {/* Accessories Carousel */}
      <ProductCarousel 
        title="Accessoires" 
        subtitle="Compléments essentiels pour votre cuisine"
        maxProducts={6}
        category="accessoires"
        className="bg-gray-50"
      />

      {/* Intro Text Below Video */}
      <div className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            Fini les corvées d'épluchage interminables et épuisantes : découvrez notre éplucheur innovant qui transforme la préparation des repas en plaisir rapide et sans casse-tête ni effort.
          </p>
        </div>
      </div>
      {/* Vidéos UGC juste après le texte d'intro */}
        <Video_UGC 
          autoSlideInterval={3000} // 3 secondes
          showArrows={false}
          showDots={true}
          className="my-8"
        />

      {/* Section marque Beldouze - Crédibilité et storytelling */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo/Titre de marque avec design professionnel */}
          <div className="text-center mb-12">
           
            <h2 className="text-4xl md:text-5xl font-bold text-helloboku-headings mb-4">
              Beldouze
            </h2>
            <div className="w-24 h-1 bg-helloboku-links mx-auto"></div>
          </div>

          {/* Contenu principal professionnel */}
          <div className="text-center space-y-8">
            <p className="text-2xl md:text-3xl font-semibold text-helloboku-headings leading-tight">
              La marque francophone experte en <span className="text-helloboku-links">gadgets cuisine</span> pratiques et viraux
            </p>
            
            <p className="text-xl md:text-2xl text-helloboku-text leading-relaxed max-w-4xl mx-auto">
              Qui <span className="font-semibold text-helloboku-headings">simplifie la vie quotidienne</span> en transformant les corvées en <span className="font-semibold text-helloboku-links">moments de plaisir</span>
            </p>

            {/* Points de différenciation avec icônes sobres */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-helloboku-links" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-helloboku-headings">Notre Crédibilité</h3>
                <p className="text-helloboku-text">Experts reconnus dans l'innovation cuisine</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-helloboku-links" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-helloboku-headings">Storytelling Lifestyle</h3>
                <p className="text-helloboku-text">Chaque produit raconte une histoire</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-helloboku-links" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-helloboku-headings">Rapidité & Plaisir</h3>
                <p className="text-helloboku-text">Repas plus rapides et agréables</p>
              </div>
            </div>

            {/* Citation finale sobre */}
            <div className="mt-12 pt-8 border-t border-gray-300">
              <p className="text-lg text-helloboku-text italic font-medium">
                "Parce que bien manger ne devrait jamais être une corvée"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Image Placeholder */}
      {/* <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Voyez la différence par vous-même
          </h2>
          <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
            <span className="text-gray-500">Image de comparaison avant/après</span>
          </div>
        </div>
      </div> */}
      
      {/* Customer Reviews - Enhanced */}
      <ReviewCarousel />
      {/* FAQ juste avant le footer */}
      <FAQ />
    </Layout>
  );
};

export default Home;
