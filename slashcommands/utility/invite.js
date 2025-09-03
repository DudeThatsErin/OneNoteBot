const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Provides a link to users to allow them to invite other users to the server.',
    usage: `/invite`,
    botSpamOnly: 1,
    execute(interaction) {  
        interaction.reply({ content: 'So, you want to invite someone to our server? Use this link: https://discord.gg/XcJWhE3SEA\nHere is one that is easy to copy:\n\`\`\`https://discord.gg/XcJWhE3SEA\`\`\`', flags: 64});
    },
  };