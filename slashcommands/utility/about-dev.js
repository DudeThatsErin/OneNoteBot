const Discord = require('discord.js');
const owner = require('../../config/owner.json');
const color = require('../../config/embed.json');

module.exports = {
    name: 'about-dev',
    description: 'Displays information about the bot developer.',
    usage: `/about-dev`,
    botSpamOnly: 1,
    execute(interaction) {
        const row = new Discord.ActionRowBuilder()
            .addComponents([
                new Discord.ButtonBuilder()
                    .setCustomId('erinportfolio')
                    .setLabel('Erin\'s Portfolio')
                    .setURL(`${owner.url}`)
                    .setStyle(Discord.ButtonStyle.Secondary),
                new Discord.ButtonBuilder()
                    .setCustomId('eringithub')
                    .setLabel('Erin\'s GitHub')
                    .setURL(`${owner.github}`)
                    .setStyle(Discord.ButtonStyle.Secondary),
                new Discord.ButtonBuilder()
                    .setCustomId('erinerin')
                    .setLabel('Erin\'s Reddit')
                    .setURL(`${owner.reddit}`)
                    .setStyle(Discord.ButtonStyle.Secondary)
            ]);
        let embed = {
            color: color.purple_color,
            title: owner.name,
            thumbnail: {
                url: owner.avatar
            },
            description: `Erin is a Texas native who has been obsessed with productivity apps for years. She has also been developing for over 20 years with a specialty in bot development and web development. She currently works as a mid-level Full Stack Engineer and is working towards becoming a Senior Software Engineer as well as working towards a career in AI and Machine Learning. She is also a huge fan of Palworld, Legend of Zelda: Breath of the Wild and Tears of the Kingdom, as well as Splatoon 2 & 3 and Pokemon Legends: Arceus.`,
            timestamp: new Date(),
            footer: {
                text: color.footertext,
                icon_url: color.footericon
            }
        }

        interaction.reply({ embeds: [embed], components: [row], flags: 64 });
    }
};
