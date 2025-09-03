const Discord = require('discord.js');
const ee = require('../../config/embed.json');
const axios = require('axios');

// Function to get random character images with fallback system
function getRandomCharacterImage(characterName) {
    // Curated image arrays for each character (local images)
    const characterImages = {
        'SpongeBob': [
            'https://erinskidds.com/bot/images/spongebob/spongebob-1.webp',
            'https://erinskidds.com/bot/images/spongebob/spongebob-2.png',
            'https://erinskidds.com/bot/images/spongebob/spongebob-3.jpg',
            'https://erinskidds.com/bot/images/spongebob/spongebob-4.webp',
            'https://erinskidds.com/bot/images/spongebob/spongebob-5.webp'
        ],
        'Patrick': [
            'https://erinskidds.com/bot/images/spongebob/pat-2.webp',
            'https://erinskidds.com/bot/images/spongebob/pat-3.jpg',
            'https://erinskidds.com/bot/images/spongebob/pat-4.jpg',
            'https://erinskidds.com/bot/images/spongebob/pat-5.webp'
        ],
        'Squidward': [
            'https://erinskidds.com/bot/images/spongebob/squidward-1.jpg',
            'https://erinskidds.com/bot/images/spongebob/squidward-2.jpg',
            'https://erinskidds.com/bot/images/spongebob/squidward-3.webp',
            'https://erinskidds.com/bot/images/spongebob/squidward-5.jpg'
        ],
        'Mr. Krabs': [
            'https://erinskidds.com/bot/images/spongebob/krabs-1.webp',
            'https://erinskidds.com/bot/images/spongebob/krabs-2.webp',
            'https://erinskidds.com/bot/images/spongebob/krabs-4.webp',
            'https://erinskidds.com/bot/images/spongebob/krabs-5.jpg'
        ],
        'Sandy': [
            'https://erinskidds.com/bot/images/spongebob/sandy-1.jpg',
            'https://erinskidds.com/bot/images/spongebob/sandy-3.jpg',
            'https://erinskidds.com/bot/images/spongebob/sandy-4.webp',
            'https://erinskidds.com/bot/images/spongebob/sandy-5.jpg'
        ],
        'Mr. Smitty Werbenjagermanjensen': [
            'https://erinskidds.com/bot/images/spongebob/number-1.webp'
        ]
    };
    
    const images = characterImages[characterName];
    if (images && images.length > 0) {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }
    
    // Default SpongeBob image if character not found
    return 'https://erinskidds.com/bot/images/spongebob/spongebob-1.webp';
}

