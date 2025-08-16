const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'compliment',
    description: 'Give someone (or yourself) a nice compliment!',
    usage: `/compliment [user]`,
    options: [
        {
            name: 'user',
            description: 'User to compliment (optional)',
            type: 6,
            required: false
        }
    ],
    botSpamOnly: 1,
    execute(interaction) {
        const targetUser = interaction.options.getUser('user') || interaction.user;
        
        const compliments = [
            "You're an awesome person and anyone would be lucky to know you!",
            "Your smile could light up the entire room!",
            "You have such a positive energy that makes everyone around you feel better.",
            "You're incredibly thoughtful and kind to others.",
            "Your creativity and unique perspective make the world a more interesting place.",
            "You have a great sense of humor that brightens everyone's day!",
            "You're stronger than you know and braver than you feel.",
            "Your intelligence and wisdom inspire others around you.",
            "You make a positive difference in people's lives just by being yourself.",
            "You have an amazing ability to make others feel valued and appreciated.",
            "Your determination and perseverance are truly admirable.",
            "You're a wonderful friend and an even better person!",
            "Your kindness is a gift that keeps on giving.",
            "You have such a beautiful heart and soul.",
            "You're absolutely amazing just the way you are!"
        ];
        
        const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
        
        const embed = new EmbedBuilder()
            .setColor(0xFFB6C1)
            .setTitle('💖 Compliment')
            .setDescription(`${targetUser.username}, ${randomCompliment}`)
            .setFooter({ text: 'Spread positivity! 🌟', iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();
        
        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
