
import React, { useRef, useState } from 'react';

interface VideoUGCProps {
  videos?: { src: string; poster?: string; alt?: string }[];
  className?: string;
}

const DEFAULT_VIDEOS = [
  { src: '/videos/video_ugc/video-ugc (1).mp4', alt: 'Video 1' },
  { src: '/videos/video_ugc/video-ugc (2).mp4', alt: 'Video 2' },
  { src: '/videos/video_ugc/video-ugc (3).mp4', alt: 'Video 3' },
  { src: '/videos/video_ugc/video-ugc (4).mp4', alt: 'Video 4' },
];

const ITEM_WIDTH = 310;

const Video_UGC: React.FC<VideoUGCProps> = ({ videos = DEFAULT_VIDEOS, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);


  // Infinite array for illusion
  const infiniteVideos = [...videos, ...videos, ...videos];

  // Volume state for each video (only one active at a time)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Toggle mute on click, only one video can have sound
  const handleVideoClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(scrollRef.current ? scrollRef.current.scrollLeft : 0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const walk = (e.pageX - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const stopDrag = () => setIsDragging(false);

  return (
    <div className={`relative ${className || ''}`}>
      <div className="max-w-4xl mx-auto mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-center text-helloboku-headings mb-6">
          Une satisfaction à travers le Monde !
        </h2>
      </div>
      <div className="relative mx-auto max-w-4xl">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory', cursor: isDragging ? 'grabbing' : 'grab', scrollbarWidth: 'none' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {infiniteVideos.map((video, index) => {
            const v = video as { src: string; poster?: string; alt?: string };
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                style={{ minWidth: ITEM_WIDTH, maxWidth: ITEM_WIDTH, scrollSnapAlign: 'center' }}
                className="flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative group"
              >
                <video
                  src={v.src}
                  {...(v.poster ? { poster: v.poster } : {})}
                  muted={!isActive}
                  loop
                  playsInline
                  autoPlay
                  className="w-[95%] h-[440px] object-cover cursor-pointer mx-auto"
                  onClick={() => handleVideoClick(index)}
                />
                <button
                  type="button"
                  onClick={() => handleVideoClick(index)}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-4 text-2xl opacity-90 group-hover:opacity-100 transition"
                  style={{ zIndex: 2 }}
                >
                  {isActive ? '🔊' : '🔇'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default Video_UGC;
 