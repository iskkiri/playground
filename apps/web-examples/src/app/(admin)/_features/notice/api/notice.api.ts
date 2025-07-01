import type { GetNoticeListRequestDto, NoticeListItemData } from './dtos/getNoticeList.dto';
import type { Notice } from './dtos/getNoticeDetail.dto';
import type { CreateNoticeRequestDto } from './dtos/createNotice.dto';
import type { UpdateNoticeRequestDto } from './dtos/updateNotice.dto';
import type { PaginationResponseDto } from '@/_api/dtos/pagination.dto';
import { client } from '@/_api/client';

// 공지사항 목록 조회
export async function getNoticeListApi(params: GetNoticeListRequestDto) {
  const { data } = await client.get<PaginationResponseDto<NoticeListItemData>>('/admin/notice', {
    params,
  });
  return data;
}

// 공지사항 상세 조회
export async function getNoticeDetailApi(id: string) {
  const { data } = await client.get<Notice>(`/admin/notice/${id}`);
  return data;
}

// 공지사항 생성
export async function createNoticeApi(payload: CreateNoticeRequestDto) {
  const { data } = await client.post<Notice>('/admin/notice', payload);
  return data;
}

// 공지사항 수정
export async function updateNoticeApi({ id, ...payload }: UpdateNoticeRequestDto) {
  const { data } = await client.put<Notice>(`/admin/notice/${id}`, payload);
  return data;
}

// 공지사항 삭제
export async function deleteNoticeApi(idList: number[]) {
  const { data } = await client.delete<number[]>('/admin/notice', {
    data: { idList },
  });
  return data;
}
