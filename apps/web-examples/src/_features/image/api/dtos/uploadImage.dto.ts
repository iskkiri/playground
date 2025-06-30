export interface UploadImageRequestDto {
  formData: FormData;
  category: string; // s3 이미지 관리를 위해서 나눈 폴더 개념
}

export interface UploadImageResponseDto {
  imageUrl: string;
}
