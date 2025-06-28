import type { Meta, StoryObj } from '@storybook/react-vite';
import PaginationWithFixedRange from './PaginationWithFixedRange';
import usePagination from '@repo/hooks/usePagination';

const meta = {
  title: 'components/PaginationWithFixedRange',
  component: PaginationWithFixedRange,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  args: {
    pageRangeSize: 10,
    totalPages: 20,
    currentPage: 1,
    onChangePage: () => () => {},
    onPreviousPage: () => {},
    onNextPage: () => {},
  },
} satisfies Meta<typeof PaginationWithFixedRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(args) {
    const { page, onChangePageWithFixedRange, onPreviousPage, onNextPage } = usePagination();

    return (
      <PaginationWithFixedRange
        {...args}
        currentPage={page}
        onChangePage={onChangePageWithFixedRange}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    );
  },
};
