const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'learn',
    description: 'Learn something new with educational facts from different categories!',
    usage: `/learn [category]`,
    options: [
        {
            name: 'category',
            description: 'Choose a category to learn about',
            type: 3,
            required: false,
            choices: [
                { name: 'Science', value: 'science' },
                { name: 'History', value: 'history' },
                { name: 'Technology', value: 'technology' },
                { name: 'Space', value: 'space' },
                { name: 'Nature', value: 'nature' },
                { name: 'Random', value: 'random' }
            ]
        }
    ],
    botSpamOnly: 1,
    execute(interaction) {
        const category = interaction.options.getString('category') || 'random';
        
        const educationalFacts = {
            science: [
                "The human brain contains approximately 86 billion neurons, each connected to thousands of others.",
                "Light travels at 299,792,458 meters per second in a vacuum - that's about 186,282 miles per second!",
                "DNA is 99.9% identical between all humans, with only 0.1% accounting for our differences.",
                "A single teaspoon of neutron star material would weigh about 6 billion tons on Earth.",
                "The periodic table has 118 confirmed elements, with the heaviest being Oganesson (Og).",
                "Water expands by about 9% when it freezes, which is why ice floats on water.",
                "The speed of sound varies by temperature - it's faster in warm air than cold air.",
                "Photosynthesis converts about 1% of available sunlight into chemical energy in plants."
            ],
            history: [
                "The Great Library of Alexandria was one of the largest libraries of the ancient world, containing up to 700,000 scrolls.",
                "The printing press, invented by Johannes Gutenberg around 1440, revolutionized the spread of knowledge.",
                "The Rosetta Stone, discovered in 1799, was key to deciphering Egyptian hieroglyphs.",
                "The oldest known writing system is cuneiform, developed by the Sumerians around 3200 BCE.",
                "The Black Death (1347-1351) killed an estimated 75-200 million people in Europe.",
                "The first university was established in Bologna, Italy in 1088 CE.",
                "Paper was invented in China around 105 CE by Cai Lun during the Han Dynasty.",
                "The Silk Road connected East and West for over 1,400 years, facilitating trade and cultural exchange."
            ],
            technology: [
                "The first computer bug was an actual bug - a moth found in a Harvard computer in 1947.",
                "The Internet was originally called ARPANET and was developed by the US Department of Defense in 1969.",
                "The first email was sent by Ray Tomlinson to himself in 1971, and he chose the @ symbol for addresses.",
                "Moore's Law states that computer processing power doubles approximately every two years.",
                "The first mobile phone call was made on April 3, 1973, by Martin Cooper of Motorola.",
                "Bluetooth technology is named after King Harald Bluetooth of Denmark, who united Danish tribes.",
                "The term 'cookie' in computing comes from 'magic cookie,' a packet of data in Unix systems.",
                "The first webcam was created in 1991 to monitor a coffee pot at Cambridge University."
            ],
            space: [
                "One day on Venus is longer than one year on Venus - it takes 243 Earth days to rotate once.",
                "Jupiter's Great Red Spot is a storm that has been raging for at least 400 years.",
                "Neutron stars are so dense that a sugar cube-sized piece would weigh 6 billion tons.",
                "The observable universe is about 93 billion light-years in diameter.",
                "Saturn's moon Titan has lakes and rivers of liquid methane and ethane.",
                "A black hole's event horizon is the point of no return - not even light can escape.",
                "The International Space Station orbits Earth at about 17,500 mph (28,000 km/h).",
                "Mars has the largest volcano in our solar system - Olympus Mons is 13.6 miles (22 km) high."
            ],
            nature: [
                "Trees can communicate with each other through underground fungal networks called mycorrhizae.",
                "A group of flamingos is called a 'flamboyance,' and they get their pink color from eating shrimp.",
                "Octopuses have three hearts, blue blood, and can change both color and texture instantly.",
                "Honey never spoils - archaeologists have found edible honey in ancient Egyptian tombs.",
                "A single oak tree can produce up to 10,000 acorns in a good year.",
                "Dolphins have unique whistle signatures that function like names.",
                "The Amazon rainforest produces about 20% of the world's oxygen.",
                "A group of owls is called a 'parliament,' and they can rotate their heads 270 degrees."
            ]
        };
        
        let selectedFacts;
        let categoryName;
        
        if (category === 'random') {
            const allCategories = Object.keys(educationalFacts);
            const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
            selectedFacts = educationalFacts[randomCategory];
            categoryName = randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1);
        } else {
            selectedFacts = educationalFacts[category];
            categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        }
        
        const randomFact = selectedFacts[Math.floor(Math.random() * selectedFacts.length)];
        
        const categoryColors = {
            science: 0x00FF7F,
            history: 0x8B4513,
            technology: 0x1E90FF,
            space: 0x4B0082,
            nature: 0x228B22,
            random: 0xFF6347
        };
        
        const categoryEmojis = {
            science: '🔬',
            history: '📜',
            technology: '💻',
            space: '🚀',
            nature: '🌿',
            random: '🎲'
        };
        
        const actualCategory = category === 'random' ? categoryName.toLowerCase() : category;
        
        const embed = new EmbedBuilder()
            .setColor(categoryColors[actualCategory] || categoryColors.random)
            .setTitle(`${categoryEmojis[actualCategory] || categoryEmojis.random} Educational Fact - ${categoryName}`)
            .setDescription(randomFact)
            .addFields({ name: 'Learn More!', value: 'Try different categories: Science, History, Technology, Space, Nature' })
            .setTimestamp()
            .setFooter({ text: `Educational content for ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
        
        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
