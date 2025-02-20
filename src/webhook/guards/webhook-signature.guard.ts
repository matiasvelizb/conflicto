import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { BitbucketWebhookDto } from '../dtos/webhook.dto';

@Injectable()
export class WebhookSignatureGuard implements CanActivate {
  private readonly logger = new Logger(WebhookSignatureGuard.name);

  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: BitbucketWebhookDto }>();
    const signature = request.headers['x-hub-signature'] as string;
    const payload = request.body;

    const isValid = this.verifySignature(signature, payload);
    if (!isValid) {
      throw new UnauthorizedException('Invalid signature');
    }

    return true;
  }

  private verifySignature(
    signature: string,
    payload: BitbucketWebhookDto,
  ): boolean {
    const secret = this.configService.get<string>('webhook.secret');
    if (!secret) {
      throw new Error('No webhook secret configured');
    }

    const computedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');

    return `sha256=${computedSignature}` === signature;
  }
}
