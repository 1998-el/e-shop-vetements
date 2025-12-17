import React, { useState, useEffect, useRef } from 'react';

const BrandLogos: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const brands = [
    {
      id: 'lego',
      name: 'LEGO',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/1024px-LEGO_logo.svg.png',
      alt: 'LEGO Logo'
    },
    {
      id: 'barbie',
      name: 'Barbie',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Barbie_Logo.svg/1024px-Barbie_Logo.svg.png',
      alt: 'Barbie Logo'
    },
    {
      id: 'nintendo',
      name: 'Nintendo',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Nintendo.svg/1024px-Nintendo.svg.png',
      alt: 'Nintendo Logo'
    },
    {
      id: 'playmobil',
      name: 'Playmobil',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Playmobil_logo.svg/1024px-Playmobil_logo.svg.png',
      alt: 'Playmobil Logo'
    },
    {
      id: 'hasbro',
      name: 'Hasbro',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Hasbro_Logo.svg/1024px-Hasbro_Logo.svg.png',
      alt: 'Hasbro Logo'
    },
    {
      id: 'fisher-price',
      name: 'Fisher-Price',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Fisher-Price_logo.svg/1024px-Fisher-Price_logo.svg.png',
      alt: 'Fisher-Price Logo'
    },
    {
      id: 'vtech',
      name: 'VTech',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/VTech_logo.svg/1024px-VTech_logo.svg.png',
      alt: 'VTech Logo'
    },
    {
      id: 'mattel',
      name: 'Mattel',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Mattel_Logo.svg/1024px-Mattel_Logo.svg.png',
      alt: 'Mattel Logo'
    },
    {
      id: 'hot-wheels',
      name: 'Hot Wheels',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Hot_Wheels_Logo.svg/1024px-Hot_Wheels_Logo.svg.png',
      alt: 'Hot Wheels Logo'
    },
    {
      id: 'schleich',
      name: 'Schleich',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Schleich_logo.svg/1024px-Schleich_logo.svg.png',
      alt: 'Schleich Logo'
    },
    {
      id: 'melissa-doug',
      name: 'Melissa & Doug',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Melissa_%26_Doug_logo.svg/1024px-Melissa_%26_Doug_logo.svg.png',
      alt: 'Melissa & Doug Logo'
    },
    {
      id: 'ravensburger',
      name: 'Ravensburger',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ravensburger_logo.svg/1024px-Ravensburger_logo.svg.png',
      alt: 'Ravensburger Logo'
    }
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

  // Calculer les marques visibles selon le slide
  const getVisibleBrands = () => {
    const start = currentSlide * SLIDES_PER_VIEW_MOBILE;
    return brands.slice(start, start + SLIDES_PER_VIEW_MOBILE);
  };

  return (
    <div className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 md:px-4">
        <h3 className="text-center text-lg md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">
          Marques Partenaires
        </h3>
        
        {/* Version Desktop - Grille fixe */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
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