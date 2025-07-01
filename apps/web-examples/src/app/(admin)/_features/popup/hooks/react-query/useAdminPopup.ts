import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createPopupApi,
  deletePopupsApi,
  getPopupDetailApi,
  getPopupListApi,
  updatePopupApi,
  updatePopupOrderApi,
} from '../../api/popup.api';
import type { GetPopupListRequestDto } from '../../api/dtos/getPopupList.dto';
import { useRouter } from 'next/navigation';
import useOnErrorAlert from '@/_hooks/useOnErrorAlert';
import { useAlertModal } from '@/_hooks/useDialogModals';

const ADMIN_POPUP_LIST = 'ADMIN_POPUP_LIST';
const ADMIN_POPUP_DETAIL = 'ADMIN_POPUP_DETAIL';

// 팝업 목록 조회
export function useGetPopupList({
  page,
  pageSize,
  isShow,
  searchType,
  keyword,
}: GetPopupListRequestDto) {
  return useQuery({
    queryKey: [ADMIN_POPUP_LIST, { page, pageSize, isShow, searchType, keyword }],
    queryFn: () =>
      getPopupListApi({
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

// 팝업 상세 조회
export function useGetPopupDetail(id: string) {
  return useQuery({
    queryKey: [ADMIN_POPUP_DETAIL, { id }],
    queryFn: () => getPopupDetailApi(id),
    enabled: !!id,
  });
}

// 팝업 생성
export function useCreatePopup() {
  const router = useRouter();
  const { onError } = useOnErrorAlert();

  return useMutation({
    mutationFn: createPopupApi,
    onSuccess: ({ id }) => {
      router.replace(`/admin/popup/${id}/edit`);
    },
    onError,
  });
}

// 팝업 수정
export function useUpdatePopup() {
  const queryClient = useQueryClient();
  const { onError } = useOnErrorAlert();
  const { openAlertModal, closeAlertModal } = useAlertModal();

  return useMutation({
    mutationFn: updatePopupApi,
    onSuccess: (updatedPopup) => {
      queryClient.setQueryData([ADMIN_POPUP_DETAIL, { id: updatedPopup.id }], updatedPopup);

      openAlertModal({
        title: '팝업 수정 완료',
        content: '팝업 수정이 완료되었습니다.',
        onClose: closeAlertModal,
      });
    },
    onError,
  });
}

// 팝업 삭제
export function useDeletePopupsMutation() {
  const queryClient = useQueryClient();
  const { onError } = useOnErrorAlert();

  return useMutation({
    mutationFn: deletePopupsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_POPUP_LIST] });
    },
    onError,
  });
}

// 팝업 노출 설정 및 순서 변경
export function useUpdatePopupOrder() {
  const queryClient = useQueryClient();
  const { openAlertModal, closeAlertModal } = useAlertModal();
  const { onError } = useOnErrorAlert();

  return useMutation({
    mutationFn: updatePopupOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_POPUP_LIST] });
      openAlertModal({
        title: '안내',
        content: '팝업 순서 변경이 완료되었습니다.',
        onClose: closeAlertModal,
      });
    },
    onError,
  });
}
