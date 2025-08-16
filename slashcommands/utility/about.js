const Discord = require('discord.js');
const config = require('../../config/config.json');
const bot = require('../../config/bot.json');
const owner = require('../../config/owner.json');

module.exports = {
    name: 'about',
    description: 'Displays information about the bot.',
    usage: `/about`,
    cooldown: 5,
    execute(interaction, client) {
        let embed = {
            color: 0xffffff,
            title: `${bot.name}`,
            thumbnail: {
                url: bot.avatar
            },
            description: `This is a bot made by Erin for Erin's Discord Server. You can find the source code [here](https://github.com/Dudethatserin/ErinHelperDiscordBot)`,
            timestamp: new Date(),
            footer: {
                text: `Thanks for using ${bot.name}!`,
                icon_url: bot.avatar
            }
        }

        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
