
import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Shield, RotateCcw, Heart, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200" style={{ backgroundColor: '#0e0e52' }}>
      {/* Trust Section - Helloboku Style */}
      <div className="bg-helloboku-page-bg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Trust Item */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-helloboku-links/10 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-helloboku-links" />
              </div>
              <div>
                <h4 className="font-semibold text-helloboku-headings mb-1 text-sm sm:text-base">Livraison gratuite</h4>
                <p className="text-xs sm:text-sm text-gray-600">Dès 50€ d'achat en France métropolitaine</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-helloboku-links/10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-helloboku-links" />
              </div>
              <div>
                <h4 className="font-semibold text-helloboku-headings mb-1 text-sm sm:text-base">Paiement sécurisé</h4>
                <p className="text-xs sm:text-sm text-gray-600">Vos données sont protégées à 100%</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-helloboku-links/10 rounded-full flex items-center justify-center">
                <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-helloboku-links" />
              </div>
              <div>
                <h4 className="font-semibold text-helloboku-headings mb-1 text-sm sm:text-base">Retours faciles</h4>
                <p className="text-xs sm:text-sm text-gray-600">14 jours pour changer d'avis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info - Enhanced */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block mb-3 lg:mb-4">
              <h3 className="text-xl lg:text-2xl font-heading font-bold text-white tracking-tight">
                beldouze
              </h3>
            </Link>
            <p className="text-gray-100 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6 max-w-md">
              Des jouets de qualité qui stimulent l'imagination et le développement des enfants.
              Nous sélectionnons avec soin chaque produit pour garantir sécurité et diversión.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-xs lg:text-sm">
              <div className="flex items-center gap-2 text-gray-100">
                <Mail className="w-3 h-3 lg:w-4 lg:h-4 text-gray-100" />
                <span>contact@beldouze.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-100">
                <Phone className="w-3 h-3 lg:w-4 lg:h-4 text-gray-100" />
                <span>+33 759 59 97 42</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold text-gray-50 text-sm lg:text-base mb-3 lg:mb-4">Navigation</h4>
            <ul className="space-y-2 lg:space-y-3 text-xs lg:text-sm">
              <li>
                <Link to="/products" className="text-gray-100 hover:text-helloboku-links transition-colors">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link to="/products?category=nouveautes" className="text-gray-100 hover:text-helloboku-links transition-colors">
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-100 hover:text-helloboku-links transition-colors">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-helloboku-headings text-sm lg:text-base mb-3 lg:mb-4">Service client</h4>
            <ul className="space-y-2 lg:space-y-3 text-xs lg:text-sm">
              <li>
                <Link to="/shipping" className="text-gray-100 hover:text-helloboku-links transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-100 hover:text-helloboku-links transition-colors">
                  Retours & échanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-100 hover:text-helloboku-links transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-100 hover:text-helloboku-links transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-100 hover:text-helloboku-links transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-100 hover:text-helloboku-links transition-colors">
                  CGV
                </Link>
              </li>
            </ul>
          </div>
        </div>


        {/* Newsletter Section */}
        {/* <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-helloboku-page-bg rounded-2xl p-6">
            <div className="text-center max-w-2xl mx-auto">
              <h4 className="text-lg font-semibold text-helloboku-headings mb-2">
                Restez informé de nos nouveautés
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Recevez nos dernières offres et découvertes directement dans votre boîte mail
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-helloboku-links/20 focus:border-helloboku-links"
                />
                <button className="px-6 py-3 bg-helloboku-links text-white font-semibold rounded-xl hover:bg-helloboku-headings transition-colors">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Payment Methods Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">
              Moyens de paiement acceptés
            </h4>
            <div className="flex items-center justify-center gap-6">
              <div className="  p-3 ">
                <img 
                  src="https://i.pinimg.com/736x/df/e7/d8/dfe7d85565213cdab9c559d0991955c5.jpg" 
                  alt="Stripe" 
                  className="h-8 w-auto"
                />
              </div>
              <div className="p-3 ">
                <img 
                  src="/images/logos/paypal-logo.png" 
                  alt="PayPal" 
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-3">
              Vos paiements sont sécurisés et cryptés
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 lg:gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} beldouze. Tous droits réservés.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-gray-500 text-center sm:text-left">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-red-500" />
                Fait avec amour en France
              </span>
              <span className="hidden sm:inline">•</span>
              <span>Jouets certifiés CE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
