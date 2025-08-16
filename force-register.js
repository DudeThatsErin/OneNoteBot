require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const bot = require('./config/bot.json');
const token = process.env.DISCORD_TOKEN;

// Essential commands to register first
const commands = [
  { name: 'ping', description: 'Check bot responsiveness' },
  { name: 'help', description: 'Get help with commands' },
  { name: 'avatar', description: 'Get user avatar', options: [{ name: 'user', description: 'User to get avatar for', type: 6, required: false }] },
  { name: 'joke', description: 'Get a random joke' },
  { name: 'fact', description: 'Get a random fact' },
  { name: 'meme', description: 'Get a random meme' },
  { name: 'quote', description: 'Get an inspirational quote' },
  { name: 'spongebob', description: 'Get SpongeBob quotes and images' },
  { name: '8ball', description: 'Ask the magic 8-ball a question', options: [{ name: 'question', description: 'Your question', type: 3, required: true }] },
  { name: 'coinflip', description: 'Flip a coin' },
  { name: 'dice', description: 'Roll dice', options: [{ name: 'sides', description: 'Number of sides', type: 4, required: false }] },
  { name: 'thanks', description: 'Thank someone', options: [{ name: 'user', description: 'User to thank', type: 6, required: true }] },
  { name: 'quartznotes', description: 'Learn about QuartzNotes' },
  { name: 'all-projects', description: 'View all of Erin\'s projects' }
];

async function forceRegister() {
  const rest = new REST({ version: '10', timeout: 30000 }).setToken(token);
  
  try {
    console.log('🚀 Force registering essential commands...');
    
    // Clear existing commands first
    await rest.put(Routes.applicationGuildCommands(bot.id, bot.serverId), { body: [] });
    console.log('✓ Cleared existing guild commands');
    
    // Register essential commands
    const result = await rest.put(
      Routes.applicationGuildCommands(bot.id, bot.serverId),
      { body: commands }
    );
    
    console.log(`✅ Successfully registered ${result.length} slash commands!`);
    console.log('Commands registered:', result.map(cmd => cmd.name).join(', '));
    console.log('\n🎉 Slash commands should now appear in your Discord server!');
    
  } catch (error) {
    console.error('❌ Registration failed:', error.message);
    if (error.code === 50001) {
      console.log('Bot is missing access to the guild. Check bot permissions.');
    }
  }
}

forceRegister();
