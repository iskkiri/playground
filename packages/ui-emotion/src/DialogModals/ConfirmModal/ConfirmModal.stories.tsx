import type { Meta, StoryObj } from '@storybook/react-vite';
import { lazy, useCallback } from 'react';
import { ModalProvider, useModal } from 'react-use-hook-modal';
import Button from '#src/Button/Button.js';

const ConfirmModalComponent = lazy(() => import('#src/DialogModals/ConfirmModal/ConfirmModal.js'));

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
    const { open: openConfirmModal, close: closeConfirmModal } = useModal(ConfirmModalComponent);

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
