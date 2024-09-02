import classNames from "classnames";

import Loader from "@/components/Loader/Loader.component";

export enum ButtonSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  FULL = "full",
}

export enum ButtonVariation {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
  TEXT = "text",
  DESTRUCTIVE = "destructive",
}

type TButtonProps = {
  variation?: ButtonVariation;
  size?: ButtonSize;
  label: string;
  onClick?: () => void;
  submit?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

const Button: React.FC<TButtonProps> = ({
  variation = ButtonVariation.PRIMARY,
  size = ButtonSize.LARGE,
  label,
  onClick = () => {},
  submit,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      {...(submit ? { type: "submit" } : { type: "button", onClick })}
      className={classNames(`min-w-32 p-3 transition rounded-full text-label`, {
        ["px-4 py-4"]: (ButtonSize.LARGE || ButtonSize.FULL) === size,
        ["px-4 py-3"]: ButtonSize.MEDIUM === size,
        ["px-4 py-2"]: ButtonSize.SMALL === size,
        ["w-full"]: ButtonSize.FULL,
        ...(variation === ButtonVariation.PRIMARY && {
          ["bg-brand-20 shadow-none"]: loading,
          [`text-white bg-brand-60
          shadow-[inset_0_0_0_1px_rgba(0,0,0,1)]
          hover:bg-brand-70
          hover:shadow-[inset_0_0_0_0_rgba(0,0,0,1),0_4px_4px_0_rgba(0,0,0,0.25)]
          focus:bg-brand-60
          focus:shadow-[inset_0_0_0_1px_rgba(0,0,0,1),inset_0_4px_4px_0_rgba(0,0,0,.25),0_0_0_4px_rgba(114,87,255,0.30)]
          active:bg-brand-80
          active:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]`]: !loading,
        }),
        ...(variation === ButtonVariation.SECONDARY && {
          ["bg-accent-subtle shadow-none"]: loading,
          [`bg-accent-subtle text-accent-bold
          hover:bg-accent-muted
          active:bg-accent-dim
          focus:bg-accent-subtle
          focus:shadow-[0_0_0_4px_rgba(114,87,255,0.30)]`]: !loading,
        }),
        ...(variation === ButtonVariation.TERTIARY && {
          ["bg-brand-20 shadow-none"]: loading,
          [`text-accent-bold bg-white 
            shadow-[inset_0_0_0_1px_rgba(83,54,226,1)]
          hover:bg-accent-subtle
          focus:bg-white
          focus:shadow-[inset_0_0_0_1px_rgba(83,54,226,1),0_0_0_4px_rgba(114,87,255,0.30)]
          active:bg-accent-muted`]: !loading,
        }),
        ...(variation === ButtonVariation.DESTRUCTIVE && {
          ["bg-brand-20 shadow-none"]: loading,
          [`text-white bg-danger-primary 
          hover:bg-danger-secondary
          focus:bg-danger-primary
          focus:shadow-[0_0_0_4px_rgba(255,82,38,0.30)]
          active:bg-danger-tertiary`]: !loading,
        }),
      })}
      disabled={disabled || loading}
    >
      {!loading ? label : <Loader />}
    </button>
  );
};

export default Button;
