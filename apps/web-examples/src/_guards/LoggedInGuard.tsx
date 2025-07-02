'use client';

import { type PropsWithChildren } from 'react';
// import { useRouter } from 'next/navigation';
// import { appRoutes } from '@/_routes/appRoutes';
// import { commonCss } from '@/_styles/common.styles';

// 로그인한 상태에서만 접근 가능
export default function LoggedInGuard({ children }: PropsWithChildren) {
  // const router = useRouter();
  // const { data: userMe, isFetching } = useGetMe();

  // useEffect(() => {
  //   if (isFetching || userMe) return;

  //   router.replace(appRoutes.login);
  // }, [isFetching, router, userMe]);

  // if (!userMe) {
  //   return <div css={commonCss.fullPage} />;
  // }

  return children;
}
