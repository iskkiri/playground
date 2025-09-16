import { nextClient } from '@/_api/next-client';
import type { PaginationResponseDto } from '@/_api/dtos/pagination.dto';
import type { BannerListItemData, GetBannerListRequestDto } from './dtos/getBannerList.dto';
import type { BannerDetailData } from './dtos/getBannerDetail.dto';
import type { CreateBannerRequestDto } from './dtos/createBanner.dto';
import type { UpdateBannerRequestDto } from './dtos/updateBanner.dto';

// 배너 목록 조회
export async function getBannerListApi(params: GetBannerListRequestDto) {
  const { data } = await nextClient.get<PaginationResponseDto<BannerListItemData>>(
    '/admin/banner',
    {
      params,
    }
  );
  return data;
}

// 배너 상세 조회
export async function getBannerDetailApi(id: string) {
  const { data } = await nextClient.get<BannerDetailData>(`/admin/banner/${id}`);
  return data;
}

// 배너 생성
export async function createBannerApi(payload: CreateBannerRequestDto) {
  const { data } = await nextClient.post<BannerDetailData>('/admin/banner', payload);
  return data;
}

// 배너 수정
export async function updateBannerApi({ id, ...payload }: UpdateBannerRequestDto) {
  const { data } = await nextClient.put<BannerDetailData>(`/admin/banner/${id}`, payload);
  return data;
}

// 배너 삭제
export async function deleteBannersApi(idList: string[]) {
  const { data } = await nextClient.delete<string[]>('/admin/banner', {
    data: { idList },
  });
  return data;
}

// 배너 노출 설정 및 순서 변경
export async function updateBannerOrderApi(idList: string[]) {
  const { data } = await nextClient.put<BannerDetailData[]>('/admin/banner', {
    idList,
  });
  return data;
}
