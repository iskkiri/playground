import type { FileSchema } from '@/_features/file/schemas/file.schema';

interface StorageFile {
  filename: string;
  storageFileUrl: string;
}

export const isStorageFileTypeGuard = (
  file: FileSchema
): file is StorageFile => {
  return !!(file.filename && file.storageFileUrl);
};
