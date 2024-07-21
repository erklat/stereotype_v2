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
  children: ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export const Column: React.FC<ColumnProps> = ({ children, span = 12 }) => {
  const columnSpan = `col-span-${3}`;
  return <div className={`${columnSpan} mt-10`}>{children}</div>;
};

const Layout = {
  Container,
  Row,
  Column,
};

export default Layout;
