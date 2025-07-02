'use client';

import { PropsWithChildren } from 'react';
import NavLink from '@repo/ui-next/NavLink/NavLink';
import { useMswInitialize } from '@/_hooks/useMsw';

export default function InfiniteScrollLayout({ children }: PropsWithChildren) {
  useMswInitialize();

  return (
    <>
      <header className="z-100 sticky top-0 h-64 border-b border-gray-50 bg-white">
        <nav className="max-w-1200 mx-auto flex h-full">
          <NavLink
            href="/infinite-scroll/virtualization"
            className="typography-p2-18r exact-active:text-primary relative flex items-center px-16 text-gray-900"
          >
            {({ isExactActive }) => (
              <>
                <span>Virtualization</span>
                {isExactActive && (
                  <div className="bg-primary absolute bottom-0 left-0 right-0 h-2 w-full" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            href="/infinite-scroll/virtualization/grid"
            className="typography-p2-18r exact-active:text-primary relative flex items-center px-16 text-gray-900"
          >
            {({ isExactActive }) => (
              <>
                <span>Virtualization Grid</span>
                {isExactActive && (
                  <div className="bg-primary absolute bottom-0 left-0 right-0 h-2 w-full" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            href="/infinite-scroll/grid"
            className="typography-p2-18r exact-active:text-primary relative flex items-center px-16 text-gray-900"
          >
            {({ isExactActive }) => (
              <>
                <span>Grid</span>
                {isExactActive && (
                  <div className="bg-primary absolute bottom-0 left-0 right-0 h-2 w-full" />
                )}
              </>
            )}
          </NavLink>
        </nav>
      </header>

      {children}
    </>
  );
}
