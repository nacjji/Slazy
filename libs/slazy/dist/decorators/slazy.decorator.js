"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slazy = exports.SLACK_NOTIFY_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.SLACK_NOTIFY_KEY = 'slackNotify';
/**
 * @description send slack notification when error occurs
 * @param options statusCode, message
 * @returns {MethodDecorator}
 */
function Slazy(options) {
    return function (target, key, descriptor) {
        // 메타데이터에 알림 정보를 저장
        console.log(1);
        (0, common_1.SetMetadata)(exports.SLACK_NOTIFY_KEY, options)(target, key, descriptor);
    };
}
exports.Slazy = Slazy;
