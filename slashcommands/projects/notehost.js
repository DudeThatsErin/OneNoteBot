const Discord = require('discord.js');

module.exports = {
    name: 'notehost',
    description: 'Information about NoteHost project',
    usage: '/notehost',
    data: {
        name: 'notehost',
        description: 'Information about NoteHost project'
    },
    execute(interaction) {
        const noteHostEmbed = new Discord.EmbedBuilder()
            .setColor(0xFFA550)
            .setTitle('What is NoteHost?')
            .setDescription('NoteHost is a free way to host your notion sites on a `.com` or `.net` domain name that you own. An alternative to Notion\'s paid site service. The docs are located on my [Notion Site](https://dudethatserin.notion.site/NoteHost-982d31fcc8dd4799a18efcb074b0e63c?pvs=74).');

        interaction.reply({ embeds: [noteHostEmbed] });
    }
};
