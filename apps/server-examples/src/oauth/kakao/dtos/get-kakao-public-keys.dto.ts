import { ExposeAll } from '../../../common/decorators/expose-all.decorator';

@ExposeAll()
export class GetKakaoPublicKeyResponseDto {
  constructor(data: Partial<GetKakaoPublicKeyResponseDto>) {
    Object.assign(this, data);
  }

  keys: KakaoPublicKey[];
}

@ExposeAll()
export class KakaoPublicKey {
  constructor(data: Partial<KakaoPublicKey>) {
    Object.assign(this, data);
  }

  kid: string;
  kty: string;
  alg: string;
  use: string;
  n: string;
  e: string;
}
