import { Inject, Injectable } from '@nestjs/common';
import { validateAndGetFrontendUrl } from './utils/oauth.utils';
import { appConfig } from '@/common/config/app.config';
import type { ConfigType } from '@nestjs/config';
import type { PrismaService } from '@/prisma/prisma.service';
import type { AuthService } from '@/auth/auth.service';
import type {
  GenerateOAuthResponseHtmlParams,
  ProcessOAuthCallbackParams,
} from './types/oauth.types';

@Injectable()
export class OAuthPassportService {
  constructor(
    @Inject(appConfig.KEY) private readonly config: ConfigType<typeof appConfig>,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService
  ) {}

  /**
   * OAuth 콜백 처리
   *
   * @param params.socialId - 사용자 ID
   * @param params.provider - 소셜 플랫폼
   * @param params.origin - 요청의 Origin 헤더 값 (프론트엔드 URL)
   * @returns OAuth 콜백 응답 HTML
   */
  async processOAuthCallback({
    socialId,
    provider,
    origin,
  }: ProcessOAuthCallbackParams): Promise<string> {
    // DB에서 사용자 존재 여부 확인
    const user = await this.prisma.user.findUnique({
      where: {
        socialId_provider: {
          socialId,
          provider,
        },
      },
    });

    // 사용자 존재 여부에 따라 다른 처리
    // - 사용자가 존재하고, 회원가입 완료 상태라면 토큰 발급
    if (user && user.status === 'ACTIVE') {
      const tokens = await this.authService.issueTokens({
        sub: user.id,
        email: user.email,
        role: user.role,
      });
      return this.generateOAuthResponseHtml({ origin, tokens });
    }

    // - 사용자가 존재하고, 회원가입 미완료 상태라면 토큰 미발급 (회원가입 페이지로 리다이렉트)
    // - 사용자가 존재하지 않으면 토큰 미발급 (회원가입 페이지로 리다이렉트)
    return this.generateOAuthResponseHtml({ origin });
  }

  /**
   * OAuth 인증 성공 후 팝업 윈도우에 전달할 HTML을 생성하는 메서드
   *
   * 프론트엔드 팝업 윈도우와 통신하여 인증 결과를 전달하고 창을 닫는 HTML을 반환합니다.
   *
   * @param tokens 발급된 토큰 정보
   * @param origin 요청의 Origin 헤더 값 (프론트엔드 URL)
   * @returns 팝업 윈도우에 전달할 HTML 문자열
   */
  private generateOAuthResponseHtml({
    tokens,
    origin,
    socialId,
    provider,
  }: GenerateOAuthResponseHtmlParams): string {
    const frontendUrl = validateAndGetFrontendUrl(origin, this.config.allowedOrigins);

    const isLoginSuccess = tokens ? true : false;

    const payload = isLoginSuccess ? { tokens } : { socialId, provider };

    return `
      <!DOCTYPE html>
      <html>
        <head><title>Authentication Success</title></head>
        <body>
          <script>
            window.opener.postMessage({
              type: '${isLoginSuccess ? 'LOGIN_SUCCESS' : 'REGISTRATION_REQUIRED'}',
              payload: ${JSON.stringify(payload)}
            }, '${frontendUrl}');
            window.close();
          </script>
          <p>인증 완료! 창이 자동으로 닫힙니다.</p>
        </body>
      </html>
    `;
  }
}
