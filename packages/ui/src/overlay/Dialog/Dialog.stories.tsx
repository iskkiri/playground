import type { Meta, StoryObj } from '@storybook/react-vite';
import Dialog from './Dialog';
import Button from '#src/general/Button/Button';

const meta = {
  title: 'Overlay/Dialog',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <Dialog>
        <Dialog.Trigger asChild>
          <Button variant="primary">Open Modal</Button>
        </Dialog.Trigger>

        <Dialog.Content showCloseButton>
          <Dialog.Header>
            <Dialog.Title>모달 제목입니다.</Dialog.Title>
          </Dialog.Header>

          <p>모달 내용입니다.</p>

          <Dialog.Footer className="grid grid-cols-2">
            <Dialog.Close asChild>
              <Button variant="gray">취소</Button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <Button variant="primary">확인</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    );
  },
};
