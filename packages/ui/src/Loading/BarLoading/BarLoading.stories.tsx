import { Meta, StoryObj } from '@storybook/react-vite';
import BarLoadingComponent from './BarLoading';

const meta = {
  title: 'Loading/BarLoading',
  component: BarLoadingComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BarLoadingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BarLoading: Story = {};
