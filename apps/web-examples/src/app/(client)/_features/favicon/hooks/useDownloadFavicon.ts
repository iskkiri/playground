import { useCallback } from 'react';
import type { DownloadFaviconParams } from '../types/favicon.types';

export default function useDownloadFavicon() {
  const onDownloadFavicon = useCallback(
    ({ dataUrl, filename }: DownloadFaviconParams) =>
      () => {
        // 임시 다운로드 링크 생성
        const link = document.createElement('a');
        link.download = filename; // 다운로드될 파일명 설정
        link.href = dataUrl; // Base64 데이터 URL 설정
        link.click(); // 프로그래밍적으로 클릭하여 다운로드 실행
      },
    []
  );

  return {
    onDownloadFavicon,
  };
}
