export const categories = [
  { id: 1, name: 'New Arrivals', slug: 'new-arrivals' },
  { id: 2, name: 'Elf Bar', slug: 'elf-bar' },
  { id: 3, name: 'Nic Salts', slug: 'nic-salts' },
  { id: 4, name: 'IGET Vape', slug: 'iget-vape' },
  { id: 5, name: 'Terra', slug: 'terra' }
];

export const products = [
  {
    id: 1,
    name: 'Elf Bar 600 - Blue Razz Ice',
    category: 'elf-bar',
    price: 599,
    image: 'https://images.unsplash.com/photo-1530745342582-0795f23ec976',
    description: 'Elf Bar 600 puffs disposable vape with Blue Razz Ice flavor',
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: 'Elf Bar 600 - Watermelon',
    category: 'elf-bar',
    price: 599,
    image: 'https://images.unsplash.com/photo-1579165466814-e646cfa4a3be',
    description: 'Elf Bar 600 puffs disposable vape with Watermelon flavor',
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: 'IGET Bar - Strawberry Kiwi',
    category: 'iget-vape',
    price: 699,
    image: 'https://images.unsplash.com/photo-1545095088-26a59e3f2717',
    description: 'IGET Bar disposable vape with 5000 puffs',
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: 'IGET Legend - Pineapple Ice',
    category: 'iget-vape',
    price: 899,
    image: 'https://images.unsplash.com/photo-1594189741508-5212175833ad',
    description: 'IGET Legend disposable vape with 4000 puffs',
    inStock: true,
    featured: false
  },
  {
    id: 5,
    name: 'ElfLiq Nic Salt - Cherry Cola',
    category: 'nic-salts',
    price: 449,
    image: 'https://images.unsplash.com/photo-1601582037054-66c0611f6033',
    description: '10ml Nic Salt E-Liquid, 20mg strength',
    inStock: true,
    featured: true
  },
  {
    id: 6,
    name: 'ElfLiq Nic Salt - Blue Razz',
    category: 'nic-salts',
    price: 449,
    image: 'https://images.unsplash.com/photo-1601568656096-bde429d5d386',
    description: '10ml Nic Salt E-Liquid, 20mg strength',
    inStock: true,
    featured: false
  },
  {
    id: 7,
    name: 'Terra Vape Pod - Mint',
    category: 'terra',
    price: 799,
    image: 'https://images.pexels.com/photos/12643761/pexels-photo-12643761.jpeg',
    description: 'Terra refillable pod system with Mint flavor',
    inStock: true,
    featured: true
  },
  {
    id: 8,
    name: 'Terra Vape Pod - Mango',
    category: 'terra',
    price: 799,
    image: 'https://images.pexels.com/photos/11587603/pexels-photo-11587603.jpeg',
    description: 'Terra refillable pod system with Mango flavor',
    inStock: true,
    featured: false
  },
  {
    id: 9,
    name: 'Elf Bar 800 - Pink Lemonade',
    category: 'elf-bar',
    price: 649,
    image: 'https://images.pexels.com/photos/5533351/pexels-photo-5533351.jpeg',
    description: 'Elf Bar 800 puffs disposable vape with Pink Lemonade flavor',
    inStock: true,
    featured: false
  },
  {
    id: 10,
    name: 'IGET King - Grape Ice',
    category: 'iget-vape',
    price: 749,
    image: 'https://images.pexels.com/photos/19901864/pexels-photo-19901864.jpeg',
    description: 'IGET King disposable vape with 2600 puffs',
    inStock: true,
    featured: false
  },
  {
    id: 11,
    name: 'ElfLiq Nic Salt - Strawberry Ice',
    category: 'nic-salts',
    price: 449,
    image: 'https://images.pexels.com/photos/19344605/pexels-photo-19344605.jpeg',
    description: '10ml Nic Salt E-Liquid, 20mg strength',
    inStock: true,
    featured: false
  },
  {
    id: 12,
    name: 'Elf Bar 600 - Strawberry Banana',
    category: 'elf-bar',
    price: 599,
    image: 'https://images.pexels.com/photos/33070762/pexels-photo-33070762.jpeg',
    description: 'Elf Bar 600 puffs disposable vape with Strawberry Banana flavor',
    inStock: false,
    featured: false
  }
];

export const orders = [
  {
    id: 1,
    customerName: 'Raj Kumar',
    phone: '9876543210',
    products: [{ productId: 1, quantity: 2 }, { productId: 5, quantity: 1 }],
    totalAmount: 1647,
    status: 'pending',
    createdAt: '2025-07-16T10:30:00Z'
  },
  {
    id: 2,
    customerName: 'Priya Sharma',
    phone: '9123456789',
    products: [{ productId: 3, quantity: 1 }],
    totalAmount: 699,
    status: 'completed',
    createdAt: '2025-07-15T14:20:00Z'
  }
];

export const siteSettings = {
  // Site Information
  siteName: 'Vape Shop Chennai',
  siteTagline: 'Your one-stop destination for premium vapes, authentic products and unmatched quality.',
  
  // Top Bar
  topBarEnabled: true,
  topBarMessage: 'WhatsApp Order is Accepted - 7877475920',
  topBarBackgroundColor: '#2d2d2d',
  
  // Contact Information
  whatsappNumber: '917877475920',
  phone: '7877475920',
  alternatePhone: '',
  email: 'info@vapeshopschennai.shop',
  address: 'Chennai, Tamil Nadu',
  
  // Social Media
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  twitterUrl: 'https://twitter.com',
  
  // Hero Section
  heroTitle: 'VAPE SHOP',
  heroSubtitle: 'CHENNAI',
  heroTagline: 'PREMIUM VAPES. AUTHENTIC EXPERIENCE.',
  heroDescription: 'Your one-stop destination for premium vapes, authentic products and unmatched quality.',
  heroButtonText: 'Shop Now',
  heroBackgroundImage: 'https://images.unsplash.com/photo-1594189741508-5212175833ad?w=1920',
  
  // Theme Colors
  primaryColor: '#d4af37',
  secondaryColor: '#25D366',
  
  // Features
  showWhatsAppButton: true,
  showCallButton: true,
  enableSearch: true,
  
  // Logo
  logoUrl: '',
  faviconUrl: ''
};