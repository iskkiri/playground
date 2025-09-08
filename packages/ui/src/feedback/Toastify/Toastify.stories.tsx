import type { Meta, StoryObj } from '@storybook/react-vite';
import ToastifyComponent from './Toastify';

import { useCallback } from 'react';
import { toast } from 'react-toastify';
import FeatherIcons from '@repo/icons/featherIcons';
import Button from '#src/general/Button/Button';

const meta: Meta = {
  title: 'Feedback/Toastify',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <>
          <ToastifyComponent />
          <Story />
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ToastifySuccess: Story = {
  render: function Render() {
    const onOpenToast = useCallback(() => {
      toast('Toast Success Message', {
        type: 'success',
        icon: <FeatherIcons.CheckCircle size={20} color={'var(--toastify-color-success)'} />,
      });
    }, []);

    return (
      <Button variant="primary" onClick={onOpenToast}>
        Open Success Toast
      </Button>
    );
  },
};

export const ToastifyError: Story = {
  render: function Render() {
    const onOpenToast = useCallback(() => {
      toast('Toast Error Message', {
        type: 'error',
        icon: <FeatherIcons.XCircle size={20} color={'var(--toastify-color-error)'} />,
      });
    }, []);

    return (
      <Button variant="primary" onClick={onOpenToast}>
        Open Error Toast
      </Button>
    );
  },
};

export const ToastifyWarning: Story = {
  render: function Render() {
    const onOpenToast = useCallback(() => {
      toast('Toast Warning Message', {
        type: 'warning',
        icon: <FeatherIcons.AlertCircle size={20} color={'var(--toastify-color-warning)'} />,
      });
    }, []);

    return (
      <Button variant="primary" onClick={onOpenToast}>
        Open Warning Toast
      </Button>
    );
  },
};
