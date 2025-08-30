const Discord = require('discord.js');
const bot = require('../config/bot.json');

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
    async execute(interaction, client) {
        const channel = client.channels.cache.get(bot.announcementsId);
        const reason = interaction.options.getString('message');

        if (!channel) {
            return interaction.reply({ content: 'Could not find the announcements channel!', flags: 64 });
        }

        let embed = new Discord.EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('Bot Update!')
            .setDescription(reason)
            .setTimestamp()
            .setFooter({text: 'Want to suggest a feature for the bot? Use /suggestions', iconURL: bot.avatar, timestamp: new Date()});

        try {
            await channel.send({ embeds: [embed] });
            interaction.reply({ content: '✅ Bot status update sent!', flags: 64 });
        } catch (error) {
            console.error('Error sending bot status:', error);
            interaction.reply({ content: '❌ Failed to send bot status update.', flags: 64 });
        }
    }
};
