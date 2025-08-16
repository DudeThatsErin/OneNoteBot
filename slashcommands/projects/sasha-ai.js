const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'sasha-ai',
    description: 'Information about Sasha AI project',
    usage: '/sasha-ai',
    ownerOnly: 1,
    async execute(interaction) {
        const sashaAiEmbed = new Discord.EmbedBuilder()
            .setColor(0x2eea80)
            .setTitle('What is Sasha AI?')
            .setDescription('Sasha AI is my open-source [AI Chatbot](https://github.com/DudeThatsErin/Sasha-AI) that I am coding from scratch. It is currently on hiatus while I learn more higher level maths (Discrete Algebra, Calculus, Linear Algebra, etc.) and learn more about AI and how it functions.');

        const fetchedChannel = interaction.guild.channels.cache.get('1406089652854591559'); // announcements channel
        
        try {
            await fetchedChannel.send({ embeds: [sashaAiEmbed] });
            interaction.reply({content: `Sasha AI info posted to announcements!`, flags: Discord.MessageFlags.Ephemeral});
        } catch (error) {
            console.error('Error sending message to channel:', error);
            interaction.reply({content: `Error: Could not send message to <#1406089652854591559>. Check bot permissions.`, flags: Discord.MessageFlags.Ephemeral});
        }
    }
};
