import { Meta, StoryObj } from '@storybook/react-vite';
import FullPageLoadingComponent from './FullPageLoading';

const meta = {
  title: 'components/Loading/FullPageLoading',
  component: FullPageLoadingComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FullPageLoadingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullPageLoading: Story = {};
