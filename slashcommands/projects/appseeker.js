const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'appseeker',
    description: 'Information about AppSeeker project',
    usage: '/appseeker',
    ownerOnly: 1,
    async execute(interaction) {
        const appSeekerEmbed = new Discord.EmbedBuilder()
            .setColor(0x3855e3)
            .setTitle('What is AppSeeker?')
            .setDescription('AppSeeker is **coming soon**. It will be a website you can use to compare productivity, task management, journaling, email, and more apps to find the perfect one *for you*.');

        const fetchedChannel = interaction.guild.channels.cache.get('1406089652854591559'); // announcements channel
        
        try {
            await fetchedChannel.send({ embeds: [appSeekerEmbed] });
            interaction.reply({content: `AppSeeker info posted to announcements!`, flags: Discord.MessageFlags.Ephemeral});
        } catch (error) {
            console.error('Error sending message to channel:', error);
            interaction.reply({content: `Error: Could not send message to <#1406089652854591559>. Check bot permissions.`, flags: Discord.MessageFlags.Ephemeral});
        }
    }
};
