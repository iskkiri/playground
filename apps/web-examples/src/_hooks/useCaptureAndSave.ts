import { useCallback, useState } from 'react';
import html2canvas, { type Options } from 'html2canvas-pro';

interface UseCaptureAndSaveParams {
  captureTargetRef?: React.RefObject<HTMLDivElement | null>;
  filename: string;
}

export default function useCaptureAndSave({ captureTargetRef, filename }: UseCaptureAndSaveParams) {
  const [isLoading, setIsLoading] = useState(false);

  const onCaptureAndSave = useCallback(async () => {
    try {
      setIsLoading(true);
      const captureTarget = captureTargetRef?.current ?? document.body;

      // https://html2canvas.hertzen.com/configuration
      const options = {
        // 캡처 품질 설정
        scale: 2, // 높은 해상도를 위해 2배 스케일 적용
        useCORS: true, // 외부 이미지 허용
        allowTaint: true, // 외부 이미지 허용
        logging: false, // 디버그 로그 비활성화
        scrollX: 0, // 스크롤 위치 고정
        scrollY: 0,
        // windowWidth: document.documentElement.offsetWidth,
        // windowHeight: document.documentElement.offsetHeight,
        windowWidth: captureTarget.scrollWidth,
        windowHeight: captureTarget.scrollHeight,
      } satisfies Partial<Options>;

      // 페이지를 캔버스로 변환
      const canvas = await html2canvas(captureTarget, options);

      // 캔버스를 이미지로 변환
      const image = canvas.toDataURL('image/png', 1.0);

      // 이미지 다운로드
      const link = document.createElement('a');
      link.href = image;
      link.download = filename;
      link.click();

      setIsLoading(false);
    } catch (_err) {
      console.error('페이지 캡처 중 오류가 발생했습니다.');
    }
  }, [captureTargetRef, filename]);

  return { onCaptureAndSave, isLoading };
}