module.exports = {
    name: 'spongebob',
    description: 'Get a random SpongeBob SquarePants quote with character image!',
    usage: '/spongebob',
    cooldown: 3,
    async execute(interaction) {
        const quotes = [
            // SpongeBob Quotes
            { character: 'SpongeBob', quote: "I'm ready! I'm ready! I'm ready!" },
            { character: 'SpongeBob', quote: "The best time to wear a striped sweater is all the time!" },
            { character: 'SpongeBob', quote: "I don't need it... I don't need it... I NEED IT!" },
            { character: 'SpongeBob', quote: "Ahahaha! Gary, you are gonna finish your dessert, and you are gonna like it!" },
            { character: 'SpongeBob', quote: "Can I be excused for the rest of my life?" },
            { character: 'SpongeBob', quote: "I'm ugly and I'm proud!" },
            { character: 'SpongeBob', quote: "Is mayonnaise an instrument?" },
            { character: 'SpongeBob', quote: "I'm a Goofy Goober! ROCK!" },
            { character: 'SpongeBob', quote: "Gary, I was just kidding! Come back! Gary? Gary?!" },
            { character: 'SpongeBob', quote: "Tartar sauce!" },
            { character: 'SpongeBob', quote: "I'm not just ready, I'm ready Freddy!" },
            { character: 'SpongeBob', quote: "Barnacles!" },
            { character: 'SpongeBob', quote: "I can't see my forehead!" },
            { character: 'SpongeBob', quote: "My leg!" },
            { character: 'SpongeBob', quote: "Krusty Krab pizza is the pizza for you and me!" },
            { character: 'SpongeBob', quote: "I'm absorbing his blows like I'm made of some sort of spongy material!" },
            { character: 'SpongeBob', quote: "Goodbye everyone, I'll remember you all in therapy!" },
            { character: 'SpongeBob', quote: "I'm not a Krusty Krab!" },
            { character: 'SpongeBob', quote: "F is for friends who do stuff together, U is for You and Me, N is for anywhere anytime at all! Down here in the deep blue sea!" },
            { character: 'SpongeBob', quote: "I'm ready to go to work, Mr. Krabs!" },
            { character: 'SpongeBob', quote: "Aw, cheer up Squid! It could be worse!" },
            { character: 'SpongeBob', quote: "I'm a sponge. I'm supposed to be absorbent!" },
            { character: 'SpongeBob', quote: "Patrick, you're a genius!" },
            { character: 'SpongeBob', quote: "I knew I shouldn't have gotten out of bed today." },
            { character: 'SpongeBob', quote: "Gary, I'm sorry I neglected you. Oh Gary?" },
            { character: 'SpongeBob', quote: "He was number one!" },

            // Patrick Quotes
            { character: 'Patrick', quote: "Is this the Krusty Krab? No, this is Patrick!" },
            { character: 'Patrick', quote: "The inner machinations of my mind are an enigma." },
            { character: 'Patrick', quote: "I can't see my forehead!" },
            { character: 'Patrick', quote: "Who you callin' Pinhead?" },
            { character: 'Patrick', quote: "I wumbo, you wumbo, he/she/me wumbo!" },
            { character: 'Patrick', quote: "Firmly grasp it!" },
            { character: 'Patrick', quote: "We should take Bikini Bottom and push it somewhere else!" },
            { character: 'Patrick', quote: "I'm not a Krusty Krab!" },
            { character: 'Patrick', quote: "Once there was an ugly barnacle. He was so ugly that everyone died. The end!" },
            { character: 'Patrick', quote: "East? I thought you said Weast!" },
            { character: 'Patrick', quote: "I have exactly $68!" },
            { character: 'Patrick', quote: "Leedle leedle leedle lee!" },
            { character: 'Patrick', quote: "What's the difference? You're their all-time best customer!" },
            { character: 'Patrick', quote: "I can't hear you! It's too dark in here!" },
            { character: 'Patrick', quote: "Are you feeling it now, Mr. Krabs?" },
            { character: 'Patrick', quote: "No, I'm dirty Dan!" },
            { character: 'Patrick', quote: "I'm not a crusty crab!" },
            { character: 'Patrick', quote: "My name's not Rick!" },
            { character: 'Patrick', quote: "Finland!" },
            { character: 'Patrick', quote: "24!" },
            { character: 'Patrick', quote: "I thought of something funnier than 24... 25!" },
            { character: 'Patrick', quote: "These are mail-order muscles!" },
            { character: 'Patrick', quote: "CHOCOLATE!" },
            { character: 'Patrick', quote: "Is mayonase an instrument?" },
            
            // Squidward Quotes
            { character: 'Squidward', quote: "I hate all of you." },
            { character: 'Squidward', quote: "Another day, another migraine." },
            { character: 'Squidward', quote: "I don't get it. I made my house a mess, which was making it clean, which made Squidward clean his yard, but that really means he's messing it up. But the opposite of clean is filth, which means filth is clean, which means SpongeBob is a clean person." },
            { character: 'Squidward', quote: "Too bad SpongeBob isn't here to enjoy SpongeBob not being here." },
            { character: 'Squidward', quote: "I order the food, you cook the food, the customer gets the food. We do that for 40 years, and then we die." },
            { character: 'Squidward', quote: "Can I have everybody's attention? I have to use the bathroom." },
            { character: 'Squidward', quote: "I don't like you." },
            { character: 'Squidward', quote: "SpongeBob is the only guy I know who can have fun with a jellyfish for 12 hours." },
            { character: 'Squidward', quote: "Well, it's true." },
            { character: 'Squidward', quote: "I'm not a Krusty Krab!" },
            { character: 'Squidward', quote: "Why must every 11 minutes of my life be filled with misery?" },
            { character: 'Squidward', quote: "I have no soul." },
            { character: 'Squidward', quote: "Future! Future!" },
            { character: 'Squidward', quote: "Bold and brash? More like belongs in the trash!" },
            { character: 'Squidward', quote: "I knew I shouldn't have gotten out of bed today." },
            { character: 'Squidward', quote: "That's his eager face." },
            { character: 'Squidward', quote: "Oh please. I have no soul." },
            { character: 'Squidward', quote: "I don't care about the customers!" },
            { character: 'Squidward', quote: "Darn customers!" },
            { character: 'Squidward', quote: "More!" },
            { character: 'Squidward', quote: "I'm claustrophobic!" },
            { character: 'Squidward', quote: "What does claustrophobic mean? It means he's afraid of Santa Claus!" },
            { character: 'Squidward', quote: "No! It means he's afraid of closed spaces!" },
            { character: 'Squidward', quote: "Ho ho ho!" },
            { character: 'Squidward', quote: "Stop it Patrick, you're scaring him!" },

            // Mr. Krabs Quotes
            { character: 'Mr. Krabs', quote: "Money money money money money!" },
            { character: 'Mr. Krabs', quote: "I like money!" },
            { character: 'Mr. Krabs', quote: "What's the most important rule here? The money comes first!" },
            { character: 'Mr. Krabs', quote: "SpongeBob me boy!" },
            { character: 'Mr. Krabs', quote: "I can think of ten good reasons to never let go of a dime, boy!" },
            { character: 'Mr. Krabs', quote: "The Krusty Krab pizza is the pizza for you and me!" },
            { character: 'Mr. Krabs', quote: "Ar ar ar ar ar!" },
            { character: 'Mr. Krabs', quote: "What are ye doing in me office?!" },
            { character: 'Mr. Krabs', quote: "I smell a smelly smell that smells... smelly." },
            { character: 'Mr. Krabs', quote: "Hello, I like money!" },
            { character: 'Mr. Krabs', quote: "I'm not a Krusty Krab!" },
            { character: 'Mr. Krabs', quote: "Are you feeling it now, Mr. Krabs?" },
            { character: 'Mr. Krabs', quote: "I'm feeling a warm spot." },
            { character: 'Mr. Krabs', quote: "Sorry, I don't speak Italian." },
            { character: 'Mr. Krabs', quote: "The boy cries you a sweater of tears, and you kill him." },
            { character: 'Mr. Krabs', quote: "What doesn't kill ya, usually succeeds in the second attempt." },
            { character: 'Mr. Krabs', quote: "Batten down the hatches!" },
            { character: 'Mr. Krabs', quote: "Shiver me timbers!" },
            { character: 'Mr. Krabs', quote: "Avast ye landlubbers!" },
            { character: 'Mr. Krabs', quote: "That's me millionth dollar!" },
            { character: 'Mr. Krabs', quote: "I've got to start selling pretty patties!" },
            { character: 'Mr. Krabs', quote: "Attention customers! Krusty Krab is unfair!" },
            { character: 'Mr. Krabs', quote: "I'll give ya 68 cents for it!" },
            { character: 'Mr. Krabs', quote: "Neptune preserve us!" },
            { character: 'Mr. Krabs', quote: "Great barrier reef!" },

            // Sandy Quotes
            { character: 'Sandy', quote: "Don't you dare take the name of Texas in vain!" },
            { character: 'Sandy', quote: "I'm from Texas!" },
            { character: 'Sandy', quote: "Y'all are dumber than a sack of wet mice!" },
            { character: 'Sandy', quote: "Land sakes alive!" },
            { character: 'Sandy', quote: "I'm gonna karate chop ya!" },
            { character: 'Sandy', quote: "Howdy y'all!" },
            { character: 'Sandy', quote: "Sweet sassafras!" },
            { character: 'Sandy', quote: "I'm tougher than a two-dollar steak!" },
            { character: 'Sandy', quote: "Don't mess with Texas!" },
            { character: 'Sandy', quote: "Yeehaw!" },
            { character: 'Sandy', quote: "What in tarnation?!" },
            { character: 'Sandy', quote: "Well I'll be jiggered!" },
            { character: 'Sandy', quote: "That's more like it!" },
            { character: 'Sandy', quote: "I reckon so!" },
            { character: 'Sandy', quote: "Hold your horses there, SpongeBob!" },
            { character: 'Sandy', quote: "That dog won't hunt!" },
            { character: 'Sandy', quote: "Well, butter my biscuit!" },
            { character: 'Sandy', quote: "I'm fixin' to do some science!" },
            { character: 'Sandy', quote: "That's nuttier than a fruitcake!" },
            { character: 'Sandy', quote: "Well, I'll be hornswoggled!" },
            { character: 'Sandy', quote: "Jumpin' Jehosaphat!" },
            { character: 'Sandy', quote: "Great galoshes!" },
            { character: 'Sandy', quote: "Well, slap me with a wet noodle!" },
            { character: 'Sandy', quote: "That's about as useful as a chocolate teapot!" },

            // Mr. Smitty Werbenjagermanjensen Quote
            { character: 'Mr. Smitty Werbenjagermanjensen', quote: "It was his hat, Mr. Krabs! He was number one!" }
        ];

        // Get random quote
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        // Get random image for the character from curated collection
        const characterImage = getRandomCharacterImage(randomQuote.character);
        
        // Character colors
        const characterColors = {
            'SpongeBob': 0xFFFF00, // Yellow
            'Patrick': 0xFF69B4,   // Pink
            'Squidward': 0x00CED1,  // Turquoise
            'Mr. Krabs': 0xFF0000,  // Red
            'Sandy': 0xDEB887,      // Burlywood
            'Mr. Smitty Werbenjagermanjensen': 0xFFFF00 // Yellow (same as SpongeBob)
        };

        const embed = new Discord.EmbedBuilder()
            .setColor(characterColors[randomQuote.character] || 0xFFFF00)
            .setTitle(`${randomQuote.character} says:`)
            .setDescription(`"${randomQuote.quote}"`)
            .setFooter({ 
                text: `SpongeBob SquarePants Quote #${Math.floor(Math.random() * 1000) + 1}`
            })
            .setTimestamp();

        // Set thumbnail with curated character image
        embed.setThumbnail(characterImage);

        interaction.reply({ embeds: [embed] });
    }
};
