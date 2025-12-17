import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';

const DealsSection: React.FC = () => {
  const { loading } = useProducts({ limit: 20 });
  // const { products } = useProducts({ limit: 20 }); // products is not currently used
  
  // Countdown timer for deals
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-red-600 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="animate-pulse text-sm">Chargement des offres...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-600">
      <div className="max-w-7xl mx-auto px-3 py-8">
        {/* Section Header - Mobile Optimized */}
        <div className="text-center mb-6 lg:mb-10">
          <div className="flex items-center justify-center gap-2 mb-3 lg:mb-4">
            <Zap className="w-5 h-5 lg:w-7 lg:h-7 text-yellow-300" />
            <h2 className="text-xl lg:text-3xl font-bold text-white">
              Offres Flash
            </h2>
          </div>
          <p className="text-red-100 text-sm lg:text-lg mb-4">
            Jusqu'à -70% • Temps limité
          </p>
          
          {/* Countdown Timer - Responsive */}
          <div className="bg-red-700 rounded-lg px-4 py-3 mb-4 lg:bg-transparent lg:p-0 lg:mb-6">
            <div className="flex items-center justify-center gap-2 mb-2 lg:mb-4">
              <Clock className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-300" />
              <span className="text-white text-sm lg:text-xl font-medium">Se termine dans :</span>
            </div>
            
            {/* Mobile Timer */}
            <div className="lg:hidden flex justify-center gap-1">
              {[
                { value: timeLeft.hours, label: 'H' },
                { value: timeLeft.minutes, label: 'M' },
                { value: timeLeft.seconds, label: 'S' }
              ].map((item, index) => (
                <div key={index} className="text-center mx-0.5">
                  <div className="bg-white text-red-600 px-2 py-1.5 rounded font-bold text-base min-w-[2.2rem]">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-red-200 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
            
            {/* Desktop Timer - Larger */}
            <div className="hidden lg:flex items-center justify-center gap-3">
              {[
                { value: timeLeft.hours, label: 'Heures' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Secondes' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white text-red-600 px-6 py-4 rounded-lg font-bold text-3xl min-w-[5rem] shadow-lg">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-lg text-white font-medium mt-2">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid - Responsive */}
        
      </div>
    </div>
  );
};

export default DealsSection;