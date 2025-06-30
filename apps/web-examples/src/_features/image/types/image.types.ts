export interface UploadToS3Params {
  filename: string;
  buffer: Buffer;
  category: string;
}

export interface ImageOptimizationOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export interface OptimizedImageResult {
  buffer: Buffer;
  filename: string;
  contentType: string;
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
}
