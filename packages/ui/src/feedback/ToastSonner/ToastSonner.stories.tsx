import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback } from 'react';
import { Toaster } from 'sonner';
import { toast } from './toast';
import Button from '#src/general/Button/Button';

const meta: Meta = {
  title: 'Feedback/ToastSonner',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <>
          <Toaster className="flex justify-center" />
          <Story />
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultToast: Story = {
  render: function Render() {
    const onOpenToast = useCallback(() => {
      toast({
        type: 'default',
        message: 'Default Toast',
      });
    }, []);

    return (
      <Button variant="primary" onClick={onOpenToast}>
        Open Default Toast
      </Button>
    );
  },
};

export const DefaultToastWithClose: Story = {
  render: function Render() {
    const onOpenToast = useCallback(() => {
      toast({
        type: 'default',
        message: 'Default Toast with close',
        isClose: true,
      });
    }, []);

    return (
      <Button variant="primary" onClick={onOpenToast}>
        Open Default Toast with close
      </Button>
    );
  },
};

export const InfoToast: Story = {
  render: function Render() {
    const onOpenToast = useCallback(() => {
      toast({
        type: 'info',
        message: 'Info Toast',
      });
    }, []);

    return (
      <Button variant="primary" onClick={onOpenToast}>
        Open Info Toast
      </Button>
    );
  },
};

export const WarningToast: Story = {
  render: function Render() {
    const onOpenToast = useCallback(() => {
      toast({
        type: 'warning',
        message: 'Warning Toast',
      });
    }, []);

    return (
      <Button variant="primary" onClick={onOpenToast}>
        Open Warning Toast
      </Button>
    );
  },
};

export const SuccessToast: Story = {
  render: function Render() {
    const onOpenToast = useCallback(() => {
      toast({
        type: 'success',
        message: 'Success Toast',
      });
    }, []);

    return (
      <Button variant="primary" onClick={onOpenToast}>
        Open Success Toast
      </Button>
    );
  },
};

export const ErrorToast: Story = {
  render: function Render() {
    const onOpenToast = useCallback(() => {
      toast({
        type: 'error',
        message: 'Error Toast',
      });
    }, []);

    return (
      <Button variant="primary" onClick={onOpenToast}>
        Open Error Toast
      </Button>
    );
  },
};
