import { Meta, StoryObj } from '@storybook/react-vite';
import SpinLoadingComponent from './SpinLoading';

const meta = {
  title: 'components/Loading/SpinLoading',
  component: SpinLoadingComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SpinLoadingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpinLoading: Story = {};
