import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../../Button/Button';
import Modal from '@repo/ui-third-party/Modal/Modal';
import ConfirmModal from './ConfirmModal';

const meta = {
  title: 'components/DialogModals/ConfirmModal',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <Modal>
        <Modal.Trigger asChild>
          <Button variant="primary">Open Confirm Modal</Button>
        </Modal.Trigger>

        <ConfirmModal
          title="모달 제목입니다."
          content="모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다."
          onConfirm={() => {}}
        />
      </Modal>
    );
  },
};
