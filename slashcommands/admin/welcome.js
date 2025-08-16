const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'welcome',
    description: 'Displays information about our server.',
    usage: `/welcome`,
    modOnly: 1,
    execute(interaction) {

        const welcomeEmbed = new Discord.EmbedBuilder()
            .setColor(0x1ea0e1)
            .setTitle('Welcome to Erin\'s Discord Server!')
            .setDescription('Welcome to the official Erin\'s community! We\'re here to help you get the most out of any of Erin\'s projects.\n\nWhether you need help with features, or have suggestions for improvements, our friendly community is here to support you.')
            .addFields(
                { name: 'Need Help?', value: 'Use our support channels for questions about features, troubleshooting, or suggestions. Our community and moderators are here to help you make the most of Erin\'s projects!' },
            )
            .setFooter({ text: 'Welcome to the Erin\'s community!'});

            const fetchedChannel = interaction.guild.channels.cache.get('1406089587553468436');
            fetchedChannel.send({ embeds: [welcomeEmbed], components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  style: 5,
                  label: 'Invite your friends!',
                  url: bot.server
                }, 
              ]
            }
          ] });

          interaction.reply({content: `I have done it, please check ${fetchedChannel}!`, flags: Discord.MessageFlags.Ephemeral})
    }
  };