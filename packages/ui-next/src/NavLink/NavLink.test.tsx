import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { usePathname, useSearchParams, type ReadonlyURLSearchParams } from 'next/navigation';
import NavLink from './NavLink';
import type { LinkProps } from 'next/link';

// Next.js Link 컴포넌트 모킹
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className,
    ...props
  }: LinkProps & { children: React.ReactNode; className?: string }) => (
    <a
      {...props}
      href={typeof href === 'string' ? href : href.pathname ?? ''}
      className={className}
    >
      {children}
    </a>
  ),
}));

describe('NavLink', () => {
  beforeEach(() => {
    // 기본 mock 상태 설정
    vi.mocked(usePathname).mockReturnValue('/');
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as ReadonlyURLSearchParams);
  });

  describe('활성 상태 표시', () => {
    it('현재 경로와 일치하는 링크에 active 상태가 된다', () => {
      vi.mocked(usePathname).mockReturnValue('/about');

      render(<NavLink href="/about">소개 페이지</NavLink>);

      const link = screen.getByRole('link', { name: '소개 페이지' });
      expect(link).toHaveClass('active');
    });

    it('현재 경로와 정확히 일치하는 링크에 active, exact-active 상태가 된다', () => {
      vi.mocked(usePathname).mockReturnValue('/about');

      render(<NavLink href="/about">소개 페이지</NavLink>);

      const link = screen.getByRole('link', { name: '소개 페이지' });
      expect(link).toHaveClass('active');
      expect(link).toHaveClass('exact-active');
    });

    it('하위 경로에서도 상위 경로 링크에 active 상태가 된다', () => {
      vi.mocked(usePathname).mockReturnValue('/products/electronics');

      render(<NavLink href="/products">제품</NavLink>);

      const link = screen.getByRole('link', { name: '제품' });
      expect(link).toHaveClass('active');
      expect(link).not.toHaveClass('exact-active');
    });

    it('일치하지 않는 경로에서는 active, exact-active 상태가 되지 않는다', () => {
      vi.mocked(usePathname).mockReturnValue('/contact');

      render(<NavLink href="/about">소개 페이지</NavLink>);

      const link = screen.getByRole('link', { name: '소개 페이지' });
      expect(link).not.toHaveClass('active');
      expect(link).not.toHaveClass('exact-active');
    });
  });

  describe('쿼리 파라미터가 있는 링크', () => {
    it('쿼리 파라미터가 일치하는 경우 active 상태가 된다', () => {
      vi.mocked(usePathname).mockReturnValue('/search');
      vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams('category=books&sort=newest') as ReadonlyURLSearchParams
      );

      render(<NavLink href="/search?category=books">검색 결과</NavLink>);

      const link = screen.getByRole('link', { name: '검색 결과' });
      expect(link).toHaveClass('active');
      expect(link).not.toHaveClass('exact-active');
    });

    it('쿼리 파라미터가 모두 일치하는 경우 active, exact-active 상태가 된다', () => {
      vi.mocked(usePathname).mockReturnValue('/search');
      vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams('category=books&sort=newest') as ReadonlyURLSearchParams
      );

      render(<NavLink href="/search?category=books&sort=newest">검색 결과</NavLink>);

      const link = screen.getByRole('link', { name: '검색 결과' });
      expect(link).toHaveClass('active');
      expect(link).toHaveClass('exact-active');
    });

    it('쿼리 파라미터가 일치하지 않으면 active, exact-active 상태가 되지 않는다', () => {
      vi.mocked(usePathname).mockReturnValue('/search');
      vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams('category=electronics') as ReadonlyURLSearchParams
      );

      render(<NavLink href="/search?category=books">검색 결과</NavLink>);

      const link = screen.getByRole('link', { name: '검색 결과' });
      expect(link).not.toHaveClass('active');
      expect(link).not.toHaveClass('exact-active');
    });
  });

  describe('커스텀 활성 클래스명', () => {
    it('커스텀 activeClassName이 적용된다', () => {
      vi.mocked(usePathname).mockReturnValue('/about');

      render(
        <NavLink href="/about" activeClassName="current">
          소개 페이지
        </NavLink>
      );

      const link = screen.getByRole('link', { name: '소개 페이지' });
      expect(link).toHaveClass('current');
      expect(link).not.toHaveClass('active');
    });

    it('커스텀 exactActiveClassName이 적용된다', () => {
      vi.mocked(usePathname).mockReturnValue('/about');

      render(
        <NavLink href="/about" exactActiveClassName="exact-current">
          소개 페이지
        </NavLink>
      );

      const link = screen.getByRole('link', { name: '소개 페이지' });
      expect(link).toHaveClass('exact-current');
      expect(link).not.toHaveClass('exact-active');
    });
  });

  describe('activePath 우선 적용', () => {
    it('activePath가 설정되면 href 대신 activePath로 활성 상태를 판단한다', () => {
      vi.mocked(usePathname).mockReturnValue('/admin/users');

      render(
        <NavLink href="/users" activePath="/admin">
          사용자 관리
        </NavLink>
      );

      const link = screen.getByRole('link', { name: '사용자 관리' });
      expect(link).toHaveClass('active');
    });
  });

  describe('render props 패턴', () => {
    it('함수형 children이 활성 상태 정보를 받아 올바르게 렌더링된다', () => {
      vi.mocked(usePathname).mockReturnValue('/dashboard');

      render(
        <NavLink href="/dashboard">
          {({ isActive, isExactActive }) => (
            <div>
              대시보드 {isActive && '(활성)'} {isExactActive && '(정확히 일치)'}
            </div>
          )}
        </NavLink>
      );

      expect(screen.getByText('대시보드 (활성) (정확히 일치)')).toBeInTheDocument();
    });

    it('비활성 상태에서도 함수형 children이 올바르게 렌더링된다', () => {
      vi.mocked(usePathname).mockReturnValue('/other');

      render(
        <NavLink href="/dashboard">
          {({ isActive, isExactActive }) => (
            <div>
              대시보드 {isActive && '(활성)'} {isExactActive && '(정확히 일치)'}
            </div>
          )}
        </NavLink>
      );

      expect(screen.getByText('대시보드')).toBeInTheDocument();
      expect(screen.queryByText('(활성)')).not.toBeInTheDocument();
      expect(screen.queryByText('(정확히 일치)')).not.toBeInTheDocument();
    });
  });

  describe('기존 className과의 결합', () => {
    it('기존 className과 활성 클래스가 함께 적용된다', () => {
      vi.mocked(usePathname).mockReturnValue('/about');

      render(
        <NavLink href="/about" className="nav-item btn">
          소개 페이지
        </NavLink>
      );

      const link = screen.getByRole('link', { name: '소개 페이지' });
      expect(link).toHaveClass('nav-item', 'btn', 'active', 'exact-active');
    });
  });
});
