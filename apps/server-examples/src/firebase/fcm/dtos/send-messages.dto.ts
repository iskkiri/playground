import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SendMessagesRequestDto {
  @ApiProperty({
    description: 'FCM 토큰 리스트',
    example: [
      'cqTV7md4gkyWmI8JnAy_rD:APA91bEe9xLBrb_6dhAVGvCbBMgepOLzRo9fq7NhUFhskfXPUAa1aYLD8HXrJC4J7Z0lDGO1vftArngP1n6FCiiN_IAES1tDqWz1vi7L61qyD4RXgjOFlwQ',
      'dqTV8md4gkyWmI8JnAy_rE:BPA91bEe9xLBrb_6dhAVGvCbBMgepOLzRo9fq7NhUFhskfXPUAa1aYLD8HXrJC4J7Z0lDGO1vftArngP1n6FCiiN_IAES1tDqWz1vi7L61qyD4RXgjOFlwR',
    ],
    type: String,
    isArray: true,
  })
  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  tokens: string[];

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
