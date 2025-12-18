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
  age: string; // e.g., "3-6 years"
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

export const products: Product[] = [
  {
    id: '1',
    name: 'LEGO Classic Creative Fun',
    price: 29.99,
    oldPrice: 39.99,
    rating: 4.8,
    reviewCount: 1250,
    available: 50,
    soldToday: 15,
    images: ['/images/products/lego1.jpg', '/images/products/lego2.jpg', '/images/products/lego3.jpg'],
    description: 'Unleash your creativity with this classic LEGO set perfect for all ages.',
    category: 'Building Toys',
    brand: 'LEGO',
    age: '6+ years'
  },
  {
    id: '2',
    name: 'Barbie Dreamhouse',
    price: 199.99,
    oldPrice: 249.99,
    rating: 4.9,
    reviewCount: 890,
    available: 25,
    soldToday: 8,
    images: ['/images/products/barbie1.jpg', '/images/products/barbie2.jpg', '/images/products/barbie3.jpg'],
    description: 'The ultimate Barbie Dreamhouse with elevator, pool, and endless possibilities.',
    category: 'Dolls',
    brand: 'Barbie',
    age: '3+ years'
  },
  {
    id: '3',
    name: 'Hot Wheels Track Builder',
    price: 49.99,
    rating: 4.7,
    reviewCount: 2100,
    available: 75,
    soldToday: 22,
    images: ['/images/products/hotwheels1.jpg', '/images/products/hotwheels2.jpg'],
    description: 'Build your own racing track with this exciting Hot Wheels set.',
    category: 'Vehicles',
    brand: 'Hot Wheels',
    age: '3+ years'
  },
  {
    id: '4',
    name: 'Nintendo Switch OLED',
    price: 349.99,
    oldPrice: 399.99,
    rating: 4.6,
    reviewCount: 3200,
    available: 30,
    soldToday: 12,
    images: ['/images/products/switch1.jpg', '/images/products/switch2.jpg'],
    description: 'Play anywhere with the Nintendo Switch OLED model.',
    category: 'Gaming',
    brand: 'Nintendo',
    age: '6+ years'
  },
  {
    id: '5',
    name: 'Fisher-Price Rock-a-Stack',
    price: 12.99,
    rating: 4.5,
    reviewCount: 1800,
    available: 100,
    soldToday: 35,
    images: ['/images/products/rockastack1.jpg'],
    description: 'Classic stacking toy that helps develop fine motor skills.',
    category: 'Baby Toys',
    brand: 'Fisher-Price',
    age: '6 months+'
  },
  {
    id: '6',
    name: 'Play-Doh Modeling Compound',
    price: 8.99,
    rating: 4.4,
    reviewCount: 950,
    available: 150,
    soldToday: 28,
    images: ['/images/products/playdoh1.jpg', '/images/products/playdoh2.jpg'],
    description: 'Non-toxic modeling compound for creative play.',
    category: 'Arts & Crafts',
    brand: 'Play-Doh',
    age: '2+ years'
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    userName: 'Sophie M.',
    userAvatar: '/images/avatars/avatar1.jpg',
    rating: 5,
    comment: 'Ma fille adore !! 🎉 La voiture est super solide, elle a résisté à toutes les chutes et les coups ! En plus, pas besoin de montage, on branche et c\'est parti. Super cadeau de Noël !',
    date: '2024-12-15',
    badge: 'Parent'
  },
  {
    id: '2',
    userName: 'Maxime L.',
    userAvatar: '/images/avatars/avatar2.jpg',
    rating: 5,
    comment: 'Franchement, pas déçu ! 🚗💨 Ma petite la manipule bien, même si elle est encore un peu jeune. Le design est top, et les effets lumineux c\'est une tuerie 😍. Je recommande à fond.',
    date: '2024-12-14',
    badge: 'Client fidèle'
  },
  {
    id: '3',
    userName: 'Julie T.',
    userAvatar: '/images/avatars/avatar3.jpg',
    rating: 5,
    comment: 'Un jouet qui plait vraiment ! 😎 Mon fils l\'utilise tout le temps. Très facile à prendre en main, et la qualité est au rendez-vous. Ça change des jouets qui se cassent au bout de 2 jours.',
    date: '2024-12-13',
    badge: 'Parent'
  },
  {
    id: '4',
    userName: 'Paul D.',
    userAvatar: '/images/avatars/avatar4.jpg',
    rating: 5,
    comment: 'Cadeau parfait pour Noël 🎄. Mon fils a adoré ! Il est tellement content avec ses effets de lumière. En plus, c\'est super simple à utiliser. Franchement, top qualité pour le prix 👏.',
    date: '2024-12-12',
    badge: 'Parent'
  },
  {
    id: '5',
    userName: 'Caroline G.',
    userAvatar: '/images/avatars/avatar5.jpg',
    rating: 5,
    comment: 'Je ne croyais pas que c\'était aussi fun ! 😆 On dirait que la voiture a une vie propre. C\'est vraiment impressionnant pour un jouet à ce prix. À recommander à tous les parents.',
    date: '2024-12-11',
    badge: 'Client fidèle'
  },
  {
    id: '6',
    userName: 'Mélanie P.',
    userAvatar: '/images/avatars/avatar6.jpg',
    rating: 5,
    comment: 'C\'est vraiment un jouet qui déchire 😍 !! Pas besoin de trucs compliqués. Simple à utiliser et les lumières rendent trop bien. Mon fils a même fait un combat de voitures avec son copain 😂. Une belle réussite !',
    date: '2024-12-10',
    badge: 'Parent'
  },
  {
    id: '7',
    userName: 'Thomas B.',
    userAvatar: '/images/avatars/avatar7.jpg',
    rating: 5,
    comment: 'Ma fille l\'adore !! 😅 Le seul bémol c\'est qu\'elle veut plus que moi l\'utiliser 😂 mais c\'est vraiment un super cadeau, facile, fun, et la batterie tient bien !',
    date: '2024-12-09',
    badge: 'Parent'
  },
  {
    id: '8',
    userName: 'Lisa C.',
    userAvatar: '/images/avatars/avatar8.jpg',
    rating: 5,
    comment: 'J\'ai acheté ça pour Noël et franchement, aucune déception ! 🎅 Facile à utiliser, elle fait des cascades et les lumières sont superbes. Le must pour un Noël magique pour les enfants !',
    date: '2024-12-08',
    badge: 'Parent'
  },
  {
    id: '9',
    userName: 'Isabelle F.',
    userAvatar: '/images/avatars/avatar9.jpg',
    rating: 5,
    comment: 'Le produit est solide et vraiment fun pour les enfants ! En plus, pas de tracas avec un montage chiant. Tout de suite prêt à l\'emploi. Mon petit fils l\'a déjà adopté 👍.',
    date: '2024-12-07',
    badge: 'Client fidèle'
  },
  {
    id: '10',
    userName: 'David S.',
    userAvatar: '/images/avatars/avatar10.jpg',
    rating: 5,
    comment: 'Très content de mon achat. Ma fille adore, et en plus elle peut l\'utiliser seule, sans trop de soucis. Les effets lumineux sont vraiment bien faits. Je conseille sans hésiter !',
    date: '2024-12-06',
    badge: 'Expert'
  },
  {
    id: '11',
    userName: 'Antoine R.',
    userAvatar: '/images/avatars/avatar11.jpg',
    rating: 5,
    comment: 'Un vrai succès pour l\'anniversaire de mon fils ! 🎂 La voiture fait des figures incroyables et les lumières colorées fascinent tous les enfants. Qualité professionnelle, je recommande !',
    date: '2024-12-05',
    badge: 'Parent'
  },
  {
    id: '12',
    userName: 'Camille L.',
    userAvatar: '/images/avatars/avatar12.jpg',
    rating: 5,
    comment: 'Waouh ! 🤩 Mon neveu a eu les yeux qui brillent quand il a vu la voiture. Elle est hyper robuste, elle a déjà pris des chocs et elle fonctionne toujours parfaitement. Excellent investissement !',
    date: '2024-12-04',
    badge: 'Client fidèle'
  },
  {
    id: '13',
    userName: 'Nicolas B.',
    userAvatar: '/images/avatars/avatar13.jpg',
    rating: 5,
    comment: 'Parfait pour un cadeau de dernière minute ! 🎁 Pas de complications, on sort de la boîte et c\'est parti. Mon fils de 5 ans s\'en sert comme un pro. Les parents sont contents aussi !',
    date: '2024-12-03',
    badge: 'Parent'
  },
  {
    id: '14',
    userName: 'Valérie M.',
    userAvatar: '/images/avatars/avatar14.jpg',
    rating: 5,
    comment: 'Super content de cet achat ! ✨ Les effets sonores et lumineux sont géniaux, ça donne vraiment vie à la voiture. Ma fille invite ses copines pour jouer avec, c\'est un vrai hit !',
    date: '2024-12-02',
    badge: 'Parent'
  },
  {
    id: '15',
    userName: 'Marc D.',
    userAvatar: '/images/avatars/avatar15.jpg',
    rating: 5,
    comment: 'Le jouet qui occupe intelligemment les enfants ! 🧠 Pas de piles à acheter, pas de montage, juste du fun pur. Les couleurs sont magnifiques et la finition est nickel. Bravo !',
    date: '2024-12-01',
    badge: 'Expert'
  }
];

