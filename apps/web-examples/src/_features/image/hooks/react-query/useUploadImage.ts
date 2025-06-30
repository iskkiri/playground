import { useMutation } from '@tanstack/react-query';
import { uploadImageApi } from '../../api/image.api';
import useOnErrorAlert from '@/_hooks/useOnErrorAlert';

export default function useUploadImage() {
  const { onError } = useOnErrorAlert();

  return useMutation({
    mutationFn: uploadImageApi,
    onError,
  });
}
