import { useCallback, useState } from 'react';
import type { GeneratedFavicon, GenerateSvgFaviconParams } from '../types/favicon.types';

export default function useGenerateSvgFavicon() {
  const [generatedFavicons, setGeneratedFavicons] = useState<GeneratedFavicon[]>([]);

  const generateSvgFavicon = useCallback(
    ({ svgContent, backgroundColor, iconColor, size }: GenerateSvgFaviconParams) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context를 가져올 수 없습니다.');
      }

      // 배경색 설정
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, size, size);

      // SVG를 PNG favicon으로 변환하는 과정:
      // 1. SVG 문자열 생성 (벡터 형식)
      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" style="color: ${iconColor};">
          ${svgContent}
        </svg>
      `;

      // 2. SVG Blob 생성 및 임시 Object URL 생성
      const img = new window.Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob); // SVG 데이터에 대한 임시 URL

      return new Promise<string>((resolve, reject) => {
        img.onload = () => {
          try {
            // 3. 로드된 SVG 이미지를 Canvas에 래스터화 (벡터 → 비트맵)
            const padding = size * 0.15; // 15% 패딩
            const iconSize = size - padding * 2;
            ctx.drawImage(img, padding, padding, iconSize, iconSize);

            // 4. 임시 URL 해제 및 Canvas를 PNG DataURL로 변환
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL('image/png')); // 최종 PNG 형태의 favicon 데이터
          } catch (error) {
            URL.revokeObjectURL(url);
            reject(error);
          }
        };

        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error('SVG 이미지 로드에 실패했습니다.'));
        };

        img.src = url; // Image 객체에 SVG URL 할당하여 로드 시작
      });
    },
    []
  );

  return {
    generateSvgFavicon,
    generatedFavicons,
    setGeneratedFavicons,
  };
}
