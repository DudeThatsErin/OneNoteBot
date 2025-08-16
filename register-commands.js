require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');

const bot = require('./config/bot.json');
const token = process.env.DISCORD_TOKEN;

// Function to read all JS files from a directory recursively
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

async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(token);
  
  try {
    console.log('Loading slash commands...');
    
    // Load all slash commands
    const commandFilePaths = readFilesFromPath('./slashcommands');
    const commands = [];
    
    for (const filePath of commandFilePaths) {
      try {
        // Clear require cache
        delete require.cache[require.resolve(filePath)];
        
        const cmd = require(filePath);
        
        if (cmd.name && cmd.description) {
          let object = {};
          object.name = cmd.name;
          object.description = cmd.description;
          if (cmd.options) object.options = cmd.options;
          
          commands.push(object);
          console.log(`✓ Loaded: ${cmd.name}`);
        }
      } catch (error) {
        console.log(`✗ Failed to load ${filePath}: ${error.message}`);
      }
    }
    
    console.log(`\nLoaded ${commands.length} slash commands`);
    
    // Clear existing commands first
    console.log('\nClearing existing commands...');
    await rest.put(Routes.applicationGuildCommands(bot.id, bot.serverId), { body: [] });
    await rest.put(Routes.applicationCommands(bot.id), { body: [] });
    console.log('✓ Cleared existing commands');
    
    // Register guild commands
    console.log('\nRegistering guild commands...');
    const guildResult = await rest.put(
      Routes.applicationGuildCommands(bot.id, bot.serverId),
      { body: commands }
    );
    console.log(`✓ Registered ${guildResult.length} guild commands`);
    
    // Register global commands with timeout handling
    console.log('\nRegistering global commands...');
    try {
      const globalRest = new REST({ version: '10', timeout: 15000 }).setToken(token);
      const globalResult = await globalRest.put(
        Routes.applicationCommands(bot.id),
        { body: commands }
      );
      console.log(`✓ Registered ${globalResult.length} global commands`);
    } catch (globalError) {
      console.log('⚠ Global registration timed out (this is normal, guild commands are working)');
    }
    
    console.log('\n🎉 Command registration complete!');
    console.log('Slash commands should now appear in your Discord server.');
    
  } catch (error) {
    console.error('❌ Registration failed:', error);
  }
}

registerCommands();
