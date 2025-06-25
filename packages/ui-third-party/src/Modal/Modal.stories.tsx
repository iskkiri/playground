import type { Meta, StoryObj } from '@storybook/react-vite';
import Modal from './Modal';
import { useState } from 'react';
import FeatherIcons from '@repo/theme/featherIcons';

const meta = {
  title: 'components/Modal',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ghostButtonStyle = {
  height: '50px',
  padding: '10px 20px',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  border: '1px solid #666',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#666',
} satisfies React.CSSProperties;

const primaryButtonStyle = {
  height: '50px',
  padding: '10px 20px',
  borderRadius: '8px',
  backgroundColor: 'blue',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
} satisfies React.CSSProperties;

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
        <button onClick={onOpenModal} style={primaryButtonStyle}>
          Open Modal
        </button>

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
            <button style={ghostButtonStyle} onClick={onCloseModal}>
              취소
            </button>
            <button style={primaryButtonStyle} onClick={onCloseModal}>
              확인
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
