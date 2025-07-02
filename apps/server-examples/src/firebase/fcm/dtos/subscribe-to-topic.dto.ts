import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubscribeToTopicRequestDto {
  @ApiProperty({
    description: 'FCM 토큰',
    example:
      'cqTV7md4gkyWmI8JnAy_rD:APA91bEe9xLBrb_6dhAVGvCbBMgepOLzRo9fq7NhUFhskfXPUAa1aYLD8HXrJC4J7Z0lDGO1vftArngP1n6FCiiN_IAES1tDqWz1vi7L61qyD4RXgjOFlwQ',
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({
    description: '토픽',
    example: 'advertisementTopic',
  })
  @IsNotEmpty()
  @IsString()
  topic: string;
}

export class SubscribeToTopicErrorInfo {
  @ApiProperty({
    description: '오류 코드',
    example: 'messaging/invalid-registration-token',
  })
  code: string;

  @ApiProperty({
    description: '오류 메시지',
    example:
      'Invalid registration token provided. Make sure it matches the registration token the client app receives from registering with FCM.',
  })
  message: string;
}

export class SubscribeToTopicErrorObject {
  @ApiProperty()
  errorInfo: SubscribeToTopicErrorInfo;

  @ApiProperty({
    description: '오류 코드 접두사',
    example: 'messaging',
  })
  codePrefix: string;
}
export class SubscribeToTopicError {
  @ApiProperty({
    description: '실패한 토큰 인덱스',
    example: 0,
  })
  index: number;

  @ApiProperty()
  error: SubscribeToTopicErrorObject;
}

export class SubscribeToTopicResponseDto {
  @ApiProperty({
    description: '성공한 토큰 수',
    example: 1,
  })
  successCount: number;

  @ApiProperty({
    description: '실패한 토큰 수',
    example: 0,
  })
  failureCount: number;

  @ApiProperty({
    description: '실패한 토큰 목록',
    example: [
      {
        index: 0,
        error: {
          errorInfo: {
            code: 'messaging/invalid-registration-token',
            message:
              'Invalid registration token provided. Make sure it matches the registration token the client app receives from registering with FCM.',
          },
          codePrefix: 'messaging',
        },
      },
    ],
  })
  @ApiProperty({ type: [SubscribeToTopicError] })
  errors: SubscribeToTopicError[];
}
