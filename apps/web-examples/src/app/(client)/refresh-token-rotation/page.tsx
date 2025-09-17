'use client';

import useGetMe from './_hooks/useGetMe';
import { useTest, useTest2, useTest3 } from './_hooks/useTest';

export default function RefreshTokenRotationPage() {
  useGetMe();
  useTest();
  useTest2();
  useTest3();

  return <div>page</div>;
}
