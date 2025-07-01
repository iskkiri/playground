export interface PopupDetailData {
  id: string;
  title: string;
  displayType: 'ALL' | 'PC_ONLY' | 'MOBILE_ONLY';
  pcPosition: 'LEFT' | 'CENTER' | 'RIGHT' | 'CUSTOM';
  xCoordinate: number;
  yCoordinate: number;
  startDate: string | null;
  endDate: string | null;
  imageUrl: string;
  link: string | null;
  popupWidthStatus: 'AUTO' | 'DIRECT';
  imageWidth: number | null;
  isShow: boolean;
  order: number | null;
  createdAt: string;
}
