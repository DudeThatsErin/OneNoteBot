const bot = require('../../config/bot.json');
const Discord = require('discord.js');

module.exports = {
    name: 'botinvite',
    description: 'Provides a link to admin to invite the bot to other servers',
    usage: '/botinvite',
    cooldown: 5,
    modOnly: 1,
    execute(interaction) {
        interaction.reply({ content: bot.botInviteLink, flags: Discord.MessageFlags.Ephemeral });
    }
}