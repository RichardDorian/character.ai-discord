import { ModalSubmitInteraction } from 'discord.js';

export async function login(interaction: ModalSubmitInteraction) {
  await interaction.reply('Todo');
}
