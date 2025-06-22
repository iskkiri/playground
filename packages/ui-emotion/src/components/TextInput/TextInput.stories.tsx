import type { Meta, StoryObj } from '@storybook/react-vite';
import TextInput from './TextInput';
import { css } from '@emotion/react';
import { useCallback, useMemo, useState } from 'react';
import FeatherIcons from '@repo/theme/featherIcons';
import { useForm } from 'react-hook-form';
import useClearField from '@repo/hooks/useClearField';

const meta = {
  title: 'components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Placeholder',
    isDirty: false,
    cssStyle: css`
      width: 400px;
    `,
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

export const TextInputWithError: Story = {
  render: function Render(props) {
    return <TextInput {...props} isError />;
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

    const isDirty = useMemo(() => !!text, [text]);

    const onClear = useCallback(() => setText(''), []);
    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value),
      []
    );

    return (
      <TextInput
        {...props}
        isDirty={isDirty}
        onClear={onClear}
        onChange={onChange}
        value={text}
        suffix={<FeatherIcons.Search size={20} color={'#A2A9B0'} />}
      />
    );
  },
};

export const FormExample: Story = {
  render: function Render(props) {
    const {
      register,
      resetField,
      formState: { dirtyFields, errors },
    } = useForm<{ text: string }>({ defaultValues: { text: '' } });

    const { onClearField } = useClearField({ resetField });

    return (
      <TextInput
        {...props}
        {...register('text')}
        isDirty={dirtyFields.text}
        isError={!!errors.text}
        onClear={onClearField('text')}
      />
    );
  },
};
