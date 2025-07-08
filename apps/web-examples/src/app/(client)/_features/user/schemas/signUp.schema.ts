import { z } from 'zod';

export const signUpSchema = z.object({
  socialProvider: z.enum(['kakao', 'naver', 'google'], { message: '소셜 공급자를 선택해 주세요.' }),
  socialId: z.string({ message: '소셜 공급자 계정 ID를 입력해 주세요.' }),
  email: z.string().email({ message: '이메일 형식이 올바르지 않습니다.' }),
  nickname: z.string().min(1, { message: '닉네임을 입력해 주세요.' }),
  gender: z.enum(['MALE', 'FEMALE'], { message: '성별을 선택해 주세요.' }),
  birthDate: z.date({ message: '생년월일을 선택해 주세요.' }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
