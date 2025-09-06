import { server } from '@/_mocks/server';
import '@testing-library/jest-dom';
import { parseAsString, useQueryStates } from 'nuqs';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import type { ClassicEditor } from 'ckeditor5';
import React from 'react';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
  server.close();
});

let mockUrlCounter = 0;

global.URL = global.URL || {};
global.URL.createObjectURL = vi.fn((_blob) => {
  mockUrlCounter++;
  return `blob:http://localhost:3000/${mockUrlCounter}`;
});

global.URL.revokeObjectURL = vi.fn((url) => {
  console.log(`Revoked: ${url}`);
});

export const mockRouter = {
  push: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
};

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('@/_hooks/useResetSearchFilter', () => ({
  default: () => {
    try {
      // 실제 nuqs 상태 변경 함수들을 여기서 호출
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [_, setSearchParams] = useQueryStates({
        isShow: parseAsString,
        searchType: parseAsString,
        keyword: parseAsString,
      });

      return {
        onReset: () => {
          setSearchParams((prev) => {
            // prev의 모든 키를 null로 변경
            const resetValues = Object.keys(prev).reduce(
              (acc, key) => {
                acc[key] = null;
                return acc;
              },
              {} as Record<string, null>
            );

            return resetValues;
          });
        },
      };
    } catch (_error) {
      console.warn('useResetSearchFilter mock failed, using fallback');
      return { onReset: vi.fn() };
    }
  },
}));

vi.mock('@repo/ui/Editor/CkEditor', () => ({
  default: ({
    data,
    onChange,
  }: {
    data?: string;
    onChange?: (event: null, editor: Pick<ClassicEditor, 'getData'>) => void;
  }) => {
    return React.createElement('div', {
      role: 'textbox',
      'aria-label': '리치 텍스트 편집기',
      contentEditable: true,
      dangerouslySetInnerHTML: { __html: data ?? '' },
      onInput: (e: React.FormEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        onChange?.(null, { getData: () => target.innerHTML });
      },
    });
  },
}));
