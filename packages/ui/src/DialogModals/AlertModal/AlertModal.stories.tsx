import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';
import AlertModal from './AlertModal';

const meta = {
  title: 'components/DialogModals/AlertModal',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AlertModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <Modal>
        <Modal.Trigger asChild>
          <Button variant="primary">Open Alert Modal</Button>
        </Modal.Trigger>

        <AlertModal
          title="모달 제목입니다."
          content="모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다."
        />
      </Modal>
    );
  },
};
