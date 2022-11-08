import {
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from 'discord.js';

export async function login(interaction: ButtonInteraction) {
  const modal = new ModalBuilder()
    .setCustomId('account:login')
    .setTitle('Login to Character.AI')
    .setComponents(
      new ActionRowBuilder({
        components: [
          new TextInputBuilder({
            custom_id: 'account:login.token',
            label: 'Access Token',
            required: true,
            style: TextInputStyle.Short,
          }),
        ],
      }),
      new ActionRowBuilder({
        components: [
          new TextInputBuilder({
            custom_id: 'account:login.refresh_token',
            label: 'Refresh Token',
            required: true,
            style: TextInputStyle.Short,
          }),
        ],
      })
    );

  await interaction.showModal(modal);
}
