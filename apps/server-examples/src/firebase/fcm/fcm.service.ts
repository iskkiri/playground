import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';
import {
  type ConditionMessage,
  type MulticastMessage,
  type TokenMessage,
  type TopicMessage,
} from 'firebase-admin/messaging';
import type { InitializeFcmTokenRequestDto } from './dtos/initialize-fcm-token.dto';

@Injectable()
export class FcmService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async initializeFcmToken({ token, deviceId }: InitializeFcmTokenRequestDto) {
    console.log({ token, deviceId });

    // 1. 유저 정보 조회

    // 2. 조회한 유저 정보로부터 광고 정보 수신 동의 여부 확인

    // 3. 광고 정보 수신 동의 여부에 따라 토픽 구독 분기 처리
    // 3-1. 광고 정보 수신 동의 여부에 상관없이 allTopic 구독 요청
    await this.subscribeToTopic(token, 'allTopic');
    // 3-2. 광고 정보 수신 동의한 유저만 advertisementTopic 구독 요청
    // this.subscribeToTopic(fcmToken, 'advertisementTopic');

    return { success: true };
  }

  /**
   * 단일 메시지 전송 (Send messages to specific devices)
   * @link https://firebase.google.com/docs/cloud-messaging/send-message?_gl=1*kgn6ds*_up*MQ..*_ga*MTI4MTcyODc1My4xNzEzMjQ0NzA5*_ga_CW55HF8NVT*MTcxMzI0NDcwOS4xLjAuMTcxMzI0NDcwOS4wLjAuMA..#send-messages-to-specific-devices
   * @param dryRun - 실제로 메시지를 전송하지 않고 메시지가 유효한지 검증만 수행
   */
  async sendMessage(message: TokenMessage, dryRun?: boolean) {
    console.log(message);

    try {
      // Send a message to the device corresponding to the provided
      // registration token.
      const response = await this.firebaseService.getMessaging().send(message, dryRun);

      console.log('Successfully sent message:', response);

      return response;
    } catch (error) {
      console.log('Error sending message:', error);
    }
  }

  /**
   * 다중 메시지 전송 (Send messages to multiple devices)
   * @link https://firebase.google.com/docs/cloud-messaging/send-message?_gl=1*kgn6ds*_up*MQ..*_ga*MTI4MTcyODc1My4xNzEzMjQ0NzA5*_ga_CW55HF8NVT*MTcxMzI0NDcwOS4xLjAuMTcxMzI0NDcwOS4wLjAuMA..#send-messages-to-multiple-devices
   * @param dryRun - 실제로 메시지를 전송하지 않고 메시지가 유효한지 검증만 수행
   */
  async sendMultipleMessages(message: MulticastMessage, dryRun?: boolean) {
    try {
      const response = await this.firebaseService
        .getMessaging()
        .sendEachForMulticast(message, dryRun);

      console.log(response.successCount + ' messages were sent successfully');

      // The return value is a list of tokens that corresponds to the order of the input tokens.
      // This is useful when you want to check which tokens resulted in errors.
      if (response.failureCount > 0) {
        const failedTokens: string[] = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(message.tokens[idx]);
          }
        });
        console.log('List of tokens that caused failures: ' + failedTokens);
      }

      return response;
    } catch (error) {
      console.log('Error sending message:', error);
    }
  }

  /**
   * 토픽 메시지 전송 (Send messages to topics)
   * @link https://firebase.google.com/docs/cloud-messaging/send-message?_gl=1*kgn6ds*_up*MQ..*_ga*MTI4MTcyODc1My4xNzEzMjQ0NzA5*_ga_CW55HF8NVT*MTcxMzI0NDcwOS4xLjAuMTcxMzI0NDcwOS4wLjAuMA..#send-messages-to-topics
   * @param dryRun - 실제로 메시지를 전송하지 않고 메시지가 유효한지 검증만 수행
   */
  async sendTopicMessages(message: TopicMessage | ConditionMessage, dryRun?: boolean) {
    try {
      // Send a message to devices subscribed to the provided topic.
      const response = await this.firebaseService.getMessaging().send(message, dryRun);

      // Response is a message ID string.
      console.log('Successfully sent message:', response);

      return response;
    } catch (error) {
      console.log('Error sending message:', error);
    }
  }

  /**
   * 토픽 구독 (Manage topics from the server)
   * @link https://firebase.google.com/docs/cloud-messaging/manage-topics
   */
  async subscribeToTopic(registrationTokenOrTokens: string | string[], topic: string) {
    try {
      // Subscribe the devices corresponding to the registration tokens to the topic.
      const response = await this.firebaseService
        .getMessaging()
        .subscribeToTopic(registrationTokenOrTokens, topic);

      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log('Successfully subscribed to topic:', response);

      return response;
    } catch (error) {
      console.log('Error subscribing to topic:', error);
    }
  }

  /**
   * 토픽 구독 취소 (Manage topics from the server)
   * @link https://firebase.google.com/docs/cloud-messaging/manage-topics
   */
  async unsubscribeFromTopic(registrationTokenOrTokens: string | string[], topic: string) {
    try {
      // Unsubscribe the devices corresponding to the registration tokens from the topic.
      const response = await this.firebaseService
        .getMessaging()
        .unsubscribeFromTopic(registrationTokenOrTokens, topic);

      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log('Successfully unsubscribed from topic:', response);

      return response;
    } catch (error) {
      console.log('Error unsubscribing from topic:', error);
    }
  }
}
