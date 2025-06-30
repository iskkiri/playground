import { useCallback } from 'react';
import useDownloadFileMutation from './react-query/useDownloadFile';
import useOnErrorAlert from '@/_hooks/useOnErrorAlert';

export function useDownloadFile() {
  const { mutate: downloadFileMutation, isPending } = useDownloadFileMutation();
  const { onError } = useOnErrorAlert();

  const downloadFile = useCallback(
    ({ url, filename }: { url: string; filename: string }) => {
      downloadFileMutation(url, {
        onSuccess: ({ type, arrayBuffer }) => {
          const blob = new Blob([Uint8Array.from(arrayBuffer)], { type });

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();

          // 메모리 정리
          window.URL.revokeObjectURL(url);
        },
        onError,
      });
    },
    [downloadFileMutation, onError]
  );

  return { downloadFile, isPending };
}
