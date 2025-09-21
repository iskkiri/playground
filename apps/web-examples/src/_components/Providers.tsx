'use client';
import 'jotai-devtools/styles.css';

import { type PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/_lib/react-query';
import { Provider } from 'jotai';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import GlobalInitialization from './GlobalInitialization';
import { ModalProvider } from 'react-use-hook-modal';
import useModalLifeCycle from '@/_hooks/useModalLifeCycle';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

export default function Providers({ children }: PropsWithChildren) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  const { onAfterOpen, onAfterClose } = useModalLifeCycle();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <ModalProvider onAfterOpen={onAfterOpen} onAfterClose={onAfterClose} clearTime={300}>
            <NuqsAdapter>
              <Toaster className="flex justify-center" />
              <GlobalInitialization />

              {children}
            </NuqsAdapter>
          </ModalProvider>

          <JotaiDevTools isInitialOpen={false} position="bottom-left" />
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
