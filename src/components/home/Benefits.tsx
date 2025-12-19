

import React from 'react';
import { Truck, Shield, Recycle, Heart } from 'lucide-react';
import { benefits } from '../../data/mockData';

const Benefits: React.FC = () => {
  // Icônes encore plus minimalistes
  const benefitIcons = {
    '🚚': Truck,
    '⭐': Shield,
    '♻️': Recycle,
    '💝': Heart
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header ultra-minimaliste */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-light text-gray-900 tracking-wide">
            Nos avantages
          </h2>
        </div>

        {/* Benefits Grid - Style ultra-minimaliste */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefitIcons[benefit.icon as keyof typeof benefitIcons] || Shield;
            
            return (
              <div
                key={index}
                className="text-center group"
              >
                {/* Icon ultra-simple avec transition */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-gray-100 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content ultra-épuré */}
                <h3 className="text-sm font-light text-gray-900 mb-2 tracking-wide">
                  {benefit.title}
                </h3>
                
                <p className="text-xs text-gray-500 leading-relaxed max-w-32 mx-auto">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
