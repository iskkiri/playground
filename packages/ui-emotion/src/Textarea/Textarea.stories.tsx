import type { Meta, StoryObj } from '@storybook/react-vite';
import Textarea from './Textarea';
import { css } from '@emotion/react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const meta: Meta<typeof Textarea> = {
  title: 'components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Placeholder',
    cssStyle: css`
      width: 400px;
      height: 100px;
    `,
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

    return (
      <Textarea
        {...props}
        onChange={onChange}
        value={text}
        cssStyle={css`
          width: 400px;
          height: 100px;
        `}
      />
    );
  },
};

export const FormExample: Story = {
  render: function Render(props) {
    const {
      register,
      formState: { errors },
    } = useForm<{ text: string }>({
      defaultValues: {
        text: '',
      },
    });

    return (
      <Textarea
        {...props}
        {...register('text')}
        isError={!!errors.text}
        cssStyle={css`
          width: 400px;
          height: 100px;
        `}
      />
    );
  },
};
