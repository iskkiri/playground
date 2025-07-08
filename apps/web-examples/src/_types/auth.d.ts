// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT as _JWT } from 'next-auth/jwt';
import type { UserResponseDto } from '@/app/(client)/_features/user/dtos/user.dto';

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string;
    nickname: string | undefined;
    email: string | undefined;
    profileImage: string | undefined;
    gender: string | undefined;
    birthyear: string | undefined;
    birthday: string | undefined;
    phone: string | undefined;
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  // interface Account {}
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserResponseDto;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    user: UserResponseDto;
  }
}
