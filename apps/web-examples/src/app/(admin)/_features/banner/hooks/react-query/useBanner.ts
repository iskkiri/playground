import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createBannerApi,
  deleteBannersApi,
  getBannerDetailApi,
  getBannerListApi,
  updateBannerApi,
  updateBannerOrderApi,
} from '../../api/banner.api';
import type { GetBannerListRequestDto } from '../../api/dtos/getBannerList.dto';
import useOnErrorAlert from '@/_hooks/useOnErrorAlert';
import { useRouter } from 'next/navigation';
import { useAlertModal } from '@/_hooks/useDialogModals';

const ADMIN_BANNER_LIST = 'ADMIN_BANNER_LIST';
const ADMIN_BANNER_DETAIL = 'ADMIN_BANNER_DETAIL';

// 배너 목록 조회
export function useGetBannerList({
  page,
  pageSize,
  isShow,
  searchType,
  keyword,
}: GetBannerListRequestDto) {
  return useQuery({
    queryKey: [ADMIN_BANNER_LIST, { page, pageSize, isShow, searchType, keyword }],
    queryFn: () =>
      getBannerListApi({
        page,
        pageSize,
        ...(isShow !== undefined && { isShow }),
        ...(!!searchType && { searchType }),
        ...(!!keyword && { keyword }),
      }),
    placeholderData: keepPreviousData,
    select: (data) => {
      return {
        ...data,
        content: data.content.sort((a, b) => {
          if (a.order === null && b.order === null) return 0;
          if (a.order === null) return 1;
          if (b.order === null) return -1;
          return a.order - b.order;
        }),
      };
    },
  });
}

const getBannerDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [ADMIN_BANNER_DETAIL, { id }],
    queryFn: () => getBannerDetailApi(id),
    enabled: !!id,
  });

// 배너 상세 조회
export function useGetBannerDetail(id: string) {
  return useQuery(getBannerDetailQueryOptions(id));
}

// 배너 생성
export function useCreateBanner() {
  const router = useRouter();
  const { onError } = useOnErrorAlert();

  return useMutation({
    mutationFn: createBannerApi,
    onSuccess: ({ id }) => {
      router.replace(`/admin/banner/${id}/edit`);
    },
    onError,
  });
}

// 배너 수정
export function useUpdateBanner() {
  const queryClient = useQueryClient();
  const { onError } = useOnErrorAlert();
  const { openAlertModal, closeAlertModal } = useAlertModal();

  return useMutation({
    mutationFn: updateBannerApi,
    onSuccess: (updatedBanner, { id }) => {
      queryClient.setQueryData(getBannerDetailQueryOptions(id).queryKey, updatedBanner);

      openAlertModal({
        title: '배너 수정 완료',
        content: '배너 수정이 완료되었습니다.',
        onClose: closeAlertModal,
      });
    },
    onError,
  });
}

// 배너 삭제
export function useDeleteBannersMutation() {
  const queryClient = useQueryClient();
  const { onError } = useOnErrorAlert();

  return useMutation({
    mutationFn: deleteBannersApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_BANNER_LIST] });
    },
    onError,
  });
}

// 배너 노출 설정 및 순서 변경
export function useUpdateBannerOrder() {
  const queryClient = useQueryClient();
  const { openAlertModal, closeAlertModal } = useAlertModal();
  const { onError } = useOnErrorAlert();

  return useMutation({
    mutationFn: updateBannerOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_BANNER_LIST] });
      openAlertModal({
        title: '안내',
        content: '배너 순서 변경이 완료되었습니다.',
        onClose: closeAlertModal,
      });
    },
    onError,
  });
}
