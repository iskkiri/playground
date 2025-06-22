import type { Meta, StoryObj } from '@storybook/react-vite';
import ToastSonnerComponent from './ToastSonner';
import { toast } from 'sonner';
import { useCallback } from 'react';
import Button from '#src/components/Button/Button';

const meta = {
  title: 'components/Toast/ToastSonner',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <>
          <ToastSonnerComponent />
          <Story />
        </>
      );
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToastSuccess: Story = {
  render: function Render() {
    const onOpenToast = useCallback(() => {
      toast.success('Toast Success Message');
    }, []);

    return (
      <Button buttonType="primary" onClick={onOpenToast}>
        Open Success Toast
      </Button>
    );
  },
};

export const ToastError: Story = {
  render: function Render() {
    const onOpenToast = useCallback(() => {
      toast.error('Toast Error Message');
    }, []);

    return (
      <Button buttonType="primary" onClick={onOpenToast}>
        Open Error Toast
      </Button>
    );
  },
};
