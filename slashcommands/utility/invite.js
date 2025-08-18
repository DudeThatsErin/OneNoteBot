const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Provides a link to users to allow them to invite other users to the server.',
    usage: `/invite`,
    botSpamOnly: 1,
    
    data: {
        name: 'invite',
        description: 'Provides a link to users to allow them to invite other users to the server.'
    },
    execute(interaction) {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Our Website')
            .setStyle(5)
            .setURL('https://quartznotes.com'),
        );

        interaction.reply({ content: 'So, you want to invite someone to our server? Use this link: https://discord.gg/VzdsccFfFC', components: [row], ephemeral: true});

    },
  };