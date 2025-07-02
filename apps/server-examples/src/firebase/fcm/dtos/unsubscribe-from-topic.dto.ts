import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SubscribeToTopicResponseDto } from './subscribe-to-topic.dto';

export class UnsubscribeFromTopicRequestDto {
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

export class UnsubscribeFromTopicResponseDto extends SubscribeToTopicResponseDto {}
