require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Load configuration from both .env and config.json
const configPath = path.join(__dirname, '../config.json');
let jsonConfig = {};

try {
    if (fs.existsSync(configPath)) {
        jsonConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
} catch (error) {
    console.error('Error loading config.json:', error.message);
}

// Merge environment variables with JSON config
const config = {
    // Sensitive data from .env
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    appId: process.env.APP_ID,
    prefix: process.env.PREFIX,
    
    // Non-sensitive data from config.json
    servers: jsonConfig.servers || {},
    roles: jsonConfig.roles || {},
    channels: jsonConfig.channels || {},
    features: jsonConfig.features || {},
    
    // Helper methods
    getServerId: (type = 'private') => jsonConfig.servers?.[type] || '',
    getRoleId: (type = 'mod') => jsonConfig.roles?.[type] || '',
    getChannelId: (type) => jsonConfig.channels?.[type] || '',
    getChannelIds: (type) => {
        const channel = jsonConfig.channels?.[type];
        return Array.isArray(channel) ? channel : [channel].filter(Boolean);
    },
    getColor: (type = 'primary') => {
        const colorStr = jsonConfig.features?.embedColors?.[type] || '0x1ea0e1';
        return parseInt(colorStr, 16);
    },
    getCooldown: () => jsonConfig.features?.cooldownDefault || 5
};

module.exports = config;
