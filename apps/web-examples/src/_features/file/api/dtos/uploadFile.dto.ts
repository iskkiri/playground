export interface UploadFileRequestDto {
  formData: FormData;
  category: string;
}

export interface UploadFileResponseDto {
  fileUrl: string;
}
