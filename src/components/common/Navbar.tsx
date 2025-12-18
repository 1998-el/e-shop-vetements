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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto px-8 sm:px-6 lg:px-40  ">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Gauche */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-red-600">
              beldouze
            </Link>
          </div>

          {/* Desktop Navigation - Centre */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 flex md:items-center ">
            <div className=" space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{i18n.language === 'fr' ? 'FR' : 'EN'}</span>
            </button>

            <Link
              to="/cart"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Right Actions */}
          <div className="md:hidden flex space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm text-gray-700"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs">{i18n.language === 'fr' ? 'FR' : 'EN'}</span>
            </button>

            <Link
              to="/cart"
              className="relative text-gray-700 flex items-center" 
            >
              <ShoppingCart className="h-5 w-5 " />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="p-1 text-gray-700"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3">
            {/* Mobile Navigation Links */}
            <div className="space-y-1 mb-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Cart Summary */}
            {cartItemsCount > 0 && (
              <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">{cartItemsCount}</span> article{cartItemsCount > 1 ? 's' : ''} dans le panier
                  </div>
                  <Link
                    to="/cart"
                    onClick={closeMobileMenu}
                    className="text-sm text-blue-600 font-medium hover:text-blue-700"
                  >
                    Voir le panier
                  </Link>
                </div>
              </div>
            )}

            {/* Language Info */}
            <div className="pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-2">Langue actuelle</div>
              <button
                onClick={() => {
                  toggleLanguage();
                  closeMobileMenu();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{i18n.language === 'fr' ? 'Français' : 'English'}</span>
                </div>
                <span className="text-gray-500">Changer</span>
              </button>
            </div>

            {/* Shipping Info */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-center text-xs text-gray-500 space-y-1">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-green-600">✓</span>
                  <span>Livraison gratuite dès 50€</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-green-600">✓</span>
                  <span>Paiement sécurisé</span>
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