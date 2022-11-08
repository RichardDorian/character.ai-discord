import { ContextMenuCommandInteraction, EmbedBuilder } from 'discord.js';

export async function rate1(interaction: ContextMenuCommandInteraction) {
  await rate(interaction, 1);
}
export async function rate2(interaction: ContextMenuCommandInteraction) {
  await rate(interaction, 2);
}
export async function rate3(interaction: ContextMenuCommandInteraction) {
  await rate(interaction, 3);
}
export async function rate4(interaction: ContextMenuCommandInteraction) {
  await rate(interaction, 4);
}
export async function rate5(interaction: ContextMenuCommandInteraction) {
  await rate(interaction, 5);
}

async function rate(interaction: ContextMenuCommandInteraction, level: number) {
  await interaction.deferReply({ ephemeral: true });

  if (!interaction.isMessageContextMenuCommand()) {
    await interaction.reply('Should be a message context menu command');
    return;
  }

  if (!interaction.targetMessage.webhookId) {
    const embed = new EmbedBuilder({
      title: 'Something went wrong D:',
      description: "The message you've tried to rate is not from a Character!",
      color: 0xe74c3c,
    });

    return await interaction.editReply({ embeds: [embed] });
  }

  await interaction.editReply('Not implemented yet');
}
