import { useCallback, useState } from 'react';
import type { GeneratedFavicon, GenerateTextFaviconParams } from '../types/favicon.types';

export default function useGenerateTextFavicon() {
  // 생성된 파비콘들을 저장하는 상태
  const [generatedFavicons, setGeneratedFavicons] = useState<GeneratedFavicon[]>([]);

  // 파비콘 이미지를 생성하는 핵심 함수
  const generateTextFavicon = useCallback(
    ({ text, backgroundColor, textColor, size }: GenerateTextFaviconParams): string => {
      // 동적으로 Canvas 요소 생성
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Canvas 컨텍스트 확인
      if (!ctx) {
        throw new Error('Canvas context를 가져올 수 없습니다.');
      }

      // 배경색으로 전체 캔버스 채우기
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, size, size);

      // 텍스트 스타일 설정
      ctx.fillStyle = textColor;
      ctx.font = `bold ${Math.floor(size * 0.6)}px Arial`; // 크기에 비례한 폰트 크기
      ctx.textAlign = 'center'; // 가로 중앙 정렬
      ctx.textBaseline = 'middle'; // 세로 중앙 정렬

      // 텍스트 그리기 (첫 번째 문자만 대문자로 변환하여 사용)
      const displayText = text.charAt(0).toUpperCase();
      ctx.fillText(displayText, size / 2, size / 2); // 캔버스 중앙에 텍스트 그리기

      // Canvas를 PNG 형식의 Base64 데이터 URL로 변환하여 반환
      return canvas.toDataURL('image/png');
    },
    []
  );

  return {
    generateTextFavicon,
    generatedFavicons,
    setGeneratedFavicons,
  };
}
