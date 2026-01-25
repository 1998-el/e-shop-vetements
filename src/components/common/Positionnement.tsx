import React from 'react';

interface PositionnementProps {
  title?: string;
  description?: string;
  className?: string;
}

const Positionnement: React.FC<PositionnementProps> = ({
  title = "Notre marque est la seule en France qui propose des solutions innovantes, rapides et simples aux francais qui souhaitent cuisiner maison sans perdre du temps ni de l'energie dans une ere ou chaque minute compte",
  className = "",
}) => {
  return (
    <section
      className={`py-4 px-4 sm:py-6 sm:px-12 md:py-8 md:px-24 rounded-none shadow-none w-full mx-auto my-4 sm:my-6 md:my-8 leading-relaxed md:leading-loose border border-gray-100 ${className}`}
      style={{ maxWidth: '100vw', background: '#f9fafb' }}
    >
      <h2
        className="text-xl md:text-2xl italic text-gray-900 mb-8 text-center leading-relaxed md:leading-loose border-l-4 border-gray-900 pl-4"
        style={{ fontStyle: 'italic', fontWeight: 'normal', color: '#111827' }}
      >
        “ {title}  ”
      </h2>
      {/*
        <p className="text-xs sm:text-sm md:text-base text-helloboku-links text-center mt-2 leading-relaxed md:leading-loose">
          {description}
        </p>
      */}
    </section>
  );
};

export default Positionnement;
