export class GetApplePublicKeysResponseDto {
  keys: ApplePublicKey[];
}

export class ApplePublicKey {
  kty: string;
  kid: string;
  use: string;
  alg: string;
  n: string;
  e: string;
}
