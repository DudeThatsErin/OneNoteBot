const { EmbedBuilder } = require('discord.js');
const { searchGoogleImages } = require('../../utils/imageSearch');

module.exports = {
    name: 'joke',
    description: 'Get a random programming or general joke!',
    usage: `/joke`,
    botSpamOnly: 1,
    async execute(interaction) {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
            "Why don't scientists trust atoms? Because they make up everything!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "Why did the scarecrow win an award? He was outstanding in his field!",
            "A SQL query goes into a bar, walks up to two tables and asks... 'Can I join you?'",
            "Why do Java developers wear glasses? Because they can't C#!",
            "There are only 10 types of people in the world: those who understand binary and those who don't.",
            "Why did the programmer quit his job? He didn't get arrays!",
            "What's the object-oriented way to become wealthy? Inheritance!",
            "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25!",
            "A user interface is like a joke. If you have to explain it, it's not that good.",
            "Why did the developer go broke? Because he used up all his cache!",
            "What do you call a programmer from Finland? Nerdic!",
            "Why don't programmers like nature? It has too many bugs!"
        ];
        
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        
        // Search for a funny joke image
        const jokeImage = await searchGoogleImages('funny joke laughing emoji');
        
        const embed = new EmbedBuilder()
            .setColor(0xFFA500)
            .setTitle('😂 Random Joke')
            .setDescription(randomJoke)
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
        
        // Only set thumbnail if we found an image from Google search
        if (jokeImage) {
            embed.setThumbnail(jokeImage);
        }
        
        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
