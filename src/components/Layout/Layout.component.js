"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = exports.Row = exports.Container = void 0;
const Container = ({ children }) => {
    return (<div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>);
};
exports.Container = Container;
const Row = ({ children }) => {
    return <div className="grid grid-cols-12 gap-4">{children}</div>;
};
exports.Row = Row;
const Column = ({ children, span = 12 }) => {
    const columnSpan = `col-span-${3}`;
    return <div className={`${columnSpan} mt-10`}>{children}</div>;
};
exports.Column = Column;
const Layout = {
    Container: exports.Container,
    Row: exports.Row,
    Column: exports.Column,
};
exports.default = Layout;
