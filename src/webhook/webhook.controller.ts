import {
  Body,
  Controller,
  Headers,
  Logger,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WebhookSignatureGuard } from './guards/webhook-signature.guard';
import { WebhookService } from './webhook.service';
import { BitbucketWebhookDto } from './dtos/webhook.dto';

@Controller('webhook')
@UseGuards(WebhookSignatureGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(private readonly webhookService: WebhookService) {}

  @Post('bitbucket')
  async handleWebhook(
    @Headers('x-event-key') eventKey: string,
    @Body() payload: BitbucketWebhookDto,
  ) {
    this.logger.log(`Received Bitbucket webhook event: ${eventKey}`);
    await this.webhookService.handleEvent(eventKey, payload);
    return { status: 'success' };
  }
}
