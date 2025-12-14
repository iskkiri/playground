import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../../general/Button/Button';
import ConfirmModal from './ConfirmModal';
import { ModalProvider, useModal } from 'react-use-hook-modal';
import { useCallback } from 'react';

const meta = {
  title: 'Feedback/ConfirmModal',
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
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const { open: openConfirmModal } = useModal(ConfirmModal);
    const onOpenConfirmModal = useCallback(async () => {
      const result = await openConfirmModal({
        title: '모달 제목입니다.',
        content:
          '모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다.',
      });

      console.log('result', result);
    }, [openConfirmModal]);

    return (
      <Button variant="primary" onClick={onOpenConfirmModal}>
        Open Confirm Modal
      </Button>
    );
  },
};
