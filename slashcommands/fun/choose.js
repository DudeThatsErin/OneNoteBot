const { EmbedBuilder } = require('discord.js');
const config = require('../../config/embed.json');

module.exports = {
    name: 'choose',
    description: 'Can\'t decide? Let me choose for you!',
    usage: `/choose [options separated by commas]`,
    botSpamOnly: 1,
    options: [
        {
            name: 'options',
            description: 'Options to choose from (separated by commas)',
            type: 3,
            required: true
        }
    ],
    execute(interaction) {
        const input = interaction.options.getString('options');
        const choices = input.split(',').map(choice => choice.trim()).filter(choice => choice.length > 0);
        
        if (choices.length < 2) {
            return interaction.reply({ content: 'Please provide at least 2 options separated by commas!', flags: 64 });
        }
        
        if (choices.length > 20) {
            return interaction.reply({ content: 'Too many options! Please provide 20 or fewer choices.', flags: 64 });
        }
        
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        
        const embed = new EmbedBuilder()
            .setColor(parseInt(config.purple_color, 16))
            .setTitle('🤔 Decision Maker')
            .addFields(
                { name: 'Your Options:', value: choices.join(', ') },
                { name: 'I Choose:', value: `**${randomChoice}**` }
            )
            .setTimestamp()
            .setFooter({ text: `Decided for ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
        
        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
