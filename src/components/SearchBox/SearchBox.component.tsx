import React, { useState, useEffect, useRef } from "react";
import Svg from "@/components/Svg/Svg.component";
import classNames from "classnames";
import debounce from "lodash/debounce";

interface SearchBoxProps {
  onChange: (value: string) => void;
  value: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onChange, value }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value);
  const debouncedOnChange = useRef(debounce(onChange, 300)).current;

  useEffect(() => {
    debouncedOnChange(inputValue);
  }, [inputValue, debouncedOnChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="block relative text-slate-700 md:mr-4 md:ml-0 md:my-0">
      <input
        id="search-input"
        type="text"
        onChange={handleChange}
        className={classNames(
          `block transition-all duration-300 h-8 rounded-full outline-none`,
          {
            ["w-40 pl-4 pr-9 -indent-0"]: isFocused || !!inputValue,
            ["w-8 p-0 -indent-96"]: !(isFocused || !!inputValue),
          }
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={inputValue}
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
