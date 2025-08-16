const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'attachment-organizer',
    description: 'Information about Attachment Organizer Obsidian plugin',
    usage: '/attachment-organizer',
    ownerOnly: 1,
    async execute(interaction) {
        const attachmentOrganizerEmbed = new Discord.EmbedBuilder()
            .setColor(0x5bd622)
            .setTitle('What is Attachment Organizer?')
            .setDescription('Attachment Organizer is an open-source Obsidian Plugin that allows me to quickly organize all of the PDFs in my vault. You can visit the [Attachment Organizer GitHub](https://github.com/DudeThatsErin/attachment-organizer) to learn more.');

        const fetchedChannel = interaction.guild.channels.cache.get('1406089652854591559'); // announcements channel
        
        try {
            await fetchedChannel.send({ embeds: [attachmentOrganizerEmbed] });
            interaction.reply({content: `Attachment Organizer info posted to announcements!`, flags: Discord.MessageFlags.Ephemeral});
        } catch (error) {
            console.error('Error sending message to channel:', error);
            interaction.reply({content: `Error: Could not send message to <#1406089652854591559>. Check bot permissions.`, flags: Discord.MessageFlags.Ephemeral});
        }
    }
};
