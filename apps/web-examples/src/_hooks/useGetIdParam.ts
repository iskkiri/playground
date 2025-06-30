import { useMemo } from 'react';
import { useParams } from 'next/navigation';

export default function useGetIdParam() {
  const params = useParams<{ id: string }>();
  const id = useMemo(() => params.id, [params]);
  return id;
}
