import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { actions as productActions } from "@/utils/ProductsManager/ProductsManager.reducer";

interface PaginatorParams {
  currentPage: number;
  perPage: number;
  total: number;
}

const Paginator = ({ perPage, currentPage, total }: PaginatorParams) => {
  const dispatch = useDispatch();
  const [maxPageAvailable, setMaxPageAvailable] = useState(1);

  const getPaginationButtons = ({
    currentPage,
    perPage,
    total,
  }: PaginatorParams) => {
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const paginationButtons: (number | string)[] = [];

    if (totalPages <= 1) return paginationButtons;

    const maxPages = 3; // Maximum number of page buttons to show
    const halfMaxPages = Math.floor(maxPages / 2);

    let startPage = Math.max(currentPage - halfMaxPages, 1);
    let endPage = Math.min(currentPage + halfMaxPages, totalPages);

    if (endPage - startPage + 1 < maxPages) {
      if (startPage === 1) {
        endPage = Math.min(startPage + maxPages - 1, totalPages);
      } else {
        startPage = Math.max(endPage - maxPages + 1, 1);
      }
    }

    // Add the first page and ellipsis if necessary
    if (startPage > 1) {
      paginationButtons.push(1);
      if (startPage > 2) {
        paginationButtons.push("...");
      }
    }

    // Add the range of pages
    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(i);
    }

    // Add the last page and ellipsis if necessary
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationButtons.push("...");
      }
      paginationButtons.push(totalPages);
    }

    return paginationButtons;
  };

  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage && page > 0 && page <= maxPageAvailable) {
        dispatch({
          type: productActions.STORE_PRODUCT_FILTERS,
          response: {
            currentPage: page,
          },
        });
      }
    },
    [currentPage, maxPageAvailable, dispatch]
  );

  useEffect(() => {
    const maxNumberOfPages = Math.max(1, Math.ceil(total / perPage));
    setMaxPageAvailable(maxNumberOfPages);

    if (currentPage > maxNumberOfPages) {
      handlePageChange(maxNumberOfPages);
    }
  }, [perPage, currentPage, total, handlePageChange]);

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
            className={`p-1 rounded-full w-8 h-8 text-center text-slate-600 ${
              button === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-300"
            } ${
              typeof button !== "number" ? "cursor-default" : "cursor-pointer"
            }`}
          >
            {button}
          </button>
        )
      )}
    </div>
  );
};

export default Paginator;
