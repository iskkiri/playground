import { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import CheckBox from './CheckBox';
import { useArgs } from 'storybook/preview-api';

const meta = {
  title: 'Form/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: '전체 동의',
    checked: false,
    disabled: false,
    'aria-invalid': false,
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(props) {
    const [args, updateArgs] = useArgs();

    const onChange = useCallback(
      (checked: boolean) => {
        updateArgs({ checked });
      },
      [updateArgs]
    );

    return <CheckBox {...props} checked={args.checked} onCheckedChange={onChange} />;
  },
};

export const Example: Story = {
  render: function Render(props) {
    const [consent, setConsent] = useState(false);

    const onChange = useCallback((checked: boolean) => setConsent(checked), []);

    return (
      <CheckBox {...props} checked={consent} onCheckedChange={onChange}>
        [필수] 이용약관 동의하기
      </CheckBox>
    );
  },
};
