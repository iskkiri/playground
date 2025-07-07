'use client';

import Link from 'next/link';
import Accordion from '@repo/ui-third-party/Accordion/Accordion';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';

export default function Home() {
  const [activeKey, setActiveKey] = useQueryState(
    'activeKey',
    parseAsArrayOf(parseAsString).withDefault([])
  );

  return (
    <div className="w-600 mx-auto p-24">
      <Accordion
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key as string[])}
        items={[
          {
            key: 1,
            label: <div className="typography-h7-24b">Modules</div>,
            children: (
              <ul className="flex flex-col gap-8 px-16 py-8">
                <li>
                  <Link href={'/admin/notice'} className="typography-p1-20b text-gray-500">
                    Admin Notice
                  </Link>
                </li>
                <li>
                  <Link href={'/admin/banner'} className="typography-p1-20b text-gray-500">
                    Admin Banner
                  </Link>
                </li>
                <li>
                  <Link href={'/admin/popup'} className="typography-p1-20b text-gray-500">
                    Admin Pop Up
                  </Link>
                </li>
              </ul>
            ),
          },
          {
            key: 2,
            label: <div className="typography-h7-24b">Authentication</div>,
            children: (
              <ul className="flex flex-col gap-8 px-16 py-8">
                <li>
                  <Link href={'/auth/sign-in'} className="typography-p1-20b text-gray-500">
                    Auth.js
                  </Link>
                </li>
                <li>
                  <Link href={'/oauth/login'} className="typography-p1-20b text-gray-500">
                    OAuth Login (Authorization Code Flow)
                  </Link>
                </li>
                <li>
                  <Link href={'/identity-verification'} className="typography-p1-20b text-gray-500">
                    Identity Verification
                  </Link>
                </li>
              </ul>
            ),
          },
          {
            key: 3,
            label: <div className="typography-h7-24b">UI</div>,
            children: (
              <ul className="flex flex-col gap-8 px-16 py-8">
                <li>
                  <Link
                    href={'/infinite-scroll/virtualization'}
                    className="typography-p1-20b text-gray-500"
                  >
                    Infinite Scroll With Virtualization
                  </Link>
                </li>

                <li>
                  <Link href={'/infinite-scroll/grid'} className="typography-p1-20b text-gray-500">
                    Infinite Scroll (Grid)
                  </Link>
                </li>

                <li>
                  <Link
                    href={'/infinite-scroll/virtualization/grid'}
                    className="typography-p1-20b text-gray-500"
                  >
                    Infinite Scroll With Virtualization (Grid)
                  </Link>
                </li>
              </ul>
            ),
          },
          {
            key: 4,
            label: <div className="typography-h7-24b">Canvas</div>,
            children: (
              <ul className="flex flex-col gap-8 px-16 py-8">
                <li>
                  <Link href={'/canvas/favicon/text'} className="typography-p1-20b text-gray-500">
                    Favicon Generator (Text)
                  </Link>
                </li>
                <li>
                  <Link href={'/canvas/favicon/svg'} className="typography-p1-20b text-gray-500">
                    Favicon Generator (SVG)
                  </Link>
                </li>
              </ul>
            ),
          },
        ]}
      />
    </div>
  );
}
