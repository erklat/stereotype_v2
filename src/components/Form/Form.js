"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormColumn = exports.FormRow = void 0;
const react_1 = __importDefault(require("react"));
const FormRow = ({ children }) => {
    return (<div className={`
        form__row
        flex
        flex-col
        md:flex-row
    `}>
      {children}
    </div>);
};
exports.FormRow = FormRow;
const FormColumn = ({ children }) => {
    return (<div className={`
        `}>
      {children}
    </div>);
};
exports.FormColumn = FormColumn;
const Form = ({ children, onSubmit /*action */ }) => {
    return (<form onSubmit={onSubmit} 
    //action={action}
    className={`
        form
        flex
        flex-col
        gap-8
    `}>
      {children}
    </form>);
};
exports.default = Form;
