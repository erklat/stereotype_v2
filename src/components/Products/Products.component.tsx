import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { useAppSelector } from "@/state-management/hooks";
import {
  getFilteredProducts,
  getQueryParams,
} from "@/utils/ProductsManager/ProductsManager.selectors";
import Pagination from "@/components/Pagination/Pagination.component";
import { Container, Row, Column } from "@/components/Layout/Layout.component";
import ProductCard from "@/components/Products/components/ProductCard.component";
import ProductModal from "@/components/Products/components/ProductModal.component";
import { TProduct } from "@/utils/ProductsManager/types";

const Products = () => {
  const { products, total } = useAppSelector(getFilteredProducts);
  const queryParams = useAppSelector(getQueryParams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const openModal = (id: number) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Container>
        <Row>
          {products.map((product: TProduct) => (
            <Column
              key={product.id}
              smSpan={12}
              mdSpan={6}
              lgSpan={4}
              xlSpan={3}
            >
              <ProductCard
                product={product}
                onViewProduct={() => openModal(product.id)}
              />
            </Column>
          ))}
        </Row>
      </Container>

      <div className="mt-6">
        <Pagination
          total={total}
          currentPage={queryParams.currentPage}
          perPage={queryParams.perPage}
        />
      </div>

      <Transition
        show={isModalOpen}
        as={React.Fragment}
        enter="transition transform duration-300"
        enterFrom="scale-75 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition transform duration-200"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-75 opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ProductModal id={selectedProductId} onClose={closeModal} />
        </div>
      </Transition>
    </>
  );
};

export default Products;
