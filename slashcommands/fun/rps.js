const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'rps',
    description: 'Play Rock, Paper, Scissors against the bot!',
    usage: `/rps [choice]`,
    options: [
        {
            name: 'choice',
            description: 'Your choice: rock, paper, or scissors',
            type: 3,
            required: true,
            choices: [
                { name: 'Rock', value: 'rock' },
                { name: 'Paper', value: 'paper' },
                { name: 'Scissors', value: 'scissors' }
            ]
        }
    ],
    botSpamOnly: 1,
    execute(interaction) {
        const userChoice = interaction.options.getString('choice');
        const botChoices = ['rock', 'paper', 'scissors'];
        const botChoice = botChoices[Math.floor(Math.random() * botChoices.length)];
        
        const emojis = {
            rock: '🪨',
            paper: '📄',
            scissors: '✂️'
        };
        
        let result;
        let color;
        
        if (userChoice === botChoice) {
            result = "It's a tie! 🤝";
            color = 0xFFD700;
        } else if (
            (userChoice === 'rock' && botChoice === 'scissors') ||
            (userChoice === 'paper' && botChoice === 'rock') ||
            (userChoice === 'scissors' && botChoice === 'paper')
        ) {
            result = "You win! 🎉";
            color = 0x00FF00;
        } else {
            result = "I win! 😎";
            color = 0xFF0000;
        }
        
        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('🎮 Rock, Paper, Scissors')
            .addFields(
                { name: 'Your Choice:', value: `${emojis[userChoice]} ${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)}`, inline: true },
                { name: 'My Choice:', value: `${emojis[botChoice]} ${botChoice.charAt(0).toUpperCase() + botChoice.slice(1)}`, inline: true },
                { name: 'Result:', value: result, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: `Played by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
        
        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
