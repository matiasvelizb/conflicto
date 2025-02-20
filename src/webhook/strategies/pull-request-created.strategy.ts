import { Injectable, Logger } from '@nestjs/common';
import { DiscordService } from '../../discord/discord.service';
import { WEBHOOK_CONSTANTS } from '../constants/webhook.constants';
import { BitbucketWebhookDto } from '../dtos/webhook.dto';
import { WebhookStrategy } from '../interfaces/webhook-strategy.interface';
import { MessageFormat } from '../interfaces/message-format.interface';

@Injectable()
export class PullRequestCreatedStrategy implements WebhookStrategy {
  private readonly logger = new Logger(PullRequestCreatedStrategy.name);

  constructor(private readonly discordService: DiscordService) {}

  getEventKey(): string {
    return 'pullrequest:created';
  }

  async handle(payload: BitbucketWebhookDto): Promise<void> {
    try {
      const { pullrequest, actor, repository } = payload;

      await this.discordService.sendMessage({
        title: `🔨 ${pullrequest.title}`,
        description: this.formatMessage({
          sourceBranch: pullrequest.source.branch.name,
          targetBranch: pullrequest.destination.branch.name,
          description: pullrequest.description,
        }),
        url: pullrequest.links.html.href,
        color: WEBHOOK_CONSTANTS.COLORS.NEW_PR,
        footer: {
          text: `Created by ${actor.display_name} • ${repository.name}`,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error('Failed to handle pull request creation:', error);
      throw error;
    }
  }

  formatMessage({
    sourceBranch,
    targetBranch,
    description,
  }: MessageFormat): string {
    const branchInfo = `\`${sourceBranch}\` → \`${targetBranch}\``;
    const desc =
      description?.trim() || WEBHOOK_CONSTANTS.MESSAGES.NO_DESCRIPTION;

    const maxDescLength = 300;
    const truncatedDesc =
      desc.length > maxDescLength
        ? `${desc.substring(0, maxDescLength)}...`
        : desc;

    return [
      `📦 **New Pull Request**`,
      `↳ **Branch:** ${branchInfo}`,
      '',
      truncatedDesc,
    ].join('\n');
  }
}
