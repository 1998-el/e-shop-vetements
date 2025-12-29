
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Menu, X, Globe } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar: React.FC = () => {
  const { i18n } = useTranslation();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');

  const navItems = [
    { path: '/products', label: 'Produits' },
    { path: '/about', label: 'À propos' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' },
  ];

  const cartItemsCount = cart?.cartItems?.length || 0;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-helloboku-page-bg sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Aligné */}
          <div className="flex-shrink-0 flex items-center h-full">
            <Link 
              to="/" 
              className="text-2xl lg:text-3xl font-heading font-bold text-helloboku-links hover:text-helloboku-headings transition-all duration-300 tracking-tight flex items-center h-full"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              beldouze
            </Link>
          </div>

          {/* Desktop Navigation - Centré */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center h-full">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-helloboku-text hover:text-helloboku-links transition-all duration-200 relative group flex items-center h-full py-2"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-helloboku-links transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions - Desktop */}
          <div className="hidden lg:flex items-center space-x-6 flex-shrink-0 h-full">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm font-medium text-helloboku-text hover:text-helloboku-links transition-all duration-200 px-3 py-2 rounded-full hover:bg-helloboku-page-bg h-10"
            >
              <Globe className="w-4 h-4" />
              <span>{i18n.language === 'fr' ? 'FR' : 'EN'}</span>
            </button>

            <Link
              to="/cart"
              className="relative flex items-center gap-2 text-helloboku-text hover:text-helloboku-links transition-all duration-200 px-3 py-2 rounded-full hover:bg-helloboku-page-bg h-10"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Right Actions */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm text-helloboku-text p-2"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs">{i18n.language === 'fr' ? 'FR' : 'EN'}</span>
            </button>

            <Link
              to="/cart"
              className="relative text-helloboku-text p-2" 
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="p-2 text-helloboku-text hover:text-helloboku-links transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Enhanced */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-sm border-t border-helloboku-page-bg">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-base font-medium text-helloboku-text hover:text-helloboku-links hover:bg-helloboku-page-bg rounded-lg transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Cart Summary - Mobile */}
            {cartItemsCount > 0 && (
              <div className="p-4 bg-gradient-to-r from-helloboku-page-bg to-purple-50 rounded-lg border border-helloboku-links/10">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-helloboku-text">
                    <span className="font-semibold">{cartItemsCount}</span> article{cartItemsCount > 1 ? 's' : ''} dans le panier
                  </div>
                  <Link
                    to="/cart"
                    onClick={closeMobileMenu}
                    className="text-sm font-semibold text-helloboku-links hover:text-purple-600 transition-colors"
                  >
                    Voir le panier
                  </Link>
                </div>
              </div>
            )}

            {/* Language Switcher - Mobile */}
            <div className="pt-2 border-t border-helloboku-page-bg">
              <button
                onClick={() => {
                  toggleLanguage();
                  closeMobileMenu();
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-helloboku-text bg-helloboku-page-bg hover:bg-purple-50 rounded-lg transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{i18n.language === 'fr' ? 'Français' : 'English'}</span>
                </div>
                <span className="text-helloboku-links text-xs font-medium">Changer</span>
              </button>
            </div>

            {/* Trust Indicators - Mobile */}
            <div className="pt-4 border-t border-helloboku-page-bg">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-helloboku-text">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Livraison gratuite dès 50€</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-helloboku-text">
                  <div className="w-2 h-2 bg-helloboku-links rounded-full animate-pulse"></div>
                  <span className="font-medium">Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-helloboku-text">
                  <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">Retours 14 jours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
