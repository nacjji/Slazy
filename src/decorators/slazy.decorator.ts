import { SetMetadata } from '@nestjs/common';

export const SLACK_NOTIFY_KEY = 'slackNotify';
/**
 * @description send slack notification when error occurs
 * @param options statusCode, message
 * @returns {MethodDecorator}
 */
export function Slazy(options: {
  statusCode: number;
  message: string;
}): MethodDecorator {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ): void {
    // 메타데이터에 알림 정보를 저장
    console.log(1);
    SetMetadata(SLACK_NOTIFY_KEY, options)(target, key, descriptor);
  };
}
