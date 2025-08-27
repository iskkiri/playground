import dynamic from 'next/dynamic';
import { useModal } from 'react-use-hook-modal';

const DeclarativeAlertModal = dynamic(
  () => import('@repo/ui-tailwind/DialogModals/AlertModal/DeclarativeAlertModal'),
  {
    ssr: false,
  }
);

export function useAlertModal() {
  const { open: openAlertModal, close: closeAlertModal } = useModal(DeclarativeAlertModal);

  return { openAlertModal, closeAlertModal };
}
