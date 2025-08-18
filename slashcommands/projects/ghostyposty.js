const Discord = require('discord.js');

module.exports = {
    name: 'ghostyposty',
    description: 'Information about GhostyPosty - Obsidian Plugin for Ghost blog drafts',
    
    data: {
        name: 'ghostyposty',
        description: 'Information about GhostyPosty - Obsidian Plugin for Ghost blog drafts'
    },
    execute(interaction) {
        const ghostyPostyEmbed = new Discord.EmbedBuilder()
            .setColor(0x193591)
            .setTitle('What is GhostyPosty?')
            .setDescription('GhostyPosty is an open-source Obsidian Plugin that allows users to draft blog posts from their Obsidian vault and then upload them as drafts to your Ghost blog. It was an idea [Matt Birchler from A Better Computer](https://birchtree.me/) had back in 2020 but never ended up releasing. I decided to release it when I switched my blog from WordPress to Ghost this year! You can visit the [GhostyPosty GitHub](https://github.com/DudeThatsErin/GhostyPosty) to learn more.');

        interaction.reply({ embeds: [ghostyPostyEmbed] });
    }
};
