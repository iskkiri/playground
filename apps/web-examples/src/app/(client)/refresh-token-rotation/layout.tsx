'use client';

import InterceptorInitialization from './_components/InterceptorInitialization';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InterceptorInitialization />
      {children}
    </>
  );
}
