export interface BaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export type DrawerStateContextType = {
  isOpen: boolean;
};

export type DrawerDispatchContextType = {
  onOpen: () => void;
  onClose: () => void;
};