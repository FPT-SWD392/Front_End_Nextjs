import { FC, ReactNode } from 'react';

// project imports

interface Props {
  children: ReactNode;
}

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout: FC<Props> = ({ children }) => (
  <>
    {children}
  </>
);

export default MinimalLayout;
