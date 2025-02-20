export interface DiscordMessage {
  title: string;
  description: string;
  url?: string;
  color?: number;
  footer?: {
    text: string;
    iconUrl?: string;
  };
  timestamp?: string;
  thumbnail?: {
    url: string;
  };
  author?: {
    name: string;
    iconUrl?: string;
    url?: string;
  };
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
}
