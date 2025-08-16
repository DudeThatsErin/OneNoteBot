require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const bot = require('./config/bot.json');
const token = process.env.DISCORD_TOKEN;

// Sample of key commands to register first
const essentialCommands = [
  {
    name: 'ping',
    description: 'Check if the bot is responsive'
  },
  {
    name: 'help',
    description: 'Get help with bot commands'
  },
  {
    name: 'avatar',
    description: 'Get user avatar',
    options: [
      {
        name: 'user',
        description: 'User to get avatar for',
        type: 6,
        required: false
      }
    ]
  },
  {
    name: 'joke',
    description: 'Get a random joke'
  },
  {
    name: 'fact',
    description: 'Get a random fact'
  }
];

async function quickRegister() {
  const rest = new REST({ version: '10', timeout: 10000 }).setToken(token);
  
  try {
    console.log('🚀 Quick registering essential commands...');
    
    // Register to guild only (faster than global)
    const result = await rest.put(
      Routes.applicationGuildCommands(bot.id, bot.serverId),
      { body: essentialCommands }
    );
    
    console.log(`✅ Successfully registered ${result.length} commands to guild!`);
    console.log('Commands should appear in your Discord server within a few seconds.');
    
  } catch (error) {
    console.error('❌ Registration failed:', error.message);
  }
}

quickRegister();
