import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback } from 'react';
import { useConfirmModal } from '../hooks/useDialogModals';
import { ModalProvider } from 'react-use-hook-modal';
import Button from '#src/components/Button/Button';

const meta = {
  title: 'components/DialogModals/ConfirmModal',
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
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConfirmModal: Story = {
  render: function Render() {
    const { openConfirmModal, closeConfirmModal } = useConfirmModal();

    const onOpenConfirmModal = useCallback(() => {
      openConfirmModal({
        title: '모달 제목입니다.',
        content:
          '모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다.',
        onClose: closeConfirmModal,
        onConfirm: () => {
          closeConfirmModal();
        },
      });
    }, [closeConfirmModal, openConfirmModal]);

    return (
      <Button buttonType="primary" onClick={onOpenConfirmModal}>
        Open Confirm Modal
      </Button>
    );
  },
};
