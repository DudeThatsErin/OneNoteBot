const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const bot = require('../config/bot.json');

module.exports = {
  name: 'deletecommands',
  aliases: ['endslash', 'delete-commands', 'dc'],
  description: 'Allows Erin to delete the Slash Commands.',
  ownerOnly: 1,
  execute(message, client) {
    // Use the shared REST instance from the client
    const rest = client.rest;
    if (!rest) {
      console.error('❌ No REST instance found on client!');
      return message.reply('❌ REST client not available. Please restart the bot.');
    }

    (async () => {
        try {

          //console.log('client ', message.client.slashCommands)

            // Delete My guild commands
            await rest.put(
                Routes.applicationGuildCommands(bot.id, bot.servers.mine.id),
                { body: [] },
            );

            // Delete OneNote guild commands 
            await rest.put(
              Routes.applicationGuildCommands(bot.id, bot.servers.onenote.id),
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