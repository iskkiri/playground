export type SocialProvider = 'google' | 'kakao' | 'naver';
export type Gender = 'MALE' | 'FEMALE';

export interface UserResponseDto {
  id: string;
  socialProvider: SocialProvider;
  socialId: string;
  email: string;
  nickname: string;
  gender: Gender;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
}
