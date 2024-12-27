import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, catchError } from 'rxjs';
import { SLACK_NOTIFY_KEY } from '../decorators/slazy.decorator';
import { SlazyService } from '../slazy.service';

@Injectable()
export class SlazyInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector, // Reflector로 메타데이터 접근
    private readonly slazyService: SlazyService, // SlazyService를 자동 주입
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();

    // 데코레이터에서 설정한 메타데이터를 객체 형태로 가져옴
    const slackMessage = this.reflector.get<{
      statusCode: number;
      message: string;
    }>(SLACK_NOTIFY_KEY, handler);

    if (slackMessage) {
      // catchError를 사용하여 오류가 발생했을 때만 Slack 알림을 보내도록 처리
      return next.handle().pipe(
        catchError((error) => {
          // 오류가 발생하면 Slack 알림 전송
          if (error.status === slackMessage.statusCode) {
            this.slazyService.sendNotification(
              error.status,
              slackMessage.message,
            );
          }
          throw error; // 예외를 다시 던져서 호출자에게 전달
        }),
      );
    }

    return next.handle(); // 오류가 없다면 그대로 처리
  }
}
