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

export type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;
export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;
export type OnInteractOutsideEvent = PointerDownOutsideEvent | FocusOutsideEvent;
