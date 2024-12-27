export declare const SLACK_NOTIFY_KEY = "slackNotify";
/**
 * @description send slack notification when error occurs
 * @param options statusCode, message
 * @returns {MethodDecorator}
 */
export declare function Slazy(options: {
    statusCode: number;
    message: string;
}): MethodDecorator;
//# sourceMappingURL=slazy.decorator.d.ts.map