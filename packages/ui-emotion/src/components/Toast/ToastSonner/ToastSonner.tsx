import { Global } from '@emotion/react';
import { Toaster } from 'sonner';
import { toastSonnerCss } from './ToastSonner.styles';
import FeatherIcons from '@repo/theme/featherIcons';
import theme from '#src/theme/index';

/**
 * @docs https://sonner.emilkowal.ski/getting-started
 */
export default function ToastSonner() {
  return (
    <>
      <Global styles={toastSonnerCss.global} />

      <Toaster
        position="top-center"
        icons={{
          success: <FeatherIcons.Check size={16} color={theme.colors.teal500} />,
          error: <FeatherIcons.X size={16} color={theme.colors.red500} />,
        }}
        toastOptions={{
          duration: 5000 * 100,
          className: 'toast-sonner',
        }}
      />
    </>
  );
}
