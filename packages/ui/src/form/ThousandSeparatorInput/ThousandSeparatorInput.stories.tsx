import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useMemo, useState } from 'react';
import ThousandSeparatorInput from './ThousandSeparatorInput';
import { addThousandSeparator } from '@repo/utils/formatThousandSeparator';

const meta = {
  title: 'Form/ThousandSeparatorInput',
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
    className: 'w-400',
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

    const isDirty = useMemo(() => !!value, [value]);
    const onClear = useCallback(() => setValue(''), []);

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
          isDirty={isDirty}
          value={value}
          onChange={onChange}
          onClear={onClear}
        />
      </div>
    );
  },
};
