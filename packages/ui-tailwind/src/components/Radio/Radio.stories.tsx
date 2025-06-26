import { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Radio from './Radio';
import { useArgs } from 'storybook/preview-api';

const meta = {
  title: 'components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      description: '체크 여부',
    },
    name: {
      description: '이름',
    },
    value: {
      description: '값',
    },
  },
  args: {
    children: 'Radio',
    checked: false,
    name: 'name',
    value: 'value',
    disabled: false,
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  // name: '기본',
  render: function Render(props) {
    const [args, updateArgs] = useArgs();

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        updateArgs({ checked: e.target.checked });
      },
      [updateArgs]
    );

    return <Radio {...props} onChange={onChange} checked={args.checked} />;
  },
};

export const Example: Story = {
  // name: '예시',
  render: function Render(props) {
    const [value, setValue] = useState('option1');

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, []);

    return (
      <div style={{ display: 'flex', gap: 16 }}>
        <Radio
          {...props}
          name="option"
          value="option1"
          onChange={onChange}
          checked={value === 'option1'}
        >
          옵션1
        </Radio>

        <Radio
          {...props}
          name="option"
          value="option2"
          onChange={onChange}
          checked={value === 'option2'}
        >
          옵션2
        </Radio>

        <Radio
          {...props}
          name="option"
          value="option3"
          onChange={onChange}
          checked={value === 'option3'}
        >
          옵션3
        </Radio>
      </div>
    );
  },
};
