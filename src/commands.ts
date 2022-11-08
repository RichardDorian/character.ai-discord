import {
  REST,
  Routes,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  PermissionFlagsBits,
} from 'discord.js';

const commands = [
  new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Setup the bot')
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName('control-panel')
        .setDescription('Setup the control panel in the defined channel')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  {
    name: 'Rate 1 ⭐',
    name_localizations: {
      fr: 'Noter 1 ⭐',
      'es-ES': 'Calificar 1 ⭐',
    },
    type: 3, // MESSAGE
  },
  {
    name: 'Rate 2 ⭐',
    name_localizations: {
      fr: 'Noter 2 ⭐',
      'es-ES': 'Calificar 2 ⭐',
    },
    type: 3, // MESSAGE
  },
  {
    name: 'Rate 3 ✨',
    name_localizations: {
      fr: 'Noter 3 ✨',
      'es-ES': 'Calificar 3 ✨',
    },
    type: 3, // MESSAGE
  },
  {
    name: 'Rate 4 ✨',
    name_localizations: {
      fr: 'Noter 4 ✨',
      'es-ES': 'Calificar 4 ✨',
    },
    type: 3, // MESSAGE
  },
  {
    name: 'Rate 5 🌟',
    name_localizations: {
      fr: 'Noter 5 🌟',
      'es-ES': 'Calificar 5 🌟',
    },
    type: 3, // MESSAGE
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

export async function refreshApplicationCommands() {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}
