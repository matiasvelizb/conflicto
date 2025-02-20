import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from './discord/discord.module';
import { WebhookModule } from './webhook/webhook.module';
import settings from './config/settings';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [settings],
      isGlobal: true,
    }),
    DiscordModule,
    WebhookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
