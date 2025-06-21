import type { Meta, StoryObj } from '@storybook/react-vite';
import { css } from '@emotion/react';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ThousandSeparatorInput from './ThousandSeparatorInput';
import { addThousandSeparator } from '@repo/utils/formatThousandSeparator';

const meta = {
  title: 'components/ThousandSeparatorInput',
  component: ThousandSeparatorInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    min: 0,
    max: 1_000_000,
    placeholder: 'Placeholder',
    isDirty: false,
    cssStyle: css`
      width: 400px;
    `,
  },
} satisfies Meta<typeof ThousandSeparatorInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(props) {
    const [value, setValue] = useState('');
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p>state value : {value}</p>
          <p>display value : {addThousandSeparator(value)}</p>
        </div>

        <ThousandSeparatorInput
          {...props}
          min={Number(props.min)}
          max={Number(props.max)}
          onChange={onChange}
          value={value}
        />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: function Render(props) {
    const { control, watch } = useForm<{ price: number }>();
    const value = watch('price');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p>state value : {value}</p>
          <p>display value : {addThousandSeparator(value)}</p>
        </div>

        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <ThousandSeparatorInput
              {...props}
              min={Number(props.min)}
              max={Number(props.max)}
              {...field}
            />
          )}
        />
      </div>
    );
  },
};
