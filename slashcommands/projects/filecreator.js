const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'filecreator',
    description: 'Information about FileCreator Obsidian plugin',
    usage: '/filecreator',
    ownerOnly: 1,
    async execute(interaction) {
        const fileCreatorEmbed = new Discord.EmbedBuilder()
            .setColor(0xd1bb57)
            .setTitle('What is FileCreator?')
            .setDescription('FileCreator is an open-source Obsidian Plugin that allows me to quickly create PDFs or Markdown files in any folder and prepend or append the current date to them. You can visit the [FileCreator GitHub](https://github.com/DudeThatsErin/FileCreator) to learn more.');

        const fetchedChannel = interaction.guild.channels.cache.get('1406089652854591559'); // announcements channel
        
        try {
            await fetchedChannel.send({ embeds: [fileCreatorEmbed] });
            interaction.reply({content: `FileCreator info posted to announcements!`, flags: Discord.MessageFlags.Ephemeral});
        } catch (error) {
            console.error('Error sending message to channel:', error);
            interaction.reply({content: `Error: Could not send message to <#1406089652854591559>. Check bot permissions.`, flags: Discord.MessageFlags.Ephemeral});
        }
    }
};
