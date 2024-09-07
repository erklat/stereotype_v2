import { useState, forwardRef } from "react";
import debounce from "lodash/debounce";
import { UseFormGetFieldState, FieldValues, FieldError } from "react-hook-form";

import Input from "@/components/Form/components/Input/Input";

type TInputProps<T extends FieldValues> = {
  label: string;
  name: keyof T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onBlur: () => void;
  getFieldState: UseFormGetFieldState<T>;
};

const Text = forwardRef<HTMLInputElement, TInputProps<FieldValues>>(
  (props, ref) => {
    const [focused, setFocused] = useState<boolean>(false);
    const { label, name, onChange, value, onBlur, getFieldState } = {
      ...props,
    };
    const { error } = { ...getFieldState(name) };
    const errorMessage = (error as FieldError)?.message ?? "";

    return (
      <Input
        htmlAttrs={{ name, label }}
        fieldActive={!!focused || !!value}
        error={errorMessage}
      >
        <input
          ref={ref}
          name={name}
          type="text"
          onChange={debounce(onChange, 500)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur();
          }}
          className={`
            px-4
            py-3
            w-full
            h-full
            outline-none
        `}
        />
      </Input>
    );
  }
);

Text.displayName = "Text";

export default Text;
