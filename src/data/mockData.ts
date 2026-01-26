export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  available: number;
  soldToday: number;
  images: string[];
  description: string;
  category: string;
  brand: string;
  type: string; // e.g., "Mixeur", "Éplucheur", "Robot"
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  badge?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

// Fonction pour générer un rating aléatoire entre 3.8 et 5.0 avec 1 décimale
const generateRandomRating = (): number => {
  return Math.round((Math.random() * 1.2 + 3.8) * 10) / 10;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Mixeur Plongeant Inox 1200W',
    price: 129.99,
    oldPrice: 179.99,
    rating: generateRandomRating(),
    reviewCount: 1250,
    available: 45,
    soldToday: 12,
    images: ['/images/products/mixeur-plongeant.jpg', '/images/products/mixeur-plongeant-2.jpg'],
    description: 'Mixeur plongeant professionnel en acier inoxydable. Parfait pour smoothies, soupes et sauces.',
    category: 'Mixeurs',
    brand: 'KitchenPro',
    type: 'Mixeur'
  },
  {
    id: '2',
    name: 'Éplucheur Révolutionnaire',
    price: 74.99,
    oldPrice: 124.99,
    rating: 4.8,
    reviewCount: 2100,
    available: 75,
    soldToday: 25,
    images: ['/images/products/eplucheur.jpg', '/images/products/eplucheur-2.jpg'],
    description: 'Éplucheur innovant qui transforme la préparation des légumes. Plus jamais de corvées !',
    category: 'Éplucheurs',
    brand: 'Beldouze',
    type: 'Éplucheur'
  },
  {
    id: '3',
    name: 'Robot Multifonction 1500W',
    price: 349.99,
    oldPrice: 449.99,
    rating: generateRandomRating(),
    reviewCount: 890,
    available: 30,
    soldToday: 8,
    images: ['/images/products/robot-cuisine.jpg', '/images/products/robot-cuisine-2.jpg'],
    description: 'Robot de cuisine tout-en-un. Hache, mixe, pétrit et cuits à la vapeur.',
    category: 'Robots',
    brand: 'ChefMaster',
    type: 'Robot'
  },
  {
    id: '4',
    name: 'Batterie de Poêles Antiadhésive',
    price: 139.99,
    oldPrice: 189.99,
    rating: generateRandomRating(),
    reviewCount: 1560,
    available: 60,
    soldToday: 18,
    images: ['/images/products/poele-set.jpg', '/images/products/poele-set-2.jpg'],
    description: 'Set de 3 poêles avec revestement antiadhésif écologique. Compatible tous feux.',
    category: 'Poêles',
    brand: 'CookHome',
    type: 'Poêles'
  },
  {
    id: '5',
    name: 'Blender Professionnel 2000W',
    price: 199.99,
    oldPrice: 249.99,
    rating: generateRandomRating(),
    reviewCount: 950,
    available: 40,
    soldToday: 15,
    images: ['/images/products/blender.jpg'],
    description: 'Blender haute puissance pour smoothies verts, soupes chaudes et glaces maison.',
    category: 'Blenders',
    brand: 'BlendMax',
    type: 'Blender'
  },
  {
    id: '6',
    name: 'Ensemble Couteaux de Chef',
    price: 179.99,
    oldPrice: 229.99,
    rating: generateRandomRating(),
    reviewCount: 720,
    available: 25,
    soldToday: 7,
    images: ['/images/products/couteaux-chef.jpg', '/images/products/couteaux-chef-2.jpg'],
    description: 'Set professionnel de 6 couteaux de chef en acier japonais. Avec soporte en bois.',
    category: 'Couteaux',
    brand: 'SharpEdge',
    type: 'Couteaux'
  }
];

