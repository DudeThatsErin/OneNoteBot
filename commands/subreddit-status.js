const Discord = require('discord.js');
const bot = require('../config/bot.json');
const color = require('../config/embed.json');
const { getServerConfig } = require('../utils/serverConfig');
module.exports = {
    name: 'subreddit-status',
    description: 'Pushes an embed to display in the channel about a subreddit update.',
    usage: `/subreddit-status <message>`,
    modOnly: 1,
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
            .setColor(parseInt(color.purple_color))
            .setTitle('Subreddit Update!')
            .setDescription(reason)
            .setTimestamp()
            .setFooter({text: 'Want to suggest a feature for the bot? Use /suggestions', iconURL: bot.avatar, timestamp: new Date()});

        try {
            await channel.send({ embeds: [embed] });
            message.reply({ content: '✅ Subreddit status update sent!' });
        } catch (error) {
            console.error('Error sending subreddit status:', error);
            message.reply({ content: '❌ Failed to send subreddit status update.' });
        }
    }
};
