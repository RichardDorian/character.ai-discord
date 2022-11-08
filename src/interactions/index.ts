import { Client, Interaction } from 'discord.js';

import * as commands from './commands';
import buttons from './buttons';
import contextMenus from './contextMenus';
import modals from './modals';

export function registerInteractionHandlers(client: Client) {
  client.on('interactionCreate', onInteraction);

  console.log(
    `Registered ${Object.keys(commands).length} chat command handlers`
  );
}

function onInteraction<T extends Interaction>(interaction: T) {
  let name = '';
  let handlers: { [key: string]: (interaction: T) => void } = {};

  if (interaction.isModalSubmit()) {
    name = interaction.customId;
    // @ts-ignore
    handlers = modals;
  } else if (interaction.isChatInputCommand()) {
    name = interaction.commandName;
    // @ts-ignore
    handlers = commands;
  } else if (interaction.isButton()) {
    name = interaction.customId;
    // @ts-ignore
    handlers = buttons;
  } else if (interaction.isContextMenuCommand()) {
    name = interaction.commandName;
    // @ts-ignore
    handlers = contextMenus;
  }

  const handler = handlers[name];

  if (!handler) {
    if (interaction.isRepliable())
      interaction.reply({
        ephemeral: true,
        content:
          'An error occured, please refeer to an administrator.\nError: `No handler for this interaction`',
      });
    console.warn(
      `Received an interaction with name ${name} but no handler were found`
    );
    return;
  }

  handler(interaction);
}
