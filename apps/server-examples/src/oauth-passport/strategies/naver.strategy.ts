import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type Profile } from 'passport-naver-v2';
import { AppConfig, appConfig } from '@/common/config/app.config';
import { NaverProfile } from '../dtos/naver-profile.dto';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    @Inject(appConfig.KEY)
    config: AppConfig
  ) {
    super({
      clientID: config.naverClientId,
      clientSecret: config.naverClientSecret,
      callbackURL: `http://localhost:${config.port}/oauth-passport/naver/callback`,
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile
  ): Promise<NaverProfile> {
    // 여기서 추가 검증 로직을 구현할 수 있음:
    // - 사용자 정보 유효성 검증
    // - 데이터베이스에서 사용자 조회/생성
    // - 추가 권한 확인 등

    console.log('네이버에서 조회된 사용자 정보:', profile);
    console.log('발급받은 액세스 토큰:', accessToken);

    return new NaverProfile({
      provider: 'naver',
      id: profile.id,
      nickname: profile.nickname,
      profileImage: profile.profileImage,
      age: profile.age,
      gender: profile.gender,
      email: profile.email,
      mobile: profile.mobile,
      mobileE164: profile.mobileE164,
      name: profile.name,
      birthday: profile.birthday,
      birthyear: profile.birthYear,
    });
  }
}
