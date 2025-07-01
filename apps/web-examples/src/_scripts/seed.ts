import connectToDatabase from '@/_lib/mongodb';
import Banner from '@/app/(admin)/_features/banner/models/banner.model';
import Notice from '@/app/(admin)/_features/notice/models/notice.model';
import Popup from '@/app/(admin)/_features/popup/models/popup.model';
import mongoose from 'mongoose';

async function seedData() {
  try {
    await connectToDatabase();

    // 기존 데이터 삭제
    await Promise.all([
      // AdminUser.deleteMany({}),
      Notice.deleteMany({}),
      Banner.deleteMany({}),
      Popup.deleteMany({}),
    ]);

    // 공지사항 생성
    const now = new Date();
    const notices = Array.from({ length: 101 }, (_, i) => ({
      title: `테스트 공지사항 ${i + 1}`,
      content: `이것은 ${i + 1}번째 테스트 공지사항입니다.`,
      isShow: i % 2 === 0,
      thumbnail: 'https://d37qx3oivk5uc5.cloudfront.net/notice/sample3_x1yK5M2deCYIw3gGsQw8L.webp',
      author: '6842fd0f9f53e78d34b395e9',
      createdAt: new Date(now.getTime() + i * 1000), // 1초씩 차이
    }));

    // 배너 생성
    const banners = Array.from({ length: 11 }, (_, i) => ({
      title: `테스트 배너 ${i + 1}`,
      mobileImage:
        'https://d37qx3oivk5uc5.cloudfront.net/banner/sample5_xbX23HKfPA8KxVnGw4PRr.webp',
      mobileLink: 'https://naver.com',
      pcImage: 'https://d37qx3oivk5uc5.cloudfront.net/banner/sample6_UHl7uj3TBmhFxSxRjtaLK.webp',
      pcLink: 'https://google.com',
      isShow: i < 5,
      order: i < 5 ? i + 1 : null,
      author: '6842fd0f9f53e78d34b395e9',
      createdAt: new Date(now.getTime() + i * 1000), // 1초씩 차이
    }));

    // 팝업 생성
    const popups = [
      {
        title: '너비/높이 1:1인 팝업',
        displayType: 'ALL',
        pcPosition: 'CENTER',
        xCoordinate: 0,
        yCoordinate: 0,
        startDate: null,
        endDate: null,
        imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-one_1749320673232.png',
        link: 'https://naver.com',
        popupWidthStatus: 'AUTO',
        imageWidth: 0,
        isShow: true,
        order: 1,
        author: '6842fd0f9f53e78d34b395e9',
      },
      {
        title: '너비/높이 2:1인 팝업',
        displayType: 'ALL',
        pcPosition: 'CENTER',
        xCoordinate: 0,
        yCoordinate: 0,
        startDate: null,
        endDate: null,
        imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/two-to-one_1749320711335.png',
        link: 'https://naver.com',
        popupWidthStatus: 'AUTO',
        imageWidth: 0,
        isShow: true,
        order: 2,
        author: '6842fd0f9f53e78d34b395e9',
      },
      {
        title: '너비/높이 1:2인 팝업',
        displayType: 'ALL',
        pcPosition: 'CENTER',
        xCoordinate: 0,
        yCoordinate: 0,
        startDate: null,
        endDate: null,
        imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-two_1749320741786.png',
        link: 'https://naver.com',
        popupWidthStatus: 'AUTO',
        imageWidth: 0,
        isShow: true,
        order: 3,
        author: '6842fd0f9f53e78d34b395e9',
      },
      {
        title: '너비/높이 1:1 & 모바일만 노출',
        displayType: 'MOBILE_ONLY',
        pcPosition: 'CENTER',
        xCoordinate: 0,
        yCoordinate: 0,
        startDate: null,
        endDate: null,
        imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-one_1749320673232.png',
        link: 'https://naver.com',
        popupWidthStatus: 'AUTO',
        imageWidth: 0,
        isShow: true,
        order: 4,
        author: '6842fd0f9f53e78d34b395e9',
      },
      {
        title: '너비/높이 1:1 & PC 만 노출 & 노출 위치 직접 지정',
        displayType: 'PC_ONLY',
        pcPosition: 'CUSTOM',
        xCoordinate: 100,
        yCoordinate: 100,
        startDate: null,
        endDate: null,
        imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-one_1749320673232.png',
        link: 'https://naver.com',
        popupWidthStatus: 'AUTO',
        imageWidth: 0,
        isShow: true,
        order: 5,
        author: '6842fd0f9f53e78d34b395e9',
      },
      {
        title: '너비/높이 1:1 & 너비 직접 지정',
        displayType: 'ALL',
        pcPosition: 'CENTER',
        xCoordinate: 0,
        yCoordinate: 0,
        startDate: null,
        endDate: null,
        imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-one_1749320673232.png',
        link: 'https://naver.com',
        popupWidthStatus: 'DIRECT',
        imageWidth: 500,
        isShow: true,
        order: 6,
        author: '6842fd0f9f53e78d34b395e9',
      },
      {
        title: '숨김용 팝업',
        displayType: 'ALL',
        pcPosition: 'CENTER',
        xCoordinate: 0,
        yCoordinate: 0,
        startDate: null,
        endDate: null,
        imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/popup/one-to-one_1749320673232.png',
        link: 'https://naver.com',
        popupWidthStatus: 'AUTO',
        imageWidth: 0,
        isShow: false,
        order: null,
        author: '6842fd0f9f53e78d34b395e9',
      },
    ];

    await Notice.create(notices);
    await Banner.create(banners);
    await Popup.create(popups);

    console.log('✅ 시딩 완료!');
    // console.log(`- 관리자: ${adminUsers.length}개`);
    console.log(`- 공지사항: ${notices.length}개`);
    console.log(`- 배너: ${banners.length}개`);
    console.log(`- 팝업: ${popups.length}개`);
  } catch (error) {
    console.error('❌ 시딩 실패:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedData();
