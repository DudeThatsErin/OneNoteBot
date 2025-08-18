const Discord = require('discord.js');

module.exports = {
    name: 'attachment-organizer',
    description: 'Information about Attachment Organizer Obsidian plugin',
    usage: '/attachment-organizer',
    data: {
        name: 'attachment-organizer',
        description: 'Information about Attachment Organizer Obsidian plugin'
    },
    execute(interaction) {
        const attachmentOrganizerEmbed = new Discord.EmbedBuilder()
            .setColor(0x5bd622)
            .setTitle('What is Attachment Organizer?')
            .setDescription('Attachment Organizer is an open-source Obsidian Plugin that allows me to quickly organize all of the PDFs in my vault. You can visit the [Attachment Organizer GitHub](https://github.com/DudeThatsErin/attachment-organizer) to learn more.');

        interaction.reply({ embeds: [attachmentOrganizerEmbed] });
    }
};
