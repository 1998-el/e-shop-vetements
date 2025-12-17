import React, { useEffect, useState } from 'react';
import { brands } from '../../data/mockData';

const LogoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
    }, 3000); // Change logo every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-gray-600 mb-6">Trusted by Leading Brands</h3>
        <div className="flex justify-center items-center space-x-8 overflow-hidden">
          {brands.map((brand, index) => (
            <div
              key={brand.id}
              className={`flex-shrink-0 transition-all duration-500 ${
                index === currentIndex ? 'scale-110 opacity-100' : 'scale-90 opacity-60'
              }`}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  // Fallback for missing images
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;