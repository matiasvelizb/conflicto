import { Injectable, Logger } from '@nestjs/common';
import { DiscordService } from '../../discord/discord.service';
import { WEBHOOK_CONSTANTS } from '../constants/webhook.constants';
import { BitbucketWebhookDto } from '../dtos/webhook.dto';
import { WebhookStrategy } from '../interfaces/webhook-strategy.interface';
import { MessageFormat } from '../interfaces/message-format.interface';

@Injectable()
export class PullRequestUpdatedStrategy implements WebhookStrategy {
  private readonly logger = new Logger(PullRequestUpdatedStrategy.name);

  constructor(private readonly discordService: DiscordService) {}

  getEventKey(): string {
    return 'pullrequest:updated';
  }

  async handle(payload: BitbucketWebhookDto): Promise<void> {
    try {
      const { pullrequest, actor, repository } = payload;

      await this.discordService.sendMessage({
        title: `📝 Updated Pull Request: ${pullrequest.title}`,
        description: this.formatMessage({
          author: actor.display_name,
          repository: repository.name,
          sourceBranch: pullrequest.source.branch.name,
          targetBranch: pullrequest.destination.branch.name,
          description: pullrequest.description,
        }),
        url: pullrequest.links.html.href,
        color: WEBHOOK_CONSTANTS.COLORS.UPDATED_PR,
      });
    } catch (error) {
      this.logger.error('Failed to handle pull request update:', error);
      throw error;
    }
  }

  formatMessage({
    author,
    repository,
    sourceBranch,
    targetBranch,
    description,
  }: MessageFormat): string {
    return [
      `**Pull Request updated by:** ${author}`,
      `**Repository:** ${repository}`,
      `**From:** \`${sourceBranch}\``,
      `**To:** \`${targetBranch}\``,
      '',
      '**Description:**',
      description || WEBHOOK_CONSTANTS.MESSAGES.NO_DESCRIPTION,
    ].join('\n');
  }
}
