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
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(props) {
    const [args, updateArgs] = useArgs();

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        updateArgs({ checked: e.target.checked });
      },
      [updateArgs]
    );

    return <CheckBox {...props} checked={args.checked} onChange={onChange} />;
  },
};

export const Example: Story = {
  render: function Render(props) {
    const [consent, setConsent] = useState(false);

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => setConsent(e.target.checked),
      []
    );

    return (
      <CheckBox {...props} checked={consent} onChange={onChange}>
        [필수] 이용약관 동의하기
      </CheckBox>
    );
  },
};
