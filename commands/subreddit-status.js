const Discord = require('discord.js');
const bot = require('../config/bot.json');
const color = require('../config/embed.json');
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
    async execute(interaction, client) {
        const channel = client.channels.cache.get(bot.announcementsId);
        const reason = interaction.options.getString('message');

        if (!channel) {
            return interaction.reply({ content: 'Could not find the announcements channel!', flags: 64 });
        }

        let embed = new Discord.EmbedBuilder()
            .setColor(color.purple_color)
            .setTitle('Subreddit Update!')
            .setDescription(reason)
            .setTimestamp()
            .setFooter({text: 'Want to suggest a feature for the bot? Use /suggestions', iconURL: bot.avatar, timestamp: new Date()});

        try {
            await channel.send({ embeds: [embed] });
            interaction.reply({ content: '✅ Subreddit status update sent!', flags: 64 });
        } catch (error) {
            console.error('Error sending subreddit status:', error);
            interaction.reply({ content: '❌ Failed to send subreddit status update.', flags: 64 });
        }
    }
};
