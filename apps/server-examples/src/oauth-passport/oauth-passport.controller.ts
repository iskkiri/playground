import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { NaverAuthGuard } from './guards/naver-auth.guard';
import { NaverProfile } from './dtos/naver-profile.dto';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';
import { KakaoProfile } from './dtos/kakao-profile.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GoogleProfile } from './dtos/google-profile.dto';

@ApiTags('OAuth Passport')
@Controller('oauth-passport')
export class OAuthPassportController {
  /**
   * 네이버 로그인 시작 (Passport 방식)
   *
   * 이 엔드포인트의 실제 동작:
   * 1. 사용자가 이 URL에 접근
   * 2. NaverAuthGuard가 NaverStrategy를 호출
   * 3. Passport가 네이버 OAuth URL을 자동 생성:
   *    https://nid.naver.com/oauth2.0/authorize?
   *      response_type=code&
   *      client_id=${환경변수 NAVER_CLIENT_ID}&
   *      redirect_uri=http://localhost:${PORT}/oauth-passport/naver/callback
   *    (state 파라미터는 세션 미들웨어 없이는 생략됨)
   * 4. 사용자를 위 URL로 자동 리디렉션
   *
   */
  @Get('naver')
  @UseGuards(NaverAuthGuard)
  @ApiOperation({
    summary: '네이버 OAuth 로그인 (Passport)',
    description: '사용자를 네이버 OAuth 인증 페이지로 리디렉션합니다. (Passport 방식)',
  })
  naverAuth() {
    // 이 메서드는 실제로 실행되지 않음
    // NaverAuthGuard가 먼저 실행되어 네이버로 리디렉션하기 때문
  }

