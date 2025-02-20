import { Injectable, Logger, Inject } from '@nestjs/common';
import { WebhookStrategy } from './interfaces/webhook-strategy.interface';
import { BitbucketWebhookDto } from './dtos/webhook.dto';
import { WEBHOOK_STRATEGIES } from './webhook-strategies.provider';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @Inject(WEBHOOK_STRATEGIES)
    private readonly strategies: Map<string, WebhookStrategy>,
  ) {}

  async handleEvent(
    eventKey: string,
    payload: BitbucketWebhookDto,
  ): Promise<void> {
    const strategy = this.strategies.get(eventKey);

    if (!strategy) {
      this.logger.warn(`No strategy found for event: ${eventKey}`);
      return;
    }

    try {
      await strategy.handle(payload);
    } catch (error) {
      this.logger.error(`Error handling event ${eventKey}:`, error);
      throw error;
    }
  }
}
