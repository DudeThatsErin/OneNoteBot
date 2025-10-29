const { ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
  name: 'resources',
  ownerOnly: 1,
  description: `Sends comprehensive resources for software engineers with interactive buttons.`,
  usage: `/resources`,
  async execute(interaction) {
    // Create attachment for resources banner
    const attachment = new AttachmentBuilder()
      .setName('resources_banner.png')
      .setDescription('Helpful Resources');

    try {
      // Try to load banner image
      const imagePath = path.join(__dirname, '../../assets/resources_banner.png');
      attachment.setFile(imagePath);
    } catch (error) {
      console.log('resources_banner.png not found, sending without banner image');
    }

    // Create the comprehensive resources message using Discohook JSON structure
    const resourcesMessage = {
      components: [
        {
          type: 17,
          accent_color: 1752220,
          components: [
            {
              type: 12,
              items: [
                {
                  media: {
                    url: "attachment://resources_banner.png"
                  },
                  description: "Helpful Resources"
                }
              ]
            },
            {
              type: 10,
              content: "These are all of the resources we believe would be helpful for any software engineer. Typically these are installed first thing when you get a new computer or start a new position. If you have suggestions to add, use the `/suggestions`  command to add them!\n\nLast Updated on: <t:1761628467:D>"
            },
            {
              type: 10,
              content: "# Text Editors\n\nThese are basic editors that do not have as many features as IDEs."
            },
            {
              type: 1,
              components: [
                {
                  type: 2,
                  style: 5,
                  label: "Notepad++",
                  url: "https://notepad-plus-plus.org/"
                },
                {
                  type: 2,
                  style: 5,
                  label: "Atom.io",
                  url: "https://atom.io/"
                },
                {
                  type: 2,
                  style: 5,
                  label: "Emeditor",
                  url: "https://www.emeditor.com/"
                },
                {
                  type: 2,
                  style: 5,
                  label: "Sublime",
                  url: "https://www.sublimetext.com/"
                }
              ]
            }
          ]
        }
      ]
    };

    // Send the single comprehensive resources message with all sections
    const fetchedChannel = interaction.guild.channels.cache.get('918527517999108107');
    
    try {
      // Send the complete resources message
      if (attachment.attachment) {
        await fetchedChannel.send({ ...resourcesMessage, files: [attachment] });
      } else {
        await fetchedChannel.send(resourcesMessage);
      }

      await interaction.reply({
        content: `✅ **Resources Posted!**\n\nI have successfully posted the comprehensive resources guide to ${fetchedChannel}!\n\nThe guide includes all developer tools and resources in a single interactive embed.`,
        flags: 32768
      });

    } catch (error) {
      console.error('Error sending resources message:', error);
      await interaction.reply({
        content: `❌ **Error Occurred**\n\nFailed to send the resources guide. Please check my permissions in ${fetchedChannel}.`,
        flags: 32768
      });
    }
  }
};