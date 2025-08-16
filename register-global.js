require('dotenv').config();
const { REST, Routes } = require('discord.js');

async function registerGlobalCommands() {
  try {
    const bot = require('./config/bot.json');
    const rest = new REST({ version: '10', timeout: 15000 }).setToken(process.env.DISCORD_TOKEN);
    
    console.log('Registering commands globally (takes up to 1 hour to propagate)...');
    
    // Just register essential commands globally
    const essentialCommands = [
      { name: 'ping', description: 'Check bot latency and response time' },
      { name: 'help', description: 'Get help with bot commands' },
      { name: 'spongebob', description: 'Get a random SpongeBob SquarePants quote with character image!' },
      { name: 'meme', description: 'Get a random programming meme or funny text!' },
      { name: 'joke', description: 'Get a random programming or general joke!' },
      { name: 'fact', description: 'Get a random fun or interesting fact!' },
      { name: 'quote', description: 'Get a random inspirational quote!' },
      { name: 'avatar', description: 'Get a users avatar' },
      { name: 'invite', description: 'Get the bot invite link' }
    ];
    
    console.log(`Registering ${essentialCommands.length} essential commands globally...`);
    
    const result = await rest.put(
      Routes.applicationCommands(bot.id),
      { body: essentialCommands }
    );
    
    console.log(`✓ Successfully registered ${result.length} global commands!`);
    console.log('Note: Global commands take up to 1 hour to appear in Discord.');
    result.forEach(cmd => console.log(`  - ${cmd.name}`));
    
  } catch (error) {
    console.error('Global registration failed:', error.message);
    if (error.code) console.error('Error code:', error.code);
    if (error.status) console.error('HTTP status:', error.status);
  }
}

registerGlobalCommands();
