// at the top of your file
const Discord = require('discord.js');
const { getServerConfig } = require('../../utils/serverConfig');
const bot = require('../../config/bot.json');
const embedConfig = require('../../config/embed.json');

module.exports = {
    name: 'access',
    description: 'Displays an embed telling people how to get access to our server.',
    usage: `/access`,
    modOnly: 1,
    async execute(interaction) {
        const serverConfig = getServerConfig(interaction.guild.id);
        if (!serverConfig) {
            return interaction.reply({content: 'This command is not configured for this server.', flags: Discord.MessageFlags.Ephemeral});
        }

        const accessEmbed = new Discord.EmbedBuilder()
            .setColor(parseInt(embedConfig.purple_color, 16))
            .setTitle('Get Access to Our Server!')
            .setDescription(`Please check <#${serverConfig.rulesChannelID}> and react to the correct message to get access to our server!`)
            .setFooter({ text: embedConfig.footertext, iconURL: embedConfig.footericon });

        const fetchedChannel = interaction.guild.channels.cache.get(serverConfig.welcomeChannelId); 
        
        try {
            await fetchedChannel.send({ embeds: [accessEmbed] });
            interaction.reply({content: `I have done it, please check!`, flags: Discord.MessageFlags.Ephemeral});
        } catch (error) {
            console.error('Error sending message to channel:', error);
            interaction.reply({content: `Error: Could not send message to <#${serverConfig.welcomeChannelId}>. Check bot permissions.`, flags: Discord.MessageFlags.Ephemeral});
        }
    },

};