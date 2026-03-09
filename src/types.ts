export interface Product {
  id: string;
  name: string;
  category: 'spices' | 'dry-fruits' | 'teas' | 'herbal-teas' | 'pulses-lentils' | 'other-products';
  description: string;
  pricePerKg: number;
  minOrder: number;
  image: string;
  origin: string;
  benefits?: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}
