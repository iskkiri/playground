import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export default function useGetNumberIdParam() {
  const params = useParams<{ id: string }>();
  const id = useMemo(() => Number(params.id), [params]);
  return id;
}
