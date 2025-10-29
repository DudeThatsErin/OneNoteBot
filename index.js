/*
  OneNote Bot
  Last Update: 2025-09-02

$ npm list
OneNoteBot@1.0.0 /var/www/OneNoteBot
├── discord.js@14.22.1
├── pm2@5.2.0
└── sqlite3@5.1.7
*/
const fs = require('fs');
const { Client, GatewayIntentBits, Partials, Collection, REST } = require('discord.js');
const config = require('./config/config.json');
const { initializeCoreTables } = require('./database-init.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ], partials: [Partials.Channel] });

// Create a shared REST instance for the entire bot
const rest = new REST({ version: '10' }).setToken(config.token);

// Set up rate limit event listener on the shared REST instance
rest.on('rateLimited', (info) => {
  console.log('Rate limited!', info);
  console.log(`🚫 Rate limited! Timeout: ${info.timeToReset}ms, Limit: ${info.limit}, Method: ${info.method}, Path: ${info.route}`);
});

// Attach the shared REST instance to the client immediately
client.rest = rest;
console.log('✅ REST instance created and attached to client at startup');

// configurations
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.slashCooldowns = new Collection();
client.erinCommands = new Collection();
const { cooldowns, slashCooldowns } = client;

// Initialize core database tables on startup
initializeCoreTables();

// for all commands
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
console.log('       Loading --prefix Commands... ');
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
const slashCommandFilePaths = readFilesFromPath('./slashcommands');

slashCommandFilePaths.forEach((filePath) => {
  // Clear require cache and reload command
  delete require.cache[require.resolve(filePath)];
  
  try {
    const cmd = require(filePath);
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

// Start the bot (commands are deployed via createcommands prefix command)
(async () => {
  await require('./database.js');
  await client.login(config.token);
})();