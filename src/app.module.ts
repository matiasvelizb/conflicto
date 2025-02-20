import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from './discord/discord.module';
import { WebhookModule } from './webhook/webhook.module';
import configuration from './config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DiscordModule,
    WebhookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