export const reviews: Review[] = [
  {
    id: '1', userName: 'Sophie M.', userAvatar: '/images/image_review/review1.png', rating: 5, comment: 'Je m’en sers tous les soirs pour les légumes, c’est rapide et mes mains ne fatiguent plus. Même mon fils a réussi à l’utiliser sans problème.', date: '2025-12-15', badge: 'Client fidèle'
  },
  { id: '2', userName: 'Maxime L.', userAvatar: '/images/image_review/review2.png', rating: 4, comment: 'Très pratique et facile à utiliser, ça épluche sans effort et ça va super vite.', date: '2024-06-14', badge: 'Utilisateur régulier' },
  { id: '3', userName: 'Julie T.', userAvatar: '/images/image_review/review3.png', rating: 4, comment: 'Livraison rapide, produit conforme. J’avais peur que ça fasse du bazar mais le plan de travail reste propre.', date: '2024-12-13', badge: 'Nouveau client' },
  { id: '4', userName: 'Paul D.', userAvatar: '/images/image_review/review4.png', rating: 5, comment: 'Je l’utilise tous les jours, ça me fait gagner un temps fou et plus aucune coupure aux doigts.', date: '2025-07-12', badge: 'Utilisateur quotidien' },
  { id: '5', userName: 'Caroline G.', userAvatar: '/images/image_review/review5.png', rating: 5, comment: 'Je l’ai essayé sur des pommes et des poires, super simple à utiliser. Dommage qu’il n’y ait pas plus de couleurs mais franchement ça fait bien le boulot.', date: '2025-12-11', badge: 'Satisfaite' },
  { id: '6', userName: 'Jacob P.', userAvatar: '/images/image_review/review6.png', rating: 5, comment: 'Offert à ma mère, elle adore. Elle ne se fatigue plus et c’est sécurisé, même pour ses mains fragiles.', date: '2025-01-10', badge: 'Cadeau parfait' },
  { id: '7', userName: 'Thomas B.', userAvatar: '/images/image_review/review7.png', rating: 5, comment: 'Excellent rapport qualité-prix. Pour 59€ avec les accessoires offerts, c’est imbattable.', date: '2025-10-09', badge: 'Excellent' },
  { id: '8', userName: 'Lisa C.', userAvatar: '/images/image_review/review8.png', rating: 4, comment: 'Facile à nettoyer, un coup sous l’eau et c’est réglé. Pas de saleté partout comme avec les couteaux.', date: '2025-08-08', badge: 'Satisfaite' },
  { id: '9', userName: 'Isabelle F.', userAvatar: '/images/image_review/review9.png', rating: 4, comment: 'Simple à utiliser, même quand on est pressé. Dommage qu’il n’y ait pas plus de couleurs.', date: '2025-12-07', badge: 'Utilisatrice régulière' },
  { id: '10', userName: 'David S.', userAvatar: '/images/image_review/review10.png', rating: 5, comment: 'Je pensais que c’était un gadget, mais après l’avoir utilisé sur des patates et des courgettes, je m’en sers tout le temps. Ça marche vraiment et ça fait gagner du temps.', date: '2025-12-06', badge: 'Convaincu' },
  { id: '11', userName: 'Nouveau client', userAvatar: '/images/image_review/review11.png', rating: 5, comment: 'Très bon produit, je suis ravi. Ça épluche nickel sans forcer et la livraison était rapide.', date: '2025-12-05', badge: 'Nouveau client' },
  { id: '12', userName: 'Utilisateur satisfait', userAvatar: '/images/image_review/review12.png', rating: 5, comment: 'Fonctionne parfaitement, rien à redire. Gain de temps énorme et résultat propre à chaque fois.', date: '2025-12-04', badge: 'Satisfait' },
  // Nouvelles reviews ajoutées
  { id: '13', userName: 'Fatima Z.', userAvatar: '/images/image_review/review13.png', rating: 4, comment: "Franchement, j'étais sceptique... 59 balles pour un éplucheur ? Mais j'en avais marre de galérer avec les vieux trucs qui coupent les doigts 😅. Depuis que je l'ai, c'est la paix, je gagne du temps et je peux enfin cuisiner tranquille avec mes enfants. Oui c'est cher, mais la qualité est là, et j'ai plus peur de me blesser. Merci Beldouze !", date: '2025-11-30', badge: 'Maman rassurée' },
  { id: '14', userName: 'Yassine K.', userAvatar: '/images/image_review/review14.png', rating: 5, comment: "Bon, j'avoue j'ai hésité... gadget ou pas ? Mais franchement, ça change la vie. J'ai plus mal à la main, et ça va vite, même sur les patates du gratin. Le nettoyage ? 2 min sous l'eau, c'est réglé. J'aurais aimé plus de couleurs mais bon, c'est pas grave. 👌", date: '2025-11-28', badge: 'Fini la corvée' },
  { id: '15', userName: 'Claire V.', userAvatar: '/images/image_review/review15.png', rating: 4, comment: "J'ai reçu le colis en 2 jours, nickel. Au début j'ai cru que c'était fragile, mais en vrai c'est solide. J'ai offert à ma mère, elle a pleuré de joie 😂. Elle peut enfin cuisiner sans galérer, et moi je suis rassurée pour ses mains. Un peu cher mais ça vaut le coup pour la famille.", date: '2025-11-25', badge: 'Cadeau utile' },
  { id: '16', userName: 'Mohamed A.', userAvatar: '/images/image_review/review16.png', rating: 5, comment: "J'ai testé sur carottes, pommes, courgettes... ça marche sur tout ! J'avais peur que ça fasse du bazar, mais le plan de travail reste propre. Et franchement, ça me fait gagner un temps fou, surtout le soir après le boulot. 👨‍🍳", date: '2025-11-20', badge: 'Papa pressé' },
  { id: '17', userName: 'Emma R.', userAvatar: '/images/image_review/review17.png', rating: 4, comment: "Bon, c'est pas parfait, mais c'est bien mieux que les couteaux. J'ai des enfants, et là au moins ils peuvent aider sans risque de coupure. La base antidérapante c'est top, et les lames sont bien protégées. J'aurais aimé un mode d'emploi plus clair, mais on s'en sort. 👍", date: '2025-11-18', badge: 'Sécurité avant tout' },
  { id: '18', userName: 'Lucas D.', userAvatar: '/images/image_review/review18.png', rating: 5, comment: "J'ai acheté pour ma copine, elle râlait tout le temps sur les gadgets. Bah là, elle est bluffée ! On cuisine ensemble, c'est devenu un vrai moment de partage. Et plus d'excuse pour commander des pizzas 😅. Merci pour la livraison rapide !", date: '2025-11-15', badge: 'Moment en couple' },
  { id: '19', userName: 'Nina S.', userAvatar: '/images/image_review/review19.png', rating: 4, comment: "J'ai une petite cuisine, donc je voulais pas un truc encombrant. Celui-là se range facile, et il prend pas de place. J'avais peur que ça serve à rien, mais franchement, je l'utilise tous les jours. Un peu bruyant mais bon, c'est pas grave. 🙃", date: '2025-11-12', badge: 'Compact & pratique' },
  { id: '20', userName: 'Antoine P.', userAvatar: '/images/image_review/review20.png', rating: 5, comment: "J'ai hésité à cause du prix, mais j'en avais marre de jeter la moitié des légumes avec les vieux éplucheurs. Là, ça enlève juste la peau, pas de gaspillage. Et pour le nettoyage, c'est vraiment easy. J'aurais aimé un accessoire pour les tomates, mais bon...", date: '2025-11-10', badge: 'Anti-gaspillage' },
  { id: '21', userName: 'Sarah L.', userAvatar: '/images/image_review/review21.png', rating: 5, comment: "Je suis pas une grande cuisinière, mais avec ce truc, j'ai l'impression d'être une chef 😂. Je gagne du temps, je me coupe plus, et mes enfants adorent m'aider. Livraison rapide, service client au top. Merci !", date: '2025-11-08', badge: 'Chef à la maison' },
  { id: '22', userName: 'Rachid E.', userAvatar: '/images/image_review/review22.png', rating: 4, comment: "Facile à utiliser, même pour les nuls comme moi. J'avais peur que ça tombe en panne vite, mais ça tient bien le coup. J'ai testé sur plein de légumes, ça marche. Un peu cher mais bon, la sécurité ça n'a pas de prix. 💪", date: '2025-11-05', badge: 'Solide' },
  { id: '23', userName: 'Julie B.', userAvatar: '/images/image_review/review23.png', rating: 5, comment: "J'ai offert à ma sœur, elle râlait sur les gadgets. Maintenant elle me remercie tous les jours 😂. On cuisine ensemble, c'est devenu notre rituel du dimanche. Franchement, ça change la vie !", date: '2025-11-02', badge: 'Partage' },
  { id: '24', userName: 'Karim T.', userAvatar: '/images/image_review/review24.png', rating: 4, comment: "Bon produit, solide et efficace. J'ai eu peur que ce soit galère à nettoyer, mais en vrai c'est rapide. J'aurais aimé payer moins cher, mais au moins je me coupe plus jamais. 👏", date: '2025-10-30', badge: 'Fini les coupures' },
];


