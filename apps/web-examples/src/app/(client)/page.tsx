'use client';

import Link from 'next/link';
import Accordion from '@repo/ui/Accordion/Accordion';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';

export default function Home() {
  const [activeKey, setActiveKey] = useQueryState(
    'activeKey',
    parseAsArrayOf(parseAsString).withDefault([])
  );

  return (
    <div className="w-600 mx-auto p-24">
      <Accordion type="multiple" value={activeKey} onValueChange={setActiveKey}>
        <Accordion.Item value="1">
          <Accordion.Trigger>
            <div className="typography-h7-24b">Modules</div>
          </Accordion.Trigger>

          <Accordion.Content>
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
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="2">
          <Accordion.Trigger>
            <div className="typography-h7-24b">Authentication</div>
          </Accordion.Trigger>

          <Accordion.Content>
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
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="3">
          <Accordion.Trigger>
            <div className="typography-h7-24b">UI</div>
          </Accordion.Trigger>

          <Accordion.Content>
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
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="4">
          <Accordion.Trigger>
            <div className="typography-h7-24b">Canvas</div>
          </Accordion.Trigger>

          <Accordion.Content>
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
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
