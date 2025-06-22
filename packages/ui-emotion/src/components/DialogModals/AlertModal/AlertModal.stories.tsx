import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback } from 'react';
import { useAlertModal } from '../hooks/useDialogModals';
import { ModalProvider } from 'react-use-hook-modal';
import Button from '#src/components/Button/Button';

const meta = {
  title: 'components/DialogModals/AlertModal',
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

export const AlertModal: Story = {
  render: function Render() {
    const { openAlertModal, closeAlertModal } = useAlertModal();

    const onOpenAlertModal = useCallback(() => {
      openAlertModal({
        title: '모달 제목입니다.',
        content:
          '모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다.',
        onClose: closeAlertModal,
      });
    }, [closeAlertModal, openAlertModal]);

    return (
      <Button buttonType="primary" onClick={onOpenAlertModal}>
        Open Alert Modal
      </Button>
    );
  },
};
