import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SlazyService {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    // 환경 변수에서 Webhook URL을 읽어옵니다.
    this.webhookUrl = webhookUrl;

    // Webhook URL이 없다면 예외를 발생시킬 수 있습니다.
    if (!this.webhookUrl) {
      console.warn('SLACK_WEBHOOK_URL is not defined in the environment');
    }
  }

  // Webhook URL을 설정하는 메서드
  setWebhookUrl(url: string) {
    this.webhookUrl = url;
  }

  async sendNotification(statusCode: number, message: string) {
    console.log(4);
    // webhookUrl이 설정되지 않았으면, 알림을 보내지 않음
    if (!this.webhookUrl) {
      console.error('Slack Webhook URL is not set.');
      return;
    }

    try {
      await axios.post(this.webhookUrl, {
        text: `Status Code: ${statusCode}, Message: ${message}`,
      });
    } catch (error) {
      console.error('Slack notification failed', error);
    }
  }
}
