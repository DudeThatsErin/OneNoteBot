const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'notehost',
    description: 'Information about NoteHost project',
    usage: '/notehost',
    ownerOnly: 1,
    async execute(interaction) {
        const noteHostEmbed = new Discord.EmbedBuilder()
            .setColor(0xFFA550)
            .setTitle('What is NoteHost?')
            .setDescription('NoteHost is a free way to host your notion sites on a `.com` or `.net` domain name that you own. An alternative to Notion\'s paid site service. The docs are located on my [Notion Site](https://dudethatserin.notion.site/NoteHost-982d31fcc8dd4799a18efcb074b0e63c?pvs=74).');

        const fetchedChannel = interaction.guild.channels.cache.get('1406089652854591559'); // announcements channel
        
        try {
            await fetchedChannel.send({ embeds: [noteHostEmbed] });
            interaction.reply({content: `NoteHost info posted to announcements!`, flags: Discord.MessageFlags.Ephemeral});
        } catch (error) {
            console.error('Error sending message to channel:', error);
            interaction.reply({content: `Error: Could not send message to <#1406089652854591559>. Check bot permissions.`, flags: Discord.MessageFlags.Ephemeral});
        }
    }
};
