export type TFilterParams = {
  sortBy?: string;
  sortDirection?: string;
  category?: string[];
  priceRange?: any;
  perPage?: number;
  q?: string;
};

export type TProductCategory = {
  slug: string;
  name: string;
  url: string;
};

export type TProduct = {
  id: number;
  quantity: number;
  price: number;
  discountPercentage: number | undefined;
  title: string;
  thumbnail: string;
  brand: string;
  discount: number;
};
