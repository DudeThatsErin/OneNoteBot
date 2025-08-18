const Discord = require('discord.js');

module.exports = {
    name: 'quartznotes',
    description: 'Information about QuartzNotes project',
    usage: '/quartznotes',
    data: {
        name: 'quartznotes',
        description: 'Information about QuartzNotes project'
    },
    execute(interaction) {
        const quartzNotesEmbed = new Discord.EmbedBuilder()
            .setColor(0x992acc)
            .setTitle('What is QuartzNotes?')
            .setDescription('QuartzNotes is a website that allows users to create and manage their own notes. It is a simple and easy to use website that allows users to create and manage their own notes. You can visit [QuartzNotes](https://quartznotes.com) to learn more.');

        interaction.reply({ embeds: [quartzNotesEmbed] });
    }
};
