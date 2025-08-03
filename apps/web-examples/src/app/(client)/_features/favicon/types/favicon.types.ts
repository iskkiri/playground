// 생성된 파비콘 데이터 타입 정의
export interface GeneratedFavicon {
  size: number;
  dataUrl: string; // Base64 인코딩된 이미지 데이터
}

export interface GenerateTextFaviconParams {
  text: string;
  backgroundColor: string;
  textColor: string;
  size: number;
}

export interface DownloadFaviconParams {
  dataUrl: string;
  filename: string;
}

export interface GenerateSvgFaviconParams {
  svgContent: string;
  backgroundColor: string;
  iconColor: string;
  size: number;
}
