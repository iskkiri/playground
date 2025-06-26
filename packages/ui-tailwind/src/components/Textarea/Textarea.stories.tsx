import type { Meta, StoryObj } from '@storybook/react-vite';
import Textarea from './Textarea';
import { useCallback, useState } from 'react';

const meta: Meta<typeof Textarea> = {
  title: 'components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Placeholder',
    className: 'w-400 h-120',
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {};

export const DisabledTextarea: Story = {
  render: function Render(props) {
    return <Textarea {...props} disabled />;
  },
};

export const TextareaWithError: Story = {
  render: function Render(props) {
    return <Textarea {...props} isError />;
  },
};

export const Example: Story = {
  render: function Render(props) {
    const [text, setText] = useState('');

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value),
      []
    );

    return <Textarea {...props} onChange={onChange} value={text} />;
  },
};
