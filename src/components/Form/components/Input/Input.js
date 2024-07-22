"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Input = ({ htmlAttrs, children, fieldActive, error, }) => {
    const { label, name } = Object.assign({}, htmlAttrs);
    return (<div className={`  
            min-h-12
            text-black
            grow
        `}>
      <div className={`
            relative 
            
        `}>
        <div className="overflow-auto border border-solid border-black rounded">
          {children}
        </div>
        {label && (<label htmlFor={name} className={`
            absolute
            transition-all	
            -translate-y-1/2
            px-2
            bg-white
            pointer-events-none	
            ${fieldActive ? `top-0 left-2 text-xs` : `top-1/2 left-4 `}
        `}>
            {label}
          </label>)}
      </div>

      {!!error && <span className="text-xs text-red-500">{error}</span>}
    </div>);
};
exports.default = Input;
