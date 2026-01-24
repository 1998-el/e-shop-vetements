import React from 'react';
import { Star } from 'lucide-react';
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
  // Calculate average rating
  // const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

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
                            <span className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="w-5 h-5 text-yellow-500 fill-yellow-500"
                                />
                              ))}
                              <span className="ml-2 text-lg font-bold text-gray-900">
                                4.8 sur 5
                              </span>
                            </span>
                </div>
                <span className="text-gray-600">
                  +1200 avis
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-gray-900 font-bold">92.3%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 font-bold">100%</div>
                <div className="text-gray-600">Qualité</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bloc d'avis : 2 avis par ligne */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-md p-0 transition-colors flex flex-col justify-between"
              style={{ borderColor: '#bfc2d6', borderWidth: '1.5px', borderStyle: 'solid', minHeight: '220px', position: 'relative' }}
            >
              {/* Moitié supérieure : image verticale */}
              <div className="flex items-start justify-center bg-gray-100" style={{ height: '50%', overflow: 'hidden' }}>
                {review.userAvatar ? (
                  <img src={review.userAvatar} alt={review.userName} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', backgroundColor: '#f3f4f6' }} onError={e => { e.currentTarget.src = '/images/image_review/review1.png'; }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-gray-700">
                    {review.userName.charAt(0)}
                  </div>
                )}
              </div>
              {/* Sous l'image : nom, étoiles, avis vérifiés */}
              <div className="flex flex-col px-3 pt-3 pb-1 bg-white">
                <span className="flex items-center font-semibold text-gray-900 truncate mb-1" style={{ maxWidth: '100%' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: 'transparent', marginRight: 6 }}>
                    <img src="/images/logos/Check.png" alt="check" style={{ width: 20, height: 20, objectFit: 'contain', display: 'block' }} />
                  </span>
                  {review.userName}
                </span>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
              {/* Avis texte */}
              <div className="px-3 py-1 flex-1 flex flex-col justify-between bg-white">
                {review.badge && (
                  <span
                    className="inline-block bg-blue-100 text-blue-800 font-bold mb-2"
                    style={{
                      padding: '6px',
                      margin: '2px 0 8px 0', // top, right, bottom, left
                      marginLeft: '2px',
                      width: 'fit-content',
                      fontSize: '11px',
                      whiteSpace: 'nowrap',
                      borderRadius: '999px',
                      textAlign: 'center',
                      height: '25px',
                      lineHeight: '1.1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      top: '-6px',
                    }}
                  >
                    {review.badge}
                  </span>
                )}
                <p className="text-gray-700 text-sm leading-relaxed mb-1">
                  {review.comment}
                </p>
                <div className="mt-auto text-xs text-gray-500 font-medium pt-2">
                  {getRelativeTime(review.date)}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ReviewCarousel;