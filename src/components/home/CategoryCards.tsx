import React, { useState, useEffect, useRef } from 'react';


const BrandLogos: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const brands = [
    // Grands médias mondiaux (références du web)
    {
      id: 'bbc',
      name: 'BBC',
      logo: 'https://1000logos.net/wp-content/uploads/2017/12/KitchenAid-Logo-768x432.png',
      alt: 'BBC World News Logo'
    },
    {
      id: 'cnn',
      name: 'CNN',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/1024px-CNN.svg.png',
      alt: 'CNN Logo'
    },
    {
      id: 'reuters',
      name: 'Reuters',
      logo: 'https://i.pinimg.com/1200x/24/93/83/249383cf7c5179e133ad5b17646bb130.jpg',
      alt: 'Reuters Logo'
    },
   
 
    // Marques leaders dans les accessoires de cuisine (références du web)
    {
      id: 'lego',
      name: 'LEGO',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/1024px-LEGO_logo.svg.png',
      alt: 'LEGO Logo'
    },

    
    {
      id: 'nintendo',
      name: 'Nintendo',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Nintendo.svg/1024px-Nintendo.svg.png',
      alt: 'Nintendo Logo'
    },
    {
      id: 'bandai',
      name: 'Bandai',
      logo: 'https://i.pinimg.com/736x/b0/4c/0a/b04c0a57d167491f0adb0c8f71fb6193.jpg',
      alt: 'Bandai Logo'
    },
    
  ];

  // Configuration du carrousel
  const SLIDE_INTERVAL = 3000; // 3 secondes entre chaque slide
  const SLIDES_PER_VIEW_MOBILE = 3;
  const totalSlides = Math.ceil(brands.length / SLIDES_PER_VIEW_MOBILE);

  // Démarrer l'autoplay
  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
      }, SLIDE_INTERVAL);
    };

    // Démarrer l'autoplay
    startAutoPlay();

    // Pause au survol
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      const pauseAutoPlay = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };

      const resumeAutoPlay = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        startAutoPlay();
      };

      carouselElement.addEventListener('mouseenter', pauseAutoPlay);
      carouselElement.addEventListener('mouseleave', resumeAutoPlay);
      carouselElement.addEventListener('touchstart', pauseAutoPlay);
      carouselElement.addEventListener('touchend', resumeAutoPlay);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        carouselElement.removeEventListener('mouseenter', pauseAutoPlay);
        carouselElement.removeEventListener('mouseleave', resumeAutoPlay);
        carouselElement.removeEventListener('touchstart', pauseAutoPlay);
        carouselElement.removeEventListener('touchend', resumeAutoPlay);
      };
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalSlides]);




  return (
    <div className="py-8 md:py-12 bg-[#f3f4ff]">
      <div className="max-w-6xl mx-auto px-3 md:px-4">
        <h3 className="text-center text-lg md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">
          Marques Partenaires
        </h3>
        
        {/* Version Desktop - Grille fixe */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center p-4 transition-shadow duration-300 "
            >
              <img
                src={brand.logo}
                alt={brand.alt}
                className="h-12 md:h-14 lg:h-16 w-auto object-contain max-w-full"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="text-sm md:text-base font-semibold text-gray-700 text-center">
                        ${brand.name}
                      </div>
                    `;
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* Version Mobile - Carrousel automatique */}
        <div 
          ref={carouselRef}
          className="md:hidden relative overflow-hidden"
        >
          <div className="flex transition-transform duration-500 ease-in-out"
               style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {/* Dupliquer les slides pour l'effet infini */}
            {[...brands, ...brands.slice(0, SLIDES_PER_VIEW_MOBILE)].map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="w-full flex-shrink-0 px-2"
                style={{ width: `${100 / SLIDES_PER_VIEW_MOBILE}%` }}
              >
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 h-full">
                  <img
                    src={brand.logo}
                    alt={brand.alt}
                    className="h-12 w-auto object-contain max-w-full"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="text-xs font-semibold text-gray-700 text-center">
                            ${brand.name}
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BrandLogos;