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
