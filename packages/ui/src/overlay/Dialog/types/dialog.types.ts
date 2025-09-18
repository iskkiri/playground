export interface BaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export type DialogStateContextType = {
  isOpen: boolean;
};

export type DialogDispatchContextType = {
  onOpen: () => void;
  onClose: () => void;
};