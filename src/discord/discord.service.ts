import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { DiscordMessage } from './interfaces/discord-message.interface';

@Injectable()
export class DiscordService implements OnModuleInit {
  private readonly client: Client;
  private readonly logger = new Logger(DiscordService.name);

  constructor(private configService: ConfigService) {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });
  }

  async onModuleInit() {
    await this.initializeClient();
  }

  private async initializeClient() {
    try {
      await this.client.login(this.configService.get<string>('discord.token'));
      this.logger.log('Discord bot connected successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Discord client:', error);
      throw error;
    }
  }

  async sendMessage(message: DiscordMessage): Promise<void> {
    try {
      const channelId = this.configService.get<string>('discord.channelId');

      if (!channelId) {
        throw new Error('Discord channel ID is not configured');
      }

      const channel = await this.client.channels.fetch(channelId);

      if (!channel || !(channel instanceof TextChannel)) {
        throw new Error('Invalid Discord channel');
      }

      await channel.send({
        embeds: [
          {
            title: message.title,
            description: message.description,
            url: message.url,
            color: message.color || 0x0099ff,
          },
        ],
      });
    } catch (error) {
      this.logger.error('Failed to send Discord message:', error);
      throw error;
    }
  }
}
