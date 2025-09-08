import { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import Slider from './Slider';

const meta = {
  title: 'Form/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: [50],
    onValueChange: () => {},
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs();

    const onValueChange = useCallback(
      (value: number[]) => {
        updateArgs({ value });
      },
      [updateArgs]
    );

    return <Slider step={1} value={args.value} onValueChange={onValueChange} className="w-240" />;
  },
};
