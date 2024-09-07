import React from "react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions = [],
  onChange,
}) => {
  const handleButtonClick = (value: string) => {
    const updatedValues = selectedOptions.includes(value)
      ? selectedOptions.filter((item) => item !== value) // Remove the value if it already exists
      : [...selectedOptions, value]; // Add the value if it doesn't exist

    onChange(updatedValues);
  };

  return (
    <div
      role="group"
      aria-labelledby="multi-select-group"
      className="flex flex-wrap gap-2"
    >
      <span id="multi-select-group" className="sr-only">
        Select options
      </span>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleButtonClick(option.value)}
          className={`py-2 px-4 rounded-lg border transition-colors duration-200 focus:outline-none ${
            selectedOptions.includes(option.value)
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-blue-500 border-blue-300"
          }`}
          aria-pressed={selectedOptions.includes(option.value)}
          aria-label={option.label}
          role="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default MultiSelect;
