import { BitbucketWebhookDto } from '../dtos/webhook.dto';
import { MessageFormat } from './message-format.interface';

export interface WebhookStrategy {
  getEventKey(): string;
  handle(payload: BitbucketWebhookDto): Promise<void>;
  formatMessage(format: MessageFormat): string;
}
