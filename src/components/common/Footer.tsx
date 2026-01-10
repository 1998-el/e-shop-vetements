
import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Shield, RotateCcw, Heart, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200" style={{ backgroundColor: '#0e0e52' }}>
      {/* Trust Section - Helloboku Style */}
      <div className="bg-helloboku-page-bg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {/* Trust Item */}
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-helloboku-links/10 rounded-full flex items-center justify-center">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-helloboku-links" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-helloboku-headings mb-1 text-xs sm:text-sm lg:text-base">Livraison gratuite</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-tight">Dès 50€ d'achat en France métropolitaine</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-helloboku-links/10 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-helloboku-links" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-helloboku-headings mb-1 text-xs sm:text-sm lg:text-base">Paiement sécurisé</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-tight">Vos données sont protégées à 100%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-center sm:text-left sm:col-span-2 lg:col-span-1">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-helloboku-links/10 rounded-full flex items-center justify-center">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-helloboku-links" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-helloboku-headings mb-1 text-xs sm:text-sm lg:text-base">Retours faciles</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-tight">14 jours pour changer d'avis</p>
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
              Des produits de qualité qui améliorent votre quotidien. Nous sélectionnons avec soin chaque article pour garantir fiabilité, sécurité et plaisir d'utilisation.
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
              <div className="flex items-center gap-4 mt-2">
                <a href="https://www.tiktok.com/@beldouze_officiel?_r=1&_t=ZM-92tsO2FH63I" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.5 7c.3 2.7 2.3 8.5 8.5 9v6.2c-3.2.3-6.5-.3-9.5-2.1v13.7c0 7.2-5.8 13-13 13s-13-5.8-13-13 5.8-13 13-13c.7 0 1.4.1 2 .2v6.3c-.7-.2-1.3-.3-2-.3-3.7 0-6.7 3-6.7 6.7s3 6.7 6.7 6.7 6.7-3 6.7-6.7V4h6.3Z" fill="#fff"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/beldouze/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="#fff" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="2"/>
                    <circle cx="17" cy="7" r="1" fill="#fff"/>
                  </svg>
                </a>
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

        {/* Payment Methods Section - avec logos locaux */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">
              Moyens de paiement acceptés
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto">
              {/* Visa */}
              <div className="flex-shrink-0 p-1">
                <img src="/images/icon-payment/visa.png" alt="Visa" className="w-10 h-6 sm:w-12 sm:h-7 lg:w-14 lg:h-8 object-contain rounded shadow-sm bg-white" title="Visa" />
              </div>
              {/* Mastercard */}
              <div className="flex-shrink-0 p-1">
                <img src="/images/icon-payment/mastercard.png" alt="Mastercard" className="w-10 h-6 sm:w-12 sm:h-7 lg:w-14 lg:h-8 object-contain rounded shadow-sm bg-white" title="Mastercard" />
              </div>
              {/* PayPal */}
              <div className="flex-shrink-0 p-1">
                <img src="/images/icon-payment/paypal.png" alt="PayPal" className="w-10 h-6 sm:w-12 sm:h-7 lg:w-14 lg:h-8 object-contain rounded shadow-sm bg-white" title="PayPal" />
              </div>
              {/* Carte bancaire */}
              <div className="flex-shrink-0 p-0">
                <img src="/images/icon-payment/Carte bancaire.jpeg" alt="Carte bancaire" className="w-10 h-6 sm:w-12 sm:h-7 lg:w-14 lg:h-8 object-contain rounded-md shadow-sm" title="Carte bancaire" />
              </div>
              {/* Gpay */}
              <div className="flex-shrink-0 p-1">
                <img src="/images/icon-payment/Gpay.png" alt="Google Pay" className="w-10 h-6 sm:w-12 sm:h-7 lg:w-14 lg:h-8 object-contain rounded shadow-sm bg-white" title="Google Pay" />
              </div>
              {/* Apple Pay */}
              <div className="flex-shrink-0 p-1">
                <img src="/images/icon-payment/Apple Pay.png" alt="Apple Pay" className="w-10 h-6 sm:w-12 sm:h-7 lg:w-14 lg:h-8 object-contain rounded shadow-sm bg-white" title="Apple Pay" />
              </div>
              {/* American Express */}
              <div className="flex-shrink-0 p-0">
                <img src="/images/icon-payment/American Express.png" alt="American Express" className="w-10 h-6 sm:w-12 sm:h-7 lg:w-14 lg:h-8 object-contain rounded shadow-sm" title="American Express" />
              </div>
              {/* Discover */}
              <div className="flex-shrink-0 p-1">
                <img src="/images/icon-payment/Discover.png" alt="Discover" className="w-10 h-6 sm:w-12 sm:h-7 lg:w-14 lg:h-8 object-contain rounded shadow-sm bg-white" title="Discover" />
              </div>
              {/* Maestro */}
              <div className="flex-shrink-0 p-1">
                <img src="/images/icon-payment/maestro.png" alt="Maestro" className="w-10 h-6 sm:w-12 sm:h-7 lg:w-14 lg:h-8 object-contain rounded shadow-sm bg-white" title="Maestro" />
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 lg:py-4">
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-3 lg:gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs text-gray-500">
                © 2020 beldouze. Tous droits réservés.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-xs text-gray-500 text-center sm:text-left">
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                <Heart className="w-3 h-3 text-red-500" />
                <span>Fait avec amour en France</span>
              </div>
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                <span className="hidden sm:inline text-gray-400">•</span>
                <span>Accessoires certifiés CE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
