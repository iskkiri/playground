import { nextClient } from '@/_api/next-client';
import type { GetPopupListRequestDto, PopupListItemData } from './dtos/getPopupList.dto';
import type { PaginationResponseDto } from '@/_api/dtos/pagination.dto';
import type { CreatePopupRequestDto } from './dtos/createPopup.dto';
import type { UpdatePopupRequestDto } from './dtos/updatePopup.dto';
import type { PopupDetailData } from './dtos/getPopupDetail.dto';

// 팝업 목록 조회
export async function getPopupListApi(params: GetPopupListRequestDto) {
  const { data } = await nextClient.get<PaginationResponseDto<PopupListItemData>>('/admin/popup', {
    params,
  });
  return data;
}

// 팝업 상세 조회
export async function getPopupDetailApi(id: string) {
  const { data } = await nextClient.get<PopupDetailData>(`/admin/popup/${id}`);
  return data;
}

// 팝업 생성
export async function createPopupApi(payload: CreatePopupRequestDto) {
  const { data } = await nextClient.post<PopupDetailData>('/admin/popup', payload);
  return data;
}

// 팝업 수정
export async function updatePopupApi({ id, ...payload }: UpdatePopupRequestDto) {
  const { data } = await nextClient.put<PopupDetailData>(`/admin/popup/${id}`, payload);
  return data;
}

// 팝업 삭제
export async function deletePopupsApi(idList: string[]) {
  const { data } = await nextClient.delete<string[]>('/admin/popup', {
    data: { idList },
  });
  return data;
}

// 팝업 노출 설정 및 순서 변경
export async function updatePopupOrderApi(idList: string[]) {
  const { data } = await nextClient.put<PopupDetailData[]>('/admin/popup', {
    idList,
  });
  return data;
}
