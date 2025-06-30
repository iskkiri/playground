import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import queryString from 'query-string';

export default function useParsedQuery() {
  const searchParams = useSearchParams();
  const parsedQuery = useMemo(
    () => queryString.parse(searchParams?.toString() ?? ''),
    [searchParams]
  );

  return parsedQuery;
}
