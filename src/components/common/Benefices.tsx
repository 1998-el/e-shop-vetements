

// export default Benefices;
import React from "react";
import './benefices-animations.css';
import { useNavigate } from "react-router-dom";
import { useProducts } from '../../hooks/useProducts';

// Données des bénéfices
const benefitsData = [
  {
    id: 1,
    img: "/images/images benefices/vitesse.png",
    label: "Cuisine plus vite",
    description: "Gagne un temps fou en eliminant complètement l'épluchage",
    checked: true
  },
  {
    id: 2,
    img: "/images/images benefices/sans effort.png",
    label: "Cuisine sans efforts",
    description: "Plus besoin de force physique, la machine fait tout, simplement et rapidement.",
    checked: true
  },
  {
    id: 3,
    img: "/images/images benefices/clean.png",
    label: "Épluchage sans saleté",
    description: "Zéro déchet sur le plan de travail, tout reste propre et organisé.",
    checked: true
  },
  {
    id: 4,
    img: "/images/images benefices/couteau.png",
    label: "Pas de coupure",
    description: "Sécurité maximale, fini les risques de blessures avec les couteaux.",
    checked: true
  }
];

// Données pour les badges
const badges = ["❌ Temps perdu", "❌ Efforts", "❌ Saleté"];

interface Benefit {
  id: number;
  img: string;
  label: string;
  description: string;
  checked?: boolean;
}

interface BeneficesProps {
  benefits?: Benefit[];
  title?: string;
  subtitle?: string;
  badges?: string[];
  className?: string;
}

const Benefices: React.FC<BeneficesProps> = ({ 
  benefits = benefitsData,
  title = "Pourquoi choisir beldouze ?",
  subtitle = "Une efficacité prouvée, des milliers de clients satisfaits",
  badges: customBadges = badges,
  className = ""
}) => {
  const navigate = useNavigate();
  const { products } = useProducts({ limit: 1 });
  const mainProduct = products && products.length > 0 ? products[0] : null;
  const handleClick = () => {
    if (mainProduct) {
      navigate(`/product/${mainProduct.id}`);
    } else {
      navigate('/products');
    }
  };
  return (
    <div 
      className={`rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto overflow-hidden ${className}`}
      style={{ backgroundColor: "#12123be5" }}
    >
      {/* En-tête avec offre */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h1>
        {/* Badges */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-0">
          {customBadges.map((badge, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm"
            >
              {badge}
            </span>
          ))}
        </div>
        {/* Sous-titre */}
        <div className="text-white/80 text-base mt-4">{subtitle}</div>
      </div>

      {/* Liste des bénéfices */}
      <div className="space-y-6 max-w-3xl mx-auto mb-10">
        {benefits.map((benefit, idx) => {
          const slideClass = idx % 2 === 0 ? 'animate-benefit-slide-in-left' : 'animate-benefit-slide-in-right';
          const delayClass = `animate-delay-${idx}`;
          return (
            <div
              key={benefit.id}
              className={`flex flex-col sm:flex-row items-start gap-4 p-5 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white hover:bg-white/15 transition-all duration-300 relative overflow-hidden opacity-0 ${slideClass} ${delayClass}`}
            >
            {/* Case à cocher et icône alignés horizontalement sur mobile */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 flex items-center justify-center rounded-xl border border-white bg-white/10 shadow-md">
                  <img
                    src={benefit.img}
                    alt={benefit.label}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              
              {/* Titre visible sur mobile seulement */}
              <div className="sm:hidden">
                <h3 className="text-lg font-bold text-white">
                  {benefit.label}
                </h3>
              </div>
            </div>

            {/* Texte descriptif */}
            <div className="flex-1 sm:pl-2">
              {/* Titre caché sur mobile, visible sur desktop */}
              <h3 className="hidden sm:block text-xl font-bold text-white mb-2">
                {benefit.label}
              </h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
           );})}
      </div>

      {/* Section validation */}
      <div className="mt-10 pt-8 border-t border-white/20">
        <div className="text-center">
          <div className="flex flex-col items-center justify-center mb-6">
            <span className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white bg-white/10 mb-4 shadow-lg">
              <img src="/images/logos/ce.svg" alt="CE" className="w-8 h-8 md:w-10 md:h-10" style={{ verticalAlign: 'middle' }} />
            </span>
            <p className="text-white text-xl md:text-2xl font-semibold text-center leading-snug max-w-xl mx-auto">
              Validé par des tests de conformités <br className="hidden md:block" />& les utilisateurs
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="flex items-center" style={{gap: 0}}>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center" style={{ position: 'relative', top: '2px', marginLeft: '4px' }}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{marginRight: 0}}>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div><span style={{marginLeft: '8px'}}>Des résultats prouvés par des études</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div style={{marginLeft: 0}} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <span>+15,000 utilisateurs satisfaits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton d'action */}
      <div className="mt-10 text-center">
        <button
          className="bg-white text-[#0e0e52] font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          onClick={handleClick}
        >
      Je cuisine sans effort &ensp; -20€
        </button>
        <p className="text-white/60 text-sm mt-3">
          Livraison gratuite • 30 jours satisfait ou remboursées
        </p>
      </div>
    </div>
  );
};


export default Benefices;
// Note: Si tu veux utiliser le composant seul, exporte seulement Benefices
// export { Benefices };