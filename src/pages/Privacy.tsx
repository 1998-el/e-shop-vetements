import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Shield, Lock, Eye, User, Mail, Phone, FileText, CheckCircle } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Header */}
        <div className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Politique de Confidentialité
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Votre vie privée est notre priorité. Nous collectons uniquement les informations essentielles pour traiter vos commandes.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Dernière mise à jour : 2 janvier 2026
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Introduction */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Notre Engagement</h2>
                  <p className="text-gray-700">
                    BELDOUZE s'engage à protéger votre vie privée. Nous appliquons le principe de minimisation des données : 
                    nous collectons uniquement les informations strictement nécessaires au traitement de vos commandes et au service client.
                  </p>
                </div>
              </div>
            </div>

            {/* Principe de minimisation */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Principe de minimisation des données</h2>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Nous appliquons strictement le principe de minimisation : nous ne collectons que les données 
                      strictement nécessaires pour fournir nos services.
                    </p>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Données que nous NE collectons PAS
                      </h3>
                      <ul className="text-sm text-green-800 space-y-1 ml-6">
                        <li>• Données de géolocalisation</li>
                        <li>• Données de navigation détaillées</li>
                        <li>• Informations de paiement (elles restent sur les serveurs sécurisés de nos partenaires)</li>
                        <li>• Données sensibles ou personnelles non nécessaires</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Données collectées */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Données collectées</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">2.1 Informations de commande (strictement nécessaires)</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Nom et prénom pour la livraison</li>
                        <li>Adresse email pour les confirmations de commande</li>
                        <li>Adresse de livraison (sécurisée et non divulguée)</li>
                        <li>Numéro de téléphone pour la livraison</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">2.2 Informations de paiement (externe)</h3>
                      <p className="text-gray-700 mb-2">
                        <strong>Important :</strong> Nous ne stockons AUCUNE information de paiement sur nos serveurs. 
                        Toutes les transactions sont traitées directement par nos partenaires sécurisés :
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Stripe (paiement par carte)</li>
                        <li>PayPal</li>
                        <li>Ces services sont certifiés PCI DSS et utilisent un chiffrement de niveau bancaire</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">2.3 Informations techniques minimales</h3>
                      <p className="text-gray-700 mb-2">
                        Pour assurer le bon fonctionnement du site, nous collectons uniquement :
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Adresse IP (pour la sécurité et la prévention de la fraude)</li>
                        <li>Type de navigateur (pour la compatibilité)</li>
                        <li>Cookies techniques strictement nécessaires au fonctionnement</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Utilisation des données */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center">
                    <Eye className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Utilisation de vos données</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">3.1 Traitement des commandes</h3>
                      <p className="text-gray-700">
                        Utilisation exclusive pour traiter vos commandes, confirmer les expéditions et gérer le service après-vente.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">3.2 Communication essentiel</h3>
                      <p className="text-gray-700">
                        Contact uniquement pour les questions liées à vos commandes ou demandes spécifiques. 
                        Pas de newsletter ou de prospection commerciale sans votre consentement explicite.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">3.3 Obligations légales</h3>
                      <p className="text-gray-700">
                        Respect de nos obligations comptables et fiscales (conservation 10 ans des factures).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                    <Lock className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Sécurité et protection</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">4.1 Chiffrement et sécurité</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Chiffrement SSL/TLS pour toutes les transmissions</li>
                        <li>Serveurs sécurisés avec accès restreint</li>
                        <li>Monitoring de sécurité continu</li>
                        <li>Sauvegardes chiffrées régulières</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">4.2 Protection des adresses de livraison</h3>
                      <p className="text-gray-700">
                        <strong>Engagement spécial :</strong> Vos adresses de livraison sont strictement confidentielles. 
                        Elles ne sont jamais communiquées à des tiers (sauf transporteurs pour la livraison) 
                        et ne sont utilisées que pour l'exécution de vos commandes.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">4.3 Pas de partage commercial</h3>
                      <p className="text-gray-700">
                        Nous ne vendons, n'échangeons et ne transferons jamais vos données à des fins commerciales. 
                        Aucun profilage ou tracking publicitaire n'est effectué.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Cookies et technologies</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Nous utilisons uniquement des cookies techniques strictement nécessaires au fonctionnement du site :
                </p>
                
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Panier d'achat (durée de session)</li>
                  <li>Préférences linguistiques</li>
                  <li>Sécurité et prévention de la fraude</li>
                </ul>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Aucun tracking publicitaire :</strong> Pas de cookies de mesure d'audience, 
                    de remarketing ou de publicité comportementale.
                  </p>
                </div>
              </div>
            </div>

            {/* Conservation */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Conservation des données</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Nous conservons vos données uniquement le temps nécessaire :
                </p>
                
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li><strong>Données de commande :</strong> 10 ans (obligations légales)</li>
                  <li><strong>Adresse email :</strong> Jusqu'à suppression de votre demande</li>
                  <li><strong>Données techniques :</strong> 12 mois maximum</li>
                </ul>

                <p className="text-sm text-gray-600">
                  Passé ces délais, suppression sécurisée ou anonymisation complète.
                </p>
              </div>
            </div>

            {/* Vos droits */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Vos droits (RGPD)</h2>
              
              <p className="text-gray-700 mb-4">
                Conformément au RGPD, vous disposez des droits suivants, que nous respectons strictement :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Droit d'accès</h3>
                  <p className="text-sm text-gray-600">Connaître toutes les données que nous détenons sur vous</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Droit de suppression</h3>
                  <p className="text-sm text-gray-600">Demander l'effacement de vos données (hors obligations légales)</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Droit de rectification</h3>
                  <p className="text-sm text-gray-600">Corriger des données inexactes</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Droit d'opposition</h3>
                  <p className="text-sm text-gray-600">Vous opposer au traitement (hors obligations légales)</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Exercer vos droits :</strong> Contactez-nous à{' '}
                  <a href="mailto:privacy@beldouze.com" className="text-blue-600 hover:underline">
                    privacy@beldouze.com
                  </a>. Réponse garantie sous 30 jours maximum.
                </p>
              </div>
            </div>

            {/* Modifications */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Modifications</h2>
              
              <p className="text-gray-700">
                Cette politique peut être mise à jour pour refléter l'évolution de nos services ou de la réglementation. 
                En cas de modification substantielle, vous serez informé par email.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Contact</h2>
              
              <p className="text-gray-700 mb-4">
                Pour toute question relative à vos données ou à cette politique :
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">privacy@beldouze.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">+33 759 59 97 42</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Responsable du traitement :</strong><br />
                  BELDOUZE<br />
                  France
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Des questions sur la protection de vos données ?
            </h3>
            <p className="text-gray-600 mb-6">
              Nous sommes à votre disposition pour vous expliquer nos pratiques en toute transparence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="px-6 py-3 text-white text-sm font-medium rounded transition-colors"
                style={{ backgroundColor: '#0e0e52' }}
              >
                Nous contacter
              </Link>
              <Link
                to="/terms"
                className="px-6 py-3 border text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                style={{ borderColor: '#0e0e52', color: '#0e0e52' }}
              >
                Conditions générales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;