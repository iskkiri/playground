import './styles/pagination.scss';

import ReactPaginate, { type ReactPaginateProps } from 'react-paginate';
import FeatherIcons from '@repo/icons/featherIcons';
import { cn } from '@repo/utils/cn';

export interface PaginationProps extends ReactPaginateProps {
  page: number;
}

export default function Pagination({ page, className, ...restProps }: PaginationProps) {
  return (
    <div
      className={cn('pagination__wrapper', className)}
      // css={[paginationCss.wrapper, cssStyle]}
    >
      <ReactPaginate
        {...restProps}
        breakLabel="···"
        previousLabel={<FeatherIcons.ChevronLeft color="#C1C7CD" />}
        nextLabel={<FeatherIcons.ChevronRight color="#C1C7CD" />}
        renderOnZeroPageCount={null}
        forcePage={page - 1}
        className="pagination"
      />
    </div>
  );
}
