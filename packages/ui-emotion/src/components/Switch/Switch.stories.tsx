import { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Controller, useForm } from 'react-hook-form';
import Switch from './Switch';

const meta = {
  title: 'components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    checked: false,
    onChange: () => {},
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(props) {
    const [args, updateArgs] = useArgs();

    const onChange = useCallback(() => {
      updateArgs({ checked: !args.checked });
    }, [args.checked, updateArgs]);

    return <Switch {...props} checked={args.checked} onChange={onChange} />;
  },
};

export const ControllerExample: Story = {
  render: function Render(props) {
    const { control } = useForm<{ checked: boolean }>({
      defaultValues: {
        checked: false,
      },
    });

    return (
      <Controller
        control={control}
        name="checked"
        render={({ field: { value, onChange } }) => (
          <Switch
            //
            {...props}
            checked={value}
            onChange={onChange}
          />
        )}
      />
    );
  },
};
