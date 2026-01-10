import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';


const DealsSection: React.FC = () => {
  const { loading } = useProducts({ limit: 20 });
  
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
      
      if (savedEndTime) {
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





  if (loading) {
    return (
      <div className="bg-gradient-to-r from-helloboku-links to-purple-600 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="animate-pulse text-sm">Chargement...</div>
        </div>
      </div>
    );
  }

  return null;
};

export default DealsSection;
