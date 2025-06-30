import { http, HttpResponse } from 'msw';

export const fileHandlers = [
  // 파일 업로드
  http.post('/api/file/upload', () => {
    return HttpResponse.json({
      fileUrl: 'https://d37qx3oivk5uc5.cloudfront.net/notice/sample1_1749490085289.png',
    });
  }),
];
