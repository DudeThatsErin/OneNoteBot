const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'techbyerin',
    description: 'Information about Tech By Erin blog',
    usage: '/techbyerin',
    ownerOnly: 1,
    async execute(interaction) {
        const tbeEmbed = new Discord.EmbedBuilder()
            .setColor(0xb321b5)
            .setTitle('What is Tech By Erin (TBE)?')
            .setDescription('Tech By Erin (TBE) is my [blog](https://techbyerin.com). I run it using [ghost](https://ghost.org) and I plan to make an Obsidian plugin soon to make the process even smoother.');

        const fetchedChannel = interaction.guild.channels.cache.get('1406089652854591559'); // announcements channel
        
        try {
            await fetchedChannel.send({ embeds: [tbeEmbed] });
            interaction.reply({content: `Tech By Erin info posted to announcements!`, flags: Discord.MessageFlags.Ephemeral});
        } catch (error) {
            console.error('Error sending message to channel:', error);
            interaction.reply({content: `Error: Could not send message to <#1406089652854591559>. Check bot permissions.`, flags: Discord.MessageFlags.Ephemeral});
        }
    }
};
