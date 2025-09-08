import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useMemo, useState } from 'react';
import PhoneNumberInput from './PhoneNumberInput';
import { formatPhoneNumber } from '@repo/utils/formatPhoneNumber';

const meta = {
  title: 'Form/PhoneNumberInput',
  component: PhoneNumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Placeholder',
    isDirty: false,
    className: 'w-400',
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

    const isDirty = useMemo(() => !!value, [value]);
    const onClear = useCallback(() => setValue(''), []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p>state value : {value}</p>
          <p>display value : {formatPhoneNumber(value)}</p>
        </div>

        <PhoneNumberInput
          {...props}
          isDirty={isDirty}
          value={value}
          onChange={onChange}
          onClear={onClear}
        />
      </div>
    );
  },
};
