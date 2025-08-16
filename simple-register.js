const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Load environment variables manually
const envFile = fs.readFileSync('.env', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  }
});

const bot = require('./config/bot.json');
const token = envVars.DISCORD_TOKEN;

if (!token) {
  console.error('❌ Discord token not found in .env file');
  process.exit(1);
}

// Essential commands
const commands = [
  { name: 'ping', description: 'Check bot responsiveness' },
  { name: 'avatar', description: 'Get user avatar', options: [{ name: 'user', description: 'User to get avatar for', type: 6, required: false }] },
  { name: 'joke', description: 'Get a random joke' },
  { name: 'fact', description: 'Get a random fact' },
  { name: 'meme', description: 'Get a random meme' },
  { name: 'quote', description: 'Get an inspirational quote' },
  { name: 'spongebob', description: 'Get SpongeBob quotes and images' },
  { name: '8ball', description: 'Ask the magic 8-ball a question', options: [{ name: 'question', description: 'Your question', type: 3, required: true }] }
];

async function registerCommands() {
  const rest = new REST({ version: '10', timeout: 10000 }).setToken(token);
  
  try {
    console.log('🚀 Registering essential slash commands...');
    console.log(`Bot ID: ${bot.id}, Guild ID: ${bot.serverId}`);
    
    // Register to guild (faster than global)
    const result = await rest.put(
      Routes.applicationGuildCommands(bot.id, bot.serverId),
      { body: commands }
    );
    
    console.log(`✅ Successfully registered ${result.length} commands!`);
    console.log('Commands:', result.map(cmd => cmd.name).join(', '));
    console.log('\n🎉 Slash commands should now appear in your Discord server!');
    console.log('Try typing "/" in your Discord server to see the commands.');
    
  } catch (error) {
    console.error('❌ Registration failed:', error.message);
    console.error('Error details:', error);
  }
}

registerCommands();
