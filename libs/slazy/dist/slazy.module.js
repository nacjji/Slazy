"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SlazyModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlazyModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const slazy_interceptor_1 = require("./interceptors/slazy.interceptor");
const slazy_service_1 = require("./slazy.service");
let SlazyModule = SlazyModule_1 = class SlazyModule {
    static forFeature(config) {
        return {
            module: SlazyModule_1,
            providers: [
                {
                    provide: 'SLACK_WEBHOOK_URL',
                    useValue: config.slackWebhookUrl,
                },
                {
                    provide: slazy_service_1.SlazyService,
                    useFactory: (slackWebhookUrl) => {
                        const slazyService = new slazy_service_1.SlazyService(config.slackWebhookUrl);
                        slazyService.setWebhookUrl(slackWebhookUrl);
                        return slazyService;
                    },
                    inject: ['SLACK_WEBHOOK_URL'],
                },
            ],
            exports: ['SLACK_WEBHOOK_URL', slazy_service_1.SlazyService],
        };
    }
};
SlazyModule = SlazyModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            slazy_service_1.SlazyService,
            core_1.Reflector,
            { provide: core_1.APP_INTERCEPTOR, useClass: slazy_interceptor_1.SlazyInterceptor },
        ],
        exports: [slazy_service_1.SlazyService],
    })
], SlazyModule);
exports.SlazyModule = SlazyModule;
