import { useAppSelector } from "@/state-management/hooks";
import {
  getFilteredProducts,
  getQueryParams,
} from "@/utils/ProductsManager/ProductsManager.selectors";
import Pagination from "@/components/Pagination/Pagination.component";
import { Container, Row, Column } from "@/components/Layout/Layout.component";
import ProductCard from "@/components/Products/components/ProductCard.component";
import { TProduct } from "@/utils/ProductsManager/types";

const Products = () => {
  const { products, total } = useAppSelector(getFilteredProducts);
  const queryParams = useAppSelector(getQueryParams);

  return (
    <>
      <Container>
        <Row>
          {products.map((product: TProduct) => (
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
