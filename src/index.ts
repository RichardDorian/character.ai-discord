import 'dotenv/config';

import { Client } from 'discord.js';
import { refreshApplicationCommands } from './commands';
import { registerInteractionHandlers } from './interactions';

const client = new Client({ intents: ['MessageContent', 'GuildMessages'] });

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
});

(async () => {
  await refreshApplicationCommands();

  registerInteractionHandlers(client);

  client.login(process.env.DISCORD_TOKEN);
})();
