import { validateFileSize } from '@repo/utils/validateFileSize';
import { toast } from '@repo/ui/feedback/ToastSonner/toast';
import { readFileAsDataURL } from '@repo/utils/image';
import { ImageSchema } from '../schemas/image.schema';

interface InsertImageParams {
  onChange: (value: ImageSchema) => void;
  fileSizeLimit?: number;
  storageImage?: string;
}

export const insertImage = ({ onChange, fileSizeLimit, storageImage }: InsertImageParams) => {
  return async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    const file = files[0];
    if (fileSizeLimit && !validateFileSize({ fileSize: file.size, fileSizeLimit })) {
      toast({
        type: 'error',
        message: `파일 크기는 ${fileSizeLimit}MB를 초과할 수 없습니다.`,
      });
      return;
    }

    const base64Image = await readFileAsDataURL(file);

    onChange({ file, base64Image, storageImage });
  };
};

interface RemoveImageParams {
  onChange: (value: ImageSchema) => void;
  storageImage?: string;
}

export const removeImage = ({ onChange, storageImage }: RemoveImageParams) => {
  return (e: React.MouseEvent) => {
    e.stopPropagation();

    onChange({ file: undefined, base64Image: undefined, storageImage });
  };
};
