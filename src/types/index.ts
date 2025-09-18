// User and Authentication Types
export interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isSignInModalOpen: boolean;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  signIn: (phone: string) => Promise<void>;
  signOut: () => void;
}

// Property Types
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    division: string;
    district: string;
    area: string;
    address: string;
  };
  images: string[];
  amenities: string[];
  roomType: 'single' | 'shared' | 'family';
  availableFrom: Date;
  contactInfo: {
    ownerName: string;
    phone: string;
    email?: string;
  };
  verified: boolean;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Pricing Types
export interface PricingPlan {
  id: string;
  name: string;
  nameLocal: string;
  points: number;
  price: number;
  currency: string;
  icon: React.ReactNode;
  features: string[];
  featuresLocal: string[];
  popular?: boolean;
  description: string;
  descriptionLocal: string;
}

// Search Types
export interface SearchFilters {
  division?: string;
  priceRange: [number, number];
  roomType?: 'single' | 'shared' | 'family' | 'all';
  amenities?: string[];
}

export interface SearchParams {
  query?: string;
  filters: SearchFilters;
  page: number;
  limit: number;
}

// Language Types
export type Language = 'en' | 'bn';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}