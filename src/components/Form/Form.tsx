import React from "react";

type TFormElementProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const FormRow: React.FC<TFormElementProps> = ({ children }) => {
  return (
    <div
      className={`
        form__row
        flex
        flex-col
        md:flex-row
    `}
    >
      {children}
    </div>
  );
};

export const FormColumn: React.FC<TFormElementProps> = ({ children }) => {
  return (
    <div
      className={`
        `}
    >
      {children}
    </div>
  );
};

type TFormProps = TFormElementProps & {
  onSubmit: (arg0: any) => void;
};

const Form: React.FC<TFormProps> = ({ children, onSubmit /*action */ }) => {
  return (
    <form
      onSubmit={onSubmit}
      //action={action}
      className={`
        form
        flex
        flex-col
        gap-8
    `}
    >
      {children}
    </form>
  );
};

export default Form;
