'use client';

import { useEffect, useState } from 'react';
import FeatherIcons from '@repo/icons/featherIcons';
import { cva } from 'class-variance-authority';
import { cn } from '@repo/utils/cn';

interface PaginationWithFixedRangeProps {
  /** 고정시킬 페이지 범위 (ex. 5, 10, 20, ...) */
  pageRangeSize?: number;
  /** 페이지 수 */
  totalPages: number;
  /** 현재 페이지 */
  currentPage: number;
  onChangePage: (page: number) => () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const buttonVariants = cva(
  cn(
    'rounded-4 typography-p3-16r flex h-32 w-32 items-center justify-center border border-gray-300 p-4 text-gray-400',
    'hover:border-primary-hover hover:bg-primary-hover hover:text-white hover:[&_svg]:stroke-white',
    'disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-200',
    'disabled:[&_svg]:stroke-gray-300'
  ),
  {
    variants: {
      isActive: {
        true: 'border-primary bg-primary font-bold text-white',
        false: '',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

export default function PaginationWithFixedRange({
  pageRangeSize = 5,
  totalPages,
  currentPage,
  onChangePage,
  onPreviousPage,
  onNextPage,
}: PaginationWithFixedRangeProps) {
  const [pageGroup, setPageGroup] = useState(0);

  useEffect(() => {
    const selectedGroup = Math.floor((currentPage - 1) / pageRangeSize);
    if (selectedGroup !== pageGroup) {
      setPageGroup(selectedGroup);
    }
  }, [currentPage, pageGroup, pageRangeSize]);

  return (
    <div className="box-border flex gap-6 [&_svg]:stroke-gray-400">
      <button onClick={onPreviousPage} disabled={currentPage === 1} className={buttonVariants()}>
        <FeatherIcons.ChevronLeft size={24} />
      </button>

      <ul className="flex gap-6">
        {[...Array(totalPages)]
          .slice(pageGroup * pageRangeSize, (pageGroup + 1) * pageRangeSize)
          .map((_, index) => {
            const page = pageGroup * pageRangeSize + (index + 1);

            return (
              <li key={index} onClick={onChangePage(page)}>
                <button className={buttonVariants({ isActive: currentPage === page })}>
                  {page}
                </button>
              </li>
            );
          })}
      </ul>

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={buttonVariants()}
      >
        <FeatherIcons.ChevronRight size={24} />
      </button>
    </div>
  );
}
