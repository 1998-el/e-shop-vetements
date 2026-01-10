import React from 'react';

interface PositionnementProps {
  title?: string;
  description?: string;
  className?: string;
}

const Positionnement: React.FC<PositionnementProps> = ({
  title = "Notre marque est la seule en France qui propose des solutions innovantes, rapides et simples aux francais qui souhaitent cuisiner maison sans perdre du temps ni de l'energie dans une ere ou nous somme de moins en moins libre",
  description = "Découvrez pourquoi notre marque se distingue sur le marché grâce à notre engagement, notre innovation et la satisfaction de nos clients.",
  className = "",
}) => {
  return (
    <section className={`bg-white py-12 px-6 rounded-xl shadow-md max-w-4xl mx-auto my-10 leading-relaxed md:leading-loose ${className}`}>
      <h2 className="text-xl md:text-2xl font-bold text-helloboku-links mb-6 text-center leading-relaxed md:leading-loose">
        {title}
      </h2>
      {/* <p className="text-sm md:text-base text-helloboku-links text-center mt-2 leading-relaxed md:leading-loose">
        {description}
      </p> */}
    </section>
  );
};

export default Positionnement;
