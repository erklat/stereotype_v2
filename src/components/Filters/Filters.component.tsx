"use client";

import { useAppSelector, useAppDispatch } from "@/state-management/hooks";
import {
  getProductCategories,
  getMinMaxProductPrices,
  getQueryParams,
} from "@/utils/ProductsManager/ProductsManager.selectors";
import { actions as productActions } from "@/utils/ProductsManager/ProductsManager.reducer";
import Dropdown from "@/components/Dropdown/Dropdown.component";
import Radio from "@/components/Form/components/Radio/Radio.component";
import Svg from "@/components/Svg/Svg.component";
import MultiSelect from "@/components/Form/components/MultiSelect/Multiselect.component";
import RangeSlider from "@/components/Form/components/RangeSlider/RangeSlider.component";
import SearchBox from "@/components/SearchBox/SearchBox.component";
import { Container, Row } from "@/components/Layout/Layout.component";
import Button from "@/components/Button/Button.component";

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
  const queryParams = useAppSelector(getQueryParams);
  const dispatch = useAppDispatch();

  const onFiltersChange = (data) => {
    dispatch({
      type: productActions.STORE_PRODUCT_FILTERS,
      response: data,
    });
  };

  console.log(queryParams);

  return (
    <Container>
      <Row>
        <div className="flex gap-3">
          <div>
            <Dropdown trigger={<Svg icon="sort" />}>
              <div>
                {options.map((option) => (
                  <Radio
                    key={option.value}
                    option={option}
                    checked={
                      option.value ===
                      `${queryParams.sortBy}-${queryParams.sortDirection}`
                    }
                    onChange={(e) => {
                      const [sortBy, sortDirection] = e.target.value.split("-");
                      onFiltersChange({ sortBy, sortDirection });
                    }}
                  />
                ))}
              </div>
            </Dropdown>
          </div>
          <div>
            <Dropdown trigger={<Svg icon="filter" />}>
              <div className="w-96">
                <MultiSelect
                  options={productCategories.map((option) => ({
                    value: option.slug,
                    label: option.name,
                  }))}
                  selectedOptions={queryParams?.category}
                  onChange={(category) => {
                    onFiltersChange({ category });
                  }}
                />
              </div>
            </Dropdown>
          </div>

          <div>
            <Dropdown trigger={<Svg icon="price" />}>
              <div className={`w-96 p-6`}>
                <RangeSlider
                  min={minPrice}
                  max={maxPrice}
                  value={
                    queryParams?.priceRange?.length
                      ? queryParams.priceRange
                      : [minPrice, maxPrice]
                  }
                  onChange={(val) => {
                    console.log(val);
                    onFiltersChange({ priceRange: val });
                  }}
                />
              </div>
            </Dropdown>
          </div>

          <div>
            <Dropdown trigger={<Svg icon="sort" />}>
              <div>
                {[10, 20, 30]
                  .map((v) => ({ label: `${v}`, value: v }))
                  .map((option) => (
                    <Radio
                      key={option.value}
                      option={option}
                      checked={option.value === queryParams.perPage}
                      onChange={(e) =>
                        onFiltersChange({ perPage: Number(e.target.value) })
                      }
                    />
                  ))}
              </div>
            </Dropdown>
          </div>

          <div>
            <SearchBox
              onChange={(q) => onFiltersChange({ q })}
              value={queryParams?.q || ""}
            />
          </div>
        </div>
      </Row>
      <Row>
        Active Filters:{" "}
        {`${queryParams.sortBy}-${queryParams.sortDirection}` !==
          "title-asc" && (
          <Button
            label={
              options.find(
                (option) =>
                  option.value ===
                  `${queryParams.sortBy}-${queryParams.sortDirection}`
              )?.label || ""
            }
          />
        )}
      </Row>
    </Container>
  );
};

export default Filters;
