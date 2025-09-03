const { EmbedBuilder } = require('discord.js');
const embedConfig = require('../../config/embed.json');

module.exports = {
    name: '8ball',
    description: 'Ask the magic 8-ball a question!',
    options: [
        {
            name: 'question',
            description: 'The question you want to ask the magic 8-ball',
            required: true,
            type: 3
        }
    ],
    usage: `/8ball [question]`,
    botSpamOnly: 1,
    execute(interaction) {
        const question = interaction.options.getString('question');
        
        const responses = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            "Don't count on it.",
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const embed = new EmbedBuilder()
            .setColor(parseInt(embedConfig.yellow_color, 16))
            .setTitle('🎱 Magic 8-Ball')
            .addFields(
                { name: 'Question:', value: question },
                { name: 'Answer:', value: randomResponse }
            )
            .setTimestamp()
            .setFooter({ text: `Asked by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
        
        interaction.reply({ embeds: [embed] });
    }
};
