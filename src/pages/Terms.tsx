import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { FileText, ShoppingCart, Shield, AlertCircle, CreditCard, Truck } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Header */}
        <div className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Conditions Générales de Vente
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Les présentes conditions régissent l'utilisation de notre site web et l'achat de nos produits. 
                Veuillez les lire attentivement avant de passer commande.
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
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Introduction</h2>
                  <p className="text-gray-700">
                    Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les commandes passées 
                    sur le site web beldouze.com operated by BELDOUZE. En passant commande, vous acceptez ces conditions.
                  </p>
                </div>
              </div>
            </div>

            {/* Informations légales */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Informations légales</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">BELDOUZE</h3>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>Forme juridique : [À compléter]</p>
                        <p>Capital social : [À compléter]</p>
                        <p>SIRET : [À compléter]</p>
                        <p>TVA intracommunautaire : [À compléter]</p>
                        <p>Adresse : [À compléter]</p>
                        <p>Email : contact@beldouze.com</p>
                        <p>Téléphone : +33 759 59 97 42</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Objet et périmètre */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Objet et périmètre</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Les présentes CGV ont pour objet de définir les conditions dans lesquelles BELDOUZE fournit 
                  aux acheteurs ses produits d'accessoires de cuisine et services associés via son site web.
                </p>
                
                <p className="text-gray-700">
                  Nos produits sont destinés à un usage domestique et culinaire. Les conditions s'appliquent 
                  à tous les achats effectués sur notre site, quels que soient le mode de paiement et la zone géographique.
                </p>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Important :</strong> Ces conditions priment sur toutes conditions contraires mentionnées 
                    par l'acheteur. Aucune condition particulière ne peut, sauf accord écrit de notre part, 
                    prévaloir sur ces CGV.
                  </p>
                </div>
              </div>
            </div>

            {/* Produits */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Produits et services</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">3.1 Description des produits</h3>
                      <p className="text-gray-700 mb-2">
                        Nos produits sont décrits avec la plus grande exactitude possible. 
                        Cependant, nous nous réservons le droit de modifier à tout moment les caractéristiques 
                        de nos produits pour des raisons techniques ou commerciales.
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Photos non contractuelles</li>
                        <li>Couleurs et dimensions indicatives</li>
                        <li>Disponibilité soumise aux stocks</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">3.2 Prix</h3>
                      <p className="text-gray-700 mb-2">
                        Les prix sont indiqués en euros (EUR) et incluent toutes les taxes applicables. 
                        Les frais de livraison sont calculés separately et ajoutés au montant de la commande.
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Prix TTC (Toutes Taxes Comprises)</li>
                        <li>Livraison gratuite dès 50€ d'achat</li>
                        <li>Frais de port calculés au checkout</li>
                        <li>Prix susceptibles de modification</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">3.3 Disponibilité</h3>
                      <p className="text-gray-700">
                        Nos offres sont valables tant qu'elles sont visibles sur le site, dans la limite des stocks disponibles. 
                        En cas d'indisponibilité temporaire, nous vous proposerons un produit de substitution ou l'annulation gratuite de votre commande.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Commande */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Processus de commande</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">4.1 Formation du contrat</h3>
                  <p className="text-gray-700 mb-2">
                    Le contrat de vente est formé lors de la confirmation de votre commande par email. 
                    Cette confirmation constitue l'acceptation de votre offre d'achat.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">4.2 Étapes de la commande</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1 ml-4">
                    <li>Sélection des produits dans le panier</li>
                    <li>Saisie des informations de livraison et facturation</li>
                    <li>Choix du mode de paiement</li>
                    <li>Acceptation des conditions générales</li>
                    <li>Confirmation et paiement de la commande</li>
                    <li>Réception de l'email de confirmation</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">4.3 Annulation et modification</h3>
                  <p className="text-gray-700">
                    Vous pouvez annuler ou modifier votre commande dans les 2 heures suivant sa confirmation, 
                    sous réserve qu'elle n'ait pas encore été expédiée. Contactez-nous rapidement à{' '}
                    <a href="mailto:contact@beldouze.com" className="text-blue-600 hover:underline">
                      contact@beldouze.com
                    </a>.
                  </p>
                </div>
              </div>
            </div>

            {/* Paiement */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Paiement</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">5.1 Moyens de paiement acceptés</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Cartes bancaires (Visa, Mastercard, American Express)</li>
                        <li>PayPal</li>
                        <li>Virement bancaire (pour commandes importantes)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">5.2 Sécurité des paiements</h3>
                      <p className="text-gray-700">
                        Tous les paiements sont sécurisés par cryptage SSL. Nous ne stockons jamais vos informations 
                        de paiement. Les transactions sont traitées par nos partenaires certifiés (Stripe, PayPal).
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">5.3 Défaut de paiement</h3>
                      <p className="text-gray-700">
                        En cas de refus de paiement par votre banque, nous nous réservons le droit d'annuler 
                        votre commande et de vous-facturer les frais engagés.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Livraison */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Livraison</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">6.1 Zones de livraison</h3>
                      <p className="text-gray-700 mb-2">
                        Nous livrons en France métropolitaine et dans certains pays européens. 
                        Les délais et frais de livraison varient selon la destination.
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>France métropolitaine : livraison gratuite dès 50€</li>
                        <li>DOM-TOM et international : tarifs spécifiques</li>
                        <li>Livraison en point relais disponible</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">6.2 Délais de livraison</h3>
                      <p className="text-gray-700 mb-2">
                        Les commandes sont généralement expédiées sous 24-48h ouvrées. 
                        Les délais de livraison sont indicatifs et peuvent varier :
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>France métropolitaine : 2-4 jours ouvrés</li>
                        <li>Point relais : 3-5 jours ouvrés</li>
                        <li>International : 5-10 jours selon le pays</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">6.3 Risques et transfert de propriété</h3>
                      <p className="text-gray-700">
                        Les risques de perte ou de détérioration sont transférés à l'acheteur 
                        au moment de la remise du colis au transporteur. 
                        La propriété des produits est transférée après paiement intégral.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Droit de rétractation */}
            <div className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Droit de rétractation</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">7.1 Délai de rétractation</h3>
                      <p className="text-gray-700">
                        Conformément au Code de la consommation, vous disposez d'un délai de 14 jours calendaires 
                        à compter de la réception de votre commande pour exercer votre droit de rétractation.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">7.2 Conditions d'exercice</h3>
                      <p className="text-gray-700 mb-2">
                        Pour exercer votre droit de rétractation, les produits doivent être :
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Dans leur état d'origine (non utilisés)</li>
                        <li>Dans leur emballage d'origine</li>
                        <li>Accompagnés de tous les accessoires</li>
                        <li>Avec la facture d'achat</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">7.3 Procédure</h3>
                      <p className="text-gray-700">
                        Contactez-nous à{' '}
                        <a href="mailto:retours@beldouze.com" className="text-blue-600 hover:underline">
                          retours@beldouze.com
                        </a>{' '}
                        ou utilisez notre formulaire de contact. Nous vous fournirons une étiquette de retour gratuite.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">7.4 Remboursement</h3>
                      <p className="text-gray-700">
                        Le remboursement sera effectué sous 14 jours maximum après réception du retour, 
                        par le même moyen de paiement que celui utilisé pour la commande.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Garanties */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Garanties et service après-vente</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">8.1 Garantie légale de conformité</h3>
                  <p className="text-gray-700">
                    Tous nos produits bénéficient de la garantie légale de conformité de 2 ans. 
                    Cette garantie couvre les défauts de conformité existant au moment de la livraison.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">8.2 Garantie contre les vices cachés</h3>
                  <p className="text-gray-700">
                    Les produits présentant un vice caché sont couverts par la garantie contre les vices cachés 
                    conformément aux articles 1641 et suivants du Code civil.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">8.3 Service après-vente</h3>
                  <p className="text-gray-700">
                    Notre service après-vente est à votre disposition pour toute question ou réclamation :{' '}
                    <a href="mailto:sav@beldouze.com" className="text-blue-600 hover:underline">
                      sav@beldouze.com
                    </a>{' '}
                    ou +33 759 59 97 42.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Exclusion :</strong> Les dommages résultant d'une mauvaise utilisation, 
                    d'un accident, de l'usure normale ou d'une modification non autorisée ne sont pas couverts.
                  </p>
                </div>
              </div>
            </div>

            {/* Responsabilité */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Responsabilité</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Notre responsabilité est limitée au montant de votre commande. 
                  Nous ne pouvons être tenus responsables des dommages indirects, consécutifs ou immatériels.
                </p>

                <p className="text-gray-700">
                  Nous nous efforçons de maintenir notre site accessible 24h/24, mais ne pouvons garantir 
                  une disponibilité continue et nous réservons le droit d'interrompre l'accès pour maintenance.
                </p>

                <p className="text-gray-700">
                  La responsabilité de BELDOUZE ne peut être engagée en cas de force majeure, 
                  de fait du tiers ou de votre propre fait.
                </p>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Propriété intellectuelle</h2>
              
              <p className="text-gray-700 mb-4">
                Tous les éléments du site beldouze.com (textes, images, logos, vidéos, etc.) sont protégés 
                par les droits de propriété intellectuelle et sont la propriété exclusive de BELDOUZE 
                ou de ses partenaires.
              </p>

              <p className="text-gray-700">
                Toute reproduction, distribution, modification ou adaptation de tout ou partie du site 
                est interdite sans autorisation écrite préalable.
              </p>
            </div>

            {/* Données personnelles */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Protection des données personnelles</h2>
              
              <p className="text-gray-700 mb-4">
                Le traitement de vos données personnelles est régi par notre Politique de Confidentialité, 
                disponible sur ce site. Nous vous encourageons à la consulter.
              </p>

              <p className="text-gray-700">
                Vous disposez de droits sur vos données (accès, rectification, effacement, portabilité) 
                et pouvez les exercer en nous contactant.
              </p>
            </div>

            {/* Loi applicable */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Droit applicable et juridiction</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Les présentes CGV sont régies par le droit français. 
                  En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
                </p>

                <p className="text-gray-700">
                  À défaut de solution amiable, les tribunaux français seront seuls compétents, 
                  sauf disposition légale impérative contraire.
                </p>
              </div>
            </div>

            {/* Médiation */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Médiation</h2>
              
              <p className="text-gray-700 mb-4">
                En cas de litige, vous avez la possibilité de recourir gratuitement à un médiateur 
                de la consommation conformément aux dispositions du Code de la consommation.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Contact médiation :</strong> [Médiateur à désigner]<br />
                  Avant toute saisine, contactez-nous directement pour trouver une solution.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="mb-12 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">14. Contact</h2>
              
              <p className="text-gray-700 mb-4">
                Pour toute question concernant ces conditions générales :
              </p>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Service client :</p>
                  <p className="text-sm text-gray-700">contact@beldouze.com • +33 759 59 97 42</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Service après-vente :</p>
                  <p className="text-sm text-gray-700">sav@beldouze.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Retours :</p>
                  <p className="text-sm text-gray-700">retours@beldouze.com</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link to="/privacy" className="text-sm text-blue-600 hover:underline">
                  → Consultez notre Politique de Confidentialité
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Questions sur nos conditions ?
            </h3>
            <p className="text-gray-600 mb-6">
              Notre équipe est disponible pour vous expliquer et vous accompagner.
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
                to="/privacy"
                className="px-6 py-3 border text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                style={{ borderColor: '#0e0e52', color: '#0e0e52' }}
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;