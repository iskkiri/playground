import { ApiProperty } from '@nestjs/swagger';
import { GetKakaoUserInfoRequestDto } from '../../kakao/dtos/get-kakao-user-info.dto';

export class GetPaycoUserInfoRequestDto extends GetKakaoUserInfoRequestDto {}

export class PaycoHeader {
  @ApiProperty({
    example: true,
    description: '성공 여부 (true : 성공, false : 실패)',
  })
  isSuccessful: boolean; // 성공 여부 (true : 성공, false : 실패)

  @ApiProperty({
    example: 0,
    description: '결과 코드',
  })
  resultCode: number; // 결과 코드

  @ApiProperty({
    example: 'SUCCESS',
    description: '결과 메세지 (SUCCESS : 성공, 그 외 메세지)',
  })
  resultMessage: string; // 결과 메세지 (SUCCESS : 성공, 그 외 메세지)
}

export class PaycoAddress {
  @ApiProperty({
    example: '06234',
    description: '우편번호',
  })
  zipCode: string; // 우편번호

  @ApiProperty({
    example: '서울특별시 강남구 테헤란로 14길 6',
    description: '주소',
  })
  address: string; // 주소

  @ApiProperty({
    example: '남도빌딩 2층',
    description: '상세주소',
  })
  addressDetail: string; // 상세주소
}

export class PaycoUserInfo {
  @ApiProperty({
    example: '00000000-0000-0000-0000-00000000000',
    description: '회원 번호',
  })
  idNo: string; // 회원 번호

  @ApiProperty({
    example: 'abcde@gmail.com',
    description: '이메일 주소',
  })
  email: string | null; // 이메일 주소

  @ApiProperty({
    example: '821000000000',
    description: '휴대폰 번호',
  })
  mobile: string | null; // 휴대폰 번호

  @ApiProperty({
    example: 'ab***@gmail.com',
    description: '마스킹된 이메일 주소',
  })
  maskedEmail: string | null; // 마스킹된 이메일 주소

  @ApiProperty({
    example: '010-00**-00**',
    description: '마스킹된 휴대폰 번호',
  })
  maskedMobile: string | null; // 마스킹된 휴대폰 번호

  @ApiProperty({
    example: '홍길동',
    description: '이름',
  })
  name: string | null; // 이름

  @ApiProperty({
    example: 'MALE',
    description: '성별(FEMALE: 여성, MALE: 남성)',
  })
  genderCode: string | null; // 성별(FEMALE: 여성, MALE: 남성)

  @ApiProperty({
    example: '30',
    description: '연령대(0: 0-10세 미만, 10, 20, 30, ...)',
  })
  ageGroup: string | null; // 연령대(0: 0-10세 미만, 10, 20, 30, ...)

  @ApiProperty({
    example: '0101',
    description: '생일(MMDD)',
  })
  birthdayMMdd: string | null; // 생일(MMDD)

  @ApiProperty({
    example: '19900101',
    description: '생년월일(YYYYMMDD) | 바로가입 서비스만 이용가능',
    required: false,
  })
  birthday?: string; // 생년월일(YYYYMMDD) | 바로가입 서비스만 이용가능

  @ApiProperty({
    example: '0',
    description: '연계정보 (CI) | 바로가입 서비스만 이용가능',
    required: false,
  })
  ci?: string; // 연계정보 (CI) | 바로가입 서비스만 이용가능

  @ApiProperty({
    example: 'true',
    description: '내국인/외국인 여부 (true/false) | 바로가입 서비스만 이용가능',
    required: false,
  })
  isForeigner?: string; // 내국인/외국인 여부 (true/false) | 바로가입 서비스만 이용가능

  @ApiProperty({
    example: '01012345678',
    description: '연락처(휴대폰 번호) | 바로가입 서비스만 이용가능',
    required: false,
  })
  contactNumber?: string; // 연락처(휴대폰 번호) | 바로가입 서비스만 이용가능

  @ApiProperty({
    type: PaycoAddress,
    description: '주소 | 바로가입 서비스만 이용가능',
    required: false,
  })
  address?: PaycoAddress; // 주소 | 바로가입 서비스만 이용가능
}

export class GetPaycoUserInfoResponseDto {
  @ApiProperty()
  header: PaycoHeader;

  @ApiProperty()
  data: {
    member: PaycoUserInfo;
  };
}
