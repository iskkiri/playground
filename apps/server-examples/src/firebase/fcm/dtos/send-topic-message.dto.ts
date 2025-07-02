import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendTopicMessagesRequestDto {
  @ApiProperty({
    description: '토픽',
    example: 'advertisementTopic',
  })
  @IsNotEmpty()
  @IsString()
  topic: string;

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
