import { type ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <main className='mx-auto w-full max-w-3xl px-2.5 md:max-w-screen-xl md:px-20'>
      {children}
    </main>
  );
};

export default Wrapper;
