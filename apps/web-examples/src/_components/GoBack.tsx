'use client';

import FeatherIcons from '@repo/icons/featherIcons';
import { useRouter } from 'next/navigation';

export default function GoBack() {
  const router = useRouter();

  return (
    <button onClick={router.back}>
      <FeatherIcons.ArrowLeft />
    </button>
  );
}
