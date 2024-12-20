export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  location: string;
  description: string;
  image: string;
}

export interface SearchParams {
  search: string;
  minPrice: string;
  maxPrice: string;
  category: string;
  location: string;
}
