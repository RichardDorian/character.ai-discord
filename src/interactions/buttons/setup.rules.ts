import { ButtonInteraction, EmbedBuilder } from 'discord.js';

export async function rules(interaction: ButtonInteraction) {
  await interaction.deferReply({ ephemeral: true });

  const embed = new EmbedBuilder({
    title: ':scroll: Server rules',
    description:
      "Here are a few rules that you'll need to follow in order to keep this server a safe place for everyone.",
    fields: [
      {
        name: '<:characterai:1039648485152129105>  __Character.AI Rules__',
        value:
          "ㅤ\n> 🤥 Everything Characters say is made up! Don't trust everything they say or take them too seriously.\n\n> 🤬 Characters may mistakenly be offensive - please rate these messages one star. (Right click on message > Apps > Rate 1 ⭐)\n\n> 🥳 Characters can be anything. Character.AI's breakthrough AI technology can bring all of your ideas to life.",
        inline: true,
      },
    ],
    color: 0x138eed,
  });

  const channel = await interaction.client.channels.fetch(
    process.env.DISCORD_RULES
  );

  if (!channel.isTextBased())
    return await interaction.editReply(
      'Rules channel is not a text based channel.'
    );

  await channel.send({ embeds: [embed] });

  await interaction.editReply('Successfuly sent rules embed');
}
