const { EmbedBuilder } = require('discord.js');
const config = require('../../config/embed.json');

module.exports = {
    name: 'roast',
    description: 'Give someone (or yourself) a playful roast - all in good fun!',
    usage: `/roast [user]`,
    botSpamOnly: 1,
    options: [
        {
            name: 'user',
            description: 'User to roast (optional)',
            type: 6,
            required: false
        }
    ],
    execute(interaction) {
        const targetUser = interaction.options.getUser('user') || interaction.user;
        
        const roasts = [
            "Your momma's so old, she knew Burger King when he was still a prince!",
            "Your momma's so slow, she took 2 hours to watch 60 Minutes!",
            "Your coding skills are like Internet Explorer - they work, but nobody's impressed.",
            "You're like a software update - nobody wants you, but we're stuck with you anyway.",
            "Your WiFi password is probably 'password123' and you think you're a hacker.",
            "You're the reason shampoo has instructions on the bottle.",
            "Your momma's so short, she poses for trophies!",
            "You put the 'special' in 'special education'.",
            "Your brain is like a browser with 47 tabs open - 3 are frozen and you have no idea where the music is coming from.",
            "You're like a participation trophy - everyone gets one, but nobody really wants it.",
            "Your momma's so poor, ducks throw bread at her!",
            "You're not stupid, you just have bad luck when thinking.",
            "Your fashion sense is like your coding - it works, but it's not pretty.",
            "You're like a cloud - when you disappear, it's a beautiful day.",
            "Your momma's so ugly, when she walks into a bank they turn off the cameras!",
            "You're the human equivalent of a software bug that somehow became a feature.",
            "Your jokes are like your hairline - they're both receding fast.",
            "You're like a broken pencil - completely pointless!",
            "Your momma's so fat, when she skips a meal, the stock market drops!",
            "You have the perfect face for radio and the perfect voice for silent movies.",
            "Your cooking is so bad, Gordon Ramsay would quit and become a librarian.",
            "You're like a dictionary - you add meaning to people's lives... just kidding!",
            "Your momma's so lazy, she thinks a two-income family is where yo daddy has two jobs!",
            "You're not the sharpest tool in the shed, but at least you're a tool!",
            "Your dance moves look like you're fighting off invisible bees while having a seizure."
        ];
        
        const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
        
        const embed = new EmbedBuilder()
            .setColor(parseInt(config.maroon_color, 16))
            .setTitle('🔥 Roasted!')
            .setDescription(`${targetUser.username}, ${randomRoast}`)
            .setFooter({ text: 'All in good fun! 😄', iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();
        
        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
