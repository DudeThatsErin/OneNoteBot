const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'joke',
    description: 'Get a random programming or general joke!',
    usage: `/joke`,
    botSpamOnly: 1,
    data: {
        name: 'joke',
        description: 'Get a random programming or general joke!'
    },
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
        
        // Get a random joke image from curated collection
        const jokeImages = [
            'https://i.postimg.cc/6qYJxLhY/joke1.png',
            'https://i.postimg.cc/Nf8qxK2L/joke2.png',
            'https://i.postimg.cc/GmXvN4Qh/joke3.png'
        ];
        const jokeImage = jokeImages[Math.floor(Math.random() * jokeImages.length)];
        
        const embed = new EmbedBuilder()
            .setColor(0xFFA500)
            .setTitle('😂 Random Joke')
            .setDescription(randomJoke)
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
        
        // Set thumbnail with curated joke image
        embed.setThumbnail(jokeImage);
        
        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
