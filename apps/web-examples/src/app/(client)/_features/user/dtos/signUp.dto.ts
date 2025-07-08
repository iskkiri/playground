import type { Gender, SocialProvider } from './user.dto';

export interface SignUpRequestDto {
  socialProvider: SocialProvider;
  // 소셜 계정 id
  socialId: string;
  // 이메일
  email: string;
  // 닉네임
  nickname: string;
  // 성별
  gender: Gender;
  // 생년월일
  birthDate: Date;
}
