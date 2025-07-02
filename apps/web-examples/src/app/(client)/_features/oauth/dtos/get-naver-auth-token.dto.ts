export interface GetNaverAuthTokenRequestDto {
  code: string;
  state: string;
}

export interface GetNaverAuthTokenResponseDto {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  error: string;
  error_description: string;
}
