const bot = require('../../config/bot.json');

module.exports = {
    name: 'invite',
    description: 'Provides a link to users to allow them to invite other users to the server.',
    usage: `/invite`,
    botSpamOnly: 1,
    execute(interaction) {  
        interaction.reply({ content: `So, you want to invite someone to our server? Use this link: ${bot.inviteLink}\nHere is one that is easy to copy:\n\`\`\`${bot.inviteLink}\`\`\``, flags: 64});
    },
  };