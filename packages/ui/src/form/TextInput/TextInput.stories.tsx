import type { Meta, StoryObj } from '@storybook/react-vite';
import TextInput from './TextInput';
import { useCallback, useState } from 'react';
import FeatherIcons from '@repo/icons/featherIcons';

const meta = {
  title: 'Form/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Placeholder',
    disabled: false,
    className: 'w-400',
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(props) {
    return <TextInput {...props} />;
  },
};

export const DisabledTextInput: Story = {
  render: function Render(props) {
    return <TextInput {...props} disabled />;
  },
};

export const PasswordTextInput: Story = {
  render: function Render(props) {
    return <TextInput {...props} type="password" />;
  },
};

export const TextInputWithPrefix: Story = {
  render: function Render(props) {
    return <TextInput {...props} prefix={<FeatherIcons.Search size={20} color={'#A2A9B0'} />} />;
  },
};

export const TextInputWithSuffix: Story = {
  render: function Render(props) {
    return <TextInput {...props} suffix={<FeatherIcons.Search size={20} color={'#A2A9B0'} />} />;
  },
};

export const Example: Story = {
  render: function Render(props) {
    const [text, setText] = useState('');

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value),
      []
    );

    return (
      <TextInput
        {...props}
        onChange={onChange}
        value={text}
        suffix={<FeatherIcons.Search size={20} color={'#A2A9B0'} />}
      />
    );
  },
};
