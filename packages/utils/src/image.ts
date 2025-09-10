export interface ImageSize {
  originalImageWidth: number;
  originalImageHeight: number;
}

/**
 * @description 이미지 원본 크기 가져오기
 * @param url 이미지 URL
 * @returns 이미지 원본 크기
 */
export function getOriginalImageSize(url: string): Promise<ImageSize> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve({
        originalImageWidth: image.naturalWidth,
        originalImageHeight: image.naturalHeight,
      });
    };

    image.onerror = (error) => {
      reject(error);
    };

    image.src = url;
  });
}

/**
 * @description 파일을 DataURL로 변환
 * @param file 파일
 * @returns DataURL
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      if (!e.target || typeof e.target.result !== 'string') {
        reject(new Error('Failed to read file'));
        return;
      }

      resolve(e.target.result);
    };
  });
}
