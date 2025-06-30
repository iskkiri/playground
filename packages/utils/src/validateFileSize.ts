interface ValidateFileSizeParams {
  fileSize: number;
  fileSizeLimit: number;
}

const MEGA_BYTE = 1024 * 1024;

export const validateFileSize = ({ fileSize, fileSizeLimit }: ValidateFileSizeParams) => {
  if (fileSize > fileSizeLimit * MEGA_BYTE) return false;

  return true;
};
