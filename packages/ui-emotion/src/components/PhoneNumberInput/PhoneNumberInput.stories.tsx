import type { Meta, StoryObj } from '@storybook/react-vite';
import { css } from '@emotion/react';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneNumberInput from './PhoneNumberInput';
import { formatPhoneNumber } from '@repo/utils/formatPhoneNumber';

const meta = {
  title: 'components/PhoneNumberInput',
  component: PhoneNumberInput,
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
} satisfies Meta<typeof PhoneNumberInput>;

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
          <p>display value : {formatPhoneNumber(value)}</p>
        </div>

        <PhoneNumberInput {...props} onChange={onChange} value={value} />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: function Render(props) {
    const { control, watch } = useForm<{ phoneNumber: string }>();
    const value = watch('phoneNumber');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p>state value : {value}</p>
          <p>display value : {formatPhoneNumber(value)}</p>
        </div>

        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => <PhoneNumberInput {...props} {...field} />}
        />
      </div>
    );
  },
};
