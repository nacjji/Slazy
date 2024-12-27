import { DynamicModule, Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { SlazyInterceptor } from './interceptors/slazy.interceptor';
import { SlazyService } from './slazy.service';

@Global()
@Module({
  providers: [
    SlazyService,
    Reflector,
    { provide: APP_INTERCEPTOR, useClass: SlazyInterceptor },
  ],
  exports: [SlazyService],
})
export class SlazyModule {
  static forFeature(config: { slackWebhookUrl: string }): DynamicModule {
    return {
      module: SlazyModule,
      providers: [
        {
          provide: 'SLACK_WEBHOOK_URL',
          useValue: config.slackWebhookUrl,
        },
        {
          provide: SlazyService,
          useFactory: (slackWebhookUrl: string) => {
            const slazyService = new SlazyService(config.slackWebhookUrl);
            slazyService.setWebhookUrl(slackWebhookUrl);
            return slazyService;
          },
          inject: ['SLACK_WEBHOOK_URL'],
        },
      ],
      exports: ['SLACK_WEBHOOK_URL', SlazyService],
    };
  }
}
