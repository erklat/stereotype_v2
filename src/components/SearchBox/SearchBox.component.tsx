import React, { useState } from "react";
import Svg from "@/components/Svg/Svg.component";
import classNames from "classnames";

const SearchBox: React.FC = ({ onChange, value }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className="block relative text-slate-700 md:mr-4 md:ml-0 md:my-0">
      <input
        id="search-input"
        type="text"
        onChange={onChange}
        className={classNames(
          `block transition-all duration-300 h-8 rounded-full outline-none`,
          {
            [isFocused ? "w-40" : "w-8"]: true,
            [isFocused ? "pl-2 pr-9" : "p-0"]: true,
            [isFocused ? "-indent-96" : "-indent-0"]: true,
          }
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
      />
      <label htmlFor="search-input" aria-label="What are you looking for">
        <div className="text-white flex justify-center items-center w-8 h-8 mr-0 absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none rounded-full bg-blue-500">
          <Svg icon="search" />
        </div>
      </label>
    </div>
  );
};

export default SearchBox;
