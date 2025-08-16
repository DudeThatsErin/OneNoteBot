require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const bot = require('../config/bot.json');
const token = process.env.DISCORD_TOKEN;

module.exports = {
  name: 'createcommands',
  aliases: ['startslash', 'create-commands'],
  description: 'Allows Erin to create the Slash Commands.',
  ownerOnly: 1,
  execute(message) {
    const rest = new REST({ version: '10' }).setToken(token);

    (async () => {
        try {
            // Convert Map to array of command objects
            const slashCommands = [];
            
            if (message.client.slashCommands) {
                message.client.slashCommands.forEach((cmd) => {
                    let object = {};
                    if (cmd.name) object.name = cmd.name;
                    if (cmd.description) object.description = cmd.description;
                    if (cmd.options) object.options = cmd.options;
                    slashCommands.push(object);
                });
            }

            console.log(`Registering ${slashCommands.length} slash commands...`);

            // Create guild commands
            const result = await rest.put(
                Routes.applicationGuildCommands(bot.id, bot.serverId),
                { body: slashCommands },
            );

            // Create global commands
            const globalResult = await rest.put(
                Routes.applicationCommands(bot.id),
                { body: slashCommands },
            );

            console.log(`Successfully registered ${result.length} guild commands!`);
            console.log(`Successfully registered ${globalResult.length} global commands!`);
            message.reply(`Successfully created ${result.length} slash commands!`);

        } catch (error) {
            console.error('Command registration error:', error);
            message.react('❌');
            message.reply({content: `There was an error: ${error.message}`});
        }
    })();

    message.reply({content: 'Created the commands!'});
  }
}