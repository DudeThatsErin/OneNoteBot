const Discord = require('discord.js');
const bot = require('../config/bot.json');

module.exports = {
    name: 'server-status',
    description: 'Pushes an embed to display in the channel about a server update.',
    usage: `/server-status <message>`,
    ownerOnly: 1,
    options: [
        {
            name: 'message',
            description: 'Server status message to announce',
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
            .setColor(0xFF6B35)
            .setTitle('Server Update!')
            .setDescription(reason)
            .setTimestamp()
            .setFooter({text: 'Want to suggest a feature for the server? Use /suggestions', iconURL: bot.avatar, timestamp: new Date()});

        try {
            await channel.send({ embeds: [embed] });
            interaction.reply({ content: '✅ Server status update sent!', flags: 64 });
        } catch (error) {
            console.error('Error sending server status:', error);
            interaction.reply({ content: '❌ Failed to send server status update.', flags: 64 });
        }
    }
};
