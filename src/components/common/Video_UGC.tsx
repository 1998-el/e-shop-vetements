
import React, { useRef, useState } from 'react';

interface VideoUGCProps {
  videos?: { src: string; poster?: string; alt?: string }[];
  className?: string;
}

const DEFAULT_VIDEOS = [
  { src: '/videos/video_ugc/video-ugc (1).mp4', alt: 'Video 1' },
  { src: '/videos/video_ugc/video-ugc (2).mp4', alt: 'Video 2' },
  { src: '/videos/video_ugc/video-ugc (3).mp4', alt: 'Video 3' },
];

const ITEM_WIDTH = 340;

const Video_UGC: React.FC<VideoUGCProps> = ({ videos = DEFAULT_VIDEOS, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Infinite array for illusion
  const infiniteVideos = [...videos, ...videos, ...videos];

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
          Découvrez les avis authentiques de nos clients en vidéo !
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
            return (
              <div
                key={index}
                style={{ minWidth: ITEM_WIDTH, maxWidth: ITEM_WIDTH, scrollSnapAlign: 'center' }}
                className="flex-shrink-0 rounded-lg overflow-hidden shadow-lg border border-gray-100"
              >
                <video
                  src={v.src}
                  {...(v.poster ? { poster: v.poster } : {})}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-[440px] object-cover"
                />
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
 