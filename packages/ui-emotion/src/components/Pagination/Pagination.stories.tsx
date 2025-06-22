import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from './Pagination';
import usePagination from '@repo/hooks/usePagination';

const meta: Meta<typeof Pagination> = {
  title: 'components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  args: {
    pageCount: 10,
    page: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {
  render: function Render(args) {
    const { page, onChangePage } = usePagination();

    return <Pagination {...args} page={page} onPageChange={onChangePage} />;
  },
};
