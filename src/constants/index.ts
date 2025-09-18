// Application Constants
export const APP_CONFIG = {
  name: 'Bachelor Point',
  description: 'Find Your Perfect Stay in Bangladesh',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'support@bachelorpoint.com',
  supportPhone: '+880-123-456-789',
} as const;

// Point System
export const POINTS = {
  FREE_STARTER: 5,
  CONTACT_COST: 1,
  EXPIRY_DAYS: 180, // 6 months
} as const;

// Divisions and Areas
export const DIVISIONS = [
  'Dhaka',
  'Chittagong',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Rangpur',
  'Mymensingh',
] as const;

export const POPULAR_AREAS = [
  'Dhanmondi',
  'Mohammadpur',
  'Uttara',
  'Bashundhara',
  'Gulshan',
  'Banani',
  'Mirpur',
  'Wari',
] as const;

// Room Types
export const ROOM_TYPES = [
  { value: 'single', label: 'Single Room', labelLocal: 'একক রুম' },
  { value: 'shared', label: 'Shared Room', labelLocal: 'শেয়ার্ড রুম' },
  { value: 'family', label: 'Family Room', labelLocal: 'পারিবারিক রুম' },
] as const;

// Amenities
export const AMENITIES = [
  { value: 'wifi', label: 'WiFi', labelLocal: 'ওয়াইফাই' },
  { value: 'ac', label: 'Air Conditioning', labelLocal: 'এয়ার কন্ডিশনার' },
  { value: 'parking', label: 'Parking', labelLocal: 'পার্কিং' },
  { value: 'laundry', label: 'Laundry', labelLocal: 'লন্ড্রি' },
  { value: 'kitchen', label: 'Kitchen Access', labelLocal: 'রান্নাঘর' },
  { value: 'security', label: '24/7 Security', labelLocal: '২৪/৭ নিরাপত্তা' },
  { value: 'gym', label: 'Gym', labelLocal: 'জিম' },
  { value: 'balcony', label: 'Balcony', labelLocal: 'বারান্দা' },
] as const;

// Price Ranges
export const PRICE_RANGES = [
  { min: 0, max: 5000, label: 'Under ৳5,000' },
  { min: 5000, max: 10000, label: '৳5,000 - ৳10,000' },
  { min: 10000, max: 15000, label: '৳10,000 - ৳15,000' },
  { min: 15000, max: 20000, label: '৳15,000 - ৳20,000' },
  { min: 20000, max: Infinity, label: 'Above ৳20,000' },
] as const;

// Routes
export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  PRICING: '/pricing',
  PROFILE: '/profile',
  FAVORITES: '/favorites',
  CONTACT: '/contact',
  ABOUT: '/about',
  TERMS: '/terms',
  PRIVACY: '/privacy',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'bachelor-point-user',
  LANGUAGE: 'bachelor-point-language',
  SEARCH_HISTORY: 'bachelor-point-search-history',
  FAVORITES: 'bachelor-point-favorites',
} as const;