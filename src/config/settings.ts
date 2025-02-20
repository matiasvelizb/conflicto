export default () => ({
  discord: {
    token: process.env.DISCORD_BOT_TOKEN,
    channelId: process.env.DISCORD_CHANNEL_ID,
  },
  webhook: {
    secret: process.env.WEBHOOK_SECRET,
  },
});
