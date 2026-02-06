import React from 'react';
import Layout from '../components/layout/Layout';
import Banner from '../components/home/Banner';
import CategoryCards from '../components/home/CategoryCards';
import ProductGrid from '../components/home/ProductGrid';
import ReviewCarousel from '../components/home/ReviewCarousel';
import FAQ from '../components/home/FAQ';
import Positionnement from '../components/common/Positionnement';
import VideoAutoplayOnScroll from '../components/home/VideoAutoplayOnScroll';
import Benefices from '../components/common/Benefices';
import Video_UGC from '../components/common/Video_UGC';
import ProductOffertCarousel from '../components/common/ProductOffertCarousel';

// New Amazon/Alibaba style components
const Home: React.FC = () => {
    return (
      <Layout>
      {/* Top Mini Banner */}
      {/* <MiniBanner /> */}
      
      {/* Main Hero Banner */}
      <Banner />
      {/* Carrousel des produits offerts */}
      

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
      <Benefices />
      {/* Bloc vidéo + image comment ça marche côte à côte sur desktop */}
      <div className="w-full my-6">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Vidéo */}
          <div className="w-full md:w-1/2">
            <VideoAutoplayOnScroll
              videoSrc="/videos/tiktok_1766724838220.mp4"
              posterSrc="https://picsum.photos/1920/1080?random=1"
              title="L'épluchage ne doit plus être une souffrance"
              description="Regardez comment notre éplucheur révolutionnaire transforme la préparation des légumes en quelques secondes, sans effort et avec une précision parfaite."
              className="bg-gradient-to-b from-white to-gray-50 py-8 md:py-0"
              threshold={0.5}
            />
          </div>
          {/* Image Comment ça marche */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img
              src="/images/images_compsant/Comment ça marche.png"
              alt="Comment ça marche"
              className="w-full object-contain mx-auto block"
              style={{ maxWidth: '500px' }}
            />
          </div>
        </div>
      </div>
      {/* Tableau comparaison + texte côte à côte sur desktop */}
      <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-8 my-8">
        <div className="flex justify-center w-full md:w-1/2">
          <img
            src="/images/images_compsant/Tableau comparaison.png"
            alt="Tableau de comparaison"
            className="object-contain mx-auto block rounded-lg shadow-md"
            style={{ maxWidth: '400px', width: '100%', margin: '0 16px' }}
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center">
          <div className="bg-white py-8 w-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
              Fini les corvées d’épluchage interminables et épuisantes :
Tu rentres tard le soir, tu es <span className="font-bold">fatigué, crevé, affamé</span>...mais au lieu de manger rapidement,tu dois encore éplucher un tas de légumes.
Tout ça, c’est fini !!!
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <ProductCarousel 
        title="Produits les plus vendus" 
        subtitle="Découvrez les produits favoris de nos clients"
        maxProducts={3}
        className="bg-white"
      /> */}

      {/* Accessories Carousel */}
      {/* <ProductCarousel 
        title="Accessoires" 
        subtitle="Compléments essentiels pour votre cuisine"
        maxProducts={6}
        category="accessoires"
        className="bg-gray-50"
      /> */}

      {/* Intro Text Below Video */}
    
      {/* Vidéos UGC juste après le texte d'intro */}
        <Video_UGC 
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
              <div className="col-span-3 flex justify-center items-center w-full">
                <ProductOffertCarousel />
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
