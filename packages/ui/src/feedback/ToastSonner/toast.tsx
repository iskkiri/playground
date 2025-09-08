'use client';

import { toast as sonnerToast, type ExternalToast } from 'sonner';
import Toast, { type ToastProps } from './ToastSonner';

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
export function toast(prams: Omit<ToastProps, 'id'>, options?: ExternalToast) {
  const { message, type, isClose } = prams;
  const { position, duration, ...restOptions } = options || {};

  return sonnerToast.custom(
    (id) => <Toast id={id} type={type} message={message} isClose={isClose} />,
    {
      position: position || 'top-center',
      duration: duration || 3000,
      ...restOptions,
    }
  );
}
