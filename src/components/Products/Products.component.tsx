import { useAppSelector, useAppDispatch } from "@/state-management/hooks";
import {
  getFilteredProducts,
  getQueryParams,
} from "@/utils/ProductsManager/ProductsManager.selectors";
import Search from "@/components/Search/Search.component";
import Pagination from "@/components/Pagination/Pagination.component";
import { actions as productActions } from "@/utils/ProductsManager/ProductsManager.reducer";
import { Container, Row, Column } from "@/components/Layout/Layout.component";
import ProductCard from "@/components/Products/components/ProductCard.component";

const Products = () => {
  const products = useAppSelector(getFilteredProducts);
  const queryParams = useAppSelector(getQueryParams);
  const maxPages = Math.ceil(products.length / queryParams.perPage);
  const dispatch = useAppDispatch();

  console.log(queryParams);

  console.log(">ZZZZZZ, ", products);

  const onSearchChange = (q) => {
    dispatch({
      type: productActions.STORE_PRODUCT_FILTERS,
      response: {
        q,
      },
    });
  };

  return (
    <>
      <Search onChange={onSearchChange} />
      <Container>
        <Row>
          {products.map((product) => (
            <Column key={product.id} span={3}>
              <ProductCard product={product} />
            </Column>
          ))}
        </Row>
      </Container>

      <Pagination
        total={194}
        currentPage={queryParams.currentPage}
        perPage={queryParams.perPage}
      />
    </>
  );
};

export default Products;
