export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type ModalStateContextType = {
  isOpen: boolean;
};

export type ModalDispatchContextType = {
  onOpen: () => void;
  onClose: () => void;
};
