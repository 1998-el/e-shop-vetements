import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { reviews } from '../../data/mockData';

const getRelativeTime = (dateString: string) => {
  const now = new Date();
  const reviewDate = new Date(dateString);
  const diffInHours = Math.floor((now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 24) return 'Aujourd\'hui';
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} sem`;
  return `Il y a ${Math.floor(diffInDays / 30)} mois`;
};

const ReviewCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleReviews(1);
      } else if (window.innerWidth < 1024) {
        setVisibleReviews(2);
      } else {
        setVisibleReviews(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % Math.ceil(reviews.length / visibleReviews)
    );
  }, [visibleReviews]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.ceil(reviews.length / visibleReviews) - 1
        : prevIndex - 1
    );
  }, [visibleReviews]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const startIndex = currentIndex * visibleReviews;
  const displayedReviews = reviews.slice(startIndex, startIndex + visibleReviews);

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Amazon Style */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Quelques avis certifies 
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.floor(averageRating) 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-lg font-bold text-gray-900">
                    {averageRating.toFixed(1)} sur 5
                  </span>
                </div>
                <span className="text-gray-600">
                  {reviews.length} avis
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-gray-900 font-bold">92.3%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 font-bold">4.8/5</div>
                <div className="text-gray-600">Qualité</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedReviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-md p-6 transition-colors" style={{ borderColor: '#3c3c7a', borderWidth: '2px', borderStyle: 'solid' }}
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-base font-medium text-gray-700 overflow-hidden">
                      {review.userAvatar ? (
                        <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover rounded-full" />
                      ) : (
                        review.userName.charAt(0)
                      )}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900">{review.userName}</h4>
                      <div className="text-sm text-gray-500">
                        {getRelativeTime(review.date)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Content */}
                <div>
                  {review.badge && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mb-3">
                      {review.badge}
                    </span>
                  )}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation - Alibaba Style */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={prevSlide}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            
            {/* Small Circular Indicators */}
            {/* <div className="flex items-center gap-2 mx-4">
              {Array.from({ length: Math.ceil(reviews.length / visibleReviews) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentIndex 
                      ? 'bg-gray-900' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div> */}
            
            <button
              onClick={nextSlide}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReviewCarousel;