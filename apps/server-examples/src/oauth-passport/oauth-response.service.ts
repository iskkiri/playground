import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthResponseService {
  /**
   * OAuth 인증 성공 후 팝업 윈도우에 전달할 HTML을 생성하는 메서드
   *
   * 프론트엔드 팝업 윈도우와 통신하여 인증 결과를 전달하고 창을 닫는 HTML을 반환합니다.
   *
   * @param tokens 발급된 토큰 정보
   * @returns 팝업 윈도우에 전달할 HTML 문자열
   */
  generateSuccessHtml(tokens: { accessToken: string; refreshToken: string }): string {
    return `
      <!DOCTYPE html>
      <html>
        <head><title>Authentication Success</title></head>
        <body>
          <script>
            // 부모 윈도우(프론트엔드)에 인증 결과 전달
            window.opener.postMessage({
              type: 'OAUTH_SUCCESS',
              tokens: ${JSON.stringify(tokens)}
            }, 'http://localhost:3000');
            window.close();
          </script>
          <p>인증 완료! 창이 자동으로 닫힙니다.</p>
        </body>
      </html>
    `;
  }
}