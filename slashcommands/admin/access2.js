// at the top of your file
const Discord = require('discord.js');
const { getServerConfig } = require('../../utils/serverConfig');
const bot = require('../../config/bot.json');
const embedConfig = require('../../config/embed.json');

module.exports = {
    name: 'access-two',
    description: 'Displays an embed telling people how to get access to our server.',
    usage: `/access-two`,
    modOnly: 1,
    async execute(interaction) {

        const accessEmbed = new Discord.EmbedBuilder()
            .setColor(parseInt(embedConfig.orange_color, 16))
            .setTitle('Access to our server!')
            .setDescription('React with :books: to get access to our server!')
            .setFooter({ text: embedConfig.footertext, iconURL: embedConfig.footericon });

        const serverConfig = getServerConfig(interaction.guild.id);
        if (!serverConfig) {
            return interaction.reply({content: 'This command is not configured for this server.', flags: Discord.MessageFlags.Ephemeral});
        }

        const fetchedChannel = interaction.guild.channels.cache.get(serverConfig.rulesChannelID);
        
        if (!fetchedChannel) {
            // Debug: Show available channels
            const availableChannels = interaction.guild.channels.cache.map(ch => `${ch.name} (${ch.id})`).join('\n');
            console.log('Available channels:', availableChannels);
            return interaction.reply({content: `Error: Could not find the channel (ID: <#${serverConfig.rulesChannelID}>). Check console for available channels.`, flags: Discord.MessageFlags.Ephemeral});
        }
        
        try {
            await fetchedChannel.send({ embeds: [accessEmbed] });
            interaction.reply({content: `I have done it, please check!`, flags: Discord.MessageFlags.Ephemeral});
        } catch (error) {
            console.error('Error sending message to channel:', error);
            interaction.reply({content: `Error: Could not send message to <#${serverConfig.rulesChannelID}>. Check bot permissions.`, flags: Discord.MessageFlags.Ephemeral});
        }
    },

};