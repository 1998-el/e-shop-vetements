import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { ChevronDown, ChevronUp, Truck, Shield, CreditCard, RefreshCw, Phone } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      category: 'Commandes',
      icon: CreditCard,
      questions: [
        {
          question: 'Comment passer une commande ?',
          answer: 'Ajoutez les produits à votre panier, puis cliquez sur "Procéder au paiement". Suivez les étapes pour saisir vos informations de livraison et de paiement. Votre commande sera confirmée par email.'
        },
        {
          question: 'Puis-je modifier ma commande ?',

          answer: 'Vous pouvez modifier votre commande dans les 30 minutes suivant la validation en nous contactant au +33 759 59 97 42.'
        },
        {
          question: 'Moyens de paiement acceptés ?',
          answer: 'Cartes bancaires (Visa, Mastercard), PayPal, Stripe. Tous les paiements sont sécurisés.'
        }
      ]
    },
    {
      category: 'Livraison',
      icon: Truck,
      questions: [
        {
          question: 'Délais de livraison ?',
          answer: 'Livraison standard : 3-5 jours ouvrés en France métropolitaine. Expédition sous 24h pour les articles en stock.'
        },
        {
          question: 'Frais de livraison ?',
          answer: 'Livraison gratuite dès 50€ d\'achat. 5,99€ pour les commandes inférieures à 50€ en France.'
        },
        {
          question: 'Suivi de commande ?',
          answer: 'Vous recevez un email avec un numéro de suivi dès l\'expédition. Suivez votre commande depuis votre compte client.'
        }
      ]
    },
    {
      category: 'Retours',
      icon: RefreshCw,
      questions: [
        {
          question: 'Politique de retour ?',
          answer: '14 jours pour retourner un article. Produits doivent être dans leur état d\'origine, non utilisés, avec emballage intact.'
        },
        {
          question: 'Quand serai-je remboursé ?',
          answer: 'Remboursement dans les 3-5 jours ouvrés suivant la réception et validation de votre retour.'
        }
      ]
    },
    {
      category: 'Sécurité',
      icon: Shield,
      questions: [
        {
          question: 'Vos accessoires de cuisine sont-ils sûrs ?',
          answer: 'Tous nos accessoires respectent les normes européennes de sécurité alimentaire et sont testés pour la qualité. Marques certifiées uniquement.'
        }
      ]
    },
    {
      category: 'Contact',
      icon: Phone,
      questions: [
        {
          question: 'Comment vous contacter ?',

          answer: 'Service client : Lundi-vendredi 9h-12h30 / 13h30-17h au +33 759 59 97 42. Email : contact@beldouze.com'
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                FAQ - Questions fréquentes
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Réponses aux questions les plus courantes sur nos produits, commandes et services.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {faqData.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <category.icon className="w-4 h-4 text-gray-700" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {category.category}
                    </h2>
                  </div>

                  <div className="space-y-3 mb-8">
                    {category.questions.map((item, itemIndex) => {
                      const globalIndex = categoryIndex * 100 + itemIndex;
                      const isOpen = openItems.has(globalIndex);

                      return (
                        <div key={itemIndex} className="border border-gray-200 rounded">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex justify-between items-center"
                          >
                            <span className="font-medium text-gray-900 text-sm">
                              {item.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            )}
                          </button>

                          {isOpen && (
                            <div className="px-4 pb-3 border-t border-gray-100 pt-3">
                              <p className="text-gray-700 text-sm">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 border-t border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-gray-200 rounded p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Besoin d'aide supplémentaire ?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Téléphone</div>

                    <div className="text-gray-600 text-sm">+33 759 59 97 42</div>
                    <div className="text-gray-500 text-xs mt-1">Lundi-vendredi 9h-12h30 / 13h30-17h</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">Email</div>

                    <div className="text-gray-600 text-sm">contact@beldouze.com</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Livraison gratuite dès 50€</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Retour gratuit sous 14 jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;