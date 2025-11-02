import type { Meta, StoryObj } from '@storybook/react-vite';
import InputGroup from './InputGroup';
import { useCallback, useState } from 'react';
import FeatherIcons from '@repo/icons/featherIcons';

const meta = {
  title: 'Form/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(props) {
    return (
      <InputGroup {...props} className="w-400">
        <InputGroup.Input placeholder="Placeholder" className="px-20" />
      </InputGroup>
    );
  },
};

export const DisabledInput: Story = {
  render: function Render(props) {
    return (
      <InputGroup {...props} className="w-400">
        <InputGroup.Input placeholder="Placeholder" className="px-20" disabled />
      </InputGroup>
    );
  },
};

export const InputWithError: Story = {
  render: function Render(props) {
    return (
      <InputGroup {...props} className="w-400">
        <InputGroup.Input placeholder="Placeholder" className="px-20" aria-invalid />
      </InputGroup>
    );
  },
};

export const InputWithPrefix: Story = {
  render: function Render(props) {
    return (
      <InputGroup {...props} className="w-400">
        <InputGroup.Addon>
          <FeatherIcons.Search size={20} color={'#A2A9B0'} />
        </InputGroup.Addon>

        <InputGroup.Input placeholder="Placeholder" className="pr-20" />
      </InputGroup>
    );
  },
};

export const InputWithPrefixText: Story = {
  render: function Render(props) {
    return (
      <InputGroup {...props} className="w-400">
        <InputGroup.Addon>
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>

        <InputGroup.Input placeholder="example.com" className="pr-20" />
      </InputGroup>
    );
  },
};

export const InputWithSuffix: Story = {
  render: function Render(props) {
    return (
      <InputGroup {...props} className="w-400">
        <InputGroup.Input placeholder="Placeholder" className="pl-20" />

        <InputGroup.Addon align="inline-end">
          <FeatherIcons.Search size={20} color={'#A2A9B0'} />
        </InputGroup.Addon>
      </InputGroup>
    );
  },
};

export const InputWithSuffixText: Story = {
  render: function Render(props) {
    const [text, setText] = useState('');

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value),
      []
    );

    return (
      <InputGroup {...props} className="w-400">
        <InputGroup.Input
          placeholder="Placeholder"
          className="pl-20"
          onChange={onChange}
          value={text}
          maxLength={16}
        />

        <InputGroup.Addon align="inline-end">
          <InputGroup.Text>{text.length}/16</InputGroup.Text>
        </InputGroup.Addon>
      </InputGroup>
    );
  },
};
