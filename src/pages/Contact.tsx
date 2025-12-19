import React from 'react';
import Layout from '../components/layout/Layout';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [

    {
      icon: Mail,
      title: 'Email',
      details: 'contact@beldouze.com',
      description: 'Réponse sous 24h'
    },

    {
      icon: Phone,
      title: 'Téléphone',
      details: '+33 759 59 97 42',
      description: 'Lun-Ven 9h-18h'
    },


    {
      icon: MapPin,
      title: 'Adresse',
      details: '7 Chemin de Beldou, 31790 Saint-Jory, France',
      description: 'France'
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: 'Lun-Ven: 9h-18h',
      description: 'Sam: 10h-16h'
    }
  ];

  const faqItems = [
    {
      question: 'Comment puis-je suivre ma commande ?',
      answer: 'Vous recevrez un email de confirmation avec un numéro de suivi. Vous pouvez également vous connecter à votre compte pour voir le statut de vos commandes.'
    },
    {
      question: 'Quels sont les délais de livraison ?',
      answer: 'Nous livrons généralement sous 2-3 jours ouvrés en France métropolitaine. La livraison express est disponible sous 24h.'
    },
    {
      question: 'Puis-je retourner un article ?',
      answer: 'Oui, vous avez 30 jours pour retourner un article non utilisé dans son emballage d\'origine. Les frais de retour sont à notre charge.'
    },
    {
      question: 'Comment contacter le service client ?',

      answer: 'Vous pouvez nous contacter par email à contact@beldouze.com ou par téléphone au +33 759 59 97 42 du lundi au vendredi de 9h à 18h.'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Header */}
        <div className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Contactez-nous
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos achats.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="py-12 border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-sm font-medium text-gray-900 mb-1">{info.details}</p>
                  <p className="text-xs text-gray-600">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-start gap-2">
                    <MessageCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    {item.question}
                  </h3>
                  <p className="text-sm text-gray-600 pl-7">{item.answer}</p>
                </div>
              ))}
            </div>

            {/* Additional Contact Methods */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">Autres moyens de nous contacter</h3>
              <div className="space-y-3 text-sm">

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">support@beldouze.com (support technique)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">+33 759 59 97 42 (service commercial)</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">Chat en ligne (9h-18h)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Section */}
        {/* <div className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Notre localisation
            </h2>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">123 Rue des Jouets</p>
                <p className="text-sm">75001 Paris, France</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default Contact;