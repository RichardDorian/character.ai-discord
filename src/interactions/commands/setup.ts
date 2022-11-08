import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

async function controlPanel(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  const embed = new EmbedBuilder({
    title: ':control_knobs: Control panel',
    description: 'Execute bot related actions through these buttons',
    fields: [
      {
        name: 'Send rules',
        value: `Sends the rule embed in <#${process.env.DISCORD_RULES}>`,
        inline: true,
      },
      {
        name: "Send how to's",
        value: `Sends all embeds in <#${process.env.DISCORD_HOW_TO}>`,
        inline: true,
      },
      {
        name: 'Send login',
        value: `Sends the login embed in <#${process.env.DISCORD_LOGIN}>`,
        inline: false,
      },
    ],
    color: 0x138eed,
  });

  const buttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder({
      custom_id: 'setup:rules',
      label: 'Send rules',
      emoji: '📜',
      style: ButtonStyle.Primary,
    }),
    new ButtonBuilder({
      custom_id: 'setup:how-to',
      label: "Send how to's",
      emoji: '❓',
      style: ButtonStyle.Primary,
    }),
    new ButtonBuilder({
      custom_id: 'setup:login',
      label: 'Send login',
      emoji: '😄',
      style: ButtonStyle.Primary,
    })
  );

  const channel = await interaction.client.channels.fetch(
    process.env.DISCORD_CONTROL_PANEL
  );

  if (!channel.isTextBased())
    return await interaction.editReply(
      'Control panel channel is not a text based channel.'
    );

  await channel.send({
    embeds: [embed],
    // @ts-ignore
    components: [buttons.toJSON()],
  });

  await interaction.editReply('Successfuly setup control panel');
}

const subcommands = {
  'control-panel': controlPanel,
};

export async function setup(interaction: ChatInputCommandInteraction) {
  const subcommand = interaction.options.getSubcommand(true);
  const handler = subcommands[subcommand];

  if (!handler)
    interaction.reply({
      content: 'The subcommand you executed is invalid',
      ephemeral: true,
    });

  await handler(interaction);
}
