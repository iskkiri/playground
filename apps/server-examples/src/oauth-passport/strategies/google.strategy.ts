import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type Profile } from 'passport-google-oauth20';
import { AppConfig, appConfig } from '@/common/config/app.config';
import { GoogleProfile } from '../dtos/google-profile.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(appConfig.KEY)
    config: AppConfig
  ) {
    super({
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: `http://localhost:${config.port}/oauth-passport/google/callback`,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile
  ): Promise<GoogleProfile> {
    console.log('구글에서 조회된 사용자 정보:', profile);
    console.log('발급받은 액세스 토큰:', _accessToken);

    const { _json } = profile;

    const googleProfile = new GoogleProfile({
      provider: 'google',
      id: _json.sub || profile.id, // 구글은 'sub' 필드를 고유 ID로 사용
      email: _json.email,
      emailVerified: _json.email_verified,
      name: _json.name,
      givenName: _json.given_name,
      familyName: _json.family_name,
      picture: _json.picture,
      locale: _json.locale,
    });

    return googleProfile;
  }
}
