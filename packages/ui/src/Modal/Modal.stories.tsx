import type { Meta, StoryObj } from '@storybook/react-vite';
import Modal from './Modal';
import FeatherIcons from '@repo/icons/featherIcons';
import Button from '#src/Button/Button';

const meta = {
  title: 'components/Modal',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <>
        <Modal>
          <Modal.Trigger asChild>
            <Button variant="primary">Open Modal</Button>
          </Modal.Trigger>

          <Modal.Content>
            <Modal.Header>
              <Modal.Title>모달 제목입니다.</Modal.Title>
            </Modal.Header>

            <Modal.CloseTrigger>
              <FeatherIcons.X />
            </Modal.CloseTrigger>

            <Modal.Body>
              <p>모달 내용입니다.</p>
            </Modal.Body>

            <Modal.Footer style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Modal.CloseTrigger asChild>
                <Button variant="gray">취소</Button>
              </Modal.CloseTrigger>

              <Modal.CloseTrigger asChild>
                <Button variant="primary">확인</Button>
              </Modal.CloseTrigger>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};
