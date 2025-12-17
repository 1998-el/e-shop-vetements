import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { videos } from '../../data/mockData';

const VideoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToVideo = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-white text-3xl font-bold mb-8 font-fredoka">
          Featured Product Videos
        </h2>

        <div className="relative">
          {/* Main Video Display */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
            <video
              key={currentIndex} // Force re-render when index changes
              className="w-full h-full object-cover"
              poster={videos[currentIndex].thumbnail}
              autoPlay={isPlaying}
              muted
              loop
              onError={(e) => {
                // Fallback for missing videos
                const target = e.target as HTMLVideoElement;
                target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'w-full h-full bg-gray-800 flex items-center justify-center text-white';
                fallback.innerHTML = '<p>Video unavailable</p>';
                target.parentNode?.appendChild(fallback);
              }}
            >
              <source src={videos[currentIndex].url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause Overlay */}
            <button
              onClick={togglePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="text-white w-16 h-16" />
              ) : (
                <Play className="text-white w-16 h-16" />
              )}
            </button>
          </div>

          {/* Video Thumbnails */}
          <div className="flex justify-center space-x-4">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => goToVideo(index)}
                className={`relative w-20 h-12 rounded overflow-hidden transition-all duration-300 ${
                  index === currentIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-80'
                }`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-video.jpg';
                  }}
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Play className="text-white w-4 h-4" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Video Title */}
          <div className="text-center mt-4">
            <h3 className="text-white text-lg font-semibold">
              {videos[currentIndex].title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;