"use client";

import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
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
import { TFilterParams, TProductCategory } from "@/utils/ProductsManager/types";

const options = [
  { label: "Title ascending", value: "title-asc" },
  { label: "Title descending", value: "title-desc" },
  { label: "Price ascending", value: "price-asc" },
  { label: "Price descending", value: "price-desc" },
];

const Filters = () => {
  const productCategories = useAppSelector(getProductCategories);
  const { minPrice, maxPrice } = useAppSelector(getMinMaxProductPrices);
  const queryParams = useAppSelector(getQueryParams);
  const dispatch = useAppDispatch();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const onFiltersChange = (data: TFilterParams) => {
    dispatch({
      type: productActions.STORE_PRODUCT_FILTERS,
      response: data,
    });
  };

  return (
    <>
      <Container>
        <div className="mb-6">
          <div className="hidden lg:flex gap-3 mb-10">
            <div>
              <Dropdown
                trigger={
                  <>
                    Sort by: <Svg icon="sort" />
                  </>
                }
              >
                <div className="gap-4 w-48 flex flex-col">
                  {options.map((option) => (
                    <Radio
                      key={option.value}
                      option={option}
                      checked={
                        option.value ===
                        `${queryParams.sortBy}-${queryParams.sortDirection}`
                      }
                      onChange={(e) => {
                        const [sortBy, sortDirection] =
                          e.target.value.split("-");
                        onFiltersChange({ sortBy, sortDirection });
                      }}
                    />
                  ))}
                </div>
              </Dropdown>
            </div>
            <div>
              <Dropdown
                trigger={
                  <>
                    Categories:
                    <Svg icon="filter" />
                  </>
                }
              >
                <div className="w-96">
                  <MultiSelect
                    options={productCategories.map(
                      (option: TProductCategory) => ({
                        value: option.slug,
                        label: option.name,
                      })
                    )}
                    selectedOptions={queryParams?.category}
                    onChange={(category) => {
                      onFiltersChange({ category });
                    }}
                  />
                </div>
              </Dropdown>
            </div>

            <div>
              <Dropdown
                trigger={
                  <>
                    Price:
                    <Svg icon="price" />
                  </>
                }
              >
                <div className={`w-96 p-6`}>
                  <RangeSlider
                    min={minPrice}
                    max={maxPrice}
                    value={
                      queryParams?.priceRange?.length
                        ? queryParams.priceRange
                        : [minPrice, maxPrice]
                    }
                    onChange={(val: number | Number[]) =>
                      onFiltersChange({ priceRange: val })
                    }
                  />
                </div>
              </Dropdown>
            </div>

            <div>
              <Dropdown
                trigger={
                  <>
                    Per page: <Svg icon="sort" />
                  </>
                }
              >
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

          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="rounded-full w-10 h-10 bg-blue-500 text-white flex justify-center items-center"
            >
              <Svg icon="search" />
            </button>
          </div>
        </div>

        {/* 
        // TODO: implement active filters

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
      */}
      </Container>

      <Transition
        as={Fragment}
        show={showMobileFilters}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-full"
      >
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-white z-50 text-slate-500 p-4 flex flex-col gap-6">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="rounded-full w-8 h-8 bg-blue-500 text-white self-end"
          >
            X
          </button>
          <div>
            Sort by:
            <div className="gap-4 w-48 flex flex-wrap mt-2">
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
          </div>
          <div>
            Categories:
            <div className="mt-2">
              <MultiSelect
                options={productCategories.map((option: TProductCategory) => ({
                  value: option.slug,
                  label: option.name,
                }))}
                selectedOptions={queryParams?.category}
                onChange={(category) => {
                  onFiltersChange({ category });
                }}
              />
            </div>
          </div>
          <div>
            Price
            <div className="mt-2">
              <RangeSlider
                min={minPrice}
                max={maxPrice}
                value={
                  queryParams?.priceRange?.length
                    ? queryParams.priceRange
                    : [minPrice, maxPrice]
                }
                onChange={(val: number | Number[]) =>
                  onFiltersChange({ priceRange: val })
                }
              />
            </div>
          </div>
          <div>
            Items per page:
            <div className="mt-2">
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
          </div>
          <div>
            <SearchBox
              onChange={(q) => onFiltersChange({ q })}
              value={queryParams?.q || ""}
            />
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Filters;