export const brands: Brand[] = [
  { id: '1', name: 'LEGO', logo: '/images/logos/lego.png' },
  { id: '2', name: 'Barbie', logo: '/images/logos/barbie.png' },
  { id: '3', name: 'Hot Wheels', logo: '/images/logos/hotwheels.png' },
  { id: '4', name: 'Nintendo', logo: '/images/logos/nintendo.png' },
  { id: '5', name: 'Fisher-Price', logo: '/images/logos/fisherprice.png' },
  { id: '6', name: 'Play-Doh', logo: '/images/logos/playdoh.png' }
];

export const videos: Video[] = [
  {
    id: '1',
    title: 'LEGO Building Adventure',
    url: '/videos/lego-adventure.mp4',
    thumbnail: '/images/thumbnails/lego-thumb.jpg'
  },
  {
    id: '2',
    title: 'Barbie Dreamhouse Tour',
    url: '/videos/barbie-tour.mp4',
    thumbnail: '/images/thumbnails/barbie-thumb.jpg'
  },
  {
    id: '3',
    title: 'Hot Wheels Racing',
    url: '/videos/hotwheels-race.mp4',
    thumbnail: '/images/thumbnails/hotwheels-thumb.jpg'
  }
];

export const benefits = [
  {
    icon: '🚚',
    title: 'Free Shipping',
    description: 'Free delivery on orders over €50'
  },
  {
    icon: '⭐',
    title: 'Premium Quality',
    description: 'High-quality toys from trusted brands'
  },
  {
    icon: '♻️',
    title: 'Durable & Safe',
    description: 'Long-lasting fun with safety standards'
  },
  {
    icon: '💝',
    title: 'Gift Ready',
    description: 'Perfect gifts for all occasions'
  }
];

export const faqData = [
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unused items in their original packaging.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries in Europe. Shipping costs vary by destination.'
  },
  {
    question: 'Are your toys safe for children?',
    answer: 'All our toys meet European safety standards (CE marking) and are tested for quality.'
  },
  {
    question: 'Can I track my order?',
    answer: 'Yes, you will receive a tracking number via email once your order ships.'
  }
];