import { Body, Controller, Post } from '@nestjs/common';
import { FcmService } from './fcm.service';
import {
  UnsubscribeFromTopicRequestDto,
  UnsubscribeFromTopicResponseDto,
} from './dtos/unsubscribe-from-topic.dto';
import {
  SubscribeToTopicRequestDto,
  SubscribeToTopicResponseDto,
} from './dtos/subscribe-to-topic.dto';
import { SendMessageRequestDto } from './dtos/send-message.dto';
import { SendMessagesRequestDto } from './dtos/send-messages.dto';
import { SendTopicMessagesRequestDto } from './dtos/send-topic-message.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPropertiesDescription } from '@/common/decorators/api-properties-description.decorator';

@ApiTags('FCM')
@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService: FcmService) {}

  @ApiOperation({ summary: '토픽 구독' })
  @ApiOkResponse({ type: SubscribeToTopicResponseDto })
  @ApiPropertiesDescription({ dto: SubscribeToTopicRequestDto })
  @Post('subscribe')
  async subscribeToTopic(@Body() { token, topic }: SubscribeToTopicRequestDto) {
    return this.fcmService.subscribeToTopic(token, topic);
  }

  @ApiOperation({ summary: '토픽 구독 취소' })
  @ApiPropertiesDescription({ dto: UnsubscribeFromTopicRequestDto })
  @ApiOkResponse({ type: UnsubscribeFromTopicResponseDto })
  @Post('unsubscribe')
  async unsubscribeFromTopic(@Body() { token, topic }: UnsubscribeFromTopicRequestDto) {
    return this.fcmService.unsubscribeFromTopic(token, topic);
  }

  @ApiOperation({ summary: '단일 메시지 전송' })
  @ApiPropertiesDescription({ dto: SendMessageRequestDto })
  @ApiOkResponse({ description: 'success' })
  @Post('message')
  async sendMessage(@Body() { token, title, message }: SendMessageRequestDto) {
    return this.fcmService.sendMessage({
      token,
      data: {
        title,
        message,
      },
      // iOS의 경우 notification이 없으면 메시지가 전송되지 않음
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            alert: {
              title,
              body: message,
            },
          },
        },
      },
    });
  }

  @ApiOperation({ summary: '다중 메시지 전송' })
  @ApiOkResponse({ description: 'success' })
  @ApiPropertiesDescription({ dto: SendMessagesRequestDto })
  @Post('messages')
  async sendMultipleMessages(@Body() { tokens, title, message }: SendMessagesRequestDto) {
    return this.fcmService.sendMultipleMessages({
      tokens,
      data: {
        title,
        message,
      },
      // iOS의 경우 notification이 없으면 메시지가 전송되지 않음
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            alert: {
              title,
              body: message,
            },
          },
        },
      },
    });
  }

  @ApiOperation({ summary: '토픽 메시지 전송' })
  @ApiOkResponse({ description: 'success' })
  @ApiPropertiesDescription({ dto: SendTopicMessagesRequestDto })
  @Post('topic-messages')
  async sendTopicMessages(@Body() { topic, title, message }: SendTopicMessagesRequestDto) {
    return this.fcmService.sendTopicMessages({
      topic,
      data: {
        title,
        message,
      },
      // iOS의 경우 notification이 없으면 메시지가 전송되지 않음
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            alert: {
              title,
              body: message,
            },
          },
        },
      },
    });
  }
}
