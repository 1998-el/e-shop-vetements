import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              KidsTrésor
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Des jouets de qualité qui stimulent l'imagination et le développement des enfants.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/products" className="text-gray-400 hover:text-white transition-colors block py-1">Produits</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors block py-1">À propos</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-white transition-colors block py-1">FAQ</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors block py-1">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-base font-semibold mb-4">Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/shipping" className="text-gray-400 hover:text-white transition-colors block py-1">Livraison</a></li>
              <li><a href="/returns" className="text-gray-400 hover:text-white transition-colors block py-1">Retours</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors block py-1">Confidentialité</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors block py-1">Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Livraison gratuite dès 50€</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Paiement sécurisé</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                <span>Retours 14 jours</span>
              </div>
            </div>
            
            <div className="text-center sm:text-right">
              <p className="text-gray-400 text-xs">
                © {new Date().getFullYear()} KidsTrésor. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="text-center text-xs text-gray-400">
            <p>contact@kids-tresor.fr • 01 23 45 67 89</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;