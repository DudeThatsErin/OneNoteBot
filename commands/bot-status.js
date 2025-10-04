const Discord = require('discord.js');
const bot = require('../config/bot.json');
const color = require('../config/embed.json');
const { getServerConfig } = require('../utils/serverConfig');
module.exports = {
    name: 'bot-status',
    description: 'Pushes an embed to display in the channel about a bot update.',
    usage: `/bot-status <message>`,
    ownerOnly: 1,
    options: [
        {
            name: 'message',
            description: 'Status message to announce',
            type: 3,
            required: true
        }
    ],
    async execute(message, args, client) {
        const serverConfig = getServerConfig(message.guild.id);
        if (!serverConfig) {
            return message.reply({ content: 'This command is not configured for this server.' });
        }

        const channel = client.channels.cache.get(serverConfig.announcementsChannelId);
        const reason = args.join(' ');

        if (!channel) {
            return message.reply({ content: 'Could not find the announcements channel!' });
        }

        let embed = new Discord.EmbedBuilder()
            .setColor(parseInt(color.violet_color))
            .setTitle('Bot Update!')
            .setDescription(reason)
            .setTimestamp()
            .setFooter({text: 'Want to suggest a feature for the bot? Use /suggestions', iconURL: bot.avatar, timestamp: new Date()});

        try {
            await channel.send({ embeds: [embed] });
            message.reply({ content: '✅ Bot status update sent!' });
        } catch (error) {
            console.error('Error sending bot status:', error);
            message.reply({ content: '❌ Failed to send bot status update.' });
        }
    }
};
