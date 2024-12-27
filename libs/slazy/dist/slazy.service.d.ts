export declare class SlazyService {
    private webhookUrl;
    constructor(webhookUrl: string);
    setWebhookUrl(url: string): void;
    sendNotification(statusCode: number, message: string): Promise<void>;
}
//# sourceMappingURL=slazy.service.d.ts.map