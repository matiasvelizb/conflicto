import { Injectable, Logger } from '@nestjs/common';
import { DiscordService } from '../discord/discord.service';
import { DiscordMessage } from 'src/discord/interfaces/discord-message.interface';
import { BitbucketWebhookPayload } from './interfaces/bitbucket-payload.interface';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private readonly discordService: DiscordService) {}

  async handlePullRequestCreated(
    payload: BitbucketWebhookPayload,
  ): Promise<void> {
    try {
      this.logger.log('Handling Bitbucket pull request created event');

      const { pullrequest, actor, repository } = payload;

      const message: DiscordMessage = {
        title: `🆕 New Pull Request: ${pullrequest.title}`,
        description: this.formatMessage({
          author: actor.displayName,
          repository: repository.name,
          sourceBranch: pullrequest.source.branch.name,
          targetBranch: pullrequest.destination.branch.name,
          description: pullrequest.description,
          action: 'created',
        }),
        url: pullrequest.links.html.href,
        color: 0x2ecc71, // Green for new PRs
      };

      this.logger.debug(message);

      await this.discordService.sendMessage(message);
    } catch (error) {
      this.logger.error('Error handling Bitbucket pull request', error);
      throw error;
    }
  }

  async handlePullRequestUpdated(
    payload: BitbucketWebhookPayload,
  ): Promise<void> {
    try {
      this.logger.log('Handling Bitbucket pull request updated event');

      const { pullrequest, actor, repository } = payload;

      const message: DiscordMessage = {
        title: `📝 Updated Pull Request: ${pullrequest.title}`,
        description: this.formatMessage({
          author: actor.displayName,
          repository: repository.name,
          sourceBranch: pullrequest.source.branch.name,
          targetBranch: pullrequest.destination.branch.name,
          description: pullrequest.description,
          action: 'updated',
        }),
        url: pullrequest.links.html.href,
        color: 0x3498db, // Blue for updates
      };

      this.logger.debug(message);

      await this.discordService.sendMessage(message);
    } catch (error) {
      this.logger.error('Failed to handle pull request update:', error);
      throw error;
    }
  }

  private formatMessage({
    author,
    repository,
    sourceBranch,
    targetBranch,
    description,
    action,
  }: {
    author: string;
    repository: string;
    sourceBranch: string;
    targetBranch: string;
    description: string;
    action: 'created' | 'updated';
  }): string {
    return [
      `**Pull Request ${action} by:** ${author}`,
      `**Repository:** ${repository}`,
      `**From:** \`${sourceBranch}\``,
      `**To:** \`${targetBranch}\``,
      '',
      '**Description:**',
      description || '*No description provided*',
    ].join('\n');
  }
}
