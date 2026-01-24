import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ScrollingBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "1  Éplucheur acheté = 2 Accessoires Offerts",
    " -20€ sur toutes vos commandes dès aujourd'hui ",
    "Plus de 17.3k éplucheur vendus" 
  ];

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 6000); // Changement toutes les 6 secondes

    return () => clearInterval(interval);
  }, [isVisible, messages.length]);

  if (!isVisible) return null;

  return (
    <div className="bg-[#0e0e52] text-white py-2 px-2 sm:px-4 relative border-b border-gray-700">
      {/* Contenu */}
      <div className="flex items-center justify-center">
        <div className="text-center text-xs sm:text-sm max-w-full overflow-hidden">
          <span className="inline-block transition-opacity duration-300 px-4 leading-tight font-bold">
            {messages[currentMessageIndex]}
          </span>
        </div>
      </div>

      {/* Bouton de fermeture */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        aria-label="Fermer la bannière"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ScrollingBanner;