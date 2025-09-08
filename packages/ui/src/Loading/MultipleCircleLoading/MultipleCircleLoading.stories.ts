import { Meta, StoryObj } from '@storybook/react-vite';
import MultipleCircleLoadingComponent from './MultipleCircleLoading';

const meta = {
  title: 'Loading/MultipleCircleLoading',
  component: MultipleCircleLoadingComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MultipleCircleLoadingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultipleCircleLoading: Story = {};
