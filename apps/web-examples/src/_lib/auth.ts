// auth.ts (프로젝트 루트)
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Naver, { type NaverProfile } from 'next-auth/providers/naver';
import Kakao, { KakaoProfile } from 'next-auth/providers/kakao';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const config = {
  providers: [
    Naver<NaverProfile>({
      // 반환값은 signIn, jwt의 user에 할당
      profile({ response }) {
        return {
          id: response.id,
          name: response.name,
          email: response.email,
          profileImage: response.profile_image,
          gender: response.gender,
          birthyear: response.birthyear,
          birthday: response.birthday,
          phone: response.mobile,
        };
      },
    }),
    Kakao<KakaoProfile>({
      // 반환값은 signIn, jwt의 user에 할당
      profile(profile) {
        const kakaoAccount = profile.kakao_account || {};

        return {
          id: profile.id.toString(),
          name: kakaoAccount.name,
          email: kakaoAccount.email,
          profileImage: kakaoAccount.profile?.thumbnail_image_url,
          gender: kakaoAccount.gender,
          birthyear: kakaoAccount.birthyear,
          birthday: kakaoAccount.birthday,
          phone: kakaoAccount.phone_number,
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
    signIn({ account }) {
      if (!account) throw new Error('Invalid account');

      switch (account.type) {
        // 이메일, 비밀번호 로그인
        case 'credentials':
          return true;
        // 소셜 로그인
        case 'oauth': {
          /**
           * DB에서 account.providerAccountId로 사용자 조회
           * - 사용자가 존재하지 않으면 회원가입 페이지로 리다이렉트
           * => return '/sign-up?socialProvider=account.provider&socialId=account.providerAccountId&email=user.email...'
           * - 사용자가 존재하면 로그인 처리
           * => return true
           */
          return true;
        }
        default:
          return false;
      }
    },
    jwt({ token, account, trigger }) {
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
          /**
           * 1. DB에서 account.providerAccountId로 사용자 조회
           * 2. 토큰에 사용자 정보 추가
           */
          break;
        default:
          break;
      }

      return token;
    },
    session({ session, token }) {
      session.user = { ...session.user, ...token.user };

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
