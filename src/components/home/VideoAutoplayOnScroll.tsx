import React, { useRef, useEffect, useState } from 'react';

// Interface pour les props du composant vidéo
interface VideoAutoplayOnScrollProps {
  videoSrc: string;
  posterSrc?: string;
  title?: string;
  description?: string;
  className?: string;
  threshold?: number; // Pourcentage de visibilité pour déclencher (0-1)
}

const VideoAutoplayOnScroll: React.FC<VideoAutoplayOnScrollProps> = ({
  videoSrc,
  posterSrc,
  title = "L'épluchage ne doit plus être une souffrance",
  description = "Simplifiez la cuisine avec notre éplucheur et préparez vos légumes en un instant et sans fatigue.",
  className = "",
  threshold = 0.7 // 70% de visibilité
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Vidéo muette par défaut

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting && !hasPlayed) {
          setIsVisible(true);
          if (videoRef.current) {
            // Délai léger pour s'assurer que la vidéo est prête
            setTimeout(() => {
              videoRef.current?.play().catch(() => {
                // Fallback: ajouter un bouton de lecture manuelle
              });
            }, 300);
            setHasPlayed(true);
          }
        } else if (!entry.isIntersecting && videoRef.current) {
          // Optionnel: pause quand hors de vue
          // videoRef.current.pause();
        }
      },
          {               // Fallback: ajouter un bouton de lecture manuelle
        threshold: threshold,
        rootMargin: '50px', // Détecter un peu avant d'arriver à l'élément
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold, hasPlayed]);

  // Gestion du son
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
      data-video-visible={isVisible}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteneur vidéo */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            muted={isMuted}
            playsInline
            loop
            preload="metadata"
            className="w-full h-auto max-h-[400px] md:max-h-[480px] object-cover"
            aria-label="Vidéo de démonstration du produit"
          >
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>

          {/* Overlay pour meilleure lisibilité du texte + texte centré */}
          <div className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none pl-6 md:pl-12">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {title && (
              <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-white mb-6 text-left px-0 drop-shadow-lg">
                {title}
              </h2>
            )}
            {description && (
              <p className="relative z-10 text-white text-xl md:text-2xl text-left px-0 drop-shadow-lg">
                {description}
              </p>
            )}
          </div>

          {/* Contrôles personnalisés */}
          <div className="absolute bottom-4 right-4 flex items-center space-x-2 z-20">
            {/* Bouton son */}
            <button
              onClick={toggleMute}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label={isMuted ? "Activer le son" : "Désactiver le son"}
            >
              {isMuted ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>

            {/* Indicateur de lecture automatique */}
            <div className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm hidden md:block">
              {isVisible ? "Lecture en cours" : "Lecture automatique au scroll"}
            </div>
          </div>

          {/* Indicateur de chargement */}
          {!hasPlayed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-30">
              <div className="text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-sm">Préparation de la vidéo...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoAutoplayOnScroll;