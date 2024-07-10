import { useAppSelector } from "@/state-management/hooks";
import { getQueryParams } from "@/utils/ProductsManager/ProductsManager.selectors";

const Search = ({ onChange }) => {
  const { q } = useAppSelector(getQueryParams);

  return (
    <>
      <input type="text" onChange={(e) => onChange(e.target.value)} value={q} />
    </>
  );
};

export default Search;
