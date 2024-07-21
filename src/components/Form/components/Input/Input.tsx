import { FieldError } from "react-hook-form";

type TInputProps = {
  htmlAttrs?: {
    name: string;
    label?: string;
  };
  children: React.ReactNode | React.ReactNode[];
  fieldActive: boolean;
  error?: string;
};

const Input: React.FC<TInputProps> = ({
  htmlAttrs,
  children,
  fieldActive,
  error,
}) => {
  const { label, name } = { ...htmlAttrs };

  return (
    <div
      className={`  
            min-h-12
            text-black
            grow
        `}
    >
      <div
        className={`
            relative 
            border
            border-solid
            border-black
            rounded
        `}
      >
        {children}
        {label && (
          <label
            htmlFor={name}
            className={`
            absolute
            transition-all	
            -translate-y-1/2
            px-2
            bg-white
            pointer-events-none	
            ${fieldActive ? `top-0 left-2 text-xs` : `top-1/2 left-4 `}
        `}
          >
            {label}
          </label>
        )}
      </div>

      {!!error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
