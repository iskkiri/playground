import { ExposeAll } from '../../../common/decorators/expose-all.decorator';

@ExposeAll()
export class GetApplePublicKeysResponseDto {
  constructor(data: Partial<GetApplePublicKeysResponseDto>) {
    Object.assign(this, data);
  }

  keys: ApplePublicKey[];
}

@ExposeAll()
export class ApplePublicKey {
  constructor(data: Partial<ApplePublicKey>) {
    Object.assign(this, data);
  }

  kty: string;
  kid: string;
  use: string;
  alg: string;
  n: string;
  e: string;
}
