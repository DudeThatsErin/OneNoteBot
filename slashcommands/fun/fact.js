const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'fact',
    description: 'Get a random fun or interesting fact!',
    usage: `/fact`,
    botSpamOnly: 1,
    async execute(interaction) {
        const facts = [
            "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!",
            "A group of flamingos is called a 'flamboyance'.",
            "Octopuses have three hearts and blue blood.",
            "Bananas are berries, but strawberries aren't.",
            "A shrimp's heart is in its head.",
            "It's impossible to hum while holding your nose closed.",
            "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
            "A single cloud can weigh more than a million pounds.",
            "There are more possible games of chess than there are atoms in the observable universe.",
            "Wombat poop is cube-shaped.",
            "The human brain uses about 20% of the body's total energy.",
            "A group of pandas is called an 'embarrassment'.",
            "The Great Wall of China isn't visible from space with the naked eye.",
            "Dolphins have names for each other.",
            "A day on Venus is longer than its year.",
            "The inventor of the frisbee was turned into a frisbee after he died.",
            "Sea otters hold hands when they sleep to keep from drifting apart.",
            "The longest recorded flight of a chicken is 13 seconds.",
            "A group of owls is called a 'parliament'.",
            "Your stomach gets an entirely new lining every 3-5 days because stomach acid would otherwise digest it."
        ];
        
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        
        // Get a random fact image from curated collection
        const factImages = [
            'https://i.postimg.cc/6qYJxLhY/fact1.png',
            'https://i.postimg.cc/Nf8qxK2L/fact2.png',
            'https://i.postimg.cc/GmXvN4Qh/fact3.png'
        ];
        const factImage = factImages[Math.floor(Math.random() * factImages.length)];
        
        const embed = new EmbedBuilder()
            .setColor(parseInt(config.blue_color, 16))
            .setTitle('🧠 Random Fact')
            .setDescription(randomFact)
            .setTimestamp()
            .setFooter({ text: `Fact requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
        
        // Set thumbnail with curated fact image
        embed.setThumbnail(factImage);
        
        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
