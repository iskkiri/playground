import { isAxiosError } from 'axios';

export interface BaseError {
  errorCode: string;
  errorMessage: string;
}

export const isBaseError = isAxiosError<BaseError>;
