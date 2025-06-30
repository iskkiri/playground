import { isAxiosError } from 'axios';

export interface ResultCodeResponseDto {
  resultCode: string;
}

export interface BaseError {
  errorCode: string;
  message: string;
}

export const isBaseError = isAxiosError<BaseError>;
