import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../../general/Button/Button';
import AlertDialog from './AlertDialog';
import { ModalProvider, useModal } from 'react-use-hook-modal';
import { useCallback } from 'react';

const meta = {
  title: 'Feedback/AlertDialog',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <ModalProvider>
          <Story />
        </ModalProvider>
      );
    },
  ],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const { open: openAlertDialog } = useModal(AlertDialog);

    const onOpenAlertDialog = useCallback(async () => {
      const result = await openAlertDialog({
        title: '모달 제목입니다.',
        content:
          '모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다.',
      });

      console.log('result', result);
    }, [openAlertDialog]);

    return (
      <Button variant="primary" onClick={onOpenAlertDialog}>
        Open Alert Dialog
      </Button>
    );
  },
};
