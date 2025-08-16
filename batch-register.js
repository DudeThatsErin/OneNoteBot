require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

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

async function batchRegister() {
  const rest = new REST({ version: '10', timeout: 15000 }).setToken(token);
  
  try {
    console.log('Loading slash commands...');
    
    // Load all slash commands
    const commandFilePaths = readFilesFromPath('./slashcommands');
    const commands = [];
    
    for (const filePath of commandFilePaths) {
      try {
        // Skip help command that has embed.json issues
        if (filePath.includes('help.js')) {
          console.log(`⚠ Skipping: ${filePath} (embed.json issue)`);
          continue;
        }
        
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
    
    // Clear existing commands
    console.log('\nClearing existing commands...');
    await rest.put(Routes.applicationGuildCommands(bot.id, bot.serverId), { body: [] });
    console.log('✓ Cleared existing commands');
    
    // Register in batches of 25 commands
    const batchSize = 25;
    let totalRegistered = 0;
    
    for (let i = 0; i < commands.length; i += batchSize) {
      const batch = commands.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(commands.length / batchSize);
      
      console.log(`\nRegistering batch ${batchNum}/${totalBatches} (${batch.length} commands)...`);
      
      try {
        const result = await rest.put(
          Routes.applicationGuildCommands(bot.id, bot.serverId),
          { body: batch }
        );
        
        totalRegistered += result.length;
        console.log(`✓ Batch ${batchNum} registered successfully (${result.length} commands)`);
        
        // Wait 2 seconds between batches to avoid rate limits
        if (i + batchSize < commands.length) {
          console.log('⏳ Waiting 2 seconds...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
      } catch (batchError) {
        console.error(`✗ Batch ${batchNum} failed:`, batchError.message);
      }
    }
    
    console.log(`\n🎉 Registration complete! ${totalRegistered} commands registered.`);
    console.log('Slash commands should now appear in your Discord server.');
    
  } catch (error) {
    console.error('❌ Registration failed:', error);
  }
}

batchRegister();
