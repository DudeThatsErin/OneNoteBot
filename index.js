/*
  ErinHelperDiscordBot
  USING DISCORD.JS V14.6.0+
*/
require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits, Partials, Collection, REST, Routes } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ], partials: [Partials.Channel] });

// Initialize REST API for command management
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);


// configurations
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.slashCooldowns = new Collection();
client.erinCommands = new Collection();
const { cooldowns, slashCooldowns } = client;

async function refreshSlashCommands(commandData) {
  console.log('|-----------------------------------|')
  console.log('   Attempting command registration...  ')
  console.log('|-----------------------------------|')
  
  const rest = new REST({ version: '10', timeout: 8000 }).setToken(process.env.DISCORD_TOKEN);
  
  try {
    const bot = require('./config/bot.json');
    
    // Try to register essential commands only (to avoid timeouts)
    const essentialCommands = commandData.slice(0, 10); // First 10 commands
    
    console.log(`Registering ${essentialCommands.length} essential commands to guild ${bot.serverId}...`);
    
    const result = await rest.put(
      Routes.applicationGuildCommands(bot.id, bot.serverId), 
      { body: essentialCommands }
    );
    
    console.log(`✅ Successfully registered ${result.length} slash commands!`);
    console.log('Commands:', result.map(cmd => cmd.name).join(', '));
    console.log('🎉 Slash commands should now appear in Discord!');
    
  } catch (error) {
    console.error('⚠️ Command registration failed:', error.message);
    console.log('💡 You can manually register commands using: ++createcommands');
  }
}


// for all commands
let data = [];
function readFilesFromPath(pathString) {
  const directoryEntries = fs.readdirSync(pathString, { withFileTypes: true });

  return directoryEntries.reduce((filteredEntries, dirEnt) => {
    if (dirEnt.isDirectory()) {
      // If the entry is a directory, call this function again
      // but now add the directory name to the path string.
      filteredEntries.push(...readFilesFromPath(`${pathString}/${dirEnt.name}`))
    } else if (dirEnt.isFile()) {
      // Check if the entry is a file instead. And if so, check
      // if the file name ends with `.js`.
      if (dirEnt.name.endsWith('.js')) {
        // Add the file to the command file array.
        filteredEntries.push(`${pathString}/${dirEnt.name}`);
      }
    }

    return filteredEntries;
  }, []);
}

console.log('|-----------------------------------|');
console.log('       Loading Challenge Commands... ');
console.log('|-----------------------------------|');
// Call the read files function with the root folder of the commands and
// store all the file paths in the constant.
const commandFilePaths = readFilesFromPath('./commands');

// Loop over the array of file paths and set the command on the client.
commandFilePaths.forEach((filePath) => {
  // Clear require cache and reload command
  delete require.cache[require.resolve(filePath)];
  
  try {
    const command = require(filePath);
    client.commands.set(command.name, command);
    console.log(command.name + ' loaded successfully!');
  } catch (error) {
    console.error(`Error loading command ${filePath}:`, error.message);
  }
});


// create slash commands
console.log('|-----------------------------------|')
console.log('      Loading Slash Commands...      ')
console.log('|-----------------------------------|')
const commandFilePaths1 = readFilesFromPath('./slashcommands');

commandFilePaths1.forEach((filePath) => {
  // Clear require cache and reload command
  delete require.cache[require.resolve(filePath)];
  
  try {
    const cmd = require(filePath);

    let object = {};
    if (cmd.name) { object.name = cmd.name; }
    if (cmd.description) { object.description = cmd.description; }
    if (cmd.options) { object.options = cmd.options; }

    data.push(object);
    client.slashCommands.set(cmd.name, cmd);
    console.log(cmd.name + ' loaded successfully!');
  } catch (error) {
    console.error(`Error loading slash command ${filePath}:`, error.message);
  }
});

// events
console.log('|-----------------------------------|')
console.log('       Loading Event Files...        ')
console.log('|-----------------------------------|')
const eventFiles = fs.readdirSync(`${__dirname}/events`).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`${__dirname}/events/${file}`);
  if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
  else client.on(event.name, (...args) => event.execute(...args, client));
  console.log(event.name + ' loaded successfully!');
}

// end of file
(async () => {
  connection = await require('./database.js');
  
  // Wait for client to be ready, then refresh commands
  client.once('ready', async () => {
    console.log(`Bot is ready! Loaded ${data.length} slash commands.`);
    await refreshSlashCommands(data);
  });
  
  await client.login(process.env.DISCORD_TOKEN);
})();
