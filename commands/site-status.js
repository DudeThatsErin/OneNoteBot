const Discord = require('discord.js');
const bot = require('../config/bot.json');

module.exports = {
    name: 'site-status',
    description: 'Pushes an embed to display in the channel about a website update.',
    usage: `/site-status <message>`,
    ownerOnly: 1,
    options: [
        {
            name: 'message',
            description: 'Website status message to announce',
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
            .setColor(0x3498DB)
            .setTitle('Website Update!')
            .setDescription(reason)
            .setTimestamp()
            .setFooter({text: 'Visit our projects for more updates!'});

        try {
            await channel.send({ embeds: [embed] });
            interaction.reply({ content: '✅ Website status update sent!', flags: 64 });
        } catch (error) {
            console.error('Error sending site status:', error);
            interaction.reply({ content: '❌ Failed to send website status update.', flags: 64 });
        }
    }
};
