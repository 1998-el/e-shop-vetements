

import React, { useState, useEffect } from 'react';

const DealsSection: React.FC = () => {
  
  // Countdown timer with persistence
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 0,
    seconds: 0
  });
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    // Check if there's a saved timer state
    const savedEndTime = localStorage.getItem('dealsTimerEndTime');
    const savedIsActive = localStorage.getItem('dealsTimerActive');
    
    if (savedEndTime) {
      const endTime = parseInt(savedEndTime);
      const now = Date.now();
      
      if (now < endTime) {
        // Timer is still active, calculate remaining time
        const remainingTime = endTime - now;
        const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        
        setTimeLeft({
          hours: remainingHours,
          minutes: remainingMinutes,
          seconds: remainingSeconds
        });
        setIsTimerActive(true);
      } else {
        // Timer has expired
        localStorage.removeItem('dealsTimerEndTime');
        localStorage.removeItem('dealsTimerActive');
        setIsTimerActive(false);
      }
    } else {
      // First time visiting, start new timer for 4 hours
      const newEndTime = Date.now() + (4 * 60 * 60 * 1000); // 4 hours from now
      localStorage.setItem('dealsTimerEndTime', newEndTime.toString());
      localStorage.setItem('dealsTimerActive', 'true');
      setIsTimerActive(true);
    }
  }, []);

  useEffect(() => {
    if (!isTimerActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          const newTime = { ...prev, seconds: prev.seconds - 1 };
          return newTime;
        } else if (prev.minutes > 0) {
          const newTime = { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
          return newTime;
        } else if (prev.hours > 0) {
          const newTime = { hours: prev.hours - 1, minutes: 59, seconds: 59 };
          return newTime;
        } else {
          // Timer finished
          localStorage.removeItem('dealsTimerEndTime');
          localStorage.removeItem('dealsTimerActive');
          setIsTimerActive(false);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive]);

  // Handle page visibility change for better persistence
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, timer will pause naturally
        return;
      }
      
      // Page is visible again, check if timer state is still valid
      const savedEndTime = localStorage.getItem('dealsTimerEndTime');
      const savedIsActive = localStorage.getItem('dealsTimerActive');
      
      if (savedEndTime && savedIsActive === 'true') {
        const endTime = parseInt(savedEndTime);
        const now = Date.now();
        
        if (now >= endTime) {
          // Timer has expired while page was hidden
          localStorage.removeItem('dealsTimerEndTime');
          localStorage.removeItem('dealsTimerActive');
          setIsTimerActive(false);
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);


  return (
    <section className="bg-[#0e0e52] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Timer Only */}
        <div className="text-center">
          <div className="bg-white/10 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-white text-sm font-medium">Se termine dans :</span>
            </div>
            
            <div className="flex justify-center gap-4">
              {[
                { value: timeLeft.hours, label: 'H' },
                { value: timeLeft.minutes, label: 'M' },
                { value: timeLeft.seconds, label: 'S' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white text-black px-4 py-2 rounded font-bold text-xl min-w-[3rem]">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-white/80 text-xs mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;

