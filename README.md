# Conflicto - Bitbucket Webhooks to Discord

<p align="center">
  <img src="assets/conflicto.png" alt="App Icon" width="75">
</p>

Conflicto is a NestJS-based webhook handler that listens to Bitbucket events and forwards relevant updates to a Discord channel. It currently supports:

- Detecting **new pull requests**.
- Detecting **updates to existing pull requests**.

### Planned Features:

- Detecting **comments on pull requests**.
- Automatically **deleting messages related to a pull request** when it gets approved.

## 🚀 Technologies Used

- **NestJS** - Modular and scalable backend framework.
- **TypeScript** - Strongly typed JavaScript.
- **Discord.js** - Integration with Discord for sending messages.
- **Bitbucket Webhooks** - Event-driven communication from Bitbucket.
- **Dependency Injection (DI)** - Follows NestJS DI principles for modular service handling.
- **Strategy Pattern** - Used to handle different webhook event types efficiently.

---

## 📦 Installation

### Prerequisites:

- **Node.js LTS**
- **Yarn** (recommended) or npm
- A **Discord Bot Token** and a **Webhook Secret** from Bitbucket.

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/conflicto.git
cd conflicto
```

### 2️⃣ Install Dependencies

```sh
yarn install
```

### 3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add:

```sh
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_CHANNEL_ID=your_discord_channel_id
WEBHOOK_SECRET=your_webhook_secret
```

## 4️⃣ Run the Project

Development Mode:

```sh
yarn start:dev
Production Mode:
```

Production Mode:

```sh
yarn build
yarn start:prod
```

## 🤔 What’s Missing?

- Handle comments on pull requests.
- Delete Discord messages when a pull request is approved.
- Docker support for easy deployment.
- Any contributions or feedback are welcome!

## 📜 License

This project is open-source and available under the MIT License.
