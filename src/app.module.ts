import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from './discord/discord.module';
import settings from './config/settings';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [settings],
      isGlobal: true,
    }),
    DiscordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
