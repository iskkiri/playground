import { useEffect, useCallback } from 'react';
import { parseAsString, useQueryStates } from 'nuqs';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { AdminSearchSchema } from '../_schemas/adminSearch.schema';

interface UseAdminSearchParams {
  initialSearchType: string;
}

export default function useAdminSearch({ initialSearchType }: UseAdminSearchParams) {
  // 검색 쿼리
  const [search, setSearch] = useQueryStates(
    {
      searchType: parseAsString,
      keyword: parseAsString,
    },
    {
      history: 'push',
    }
  );

  // 검색 폼
  const form = useForm<AdminSearchSchema>({
    defaultValues: {
      searchType: '',
      keyword: '',
    },
  });
  const { reset } = form;

  // 검색 쿼리 초기화
  useEffect(() => {
    reset({
      searchType: search.searchType ?? initialSearchType,
      keyword: search.keyword ?? '',
    });
  }, [initialSearchType, reset, search.keyword, search.searchType]);

  // 검색 쿼리 적용
  const onSubmit: SubmitHandler<AdminSearchSchema> = useCallback(
    ({ searchType, keyword }) => {
      setSearch({ searchType, keyword });
    },
    [setSearch]
  );

  return {
    searchType: search.searchType ?? undefined,
    keyword: search.keyword ?? undefined,
    onSubmit: form.handleSubmit(onSubmit),
    ...form,
  };
}
