export class GetKakaoPublicKeyResponseDto {
  keys: KakaoPublicKey[];
}

export class KakaoPublicKey {
  kid: string;
  kty: string;
  alg: string;
  use: string;
  n: string;
  e: string;
}
