import './styles/toast-sonner.scss';

import { useCallback } from 'react';
import { toast as sonnerToast } from 'sonner';
import FeatherIcons from '@repo/icons/featherIcons';
import SuccessIcon from './assets/success_icon.svg';
import ErrorIcon from './assets/error_icon.svg';
import WraningIcon from './assets/warning_icon.svg';
import InfoIcon from './assets/info_icon.svg';

export interface ToastProps {
  id: string | number;
  type: 'default' | 'info' | 'warning' | 'success' | 'error';
  message: string;
  isClose?: boolean;
}
/**
 * @docs https://sonner.emilkowal.ski/toast#headless
 * Use it to render an unstyled toast with custom jsx while maintaining the functionality.
 * This function receives the Toast as an argument, giving you access to all properties.
 */
export default function Toast({ id, type, message, isClose }: ToastProps) {
  const onClose = useCallback(() => sonnerToast.dismiss(id), [id]);

  return (
    <div className="toast-sonner__wrapper">
      <div className="toast-sonner__content">
        {type === 'success' && <SuccessIcon width={20} height={20} />}
        {type === 'error' && <ErrorIcon width={20} height={20} />}
        {type === 'warning' && <WraningIcon width={20} height={20} />}
        {type === 'info' && <InfoIcon width={20} height={20} />}

        <p className="toast-sonner__message">{message}</p>
      </div>

      {isClose && (
        <button className="toast-sonner__close-button" onClick={onClose}>
          <FeatherIcons.X width={16} height={16} />
        </button>
      )}
    </div>
  );
}
