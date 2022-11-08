import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  EmbedBuilder,
} from 'discord.js';

export async function login(interaction: ButtonInteraction) {
  await interaction.deferReply({ ephemeral: true });

  const embed = new EmbedBuilder({
    title: ':smile: Login to your Character.AI account',
    description:
      "In order to talk to the characters you must login to your [Character.AI](https://beta.character.ai) account. If you don't have an account on their website yet you can make one [here](https://beta.character.ai/login).\n\nWe know that the current authentication is very hacky and requires you to send your token to us which is very unsafe if you don't trust us.\n\n**What can you do for better security?**\n • You can check the [source code of the bot on GitHub](https://github.com/RichardDorian/character.ai-discord) to see how the bot processes your token.\n • You can ask for a database request *(which will send you what information we currently have in the database for your account)*.\n • You can use an alt account on Character.AI to keep safe your main account.\n • If you feel unsafe for any reason after entering your token you can request a database reset for your account and it will be executed instantly without even us knowing.",
    color: 0x138eed,
  });

  const buttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder({
      custom_id: 'account:login',
      label: 'Login',
      emoji: '😄',
      style: ButtonStyle.Primary,
    }),
    new ButtonBuilder({
      custom_id: 'account:logout',
      label: 'Logout',
      emoji: '😒',
      style: ButtonStyle.Secondary,
    }),
    new ButtonBuilder({
      custom_id: 'account:reset',
      label: 'Database reset',
      emoji: '🗑️',
      style: ButtonStyle.Danger,
    })
  );

  const channel = await interaction.client.channels.fetch(
    process.env.DISCORD_LOGIN as string
  );

  if (!channel?.isTextBased())
    return await interaction.editReply(
      'Login channel is not a text based channel.'
    );

  await channel.send({
    embeds: [embed],
    // @ts-ignore
    components: [buttons.toJSON()],
  });

  await interaction.editReply('Successfuly sent login embed');
}
