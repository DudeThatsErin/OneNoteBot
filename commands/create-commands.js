const fs = require('fs');
const { REST, Routes } = require('discord.js');
const bot = require('../config/bot.json');

// Function to recursively read command files
function readFilesFromPath(pathString) {
  const directoryEntries = fs.readdirSync(pathString, { withFileTypes: true });

  return directoryEntries.reduce((filteredEntries, dirEnt) => {
    if (dirEnt.isDirectory()) {
      filteredEntries.push(...readFilesFromPath(`${pathString}/${dirEnt.name}`))
    } else if (dirEnt.isFile()) {
      if (dirEnt.name.endsWith('.js')) {
        filteredEntries.push(`${pathString}/${dirEnt.name}`);
      }
    }
    return filteredEntries;
  }, []);
}

module.exports = {
  name: 'createcommands',
  aliases: ['startslash', 'create-commands', 'cc'],
  description: 'Allows Erin to create the Slash Commands.',
  ownerOnly: 1,
  async execute(message, client) {
    console.log('=== DEBUG INFO ===');
    console.log('Client object keys:', Object.keys(client));
    console.log('Client.rest exists:', !!client.rest);
    console.log('Client.rest type:', typeof client.rest);
    console.log('Client.user:', client.user ? client.user.tag : 'undefined');
    console.log('Message client === passed client:', message.client === client);
    console.log('Message.client.rest exists:', !!message.client.rest);
    console.log('==================');
    
    // Try to use REST from message.client first, then fallback to passed client
    let rest = message.client.rest || client.rest;
    if (!rest) {
      console.error('❌ No REST instance found on either client object!');
      return message.reply('❌ REST client not available. Please restart the bot.');
    }
    
    console.log('✅ Using REST instance from:', message.client.rest ? 'message.client' : 'passed client');

    try {
      message.reply('🔄 Starting command deployment...');

      // Load all slash commands from files
      const commands = [];
      const slashCommandFilePaths = readFilesFromPath('./slashcommands');

      console.log('|-----------------------------------|');
      console.log('    Loading Commands for Deployment  ');
      console.log('|-----------------------------------|');

      for (const filePath of slashCommandFilePaths) {
        try {
          // Clear require cache and reload command
          delete require.cache[require.resolve(`../${filePath}`)];
          const cmd = require(`../${filePath}`);

          // Validate command has required properties
          if (!cmd.name || !cmd.description) {
            console.error(`✗ Skipping ${filePath}: Missing name or description`);
            continue;
          }

          // Use the data property if it exists, otherwise build it manually
          if (cmd.data && typeof cmd.data === 'object') {
            // Validate the data object has required fields
            if (cmd.data.name && cmd.data.description) {
              commands.push(cmd.data);
            } else {
              console.error(`✗ Skipping ${filePath}: Invalid data object structure`);
              continue;
            }
          } else {
            // Fallback for commands without data property - create proper structure
            const commandData = {
              name: cmd.name,
              description: cmd.description || 'No description provided'
            };
            
            // Only add options if they exist and are properly formatted
            if (cmd.options && Array.isArray(cmd.options)) {
              commandData.options = cmd.options;
            }
            
            commands.push(commandData);
          }
          console.log(`✓ Loaded: ${cmd.name}`);
        } catch (error) {
          console.error(`✗ Error loading ${filePath}:`, error.message);
        }
      }

      console.log(`\n🔄 Started refreshing ${commands.length} application (/) commands.`);

      // Debug: Log the commands being sent to identify malformed ones
      // console.log('Commands being deployed:');
      // commands.forEach((cmd, index) => {
      //   console.log(`${index}: ${cmd.name} - Options:`, cmd.options ? JSON.stringify(cmd.options, null, 2) : 'None');
      // });

      // Deploy commands to My Discord
      const data = await rest.put(
        Routes.applicationGuildCommands(bot.id, bot.servers.mine.id),
        { body: commands },
      );

      // Deploy commands to OneNote Discord
      const data2 = await rest.put(
        Routes.applicationGuildCommands(bot.id, bot.servers.onenote.id),
        { body: commands },
      );


      // console.log('data result: ', data);
      // console.log('data2 result: ', data2);

      console.log(`✅ Successfully reloaded ${data.length} & ${data2.length} application (/) commands.`);
      message.reply(`✅ Successfully deployed ${data.length} & ${data2.length} slash commands!`);

    } catch (error) {
      console.error('❌ Command deployment error:', error);
      message.reply(`❌ Error deploying commands: ${error.message}`);
    }
  }
}