import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageRequestDto {
  @ApiProperty({
    description: 'FCM 토큰',
    example:
      'cqTV7md4gkyWmI8JnAy_rD:APA91bEe9xLBrb_6dhAVGvCbBMgepOLzRo9fq7NhUFhskfXPUAa1aYLD8HXrJC4J7Z0lDGO1vftArngP1n6FCiiN_IAES1tDqWz1vi7L61qyD4RXgjOFlwQ',
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({
    description: '제목',
    example: '알림 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: '메시지',
    example: '알림 내용',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
