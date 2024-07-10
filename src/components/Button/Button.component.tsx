"use client";

const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={() => {
        console.log("clicking");
        onClick();
      }}
    >
      {label}
    </button>
  );
};

export default Button;
