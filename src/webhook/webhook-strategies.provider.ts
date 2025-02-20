import { Provider } from '@nestjs/common';
import { WebhookStrategy } from './interfaces/webhook-strategy.interface';
import { PullRequestCreatedStrategy } from './strategies/pull-request-created.strategy';
import { PullRequestUpdatedStrategy } from './strategies/pull-request-updated.strategy';

const strategies = [PullRequestCreatedStrategy, PullRequestUpdatedStrategy];

export const WEBHOOK_STRATEGIES = 'WEBHOOK_STRATEGIES';

export const webhookStrategiesProvider: Provider = {
  provide: WEBHOOK_STRATEGIES,
  useFactory: (...implementedStrategies: WebhookStrategy[]) => {
    return new Map<string, WebhookStrategy>(
      implementedStrategies.map((strategy) => [
        strategy.getEventKey(),
        strategy,
      ]),
    );
  },
  inject: [...strategies],
};

export const webhookStrategyProviders = [
  ...strategies,
  webhookStrategiesProvider,
];
