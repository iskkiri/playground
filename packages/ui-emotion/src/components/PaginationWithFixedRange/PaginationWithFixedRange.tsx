import { useEffect, useState } from 'react';
import { paginationWithFixedRangeCss } from './PaginationWithFixedRange.styles';
import FeatherIcons from '@repo/theme/featherIcons';

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
    <div css={paginationWithFixedRangeCss.block}>
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        css={paginationWithFixedRangeCss.button}
      >
        <FeatherIcons.ChevronLeft size={24} />
      </button>

      <ul css={paginationWithFixedRangeCss.list}>
        {[...Array(totalPages)]
          .slice(pageGroup * pageRangeSize, (pageGroup + 1) * pageRangeSize)
          .map((_, index) => {
            const page = pageGroup * pageRangeSize + (index + 1);

            return (
              <li key={index} onClick={onChangePage(page)}>
                <button
                  css={[
                    paginationWithFixedRangeCss.button,
                    currentPage === page && paginationWithFixedRangeCss.active,
                  ]}
                >
                  {page}
                </button>
              </li>
            );
          })}
      </ul>

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        css={paginationWithFixedRangeCss.button}
      >
        <FeatherIcons.ChevronRight size={24} />
      </button>
    </div>
  );
}
