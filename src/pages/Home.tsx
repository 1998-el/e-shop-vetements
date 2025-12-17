import React from 'react';
import Layout from '../components/layout/Layout';
import Banner from '../components/home/Banner';
import CategoryCards from '../components/home/CategoryCards';
import ProductGrid from '../components/home/ProductGrid';
import ReviewCarousel from '../components/home/ReviewCarousel';

// New Amazon/Alibaba style components
import DealsSection from '../components/home/DealsSection';

const Home: React.FC = () => {
  return (
    <Layout>
      {/* Top Mini Banner */}
      {/* <MiniBanner /> */}
      
      {/* Main Hero Banner */}
      <Banner />
      
      
      {/* Deals & Flash Sales Section - Amazon Style */}
      <DealsSection />
       <CategoryCards />
      
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
      
      {/* Brand Logos - Existing component */}
     
      
      {/* Customer Reviews - Enhanced */}
      <ReviewCarousel />
    </Layout>
  );
};

export default Home;
