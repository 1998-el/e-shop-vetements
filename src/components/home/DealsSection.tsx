import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';


const DealsSection: React.FC = () => {
  const { loading } = useProducts({ limit: 20 });
  // Countdown timer with persistence
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Initialize timer on mount
  useEffect(() => {
    const savedEndTime = localStorage.getItem('dealsTimerEndTime');
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
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    } else {
      // First time visiting, start new timer for 4 hours
      const newEndTime = Date.now() + (4 * 60 * 60 * 1000); // 4 hours from now
      localStorage.setItem('dealsTimerEndTime', newEndTime.toString());
      localStorage.setItem('dealsTimerActive', 'true');
      setIsTimerActive(true);
      setTimeLeft({ hours: 4, minutes: 0, seconds: 0 });
    }
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (!isTimerActive) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Timer finished
          localStorage.removeItem('dealsTimerEndTime');
          localStorage.removeItem('dealsTimerActive');
          setIsTimerActive(false);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerActive]);

  // Handle page visibility change for better persistence
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) return;
      const savedEndTime = localStorage.getItem('dealsTimerEndTime');
      if (savedEndTime) {
        const endTime = parseInt(savedEndTime);
        const now = Date.now();
        if (now >= endTime) {
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
  // (All duplicate/extra timer logic removed; only the first set of useEffects remains)





  if (loading) {
    return (
      <div className="bg-gradient-to-r from-helloboku-links to-purple-600 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="animate-pulse text-sm">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-helloboku-links to-purple-600 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Offres du jour</h2>
        {isTimerActive ? (
          <div className="text-lg font-mono mb-4">
            Fin de l'offre dans&nbsp;
            {`${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`}
          </div>
        ) : (
          <div className="text-lg font-mono mb-4">Offre terminée</div>
        )}
        {/* ... ici tu peux ajouter la liste des produits en promo ... */}
      </div>
    </div>
  );
};

export default DealsSection;
