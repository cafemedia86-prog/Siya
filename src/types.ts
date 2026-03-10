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
  pungency?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  grade?: 'W240' | 'W320' | 'CTC' | 'First Flush' | 'Second Flush' | 'Extra Bold';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}
