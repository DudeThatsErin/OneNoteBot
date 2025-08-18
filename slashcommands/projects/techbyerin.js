const Discord = require('discord.js');

module.exports = {
    name: 'techbyerin',
    description: 'Information about Tech By Erin blog',
    usage: '/techbyerin',
    data: {
        name: 'techbyerin',
        description: 'Information about Tech By Erin blog'
    },
    execute(interaction) {
        const tbeEmbed = new Discord.EmbedBuilder()
            .setColor(0xb321b5)
            .setTitle('What is Tech By Erin (TBE)?')
            .setDescription('Tech By Erin (TBE) is my [blog](https://techbyerin.com). I run it using [ghost](https://ghost.org) and I plan to make an Obsidian plugin soon to make the process even smoother.');

        interaction.reply({ embeds: [tbeEmbed] });
    }
};
