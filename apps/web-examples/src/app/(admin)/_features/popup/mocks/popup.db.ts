import { nullable, primaryKey } from '@mswjs/data';
import type { FactoryAPI } from '@mswjs/data/lib/glossary';

export const adminPopupEntity = {
  id: primaryKey(Number),
  title: String,
  displayType: String, // ALL | PC_ONLY | MOBILE_ONLY
  pcPosition: String, // LEFT | CENTER | RIGHT | CUSTOM
  xCoordinate: Number,
  yCoordinate: Number,
  startDate: nullable(Date),
  endDate: nullable(Date),
  imageUrl: String,
  link: nullable(String),
  popupWidthStatus: String, // AUTO | DIRECT
  imageWidth: nullable(Number),
  isShow: Boolean,
  order: nullable(Number),
  createdAt: Date,
};

export function initializeMockAdminPopup(db: FactoryAPI<{ adminPopup: typeof adminPopupEntity }>) {
  const popUps = [
    // 너비/높이 1:1인 팝업
    db.adminPopup.create({
      id: 1,
      isShow: true,
      title: '너비/높이 1:1인 팝업',
      displayType: 'ALL',
      pcPosition: 'CENTER',
      xCoordinate: 0,
      yCoordinate: 0,
      startDate: null,
      endDate: null,
      imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-one_1749320673232.png',
      link: 'https://google.com',
      popupWidthStatus: 'AUTO',
      imageWidth: 0,
      order: 1,
    }),
    // 너비/높이 2:1인 팝업
    db.adminPopup.create({
      id: 2,
      isShow: true,
      title: '너비/높이 2:1인 팝업',
      displayType: 'ALL',
      pcPosition: 'CENTER',
      xCoordinate: 0,
      yCoordinate: 0,
      startDate: null,
      endDate: null,
      imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/two-to-one_1749320711335.png',
      link: 'https://google.com',
      popupWidthStatus: 'AUTO',
      imageWidth: 0,
      order: 2,
    }),
    // 너비/높이 1:2인 팝업
    db.adminPopup.create({
      id: 3,
      isShow: true,
      title: '너비/높이 1:2인 팝업',
      displayType: 'ALL',
      pcPosition: 'CENTER',
      xCoordinate: 0,
      yCoordinate: 0,
      startDate: null,
      endDate: null,
      // 너비/높이 1:1 이미지
      imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-two_1749320741786.png',
      link: 'https://google.com',
      popupWidthStatus: 'AUTO',
      imageWidth: 0,
      order: 3,
    }),
    // 너비/높이 1:1 & 모바일만 노출
    db.adminPopup.create({
      id: 4,
      isShow: true,
      title: '너비/높이 1:1 & 모바일만 노출',
      displayType: 'MOBILE',
      pcPosition: 'CENTER',
      xCoordinate: 0,
      yCoordinate: 0,
      startDate: null,
      endDate: null,
      imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-one_1749320673232.png',
      link: 'https://google.com',
      popupWidthStatus: 'AUTO',
      imageWidth: 0,
      order: 4,
    }),
    // 너비/높이 1:1 & PC 만 노출 & 노출 위치 직접 지정
    db.adminPopup.create({
      id: 5,
      isShow: true,
      title: '너비/높이 1:1 & PC 만 노출 & 노출 위치 직접 지정',
      displayType: 'PC',
      pcPosition: 'DIRECT',
      xCoordinate: 100,
      yCoordinate: 100,
      startDate: null,
      endDate: null,
      imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-one_1749320673232.png',
      link: 'https://google.com',
      popupWidthStatus: 'AUTO',
      imageWidth: 0,
      order: 5,
    }),
    // 너비/높이 1:1 & 너비 직접 지정
    db.adminPopup.create({
      id: 6,
      isShow: true,
      title: '너비/높이 1:1 & 너비 직접 지정',
      displayType: 'ALL',
      pcPosition: 'CENTER',
      xCoordinate: 0,
      yCoordinate: 0,
      startDate: null,
      endDate: null,
      imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-one_1749320673232.png',
      link: 'https://google.com',
      popupWidthStatus: 'DIRECT',
      imageWidth: 500,
      order: 6,
    }),
    // 숨김용 팝업
    db.adminPopup.create({
      id: 7,
      isShow: false,
      title: '숨김용 팝업',
      displayType: 'ALL',
      pcPosition: 'CENTER',
      xCoordinate: 0,
      yCoordinate: 0,
      startDate: null,
      endDate: null,
      imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-one_1749320673232.png',
      link: 'https://google.com',
      popupWidthStatus: 'AUTO',
      imageWidth: 0,
      order: null,
    }),
  ];

  return popUps;
}
