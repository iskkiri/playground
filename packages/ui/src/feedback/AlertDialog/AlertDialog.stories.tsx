import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../../general/Button/Button';
import Dialog from '../../overlay/Dialog/Dialog';
import AlertDialog from './AlertDialog';

const meta = {
  title: 'Feedback/AlertDialog',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <Dialog>
        <Dialog.Trigger asChild>
          <Button variant="primary">Open Alert Dialog</Button>
        </Dialog.Trigger>

        <AlertDialog
          title="모달 제목입니다."
          content="모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다. 모달 내용입니다."
        />
      </Dialog>
    );
  },
};
