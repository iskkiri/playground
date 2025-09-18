import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../../general/Button/Button';
import Dialog from '../../overlay/Dialog/Dialog';
import ConfirmDialog from './ConfirmDialog';

const meta = {
  title: 'Feedback/ConfirmDialog',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <Dialog>
        <Dialog.Trigger asChild>
          <Button variant="primary">Open Confirm Modal</Button>
        </Dialog.Trigger>

        <ConfirmDialog
          title="모달 제목입니다."
          content="모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다."
          onConfirm={() => {}}
        />
      </Dialog>
    );
  },
};
