import type { Meta, StoryObj } from '@storybook/react-vite';
import Label from './Label';
import TextInput from '../TextInput/TextInput';

const meta = {
  title: 'Form/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <>
        <Label className="flex flex-col gap-8">
          <span>Label</span>
          <TextInput />
        </Label>
      </>
    );
  },
};
