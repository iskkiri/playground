export interface GetKakaoAuthTokenRequestDto {
  code: string;
  redirectUri: string;
}

export interface GetKakaoAuthTokenResponseDto {
  token_type: string;
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
}
