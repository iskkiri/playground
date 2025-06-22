import ReactPaginate, { type ReactPaginateProps } from 'react-paginate';
import { paginationCss } from './Pagination.styles';
import type { Interpolation, Theme } from '@emotion/react';
import FeatherIcons from '@repo/theme/featherIcons';

export interface PaginationProps extends ReactPaginateProps {
  page: number;
  cssStyle?: Interpolation<Theme>;
}

export default function Pagination({ page, cssStyle, ...restProps }: PaginationProps) {
  return (
    <div css={[paginationCss.wrapper, cssStyle]}>
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
