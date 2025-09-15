import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * 카카오 OAuth 인증 가드 (Passport.js 방식)
 *
 * 이 가드는 NestJS의 AuthGuard를 확장하여 'kakao' 전략을 사용합니다.
 * 컨트롤러에서 @UseGuards(KakaoAuthGuard)로 사용되며,
 * 요청이 들어오면 자동으로 KakaoStrategy를 실행합니다.
 *
 * 동작 과정:
 * 1. 컨트롤러의 엔드포인트에 요청이 들어옴
 * 2. 이 가드가 KakaoStrategy를 호출
 * 3. KakaoStrategy가 카카오 OAuth 흐름을 처리
 * 4. 인증 성공 시 req.user에 사용자 정보 설정
 * 5. 컨트롤러 메서드 실행
 */
@Injectable()
export class KakaoAuthGuard extends AuthGuard('kakao') {}