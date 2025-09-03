const Discord = require('discord.js');
const bot = require('../../config/bot.json');
const { getServerConfig } = require('../../utils/serverConfig');
const embedConfig = require('../../config/embed.json');

module.exports = {
    name: 'welcome',
    description: 'Displays information about our server.',
    usage: `/welcome`,
    modOnly: 1,
    execute(interaction) {
        const imageEmbed = new Discord.EmbedBuilder()
          .setColor(parseInt(embedConfig.purple_color, 16))
          .setImage('https://erinskidds.com/bot/images/onenoteWelcome.png')

        const welcomeEmbed = new Discord.EmbedBuilder()
            .setColor(parseInt(embedConfig.light_green_color, 16))
            .setTitle('Welcome to the OneNote Discord Server!!')
            .setDescription('Welcome to the official OneNote Discord Server! We\'re here to help you get the most out of any of OneNote\'s features.\n\nWhether you need help with features, or have suggestions for improvements, our friendly community is here to support you.')
            .addFields(
                { name: 'Need Help?', value: 'Use our support channels for questions about features, troubleshooting, or suggestions. Our community and moderators are here to help you make the most of OneNote!' },
            )
            .setFooter({ text: embedConfig.footertext, iconURL: embedConfig.footericon });

            const serverConfig = getServerConfig(interaction.guild.id);
            if (!serverConfig) {
                return interaction.reply({content: 'This command is not configured for this server.', flags: Discord.MessageFlags.Ephemeral});
            }

            const fetchedChannel = interaction.guild.channels.cache.get(serverConfig.welcomeChannelId);
            fetchedChannel.send({ embeds: [imageEmbed, welcomeEmbed], components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  style: 5,
                  label: 'Invite your friends!',
                  url: bot.inviteLink
                }, 
              ]
            }
          ] });

          interaction.reply({content: `I have done it, please check ${fetchedChannel}!`, flags: Discord.MessageFlags.Ephemeral})
    }
  };