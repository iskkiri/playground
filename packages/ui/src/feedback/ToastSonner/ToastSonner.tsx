'use client';

import { useCallback } from 'react';
import { toast as sonnerToast } from 'sonner';
import { cn } from '@repo/utils/cn';
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
    <div
      className={cn(
        'box-border p-12 px-16',
        'rounded-8 bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)]',
        'flex items-center justify-between',
        'min-w-[343px]'
      )}
    >
      <div className="flex flex-1 items-center gap-8">
        {type === 'success' && <SuccessIcon width={20} height={20} />}
        {type === 'error' && <ErrorIcon width={20} height={20} />}
        {type === 'warning' && <WraningIcon width={20} height={20} />}
        {type === 'info' && <InfoIcon width={20} height={20} />}

        <p className="text-14 leading-[22px]">{message}</p>
      </div>

      {isClose && (
        <button
          className="m-0 flex cursor-pointer items-center justify-center border-none bg-transparent p-0"
          onClick={onClose}
        >
          <FeatherIcons.X width={16} height={16} />
        </button>
      )}
    </div>
  );
}
