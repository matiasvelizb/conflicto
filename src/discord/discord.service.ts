import { Injectable } from '@nestjs/common';
import { Client } from 'discord.js';

@Injectable()
export class DiscordService {
  private readonly client: Client;
}
