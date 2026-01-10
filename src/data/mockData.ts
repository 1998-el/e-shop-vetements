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
    rating: generateRandomRating(),
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
    id: '1',
    userName: 'Sophie M.',
    userAvatar: '/images/image_review/image_review1.png',
    rating: 5,
    comment: 'Franchement trop pratique 😍 j\'ai gagner bcp de temps en cuisine, je recommande sans hésiter',
    date: '2024-12-15',
    badge: 'Client fidèle'
  },
  {
    id: '2',
    userName: 'Maxime L.',
    userAvatar: '/images/image_review/image_review2.png',
    rating: 4,
    comment: 'Au debut j\'étais sceptique 🤔 mais ça marche vraiment bien, fini la galère avec les patates',
    date: '2024-12-14',
    badge: 'Utilisateur régulier'
  },
  {
    id: '3',
    userName: 'Julie T.',
    userAvatar: '/images/image_review/image_review3.png',
    rating: 4,
    comment: 'Produit reçu rapidement 📦, bonne qualité, par contre un peu petit mais fait le taf 👍',
    date: '2024-12-13',
    badge: 'Nouveau client'
  },
  {
    id: '4',
    userName: 'Paul D.',
    userAvatar: '/images/image_review/image_review4.png',
    rating: 5,
    comment: 'J\'utilise tt les jours, ça change la vie 😅 plus besoin de couteau dangereux',
    date: '2024-12-12',
    badge: 'Utilisateur quotidien'
  },
  {
    id: '5',
    userName: 'Caroline G.',
    userAvatar: '/images/image_review/image_review5.png',
    rating: 4,
    comment: 'Super utile pour les carrots 🥕 et courgetes, par contre faut pas forcer sinon ça bloque un peu',
    date: '2024-12-11',
    badge: 'Cuisinier amateur'
  },
  {
    id: '6',
    userName: 'Mélanie P.',
    userAvatar: '/images/image_review/image_review6.png',
    rating: 5,
    comment: 'Je l\'ai offert à ma mère 🎁 elle est trop contente, elle dit que c\'est son gadget préféré',
    date: '2024-12-10',
    badge: 'Cadeau parfait'
  },
  {
    id: '7',
    userName: 'Thomas B.',
    userAvatar: '/images/image_review/image_review7.png',
    rating: 5,
    comment: 'Pas cher et efficace 💯 franchement ça vaut largement le prix, je regrette pas',
    date: '2024-12-09',
    badge: 'Excellent rapport qualité-prix'
  },
  {
    id: '8',
    userName: 'Lisa C.',
    userAvatar: '/images/image_review/image_review8.png',
    rating: 4,
    comment: 'J\'avais peur que ça casse vite 😬 mais solide et facile à nettoyer',
    date: '2024-12-08',
    badge: 'Satisfaite'
  },
  {
    id: '9',
    userName: 'Isabelle F.',
    userAvatar: '/images/image_review/image_review9.png',
    rating: 4,
    comment: 'Très bon produit, simple à utiliser 👌 juste dommage pas dispo en plusieurs couleurs',
    date: '2024-12-07',
    badge: 'Utilisatrice régulière'
  },
  {
    id: '10',
    userName: 'David S.',
    userAvatar: '/images/image_review/image_review10.png',
    rating: 5,
    comment: 'Je pensais que c\'était un gadget inutile 😅 mais en fait je l\'utilise tt le temps',
    date: '2024-12-06',
    badge: 'Convaincu'
  }
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
    question: 'Quelle est votre politique de retour ?',
    answer: 'Nous offrons 30 jours pour retourner les articles non utilisés dans leur emballage d\'origine.'
  },
  {
    question: 'Livrez-vous internationalement ?',
    answer: 'Oui, nous livrons dans la plupart des pays européens. Les frais varient selon la destination.'
  },
  {
    question: 'Vos ustensiles sont-ils sûrs ?',
    answer: 'Tous nos produits respectent les normes européennes de sécurité et sont testés pour la qualité.'
  },
  {
    question: 'Puis-je suivre ma commande ?',
    answer: 'Oui, vous recevrez un numéro de suivi par email une fois votre commande expédiée.'
  }
];