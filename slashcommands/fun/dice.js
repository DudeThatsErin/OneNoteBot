const { EmbedBuilder } = require('discord.js');
const config = require('../../config/embed.json');

module.exports = {
    name: 'dice',
    description: 'Roll dice! Supports multiple dice and different sides.',
    usage: `/dice [sides] [count]`,
    botSpamOnly: 1,
    options: [
        {
            name: 'sides',
            description: 'Number of sides on the dice (default: 6, max: 100)',
            type: 4,
            required: false
        },
        {
            name: 'count',
            description: 'Number of dice to roll (default: 1, max: 10)',
            type: 4,
            required: false
        }
    ],
    execute(interaction) {
        const sides = interaction.options.getInteger('sides') || 6;
        const count = Math.min(interaction.options.getInteger('count') || 1, 10);
        
        if (sides < 2 || sides > 100) {
            return interaction.reply({ content: 'Dice must have between 2 and 100 sides!', flags: 64 });
        }
        
        const rolls = [];
        let total = 0;
        
        for (let i = 0; i < count; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            rolls.push(roll);
            total += roll;
        }
        
        const embed = new EmbedBuilder()
            .setColor(parseInt(config.aqua_color, 16))
            .setTitle('🎲 Dice Roll')
            .addFields(
                { name: 'Dice:', value: `${count}d${sides}` },
                { name: 'Results:', value: rolls.join(', ') },
                { name: 'Total:', value: total.toString() }
            )
            .setTimestamp()
            .setFooter({ text: `Rolled by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
        
        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
