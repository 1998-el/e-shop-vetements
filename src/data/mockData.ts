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
    userName: 'Marie Dupont',
    userAvatar: '/images/avatars/avatar1.jpg',
    rating: 5,
    comment: 'Excellent jouet, mon enfant adore ! La qualité est au rendez-vous.',
    date: '2024-01-15',
    badge: 'Parent'
  },
  {
    id: '2',
    userName: 'Jean Martin',
    userAvatar: '/images/avatars/avatar2.jpg',
    rating: 4,
    comment: 'Très bon rapport qualité-prix. Livraison rapide.',
    date: '2024-01-12',
    badge: 'Client fidèle'
  },
  {
    id: '3',
    userName: 'Sophie Laurent',
    userAvatar: '/images/avatars/avatar3.jpg',
    rating: 5,
    comment: 'Jouet éducatif et amusant. Parfait pour développer la créativité.',
    date: '2024-01-10'
  },
  {
    id: '4',
    userName: 'Pierre Dubois',
    userAvatar: '/images/avatars/avatar4.jpg',
    rating: 4,
    comment: 'Qualité LEGO comme toujours. Mon fils est ravi !',
    date: '2024-01-08',
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