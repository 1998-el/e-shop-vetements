import React, { useEffect, useState } from 'react';

const logos = [
  '/images/logo-medias/media1.png',
  '/images/logo-medias/media2.jpeg',
  '/images/logo-medias/media3.jpeg',
  '/images/logo-medias/media4.jpeg',
  '/images/logo-medias/media5.jpeg',
  '/images/logo-medias/media6.jpeg',
  '/images/logo-medias/media7.jpeg',
];

const LogoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 2500); // Change logo every 2.5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-gray-600 mb-6">Vu dans les médias</h3>
        
        {/* Mobile: carrousel automatique, un logo à la fois */}
        <div className="md:hidden flex justify-center items-center overflow-hidden">
          <div className="transition-all duration-500">
            <img
              src={logos[currentIndex]}
              alt={`Média ${currentIndex + 1}`}
              className="h-16 w-auto object-contain mx-auto"
            />
          </div>
        </div>
        
        {/* Desktop: tous les logos alignés, même taille */}
        <div className="hidden md:flex justify-center items-center gap-8 flex-wrap">
          {logos.map((logo, index) => (
            <div key={logo} className="flex-shrink-0">
              <img
                src={logo}
                alt={`Média ${index + 1}`}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;