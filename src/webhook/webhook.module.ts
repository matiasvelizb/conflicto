import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from 'src/discord/discord.module';
import { webhookStrategyProviders } from './webhook-strategies.provider';

@Module({
  imports: [ConfigModule, DiscordModule],
  controllers: [WebhookController],
  providers: [WebhookService, ...webhookStrategyProviders],
})
export class WebhookModule {}
