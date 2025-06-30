import { http, HttpResponse } from 'msw';

export const imageHandlers = [
  // 이미지 업로드
  http.post('/api/image/upload', () => {
    return HttpResponse.json({
      imageUrl: 'https://d37qx3oivk5uc5.cloudfront.net/notice/sample3_1749490084940.png',
    });
  }),
];
