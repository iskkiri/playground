import { useCallback } from 'react';

interface CopyClipboardParams {
  copyText: string;
  successMessage?: string;
  failureMessage?: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}
type CopyClipboard = (params: CopyClipboardParams) => Promise<void>;

export default function useCopyClipboard() {
  const copyClipboard: CopyClipboard = useCallback(
    async ({ copyText, successMessage, failureMessage, onSuccess, onFailure }) => {
      try {
        await window.navigator.clipboard.writeText(copyText);
        if (onSuccess) {
          onSuccess();
        } else {
          window.alert(successMessage);
        }
      } catch (_err) {
        if (onFailure) {
          onFailure();
        } else {
          window.alert(failureMessage);
        }
      }
    },
    []
  );

  return { copyClipboard };
}
