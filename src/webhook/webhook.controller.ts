import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebhookService } from './webhook.service';
import { BitbucketWebhookPayload } from './interfaces/bitbucket-payload.interface';
import * as crypto from 'crypto';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    private readonly webhookService: WebhookService,
    private readonly configService: ConfigService,
  ) {}

  @Get('test')
  test() {
    return 'Hello world!';
  }

  @Post('bitbucket')
  async handleWebhook(
    @Headers('x-event-key') eventKey: string,
    @Headers('x-hub-signature') signature: string,
    @Body() payload: BitbucketWebhookPayload,
  ) {
    const secret = this.configService.get<string>('webhook.secret');

    if (!secret) {
      throw new HttpException(
        'No webhook secret configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const computedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');

    if (`sha256=${computedSignature}` !== signature) {
      throw new HttpException('Invalid signature', HttpStatus.UNAUTHORIZED);
    }

    switch (eventKey) {
      case 'pullrequest:created':
        await this.webhookService.handlePullRequestCreated(payload);
        break;
      case 'pullrequest:updated':
        await this.webhookService.handlePullRequestUpdated(payload);
        break;
      default:
        this.logger.warn(`Unhandled event key: ${eventKey}`);
    }

    return { status: 'success' };
  }
}
