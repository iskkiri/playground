import type { Meta, StoryObj } from '@storybook/nextjs';
import SlideAutoPlay from './SlideAutoPlay';

const meta = {
  title: 'examples/SlideAutoPlay',
  component: SlideAutoPlay,
} satisfies Meta<typeof SlideAutoPlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Bidirection: Story = {
  args: {
    isBidirection: true,
  },
};
