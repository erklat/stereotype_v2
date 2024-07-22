"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const ProductsManager_reducer_1 = require("@/utils/ProductsManager/ProductsManager.reducer");
const Paginator = ({ perPage, currentPage, total }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [maxPageAvailable, setMaxPageAvailable] = (0, react_1.useState)(1);
    const getPaginationButtons = ({ currentPage, perPage, total, }) => {
        const totalPages = Math.max(1, Math.ceil(total / perPage));
        const paginationButtons = [];
        if (totalPages <= 1)
            return paginationButtons;
        const maxPages = 3; // Maximum number of page buttons to show
        const halfMaxPages = Math.floor(maxPages / 2);
        let startPage = Math.max(currentPage - halfMaxPages, 1);
        let endPage = Math.min(currentPage + halfMaxPages, totalPages);
        if (endPage - startPage + 1 < maxPages) {
            if (startPage === 1) {
                endPage = Math.min(startPage + maxPages - 1, totalPages);
            }
            else {
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
    const handlePageChange = (0, react_1.useCallback)((page) => {
        if (page !== currentPage && page > 0 && page <= maxPageAvailable) {
            dispatch({
                type: ProductsManager_reducer_1.actions.STORE_PRODUCT_FILTERS,
                response: {
                    currentPage: page,
                },
            });
        }
    }, [currentPage, maxPageAvailable, dispatch]);
    (0, react_1.useEffect)(() => {
        const maxNumberOfPages = Math.max(1, Math.ceil(total / perPage));
        setMaxPageAvailable(maxNumberOfPages);
        if (currentPage > maxNumberOfPages) {
            handlePageChange(maxNumberOfPages);
        }
    }, [perPage, currentPage, total, handlePageChange]);
    return (<div className="paginator flex gap-3">
      {getPaginationButtons({ currentPage, perPage, total }).map((button, index) => (<button key={index} onClick={() => typeof button === "number" && handlePageChange(button)} disabled={typeof button !== "number" || button === currentPage} className={`p-1 rounded-full w-8 h-8 text-center text-slate-600 ${button === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-300"} ${typeof button !== "number" ? "cursor-default" : "cursor-pointer"}`}>
            {button}
          </button>))}
    </div>);
};
exports.default = Paginator;
