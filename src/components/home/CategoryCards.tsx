import React, { useState, useEffect, useRef } from 'react';


const BrandLogos: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const brands = [
    {
      id: 'amazon',
      name: 'Amazon',
      logo: '/images/logo-medias/amazon.png',
      alt: 'Amazon Logo'
    },
    {
      id: 'forbes',
      name: 'Forbes',
      logo: '/images/logo-medias/forbes.png',
      alt: 'Forbes Logo'
    },
    {
      id: 'gault_millau',
      name: 'Gault & Millau',
      logo: '/images/logo-medias/gault_millau.png',
      alt: 'Gault & Millau Logo'
    },
        {
          id: 'La_french_tech',
          name: 'La French Tech',
          logo: '/images/logo-medias/La_french_tech.png',
          alt: 'La French Tech Logo'
        },
    {
      id: 'lecreuset',
      name: 'Le Creuset',
      logo: '/images/logo-medias/lecreuset.jpeg',
      alt: 'Le Creuset Logo'
    },
    {
      id: 'Le_monde',
      name: 'Le Monde',
      logo: '/images/logo-medias/Le_monde.png',
      alt: 'Le Monde Logo'
    },
    {
      id: 'the_new_york_times',
      name: 'The New York Times',
      logo: '/images/logo-medias/the_new_york_times.png',
      alt: 'The New York Times Logo'
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
    <div className="bg-[#f3f4ff] pt-0 pb-0">
      <div className="max-w-6xl mx-auto px-1 md:px-2">
        {/* Version Desktop - Affichage direct en ligne */}
        <div className="hidden md:flex justify-center items-center overflow-x-auto whitespace-nowrap gap-12 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {brands.map((brand) => {
            let extraMargin = 0;
            if (brand.id === 'lecreuset' || brand.id === 'Le_monde' || brand.id === 'La_french_tech') {
              extraMargin = 24;
            }
            return (
              <div
                key={brand.id}
                className="flex items-center justify-center"
                style={{ minWidth: '220px', minHeight: '140px', maxWidth: '320px', background: 'transparent', boxShadow: 'none', border: 'none', margin: `0 ${18 + extraMargin}px`, padding: '0 !important' }}
              >
                <img
                  src={brand.logo}
                  alt={brand.alt}
                  className="object-contain max-h-80 w-auto max-w-full mx-auto"
                  style={{ maxWidth: '320px', minHeight: '160px', background: 'transparent' }}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class='text-sm md:text-base font-semibold text-gray-700 text-center'>
                          ${brand.name}
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Version Mobile - Carrousel automatique */}
        <div 
          ref={carouselRef}
          className="md:hidden relative overflow-hidden"
        >
          <div className="flex transition-transform duration-500 ease-in-out"
               style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {[...brands, ...brands.slice(0, SLIDES_PER_VIEW_MOBILE)].map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="w-full flex-shrink-0 px-2"
                style={{ width: `${100 / SLIDES_PER_VIEW_MOBILE}%` }}
              >
                <div className="flex items-center justify-center h-16"
                  style={{ background: 'transparent', boxShadow: 'none', border: 'none', borderRadius: 0, padding: '0 !important', margin: '0 6px' }}>
                  <img
                    src={brand.logo}
                    alt={brand.alt}
                    className="object-contain w-auto max-w-full mx-auto"
                    style={{
                      maxHeight: (brand.id === 'lecreuset' || brand.id === 'Le_monde' || brand.id === 'La_french_tech') ? '60px' : '110px',
                      maxWidth: (brand.id === 'lecreuset' || brand.id === 'Le_monde' || brand.id === 'La_french_tech') ? '70px' : '140px',
                      minHeight: (brand.id === 'lecreuset' || brand.id === 'Le_monde' || brand.id === 'La_french_tech') ? '30px' : '70px',
                      background: 'transparent'
                    }}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class='text-xs font-semibold text-gray-700 text-center'>
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