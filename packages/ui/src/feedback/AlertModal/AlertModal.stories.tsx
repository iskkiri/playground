import { lazy, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../../general/Button/Button';
import { ModalProvider, useModal } from 'react-use-hook-modal';

const AlertModal = lazy(() => import('./AlertModal'));

const meta = {
  title: 'Feedback/AlertModal',
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
} satisfies Meta<typeof AlertModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const { open: openAlertModal } = useModal(AlertModal);

    const onOpenAlertModal = useCallback(async () => {
      const result = await openAlertModal({
        title: '모달 제목입니다.',
        content:
          '모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다.',
      });

      console.log('result', result);
    }, [openAlertModal]);

    return (
      <Button variant="primary" onClick={onOpenAlertModal}>
        Open Alert Modal
      </Button>
    );
  },
};
