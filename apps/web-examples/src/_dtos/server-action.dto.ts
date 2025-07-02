export interface SuccessServerActionResponseDto<T> {
  success: true;
  data: T;
}

export interface ErrorServerActionResponseDto {
  success: false;
  statusCode: number;
  message: string;
}

export type ServerActionResponseDto<T> = Promise<
  SuccessServerActionResponseDto<T> | ErrorServerActionResponseDto
>;
