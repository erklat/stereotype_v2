import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

interface RowProps {
  children: ReactNode;
}

export const Row: React.FC<RowProps> = ({ children }) => {
  return <div className="grid grid-cols-12 gap-4">{children}</div>;
};

interface ColumnProps {
  children: React.ReactNode;
  span?: number;
  smSpan?: number;
  mdSpan?: number;
  lgSpan?: number;
  xlSpan?: number;
  xxlSpan?: number;
}

export const Column: React.FC<ColumnProps> = ({
  children,
  span = 12,
  smSpan,
  mdSpan,
  lgSpan,
  xlSpan,
  xxlSpan,
}) => {
  const getColumnSpanClass = (span: number | undefined, prefix: string = "") =>
    span ? `${prefix}col-span-${span} ` : "";

  const responsiveClasses = [
    getColumnSpanClass(span),
    getColumnSpanClass(smSpan, "sm:"),
    getColumnSpanClass(mdSpan, "md:"),
    getColumnSpanClass(lgSpan, "lg:"),
    getColumnSpanClass(xlSpan, "xl:"),
    getColumnSpanClass(xxlSpan, "2xl:"),
  ].join("");

  return <div className={responsiveClasses}>{children}</div>;
};

const Layout = {
  Container,
  Row,
  Column,
};

export default Layout;
