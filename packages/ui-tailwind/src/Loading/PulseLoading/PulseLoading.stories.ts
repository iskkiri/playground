import { Meta, StoryObj } from '@storybook/react-vite';
import PulseLoadingComponent from './PulseLoading';

const meta = {
  title: 'components/Loading/PulseLoading',
  component: PulseLoadingComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PulseLoadingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PulseLoading: Story = {};
