import NextAuth, { type NextAuthConfig } from 'next-auth';
import Naver, { type NaverProfile } from 'next-auth/providers/naver';
import Kakao, { KakaoProfile } from 'next-auth/providers/kakao';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { nextClient } from '@/_api/next-client';
import type { UserResponseDto } from '@/app/(client)/_features/user/dtos/user.dto';

export const config = {
  providers: [
    Naver<NaverProfile>({
      // 반환값은 signIn, jwt의 user에 할당
      profile({ response }) {
        return {
          id: response.id,
          email: response.email,
          nickname: response.nickname,
          profileImage: response.profile_image,
          gender: response.gender === 'M' ? 'MALE' : response.gender === 'F' ? 'FEMALE' : 'UNKNOWN',
          birthyear: response.birthyear, // 1990
          birthday: response.birthday, // 12-25
          phone: response.mobile, // 010-1234-5678
        };
      },
    }),
    Kakao<KakaoProfile>({
      // 반환값은 signIn, jwt의 user에 할당
      profile(profile) {
        const kakaoAccount = profile.kakao_account || {};

        return {
          id: profile.id.toString(),
          email: kakaoAccount.email,
          nickname: kakaoAccount.profile?.nickname,
          profileImage: kakaoAccount.profile?.thumbnail_image_url,
          gender:
            kakaoAccount.gender === 'male'
              ? 'MALE'
              : kakaoAccount.gender === 'female'
                ? 'FEMALE'
                : 'UNKNOWN',
          birthyear: kakaoAccount.birthyear, // 1990
          birthday: kakaoAccount.birthday
            ? // 1225 => 12-25
              kakaoAccount.birthday.replace(/(\d{2})(\d{2})/, '$1-$2')
            : undefined,
          phone: kakaoAccount.phone_number
            ? // +82 10-1234-5678 => 010-1234-5678
              kakaoAccount.phone_number.replace(/^\+82\s*/, '0')
            : undefined,
        };
      },
    }),
    Google,
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
          placeholder: 'johndoe@gmail.com',
        },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: '*****',
        },
      },

      authorize: async (credentials) => {
        if (!credentials.email) throw new Error('Email is required');
        if (!credentials.password) throw new Error('Password is required');

        /**
         * 1. DB에서 email로 사용자 조회
         * 2.
         *   - 사용자가 존재하지 않으면 에러 발생
         *   - 사용자가 존재하면 비밀번호 비교
         * 3.
         *   - 비밀번호가 일치하지 않으면 에러 발생
         *   - 비밀번호가 일치하면 사용자 정보 반환
         */

        return null;
      },
    }),
  ],
  callbacks: {
    // authorized({ auth, request }) {
    //   // 역할: 페이지 접근 권한 확인
    //   // 호출 시점: NextAuth.js 미들웨어 사용 시 페이지 접근 전
    //   // 용도: 라우트 보호, 역할 기반 접근 제어
    //   return true;
    // },
    signIn: async ({ account, user }) => {
      try {
        if (!account) throw new Error('Invalid account');

        switch (account.type) {
          // 이메일, 비밀번호 로그인
          case 'credentials':
            return true;
          // 소셜 로그인
          case 'oauth':
          case 'oidc': {
            /**
             * DB에서 account.providerAccountId로 사용자 조회
             * - 사용자가 존재하면 로그인 처리
             * => return true
             * - 사용자가 존재하지 않으면 회원가입 페이지로 리다이렉트
             * => return '/sign-up?socialProvider=account.provider&socialId=account.providerAccountId&email=user.email...'
             */

            // DB에서 account.providerAccountId로 사용자 조회
            // Next.js의 middleware에서 mongoose 사용할 때 문제 발생. (Edge runtime에서는 Node.js의 모든 API가 지원되지 않기 때문)
            // Edge runtime에서 직접 mongoose를 사용하는 대신 API route를 통해 데이터베이스 작업을 처리
            const { data: isExist } = await nextClient.get<UserResponseDto | null>(
              `/user?socialId=${account.providerAccountId}`
            );

            // 사용자가 존재하면 로그인 성공
            if (isExist) return true;

            // 사용자가 존재하지 않으면 회원가입 페이지로 리다이렉트
            const queryParams = new URLSearchParams({
              socialProvider: account.provider,
              socialId: account.providerAccountId,
              email: user.email || '',
              nickname: user.nickname || '',
              gender: user.gender || '',
              birthDate:
                user.birthyear && user.birthday ? `${user.birthyear}-${user.birthday}` : '',
            });

            return `/auth/sign-up?${queryParams.toString()}`;
          }
          default:
            return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    jwt: async ({ token, account, trigger }) => {
      //  update event: Triggered by the `useSession().update` method.
      if (trigger === 'update') {
        /**
         * 1. 업데이트된 사용자 정보 조회
         * 2. 토큰 업데이트
         */
        return token;
      }

      switch (account?.type) {
        // 이메일, 비밀번호 로그인
        case 'credentials':
          /**
           * 1. DB에서 email로 사용자 조회
           * 2. 토큰에 사용자 정보 추가
           */
          break;
        // 소셜 로그인
        case 'oauth':
        case 'oidc': {
          /**
           * 1. DB에서 account.providerAccountId로 사용자 조회
           * 2. 토큰에 사용자 정보 추가
           */
          // Next.js의 middleware에서 mongoose 사용할 때 문제 발생. (Edge runtime에서는 Node.js의 모든 API가 지원되지 않기 때문)
          // Edge runtime에서 직접 mongoose를 사용하는 대신 API route를 통해 데이터베이스 작업을 처리
          const { data: user } = await nextClient.get<UserResponseDto | null>(
            `/user?socialId=${account.providerAccountId}`
          );

          if (user) token.user = user;

          break;
        }
        default:
          break;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = { ...session.user, ...token.user };

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
