const bot = require('../../config/bot.json');
const color = require('../../config/embed.json');

module.exports = {
    name: 'about',
    description: 'Displays information about the bot.',
    usage: `/about`,
    botSpamOnly: 1,
    execute(interaction) {
        let embed = {
            color: color.blue_color,
            title: bot.name,
            thumbnail: {
                url: bot.avatar
            },
            description: `This is a bot made by Erin for Erin's Discord Server. You can find the source code [here](https://github.com/Dudethatserin/ErinHelperDiscordBot)`,
            timestamp: new Date(),
            footer: {
                text: color.footertext,
                icon_url: color.footericon
            }
        }

        interaction.reply({ embeds: [embed], flags: 64 });
    }
};
