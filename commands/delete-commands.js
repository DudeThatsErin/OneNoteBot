require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const bot = require('../config/bot.json');
const token = process.env.DISCORD_TOKEN;

module.exports = {
  name: 'deletecommands',
  aliases: ['endslash', 'delete-commands'],
  description: 'Allows Erin to delete the Slash Commands.',
  ownerOnly: 1,
  execute(message) {
    const rest = new REST({ version: '10' }).setToken(token);

    (async () => {
        try {

          //console.log('client ', message.client.slashCommands)

            // Delete guild commands
            await rest.put(
                Routes.applicationGuildCommands(bot.id, bot.serverId),
                { body: [] },
            );

            // Delete global commands
            await rest.put(
                Routes.applicationCommands(bot.id),
                { body: [] },
            );

            message.reply('Successfully deleted all slash commands!');

        } catch (error) {
            console.error(error);
            message.react('❌');
            message.reply({content: `There was an error... ${error}`});
        }
    })();

    message.reply({content: 'deleted the commands!'});
  }
}