import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../../general/Button/Button';
import ConfirmDialog from './ConfirmDialog';
import { ModalProvider, useModal } from 'react-use-hook-modal';
import { useCallback } from 'react';

const meta = {
  title: 'Feedback/ConfirmDialog',
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
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const { open: openConfirmDialog } = useModal(ConfirmDialog);

    const onOpenConfirmDialog = useCallback(async () => {
      const result = await openConfirmDialog({
        title: '모달 제목입니다.',
        content:
          '모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다.',
      });

      console.log('result', result);
    }, [openConfirmDialog]);

    return (
      <Button variant="primary" onClick={onOpenConfirmDialog}>
        Open Confirm Modal
      </Button>
    );
  },
};
