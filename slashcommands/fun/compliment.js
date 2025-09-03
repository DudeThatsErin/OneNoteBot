const { EmbedBuilder } = require('discord.js');
const config = require('../../config/embed.json');

module.exports = {
    name: 'compliment',
    description: 'Give someone (or yourself) a nice compliment!',
    usage: `/compliment [user]`,
    botSpamOnly: 1,
    options: [
        {
            name: 'user',
            description: 'User to give a compliment to',
            type: 6,
            required: false
        }
    ],
    execute(interaction) {
        const targetUser = interaction.options.getUser('user') || interaction.user;
        
        const compliments = [
            "You're an absolutely incredible person with so much to offer the world!",
            "Your smile could light up the entire room and warm everyone's heart!",
            "You have such a positive energy that makes everyone around you feel better.",
            "You're incredibly thoughtful and kind to others in ways that truly matter.",
            "Your creativity and unique perspective make the world a more interesting place.",
            "You have a great sense of humor that brightens everyone's day!",
            "You're stronger than you know and braver than you feel.",
            "Your intelligence and wisdom inspire others around you.",
            "You make a positive difference in people's lives just by being yourself.",
            "You have an amazing ability to make others feel valued and appreciated.",
            "Your determination and perseverance are truly admirable.",
            "You're a wonderful friend and an even better person!",
            "Your kindness is a gift that keeps on giving to everyone you meet.",
            "You have such a beautiful heart and soul that shines through everything you do.",
            "You're absolutely amazing just the way you are!",
            "Your compassion for others is genuinely inspiring and makes the world better.",
            "You have a special talent for making people feel heard and understood.",
            "Your authenticity is refreshing in a world that often feels fake.",
            "You bring out the best in people just by being around them.",
            "Your laugh is contagious and brings joy to everyone who hears it.",
            "You have incredible inner strength that helps you overcome any challenge.",
            "Your generosity of spirit is something truly rare and beautiful.",
            "You're the kind of person who makes others believe in themselves.",
            "Your optimism is a beacon of hope for those around you.",
            "You have a gift for seeing the good in every situation and person.",
            "Your presence alone makes any gathering more enjoyable and memorable.",
            "You're incredibly talented and your skills continue to amaze everyone.",
            "Your empathy and understanding create safe spaces for others to be themselves.",
            "You have a wonderful way of making even ordinary moments feel special.",
            "Your dedication to growth and learning is truly inspiring to witness."
        ];
        
        const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
        
        const embed = new EmbedBuilder()
            .setColor(parseInt(config.coral_color, 16))
            .setTitle('💖 Compliment')
            .setDescription(`${targetUser.username}, ${randomCompliment}`)
            .setFooter({ text: 'Spread positivity! 🌟', iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();
        
        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
