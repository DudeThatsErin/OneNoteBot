const { EmbedBuilder } = require('discord.js');
const embedConfig = require('../../config/embed.json');

module.exports = {
    name: 'wiki',
    description: 'Links to our wiki',
    usage: '/wiki',
    botSpamOnly: 1,
    execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(parseInt(embedConfig.light_green_color, 16))
            .setTitle('📚 OneNote Wiki')
            .setDescription('Check out our wiki for helpful information and guides!')
            .addFields({
                name: '🔗 Wiki Link',
                value: '[Click here to visit our wiki](https://onenote-wiki.vercel.app)',
                inline: false
            })
            .setTimestamp()
            .setFooter({ 
                text: embedConfig.footertext, 
                iconURL: embedConfig.footericon 
            });

        interaction.reply({ 
            embeds: [embed],
            flags: 64 
        });
    }
}