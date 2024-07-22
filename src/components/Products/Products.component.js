"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("@/state-management/hooks");
const ProductsManager_selectors_1 = require("@/utils/ProductsManager/ProductsManager.selectors");
const Pagination_component_1 = __importDefault(require("@/components/Pagination/Pagination.component"));
const Layout_component_1 = require("@/components/Layout/Layout.component");
const ProductCard_component_1 = __importDefault(require("@/components/Products/components/ProductCard.component"));
const Products = () => {
    const { products, total } = (0, hooks_1.useAppSelector)(ProductsManager_selectors_1.getFilteredProducts);
    const queryParams = (0, hooks_1.useAppSelector)(ProductsManager_selectors_1.getQueryParams);
    return (<>
      <Layout_component_1.Container>
        <Layout_component_1.Row>
          {products.map((product) => (<Layout_component_1.Column key={product.id} span={3}>
              <ProductCard_component_1.default product={product}/>
            </Layout_component_1.Column>))}
        </Layout_component_1.Row>
      </Layout_component_1.Container>

      <Pagination_component_1.default total={total} currentPage={queryParams.currentPage} perPage={queryParams.perPage}/>
    </>);
};
exports.default = Products;
