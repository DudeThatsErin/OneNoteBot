const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'quote',
    description: 'Get a random inspirational quote!',
    usage: `/quote`,
    botSpamOnly: 1,
    async execute(interaction) {
        const quotes = [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
            { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
            { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr." },
            { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
            { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
            { text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.", author: "Unknown" },
            { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
            { text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.", author: "Steve Jobs" },
            { text: "People who are crazy enough to think they can change the world, are the ones who do.", author: "Rob Siltanen" },
            { text: "Failure will never overtake me if my determination to succeed is strong enough.", author: "Og Mandino" },
            { text: "Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk. That's the classic entrepreneur.", author: "Mohnish Pabrai" },
            { text: "We don't make mistakes, just happy little accidents.", author: "Bob Ross" }
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        // Get a random quote image from curated collection
        const quoteImages = [
            'https://i.postimg.cc/6qYJxLhY/quote1.png',
            'https://i.postimg.cc/Nf8qxK2L/quote2.png',
            'https://i.postimg.cc/GmXvN4Qh/quote3.png'
        ];
        const quoteImage = quoteImages[Math.floor(Math.random() * quoteImages.length)];
        
        const embed = new EmbedBuilder()
            .setColor(parseInt(config.teal_color, 16))
            .setTitle('💭 Random Quote')
            .setDescription(`*"${randomQuote.text}"*`)
            .addFields({ name: 'Author:', value: randomQuote.author })
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
        
        // Set thumbnail with curated quote image
        embed.setThumbnail(quoteImage);
        
        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
