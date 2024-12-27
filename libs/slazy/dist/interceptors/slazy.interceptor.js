"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlazyInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const slazy_decorator_1 = require("../decorators/slazy.decorator");
const slazy_service_1 = require("../slazy.service");
let SlazyInterceptor = class SlazyInterceptor {
    constructor(reflector, // Reflector로 메타데이터 접근
    slazyService) {
        this.reflector = reflector;
        this.slazyService = slazyService;
    }
    intercept(context, next) {
        const handler = context.getHandler();
        // 데코레이터에서 설정한 메타데이터를 객체 형태로 가져옴
        const slackMessage = this.reflector.get(slazy_decorator_1.SLACK_NOTIFY_KEY, handler);
        if (slackMessage) {
            // catchError를 사용하여 오류가 발생했을 때만 Slack 알림을 보내도록 처리
            return next.handle().pipe((0, rxjs_1.catchError)((error) => {
                // 오류가 발생하면 Slack 알림 전송
                if (error.status === slackMessage.statusCode) {
                    this.slazyService.sendNotification(error.status, slackMessage.message);
                }
                throw error; // 예외를 다시 던져서 호출자에게 전달
            }));
        }
        return next.handle(); // 오류가 없다면 그대로 처리
    }
};
SlazyInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        slazy_service_1.SlazyService])
], SlazyInterceptor);
exports.SlazyInterceptor = SlazyInterceptor;
