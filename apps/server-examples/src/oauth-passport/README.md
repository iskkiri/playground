## Stragtegy

```typescript
/**
 * 네이버 OAuth Passport 전략
 *
 * Passport OAuth 동작 흐름:
 * 1. Guard가 적용된 엔드포인트 호출 시 자동으로 네이버 OAuth URL로 리디렉션
 *    - URL: https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=...&redirect_uri=...&state=...
 *    - 이 URL은 아래 super() 설정값들을 기반으로 passport-naver-v2가 자동 생성
 *
 * 2. 사용자가 네이버에서 인증 완료 후 callbackURL로 authorization code와 함께 리디렉션
 *
 * 3. Passport가 자동으로 다음 작업 수행:
 *    - authorization code를 access token으로 교환 (토큰 엔드포인트 호출)
 *    - access token으로 사용자 정보 조회 (프로필 API 호출)
 *    - 조회된 사용자 정보로 validate() 메서드 호출
 *
 * 4. validate() 메서드에서 반환된 값이 req.user에 설정되어 컨트롤러로 전달
 */
@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    @Inject(appConfig.KEY)
    config: AppConfig
  ) {
    /**
     * 네이버 OAuth 설정
     * 이 설정값들은 passport-naver-v2 라이브러리가 OAuth 플로우에서 사용:
     *
     * - clientID: 네이버 개발자센터에서 발급받은 클라이언트 ID
     * - clientSecret: 네이버 개발자센터에서 발급받은 클라이언트 시크릿
     * - callbackURL: 네이버 인증 완료 후 돌아올 콜백 URL
     *   (네이버 개발자센터에 등록된 Callback URL과 일치해야 함)
     */
    super({
      clientID: config.naverClientId,
      clientSecret: config.naverClientSecret,
      callbackURL: `http://localhost:${config.port}/oauth-passport/naver/callback`,
    });
  }

  /**
   * 사용자 검증 및 프로필 반환
   *
   * 이 메서드는 Passport가 다음 단계를 완료한 후 자동으로 호출:
   * 1. authorization code → access token 교환 완료
   * 2. access token으로 네이버 사용자 정보 조회 완료
   *
   * @param accessToken - 네이버에서 발급받은 액세스 토큰
   * @param _refreshToken - 네이버에서 발급받은 리프레시 토큰 (사용하지 않음)
   * @param profile - passport-naver-v2가 네이버 API에서 조회한 사용자 정보
   * @returns 검증된 사용자 프로필 (이 값이 req.user에 설정됨)
   */
  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: NaverProfile
  ): Promise<NaverProfile> {
    // 여기서 추가 검증 로직을 구현할 수 있음:
    // - 사용자 정보 유효성 검증
    // - 데이터베이스에서 사용자 조회/생성
    // - 추가 권한 확인 등

    console.log('네이버에서 조회된 사용자 정보:', profile);
    console.log('발급받은 액세스 토큰:', accessToken);

    // 직접 구현 방식과 비교:
    // - 직접 구현: 토큰 교환 API 호출, 사용자 정보 API 호출을 수동으로 처리
    // - Passport: 위 과정을 모두 자동 처리하고 여기서는 최종 검증만 담당

    return profile;
  }
}
```

## Controller

```typescript
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
  @Header('Content-Type', 'text/html')
  @ApiOperation({
    summary: '네이버 OAuth 콜백 처리 (Passport)',
    description: '네이버에서 인증 후 돌아오는 콜백을 처리합니다. (Passport 방식)',
  })
  async naverCallback(@Req() req: Request & { user: NaverProfile }): Promise<string> {
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
    return htmlResponse;
  }
```
