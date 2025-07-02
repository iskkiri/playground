export interface GetPaycoAuthTokenRequestDto {
  code: string;
  state: string;
}

export interface GetPaycoAuthTokenResponseDto {
  access_token: string;
  access_token_secret: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
  state: string;
}
