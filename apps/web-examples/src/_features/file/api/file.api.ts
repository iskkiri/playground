import type { DownloadFileResponseDto } from './dtos/downloadFile.dto';
import { client } from '@/_api/client';
import type { UploadFileRequestDto, UploadFileResponseDto } from './dtos/uploadFile.dto';

// 파일 업로드
export async function uploadFileApi({ formData, category }: UploadFileRequestDto) {
  const { data } = await client.post<UploadFileResponseDto>('/file/upload', formData, {
    params: { category },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

// 브라우저에서 S3로 파일 다운로드 요청 시 CORS가 발생하므로 api route를 이용하여 우회
export async function downloadFileApi(url: string) {
  const { data } = await client.get<DownloadFileResponseDto>('/file/download', {
    params: { url },
  });
  return data;
}
