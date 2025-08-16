const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'roast',
    description: 'Get a playful roast (all in good fun!)',
    usage: `/roast [user]`,
    options: [
        {
            name: 'user',
            description: 'User to roast (optional)',
            type: 6,
            required: false
        }
    ],
    botSpamOnly: 1,
    execute(interaction) {
        const targetUser = interaction.options.getUser('user') || interaction.user;
        
        const roasts = [
            "You're like a software update - nobody wants you, but we're stuck with you.",
            "I'd explain it to you, but I don't have any crayons with me.",
            "You're not stupid; you just have bad luck thinking.",
            "If ignorance is bliss, you must be the happiest person alive.",
            "You're like a cloud - when you disappear, it's a beautiful day.",
            "I'm not saying you're dumb, but you'd struggle to pour water out of a boot with instructions on the heel.",
            "You're proof that evolution can go in reverse.",
            "If brains were dynamite, you wouldn't have enough to blow your nose.",
            "You're like a dictionary - you add meaning to my life... just kidding, you don't.",
            "I'd agree with you, but then we'd both be wrong.",
            "You're not the sharpest tool in the shed, are you?",
            "If you were any more inbred, you'd be a sandwich."
        ];
        
        const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
        
        const embed = new EmbedBuilder()
            .setColor(0xFF4757)
            .setTitle('🔥 Roasted!')
            .setDescription(`${targetUser.username}, ${randomRoast}`)
            .setFooter({ text: 'All in good fun! 😄', iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();
        
        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
