const Discord = require('discord.js');

module.exports = {
    name: 'filecreator',
    description: 'Information about FileCreator Obsidian plugin',
    usage: '/filecreator',
    data: {
        name: 'filecreator',
        description: 'Information about FileCreator Obsidian plugin'
    },
    execute(interaction) {
        const fileCreatorEmbed = new Discord.EmbedBuilder()
            .setColor(0xd1bb57)
            .setTitle('What is FileCreator?')
            .setDescription('FileCreator is an open-source Obsidian Plugin that allows me to quickly create PDFs or Markdown files in any folder and prepend or append the current date to them. You can visit the [FileCreator GitHub](https://github.com/DudeThatsErin/FileCreator) to learn more.');

        interaction.reply({ embeds: [fileCreatorEmbed] });
    }
};
