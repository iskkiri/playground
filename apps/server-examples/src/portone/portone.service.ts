import { AppConfig, appConfig } from '@/config/app.config';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IdentityVerificationClient } from '@portone/server-sdk';

@Injectable()
export class PortoneService {
  private readonly identityVerificationClient: IdentityVerificationClient;

  constructor(
    @Inject(appConfig.KEY)
    private readonly config: AppConfig
  ) {
    this.identityVerificationClient = IdentityVerificationClient({
      secret: this.config.portoneSecretKey,
    });
  }

  /**
   * 본인 인증 검증 ID를 이용하여 고객 인증 정보를 조회합니다.
   * @param identityVerificationId 본인 인증 검증 ID
   * @returns 고객 인증 정보
   */
  async verifyIdentity(identityVerificationId: string) {
    const response = await this.identityVerificationClient.getIdentityVerification({
      identityVerificationId,
    });
    if (response.status !== 'VERIFIED') {
      // 인증 실패
      throw new BadRequestException('본인 인증이 완료되지 않았습니다.');
    }

    const verifiedCustomer = response.verifiedCustomer;

    return verifiedCustomer;
  }
}
