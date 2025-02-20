export interface BitbucketAccount {
  nickname?: string;
  displayName: string;
  type: 'User' | 'Team' | 'AppUser';
}

export interface BitbucketPullRequest {
  id: number;
  title: string;
  description: string;
  state: string;
  author: BitbucketAccount;
  source: {
    branch: {
      name: string;
    };
  };
  destination: {
    branch: {
      name: string;
    };
  };
  links: {
    html: {
      href: string;
    };
  };
}

export interface BitbucketRepository {
  name: string;
  fullName: string;
  links: {
    html: {
      href: string;
    };
  };
}

export interface BitbucketWebhookPayload {
  actor: BitbucketAccount;
  pullrequest: BitbucketPullRequest;
  repository: BitbucketRepository;
}
