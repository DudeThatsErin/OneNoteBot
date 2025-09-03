const { EmbedBuilder } = require('discord.js');
const embedConfig = require('../../config/embed.json');

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
        
        // Get a random joke image from curated collection
        const jokeImages = [
            'https://erinskidds.com/bot/images/jokes/another_app.jpg',
            'https://erinskidds.com/bot/images/jokes/bartinder.jpg',
            'https://erinskidds.com/bot/images/jokes/bulldozer.jpg',
            'https://erinskidds.com/bot/images/jokes/clean-robber.jpg',
            'https://erinskidds.com/bot/images/jokes/dad_calls.jpg',
            'https://erinskidds.com/bot/images/jokes/date_mom.jpg',
            'https://erinskidds.com/bot/images/jokes/flushme.png',
            'https://erinskidds.com/bot/images/jokes/funny-dating-app-memes-17.jpg',
            'https://erinskidds.com/bot/images/jokes/fur-rari.webp',
            'https://erinskidds.com/bot/images/jokes/husky.jpg',
            'https://erinskidds.com/bot/images/jokes/pork-chop.jpg',
            'https://erinskidds.com/bot/images/jokes/pumpkin-patch.jpg',
            'https://erinskidds.com/bot/images/jokes/pupcakes.jpg',
            'https://erinskidds.com/bot/images/jokes/spot.jpg',
            'https://erinskidds.com/bot/images/jokes/too-many-apps.jpg',
            'https://erinskidds.com/bot/images/jokes/watch-dog.webp',
            'https://erinskidds.com/bot/images/jokes/waved.jpg',
            'https://erinskidds.com/bot/images/jokes/witch-itch.webp'
        ];
        
        // Randomly choose between text joke or image joke
        const useImage = Math.random() < 0.5;
        
        if (useImage) {
            // Send a random joke image
            const jokeImage = jokeImages[Math.floor(Math.random() * jokeImages.length)];
            interaction.reply({ content: jokeImage });
        } else {
            // Send a text joke embed
            const embed = new EmbedBuilder()
                .setColor(parseInt(embedConfig.orange_color, 16))
                .setTitle('😂 Random Joke')
                .setDescription(randomJoke)
                .setTimestamp()
                .setFooter({ text: embedConfig.footertext, iconURL: embedConfig.footericon });
            
            interaction.reply({ embeds: [embed] });
        }
    }
};
