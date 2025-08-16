const Discord = require('discord.js');


module.exports = {
    name: 'boosters',
    description: 'Displays an embed with information on the benefits to becoming a server booster.',
    usage: `/boosters`,
    ownerOnly: 1,
    execute(interaction) {
      const boosters = new Discord.EmbedBuilder()
        .setColor(0xFFA500)
        .setTitle('Would you like to become a server booster?')
        .setDescription(`Thanks for wanting to become a server booster. We have tons of benefits which you receive just by boosting our QuartzNotes community server.`)
        .addFields(
          {
            name: '🚀 Early Access to New Features',
            value: 'Get exclusive early access to new ALL new features before they\'re released to the public! Be among the first to try out new functionality and provide feedback.'
          },
          {
            name: '⚡ Higher Priority Support',
            value: 'Receive priority support for any QuartzNotes issues or questions. Your support tickets and help requests will be handled with higher priority than regular users.'
          },
          {
            name: '📸 Larger Image Uploads on QuartzNotes',
            value: 'Upload larger images to your QuartzNotes! Boosters get increased file size limits for better quality images and documents in their notes.'
          },
          {
            name: '💡 Higher Priority Suggestions',
            value: 'Your feature suggestions and feedback will be given higher priority consideration. Help shape the future of QuartzNotes with your input!'
          },
          {
            name: 'There are more features to come...',
            value: 'We are always thinking over what features we want to add for Server Boosters. If you have any suggestions, run the \`/suggest\` command and we will think over your suggestion.'
          }
        )
        .setTimestamp();

        const fetchedChannel = interaction.guild.channels.cache.get('1406089587553468436');
        fetchedChannel.send({ embeds: [boosters]});

        interaction.reply({content: `I have done it, please check ${fetchedChannel}!`, flags: Discord.MessageFlags.Ephemeral})
    }

  }