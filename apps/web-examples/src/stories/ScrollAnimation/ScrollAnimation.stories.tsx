import type { Meta, StoryObj } from '@storybook/nextjs';
import ScrollTriggeredItem from './ScrollTriggeredItem';

const meta = {
  title: 'examples/Scroll Animation',
  component: () => (
    <div className="gap-300 p-200 flex flex-col">
      {[...Array(10)].map((_, index) => (
        <ScrollTriggeredItem key={index} index={index} />
      ))}
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ScrollTriggeredItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
