import { current } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "./store";
// import { setCurrentPage } from "./filterSlice";
// import { getPaginationButtons } from "./paginator";
import { actions as productActions } from "@/utils/ProductsManager/ProductsManager.reducer";

interface PaginatorParams {
  currentPage: number;
  perPage: number;
  total: number;
}

const Paginator = ({ perPage, currentPage, total }: PaginatorParams) => {
  const dispatch = useDispatch();
  // const { numberOfProducts } = useSelector((state: RootState) => state.filter);

  //   const paginationButtons = getPaginationButtons({
  //     currentPage,
  //     perPage,
  //     numberOfProducts,
  //   });

  const getPaginationButtons = ({
    currentPage,
    perPage,
    total,
  }: PaginatorParams) => {
    const totalPages = Math.ceil(total / perPage);
    const paginationButtons: (number | string)[] = [];

    if (totalPages <= 1) return paginationButtons;

    if (currentPage > 1) {
      paginationButtons.push(1, currentPage - 1);
    }

    paginationButtons.push(currentPage);

    if (currentPage < totalPages) {
      paginationButtons.push(currentPage + 1, totalPages);
    }

    const uniqueButtons = Array.from(new Set(paginationButtons));
    const result: (number | string)[] = [];

    for (let i = 0; i < uniqueButtons.length; i++) {
      if (i > 0 && uniqueButtons[i] !== uniqueButtons[i - 1] + 1) {
        result.push("...");
      }
      result.push(uniqueButtons[i]);
    }

    return result;
  };

  const handlePageChange = (page: number) => {
    if (
      page !== currentPage &&
      page > 0 &&
      page <= Math.ceil(total / perPage)
    ) {
      dispatch({
        type: productActions.STORE_PRODUCT_FILTERS,
        response: {
          currentPage: page,
        },
      });
    }
  };

  useEffect(() => {
    const maxNumberOfPages = Math.ceil(total / perPage);
    const maxPageAvailable = Math.min(currentPage, maxNumberOfPages);

    handlePageChange(maxPageAvailable);
  }, [perPage, currentPage, total]);

  return (
    <div className="paginator flex gap-3">
      {getPaginationButtons({ currentPage, perPage, total }).map(
        (button, index) => (
          <button
            key={index}
            onClick={() =>
              typeof button === "number" && handlePageChange(button)
            }
            disabled={typeof button !== "number" || button === currentPage}
          >
            {button}
          </button>
        )
      )}
    </div>
  );
};

export default Paginator;
