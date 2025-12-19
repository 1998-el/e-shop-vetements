
import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import ScrollingBanner from '../common/ScrollingBanner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollingBanner />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;