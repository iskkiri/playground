'use client';

import { type PropsWithChildren } from 'react';
// import { useRouter } from 'next/navigation';

// 로그아웃한 상태에서만 접근이 가능
export default function LoggedOutGuard({
  children: _children,
}: PropsWithChildren) {
  // const router = useRouter();
  // const { data: userMe, isLoading } = useGetMe();
  // useEffect(() => {
  //   if (!userMe) return;
  //   router.back();
  // }, [router, userMe]);
  // if (userMe) {
  //   return <div css={commonCss.fullPage} />;
  // }
  // // 로딩 중일 때는 opacity를 0으로 설정하여 UI상에서만 보이지 않게 하고,
  // // 실제 DOM에서는 나타나게 하여 SEO에 영향을 미치지 않게 함 (크롤러는 css 스타일링을 무시하고 DOM 구조를 파싱하므로)
  // return <div css={isLoading && commonCss.opacityZero}>{children}</div>;
}
