const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'quartznotes',
    description: 'Information about QuartzNotes project',
    usage: '/quartznotes',
    ownerOnly: 1,
    async execute(interaction) {
        const quartzNotesEmbed = new Discord.EmbedBuilder()
            .setColor(0x992acc)
            .setTitle('What is QuartzNotes?')
            .setDescription('QuartzNotes is a website that allows users to create and manage their own notes. It is a simple and easy to use website that allows users to create and manage their own notes. You can visit [QuartzNotes](https://quartznotes.com) to learn more.');

        const fetchedChannel = interaction.guild.channels.cache.get('1406089652854591559'); // announcements channel
        
        try {
            await fetchedChannel.send({ embeds: [quartzNotesEmbed] });
            interaction.reply({content: `QuartzNotes info posted to announcements!`, flags: Discord.MessageFlags.Ephemeral});
        } catch (error) {
            console.error('Error sending message to channel:', error);
            interaction.reply({content: `Error: Could not send message to <#1406089652854591559>. Check bot permissions.`, flags: Discord.MessageFlags.Ephemeral});
        }
    }
};
