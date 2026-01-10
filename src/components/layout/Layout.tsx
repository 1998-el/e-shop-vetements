
import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import ScrollingBanner from '../common/ScrollingBanner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <ScrollingBanner />
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;