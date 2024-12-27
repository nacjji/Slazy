# Slazy

Slazy is a library for NestJS that allows you to easily send Slack messages using decorators when an error occurs in your API.

## Installation

```bash
yarn add slazy
# or
npm install slazy
```

## Usage

1. Get your Slack webhook URL from the Slack API (Incoming Webhooks).

2. In your `*.module.ts` file, add `SlazyModule` to the imports:

```typescript
import { SlazyModule } from 'slazy';

@Module({
  imports: [
    SlazyModule.forFeature({ slackWebhookUrl: 'your slack webhook URL' }),
    // other imports
  ],
  // other module properties
})
export class YourModule {}
```

3. In your controller, use the `@Slazy` decorator to specify when to send a Slack message:

```typescript
import { Slazy } from 'slazy';

@Controller('your-route')
export class YourController {
  @Get()
  @Slazy({ statusCode: 4xx | 5xx, message: 'message you want to send to Slack channel' })
  yourMethod() {
    // your method implementation
  }
}
```

Replace `4xx | 5xx` with the specific status codes you want to handle and customize the message as needed.
