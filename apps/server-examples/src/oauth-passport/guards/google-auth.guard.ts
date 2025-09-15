import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * 구글 OAuth 인증 가드
 *
 * AuthGuard('google')는 다음과 같이 동작:
 * 1. GET /oauth-passport/google 엔드포인트에 적용될 때:
 *    - GoogleStrategy를 자동으로 호출
 *    - 구글 OAuth 인증 URL로 사용자를 리디렉션
 *    - 실제 컨트롤러 메서드는 실행되지 않음
 *
 * 2. GET /oauth-passport/google/callback 엔드포인트에 적용될 때:
 *    - 구글에서 돌아온 authorization code를 처리
 *    - GoogleStrategy.validate() 메서드를 자동으로 호출
 *    - validate()에서 반환된 사용자 정보를 req.user에 설정
 *    - 이후 컨트롤러 메서드가 실행됨 (req.user 사용 가능)
 */
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}