"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("@/state-management/hooks");
const ProductsManager_selectors_1 = require("@/utils/ProductsManager/ProductsManager.selectors");
const Search = ({ onChange }) => {
    const { q } = (0, hooks_1.useAppSelector)(ProductsManager_selectors_1.getQueryParams);
    return (<>
      <input type="text" onChange={(e) => onChange(e.target.value)} value={q}/>
    </>);
};
exports.default = Search;
