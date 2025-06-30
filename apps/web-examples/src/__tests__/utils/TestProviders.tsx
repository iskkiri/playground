import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { NuqsTestingAdapter, type OnUrlUpdateFunction } from 'nuqs/adapters/testing';
import { ModalProvider } from 'react-use-hook-modal';

type TestingAdapterProps = {
  searchParams?: string | Record<string, string> | URLSearchParams;
  onUrlUpdate?: OnUrlUpdateFunction;
  rateLimitFactor?: number;
  resetUrlUpdateQueueOnMount?: boolean;
  children: React.ReactNode;
};

export default function TestProviders({ children, ...restProps }: TestingAdapterProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 1 * 1000, // 1 second
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ModalProvider>
          <NuqsTestingAdapter {...restProps}>{children}</NuqsTestingAdapter>
        </ModalProvider>
      </Provider>
    </QueryClientProvider>
  );
}
