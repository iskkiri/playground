import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@portone/server-sdk/dist/generated/common';
import {
  IdentityVerificationOperator,
  IdentityVerificationVerifiedCustomer,
} from '@portone/server-sdk/dist/generated/identityVerification';
import { IsString } from 'class-validator';
import { ExposeAll } from '../../common/decorators/expose-all.decorator';

export class VerifyIdentityRequestDto {
  @ApiProperty({
    example: 'identity-verification-00000000-0000-0000-0000-000000000000',
    description: '본인 인증 검증 ID',
  })
  @IsString()
  identityVerificationId: string;
}

@ExposeAll()
export class VerifyIdentityResponseDto implements IdentityVerificationVerifiedCustomer {
  constructor(data: Partial<VerifyIdentityResponseDto>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    description: '식별 아이디',
    example: 'port-customer-id-00000000-0000-0000-0000-000000000000',
    required: false,
  })
  id?: string;

  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  name: string;

  @ApiProperty({
    example: 'SKT',
    description:
      `\`SKT\`: SKT <br />` +
      `\`KT\`: KT <br />` +
      `\`LGU\`: LGU <br />` +
      `\`SKT_MVNO\`: SKT MVNO <br />` +
      `\`KT_MVNO\`: KT MVNO <br />` +
      `\`LGU_MVNO\`: LGU MVNO <br />` +
      '통신사<br />' +
      //
      '다날: 별도 계약이 필요합니다.<br />' +
      'KG이니시스: 제공하지 않습니다.',
    enum: ['SKT', 'KT', 'LGU', 'SKT_MVNO', 'KT_MVNO', 'LGU_MVNO'],
    required: false,
  })
  operator?: IdentityVerificationOperator;

  @ApiProperty({
    example: '01012345678',
    description:
      '전화번호<br />' +
      //
      '특수 문자(-) 없이 숫자로만 이루어진 번호 형식입니다.<br />' +
      '다날: 별도 계약이 필요합니다.<br />' +
      'KG이니시스: 항상 제공합니다.',
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({
    example: '1990-01-01',
    description:
      '생년월일 (yyyy-MM-dd)<br />' +
      //
      '포트원 V2 본인인증 건의 경우 항상 존재합니다.',
    required: false,
  })
  birthDate?: string;

  @ApiProperty({
    example: 'MALE',
    description:
      '성별<br />' +
      //
      '다날: 항상 제공합니다.<br />' +
      'KG이니시스: 항상 제공합니다.',
    enum: ['MALE', 'FEMALE'],
    required: false,
  })
  gender?: Gender;

  @ApiProperty({
    example: false,
    description:
      '외국인 여부<br />' +
      //
      '다날: 별도 계약이 필요합니다.<br />' +
      'KG이니시스: 항상 제공합니다.',
    required: false,
  })
  isForeigner?: boolean;

  @ApiProperty({
    example:
      'aB7cD9eF2gH4iJ6kL8mN0pQ3rS5tU7vW9xY1zA3bC5dE7fG9hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0bC2dE4==',
    description:
      'CI (개인 고유 식별키)<br />' +
      //
      '다날: 항상 제공합니다.<br />' +
      'KG이니시스: 카카오를 제외한 인증사에서 제공합니다.',
    required: false,
  })
  ci?: string;

  @ApiProperty({
    example:
      'pQ0rS2tU4F2gH4iJ6kL8mN0pQ3rS5tU7vW9xY18vW6xY8zA0bC2dE4zA3bC5aB7cD9edE7fG9hI2jK4lM6nO==',
    description:
      'DI (사이트별 개인 고유 식별키)<br />' +
      //
      '중복 가입을 방지하기 위해 개인을 식별하는 사이트별 고유 정보입니다.<br />' +
      '다날: 항상 제공합니다.<br />' +
      'KG이니시스: 제공하지 않습니다.',
    required: false,
  })
  di?: string;
}
