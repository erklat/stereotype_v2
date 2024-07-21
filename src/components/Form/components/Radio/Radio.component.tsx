import React from "react";
import Svg from "@/components/Svg/Svg.component";

interface Option {
  value: string;
  label: string;
}

interface RadioProps {
  checked: boolean;
  option: Option;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<RadioProps> = ({ checked, option, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label
        className="flex items-center cursor-pointer"
        htmlFor={`radio_${option.value}`}
      >
        <input
          id={`radio_${option.value}`}
          type="radio"
          name="sort"
          checked={checked}
          onChange={onChange}
          value={option.value}
          className="hidden"
          aria-label={option.label}
        />

        {!checked ? <Svg icon="circle" /> : <Svg icon="circleChecked" />}

        <span className="ml-2">{option.label}</span>
      </label>
    </div>
  );
};

export default Radio;
