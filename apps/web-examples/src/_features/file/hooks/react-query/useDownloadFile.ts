import { useMutation } from '@tanstack/react-query';
import { downloadFileApi } from '../../api/file.api';
import useOnErrorAlert from '@/_hooks/useOnErrorAlert';

export default function useDownloadFileMutation() {
  const { onError } = useOnErrorAlert();

  return useMutation({
    mutationFn: downloadFileApi,
    onError,
  });
}