export const brands: Brand[] = [
  { id: '1', name: 'KitchenPro', logo: '/images/logos/kitchenpro.png' },
  { id: '2', name: 'Beldouze', logo: '/images/logos/beldouze.png' },
  { id: '3', name: 'ChefMaster', logo: '/images/logos/chefmaster.png' },
  { id: '4', name: 'CookHome', logo: '/images/logos/cookhome.png' },
  { id: '5', name: 'BlendMax', logo: '/images/logos/blendmax.png' },
  { id: '6', name: 'SharpEdge', logo: '/images/logos/sharpedge.png' }
];

export const videos: Video[] = [
  {
    id: '1',
    title: 'Démonstration Éplucheur Beldouze',
    url: '/videos/eplucheur-demo.mp4',
    thumbnail: '/images/thumbnails/eplucheur-thumb.jpg'
  },
  {
    id: '2',
    title: 'Recettes avec Mixeur Plongeant',
    url: '/videos/mixeur-recettes.mp4',
    thumbnail: '/images/thumbnails/mixeur-thumb.jpg'
  },
  {
    id: '3',
    title: 'Robot Multifonction en Action',
    url: '/videos/robot-action.mp4',
    thumbnail: '/images/thumbnails/robot-thumb.jpg'
  }
];

export const benefits = [
  {
    icon: '🚚',
    title: 'Livraison Gratuite',
    description: 'Livraison offerte dès 50€ d\'achat'
  },
  {
    icon: '⭐',
    title: 'Qualité Premium',
    description: 'Ustensiles de cuisine haute qualité'
  },
  {
    icon: '♻️',
    title: 'Durable & Sécurisé',
    description: 'Produits longue durée aux normes européennes'
  },
  {
    icon: '🎁',
    title: 'Idée Cadeau',
    description: 'Parfaits pour equiper toutes les cuisines'
  }
];

