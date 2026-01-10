import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Package, Users, Award, Shield, Star, Target, Clock } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { number: '10K+', label: 'Produits vendus', icon: Package },
    { number: '5K+', label: 'Clients', icon: Users },
    { number: '50+', label: 'Marques', icon: Award },
    { number: '98%', label: 'Satisfaction', icon: Star }
  ];

  const values = [
    {
      icon: Target,
      title: 'Notre mission',
      description: 'Simplifier la vie en cuisine avec des accessoires innovants qui transforment les corvées en moments de plaisir.'
    },
    {
      icon: Shield,
      title: 'Sécurité',
      description: 'Tous nos produits respectent strictement les normes européennes de sécurité alimentaire et sont testés avant commercialisation.'
    },
    {
      icon: Award,
      title: 'Qualité',
      description: 'Nous sélectionnons rigoureusement chaque produit pour assurer durabilité et excellence en cuisine.'
    },
    {
      icon: Clock,
      title: 'Service',
      description: 'Notre équipe est disponible pour vous accompagner dans chaque étape de votre achat culinaire.'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Création', description: 'Lancement de beldouze avec une sélection de 50 accessoires de cuisine' },
    { year: '2021', title: 'Expansion', description: 'Ouverture à 10 nouvelles marques partenaires spécialisées cuisine' },
    { year: '2022', title: 'Croissance', description: 'Plus de 5 000 clients satisfaits de nos solutions culinaires' },
    { year: '2023', title: 'Innovation', description: 'Lancement de notre plateforme e-commerce complète' },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Header */}
        <div className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                À propos de beldouze
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Depuis 2020, nous révolutionnons la cuisine avec des accessoires innovants qui simplifient la préparation et transforment chaque repas en plaisir.
              </p>
            </div>
          </div>
        </div>

        {/* Stats - Simple grid */}
        <div className="py-12 border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="py-12 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Notre histoire
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  beldouze a été fondé en 2020 avec une mission simple : offrir aux cuisiniers un accès facile à des accessoires de cuisine de qualité,
                  innovants et qui simplifient vraiment la préparation des repas.
                </p>
                <p>
                  En observant le manque d'innovation et de qualité sur le marché des ustensiles, nous avons décidé de créer une plateforme 
                  qui mettrait l'accent sur la praticité, la durabilité et l'aspect révolutionnaire des accessoires de cuisine.
                </p>
                <p>
                  Aujourd'hui, nous collaborons avec plus de 50 marques réputées et avons aidé des milliers de familles 
                  à découvrir des solutions culinaires qui transforment leur quotidien en cuisine.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="py-12 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Nos engagements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="border border-gray-200 rounded p-6 hover:border-gray-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <value.icon className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="py-12 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Notre parcours
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative mb-8 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'}`}>
                  <div className="absolute top-4 left-0 md:left-auto md:right-0 w-3 h-3 bg-gray-900 rounded-full border-4 border-white"></div>
                  <div className={`pl-6 md:pl-0 ${index % 2 === 0 ? 'md:pr-6' : ''}`}>
                    <div className="text-sm font-medium text-gray-900">{milestone.year}</div>
                    <h3 className="font-medium text-gray-900 mb-1">{milestone.title}</h3>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Pourquoi choisir beldouze ?
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                </div>
                <p>Sélection rigoureuse d'accessoires de cuisine répondant aux normes de sécurité alimentaire les plus strictes</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                </div>
                <p>Partenariats exclusifs avec les meilleures marques d'accessoires de cuisine</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                </div>
                <p>Service client dédié pour vous accompagner dans vos choix culinaires</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                </div>
                <p>Livraison rapide et soignée dans toute la France</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-12 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Prêt à révolutionner votre cuisine ?
            </h3>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/products"
                className="px-6 py-3 text-white text-sm font-medium rounded transition-colors"
                style={{ backgroundColor: '#0e0e52' }}
              >
                Voir nos produits
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                style={{ borderColor: '#0e0e52', color: '#0e0e52' }}
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;