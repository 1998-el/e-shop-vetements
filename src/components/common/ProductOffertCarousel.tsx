import React from "react";

interface ProductOffertCarouselProps {
  images?: string[];
  title?: string;
}

const defaultImages = [
  "/images/photo_produits_offerts/produit offerts (1).jpeg",
  "/images/photo_produits_offerts/produit offerts (2).jpeg",
  "/images/photo_produits_offerts/produit offerts (3).jpeg",
  "/images/photo_produits_offerts/produit offerts (4).jpeg",
  "/images/photo_produits_offerts/produit offerts (5).jpeg",
  "/images/photo_produits_offerts/produit offerts (6).jpeg"
];

const ProductOffertCarousel: React.FC<ProductOffertCarouselProps> = ({
  images = defaultImages,
  title = "Les produits que nous offrons"
}) => {
  const [current, setCurrent] = React.useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  // Gestion du swipe tactile
  const touchStartX = React.useRef<number | null>(null);
  const touchEndX = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 40) next();
      else if (diff < -40) prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h2 className="text-lg font-bold text-center mb-6 text-[#0e0e52]">{title}</h2>
      <div className="relative flex items-center justify-center w-full">
        <button
          onClick={prev}
          className="absolute left-2 z-10 bg-white/80 hover:bg-white text-[#0e0e52] rounded-full p-2 shadow-md transition-colors"
          aria-label="Précédent"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div
          className="w-[80vw] max-w-xl mx-auto flex items-center justify-center h-[420px] sm:h-[520px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full h-full rounded-2xl shadow-2xl shadow-[#0e0e52]/20 bg-gradient-to-br from-white via-gray-50 to-gray-200 flex items-center justify-center transition-all duration-500">
            <img
              src={images[current]}
              alt={`Produit offert ${current + 1}`}
              className="object-fill w-full h-full rounded-xl transition-all duration-500"
              style={{ borderRadius: '1rem' }}
            />
          </div>
        </div>
        <button
          onClick={next}
          className="absolute right-2 z-10 bg-white/80 hover:bg-white text-[#0e0e52] rounded-full p-2 shadow-md transition-colors"
          aria-label="Suivant"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
};

export default ProductOffertCarousel;
