const Discord = require('discord.js');

module.exports = {
    name: 'sasha-ai',
    description: 'Information about Sasha AI project',
    usage: '/sasha-ai',
    data: {
        name: 'sasha-ai',
        description: 'Information about Sasha AI project'
    },
    execute(interaction) {
        const sashaAiEmbed = new Discord.EmbedBuilder()
            .setColor(0x2eea80)
            .setTitle('What is Sasha AI?')
            .setDescription('Sasha AI is my open-source [AI Chatbot](https://github.com/DudeThatsErin/Sasha-AI) that I am coding from scratch. It is currently on hiatus while I learn more higher level maths (Discrete Algebra, Calculus, Linear Algebra, etc.) and learn more about AI and how it functions.');

        interaction.reply({ embeds: [sashaAiEmbed] });
    }
};