export const faqData = [
  {
    question: 'J’ai déjà essayé plein d’éplucheurs, pourquoi celui-ci serait différent ?',
    answer: "Parce que la plupart des éplucheurs manuels fatiguent la main et gaspillent de la chair. Notre machine est automatique, stable et précise : elle enlève uniquement la peau, sans effort, et fonctionne sur une large variété de fruits et légumes. Vous gagnez du temps et vous évitez la corvée."
  },
  {
    question: 'Est-ce que ça marche vraiment sur mes légumes du quotidien ?',
    answer: "Oui. Il est conçu pour les classiques de la cuisine française : pommes de terre, carottes, courgettes, pommes, poires, tomates… et bien plus. Vous pouvez préparer un gratin dauphinois, une ratatouille ou une tarte Tatin sans passer des heures à éplucher."
  },
  {
    question: 'Est-ce que c’est compliqué à utiliser ?',
    answer: "Pas du tout. Il suffit de poser le légume, d’appuyer sur un bouton et de laisser la machine travailler. Pas de réglages compliqués, pas de force à fournir. Même un enfant peut l’utiliser sous surveillance."
  },
  {
    question: 'Et pour le nettoyage ?',
    answer: "Les pièces sont démontables et lavables facilement. Un simple rinçage suffit. Contrairement aux gadgets bas de gamme, vous n’avez pas de recoins impossibles à nettoyer."
  },
  {
    question: 'Est-ce que c’est solide ?',
    answer: "Oui. Lames en acier inoxydable, structure stable et robuste. Ce n’est pas un gadget jetable : il est conçu pour durer. Nous offrons en plus une garantie qualité et retour pour vous rassurer."
  },
  {
    question: 'Je crains les accidents, est-ce sécurisé ?',
    answer: "La machine est stable, avec une base antidérapante. Les lames sont protégées et vous n’avez pas besoin de les manipuler directement. Résultat : zéro risque de coupure comparé aux couteaux ou éplucheurs classiques."
  },
  {
    question: 'Pourquoi je paierais 59,99 € alors que je trouve des éplucheurs moins chers ?',
    answer: "Parce que les modèles basiques :\n\n    Fatiguent la main\n\n    Gaspiellent de la chair \n\n    Ne durent pas longtemps\n\n    Ne couvrent pas tous les aliments\n\nIci, vous achetez une solution complète : gain de temps, confort, sécurité, durabilité, + 2 accessoires offerts. C’est un investissement qui se rentabilise dès les premières semaines."
  },
  {
    question: 'Et si je ne suis pas satisfait ?',
    answer: "Vous êtes couvert par notre garantie satisfait ou remboursé. Vous pouvez tester sans risque. Si vous n’êtes pas convaincu, nous reprenons le produit."
  },
  {
    question: 'Est-ce que je peux payer en toute sécurité ?',
    answer: "Oui. Nous utilisons des logos de paiement sécurisé (Visa, Mastercard, Stripe, PayPal). Vos données sont protégées et vos transactions 100% sûres."
  },
  {
    question: 'Est-ce que d’autres clients sont contents ?',
    answer: "Absolument. Plus de 15 000 utilisateurs satisfaits et une note moyenne de 4,8/5. Les avis clients et vidéos UGC sont disponibles sur la page pour que vous voyiez les résultats réels."
  }
];