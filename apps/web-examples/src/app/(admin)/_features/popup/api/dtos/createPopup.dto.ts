export interface CreatePopupRequestDto {
  title: string;
  displayType: 'ALL' | 'PC_ONLY' | 'MOBILE_ONLY' | 'CUSTOM';
  pcPosition: 'LEFT' | 'CENTER' | 'RIGHT' | 'CUSTOM';
  xCoordinate: number;
  yCoordinate: number;
  startDate: Date | null;
  endDate: Date | null;
  imageUrl: string;
  link: string | null;
  popupWidthStatus: 'AUTO' | 'DIRECT';
  imageWidth: number | null;
}
