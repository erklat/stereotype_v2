"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("@/state-management/hooks");
const ProductsManager_selectors_1 = require("@/utils/ProductsManager/ProductsManager.selectors");
const ProductsManager_reducer_1 = require("@/utils/ProductsManager/ProductsManager.reducer");
const Dropdown_component_1 = __importDefault(require("@/components/Dropdown/Dropdown.component"));
const Radio_component_1 = __importDefault(require("@/components/Form/components/Radio/Radio.component"));
const Svg_component_1 = __importDefault(require("@/components/Svg/Svg.component"));
const Multiselect_component_1 = __importDefault(require("@/components/Form/components/MultiSelect/Multiselect.component"));
const RangeSlider_component_1 = __importDefault(require("@/components/Form/components/RangeSlider/RangeSlider.component"));
const SearchBox_component_1 = __importDefault(require("@/components/SearchBox/SearchBox.component"));
const Layout_component_1 = require("@/components/Layout/Layout.component");
const options = [
    { label: "Title ascending", value: "title-asc" },
    { label: "Title descending", value: "title-desc" },
    { label: "Price ascending", value: "price-asc" },
    { label: "Price descending", value: "price-desc" },
];
const Filters = () => {
    var _a;
    const productCategories = (0, hooks_1.useAppSelector)(ProductsManager_selectors_1.getProductCategories);
    const { minPrice, maxPrice } = (0, hooks_1.useAppSelector)(ProductsManager_selectors_1.getMinMaxProductPrices);
    const queryParams = (0, hooks_1.useAppSelector)(ProductsManager_selectors_1.getQueryParams);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const onFiltersChange = (data) => {
        dispatch({
            type: ProductsManager_reducer_1.actions.STORE_PRODUCT_FILTERS,
            response: data,
        });
    };
    return (<Layout_component_1.Container>
      <Layout_component_1.Row>
        <div className="flex gap-3">
          <div>
            <Dropdown_component_1.default trigger={<Svg_component_1.default icon="sort"/>}>
              <div className="gap-4 w-48 flex flex-col">
                {options.map((option) => (<Radio_component_1.default key={option.value} option={option} checked={option.value ===
                `${queryParams.sortBy}-${queryParams.sortDirection}`} onChange={(e) => {
                const [sortBy, sortDirection] = e.target.value.split("-");
                onFiltersChange({ sortBy, sortDirection });
            }}/>))}
              </div>
            </Dropdown_component_1.default>
          </div>
          <div>
            <Dropdown_component_1.default trigger={<Svg_component_1.default icon="filter"/>}>
              <div className="w-96">
                <Multiselect_component_1.default options={productCategories.map((option) => ({
            value: option.slug,
            label: option.name,
        }))} selectedOptions={queryParams === null || queryParams === void 0 ? void 0 : queryParams.category} onChange={(category) => {
            onFiltersChange({ category });
        }}/>
              </div>
            </Dropdown_component_1.default>
          </div>

          <div>
            <Dropdown_component_1.default trigger={<Svg_component_1.default icon="price"/>}>
              <div className={`w-96 p-6`}>
                <RangeSlider_component_1.default min={minPrice} max={maxPrice} value={((_a = queryParams === null || queryParams === void 0 ? void 0 : queryParams.priceRange) === null || _a === void 0 ? void 0 : _a.length)
            ? queryParams.priceRange
            : [minPrice, maxPrice]} onChange={(val) => onFiltersChange({ priceRange: val })}/>
              </div>
            </Dropdown_component_1.default>
          </div>

          <div>
            <Dropdown_component_1.default trigger={<Svg_component_1.default icon="sort"/>}>
              <div>
                {[10, 20, 30]
            .map((v) => ({ label: `${v}`, value: v }))
            .map((option) => (<Radio_component_1.default key={option.value} option={option} checked={option.value === queryParams.perPage} onChange={(e) => onFiltersChange({ perPage: Number(e.target.value) })}/>))}
              </div>
            </Dropdown_component_1.default>
          </div>

          <div>
            <SearchBox_component_1.default onChange={(q) => onFiltersChange({ q })} value={(queryParams === null || queryParams === void 0 ? void 0 : queryParams.q) || ""}/>
          </div>
        </div>
      </Layout_component_1.Row>

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
    </Layout_component_1.Container>);
};
exports.default = Filters;
