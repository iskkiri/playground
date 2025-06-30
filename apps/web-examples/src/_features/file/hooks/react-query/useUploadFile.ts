import { useMutation } from '@tanstack/react-query';
import { uploadFileApi } from '../../api/file.api';
import useOnErrorAlert from '@/_hooks/useOnErrorAlert';

export default function useUploadFile() {
  const { onError } = useOnErrorAlert();

  return useMutation({
    mutationFn: uploadFileApi,
    onError,
  });
}
