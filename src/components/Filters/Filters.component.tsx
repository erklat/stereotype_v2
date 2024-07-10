"use client";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useAppSelector, useAppDispatch } from "@/state-management/hooks";
import {
  getProductCategories,
  getMinMaxProductPrices,
} from "@/utils/ProductsManager/ProductsManager.selectors";
import { actions as productActions } from "@/utils/ProductsManager/ProductsManager.reducer";

const options = [
  { label: "Naziv uzlazno", value: "title-asc" },
  { label: "Naziv silazno", value: "title-desc" },
  { label: "Cijena uzlazno", value: "price-asc" },
  { label: "Cijena silazno", value: "price-desc" },
];

type TProps = {
  onSortChange: (arg1: string) => void;
  onCategoryChange: (arg1: string) => void;
};

const Filters = ({ onSortChange, onCategoryChange }: TProps) => {
  const productCategories = useAppSelector(getProductCategories);
  const { minPrice, maxPrice } = useAppSelector(getMinMaxProductPrices);
  const dispatch = useAppDispatch();

  console.log(productCategories);
  // console.log(minMaxProductPrice);

  const onFiltersChange = (data) => {
    dispatch({
      type: productActions.STORE_PRODUCT_FILTERS,
      response: data,
    });
  };

  return (
    <div className="flex gap-3">
      <div>
        <select
          name="cars"
          id="cars"
          onChange={(e) => {
            const [sortBy, sortDirection] = e.target.value.split("-");
            onFiltersChange({ sortBy, sortDirection });
            // onSortChange(e.target.value);
          }}
          className={`text-black`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className={`text-black`}
          onChange={(e) => onFiltersChange({ category: e.target.value })}
        >
          {productCategories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className={`w-48`}>
          <Slider
            range
            defaultValue={[minPrice, maxPrice]}
            allowCross={false}
            min={minPrice}
            max={maxPrice}
            onChange={(val) => {
              onFiltersChange({ priceRange: val });
              // console.log(val);
            }}
          />
        </div>
      </div>

      <div>
        <select
          onChange={(e) => onFiltersChange({ perPage: Number(e.target.value) })}
        >
          {[10, 20, 30].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
