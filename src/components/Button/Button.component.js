"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button = ({ href, submit, disabled, label, full, onClick = () => { }, }) => {
    if (href)
        return;
    return (<button {...(submit ? { type: "submit" } : { type: "button", onClick })} disabled={disabled} className={`
        button
        rounded-md
        bg-[#1D4ED8]
        text-white
        py-3
        cursor-pointer
        ${full ? `w-full` : ``}
        ${disabled ? `bg-opacity-75	` : ``}
        `}>
      {label}
    </button>);
};
exports.default = Button;
