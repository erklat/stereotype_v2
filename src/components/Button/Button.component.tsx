type TButtonProps = {
  href?: string;
  submit?: boolean;
  disabled?: boolean;
  label: string;
  full?: boolean;
  onClick?: () => void;
};

const Button: React.FC<TButtonProps> = ({
  href,
  submit,
  disabled,
  label,
  full,
  onClick = () => {},
}) => {
  if (href) return;

  return (
    <button
      {...(submit ? { type: "submit" } : { type: "button", onClick })}
      disabled={disabled}
      className={`
        button
        rounded-md
        bg-[#1D4ED8]
        text-white
        py-3
        cursor-pointer
        ${full ? `w-full` : ``}
        ${disabled ? `bg-opacity-75	` : ``}
        `}
    >
      {label}
    </button>
  );
};

export default Button;
