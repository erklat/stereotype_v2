export const getProductCategories = (state) =>
  state?.productsManager?.categories || [];

export const getMinMaxProductPrices = (state) => {
  const products = state?.productsManager?.products?.data || [];

  const initialValues = {
    minPrice: Infinity,
    maxPrice: -Infinity,
  };

  const { minPrice, maxPrice } = products.reduce(
    (acc, product) => ({
      minPrice: Math.min(acc.minPrice, product.price),
      maxPrice: Math.max(acc.maxPrice, product.price),
    }),
    initialValues
  );

  return { minPrice, maxPrice };
};

export const getFilteredProducts = (state) => {
  const products = state?.productsManager?.products?.data;
  const filters = state?.productsManager?.queryParams;

  if (!products || !filters) {
    return [];
  }

  // Filter the products based on the filters
  const filteredProducts = products
    .filter((product) => {
      if (filters.priceRange.length === 2) {
        const [minPrice, maxPrice] = filters.priceRange;
        if (product.price < minPrice || product.price > maxPrice) {
          return false;
        }
      }
      if (
        filters.category.length &&
        !filters.category.includes(product.category)
      ) {
        return false;
      }
      if (
        filters.search &&
        !product.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.q &&
        !product.title.toLowerCase().includes(filters.q.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "price") {
        return filters.sortDirection === "asc"
          ? a.price - b.price
          : b.price - a.price;
      }
      if (filters.sortBy === "title") {
        return filters.sortDirection === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

  // Pagination logic
  const { perPage, currentPage } = filters;
  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const validCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (validCurrentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return {
    products: filteredProducts.slice(startIndex, endIndex),
    total: filteredProducts.length,
  };
};

export const getQueryParams = (state) => {
  return state?.productsManager?.queryParams || null;
};
