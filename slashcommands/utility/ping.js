const config = require('../../config/config.json');
const bot = require('../../config/bot.json');
const owner = require('../../config/owner.json');

module.exports = {
    name: 'ping',
    description: 'Makes sure the bot can hear commands.',
    usage: `/ping `,
    cooldown: 5,
    execute(interaction, client) {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        let embed = {
          color: 0xffffff,
          title: `${bot.name} is online!`,
          thumbnail: {
            url: bot.avatar
          },
          description:`Thanks for checking if ${bot.name} was online. ${bot.name} has been awake for \`${days}d ${hours}h ${minutes}m ${seconds}s\`! That is the last time ${owner.name} reset ${bot.name}. You can see the uptime of my website [here](${bot.uptime})!\nMy prefix is \`${config.prefix}\``,
          timestamp: new Date(),
          footer: {
            text: `Thanks for using ${bot.name}!`,
            icon_url: bot.avatar
          }
        }

        interaction.reply({ embeds: [embed], flags: 64 });
    }
};