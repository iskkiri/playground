import type { Meta, StoryObj } from '@storybook/react-vite';
import Modal from './Modal';
import { useState } from 'react';
import FeatherIcons from '@repo/theme/featherIcons';
import Button from '../_internal/Button';

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
    const [isOpen, setIsOpen] = useState(false);

    const onOpenModal = () => {
      setIsOpen(true);
    };

    const onCloseModal = () => {
      setIsOpen(false);
    };

    return (
      <>
        <Button onClick={onOpenModal} variant="primary">
          Open Modal
        </Button>

        <Modal isOpen={isOpen} onClose={onCloseModal}>
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
            <Button onClick={onCloseModal} variant="ghost">
              취소
            </Button>
            <Button onClick={onCloseModal} variant="primary">
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
