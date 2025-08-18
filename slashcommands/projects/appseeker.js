const Discord = require('discord.js');

module.exports = {
    name: 'appseeker',
    description: 'Information about AppSeeker project',
    usage: '/appseeker',
    data: {
        name: 'appseeker',
        description: 'Information about AppSeeker project'
    },
    execute(interaction) {
        const appSeekerEmbed = new Discord.EmbedBuilder()
            .setColor(0x3855e3)
            .setTitle('What is AppSeeker?')
            .setDescription('AppSeeker is **coming soon**. It will be a website you can use to compare productivity, task management, journaling, email, and more apps to find the perfect one *for you*.');

        interaction.reply({ embeds: [appSeekerEmbed] });
    }
};
