export interface ImageSize {
  originalImageWidth: number;
  originalImageHeight: number;
}

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
