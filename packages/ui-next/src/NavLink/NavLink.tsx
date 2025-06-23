'use client';

/** @jsxImportSource react */
import { useMemo } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

interface NavLinkRenderProps {
  isActive: boolean;
  isExactActive: boolean;
}

interface NavLinkProps extends Omit<LinkProps, 'children'> {
  // active path 직접 설정
  activePath?: string;
  // 활성 상태 클래스명 커스텀 (기본값: 'active')
  activeClassName?: string;
  // 정확히 일치하는 활성 상태 클래스명 커스텀 (기본값: 'exact-active')
  exactActiveClassName?: string;
  // 자식 요소 렌더링 함수 또는 React 노드
  children:
    | React.ReactNode
    | (({ isActive, isExactActive }: NavLinkRenderProps) => React.ReactNode);
  className?: string;
}

export default function NavLink({
  activePath,
  children,
  activeClassName = 'active',
  exactActiveClassName = 'exact-active',
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // href를 정규화된 형태로 변환
  // href 속성을 일관된 형식으로 변환하여 문자열이든 객체든 동일한 방식으로 처리
  const normalizedHref = useMemo(() => {
    if (typeof props.href === 'string') {
      const [path = '', query = ''] = props.href.split('?');
      return { path, query };
    }

    if (typeof props.href === 'object') {
      const path = props.href.pathname || '';
      let query = '';

      if (props.href.query) {
        if (typeof props.href.query === 'string') {
          query = props.href.query;
        } else {
          query = new URLSearchParams(props.href.query as Record<string, string>).toString();
        }
      }

      return { path, query };
    }

    return { path: '', query: '' };
  }, [props.href]);

  // 경로가 활성 상태인지 확인
  const isActive = useMemo(() => {
    // activePath가 우선 적용됨
    if (activePath) {
      const activePathParts = activePath.split('/').filter(Boolean);
      const pathnameParts = pathname.split('/').filter(Boolean);

      return activePathParts.every((part, index) => part === pathnameParts[index]);
    }

    const { path: hrefPath, query: hrefQuery } = normalizedHref;

    // 경로와 쿼리 비교 준비
    const hrefParts = hrefPath.split('/').filter(Boolean);
    const pathnameParts = pathname.split('/').filter(Boolean);

    const isPathMatch = hrefParts.every((part, index) => part === pathnameParts[index]);

    // 쿼리 문자열 여부에 따른 비교 처리
    if (hrefQuery) {
      const hrefSearchParams = new URLSearchParams(hrefQuery);
      let isQueryMatch = true;

      // 모든 href의 쿼리 파라미터가 현재 URL에 존재하고 값이 일치하는지 확인
      hrefSearchParams.forEach((value, key) => {
        if (searchParams.get(key) !== value) {
          isQueryMatch = false;
        }
      });

      return isPathMatch && isQueryMatch;
    }

    return isPathMatch;
  }, [activePath, normalizedHref, pathname, searchParams]);

  // 경로가 정확히 일치하는지 확인
  const isExactActive = useMemo(() => {
    const { path: hrefPath, query: hrefQuery } = normalizedHref;

    // 경로 정확히 일치 여부
    const isPathExactMatch = pathname === hrefPath;

    // 쿼리 파라미터 정확히 일치 여부
    if (hrefQuery) {
      const hrefSearchParams = new URLSearchParams(hrefQuery);
      const currentSearchParams = new URLSearchParams(searchParams.toString());

      // 두 쿼리 파라미터 집합이 정확히 일치하는지 확인
      return hrefSearchParams.toString() === currentSearchParams.toString();
    } else if (searchParams.toString()) {
      // href에 쿼리가 없지만 현재 URL에 쿼리가 있는 경우
      return false;
    }

    return isPathExactMatch;
  }, [normalizedHref, pathname, searchParams]);

  return (
    <Link
      {...props}
      className={clsx(
        props.className,
        { [activeClassName]: isActive },
        { [exactActiveClassName]: isExactActive }
      )}
    >
      {typeof children === 'function' ? children({ isActive, isExactActive }) : children}
    </Link>
  );
}
