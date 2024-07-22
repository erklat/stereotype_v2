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
  const { products, total } = useAppSelector(getFilteredProducts);
  const queryParams = useAppSelector(getQueryParams);

  return (
    <>
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
        total={total}
        currentPage={queryParams.currentPage}
        perPage={queryParams.perPage}
      />
    </>
  );
};

export default Products;
