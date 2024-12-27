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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlazyService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let SlazyService = class SlazyService {
    constructor(webhookUrl) {
        // 환경 변수에서 Webhook URL을 읽어옵니다.
        this.webhookUrl = webhookUrl;
        // Webhook URL이 없다면 예외를 발생시킬 수 있습니다.
        if (!this.webhookUrl) {
            console.warn('SLACK_WEBHOOK_URL is not defined in the environment');
        }
    }
    // Webhook URL을 설정하는 메서드
    setWebhookUrl(url) {
        this.webhookUrl = url;
    }
    async sendNotification(statusCode, message) {
        console.log(4);
        // webhookUrl이 설정되지 않았으면, 알림을 보내지 않음
        if (!this.webhookUrl) {
            console.error('Slack Webhook URL is not set.');
            return;
        }
        try {
            await axios_1.default.post(this.webhookUrl, {
                text: `Status Code: ${statusCode}, Message: ${message}`,
            });
        }
        catch (error) {
            console.error('Slack notification failed', error);
        }
    }
};
SlazyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], SlazyService);
exports.SlazyService = SlazyService;
