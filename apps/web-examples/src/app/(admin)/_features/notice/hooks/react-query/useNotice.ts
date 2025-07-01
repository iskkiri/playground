import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createNoticeApi,
  deleteNoticeApi,
  getNoticeDetailApi,
  getNoticeListApi,
  updateNoticeApi,
} from '../../api/notice.api';
import type { GetNoticeListRequestDto } from '../../api/dtos/getNoticeList.dto';
import { useRouter } from 'next/navigation';
import useOnErrorAlert from '@/_hooks/useOnErrorAlert';

const ADMIN_NOTICE_LIST = 'ADMIN_NOTICE_LIST';
const ADMIN_NOTICE_DETAIL = 'ADMIN_NOTICE_DETAIL';

// 공지사항 목록 조회
export function useGetNoticeList({
  isShow,
  searchType,
  keyword,
  page,
  pageSize,
}: GetNoticeListRequestDto) {
  return useQuery({
    queryKey: [ADMIN_NOTICE_LIST, { isShow, searchType, keyword, page, pageSize }],
    queryFn: () =>
      getNoticeListApi({
        ...(isShow !== undefined && { isShow }),
        ...(searchType && { searchType }),
        ...(keyword && { keyword }),
        page,
        pageSize,
      }),
    placeholderData: keepPreviousData,
  });
}

const getNoticeDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [ADMIN_NOTICE_DETAIL, { id }],
    queryFn: () => getNoticeDetailApi(id),
    enabled: !!id,
  });

// 공지사항 상세 조회
export function useGetNoticeDetail(id: string) {
  return useQuery(getNoticeDetailQueryOptions(id));
}

// 공지사항 등록
export function useCreateNotice() {
  const router = useRouter();
  const { onError } = useOnErrorAlert();

  return useMutation({
    mutationFn: createNoticeApi,
    onSuccess: ({ id }) => {
      router.replace(`/admin/notice/${id}/edit`);
    },
    onError,
  });
}

// 공지사항 수정
export function useUpdateNotice() {
  const queryClient = useQueryClient();
  const { onError } = useOnErrorAlert();

  return useMutation({
    mutationFn: updateNoticeApi,
    onSuccess: (updatedNotice) => {
      queryClient.setQueryData(
        getNoticeDetailQueryOptions(updatedNotice.id).queryKey,
        updatedNotice
      );

      window.alert('공지사항 수정 완료');
    },
    onError,
  });
}

// 공지사항 삭제
export function useDeleteNotices() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNoticeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_NOTICE_LIST] });
    },
  });
}