  /**
   * 네이버 OAuth 콜백 처리 (Passport 방식)
   *
   * 이 엔드포인트의 실제 동작:
   * 1. 네이버에서 인증 완료 후 이 URL로 리디렉션 (authorization code 포함)
   * 2. NaverAuthGuard가 NaverStrategy를 다시 호출
   * 3. Passport가 자동으로 다음 작업 수행:
   *    a) authorization code를 네이버 토큰 엔드포인트로 전송
   *    b) access token을 받아옴
   *    c) access token으로 네이버 사용자 정보 API 호출
   *    d) 조회된 사용자 정보로 NaverStrategy.validate() 메서드 실행
   * 4. validate()에서 반환된 사용자 정보가 req.user에 설정됨
   * 5. 이 컨트롤러 메서드가 실행됨 (req.user 사용 가능)
   *
   * 직접 구현 방식과의 차이점:
   * - 직접 구현: authorization code 파싱, 토큰 교환 API 호출, 사용자 정보 API 호출을 모두 수동 처리
   * - Passport: 위 모든 과정이 자동 처리되고 최종 결과만 req.user로 전달받음
   */
  @Get('naver/callback')
  @UseGuards(NaverAuthGuard)
  @ApiOperation({
    summary: '네이버 OAuth 콜백 처리 (Passport)',
    description: '네이버에서 인증 후 돌아오는 콜백을 처리합니다. (Passport 방식)',
  })
  async naverCallback(
    @Req() req: Request & { user: NaverProfile },
    @Res() res: Response
  ): Promise<void> {
    // 여기서 req.user는 NaverStrategy.validate()에서 반환된 값
    // 이미 검증된 네이버 사용자 정보가 포함되어 있음

    console.log('네이버 사용자 정보 (Passport 자동 처리 완료):', req.user);

    // 실제 애플리케이션에서는 여기서 다음 작업을 수행:
    // 1. JWT 토큰 생성
    // const accessToken = this.jwtService.sign({ userId: user.id, email: user.email });

    // 2. 데이터베이스에 사용자 정보 저장/업데이트
    // const user = await this.userService.findOrCreate(req.user);

    // 3. 프론트엔드로 인증 결과 전달 (여러 방법 중 선택):

    // 방법 1: 쿼리 파라미터로 토큰 전달 (간단하지만 보안상 권장하지 않음)
    // res.redirect(`http://localhost:3000/auth/callback?token=${accessToken}`);

    // 방법 2: 임시 코드 생성 후 프론트엔드에서 토큰 교환 (권장)
    // const tempCode = await this.authService.generateTempCode(user.id);
    // res.redirect(`http://localhost:3000/auth/callback?code=${tempCode}`);

    // 방법 3: 세션/쿠키 설정 후 리다이렉트
    // req.session.user = user;
    // res.redirect('http://localhost:3000/dashboard');

    // 방법 4: 팝업 윈도우용 HTML 응답 (postMessage 사용)
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head><title>Authentication Success</title></head>
        <body>
          <script>
            // 부모 윈도우(프론트엔드)에 인증 결과 전달
            window.opener.postMessage({
              type: 'OAUTH_SUCCESS',
              tokens: ${JSON.stringify({
                accessToken: '발급한 액세스 토큰',
                refreshToken: '발급한 리프레시 토큰',
              })}
            }, 'http://localhost:3000');
            window.close();
          </script>
          <p>인증 완료! 창이 자동으로 닫힙니다.</p>
        </body>
      </html>
    `;

    // 예제에서는 방법 4 사용 (팝업 윈도우 방식)
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlResponse);
  }

  /**
   * 카카오 로그인 시작 (Passport 방식)
   *
   * 이 엔드포인트의 실제 동작:
   * 1. 사용자가 이 URL에 접근
   * 2. KakaoAuthGuard가 KakaoStrategy를 호출
   * 3. Passport가 카카오 OAuth URL을 자동 생성:
   *    https://kauth.kakao.com/oauth/authorize?
   *      response_type=code&
   *      client_id=${환경변수 KAKAO_CLIENT_ID}&
   *      redirect_uri=http://localhost:${PORT}/oauth-passport/kakao/callback
   * 4. 사용자를 위 URL로 자동 리디렉션
   *
   */
  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  @ApiOperation({
    summary: '카카오 OAuth 로그인 (Passport)',
    description: '사용자를 카카오 OAuth 인증 페이지로 리디렉션합니다. (Passport 방식)',
  })
  kakaoAuth() {
    // 이 메서드는 실제로 실행되지 않음
    // KakaoAuthGuard가 먼저 실행되어 카카오로 리디렉션하기 때문
  }

  /**
   * 카카오 OAuth 콜백 처리 (Passport 방식)
   *
   * 이 엔드포인트의 실제 동작:
   * 1. 카카오에서 인증 완료 후 이 URL로 리디렉션 (authorization code 포함)
   * 2. KakaoAuthGuard가 KakaoStrategy를 다시 호출
   * 3. Passport가 자동으로 다음 작업 수행:
   *    a) authorization code를 카카오 토큰 엔드포인트로 전송 (https://kauth.kakao.com/oauth/token)
   *    b) access token을 받아옴
   *    c) access token으로 카카오 사용자 정보 API 호출 (https://kapi.kakao.com/v2/user/me)
   *    d) 조회된 사용자 정보로 KakaoStrategy.validate() 메서드 실행
   * 4. validate()에서 반환된 사용자 정보가 req.user에 설정됨
   * 5. 이 컨트롤러 메서드가 실행됨 (req.user 사용 가능)
   *
   * 직접 구현 방식과의 차이점:
   * - 직접 구현: authorization code 파싱, 토큰 교환 API 호출, 사용자 정보 API 호출을 모두 수동 처리
   * - Passport: 위 모든 과정이 자동 처리되고 최종 결과만 req.user로 전달받음
   */
  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  @ApiOperation({
    summary: '카카오 OAuth 콜백 처리 (Passport)',
    description: '카카오에서 인증 후 돌아오는 콜백을 처리합니다. (Passport 방식)',
  })
  async kakaoCallback(
    @Req() req: Request & { user: KakaoProfile },
    @Res() res: Response
  ): Promise<void> {
    // 여기서 req.user는 KakaoStrategy.validate()에서 반환된 값
    // 이미 검증된 카카오 사용자 정보가 포함되어 있음

    console.log('카카오 사용자 정보 (Passport 자동 처리 완료):', req.user);

    // 실제 애플리케이션에서는 여기서 다음 작업을 수행:
    // 1. JWT 토큰 생성
    // const accessToken = this.jwtService.sign({ userId: user.id, email: user.email });

    // 2. 데이터베이스에 사용자 정보 저장/업데이트
    // const user = await this.userService.findOrCreate(req.user);

    // 3. 프론트엔드로 인증 결과 전달 (여러 방법 중 선택):

    // 방법 1: 쿼리 파라미터로 토큰 전달 (간단하지만 보안상 권장하지 않음)
    // res.redirect(`http://localhost:3000/auth/callback?token=${accessToken}`);

    // 방법 2: 임시 코드 생성 후 프론트엔드에서 토큰 교환 (권장)
    // const tempCode = await this.authService.generateTempCode(user.id);
    // res.redirect(`http://localhost:3000/auth/callback?code=${tempCode}`);

    // 방법 3: 세션/쿠키 설정 후 리다이렉트
    // req.session.user = user;
    // res.redirect('http://localhost:3000/dashboard');

    // 방법 4: 팝업 윈도우용 HTML 응답 (postMessage 사용)
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head><title>Authentication Success</title></head>
        <body>
          <script>
            // 부모 윈도우(프론트엔드)에 인증 결과 전달
            window.opener.postMessage({
              type: 'OAUTH_SUCCESS',
              provider: 'kakao',
              tokens: ${JSON.stringify({
                accessToken: '발급한 액세스 토큰',
                refreshToken: '발급한 리프레시 토큰',
              })}
            }, 'http://localhost:3000');
            window.close();
          </script>
          <p>인증 완료! 창이 자동으로 닫힙니다.</p>
        </body>
      </html>
    `;

    // 예제에서는 방법 4 사용 (팝업 윈도우 방식)
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlResponse);
  }

  /**
   * 구글 로그인 시작 (Passport 방식)
   *
   * 이 엔드포인트의 실제 동작:
   * 1. 사용자가 이 URL에 접근
   * 2. GoogleAuthGuard가 GoogleStrategy를 호출
   * 3. Passport가 구글 OAuth URL을 자동 생성:
   *    https://accounts.google.com/oauth2/authorize?
   *      response_type=code&
   *      client_id=${환경변수 GOOGLE_CLIENT_ID}&
   *      redirect_uri=http://localhost:${PORT}/oauth-passport/google/callback&
   *      scope=profile%20email
   * 4. 사용자를 위 URL로 자동 리디렉션
   *
   */
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({
    summary: '구글 OAuth 로그인 (Passport)',
    description: '사용자를 구글 OAuth 인증 페이지로 리디렉션합니다. (Passport 방식)',
  })
  googleAuth() {
    // 이 메서드는 실제로 실행되지 않음
    // GoogleAuthGuard가 먼저 실행되어 구글로 리디렉션하기 때문
  }

  /**
   * 구글 OAuth 콜백 처리 (Passport 방식)
   *
   * 이 엔드포인트의 실제 동작:
   * 1. 구글에서 인증 완료 후 이 URL로 리디렉션 (authorization code 포함)
   * 2. GoogleAuthGuard가 GoogleStrategy를 다시 호출
   * 3. Passport가 자동으로 다음 작업 수행:
   *    a) authorization code를 구글 토큰 엔드포인트로 전송 (https://oauth2.googleapis.com/token)
   *    b) access token을 받아옴
   *    c) access token으로 구글 사용자 정보 API 호출 (https://www.googleapis.com/oauth2/v2/userinfo)
   *    d) 조회된 사용자 정보로 GoogleStrategy.validate() 메서드 실행
   * 4. validate()에서 반환된 사용자 정보가 req.user에 설정됨
   * 5. 이 컨트롤러 메서드가 실행됨 (req.user 사용 가능)
   *
   * 직접 구현 방식과의 차이점:
   * - 직접 구현: authorization code 파싱, 토큰 교환 API 호출, 사용자 정보 API 호출을 모두 수동 처리
   * - Passport: 위 모든 과정이 자동 처리되고 최종 결과만 req.user로 전달받음
   */
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({
    summary: '구글 OAuth 콜백 처리 (Passport)',
    description: '구글에서 인증 후 돌아오는 콜백을 처리합니다. (Passport 방식)',
  })
  async googleCallback(
    @Req() req: Request & { user: GoogleProfile },
    @Res() res: Response
  ): Promise<void> {
    // 여기서 req.user는 GoogleStrategy.validate()에서 반환된 값
    // 이미 검증된 구글 사용자 정보가 포함되어 있음

    console.log('구글 사용자 정보 (Passport 자동 처리 완료):', req.user);

    // 실제 애플리케이션에서는 여기서 다음 작업을 수행:
    // 1. JWT 토큰 생성
    // const accessToken = this.jwtService.sign({ userId: user.id, email: user.email });

    // 2. 데이터베이스에 사용자 정보 저장/업데이트
    // const user = await this.userService.findOrCreate(req.user);

    // 3. 프론트엔드로 인증 결과 전달 (여러 방법 중 선택):

    // 방법 1: 쿼리 파라미터로 토큰 전달 (간단하지만 보안상 권장하지 않음)
    // res.redirect(`http://localhost:3000/auth/callback?token=${accessToken}`);

    // 방법 2: 임시 코드 생성 후 프론트엔드에서 토큰 교환 (권장)
    // const tempCode = await this.authService.generateTempCode(user.id);
    // res.redirect(`http://localhost:3000/auth/callback?code=${tempCode}`);

    // 방법 3: 세션/쿠키 설정 후 리다이렉트
    // req.session.user = user;
    // res.redirect('http://localhost:3000/dashboard');

    // 방법 4: 팝업 윈도우용 HTML 응답 (postMessage 사용)
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head><title>Authentication Success</title></head>
        <body>
          <script>
            // 부모 윈도우(프론트엔드)에 인증 결과 전달
            window.opener.postMessage({
              type: 'OAUTH_SUCCESS',
              provider: 'google',
              tokens: ${JSON.stringify({
                accessToken: '발급한 액세스 토큰',
                refreshToken: '발급한 리프레시 토큰',
              })}
            }, 'http://localhost:3000');
            window.close();
          </script>
          <p>인증 완료! 창이 자동으로 닫힙니다.</p>
        </body>
      </html>
    `;

    // 예제에서는 방법 4 사용 (팝업 윈도우 방식)
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlResponse);
  }
}
